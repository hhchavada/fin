import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { config } from '../config/env';
import { createLogger } from './logger';

const logger = createLogger('ApiClient');

export class ApiClient {
  private client: AxiosInstance;
  private retryConfig = {
    maxRetries: 3,
    retryDelay: 1000, // 1 second
    backoffMultiplier: 2
  };

  constructor() {
    this.client = axios.create({
      baseURL: config.STOCK_API_BASE_URL,
      timeout: 30000, // 30 seconds
      headers: {
        'x-rapidapi-host': config.RAPIDAPI_HOST,
        'x-rapidapi-key': config.RAPIDAPI_KEY,
        'Content-Type': 'application/json'
      }
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        logger.debug('Making API request', {
          method: config.method?.toUpperCase(),
          url: config.url,
          params: config.params
        });
        return config;
      },
      (error) => {
        logger.error('Request interceptor error', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        logger.debug('API response received', {
          status: response.status,
          url: response.config.url,
          duration: response.headers['x-response-time'] || 'N/A'
        });
        return response;
      },
      (error) => {
        logger.error('Response interceptor error', error);
        return Promise.reject(error);
      }
    );
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async retryRequest<T>(
    requestFn: () => Promise<AxiosResponse<T>>,
    retries: number = 0
  ): Promise<AxiosResponse<T>> {
    try {
      return await requestFn();
    } catch (error: any) {
      if (retries < this.retryConfig.maxRetries && 
          (error.code === 'ECONNRESET' || 
           error.code === 'ETIMEDOUT' || 
           error.response?.status >= 500)) {
        
        const delay = this.retryConfig.retryDelay * 
                     Math.pow(this.retryConfig.backoffMultiplier, retries);
        
        logger.warn(`Retrying request in ${delay}ms`, {
          attempt: retries + 1,
          maxRetries: this.retryConfig.maxRetries,
          error: error.message
        });

        await this.sleep(delay);
        return this.retryRequest(requestFn, retries + 1);
      }
      
      throw error;
    }
  }

  async get<T>(
    endpoint: string, 
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const startTime = Date.now();
    
    try {
      const response = await this.retryRequest(() =>
        this.client.get<T>(endpoint, {
          ...config,
          params
        })
      );

      const duration = Date.now() - startTime;
      logger.info('API request successful', {
        endpoint,
        duration,
        status: response.status
      });

      return response.data;
    } catch (error: any) {
      const duration = Date.now() - startTime;
      logger.error('API request failed', error, {
        endpoint,
        duration,
        status: error.response?.status,
        statusText: error.response?.statusText
      });
      
      throw error;
    }
  }

  async post<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const startTime = Date.now();
    
    try {
      const response = await this.retryRequest(() =>
        this.client.post<T>(endpoint, data, config)
      );

      const duration = Date.now() - startTime;
      logger.info('API request successful', {
        endpoint,
        duration,
        status: response.status
      });

      return response.data;
    } catch (error: any) {
      const duration = Date.now() - startTime;
      logger.error('API request failed', error, {
        endpoint,
        duration,
        status: error.response?.status,
        statusText: error.response?.statusText
      });
      
      throw error;
    }
  }
}

export const apiClient = new ApiClient();
