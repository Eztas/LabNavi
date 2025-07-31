import type { Lab, Review } from '.././types/'

// --- 初期データ ---
export const initialLabs: Lab[] = [
  { id: 'system_control', name: 'システム制御論研究室', content: 'ドローンやロボットの自律制御', coreTime: '10:00-17:00', schedule: '週1ミーティング', style: '個人研究中心', career: '自動車, 電機メーカー' },
  { id: 'communication_theory', name: '通信方式研究室', content: '5G/6Gの無線通信技術', coreTime: 'なし', schedule: '隔週ミーティング', style: 'チームで協力', career: '通信キャリア, IT企業' },
  { id: 'materials_science', name: '材料科学研究室', content: '新規半導体材料の開発', coreTime: '9:00-18:00', schedule: '毎日朝会', style: '実験ベース', career: '素材メーカー,研究所' },
  { id: 'ai_robotics', name: 'AIロボティクス研究室', content: '深層学習を用いた画像認識', coreTime: 'フレックス', schedule: '自由', style: '成果主義', career: 'GAFA, スタートアップ' },
  { id: 'human_interface', name: 'ヒューマンインタフェース研究室', content: 'VR/AR技術の応用', coreTime: '11:00-19:00', schedule: '週2回ディスカッション', style: 'デザイン思考', career: 'ゲーム会社, Webサービス' },
];

export const initialReviews: Review[] = [
    { id: 1, labId: 'system_control', labName: 'システム制御論研究室', strict: 8, supportive: 7, comment: '指導は手厚いが、要求レベルは高い。' },
    { id: 2, labId: 'system_control', labName: 'システム制御論研究室', strict: 7, supportive: 8, comment: '質問すれば丁寧に教えてくれる。' },
    { id: 3, labId: 'communication_theory', labName: '通信方式研究室', strict: 3, supportive: 3, comment: '基本的に自由。自主性がないと厳しいかも。' },
    { id: 4, labId: 'materials_science', labName: '材料科学研究室', strict: 9, supportive: 9, comment: 'コアタイムが長く大変だが、その分成長できる環境。' },
    { id: 5, labId: 'ai_robotics', labName: 'AIロボティクス研究室', strict: 5, supportive: 2, comment: '完全な放置。自分でテーマを見つけられる人向け。' },
    { id: 6, labId: 'human_interface', labName: 'ヒューマンインタフェース研究室', strict: 4, supportive: 6, comment: '和気あいあいとした雰囲気で楽しい。' },
];
