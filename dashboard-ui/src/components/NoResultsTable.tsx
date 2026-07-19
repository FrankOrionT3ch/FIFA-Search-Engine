import type { NoResult } from '../lib/types';
import { AlertTriangle } from 'lucide-react';

interface Props {
  data: NoResult[];
}

export function NoResultsTable({ data }: Props) {
  return (
    <div className="bg-white rounded-xl border border-[var(--border)] p-5">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={16} className="text-[var(--danger)]" />
        <h3 className="text-sm font-semibold text-[var(--text2)] uppercase tracking-wider">
          Searches Without Results
        </h3>
      </div>

      {data.length === 0 ? (
        <div className="flex items-center justify-center h-32 text-sm text-[var(--text3)]">
          No failed searches recorded
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-2.5 px-2 font-semibold text-[var(--text2)] text-xs uppercase tracking-wider">
                  Search Text
                </th>
                <th className="text-left py-2.5 px-2 font-semibold text-[var(--text2)] text-xs uppercase tracking-wider">
                  Field
                </th>
                <th className="text-left py-2.5 px-2 font-semibold text-[var(--text2)] text-xs uppercase tracking-wider">
                  Operator
                </th>
                <th className="text-right py-2.5 px-2 font-semibold text-[var(--text2)] text-xs uppercase tracking-wider">
                  Times
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-[var(--border)] hover:bg-[var(--surface2)] transition-colors"
                >
                  <td className="py-2.5 px-2 font-medium">{row.text}</td>
                  <td className="py-2.5 px-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                      {row.field}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-[var(--text2)]">{row.operator}</td>
                  <td className="py-2.5 px-2 text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700">
                      {row.times}
                    </span>
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
