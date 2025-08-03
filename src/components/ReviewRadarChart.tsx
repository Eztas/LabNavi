import { useMemo } from 'react';
import type { FC } from 'react';
import type { RadarAxis } from '../types/chart';
import { reviewLabels } from '../data/chart';
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

import { useModalContext } from '.././contexts/ModalContext';

// コンポーネントが受け取るpropsの型
interface ReviewRadarChartProps {
  labId: string;           // 表示対象の研究室ID
}

// レビューグラフページ
const ReviewRadarChart: FC<ReviewRadarChartProps> = ({ labId }) => {
  const { radarReviews } = useModalContext();
  // labIdに基づいてレビューをフィルタリングし、平均値を計算する
  const { avgData, labName } = useMemo(() => {
    const targetRadarReviews = radarReviews.filter(r => r.labId === labId);

    if (targetRadarReviews.length === 0) {
      // 対象データがない場合はデフォルト値を返す
      return {
        avgData: { motivation: 0, equipment: 0, longTermGrowth: 0, bottomUp: 0 },
        labName: 'データなし',
      };
    }

    const reviewCount = targetRadarReviews.length;
    const currentLabName = targetRadarReviews[0].labName;

    // 各項目の合計値を計算
    const totals = targetRadarReviews.reduce((acc, review) => {
      acc.motivation += review.motivation;
      acc.equipment += review.equipment;
      acc.longTermGrowth += review.longTermGrowth;
      acc.bottomUp += review.bottomUp;
      return acc;
    }, { motivation: 0, equipment: 0, longTermGrowth: 0, bottomUp: 0 });

    // 平均値を計算
    const calculatedAvgData: RadarAxis = {
      motivation: totals.motivation / reviewCount,
      equipment: totals.equipment / reviewCount,
      longTermGrowth: totals.longTermGrowth / reviewCount,
      bottomUp: totals.bottomUp / reviewCount,
    };

    return { avgData: calculatedAvgData, labName: currentLabName };
  }, [labId, radarReviews]);


  // レーダーチャート用のデータ形式に変換する
  const chartData = useMemo(() => {
    return (Object.keys(avgData) as Array<keyof RadarAxis>).map(key => ({
      subject: `${reviewLabels[key]}: ${avgData[key].toFixed(1)}`, // 軸ラベルに平均値を追加 (小数点第一位)
      value: avgData[key], // その項目の評価値
      fullMark: 5, // 評価の最大値
    }));
  }, [avgData]);


  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{`${labName} レビュー評価グラフ`}</h2>
      <div className="w-full h-96 md:h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="80%"
            data={chartData}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
            <Radar
              name={labName}
              dataKey="value"
              stroke="#1d4ed8"
              fill="#1d4ed8"
              fillOpacity={0.6}
            />
            <Tooltip />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>各項目の評価を5段階の平均値で示しています。</p>
      </div>
    </div>
  );
};

export default ReviewRadarChart;
