import React, { useState, useEffect, useMemo } from 'react';
// --- 型定義のためのインポートを修正 ---
import type { FC } from 'react';
// --- TooltipPropsの型インポートを修正 ---
import type { TooltipProps } from 'recharts';
import type { Lab, Review, LabWithReview, 
              Page, HeaderProps, ReviewModalProps, HomePageProps,
              ReviewChartPageProps, ReviewFormPageProps } from './types/'

// 初期データ
import {initialLabs, initialReviews } from './data/'

import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import { Search, Star, X, Plus, BarChart2, Home } from 'lucide-react';

// --- コンポーネント ---

// ヘッダーコンポーネント
const Header: FC<HeaderProps> = ({ setPage }) => (
  <header className="bg-white shadow-md sticky top-0 z-20">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800">研究室レビューサイト</h1>
      <nav className="flex items-center space-x-2">
        <button onClick={() => setPage('home')} className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="ホーム">
          <Home className="h-5 w-5 text-gray-600" />
        </button>
        <button onClick={() => setPage('chart')} className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="レビューグラフ">
          <BarChart2 className="h-5 w-5 text-gray-600" />
        </button>
        <button onClick={() => setPage('form')} className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="レビュー投稿">
          <Plus className="h-5 w-5 text-gray-600" />
        </button>
      </nav>
    </div>
  </header>
);

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


// ホームページコンポーネント
const HomePage: FC<HomePageProps> = ({ labs, reviews, onReviewClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLabs: LabWithReview[] = useMemo(() => {
    return labs
      .map(lab => {
        const labReviews = reviews.filter(r => r.labId === lab.id);
        const avgStrict = labReviews.length > 0 ? labReviews.reduce((sum, r) => sum + r.strict, 0) / labReviews.length : 0;
        const avgSupportive = labReviews.length > 0 ? labReviews.reduce((sum, r) => sum + r.supportive, 0) / labReviews.length : 0;
        return { ...lab, avgStrict, avgSupportive, reviewCount: labReviews.length };
      })
      .filter(lab =>
        lab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lab.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lab.career.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [labs, reviews, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="relative">
          <input
            type="text"
            placeholder="研究室名, 研究内容, 就職先などで検索..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">研究室名</th>
              <th scope="col" className="px-6 py-3">教授レビュー</th>
              <th scope="col" className="px-6 py-3">研究内容</th>
              <th scope="col" className="px-6 py-3 hidden md:table-cell">コアタイム</th>
              <th scope="col" className="px-6 py-3 hidden lg:table-cell">スケジュール</th>
              <th scope="col" className="px-6 py-3 hidden lg:table-cell">就職先</th>
            </tr>
          </thead>
          <tbody>
            {filteredLabs.map(lab => (
              <tr key={lab.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{lab.name}</td>
                <td className="px-6 py-4">
                  <button onClick={() => onReviewClick(lab)} className="w-full text-left">
                    <div className="flex items-center space-x-1">
                        <Star className={`h-4 w-4 ${lab.avgStrict > 6 ? 'text-red-500 fill-current' : 'text-gray-300'}`} />
                        <Star className={`h-4 w-4 ${lab.avgSupportive > 6 ? 'text-blue-500 fill-current' : 'text-gray-300'}`} />
                        <span className="text-xs text-gray-500">({lab.reviewCount})</span>
                    </div>
                    <div className="text-xs mt-1">
                        <p>厳しさ: {lab.avgStrict.toFixed(1)}</p>
                        <p>手厚さ: {lab.avgSupportive.toFixed(1)}</p>
                    </div>
                  </button>
                </td>
                <td className="px-6 py-4">{lab.content}</td>
                <td className="px-6 py-4 hidden md:table-cell">{lab.coreTime}</td>
                <td className="px-6 py-4 hidden lg:table-cell">{lab.schedule}</td>
                <td className="px-6 py-4 hidden lg:table-cell">{lab.career}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// レビューグラフページ
const ReviewChartPage: FC<ReviewChartPageProps> = ({ reviews }) => {
  const chartData = useMemo(() => {
    const labReviews: { [key: string]: { name: string; strict: number[]; supportive: number[] } } = {};
    reviews.forEach(review => {
      if (!labReviews[review.labId]) {
        labReviews[review.labId] = {
          name: review.labName,
          strict: [],
          supportive: [],
        };
      }
      labReviews[review.labId].strict.push(review.strict);
      labReviews[review.labId].supportive.push(review.supportive);
    });

    return Object.values(labReviews).map((lab: any) => ({
      name: lab.name,
      strict: lab.strict.reduce((a: number, b: number) => a + b, 0) / lab.strict.length,
      supportive: lab.supportive.reduce((a: number, b: number) => a + b, 0) / lab.supportive.length,
      count: lab.strict.length,
    }));
  }, [reviews]);

  // --- Tooltipの型定義 (ここを修正) ---

  // 1. グラフのデータポイントの型
  interface ChartPoint {
    name: string;
    strict: number;
    supportive: number;
    count: number;
  }

  // 2. RechartsがTooltipに渡すpayload配列の要素の型
  // このオブジェクトの中に、実際のデータを持つ `payload` プロパティが含まれる
  interface CustomTooltipPayload {
    payload: ChartPoint;
    // valueやcolorなど、他にもRechartsが追加するプロパティがあるが、今回はpayloadだけ必要
  }
  
  // 3. CustomTooltipコンポーネントのPropsの型
  // RechartsのTooltipPropsを拡張し、payloadの型をより具体的に定義
  interface CustomTooltipProps extends TooltipProps<number, string> {
    payload?: CustomTooltipPayload[];
  }

  // 型を適用したCustomTooltipコンポーネント
  const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      // payload[0]の中に、さらに `payload` プロパティとして実際のデータが入っている
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-md border shadow-lg">
          <p className="font-bold text-gray-800">{data.name}</p>
          <p className="text-sm text-red-600">{`平均厳しさ: ${data.strict.toFixed(1)}`}</p>
          <p className="text-sm text-blue-600">{`平均手厚さ: ${data.supportive.toFixed(1)}`}</p>
          <p className="text-sm text-gray-500">{`レビュー数: ${data.count}`}</p>
        </div>
      );
    }
    return null;
  };


  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">教授レビュー 2軸評価グラフ</h2>
      <div className="w-full h-96 md:h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              dataKey="supportive" 
              name="手厚さ" 
              domain={[0, 10]} 
              label={{ value: '← 放置 | 手厚い →', position: 'insideBottom', offset: -25 }} 
              ticks={[0, 2, 4, 6, 8, 10]}
            />
            <YAxis 
              type="number" 
              dataKey="strict" 
              name="厳しさ" 
              domain={[0, 10]} 
              label={{ value: '優しい', angle: -90, position: 'insideLeft', offset: -5 }}
              ticks={[0, 2, 4, 6, 8, 10]}
            />
             <text x="50%" y={10} textAnchor="middle" dominantBaseline="middle" className="font-bold">
                厳しい
            </text>
            <ZAxis type="number" dataKey="count" range={[100, 1000]} name="レビュー数" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
            <Scatter name="研究室" data={chartData} fill="#1d4ed8" shape="circle" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>バブルの大きさはレビュー数を表しています。</p>
      </div>
    </div>
  );
};

// レビュー投稿ページ
const ReviewFormPage: FC<ReviewFormPageProps> = ({ labs, setPage, setReviews }) => {
  const [labId, setLabId] = useState('');
  const [strict, setStrict] = useState(5);
  const [supportive, setSupportive] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
