import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import type { DashboardData } from './lib/types';
import { Header } from './components/Header';
import { KPICards } from './components/KPICards';
import { TopSearchesChart } from './components/TopSearchesChart';
import { PieChartCard } from './components/PieChartCard';
import { DonutChartCard } from './components/DonutChartCard';
import { TopPlayersTable } from './components/TopPlayersTable';
import { NoResultsTable } from './components/NoResultsTable';
import { BarChart3, AlertCircle, RefreshCw } from 'lucide-react';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-[var(--border)] p-5 animate-pulse">
      <div className="h-3 w-24 bg-[var(--surface2)] rounded mb-4" />
      <div className="h-8 w-16 bg-[var(--surface2)] rounded mb-2" />
      <div className="h-2 w-full bg-[var(--surface2)] rounded" />
    </div>
  );
}

function SkeletonChart() {
  return (
    <div className="bg-white rounded-xl border border-[var(--border)] p-5 animate-pulse">
      <div className="h-3 w-32 bg-[var(--surface2)] rounded mb-6" />
      <div className="h-[280px] bg-[var(--surface2)] rounded-lg" />
    </div>
  );
}

export default function App() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadData = useCallback(async () => {
    try {
      setError(null);
      const res = await axios.get<DashboardData>('/analytics/dashboard');
      setData(res.data);
      setLastUpdated(new Date());
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.status
          ? `Server error ${err.response.status}`
          : 'Cannot connect to server');
      } else {
        setError('Failed to load dashboard data');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30_000);
    return () => clearInterval(interval);
  }, [loadData]);

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="h-16 flex items-center mb-6">
            <div className="h-9 w-48 bg-[var(--surface2)] rounded-lg animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <SkeletonChart />
            <SkeletonChart />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <SkeletonChart />
            <SkeletonChart />
          </div>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={28} className="text-[var(--danger)]" />
          </div>
          <h2 className="text-lg font-bold mb-1">Connection Error</h2>
          <p className="text-sm text-[var(--text2)] mb-4">{error}</p>
          <button
            onClick={loadData}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg
              bg-[var(--primary)] text-white hover:bg-blue-600 transition-colors"
          >
            <RefreshCw size={15} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header lastUpdated={lastUpdated} onRefresh={loadData} loading={loading} />

      <main className="max-w-7xl mx-auto px-6 py-6 space-y-5">
        {/* KPI Cards */}
        {data && <KPICards data={data} />}

        {/* Row 2: Top Searches & Top Countries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {data && (
            <TopSearchesChart
              data={data.topSearches}
              title="Top Search Terms"
              color="var(--chart-1)"
            />
          )}
          {data && (
            <PieChartCard
              data={data.topCountries.map((c) => ({ ...c, message: c.message }))}
              title="Top Nationalities"
            />
          )}
        </div>

        {/* Row 3: Top Clubs & Top Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {data && (
            <TopSearchesChart
              data={data.topClubs.map((c) => ({ query: c.message, Total: c.count }))}
              title="Top Clubs"
              color="var(--chart-4)"
            />
          )}
          {data && <DonutChartCard data={data.topFilters} title="Top Filters Used" />}
        </div>

        {/* Row 4: Top Players Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {data && <TopPlayersTable data={data.topPlayers} title="Most Searched Players" />}
          {data && <NoResultsTable data={data.noResults} />}
        </div>
      </main>

      <footer className="border-t border-[var(--border)] py-4 mt-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs text-[var(--text3)]">
          <span>Search Analytics Dashboard &copy; {new Date().getFullYear()}</span>
          <span>
            Auto-refreshes every 30s &middot; Last update:{' '}
            {lastUpdated?.toLocaleTimeString() ?? '---'}
          </span>
        </div>
      </footer>
    </div>
  );
}
