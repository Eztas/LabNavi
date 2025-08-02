import { useState, useEffect } from 'react';
// --- 型定義のためのインポート ---
import type { LabWithReview, } from './types/'

// コンポーネント
import Header from './components/Header';
import ReviewModal from './components/ReviewModal';
import AwardModal from './components/AwardModal'; 

// ページ
import HomePage from './pages/HomePage';
import ReviewChartPage from './pages/ReviewChartPage';
import ReviewFormPage from './pages/ReviewFormPage';
import LoginPage from './pages/LoginPage';

// コンテキスト
import { useDataContext } from './contexts/DataContext';

// メインのAppコンポーネント
export default function App() {
  const { page, isLoggedIn } = useDataContext(); // isLoggedInを追加
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLab, setSelectedLab] = useState<LabWithReview | null>(null);
  const [selectedLabForAwards, setSelectedLabForAwards] = useState<LabWithReview | null>(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleReviewClick = (lab: LabWithReview) => {
    setSelectedLab(lab);
  };

  const handleCloseModal = () => {
    setSelectedLab(null);
  };

  const handleAwardsClick = (lab: LabWithReview) => {
      setSelectedLabForAwards(lab);
  };

  const handleCloseAwardModal = () => {
      setSelectedLabForAwards(null);
  };

  const renderPage = () => {
    if (loading) {
      return <div className="text-center py-10">読み込み中...</div>;
    }
    if (!isLoggedIn) {
      return <LoginPage onLoginSuccess={() => { /* handle login success here */ }} />;
    }
    switch (page) {
      case 'chart':
        return <ReviewChartPage />;
      case 'form':
        return <ReviewFormPage />;
      case 'home':
      default:
        return <HomePage onReviewClick={handleReviewClick} onAwardsClick={handleAwardsClick} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen w-screen font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        {renderPage()}
      </main>
      <ReviewModal lab={selectedLab} onClose={handleCloseModal} />
      <AwardModal lab={selectedLabForAwards} onClose={handleCloseAwardModal} />
    </div>
  );
}