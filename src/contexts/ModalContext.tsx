import { createContext, useState, useEffect, useMemo, useContext } from 'react';
import type { FC, ReactNode, Dispatch, SetStateAction } from 'react';
import type { RadarReview } from '../types/chart';
import type { Comment } from '../types/comment';
import { initialRadarReviews } from '../data/chart';
import { initialComments } from '../data/comment';

// Contextが提供する値の型を定義
interface ModalContextType {
  radarReviews: RadarReview[];        // 研究室情報は複数のページで扱う、かつ今後動的に内容が変わる可能性があるため、バケツリレーになりやすい
  setRadarReviews: Dispatch<SetStateAction<RadarReview[]>>;
  comments: Comment[];        // 研究室情報は複数のページで扱う、かつ今後動的に内容が変わる可能性があるため、バケツリレーになりやすい
  setComments: Dispatch<SetStateAction<Comment[]>>;
}

// 2. Contextオブジェクトを作成 (初期値はnull)
const ModalContext = createContext<ModalContextType | null>(null);

// 子コンポーネントにContextを提供するためのProviderコンポーネントを作成
export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Data.tsxにあった状態管理ロジックをここに移動
  const [radarReviews, setRadarReviews] = useState<RadarReview[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  

  useEffect(() => {
    // 初期データをセット
    setRadarReviews(initialRadarReviews);
    setComments(initialComments);
  }, []);

  // useMemoを使って、Contextの値が不必要に再生成されるのを防ぐ
  const value = useMemo(() => ({
    radarReviews,
    setRadarReviews,
    comments,
    setComments,
  }), [radarReviews, comments]);


  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

// 4. Contextを簡単に利用するためのカスタムフックを作成
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within an DataProvider');
  }
  return context;
};
