import type { ConsultPlayerSpecifict } from '../lib/types';
import { Trophy } from 'lucide-react';

interface Props {
  data: ConsultPlayerSpecifict[];
  title: string;
}

export function TopPlayersTable({ data, title }: Props) {
  const sorted = [...data].sort((a, b) => b.count - a.count).slice(0, 10);

  return (
    <div className="bg-white rounded-xl border border-[var(--border)] p-5">
      <div className="flex items-center gap-2 mb-4">
        <Trophy size={16} className="text-[var(--warning)]" />
        <h3 className="text-sm font-semibold text-[var(--text2)] uppercase tracking-wider">
          {title}
        </h3>
      </div>

      {sorted.length === 0 ? (
        <div className="flex items-center justify-center h-32 text-sm text-[var(--text3)]">
          No data available
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-2.5 px-2 font-semibold text-[var(--text2)] text-xs uppercase tracking-wider">
                  Player
                </th>
                <th className="text-right py-2.5 px-2 font-semibold text-[var(--text2)] text-xs uppercase tracking-wider">
                  Searches
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-[var(--border)] hover:bg-[var(--surface2)] transition-colors"
                >
                  <td className="py-2.5 px-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[var(--surface2)] flex items-center justify-center text-[10px] font-bold text-[var(--text2)]">
                        {i + 1}
                      </span>
                      <span className="font-medium">{row.message}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-2 text-right font-semibold">
                    {row.count.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
