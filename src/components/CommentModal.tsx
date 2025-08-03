import { useState } from 'react'; // useStateをインポート
import type { FC } from 'react';
import type { LabWithReview } from '../types/';
import { X, ThumbsUp } from 'lucide-react';
import { initialComments } from '../data/comment';

import { useModalContext } from '.././contexts/ModalContext';

export interface CommentModalProps {
  lab: LabWithReview | null;
  onClose: () => void;
}

const CommentModal: FC<CommentModalProps> = ({ lab, onClose }) => {
  // initialCommentsを初期値としてコンポーネントのstateでコメントを管理
  const { comments, setComments } = useModalContext();

  if (!lab) return null;

  // いいねボタンが押されたときの処理
  const handleLike = (commentId: number) => {
    setComments(currentComments =>
      currentComments.map(comment =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  // 表示対象の研究室のコメントのみをstateからフィルタリング
  const labComments = comments.filter(c => c.labId === lab.id);

  // 日付文字列を日本のロケールに合わせた形式（例: 2025/08/03）に変換するヘルパー関数
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
        {/* モーダルヘッダー */}
        <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-800">{lab.name} のコメント</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 transition-colors">
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* コメントリスト */}
        <div className="p-4 overflow-y-auto">
          {labComments.length > 0 ? (
            <ul className="space-y-4">
              {labComments.map((comment) => (
                <li key={comment.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <p className="text-gray-800 break-words">{comment.statement}</p>
                  <div className="text-sm text-gray-500 mt-3 flex justify-between items-center">
                    <span>{formatDate(comment.createdAts)}</span>
                    {/* いいね部分をボタンに変更し、onClickイベントを追加 */}
                    <button
                      onClick={() => handleLike(comment.id)}
                      className="flex items-center font-medium text-gray-600 rounded-md p-1 hover:bg-blue-100 transition-colors"
                    >
                      <ThumbsUp className="h-4 w-4 mr-1.5 text-blue-500" />
                      {comment.likes}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-8">この研究室に関するコメントはまだありません。</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
