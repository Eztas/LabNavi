// rechartsのレーダーチャートは、データの個数に合わせて円を自動で分割することで多角形を製作できる

import { useMemo } from 'react';
import type { FC } from 'react';
import {
  ResponsiveContainer, // チャートが親要素のサイズに合わせて自動でリサイズ
  RadarChart, // data={chartData}の配列の数で自動で多角形raderchartを生成する
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend, // Legendを追加
} from 'recharts';

// 5項目のレビューデータ型
interface ReviewRaderChart {
  motivation: number;
  equipment: number;
  longTermGrowth: number;
  bottomUp: number;
}

// 表示する単一の研究室レビューデータ
// 本来は外部からpropsとして渡されるか、APIから取得します
const initialReviews: ReviewRaderChart = {
  motivation: 4,
  equipment: 3,
  longTermGrowth: 4,
  bottomUp: 5,
};

// 日本語のラベルを定義
const reviewLabels: { [K in keyof ReviewRaderChart]: string } = {
  motivation: '学生の士気',
  equipment: '研究設備',
  longTermGrowth: '長期育成',
  bottomUp: 'ボトムアップ',
};

// レビューグラフページ
const ReviewRaderChartPage: FC = () => {
  // レーダーチャート用のデータ形式に変換する
  const chartData = useMemo(() => {
    // initialReviewsオブジェクトの各キーをループ処理し、
    // rechartsが要求する { subject, value, fullMark } の配列形式に変換します。
    return (Object.keys(initialReviews) as Array<keyof ReviewRaderChart>).map(key => ({
      subject: `${reviewLabels[key]}: ${initialReviews[key]}`, // 軸のラベル (日本語)に数値をコロン区切りで追加
      value: initialReviews[key], // その項目の評価値
      fullMark: 5, // 評価の最大値 (グラフの最大スケール)
    }));
  }, []); // initialReviewsが固定なので、依存配列は空でOK

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">研究室レビュー評価グラフ</h2>
      <div className="w-full h-96 md:h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart 
            cx="50%" // グラフの水平位置
            cy="50%" // グラフの垂直位置
            outerRadius="80%" // コンテナに対するグラフの大きさ
            data={chartData}
          >
            {/* グラフの背景グリッド線 */}
            <PolarGrid />

            {/* グラフの各頂点のラベル (研究室の士気, 風通し...など) */}
            <PolarAngleAxis dataKey="subject" />
            
            {/* 中心から放射状に伸びる軸の目盛り (今回は非表示) */}
            <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />

            {/* 描画するデータ */}
            <Radar 
              name="研究室A" // 凡例に表示される名前
              dataKey="value" // chartDataの'value'を値として使用
              stroke="#1d4ed8" // 線の色
              fill="#1d4ed8" // 塗りつぶしの色
              fillOpacity={0.6} // 塗りつぶしの透明度
            />

            {/* ホバー時に表示されるツールチップ */}
            <Tooltip />

            {/* 凡例 (「研究室A」といった表示) */}
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>各項目の評価を5段階で示しています。</p>
      </div>
    </div>
  );
};

export default ReviewRaderChartPage;
