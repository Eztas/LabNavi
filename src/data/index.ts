import type { Lab, Review } from '.././types/'
import type { Award } from '../types';

// --- 初期データ ---
// --- 初期データ ---
export const initialLabs: Lab[] = [
  {
    id: 'system_control',
    name: 'システム制御論研究室',
    professor: '田中 聡', // 教授名を追加
    content: 'ドローンやロボットの自律制御',
    coreTime: '10:00-17:00',
    schedule: '週1ミーティング',
    decision: '共同決定',
    conference: '国内学会（任意参加）',
    rewards: 3,
    career: '自動車, 電機メーカー'
  },
  {
    id: 'communication_theory',
    name: '通信方式研究室',
    professor: '鈴木 雄大', // 教授名を追加
    content: '5G/6Gの無線通信技術',
    coreTime: 'なし',
    schedule: '隔週ミーティング',
    decision: '共同決定',
    conference: '国際学会（推奨）',
    rewards: 0,
    career: '通信キャリア, IT企業'
  },
  {
    id: 'materials_science',
    name: '材料科学研究室',
    professor: '佐藤 美咲', // 教授名を追加
    content: '新規半導体材料の開発',
    coreTime: '9:00-18:00',
    schedule: '毎日朝会',
    decision: '教授主体',
    conference: '国内・国際学会（年1回以上）',
    rewards: 8,
    career: '素材メーカー, 研究所'
  },
  {
    id: 'ai_robotics',
    name: 'AIロボティクス研究室',
    professor: '高橋 健吾', // 教授名を追加
    content: '深層学習を用いた画像認識',
    coreTime: 'フレックス',
    schedule: '自由',
    decision: '学生主体',
    conference: '国際トップカンファレンス（必須）',
    rewards: 12,
    career: 'GAFA, スタートアップ'
  },
  {
    id: 'human_interface',
    name: 'ヒューマンインタフェース研究室',
    professor: '渡辺 あかり', // 教授名を追加
    content: 'VR/AR技術の応用',
    coreTime: '11:00-19:00',
    schedule: '週2回ディスカッション',
    decision: '共同決定',
    conference: '国内外の学会・展示会',
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

export const initialAwards: Award[] = [
  // --- システム制御論研究室 (3件) ---
  { id: 1, labId: 'system_control', awardName: 'ロボティクス学会 年次大会優秀講演賞', awardedAt: '2024年9月' },
  { id: 2, labId: 'system_control', awardName: '国際自動制御連盟 世界大会ポスター賞', awardedAt: '2023年7月' },
  { id: 3, labId: 'system_control', awardName: '計測自動制御学会 論文賞', awardedAt: '2022年11月' },

  // --- 通信方式研究室 (0件) ---
  // 受賞データなし

  // --- 材料科学研究室 (8件) ---
  { id: 4, labId: 'materials_science', awardName: '応用物理学会 論文賞', awardedAt: '2024年3月' },
  { id: 5, labId: 'materials_science', awardName: '日本MRS年次大会 奨励賞', awardedAt: '2023年12月' },
  { id: 6, labId: 'materials_science', awardName: '日本表面真空学会 学術講演会講演奨励賞', awardedAt: '2023年11月' },
  { id: 7, labId: 'materials_science', awardName: '化学工学会 優秀学生賞', awardedAt: '2024年3月' },
  { id: 8, labId: 'materials_science', awardName: 'ナノテクノロジー総合シンポジウム ポスター賞', awardedAt: '2023年2月' },
  { id: 9, labId: 'materials_science', awardName: 'MRS Fall Meeting Best Poster', awardedAt: '2022年11月' },
  { id: 10, labId: 'materials_science', awardName: '高分子学会 優秀ポスター賞', awardedAt: '2022年9月' },
  { id: 11, labId: 'materials_science', awardName: '文部科学大臣表彰 若手科学者賞', awardedAt: '2022年4月' },

  // --- AIロボティクス研究室 (12件) ---
  { id: 12, labId: 'ai_robotics', awardName: 'CVPR Best Paper Award', awardedAt: '2023年6月' },
  { id: 13, labId: 'ai_robotics', awardName: 'ICML Outstanding Paper Award', awardedAt: '2024年7月' },
  { id: 14, labId: 'ai_robotics', awardName: 'NeurIPS Spotlight Presentation', awardedAt: '2024年12月' },
  { id: 15, labId: 'ai_robotics', awardName: 'ICLR Outstanding Paper Award', awardedAt: '2024年5月' },
  { id: 16, labId: 'ai_robotics', awardName: 'ECCV Best Poster Award', awardedAt: '2024年10月' },
  { id: 17, labId: 'ai_robotics', awardName: '情報処理学会 山下記念研究賞', awardedAt: '2023年3月' },
  { id: 18, labId: 'ai_robotics', awardName: 'AAAI Distinguished Paper Award', awardedAt: '2023年2月' },
  { id: 19, labId: 'ai_robotics', awardName: 'ICCV Best Student Paper Award', awardedAt: '2023年10月' },
  { id: 20, labId: 'ai_robotics', awardName: '人工知能学会 全国大会優秀賞', awardedAt: '2022年6月' },
  { id: 21, labId: 'ai_robotics', awardName: 'Google PhD Fellowship', awardedAt: '2022年9月' },
  { id: 22, labId: 'ai_robotics', awardName: 'Microsoft Research PhD Fellowship', awardedAt: '2023年8月' },
  { id: 23, labId: 'ai_robotics', awardName: 'ACL Best Demo Paper Award', awardedAt: '2022年5月' },

  // --- ヒューマンインタフェース研究室 (6件) ---
  { id: 24, labId: 'human_interface', awardName: 'ACM CHI Honorable Mention Award', awardedAt: '2024年5月' },
  { id: 25, labId: 'human_interface', awardName: 'IEEE VR Best Poster Award', awardedAt: '2024年3月' },
  { id: 26, labId: 'human_interface', awardName: 'UIST Best Demo Award', awardedAt: '2023年10月' },
  { id: 27, labId: 'human_interface', awardName: 'ヒューマンインタフェース学会 論文賞', awardedAt: '2023年9月' },
  { id: 28, labId: 'human_interface', awardName: 'インタラクション 優秀発表賞', awardedAt: '2023年3月' },
  { id: 29, labId: 'human_interface', awardName: 'SIGGRAPH Emerging Technologies Prize', awardedAt: '2022年8月' },
];