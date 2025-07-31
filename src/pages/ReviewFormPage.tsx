// レビュー投稿ページ

import React, { useState } from 'react';

import type { FC } from 'react';
import type { Review, ReviewFormPageProps } from '.././types/'

const ReviewFormPage: FC<ReviewFormPageProps> = ({ labs, setPage, setReviews }) => {
  const [labId, setLabId] = useState<string>('');
  const [strict, setStrict] = useState<number>(5);
  const [supportive, setSupportive] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

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

    const newReview: Review = {
      id: Date.now(), // ユニークなIDを生成
      labId,
      labName: selectedLab.name,
      strict: Number(strict),
      supportive: Number(supportive),
      comment,
    };

    setReviews(prevReviews => [...prevReviews, newReview]);

    setSuccess('レビューを投稿しました！ご協力ありがとうございます。');
    setLabId('');
    setStrict(5);
    setSupportive(5);
    setComment('');
    setIsSubmitting(false);

    setTimeout(() => {
        setPage('home');
    }, 2000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">レビューを投稿する</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="lab" className="block text-sm font-medium text-gray-700 mb-1">研究室</label>
          <select
            id="lab"
            value={labId}
            onChange={(e) => setLabId(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">研究室を選択してください</option>
            {labs.map(lab => (
              <option key={lab.id} value={lab.id}>{lab.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="strict" className="block text-sm font-medium text-gray-700 mb-1">
            指導の厳しさ (優しい 1 - 10 厳しい)
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              id="strict"
              min="1"
              max="10"
              value={strict}
              onChange={(e) => setStrict(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="font-bold text-red-500 w-8 text-center">{strict}</span>
          </div>
        </div>

        <div>
          <label htmlFor="supportive" className="block text-sm font-medium text-gray-700 mb-1">
            指導の手厚さ (放置 1 - 10 手厚い)
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              id="supportive"
              min="1"
              max="10"
              value={supportive}
              onChange={(e) => setSupportive(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="font-bold text-blue-500 w-8 text-center">{supportive}</span>
          </div>
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">詳細コメント</label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="研究室の雰囲気、教授の人柄、良い点、悪い点など、具体的に教えてください。"
          ></textarea>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
          >
            {isSubmitting ? '送信中...' : '投稿する'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewFormPage;
