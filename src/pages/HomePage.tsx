import { useState, useMemo } from 'react';

import type { FC } from 'react';
import type { LabWithReview } from '.././types/'

import { Search, Star } from 'lucide-react';

import { useDataContext } from '.././contexts/DataContext';

interface HomePageProps {
  onReviewClick: (lab: LabWithReview) => void;
  onAwardsClick: (lab: LabWithReview) => void;
  
}

// ホームページコンポーネント
const HomePage: FC<HomePageProps> = ({ onReviewClick, onAwardsClick }) => {
  const { labs, reviews } = useDataContext();
  const [searchTerm, setSearchTerm] = useState<string>('');

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
              <th scope="col" className="px-6 py-3 whitespace-nowrap">研究室名</th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">教授レビュー</th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">研究内容</th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap hidden md:table-cell">コアタイム</th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap hidden lg:table-cell">スケジュール</th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap hidden lg:table-cell">研究テーマ</th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap hidden lg:table-cell">学会参加</th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap hidden lg:table-cell">受賞数</th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap hidden lg:table-cell">就職先</th>
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
                <td className="px-6 py-4 hidden lg:table-cell">{lab.decision}</td>
                <td className="px-6 py-4 hidden lg:table-cell">{lab.conference}</td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <button
                  onClick={() => onAwardsClick(lab)}
                  className="text-blue-600 hover:underline disabled:text-gray-400 disabled:no-underline"
                  disabled={lab.rewards === 0}
                  >
                    {lab.rewards} 
                    </button>
                </td>

                <td className="px-6 py-4 hidden lg:table-cell">{lab.career}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
