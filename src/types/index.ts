// 複数のページやコンポーネントなどで共有する型について定義

// --- 型定義 (TypeScriptで追加) ---
export interface Lab {
  id: string;
  name: string;
  content: string;
  coreTime: string;
  schedule: string;
  style: string;
  career: string;
}

export interface Review {
  id: number;
  labId: string;
  labName: string;
  strict: number;
  supportive: number;
  comment: string;
}

export interface LabWithReview extends Lab {
  avgStrict: number;
  avgSupportive: number;
  reviewCount: number;
}

// pageの型定義, これを状態として管理することで、状態がセットされるたびに際レンダリングが自動で開始
export type Page = 'home' | 'chart' | 'form';
