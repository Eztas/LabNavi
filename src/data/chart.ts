import type { RadarReview, RadarAxis } from '.././types/chart'

export const initialRadarReviews: RadarReview[] = [
  {
    labId: 'system_control',
    labName: 'システム制御論研究室',
    motivation: 4,
    equipment: 5,
    longTermGrowth: 4,
    bottomUp: 3,
  },
  {
    labId: 'system_control',
    labName: 'システム制御論研究室',
    motivation: 5,
    equipment: 4,
    longTermGrowth: 5,
    bottomUp: 4,
  },
  {
    labId: 'communication_theory',
    labName: '通信方式研究室',
    motivation: 2,
    equipment: 3,
    longTermGrowth: 3,
    bottomUp: 5,
  },
  {
    labId: 'materials_science',
    labName: '材料科学研究室',
    motivation: 5,
    equipment: 5,
    longTermGrowth: 5,
    bottomUp: 2,
  },
  {
    labId: 'ai_robotics',
    labName: 'AIロボティクス研究室',
    motivation: 3,
    equipment: 3,
    longTermGrowth: 2,
    bottomUp: 1,
  },
  {
    labId: 'human_interface',
    labName: 'ヒューマンインタフェース研究室',
    motivation: 5,
    equipment: 4,
    longTermGrowth: 4,
    bottomUp: 5,
  },
  {
    labId: 'materials_science',
    labName: '材料科学研究室',
    motivation: 4,
    equipment: 4,
    longTermGrowth: 5,
    bottomUp: 1,
  },
];

// 日本語のラベルを定義
export const reviewLabels: { [K in keyof RadarAxis]: string } = {
  motivation: '学生の士気',
  equipment: '研究設備',
  longTermGrowth: '長期育成',
  bottomUp: 'ボトムアップ',
};

// 各項目の詳細情報（説明文、色など）を定義
export const reviewLabelDetails: { [K in keyof RadarAxis]: { description: string; thumbColor: string; textColor: string; } } = {
    motivation: { description: '緩い 1 - 5 高い', thumbColor: 'range-thumb-green', textColor: 'text-green-500' },
    equipment: { description: '不十分 1 - 5 充実', thumbColor: 'range-thumb-yellow', textColor: 'text-yellow-500' },
    longTermGrowth: { description: '短期的 1 - 5 長期的', thumbColor: 'range-thumb-purple', textColor: 'text-purple-500' },
    bottomUp: { description: 'トップダウン 1 - 5 ボトムアップ', thumbColor: 'range-thumb-pink', textColor: 'text-pink-500' },
};
