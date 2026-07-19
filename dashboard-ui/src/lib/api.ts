import axios from 'axios';
import type { DashboardData } from './types';

const api = axios.create({
  baseURL: '/analytics',
  timeout: 10000,
});

export async function fetchDashboard(): Promise<DashboardData> {
  const { data } = await api.get<DashboardData>('/dashboard');
  return data;
}
