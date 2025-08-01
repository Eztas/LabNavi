import { useMemo } from 'react';

import type { FC } from 'react';
// --- TooltipPropsの型インポートを修正 ---
import type { TooltipProps } from 'recharts';

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

import { useDataContext } from '.././contexts/DataContext';

// レビューグラフページ
const ReviewChartPage: FC = () => {
  const { reviews } = useDataContext(); // Contextから直接setPageを取得

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

export default ReviewChartPage;
