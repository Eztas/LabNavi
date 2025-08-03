// src/App.tsx
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../firebase'; // 新規作成したファイルをインポート

// --- 既存のインポート（変更なし） ---
import type { LabWithReview } from './types/';
import Header from './components/Header';
import ReviewModal from './components/ReviewModal';
import AwardModal from './components/AwardModal'; 
import CommentModal from './components/CommentModal'; 
import HomePage from './pages/HomePage';
import ReviewChartPage from './pages/ReviewChartPage';
import MatchRadarChartPage from './pages/MatchRadarChartPage';
import ReviewFormPage from './pages/ReviewFormPage';
import { useDataContext } from './contexts/DataContext';

// --- 新しく追加 ---
import AuthPage from './pages/AuthPage'; // 新規作成したファイルをインポート

type ModalType = 'review' | 'award' | 'comment' | null;

// ログイン後に表示される、元々のアプリ本体
const MainApp = () => {
    const { page } = useDataContext();
    const [selectedLab, setSelectedLab] = useState<LabWithReview | null>(null);
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    const handleCloseModal = () => {
        setSelectedLab(null);
        setActiveModal(null);
    };
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
        switch (page) {
            case 'chart': return <MatchRadarChartPage/>;
            case 'form': return <ReviewFormPage/>;
            case 'home':
            default:
                return <HomePage 
                    onOpenReview={handleOpenReviewModal}
                    onOpenAward={handleOpenAwardModal}
                    onOpenComment={handleOpenCommentModal}
                />;
        }
    };

    return (
        <>
            <main className="container mx-auto p-4 md:p-6">
                {renderPage()}
            </main>
            <ReviewModal lab={activeModal === 'review' ? selectedLab : null} onClose={handleCloseModal} />
            <AwardModal lab={activeModal === 'award' ? selectedLab : null} onClose={handleCloseModal} />
            <CommentModal lab={activeModal === 'comment' ? selectedLab : null} onClose={handleCloseModal} />
        </>
    );
};


// アプリケーション全体のエントリーポイント
export default function App() {
    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);

    // Firebaseの認証状態を監視する
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser:any) => {
            setUser(currentUser);
            setAuthLoading(false); // 監視が完了したらローディングを解除
        });
        // コンポーネントがアンマウントされる時に監視を解除
        return () => unsubscribe();
    }, []);

    const isDevMode = import.meta.env.VITE_DEV_MODE === 'true';

    // 認証状態を確認中はローディング画面を表示
    if (authLoading && !isDevMode) {
        return <div className="flex items-center justify-center h-screen">読み込み中...</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen w-screen font-sans">
            <Header />
            {/* ユーザーがいればメインアプリを、いなければ認証ページを表示 */}
            {isDevMode || user ? <MainApp /> : <AuthPage />}
        </div>
    );
}