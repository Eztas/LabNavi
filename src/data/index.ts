import type { Lab, Review } from '.././types/'
import type { Award } from '../types';

// --- 初期データ ---
export const initialLabs: Lab[] = [
  {
    id: 'system_control',
    name: 'システム制御論研究室',
    content: 'ドローンやロボットの自律制御',
    coreTime: '10:00-17:00',
    schedule: '週1ミーティング',
    decision: '共同決定', // 学生と教授が相談してテーマを決める
    conference: '国内学会（任意参加）', // 学会発表は自由参加
    rewards: 3, // 過去の受賞数
    career: '自動車, 電機メーカー'
  },
  {
    id: 'communication_theory',
    name: '通信方式研究室',
    content: '5G/6Gの無線通信技術',
    coreTime: 'なし',
    schedule: '隔週ミーティング',
    decision: '共同決定', // チームでの議論を重視
    conference: '国際学会（推奨）', // 国際学会での発表を推奨
    rewards: 5,
    career: '通信キャリア, IT企業'
  },
  {
    id: 'materials_science',
    name: '材料科学研究室',
    content: '新規半導体材料の開発',
    coreTime: '9:00-18:00',
    schedule: '毎日朝会',
    decision: '教授主体', // 教授が大きな研究テーマを決定
    conference: '国内・国際学会（年1回以上）', // 定期的な学会発表
    rewards: 8,
    career: '素材メーカー, 研究所'
  },
  {
    id: 'ai_robotics',
    name: 'AIロボティクス研究室',
    content: '深層学習を用いた画像認識',
    coreTime: 'フレックス',
    schedule: '自由',
    decision: '学生主体', // 学生が自由にテーマを設定
    conference: '国際トップカンファレンス（必須）', // 成果をトップカンファレンスで発表
    rewards: 12,
    career: 'GAFA, スタートアップ'
  },
  {
    id: 'human_interface',
    name: 'ヒューマンインタフェース研究室',
    content: 'VR/AR技術の応用',
    coreTime: '11:00-19:00',
    schedule: '週2回ディスカッション',
    decision: '共同決定', // ディスカッションを通じてテーマを具体化
    conference: '国内外の学会・展示会', // 学会だけでなく技術展示会への出展も
    rewards: 6,
    career: 'ゲーム会社, Webサービス'
  },
];

export const initialReviews: Review[] = [
    { id: 1, labId: 'system_control', labName: 'システム制御論研究室', strict: 8, supportive: 7, comment: '指導は手厚いが、要求レベルは高い。' },
    { id: 2, labId: 'system_control', labName: 'システム制御論研究室', strict: 7, supportive: 8, comment: '質問すれば丁寧に教えてくれる。' },
    { id: 3, labId: 'communication_theory', labName: '通信方式研究室', strict: 3, supportive: 3, comment: '基本的に自由。自主性がないと厳しいかも。' },
    { id: 4, labId: 'materials_science', labName: '材料科学研究室', strict: 9, supportive: 9, comment: 'コアタイムが長く大変だが、その分成長できる環境。' },
    { id: 5, labId: 'ai_robotics', labName: 'AIロボティクス研究室', strict: 5, supportive: 2, comment: '完全な放置。自分でテーマを見つけられる人向け。' },
    { id: 6, labId: 'human_interface', labName: 'ヒューマンインタフェース研究室', strict: 4, supportive: 6, comment: '和気あいあいとした雰囲気で楽しい。' },
];

// ▼ この部分を追記
export const initialAwards: Award[] = [
  { id: 1, labId: 'system_control', awardName: 'ロボティクス学会 年次大会優秀講演賞', awardedAt: '2024年9月' },
  { id: 2, labId: 'system_control', awardName: '国際自動制御連盟 世界大会ポスター賞', awardedAt: '2023年7月' },
  { id: 3, labId: 'materials_science', awardName: '応用物理学会 論文賞', awardedAt: '2024年3月' },
  { id: 4, labId: 'ai_robotics', awardName: 'CVPR Best Paper Award', awardedAt: '2023年6月' },
  { id: 5, labId: 'ai_robotics', awardName: 'ICML Outstanding Paper Award', awardedAt: '2024年7月' },
];