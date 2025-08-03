export interface RadarReview {
  labId: string;
  labName: string;
  motivation: number;
  equipment: number;
  longTermGrowth: number;
  bottomUp: number;
}

// レーダーチャートの軸となるデータ項目
export type RadarAxis = Omit<RadarReview, 'labId' | 'labName'>;