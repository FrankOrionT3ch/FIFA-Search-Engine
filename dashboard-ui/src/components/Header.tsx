import { RefreshCw, Clock, Activity } from 'lucide-react';

interface HeaderProps {
  lastUpdated: Date | null;
  onRefresh: () => void;
  loading: boolean;
}

export function Header({ lastUpdated, onRefresh, loading }: HeaderProps) {
  return (
    <header className="bg-white border-b border-[var(--border)] sticky top-0 z-50 backdrop-blur-sm bg-white/90">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[var(--primary)] flex items-center justify-center">
            <Activity size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Search Analytics</h1>
            <p className="text-xs text-[var(--text2)] -mt-0.5">
              Real-time analytics of the Soccer Player Search Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs text-[var(--text2)]">
            <Clock size={14} />
            <span>
              {lastUpdated
                ? lastUpdated.toLocaleTimeString(undefined, {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })
                : '---'}
            </span>
          </div>

          <button
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium rounded-lg
              border border-[var(--border)] bg-white hover:bg-[var(--surface2)] transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw
              size={15}
              className={loading ? 'animate-spin' : ''}
            />
            Refresh
          </button>
        </div>
      </div>
    </header>
  );
}
