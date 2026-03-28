import { stockApiService } from './stockApiService';
import { STOCK_API_ENDPOINTS } from '../types/stock';
import { createLogger } from '../utils/logger';

const logger = createLogger('IndividualStockServices');

/**
 * Individual service functions for each API endpoint
 * These can be called independently or through the batch service
 */

export class IndividualStockServices {
  
  // 1. Trending stocks
  async getTrendingStocks() {
    logger.info('Fetching trending stocks');
    const config = STOCK_API_ENDPOINTS.find(api => api.name === 'trending')!;
    return await stockApiService.fetchAndStore(config);
  }

  // 2. 52 week high/low data
  async get52WeekHighLowData() {
    logger.info('Fetching 52 week high/low data');
    const config = STOCK_API_ENDPOINTS.find(api => api.name === 'fetch_52_week_high_low_data')!;
    return await stockApiService.fetchAndStore(config);
  }

  // 3. Stock data by name
  async getStockData(stockName: string = 'tata steel') {
    logger.info(`Fetching stock data for: ${stockName}`);
    const config = {
      ...STOCK_API_ENDPOINTS.find(api => api.name === 'stock')!,
      params: { name: stockName }
    };
    return await stockApiService.fetchAndStore(config);
  }

  // 4. Historical data
  async getHistoricalData(
    stockName: string = 'tcs', 
    period: string = '1m', 
    filter: string = 'price'
  ) {
    logger.info(`Fetching historical data for ${stockName}, period: ${period}, filter: ${filter}`);
    const config = {
      ...STOCK_API_ENDPOINTS.find(api => api.name === 'historical_data')!,
      params: { stock_name: stockName, period, filter }
    };
    return await stockApiService.fetchAndStore(config);
  }

  // 5. Industry search
  async searchIndustry(query: string = 'tata') {
    logger.info(`Searching industry with query: ${query}`);
    const config = {
      ...STOCK_API_ENDPOINTS.find(api => api.name === 'industry_search')!,
      params: { query }
    };
    return await stockApiService.fetchAndStore(config);
  }

  // 6. NSE most active
  async getNSEMostActive() {
    logger.info('Fetching NSE most active stocks');
    const config = STOCK_API_ENDPOINTS.find(api => api.name === 'NSE_most_active')!;
    return await stockApiService.fetchAndStore(config);
  }

  // 7. BSE most active
  async getBSEMostActive() {
    logger.info('Fetching BSE most active stocks');
    const config = STOCK_API_ENDPOINTS.find(api => api.name === 'BSE_most_active')!;
    return await stockApiService.fetchAndStore(config);
  }

  // 8. IPO data
  async getIPOData() {
    logger.info('Fetching IPO data');
    const config = STOCK_API_ENDPOINTS.find(api => api.name === 'ipo')!;
    return await stockApiService.fetchAndStore(config);
  }

  // 9. Price shockers
  async getPriceShockers() {
    logger.info('Fetching price shockers');
    const config = STOCK_API_ENDPOINTS.find(api => api.name === 'price_shockers')!;
    return await stockApiService.fetchAndStore(config);
  }

  // 10. Stock target price
  async getStockTargetPrice(stockId: string = 'TCS') {
    logger.info(`Fetching target price for stock: ${stockId}`);
    const config = {
      ...STOCK_API_ENDPOINTS.find(api => api.name === 'stock_target_price')!,
      params: { stock_id: stockId }
    };
    return await stockApiService.fetchAndStore(config);
  }

  // 11. Corporate actions
  async getCorporateActions(stockName: string = 'infosys') {
    logger.info(`Fetching corporate actions for: ${stockName}`);
    const config = {
      ...STOCK_API_ENDPOINTS.find(api => api.name === 'corporate_actions')!,
      params: { stock_name: stockName }
    };
    return await stockApiService.fetchAndStore(config);
  }

  // 12. Fetch all APIs (batch)
  async fetchAllStockApis() {
    logger.info('Fetching data from all stock APIs');
    return await stockApiService.fetchMultipleApis(STOCK_API_ENDPOINTS);
  }

  // Helper method to get specific API data from database
  async getStoredData(apiName: string, limit: number = 10) {
    return await stockApiService.getApiData(apiName, limit);
  }

  // Helper method to get latest data for specific API
  async getLatestStoredData(apiName: string) {
    return await stockApiService.getLatestApiData(apiName);
  }

  // Get all stored data with optional filtering
  async getAllStoredData(apiName?: string, limit: number = 50) {
    return await stockApiService.getApiData(apiName, limit);
  }
}

export const individualStockServices = new IndividualStockServices();
