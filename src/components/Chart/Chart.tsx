import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { ArrowUpRight } from 'lucide-react';
import './Chart.scss';

const data = [
  { month: 'Jan', value: 20 },
  { month: 'Feb', value: 45 },
  { month: 'Mar', value: 45 },
  { month: 'Apr', value: 50 },
  { month: 'May', value: 65 },
  { month: 'Jun', value: 80 },
  { month: 'Jul', value: 90 },
];

const Chart: React.FC = () => {
  return (
    <div className="kpi-chart">
      <div className="chart-header">
        <div className="chart-info">
          <h3 className="chart-title">Average Team KPI</h3>
          <div className="chart-percentage">82,10%</div>
          <div className="chart-change">
            <ArrowUpRight size={14} />
            +10% <span className="last-month">vs last month 72%</span>
          </div>
        </div>
        <div className="chart-options">⋯</div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #eee',
              fontSize: '12px',
            }}
            labelFormatter={() => '24 April 2024'}
            formatter={(value: number) => [`${value}%`, '']}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4F46E5"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
