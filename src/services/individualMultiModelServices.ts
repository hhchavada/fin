import { multiModelStockService } from './multiModelStockService';
import { STOCK_API_ENDPOINTS } from '../types/stock';
import { createLogger } from '../utils/logger';

const logger = createLogger('IndividualMultiModelServices');

/**
 * Individual service functions for each API endpoint
 * These use separate database collections for each API
 */

export class IndividualMultiModelServices {
  
  // 1. Trending stocks
  async getTrendingStocks() {
    logger.info('Fetching trending stocks');
    const config = STOCK_API_ENDPOINTS.find(api => api.name === 'trending')!;
    return await multiModelStockService.fetchAndStore(config);
  }

  // 2. 52 week high/low data
  async get52WeekHighLowData() {
    logger.info('Fetching 52 week high/low data');
    const config = STOCK_API_ENDPOINTS.find(api => api.name === 'fetch_52_week_high_low_data')!;
    return await multiModelStockService.fetchAndStore(config);
  }

  // 3. Company details
  async getCompanyDetails(stockName: string = 'tata steel') {
    logger.info(`Fetching company details for: ${stockName}`);
    const config = {
      ...STOCK_API_ENDPOINTS.find(api => api.name === 'stock')!,
      params: { name: stockName }
    };
    return await multiModelStockService.fetchAndStore(config);
  }

  // 4. Industry search
  async searchIndustry(query: string = 'tata') {
    logger.info(`Searching industry with query: ${query}`);
    const config = {
      ...STOCK_API_ENDPOINTS.find(api => api.name === 'industry_search')!,
      params: { query }
    };
    return await multiModelStockService.fetchAndStore(config);
  }

  // 5. Stock fundamentals
  async getStockFundamentals(stockName: string = 'infosys') {
    logger.info(`Fetching stock fundamentals for: ${stockName}`);
    const config = {
      ...STOCK_API_ENDPOINTS.find(api => api.name === 'stock_fundamentals')!,
      params: { name: stockName }
    };
    return await multiModelStockService.fetchAndStore(config);
  }

  // 6. NSE most active
  async getNSEMostActive() {
    logger.info('Fetching NSE most active stocks');
    const config = STOCK_API_ENDPOINTS.find(api => api.name === 'nse_most_active')!;
    return await multiModelStockService.fetchAndStore(config);
  }

  // 7. BSE most active
  async getBSEMostActive() {
    logger.info('Fetching BSE most active stocks');
    const config = STOCK_API_ENDPOINTS.find(api => api.name === 'bse_most_active')!;
    return await multiModelStockService.fetchAndStore(config);
  }

  // 8. IPO data
  async getIPOData() {
    logger.info('Fetching IPO data');
    const config = STOCK_API_ENDPOINTS.find(api => api.name === 'ipo')!;
    return await multiModelStockService.fetchAndStore(config);
  }

  // 9. 52 week high/low (duplicate for different naming)
  async get52WeekHighLow() {
    logger.info('Fetching 52 week high/low data');
    const config = STOCK_API_ENDPOINTS.find(api => api.name === 'fetch_52_week_high_low')!;
    return await multiModelStockService.fetchAndStore(config);
  }

  // 10. Fetch all APIs (batch)
  async fetchAllStockApis() {
    logger.info('Fetching data from all stock APIs');
    return await multiModelStockService.fetchMultipleApis(STOCK_API_ENDPOINTS);
  }

  // Helper method to get specific API data from database
  async getStoredData(apiName: string, limit: number = 10) {
    return await multiModelStockService.getApiData(apiName, limit);
  }

  // Helper method to get latest data for specific API
  async getLatestStoredData(apiName: string) {
    return await multiModelStockService.getLatestApiData(apiName);
  }

  // Get all stored data with optional filtering
  async getAllStoredData(apiName?: string, limit: number = 50) {
    if (!apiName) {
      throw new Error('API name is required for getAllStoredData');
    }
    return await multiModelStockService.getApiData(apiName, limit);
  }
}

export const individualMultiModelServices = new IndividualMultiModelServices();
