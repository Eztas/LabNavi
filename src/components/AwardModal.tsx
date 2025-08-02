// src/components/AwardModal.tsx (新規作成)

import type { FC } from 'react';
import type { LabWithReview } from '../types/';
import { X } from 'lucide-react';
import { useDataContext } from '../contexts/DataContext';

export interface AwardModalProps {
  lab: LabWithReview | null;
  onClose: () => void;
}

const AwardModal: FC<AwardModalProps> = ({ lab, onClose }) => {
  const { awards } = useDataContext();
  if (!lab) return null;

  const labAwards = awards.filter(a => a.labId === lab.id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">{lab.name} の受賞歴</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto">
          {labAwards.length > 0 ? (
            <ul className="space-y-3 list-disc list-inside">
              {labAwards.map((award) => (
                <li key={award.id} className="text-gray-700">
                  <span className="font-semibold">{award.awardName}</span>
                  <span className="text-sm text-gray-500 ml-2">({award.awardedAt})</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-8">この研究室の受賞歴情報はありません。</p>
          )}
        </div>
        <div className="p-4 border-t text-right">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition">閉じる</button>
        </div>
      </div>
    </div>
  );
};

export default AwardModal;