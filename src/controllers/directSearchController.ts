import { Request, Response } from 'express';
import { ApiClient } from '../utils/apiClient';
import { createLogger } from '../utils/logger';

const logger = createLogger('DirectSearchController');
const apiClient = new ApiClient();

export class DirectSearchController {
  
  /**
   * 1. Search company details by name
   * Direct API call - no database storage
   */
  async searchCompanyDetails(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.query;
      
      if (!name) {
        res.status(400).json({
          success: false,
          message: 'Company name is required',
          example: '/api/v1/search/company?name=tata%20steel'
        });
        return;
      }
      
      logger.info(`Direct API search for company: ${name}`);
      
      const result = await apiClient.get('/stock', { name: name.toString() }) as any;
      
      res.json({
        success: true,
        message: `Company details found for "${name}"`,
        data: result, // Full API response
        search_type: 'company_details',
        search_query: name,
        response_time_ms: result.responseTimeMs,
        timestamp: new Date().toISOString()
      });
        return;
    } catch (error: any) {
      logger.error('Failed to search company details', error);
      res.status(500).json({
        success: false,
        message: 'Failed to search company details',
        error: error.message,
        search_type: 'company_details',
        search_query: req.query.name
      });
        return;
    }
  }

  /**
   * 2. Search historical data by stock name
   * Direct API call - no database storage
   */
  async searchHistoricalData(req: Request, res: Response): Promise<void> {
    try {
      const { stock_name, period = '1m', filter = 'price' } = req.query;
      
      if (!stock_name) {
        res.status(400).json({
          success: false,
          message: 'Stock name is required',
          example: '/api/v1/search/historical?stock_name=tcs&period=1m&filter=price'
        });
        return;
      }
      
      logger.info(`Direct API search for historical data: ${stock_name}, period: ${period}, filter: ${filter}`);
      
      const result = await apiClient.get('/historical_data', { 
        stock_name: stock_name.toString(), 
        period: period.toString(), 
        filter: filter.toString() 
      }) as any;
      
      res.json({
        success: true,
        message: `Historical data found for "${stock_name}"`,
        data: result, // Full API response
        search_type: 'historical_data',
        search_query: {
          stock_name,
          period,
          filter
        },
        response_time_ms: result.responseTimeMs,
        timestamp: new Date().toISOString()
      });
        return;
    } catch (error: any) {
      logger.error('Failed to search historical data', error);
      res.status(500).json({
        success: false,
        message: 'Failed to search historical data',
        error: error.message,
        search_type: 'historical_data',
        search_query: req.query.stock_name
      });
        return;
    }
  }

  /**
   * 3. Search stock fundamentals by name
   * Direct API call - no database storage
   */
  async searchStockFundamentals(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.query;
      
      if (!name) {
        res.status(400).json({
          success: false,
          message: 'Company name is required',
          example: '/api/v1/search/fundamentals?name=infosys'
        });
        return;
      }
      
      logger.info(`Direct API search for stock fundamentals: ${name}`);
      
      const result = await apiClient.get('/stock', { name: name.toString() }) as any;
      
      res.json({
        success: true,
        message: `Stock fundamentals found for "${name}"`,
        data: result, // Full API response
        search_type: 'stock_fundamentals',
        search_query: name,
        response_time_ms: result.responseTimeMs,
        timestamp: new Date().toISOString()
      });
        return;
    } catch (error: any) {
      logger.error('Failed to search stock fundamentals', error);
      res.status(500).json({
        success: false,
        message: 'Failed to search stock fundamentals',
        error: error.message,
        search_type: 'stock_fundamentals',
        search_query: req.query.name
      });
        return;
    }
  }

  /**
   * 4. Search industry by query
   * Direct API call - no database storage
   */
  async searchIndustry(req: Request, res: Response): Promise<void> {
    try {
      const { query } = req.query;
      
      if (!query) {
        res.status(400).json({
          success: false,
          message: 'Search query is required',
          example: '/api/v1/search/industry?query=tata'
        });
        return;
      }
      
      logger.info(`Direct API search for industry: ${query}`);
      
      const result = await apiClient.get('/industry_search', { query: query.toString() }) as any;
      
      res.json({
        success: true,
        message: `Industry search results for "${query}"`,
        data: result, // Full API response
        search_type: 'industry_search',
        search_query: query,
        response_time_ms: result.responseTimeMs,
        timestamp: new Date().toISOString()
      });
        return;
    } catch (error: any) {
      logger.error('Failed to search industry', error);
      res.status(500).json({
        success: false,
        message: 'Failed to search industry',
        error: error.message,
        search_type: 'industry_search',
        search_query: req.query.query
      });
        return;
    }
  }

  /**
   * 5. Universal search endpoint
   * Can search across multiple API types
   */
  async universalSearch(req: Request, res: Response): Promise<void> {
    try {
      const { type, query, stock_name, name, period = '1m', filter = 'price' } = req.query;
      
      if (!type) {
        res.status(400).json({
          success: false,
          message: 'Search type is required',
          available_types: ['company', 'historical', 'fundamentals', 'industry'],
          examples: [
            '/api/v1/search/universal?type=company&name=tata%20steel',
            '/api/v1/search/universal?type=historical&stock_name=tcs&period=1m',
            '/api/v1/search/universal?type=fundamentals&name=infosys',
            '/api/v1/search/universal?type=industry&query=tata'
          ]
        });
        return;
      }
      
      let result;
      
      switch (type.toString()) {
        case 'company':
          if (!name) {
            res.status(400).json({
              success: false,
              message: 'Company name is required for company search'
            });
        return;
          }
          logger.info(`Universal search - company: ${name}`);
          result = await apiClient.get('/stock', { name: name.toString() });
        return;
          break;
          
        case 'historical':
          if (!stock_name) {
            res.status(400).json({
              success: false,
              message: 'Stock name is required for historical search'
            });
        return;
          }
          logger.info(`Universal search - historical: ${stock_name}`);
          result = await apiClient.get('/historical_data', { 
            stock_name: stock_name.toString(), 
            period: period.toString(), 
            filter: filter.toString() 
          }) as any;
          break;
          
        case 'fundamentals':
          if (!name) {
            res.status(400).json({
              success: false,
              message: 'Company name is required for fundamentals search'
            });
        return;
          }
          logger.info(`Universal search - fundamentals: ${name}`);
          result = await apiClient.get('/stock', { name: name.toString() });
        return;
          break;
          
        case 'industry':
          if (!query) {
            res.status(400).json({
              success: false,
              message: 'Query is required for industry search'
            });
        return;
          }
          logger.info(`Universal search - industry: ${query}`);
          result = await apiClient.get('/industry_search', { query: query.toString() }) as any;
          break;
          
        default:
          res.status(400).json({
            success: false,
            message: 'Invalid search type',
            available_types: ['company', 'historical', 'fundamentals', 'industry']
          });
        return;
      }
      
      res.json({
        success: true,
        message: `Universal search completed for type: ${type}`,
        data: result, // Full API response
        search_type: type,
        search_query: { type, query, stock_name, name, period, filter },
        response_time_ms: result.responseTimeMs,
        timestamp: new Date().toISOString()
      });
        return;
      
    } catch (error: any) {
      logger.error('Failed to perform universal search', error);
      res.status(500).json({
        success: false,
        message: 'Failed to perform universal search',
        error: error.message,
        search_type: req.query.type,
        search_query: req.query
      });
        return;
    }
  }
}

export const directSearchController = new DirectSearchController();
