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
  const { page,setPage, isLoggedIn, setIsLoggedIn } = useDataContext(); // isLoggedInを追加
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
  const handleLoginSuccess = () => {
    console.log('ここまできたよ', isLoggedIn);
    console.log(page);
    setIsLoggedIn(true);
    console.log(isLoggedIn);
  };

  useEffect(() => {
  // この中では、isLoggedInは更新後の正しい値になっています
  console.log('isLoggedInの値が更新されました:', isLoggedIn);
  
  // もしログイン後にホームページへ遷移させたいなら、ここが最適な場所です
  if (isLoggedIn) {
    setPage('home');
  }
}, [isLoggedIn]); // 依存配列にisLoggedInを指定

  const renderPage = () => {
    if (loading) {
      return <div className="text-center py-10">読み込み中...</div>;
    }
    if (!isLoggedIn) {
      return <LoginPage onLoginSuccess={handleLoginSuccess} />;
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
//   useEffect(() => {
//   console.log(`[App.tsx の useEffect] isLoggedIn の現在値:`, isLoggedIn);
// }, [isLoggedIn]);

// return (
//   <div className="bg-gray-50 min-h-screen w-screen font-sans">
//     <Header />
//     <main className="container mx-auto p-4 md:p-6">
//       {/* ↓↓↓ ここの表示内容を一時的に変更する ↓↓↓ */}
//       <div className="p-4 border rounded bg-yellow-100 mb-4">
//         <h1 className="text-xl font-bold">デバッグ情報</h1>
//         <p>現在のログイン状態: <strong>{isLoggedIn ? 'ログイン済み' : 'ログアウト'}</strong></p>
//         <p>現在のページ状態: <strong>{page}</strong></p>
//       </div>
      
//       {isLoggedIn ? (
//         // ログイン済みの場合に表示する内容
//         <HomePage onReviewClick={handleReviewClick} onAwardsClick={handleAwardsClick} />
//       ) : (
//         // ログアウト状態の場合に表示する内容
//         <LoginPage onLoginSuccess={handleLoginSuccess} />
//       )}
//       {/* ↑↑↑ ここまで変更 ↑↑↑ */}
//     </main>
//     <ReviewModal lab={selectedLab} onClose={handleCloseModal} />
//     <AwardModal lab={selectedLabForAwards} onClose={handleCloseAwardModal} />
//   </div>
// );
}