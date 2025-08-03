// レビュー投稿ページ (項目追加版)

import React, { useState } from 'react';
import type { RadarReview } from '.././types/chart'
import { useDataContext } from '.././contexts/DataContext';


const ReviewFormPage = () => {
  const { setPage } = useDataContext();

  // フォームの各入力値を管理するState
  const [motivation, setMotivation] = useState<number>(5);
  const [equipment, setEquipment] = useState<number>(5);
  const [longTermGrowth, setLongTermGrowth] = useState<number>(5);
  const [bottomUp, setBottomUp] = useState<number>(5);

  // 送信状態、エラー、成功メッセージを管理するState
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // フォームのデフォルト送信動作をキャンセル
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    // 2秒後にホームページにリダイレクト
    setTimeout(() => {
        setPage('home');
    }, 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">研究室マッチ度調査</h2>
        <p className="text-gray-600 mb-6 text-center">
          以下の項目について、あなたの研究室に求める数値を書いてください。
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 学生の意欲 */}
          <div>
            <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">
              学生の意欲 (緩い 1 - 5 高い)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range" id="motivation" min="1" max="5" value={motivation}
                onChange={(e) => setMotivation(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-thumb-green"
              />
              <span className="font-bold text-green-500 w-10 text-center text-lg">{motivation}</span>
            </div>
          </div>

          {/* 設備の充実度 */}
          <div>
            <label htmlFor="equipment" className="block text-sm font-medium text-gray-700 mb-1">
              設備の充実度 (不十分 1 - 5 充実)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range" id="equipment" min="1" max="5" value={equipment}
                onChange={(e) => setEquipment(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-thumb-yellow"
              />
              <span className="font-bold text-yellow-500 w-10 text-center text-lg">{equipment}</span>
            </div>
          </div>

          {/* 長期的な成長環境 */}
          <div>
            <label htmlFor="longTermGrowth" className="block text-sm font-medium text-gray-700 mb-1">
              長期的な成長環境 (短期的 1 - 5 長期的)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range" id="longTermGrowth" min="1" max="5" value={longTermGrowth}
                onChange={(e) => setLongTermGrowth(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-thumb-purple"
              />
              <span className="font-bold text-purple-500 w-10 text-center text-lg">{longTermGrowth}</span>
            </div>
          </div>

          {/* ボトムアップ度 */}
          <div>
            <label htmlFor="bottomUp" className="block text-sm font-medium text-gray-700 mb-1">
              ボトムアップ度 (トップダウン 1 - 5 ボトムアップ)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range" id="bottomUp" min="1" max="5" value={bottomUp}
                onChange={(e) => setBottomUp(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-thumb-pink"
              />
              <span className="font-bold text-pink-500 w-10 text-center text-lg">{bottomUp}</span>
            </div>
          </div>

          {/* エラー・成功メッセージ */}
          <div className="h-5 text-center">
            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
            {success && <p className="text-green-600 text-sm font-medium">{success}</p>}
          </div>

          {/* 送信ボタン */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {isSubmitting ? '送信中...' : 'レビューを投稿する'}
            </button>
          </div>
        </form>
      </div>
      <style>{`
        .range-thumb-red::-webkit-slider-thumb { background-color: #ef4444; }
        .range-thumb-red::-moz-range-thumb { background-color: #ef4444; }
        .range-thumb-blue::-webkit-slider-thumb { background-color: #3b82f6; }
        .range-thumb-blue::-moz-range-thumb { background-color: #3b82f6; }
        .range-thumb-green::-webkit-slider-thumb { background-color: #22c55e; }
        .range-thumb-green::-moz-range-thumb { background-color: #22c55e; }
        .range-thumb-yellow::-webkit-slider-thumb { background-color: #eab308; }
        .range-thumb-yellow::-moz-range-thumb { background-color: #eab308; }
        .range-thumb-purple::-webkit-slider-thumb { background-color: #8b5cf6; }
        .range-thumb-purple::-moz-range-thumb { background-color: #8b5cf6; }
        .range-thumb-pink::-webkit-slider-thumb { background-color: #ec4899; }
        .range-thumb-pink::-moz-range-thumb { background-color: #ec4899; }
        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            cursor: pointer;
            margin-top: -6px; /* スライダーバーの中央に配置 */
        }
        input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            cursor: pointer;
            border: none;
        }
      `}</style>
    </div>
  );
};

export default ReviewFormPage;