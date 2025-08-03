// レビュー投稿ページ

import React, { useState } from 'react';

import type { FC } from 'react';
import type { RadarReview, RadarAxis } from '.././types/chart'
import type { Comment } from '.././types/comment'
import { reviewLabels, reviewLabelDetails } from '.././data/chart'

import { useDataContext } from '.././contexts/DataContext';
import { useModalContext } from '.././contexts/ModalContext';

const initialReviewValues: RadarAxis = {
  motivation: 3,
  equipment: 3,
  longTermGrowth: 3,
  bottomUp: 3,
};

const ReviewFormPage: FC = () => {
  const { labs, setPage } = useDataContext();
  const { setRadarReviews, setComments } = useModalContext();

  // State hooks
  const [labId, setLabId] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [reviewValues, setReviewValues] = useState<RadarAxis>(initialReviewValues);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Handler for range slider changes
  const handleValueChange = (key: keyof RadarAxis, value: number) => {
    setReviewValues(prev => ({ ...prev, [key]: value }));
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!labId || !comment) {
      setError('研究室を選択し、コメントを入力してください。');
      return;
    }
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    const selectedLab = labs.find(l => l.id === labId);
    if (!selectedLab) {
        setError('選択された研究室が見つかりません。');
        setIsSubmitting(false);
        return;
    }

    // Create new RadarReview object
    const newRadarReview: RadarReview = {
      labId,
      labName: selectedLab.name,
      ...reviewValues,
    };

    // Create new Comment object
    const newComment: Comment = {
        id: Date.now(),
        labId,
        labName: selectedLab.name,
        statement: comment,
        createdAts: new Date().toISOString(),
        likes: 0,
    };

    // Update contexts
    setRadarReviews(prevReviews => [...prevReviews, newRadarReview]);
    setComments(prevComments => [...prevComments, newComment]);

    setSuccess('レビューを投稿しました！ご協力ありがとうございます。');
    
    // Reset form fields
    setLabId('');
    setComment('');
    setReviewValues(initialReviewValues);
    setIsSubmitting(false);

    // Redirect to home page after 2 seconds
    setTimeout(() => {
        setPage('home');
    }, 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">レビューを投稿する</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Lab Selection */}
          <div>
            <label htmlFor="lab" className="block text-sm font-medium text-gray-700 mb-1">研究室</label>
            <select
              id="lab"
              value={labId}
              onChange={(e) => setLabId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            >
              <option value="">研究室を選択してください</option>
              {labs.map(lab => (
                <option key={lab.id} value={lab.id}>{lab.name}</option>
              ))}
            </select>
          </div>

          {/* Radar Chart Items */}
          {Object.entries(reviewLabels).map(([key, label]) => {
            const K = key as keyof RadarAxis;
            const details = reviewLabelDetails[K];
            return (
              <div key={K}>
                <label htmlFor={K} className="block text-sm font-medium text-gray-700 mb-1">
                  {label} <span className="text-xs text-gray-500">({details.description})</span>
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

          {/* Comment Textarea */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">詳細コメント</label>
            <textarea
              id="comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              placeholder="研究室の雰囲気、教授の人柄、良い点、悪い点など、具体的に教えてください。"
            ></textarea>
          </div>

          {/* Messages */}
          <div className="h-5 text-center">
            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
            {success && <p className="text-green-600 text-sm font-medium">{success}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {isSubmitting ? '送信中...' : '投稿する'}
            </button>
          </div>
        </form>
      </div>
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          transition: background-color 0.2s;
        }
        .thumb-red-500::-webkit-slider-thumb { background-color: #ef4444; }
        .thumb-red-500::-moz-range-thumb { background-color: #ef4444; }
        .thumb-green-500::-webkit-slider-thumb { background-color: #22c55e; }
        .thumb-green-500::-moz-range-thumb { background-color: #22c55e; }
        .thumb-blue-500::-webkit-slider-thumb { background-color: #3b82f6; }
        .thumb-blue-500::-moz-range-thumb { background-color: #3b82f6; }
        .thumb-purple-500::-webkit-slider-thumb { background-color: #8b5cf6; }
        .thumb-purple-500::-moz-range-thumb { background-color: #8b5cf6; }
      `}</style>
    </div>
  );
};

export default ReviewFormPage;
