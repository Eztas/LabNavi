import { useState, useEffect } from 'react';
// --- 型定義のためのインポートを修正 ---
import type { FC } from 'react';
import type { Lab, Review, LabWithReview, 
              Page, ReviewModalProps } from './types/'

// 初期データ
import {initialLabs, initialReviews } from './data/'
import { X } from 'lucide-react';

// コンポーネント
import Header from './components/Header';

// ページ
import HomePage from './pages/HomePage';
import ReviewChartPage from './pages/ReviewChartPage';
import ReviewFormPage from './pages/ReviewFormPage';

// --- コンポーネント ---

// レビュー詳細モーダル
const ReviewModal: FC<ReviewModalProps> = ({ lab, reviews, onClose }) => {
    if (!lab) return null;

    const labReviews = reviews.filter(r => r.labId === lab.id);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">{lab.name} のレビュー</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
                        <X className="h-6 w-6 text-gray-600" />
                    </button>
                </div>
                <div className="p-4 overflow-y-auto">
                    {labReviews.length > 0 ? (
                        <ul className="space-y-4">
                            {labReviews.map((review) => (
                                <li key={review.id} className="bg-gray-50 p-3 rounded-md border">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex space-x-4 text-sm">
                                            <span className="font-semibold">厳しさ: <span className="text-red-500">{review.strict}/10</span></span>
                                            <span className="font-semibold">手厚さ: <span className="text-blue-500">{review.supportive}/10</span></span>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 italic">「{review.comment}」</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-center py-8">この研究室にはまだレビューがありません。</p>
                    )}
                </div>
                 <div className="p-4 border-t text-right">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition">閉じる</button>
                </div>
            </div>
        </div>
    );
};

// メインのAppコンポーネント
export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [labs, setLabs] = useState<Lab[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLab, setSelectedLab] = useState<LabWithReview | null>(null);

  useEffect(() => {
    // データベースの代わりに初期データをセットする
    setLabs(initialLabs);
    setReviews(initialReviews);
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
        return <ReviewChartPage reviews={reviews} />;
      case 'form':
        return <ReviewFormPage labs={labs} setPage={setPage} setReviews={setReviews} />;
      case 'home':
      default:
        return <HomePage labs={labs} reviews={reviews} onReviewClick={handleReviewClick} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header setPage={setPage} />
      <main className="container mx-auto p-4 md:p-6">
        {renderPage()}
      </main>
      <ReviewModal lab={selectedLab} reviews={reviews} onClose={handleCloseModal} />
    </div>
  );
}
