import { useState, useEffect } from 'react';
// --- 型定義のためのインポート ---
import type { LabWithReview } from './types/'

// コンポーネント
import Header from './components/Header';
import ReviewModal from './components/ReviewModal';

// ページ
import HomePage from './pages/HomePage';
import ReviewChartPage from './pages/ReviewChartPage';
import ReviewFormPage from './pages/ReviewFormPage';

// コンテキスト
import { useDataContext } from './contexts/DataContext';

// メインのAppコンポーネント
export default function App() {
  const { page } = useDataContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLab, setSelectedLab] = useState<LabWithReview | null>(null);

  useEffect(() => {
    // データベースの代わりに初期データをセットする
    setLoading(false);
  }, []);

  const handleReviewClick = (lab: LabWithReview) => {
      setSelectedLab(lab);
  };

  const handleCloseModal = () => {
      setSelectedLab(null);
  };

  const renderPage = () => {
    if (loading) {
      return <div className="text-center py-10">読み込み中...</div>;
    }
    switch (page) {
      case 'chart':
        return <ReviewChartPage/>;
      case 'form':
        return <ReviewFormPage/>;
      case 'home':
      default:
        return <HomePage onReviewClick={handleReviewClick} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header/>
      <main className="container mx-auto p-4 md:p-6">
        {renderPage()}
      </main>
      <ReviewModal lab={selectedLab} onClose={handleCloseModal} />
    </div>
  );
}
