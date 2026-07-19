import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import type { SearchStats } from '../lib/types';

interface Props {
  data: SearchStats[];
  title: string;
  color?: string;
}

export function TopSearchesChart({ data, title, color = 'var(--chart-1)' }: Props) {
  const sorted = [...data].sort((a, b) => b.Total - a.Total).slice(0, 10);

  return (
    <div className="bg-white rounded-xl border border-[var(--border)] p-5">
      <h3 className="text-sm font-semibold text-[var(--text2)] uppercase tracking-wider mb-4">
        {title}
      </h3>
      {sorted.length === 0 ? (
        <div className="flex items-center justify-center h-[280px] text-sm text-[var(--text3)]">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={sorted} layout="vertical" margin={{ left: 0, right: 20, top: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 12, fill: 'var(--text3)' }} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="query"
              tick={{ fontSize: 12, fill: 'var(--text2)' }}
              width={120}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: 8,
                fontSize: 13,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
              formatter={(value: number) => [value.toLocaleString(), 'Searches']}
            />
            <Bar dataKey="Total" fill={color} radius={[0, 4, 4, 0]} maxBarSize={20} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
