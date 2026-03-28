// Stock API related types

export interface StockApiConfig {
  name: string;
  endpoint: string;
  method: 'GET' | 'POST';
  params?: Record<string, string | number>;
  headers?: Record<string, string>;
}

export interface StockApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  metadata?: {
    response_time_ms: number;
    api_name: string;
    fetched_at: Date;
  };
}

export interface ApiExecutionResult {
  api_name: string;
  status: 'success' | 'failed';
  data?: any;
  error?: string;
  response_time_ms: number;
  fetched_at: Date;
  meta?: Record<string, any>;
}

export interface CronJobResult {
  total_apis: number;
  successful: number;
  failed: number;
  results: ApiExecutionResult[];
  started_at: Date;
  completed_at: Date;
  total_duration_ms: number;
}

// API endpoints configuration for Indian Stock Exchange API
export const STOCK_API_ENDPOINTS: StockApiConfig[] = [
  {
    name: 'trending',
    endpoint: '/trending',
    method: 'GET'
  },
  {
    name: 'fetch_52_week_high_low_data',
    endpoint: '/fetch_52_week_high_low_data',
    method: 'GET'
  },
  {
    name: 'stock',
    endpoint: '/stock',
    method: 'GET',
    params: { name: 'tata steel' }
  },
  {
    name: 'historical_data_price',
    endpoint: '/historical_data',
    method: 'GET',
    params: { stock_name: 'tcs', period: '1m', filter: 'price' }
  },
  {
    name: 'industry_search',
    endpoint: '/industry_search',
    method: 'GET',
    params: { query: 'tata' }
  },
  {
    name: 'historical_data_ohlcv',
    endpoint: '/historical_data',
    method: 'GET',
    params: { stock_name: 'tcs', period: '1m' }
  },
  {
    name: 'stock_fundamentals',
    endpoint: '/stock',
    method: 'GET',
    params: { name: 'infosys' }
  },
  {
    name: 'nse_most_active',
    endpoint: '/NSE_most_active',
    method: 'GET'
  },
  {
    name: 'bse_most_active',
    endpoint: '/BSE_most_active',
    method: 'GET'
  },
  {
    name: 'ipo',
    endpoint: '/ipo',
    method: 'GET'
  },
  {
    name: 'fetch_52_week_high_low',
    endpoint: '/fetch_52_week_high_low_data',
    method: 'GET'
  }
];
