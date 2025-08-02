import { createContext, useState, useEffect, useMemo, useContext } from 'react';
import type { FC, ReactNode, Dispatch, SetStateAction } from 'react';
import type { Lab, Review, Page, Award } from '../types';
import { initialLabs, initialReviews, initialAwards } from '../data';



// Contextが提供する値の型を定義
interface DataContextType {
  labs: Lab[];        // 研究室情報は複数のページで扱う、かつ今後動的に内容が変わる可能性があるため、バケツリレーになりやすい
  setLabs: Dispatch<SetStateAction<Lab[]>>;
  reviews: Review[];  // レビュー投稿もあり、データが動的に変わりやすい、いちいち引数で渡し合うのも不便である
  setReviews: Dispatch<SetStateAction<Review[]>>;
  page: Page;         // 色んなページ移動が起こるため、引数で渡し合うのは冗長
  setPage: Dispatch<SetStateAction<Page>>;
  awards: Award[]; // ▼ awardsの型定義を追加
  setAwards: Dispatch<SetStateAction<Award[]>>; // ▼ setAwardsの型定義を追加
}

// 2. Contextオブジェクトを作成 (初期値はnull)
const DataContext = createContext<DataContextType | null>(null);

// 子コンポーネントにContextを提供するためのProviderコンポーネントを作成
export const DataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Data.tsxにあった状態管理ロジックをここに移動
  const [labs, setLabs] = useState<Lab[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState<Page>('home');
  const [awards, setAwards] = useState<Award[]>([]); // ▼ awards用の状態を追加

  useEffect(() => {
    setLabs(initialLabs);
    setReviews(initialReviews);
    setAwards(initialAwards); // ▼ awardsの初期データをセット
  }, []);

  // useMemoを使って、Contextの値が不必要に再生成されるのを防ぐ
  const value = useMemo(() => ({
    labs,
    setLabs,
    reviews,
    setReviews,
    page,
    setPage,
    awards, // ▼ valueにawardsを追加
    setAwards, // ▼ valueにsetAwardsを追加
  }), [page, labs, reviews, awards]); // ▼ 依存配列にawardsを追加


  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

// 4. Contextを簡単に利用するためのカスタムフックを作成
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within an DataProvider');
  }
  return context;
};
