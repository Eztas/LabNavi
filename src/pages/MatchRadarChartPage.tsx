import React, { useState, useMemo } from 'react';
import type { RadarReview, RadarAxis } from '../types/chart';
import { initialRadarReviews, reviewLabels, reviewLabelDetails } from '../data/chart';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
} from 'recharts';

const MatchRadarChartPage = () => {
  // reviewLabelsのキーから動的に初期Stateを生成
  const initialValues = Object.keys(reviewLabels).reduce((acc, key) => {
    acc[key as keyof RadarAxis] = 3;
    return acc;
  }, {} as RadarReview);

  const [reviewValues, setReviewValues] = useState<RadarReview>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // マッチング結果を保存するState
  const [matchResult, setMatchResult] = useState<{
    labName: string;
    labValues: RadarAxis;
    userValues: RadarAxis;
  } | null>(null);

  // 各研究室の平均値を計算する（初回レンダリング時のみ計算）
  const labAverages = useMemo(() => {
    const labs: { [labId: string]: { name: string; reviews: RadarReview[] } } = {};
    initialRadarReviews.forEach(r => {
      if (!labs[r.labId]) {
        labs[r.labId] = { name: r.labName, reviews: [] };
      }
      labs[r.labId].reviews.push(r);
    });

    return Object.entries(labs).map(([labId, data]) => {
      const reviewCount = data.reviews.length;
      const totals = data.reviews.reduce((acc, review) => {
        acc.motivation += review.motivation;
        acc.equipment += review.equipment;
        acc.longTermGrowth += review.longTermGrowth;
        acc.bottomUp += review.bottomUp;
        return acc;
      }, { motivation: 0, equipment: 0, longTermGrowth: 0, bottomUp: 0 });

      const avgData: RadarAxis = {
        motivation: totals.motivation / reviewCount,
        equipment: totals.equipment / reviewCount,
        longTermGrowth: totals.longTermGrowth / reviewCount,
        bottomUp: totals.bottomUp / reviewCount,
      };
      return { labId, labName: data.name, avgData };
    });
  }, []);

  // フォームの値が変更されたときにStateを更新
  const handleValueChange = (key: keyof RadarAxis, value: number) => {
    setReviewValues(prev => ({ ...prev, [key]: value }));
  };

  // フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // 最もマッチする研究室を探す
    let bestMatch: { labName: string; avgData: RadarAxis } | null = null;
    let minDiff = Infinity;

    labAverages.forEach(lab => {
      let currentDiff = 0;
      (Object.keys(reviewValues) as Array<keyof RadarAxis>).forEach(key => {
        currentDiff += Math.pow(reviewValues[key] - lab.avgData[key], 2);
      });

      if (currentDiff < minDiff) {
        minDiff = currentDiff;
        bestMatch = { labName: lab.labName, avgData: lab.avgData };
      }
    });

    // 2秒後に結果を表示
    setTimeout(() => {
      if (bestMatch) {
        setMatchResult({
          labName: bestMatch.labName,
          labValues: bestMatch.avgData,
          userValues: reviewValues,
        });
      } else {
        setError('分析できる研究室データがありません。');
      }
      setIsSubmitting(false);
    }, 2000);
  };

  // 分析をリセットしてフォームに戻る
  const handleReset = () => {
    setMatchResult(null);
  };

  // マッチング結果をレーダーチャート用に整形
  const chartData = useMemo(() => {
    if (!matchResult) return [];
    return (Object.keys(reviewLabels) as Array<keyof RadarAxis>).map(key => ({
      subject: reviewLabels[key],
      user: matchResult.userValues[key],
      lab: parseFloat(matchResult.labValues[key].toFixed(1)), // 小数点第一位まで
      fullMark: 5,
    }));
  }, [matchResult]);

  // 結果表示画面
  if (matchResult) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-gray-800">分析結果</h2>
          <p className="text-lg md:text-xl text-center text-indigo-600 font-semibold mb-6">
            あなたに最もマッチする研究室は <p className="font-bold text-2xl">{`「${matchResult.labName}」`}</p> です！
          </p>
          <div className="w-full h-96 md:h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 14 }} />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                <Radar 
                  name="あなたの希望" 
                  dataKey="user" 
                  stroke="#ef4444" 
                  fill="#ef4444" 
                  fillOpacity={0.6} 
                />
                <Radar 
                  name={`${matchResult.labName}の評価`} 
                  dataKey="lab" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.6} 
                />
                <Tooltip />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={handleReset}
              className="w-full max-w-xs bg-gray-600 text-green font-bold py-3 px-4 rounded-md hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              もう一度分析する
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 入力フォーム画面
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">研究室マッチ度分析</h2>
        <p className="text-gray-600 mb-6 text-center">
          以下の項目について、あなたが研究室に求める数値を入力してください。
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <div className="h-5 text-center">
            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-green font-bold py-3 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {isSubmitting ? '分析中...' : 'グラフを生成する'}
            </button>
          </div>
        </form>
      </div>
      <style>{`
        /* ... スタイルは変更なし ... */
      `}</style>
    </div>
  );
};

export default MatchRadarChartPage;
