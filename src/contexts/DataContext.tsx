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
  isLoggedIn: boolean; // ログイン状態も多くのページで必要になるため、バケツリレーになりやすい
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
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
    isLoggedIn,
    setIsLoggedIn,
    awards, // ▼ valueにawardsを追加
    setAwards, // ▼ valueにsetAwardsを追加
  }), [page, labs, reviews, awards, isLoggedIn,setIsLoggedIn]);


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

// import { createContext, useState, useEffect, useMemo, useContext } from 'react';
// import type { FC, ReactNode, Dispatch, SetStateAction } from 'react';
// import type { Lab, Review, Page, Award } from '../types';
// import { initialLabs, initialReviews, initialAwards } from '../data';

// // --- 型定義はそのまま ---
// interface DataContextType {
//   labs: Lab[];
//   setLabs: Dispatch<SetStateAction<Lab[]>>;
//   reviews: Review[];
//   setReviews: Dispatch<SetStateAction<Review[]>>;
//   page: Page;
//   setPage: Dispatch<SetStateAction<Page>>;
//   isLoggedIn: boolean;
//   setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
//   awards: Award[];
//   setAwards: Dispatch<SetStateAction<Award[]>>;
// }

// const DataContext = createContext<DataContextType | null>(null);

// export const DataProvider: FC<{ children: ReactNode }> = ({ children }) => {
//   const [labs, setLabs] = useState<Lab[]>([]);
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [page, setPage] = useState<Page>('home');
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [awards, setAwards] = useState<Award[]>([]);

//   useEffect(() => {
//     setLabs(initialLabs);
//     setReviews(initialReviews);
//     setAwards(initialAwards);
//   }, []);

//   // =======================================================
//   // ▼▼▼ ここからがデバッグ用の「スパイ」処理 ▼▼▼
//   // =======================================================

//   // 元のsetIsLoggedInの代わりとなる、スパイ関数を作成
//   const spySetIsLoggedIn: Dispatch<SetStateAction<boolean>> = (value) => {
//     console.group(`[SPY] setIsLoggedInが呼び出されました`);
//     console.log('渡された値:', value);
//     console.trace('呼び出し元の追跡:'); // ★★★ これが犯人を見つける鍵！
//     console.groupEnd();
    
//     // ログを出力した後、元のsetIsLoggedInを実行する
//     setIsLoggedIn(value);
//   };

//   const value = useMemo(() => ({
//     labs,
//     setLabs,
//     reviews,
//     setReviews,
//     page,
//     setPage,
//     isLoggedIn,
//     // Providerが渡すsetIsLoggedInを、我々が作ったスパイ関数に入れ替える
//     setIsLoggedIn: spySetIsLoggedIn,
//     awards,
//     setAwards,
//   }), [page, labs, reviews, awards, isLoggedIn]);


//   return (
//     <DataContext.Provider value={value}>
//       {children}
//     </DataContext.Provider>
//   );
// };

// // --- useDataContextフックはそのまま ---
// export const useDataContext = () => {
//   const context = useContext(DataContext);
// if (!context) {
//     throw new Error('useDataContext must be used within an DataProvider');
//   }
//   return context;
// };