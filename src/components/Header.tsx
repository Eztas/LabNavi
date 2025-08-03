import type { FC } from 'react';
import { Plus, BarChart2, Home } from 'lucide-react';

import { useDataContext } from '.././contexts/DataContext';

// ヘッダーコンポーネント
const Header: FC = () => {
  const { setPage } = useDataContext(); // Contextから直接setPageを取得
  return (
  <header className="bg-white shadow-md sticky top-0 z-20">
    <div className="px-6 py-3 flex justify-between items-center">
      <div className="flex items-center">
        <img
        src="/favicon.png"
        alt="LabNavi logo"
        className="h-8 w-8 mr-2" // 画像のサイズと右の余白
      />
      
      <h1 className="text-xl md:text-2xl font-bold text-gray-800">
      LabNavi
      </h1>
    </div>
      <nav className="flex items-center space-x-2">
        <button onClick={() => setPage('home')} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" title="ホーム">
          <Home className="h-5 w-5 text-blue-600" />
        </button>
        <button onClick={() => setPage('chart')} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" title="レビューグラフ">
          <BarChart2 className="h-5 w-5 text-blue-600" />
        </button>
        <button onClick={() => setPage('form')} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" title="レビュー投稿">
          <Plus className="h-5 w-5 text-blue-600" />
        </button>
      </nav>
    </div>
  </header>
  )
};

export default Header;
