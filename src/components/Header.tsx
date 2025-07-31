import type { FC } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Page } from '.././types/'

import { Plus, BarChart2, Home } from 'lucide-react';

interface HeaderProps {
  setPage: Dispatch<SetStateAction<Page>>;
}

// ヘッダーコンポーネント
const Header: FC<HeaderProps> = ({ setPage }) => (
  <header className="bg-white shadow-md sticky top-0 z-20">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800">研究室レビューサイト</h1>
      <nav className="flex items-center space-x-2">
        <button onClick={() => setPage('home')} className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="ホーム">
          <Home className="h-5 w-5 text-gray-600" />
        </button>
        <button onClick={() => setPage('chart')} className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="レビューグラフ">
          <BarChart2 className="h-5 w-5 text-gray-600" />
        </button>
        <button onClick={() => setPage('form')} className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="レビュー投稿">
          <Plus className="h-5 w-5 text-gray-600" />
        </button>
      </nav>
    </div>
  </header>
);

export default Header;
