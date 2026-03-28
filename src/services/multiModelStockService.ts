import { TrendingStocksModel } from '../models/TrendingStocks';
import { Week52HighLowModel } from '../models/Week52HighLow';
import { CompanyDetailsModel } from '../models/CompanyDetails';
import { HistoricalDataModel } from '../models/HistoricalData';
import { IndustrySearchModel } from '../models/IndustrySearch';
import { NSEMostActiveModel } from '../models/NSEMostActive';
import { BSEMostActiveModel } from '../models/BSEMostActive';
import { IPODataModel } from '../models/IPOData';
import { StockFundamentalsModel } from '../models/StockFundamentals';
import { HistoricalOHLCVModel } from '../models/HistoricalOHLCV';
import { Week52HighLowAltModel } from '../models/Week52HighLowAlt';
import { apiClient } from '../utils/apiClient';
import { createLogger } from '../utils/logger';
import { StockApiConfig, ApiExecutionResult } from '../types/stock';

const logger = createLogger('MultiModelStockService');

export class MultiModelStockService {
  
  /**
   * Get the appropriate model based on API name
   */
  private getModel(apiName: string): any {
    const modelMap: { [key: string]: any } = {
      'trending': TrendingStocksModel,
      'fetch_52_week_high_low_data': Week52HighLowModel,
      'stock': CompanyDetailsModel,
      'historical_data_price': HistoricalDataModel,
      'industry_search': IndustrySearchModel,
      'historical_data_ohlcv': HistoricalOHLCVModel,
      'stock_fundamentals': StockFundamentalsModel,
      'nse_most_active': NSEMostActiveModel,
      'bse_most_active': BSEMostActiveModel,
      'ipo': IPODataModel,
      'fetch_52_week_high_low': Week52HighLowAltModel
    };
    
    return modelMap[apiName] || TrendingStocksModel;
  }

  /**
   * Generic function to fetch data from API and store in appropriate database collection
   */
  async fetchAndStore(apiConfig: StockApiConfig): Promise<ApiExecutionResult> {
    const startTime = Date.now();
    const result: ApiExecutionResult = {
      api_name: apiConfig.name,
      status: 'failed',
      response_time_ms: 0,
      fetched_at: new Date()
    };

    try {
      logger.info(`Fetching data from ${apiConfig.name} API`, {
        endpoint: apiConfig.endpoint,
        params: apiConfig.params
      });

      // Fetch data from API
      const responseData = await apiClient.get(
        apiConfig.endpoint,
        apiConfig.params
      );

      const responseTime = Date.now() - startTime;
      result.response_time_ms = responseTime;
      result.status = 'success';
      result.data = responseData;

      // Prepare metadata
      const meta: any = {
        response_time_ms: responseTime,
        api_endpoint: apiConfig.endpoint,
        ...apiConfig.params
      };

      // Extract relevant metadata from response if available
      if (responseData && typeof responseData === 'object') {
        const responseObj = responseData as any;
        if (responseObj.stock_name) meta.stock_name = responseObj.stock_name;
        if (responseObj.stock_id) meta.stock_id = responseObj.stock_id;
        if (responseObj.symbol) meta.symbol = responseObj.symbol;
        if (responseObj.name) meta.name = responseObj.name;
      }

      result.meta = meta;

      // Store in appropriate database collection
      await this.storeApiData(apiConfig.name, responseData, 'success', meta);

      logger.info(`Successfully fetched and stored ${apiConfig.name} data`, {
        response_time_ms: responseTime,
        data_size: JSON.stringify(responseData).length
      });

    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      result.response_time_ms = responseTime;
      result.error = error.message || 'Unknown error occurred';

      // Prepare error metadata
      const errorMeta: any = {
        response_time_ms: responseTime,
        api_endpoint: apiConfig.endpoint,
        error_message: error.message,
        error_code: error.code,
        error_status: error.response?.status,
        ...apiConfig.params
      };

      result.meta = errorMeta;

      // Store error in database
      const errorData = {
        error: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        timestamp: new Date().toISOString()
      };

      await this.storeApiData(apiConfig.name, errorData, 'failed', errorMeta);

      logger.error(`Failed to fetch ${apiConfig.name} data`, error, {
        response_time_ms: responseTime,
        api_endpoint: apiConfig.endpoint
      });
    }

    return result;
  }

  /**
   * Store API data in appropriate MongoDB collection
   * Deletes old data before storing new data
   */
  private async storeApiData(
    apiName: string,
    data: any,
    status: 'success' | 'failed',
    meta?: any
  ): Promise<any> {
    try {
      const Model = this.getModel(apiName);
      
      // Delete all existing data for this API before storing new data
      await Model.deleteMany({});
      
      logger.info(`Deleted old data for ${apiName} API before storing new data`);
      
      const apiData = new Model({
        data,
        status,
        meta,
        fetched_at: new Date()
      });

      const result = await apiData.save();
      
      logger.info(`Successfully stored new data for ${apiName} API`, {
        status,
        data_size: JSON.stringify(data).length
      });

      return result;
    } catch (error: any) {
      logger.error('Failed to store API data in database', error, {
        api_name: apiName,
        status
      });
      throw error;
    }
  }

  /**
   * Fetch data from multiple APIs concurrently
   */
  async fetchMultipleApis(apiConfigs: StockApiConfig[]): Promise<ApiExecutionResult[]> {
    logger.info(`Fetching data from ${apiConfigs.length} APIs concurrently`);

    const promises = apiConfigs.map(config => this.fetchAndStore(config));
    const results = await Promise.allSettled(promises);

    const executionResults: ApiExecutionResult[] = results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        logger.error(`API execution failed for ${apiConfigs[index].name}`, result.reason);
        return {
          api_name: apiConfigs[index].name,
          status: 'failed' as const,
          error: result.reason?.message || 'Unknown error',
          response_time_ms: 0,
          fetched_at: new Date(),
          meta: { api_endpoint: apiConfigs[index].endpoint }
        };
      }
    });

    const successful = executionResults.filter(r => r.status === 'success').length;
    const failed = executionResults.filter(r => r.status === 'failed').length;

    logger.info(`Batch API execution completed`, {
      total: apiConfigs.length,
      successful,
      failed
    });

    return executionResults;
  }

  /**
   * Get stored API data from specific collection
   */
  async getApiData(
    apiName: string,
    limit: number = 10,
    offset: number = 0
  ): Promise<any[]> {
    try {
      const Model = this.getModel(apiName);
      
      const data = await Model
        .find({ status: 'success' })
        .sort({ fetched_at: -1 })
        .limit(limit)
        .skip(offset)
        .lean();

      return data;
    } catch (error: any) {
      logger.error('Failed to retrieve API data from database', error, {
        api_name: apiName
      });
      throw error;
    }
  }

  /**
   * Get latest data for specific API
   */
  async getLatestApiData(apiName: string): Promise<any> {
    try {
      const Model = this.getModel(apiName);
      
      const latestData = await Model
        .findOne({ status: 'success' })
        .sort({ fetched_at: -1 })
        .lean();

      return latestData;
    } catch (error: any) {
      logger.error('Failed to retrieve latest API data', error, {
        api_name: apiName
      });
      throw error;
    }
  }
}

export const multiModelStockService = new MultiModelStockService();
