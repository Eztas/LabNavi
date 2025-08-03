// マッチ度調査ページ (項目追加・動的生成版)

import React, { useState } from 'react';
import type { RadarReview, RadarAxis } from '../types/chart'; // RadarAxisをインポート
import { reviewLabels, reviewLabelDetails } from '../data/chart';
import { useDataContext } from '../contexts/DataContext';

const MatchRadarChartPage = () => {
  const { setPage } = useDataContext();

  // reviewLabelsのキーから動的に初期Stateを生成
  const initialValues = Object.keys(reviewLabels).reduce((acc, key) => {
    acc[key as keyof RadarAxis] = 3;
    return acc;
  }, {} as RadarReview);

  // フォームの入力値を一つのオブジェクトで管理するState
  const [reviewValues, setReviewValues] = useState<RadarReview>(initialValues);

  // 送信状態、エラー、成功メッセージを管理するState
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // 値が変更されたときにStateを更新する汎用的な関数
  const handleValueChange = (key: keyof RadarAxis, value: number) => {
    setReviewValues(prev => ({
        ...prev,
        [key]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);
    
    // ここでreviewValuesをAPIに送信するなどの処理を想定
    console.log('送信データ:', reviewValues);

    setTimeout(() => {
        setPage('home');
    }, 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">研究室マッチ度分析</h2>
        <p className="text-gray-600 mb-6 text-center">
          以下の項目について、あなたが研究室に求める数値を入力してください。
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* reviewLabelsオブジェクトを元にフォーム項目を動的に生成 */}
          {Object.entries(reviewLabels).map(([key, label]) => {
            const K = key as keyof RadarAxis;
            const details = reviewLabelDetails[K];

            return (
              <div key={K}>
                <label htmlFor={K} className="block text-sm font-medium text-gray-700 mb-1">
                  {label} ({details.description})
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    id={K}
                    name={K}
                    min="1"
                    max="5"
                    value={reviewValues[K]}
                    onChange={(e) => handleValueChange(K, Number(e.target.value))}
                    className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${details.thumbColor}`}
                  />
                  <span className={`font-bold w-10 text-center text-lg ${details.textColor}`}>
                    {reviewValues[K]}
                  </span>
                </div>
              </div>
            );
          })}

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
              {isSubmitting ? '送信中...' : 'グラフを生成する'}
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

export default MatchRadarChartPage;