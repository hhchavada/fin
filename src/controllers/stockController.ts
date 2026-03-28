import { Request, Response } from 'express';
import { individualStockServices } from '../services/individualStockServices';
import { createLogger } from '../utils/logger';

const logger = createLogger('StockController');

export class StockController {
  
  /**
   * Get trending stocks
   */
  async getTrending(req: Request, res: Response) {
    try {
      const result = await individualStockServices.getTrendingStocks();
      
      res.json({
        success: true,
        message: 'Trending stocks data fetched successfully',
        data: {
          api_name: result.api_name,
          status: result.status,
          fetched_at: result.fetched_at,
          response_time_ms: result.response_time_ms,
          data: result.data,
          meta: result.meta
        }
      });
    } catch (error: any) {
      logger.error('Failed to fetch trending stocks', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch trending stocks',
        error: error.message
      });
    }
  }

  /**
   * Get 52 week high/low data
   */
  async get52WeekHighLow(req: Request, res: Response) {
    try {
      const result = await individualStockServices.get52WeekHighLowData();
      
      res.json({
        success: true,
        message: '52 week high/low data fetched successfully',
        data: {
          api_name: result.api_name,
          status: result.status,
          fetched_at: result.fetched_at,
          response_time_ms: result.response_time_ms,
          data: result.data,
          meta: result.meta
        }
      });
    } catch (error: any) {
      logger.error('Failed to fetch 52 week high/low data', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch 52 week high/low data',
        error: error.message
      });
    }
  }

  /**
   * Get stock data by name
   */
  async getStock(req: Request, res: Response) {
    try {
      const { name } = req.query;
      const stockName = (name as string) || 'tata steel';
      
      const result = await individualStockServices.getStockData(stockName);
      
      res.json({
        success: true,
        message: `Stock data for ${stockName} fetched successfully`,
        data: {
          api_name: result.api_name,
          status: result.status,
          fetched_at: result.fetched_at,
          response_time_ms: result.response_time_ms,
          data: result.data,
          meta: result.meta
        }
      });
    } catch (error: any) {
      logger.error('Failed to fetch stock data', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch stock data',
        error: error.message
      });
    }
  }

  /**
   * Get historical data
   */
  async getHistoricalData(req: Request, res: Response) {
    try {
      const { stock_name, period, filter } = req.query;
      
      const result = await individualStockServices.getHistoricalData(
        (stock_name as string) || 'tcs',
        (period as string) || '1m',
        (filter as string) || 'price'
      );
      
      res.json({
        success: true,
        message: 'Historical data fetched successfully',
        data: {
          api_name: result.api_name,
          status: result.status,
          fetched_at: result.fetched_at,
          response_time_ms: result.response_time_ms,
          data: result.data,
          meta: result.meta
        }
      });
    } catch (error: any) {
      logger.error('Failed to fetch historical data', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch historical data',
        error: error.message
      });
    }
  }

  /**
   * Search industry
   */
  async searchIndustry(req: Request, res: Response) {
    try {
      const { query } = req.query;
      const searchQuery = (query as string) || 'tata';
      
      const result = await individualStockServices.searchIndustry(searchQuery);
      
      res.json({
        success: true,
        message: `Industry search results for "${searchQuery}" fetched successfully`,
        data: {
          api_name: result.api_name,
          status: result.status,
          fetched_at: result.fetched_at,
          response_time_ms: result.response_time_ms,
          data: result.data,
          meta: result.meta
        }
      });
    } catch (error: any) {
      logger.error('Failed to search industry', error);
      res.status(500).json({
        success: false,
        message: 'Failed to search industry',
        error: error.message
      });
    }
  }

  /**
   * Get NSE most active stocks
   */
  async getNSEMostActive(req: Request, res: Response) {
    try {
      const result = await individualStockServices.getNSEMostActive();
      
      res.json({
        success: true,
        message: 'NSE most active stocks fetched successfully',
        data: {
          api_name: result.api_name,
          status: result.status,
          fetched_at: result.fetched_at,
          response_time_ms: result.response_time_ms,
          data: result.data,
          meta: result.meta
        }
      });
    } catch (error: any) {
      logger.error('Failed to fetch NSE most active stocks', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch NSE most active stocks',
        error: error.message
      });
    }
  }

  /**
   * Get BSE most active stocks
   */
  async getBSEMostActive(req: Request, res: Response) {
    try {
      const result = await individualStockServices.getBSEMostActive();
      
      res.json({
        success: true,
        message: 'BSE most active stocks fetched successfully',
        data: {
          api_name: result.api_name,
          status: result.status,
          fetched_at: result.fetched_at,
          response_time_ms: result.response_time_ms,
          data: result.data,
          meta: result.meta
        }
      });
    } catch (error: any) {
      logger.error('Failed to fetch BSE most active stocks', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch BSE most active stocks',
        error: error.message
      });
    }
  }

  /**
   * Get IPO data
   */
  async getIPO(req: Request, res: Response) {
    try {
      const result = await individualStockServices.getIPOData();
      
      res.json({
        success: true,
        message: 'IPO data fetched successfully',
        data: {
          api_name: result.api_name,
          status: result.status,
          fetched_at: result.fetched_at,
          response_time_ms: result.response_time_ms,
          data: result.data,
          meta: result.meta
        }
      });
    } catch (error: any) {
      logger.error('Failed to fetch IPO data', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch IPO data',
        error: error.message
      });
    }
  }

  /**
   * Get price shockers
   */
  async getPriceShockers(req: Request, res: Response) {
    try {
      const result = await individualStockServices.getPriceShockers();
      
      res.json({
        success: true,
        message: 'Price shockers fetched successfully',
        data: {
          api_name: result.api_name,
          status: result.status,
          fetched_at: result.fetched_at,
          response_time_ms: result.response_time_ms,
          data: result.data,
          meta: result.meta
        }
      });
    } catch (error: any) {
      logger.error('Failed to fetch price shockers', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch price shockers',
        error: error.message
      });
    }
  }

  /**
   * Get stock target price
   */
  async getStockTargetPrice(req: Request, res: Response) {
    try {
      const { stock_id } = req.query;
      const stockId = (stock_id as string) || 'TCS';
      
      const result = await individualStockServices.getStockTargetPrice(stockId);
      
      res.json({
        success: true,
        message: `Target price for ${stockId} fetched successfully`,
        data: {
          api_name: result.api_name,
          status: result.status,
          fetched_at: result.fetched_at,
          response_time_ms: result.response_time_ms,
          data: result.data,
          meta: result.meta
        }
      });
    } catch (error: any) {
      logger.error('Failed to fetch stock target price', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch stock target price',
        error: error.message
      });
    }
  }

  /**
   * Get corporate actions
   */
  async getCorporateActions(req: Request, res: Response) {
    try {
      const { stock_name } = req.query;
      const stockName = (stock_name as string) || 'infosys';
      
      const result = await individualStockServices.getCorporateActions(stockName);
      
      res.json({
        success: true,
        message: `Corporate actions for ${stockName} fetched successfully`,
        data: {
          api_name: result.api_name,
          status: result.status,
          fetched_at: result.fetched_at,
          response_time_ms: result.response_time_ms,
          data: result.data,
          meta: result.meta
        }
      });
    } catch (error: any) {
      logger.error('Failed to fetch corporate actions', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch corporate actions',
        error: error.message
      });
    }
  }

  /**
   * Fetch all APIs
   */
  async fetchAll(req: Request, res: Response) {
    try {
      const results = await individualStockServices.fetchAllStockApis();
      
      const successful = results.filter(r => r.status === 'success').length;
      const failed = results.filter(r => r.status === 'failed').length;
      
      res.json({
        success: true,
        message: 'All stock APIs fetched',
        data: {
          summary: {
            total: results.length,
            successful,
            failed
          },
          results: results.map(result => ({
            api_name: result.api_name,
            status: result.status,
            fetched_at: result.fetched_at,
            response_time_ms: result.response_time_ms,
            data: result.data,
            error: result.error,
            meta: result.meta
          }))
        }
      });
    } catch (error: any) {
      logger.error('Failed to fetch all stock APIs', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch all stock APIs',
        error: error.message
      });
    }
  }

  /**
   * Get stored data from database
   */
  async getStoredData(req: Request, res: Response) {
    try {
      const { api_name, limit = '10' } = req.query;
      
      const data = await individualStockServices.getStoredData(
        api_name as string,
        parseInt(limit as string)
      );
      
      res.json({
        success: true,
        message: 'Stored data retrieved successfully',
        data: {
          api_name: api_name || 'all',
          count: data.length,
          data
        }
      });
    } catch (error: any) {
      logger.error('Failed to retrieve stored data', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve stored data',
        error: error.message
      });
    }
  }

  /**
   * Get latest stored data
   */
  async getLatestStoredData(req: Request, res: Response): Promise<void> {
    try {
      const { api_name } = req.params;
      
      if (!api_name) {
        res.status(400).json({
          success: false,
          message: 'API name is required'
        });
        return;
      }
      
      const data = await individualStockServices.getLatestStoredData(api_name);
      
      if (!data) {
        res.status(404).json({
          success: false,
          message: `No data found for API: ${api_name}`
        });
        return;
      }
      
      res.json({
        success: true,
        message: 'Latest stored data retrieved successfully',
        data
      });
    } catch (error: any) {
      logger.error('Failed to retrieve latest stored data', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve latest stored data',
        error: error.message
      });
    }
  }
}

export const stockController = new StockController();
