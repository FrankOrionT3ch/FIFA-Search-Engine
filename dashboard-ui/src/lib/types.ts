export interface SearchStats {
  query: string;
  Total: number;
}

export interface ConsultPlayerSpecifict {
  message: string;
  count: number;
}

export interface FilterStats {
  field: string;
  count: number;
}

export interface NoResult {
  text: string;
  field: string;
  operator: string;
  times: number;
}

export interface DashboardData {
  searchesToday: number;
  averageResponse: number;
  cacheHitRate: number;
  cacheMissRate: number;
  topSearches: SearchStats[];
  topPlayers: ConsultPlayerSpecifict[];
  topCountries: ConsultPlayerSpecifict[];
  topClubs: ConsultPlayerSpecifict[];
  topFilters: FilterStats[];
  noResults: NoResult[];
}
