# Discord

[DiscordにGitHubの通知(Webhook)](https://zenn.dev/hyouhyan/articles/2bacb379d1a826
)

今回は時間やセキュリティの都合やカスタムする内容が多くなるために省いたが、

レビュアーを指定した上でのプルリク通知も可能

`.github/workflows/notify.yml`
```
name: Discord PR Reviewer Notification

on:
  pull_request:
    types: [review_requested] # レビュアーがリクエストされた時に実行

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      # レビュアーのGitHubユーザー名から、対応するDiscord IDを探し、メンション用の文字列を作成するステップ
      - name: Build Mention String
        id: build_mention
        env:
          # SecretsからJSON形式の対応表と、イベントからレビュアーのログイン名を取得
          USER_MAP_JSON: ${{ secrets.DISCORD_USER_MAP }}
          REVIEWER_LOGIN: ${{ github.event.requested_reviewer.login }}
        run: |
          # 'jq'というツールを使ってJSONを解析します。
          # まず、jqがインストールされているか確認し、なければインストールします。
          if ! command -v jq &> /dev/null
          then
              sudo apt-get update && sudo apt-get install -y jq
          fi
          
          # JSONの中から、レビュアーのログイン名に一致するDiscord IDを検索
          DISCORD_ID=$(echo "$USER_MAP_JSON" | jq -r --arg LOGIN "$REVIEWER_LOGIN" '.[$LOGIN]')

          # Discord IDが見つかった場合のみ、メンション用の文字列を作成
          if [ "$DISCORD_ID" != "null" ] && [ -n "$DISCORD_ID" ]; then
            echo "mention_string=<@$DISCORD_ID>" >> $GITHUB_OUTPUT
          else
            echo "mention_string=" >> $GITHUB_OUTPUT
          fi

      # Discordに通知を送るステップ
      - name: Send Discord Notification
        uses: ahmadnassri/action-discord@v2
        with:
          # Webhook URLも必ずSecretから読み込む
          webhook_url: ${{ secrets.DISCORD_WEBHOOK_URL }}
          message: |
            ${{ steps.build_mention.outputs.mention_string }}
            **${{ github.actor }}** さんがプルリクエストで、あなたをレビュアーに指定しました。
            > [${{ github.event.pull_request.title }}](${{ github.event.pull_request.html_url }})
```
