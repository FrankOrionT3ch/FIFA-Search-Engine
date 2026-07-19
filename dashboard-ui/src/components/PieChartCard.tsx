import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DataItem {
  message?: string;
  field?: string;
  count: number;
}

interface Props {
  data: DataItem[];
  title: string;
  dataKey?: 'message' | 'field';
}

const COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'];

export function PieChartCard({ data, title, dataKey = 'message' }: Props) {
  const sorted = [...data].sort((a, b) => b.count - a.count).slice(0, 10);

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
          <PieChart>
            <Pie
              data={sorted}
              dataKey="count"
              nameKey={dataKey}
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={50}
              paddingAngle={3}
            >
              {sorted.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
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
            <Legend
              wrapperStyle={{ fontSize: 11, color: 'var(--text2)' }}
              iconType="circle"
              iconSize={8}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
