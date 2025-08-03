import { useState, useEffect } from 'react';
// --- 型定義のためのインポート ---
import type { LabWithReview, } from './types/'

// コンポーネント
import Header from './components/Header';
import ReviewModal from './components/ReviewModal';
import AwardModal from './components/AwardModal'; 
import CommentModal from './components/CommentModal'; 

// ページ
import HomePage from './pages/HomePage';
import ReviewChartPage from './pages/ReviewChartPage';
import MatchRadarChartPage from './pages/MatchRadarChartPage';
import ReviewFormPage from './pages/ReviewFormPage';

// コンテキスト
import { useDataContext } from './contexts/DataContext';

// ★ 開いているモーダルの種類を管理するための型
type ModalType = 'review' | 'award' | 'comment' | null;

// メインのAppコンポーネント
export default function App() {
  const { page } = useDataContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLab, setSelectedLab] = useState<LabWithReview | null>(null);
  // ★ どのモーダルがアクティブかを管理する新しいstate
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  useEffect(() => {
    // データベースの代わりに初期データをセットする
    setLoading(false);
  }, []);

  // ★ モーダルを閉じる共通の関数
  const handleCloseModal = () => {
      setSelectedLab(null);
      setActiveModal(null); // activeModalもリセット
  };

  // ★ 各モーダルを開くための専用関数
  const handleOpenReviewModal = (lab: LabWithReview) => {
    setSelectedLab(lab);
    setActiveModal('review');
  };

  const handleOpenAwardModal = (lab: LabWithReview) => {
    setSelectedLab(lab);
    setActiveModal('award');
  };

  const handleOpenCommentModal = (lab: LabWithReview) => {
    setSelectedLab(lab);
    setActiveModal('comment');
  };

  const renderPage = () => {
    if (loading) {
      return <div className="text-center py-10">読み込み中...</div>;
    }
    switch (page) {
      case 'chart':
        return <MatchRadarChartPage/>;
      case 'form':
        return <ReviewFormPage/>;
      case 'home':
      default:
        // ★ HomePageにそれぞれの開閉関数を渡す
        return <HomePage 
          onOpenReview={handleOpenReviewModal}
          onOpenAward={handleOpenAwardModal}
          onOpenComment={handleOpenCommentModal}
        />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen w-screen font-sans">
      <Header/>
      <main className="container mx-auto p-4 md:p-6">
        {renderPage()}
      </main>
      {/* ★ activeModalの値に応じて、対応するモーダルにのみlabデータを渡す */}
      <ReviewModal lab={activeModal === 'review' ? selectedLab : null} onClose={handleCloseModal} />
      <AwardModal lab={activeModal === 'award' ? selectedLab : null} onClose={handleCloseModal} />
      <CommentModal lab={activeModal === 'comment' ? selectedLab : null} onClose={handleCloseModal} />
    </div>
  );
}
