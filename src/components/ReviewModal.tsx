// レビュー詳細モーダル
// 研究室情報テーブルのレビューをクリックしたときに
// 画面の最前面に優先して出てくる詳細なレビュー一覧のこと

import type { FC } from 'react';
import type { LabWithReview } from '.././types/'

import { X } from 'lucide-react';

import ReviewRadarChart from './ReviewRadarChart';

export interface ReviewModalProps {
  lab: LabWithReview | null;
  onClose: () => void;
}

const ReviewModal: FC<ReviewModalProps> = ({ lab, onClose }) => {
    if (!lab) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
                        <X className="h-6 w-6 text-gray-600" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <ReviewRadarChart labId={lab.id} />
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
