import { Search, Zap, Gauge, AlertTriangle } from 'lucide-react';
import type { DashboardData } from '../lib/types';

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toLocaleString();
}

export function KPICards({ data }: { data: DashboardData }) {
  const cards = [
    {
      label: 'Total Searches Today',
      value: formatNumber(data.searchesToday),
      icon: Search,
      color: 'text-[var(--primary)]',
      bg: 'bg-[var(--primary-light)]',
    },
    {
      label: 'Average Response Time',
      value: `${Math.round(data.averageResponse)} ms`,
      icon: Gauge,
      color: 'text-[var(--success)]',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Cache Hit Rate',
      value: `${data.cacheHitRate.toFixed(1)}%`,
      icon: Zap,
      color: 'text-[var(--warning)]',
      bg: 'bg-amber-50',
      progress: data.cacheHitRate,
    },
    {
      label: 'Searches Without Results',
      value: formatNumber(
        data.noResults.reduce((sum, nr) => sum + nr.times, 0)
      ),
      icon: AlertTriangle,
      color: 'text-[var(--danger)]',
      bg: 'bg-red-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-[var(--border)] p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text2)]">
                {card.label}
              </span>
              <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center`}>
                <Icon size={18} className={card.color} />
              </div>
            </div>

            <div className="text-2xl font-bold tracking-tight">{card.value}</div>

            {'progress' in card && card.progress !== undefined && (
              <div className="mt-3">
                <div className="h-1.5 rounded-full bg-[var(--surface2)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500"
                    style={{ width: `${Math.min(card.progress, 100)}%` }}
                  />
                </div>
                <span className="text-xs text-[var(--text3)] mt-1 block">
                  {data.cacheMissRate.toFixed(1)}% miss rate
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
