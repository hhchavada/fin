import { Request, Response } from 'express';
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
import { createLogger } from '../utils/logger';

const logger = createLogger('UserStockDataController');

export class UserStockDataController {
  
  /**
   * 1. Get trending stocks data from database
   */
  async getTrendingStocks(req: Request, res: Response): Promise<void> {
    try {
      const data = await TrendingStocksModel
        .findOne({ status: 'success' })
        .sort({ fetched_at: -1 })
        .lean();
      
      if (!data) {
        res.status(404).json({
          success: false,
          message: 'No trending stocks data found. Please fetch data first.',
          data: null
        });
        return;
      }
      
      res.json({
        success: true,
        message: 'Trending stocks data retrieved successfully',
        data: data.data,
        fetched_at: data.fetched_at,
        response_time_ms: data.meta?.response_time_ms || 0
      });
    } catch (error: any) {
      logger.error('Failed to get trending stocks from database', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve trending stocks',
        error: error.message
      });
    }
  }

  /**
   * 2. Get 52 week high/low data from database
   */
  async get52WeekHighLow(req: Request, res: Response): Promise<void> {
    try {
      const data = await Week52HighLowModel
        .findOne({ status: 'success' })
        .sort({ fetched_at: -1 })
        .lean();
      
      if (!data) {
        res.status(404).json({
          success: false,
          message: 'No 52 week high/low data found. Please fetch data first.',
          data: null
        });
      }
      
      res.json({
        success: true,
        message: '52 week high/low data retrieved successfully',
        data: data?.data,
        fetched_at: data?.fetched_at,
        response_time_ms: data?.meta?.response_time_ms || 0
      });
    } catch (error: any) {
      logger.error('Failed to get 52 week high/low data from database', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve 52 week high/low data',
        error: error.message
      });
    }
  }

  /**
   * 3. Get company details from database
   */
  async getCompanyDetails(req: Request, res: Response): Promise<void> {
    try {
      const { stock_name } = req.query;
      
      let query: any = { status: 'success' };
      if (stock_name) {
        query['meta.stock_name'] = stock_name;
      }
      
      const data = await CompanyDetailsModel
        .findOne(query)
        .sort({ fetched_at: -1 })
        .lean();
      
      if (!data) {
        res.status(404).json({
          success: false,
          message: 'No company details found. Please fetch data first.',
          data: null
        });
        return;
      }
      
      res.json({
        success: true,
        message: 'Company details retrieved successfully',
        data: data.data,
        fetched_at: data.fetched_at,
        response_time_ms: data.meta?.response_time_ms || 0,
        stock_name: data.meta?.stock_name
      });
    } catch (error: any) {
      logger.error('Failed to get company details from database', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve company details',
        error: error.message
      });
    }
  }

  /**
   * 4. Get historical price data from database
   */
  async getHistoricalPrice(req: Request, res: Response): Promise<void> {
    try {
      const { stock_name, period, filter } = req.query;
      
      let query: any = { status: 'success' };
      if (stock_name) query['meta.stock_name'] = stock_name;
      if (period) query['meta.period'] = period;
      if (filter) query['meta.filter'] = filter;
      
      const data = await HistoricalDataModel
        .findOne(query)
        .sort({ fetched_at: -1 })
        .lean();
      
      if (!data) {
        res.status(404).json({
          success: false,
          message: 'No historical price data found. Please fetch data first.',
          data: null
        });
        return;
      }
      
      res.json({
        success: true,
        message: 'Historical price data retrieved successfully',
        data: data.data,
        fetched_at: data.fetched_at,
        response_time_ms: data.meta?.response_time_ms || 0,
        stock_name: data.meta?.stock_name,
        period: data.meta?.period,
        filter: data.meta?.filter
      });
    } catch (error: any) {
      logger.error('Failed to get historical price data from database', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve historical price data',
        error: error.message
      });
    }
  }

  /**
   * 5. Get industry search data from database
   */
  async getIndustrySearch(req: Request, res: Response): Promise<void> {
    try {
      const { query } = req.query;
      
      let queryObj: any = { status: 'success' };
      if (query) queryObj['meta.query'] = query;
      
      const data = await IndustrySearchModel
        .findOne(queryObj)
        .sort({ fetched_at: -1 })
        .lean();
      
      if (!data) {
        res.status(404).json({
          success: false,
          message: 'No industry search data found. Please fetch data first.',
          data: null
        });
        return;
      }
      
      res.json({
        success: true,
        message: 'Industry search data retrieved successfully',
        data: data.data,
        fetched_at: data.fetched_at,
        response_time_ms: data.meta?.response_time_ms || 0,
        query: data.meta?.query
      });
    } catch (error: any) {
      logger.error('Failed to get industry search data from database', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve industry search data',
        error: error.message
      });
    }
  }

  /**
   * 6. Get historical OHLCV data from database
   */
  async getHistoricalOHLCV(req: Request, res: Response): Promise<void> {
    try {
      const { stock_name, period } = req.query;
      
      let query: any = { status: 'success' };
      if (stock_name) query['meta.stock_name'] = stock_name;
      if (period) query['meta.period'] = period;
      
      const data = await HistoricalOHLCVModel
        .findOne(query)
        .sort({ fetched_at: -1 })
        .lean();
      
      if (!data) {
        res.status(404).json({
          success: false,
          message: 'No historical OHLCV data found. Please fetch data first.',
          data: null
        });
        return;
      }
      
      res.json({
        success: true,
        message: 'Historical OHLCV data retrieved successfully',
        data: data.data,
        fetched_at: data.fetched_at,
        response_time_ms: data.meta?.response_time_ms || 0,
        stock_name: data.meta?.stock_name,
        period: data.meta?.period
      });
    } catch (error: any) {
      logger.error('Failed to get historical OHLCV data from database', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve historical OHLCV data',
        error: error.message
      });
    }
  }

  /**
   * 7. Get stock fundamentals from database
   */
  async getStockFundamentals(req: Request, res: Response): Promise<void> {
    try {
      const { stock_name } = req.query;
      
      let query: any = { status: 'success' };
      if (stock_name) query['meta.stock_name'] = stock_name;
      
      const data = await StockFundamentalsModel
        .findOne(query)
        .sort({ fetched_at: -1 })
        .lean();
      
      if (!data) {
        res.status(404).json({
          success: false,
          message: 'No stock fundamentals data found. Please fetch data first.',
          data: null
        });
        return;
      }
      
      res.json({
        success: true,
        message: 'Stock fundamentals retrieved successfully',
        data: data.data,
        fetched_at: data.fetched_at,
        response_time_ms: data.meta?.response_time_ms || 0,
        stock_name: data.meta?.stock_name
      });
    } catch (error: any) {
      logger.error('Failed to get stock fundamentals from database', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve stock fundamentals',
        error: error.message
      });
    }
  }

  /**
   * 8. Get NSE most active stocks from database
   */
  async getNSEMostActive(req: Request, res: Response): Promise<void> {
    try {
      const data = await NSEMostActiveModel
        .findOne({ status: 'success' })
        .sort({ fetched_at: -1 })
        .lean();
      
      if (!data) {
        res.status(404).json({
          success: false,
          message: 'No NSE most active data found. Please fetch data first.',
          data: null
        });
        return;
      }
      
      res.json({
        success: true,
        message: 'NSE most active stocks retrieved successfully',
        data: data.data,
        fetched_at: data.fetched_at,
        response_time_ms: data.meta?.response_time_ms || 0
      });
    } catch (error: any) {
      logger.error('Failed to get NSE most active data from database', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve NSE most active data',
        error: error.message
      });
    }
  }

  /**
   * 9. Get BSE most active stocks from database
   */
  async getBSEMostActive(req: Request, res: Response): Promise<void> {
    try {
      const data = await BSEMostActiveModel
        .findOne({ status: 'success' })
        .sort({ fetched_at: -1 })
        .lean();
      
      if (!data) {
        res.status(404).json({
          success: false,
          message: 'No BSE most active data found. Please fetch data first.',
          data: null
        });
        return;
      }
      
      res.json({
        success: true,
        message: 'BSE most active stocks retrieved successfully',
        data: data.data,
        fetched_at: data.fetched_at,
        response_time_ms: data.meta?.response_time_ms || 0
      });
    } catch (error: any) {
      logger.error('Failed to get BSE most active data from database', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve BSE most active data',
        error: error.message
      });
    }
  }

  /**
   * 10. Get IPO data from database
   */
  async getIPOData(req: Request, res: Response): Promise<void> {
    try {
      const data = await IPODataModel
        .findOne({ status: 'success' })
        .sort({ fetched_at: -1 })
        .lean();
      
      if (!data) {
        res.status(404).json({
          success: false,
          message: 'No IPO data found. Please fetch data first.',
          data: null
        });
        return;
      }
      
      res.json({
        success: true,
        message: 'IPO data retrieved successfully',
        data: data.data,
        fetched_at: data.fetched_at,
        response_time_ms: data.meta?.response_time_ms || 0
      });
    } catch (error: any) {
      logger.error('Failed to get IPO data from database', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve IPO data',
        error: error.message
      });
    }
  }

  /**
   * 11. Get 52 week high/low alternative data from database
   */
  async get52WeekHighLowAlt(req: Request, res: Response): Promise<void> {
    try {
      const data = await Week52HighLowAltModel
        .findOne({ status: 'success' })
        .sort({ fetched_at: -1 })
        .lean();
      
      if (!data) {
        res.status(404).json({
          success: false,
          message: 'No 52 week high/low data found. Please fetch data first.',
          data: null
        });
      }
      
      res.json({
        success: true,
        message: '52 week high/low data retrieved successfully',
        data: data?.data,
        fetched_at: data?.fetched_at,
        response_time_ms: data?.meta?.response_time_ms || 0
      });
    } catch (error: any) {
      logger.error('Failed to get 52 week high/low data from database', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve 52 week high/low data',
        error: error.message
      });
    }
  }

  /**
   * Get all available data summary
   */
  async getAllDataSummary(req: Request, res: Response) {
    try {
      const [
        trending, week52HighLow, companyDetails, historicalPrice,
        industrySearch, historicalOHLCV, stockFundamentals,
        nseMostActive, bseMostActive, ipoData, week52HighLowAlt
      ] = await Promise.all([
        TrendingStocksModel.findOne({ status: 'success' }).sort({ fetched_at: -1 }).lean(),
        Week52HighLowModel.findOne({ status: 'success' }).sort({ fetched_at: -1 }).lean(),
        CompanyDetailsModel.findOne({ status: 'success' }).sort({ fetched_at: -1 }).lean(),
        HistoricalDataModel.findOne({ status: 'success' }).sort({ fetched_at: -1 }).lean(),
        IndustrySearchModel.findOne({ status: 'success' }).sort({ fetched_at: -1 }).lean(),
        HistoricalOHLCVModel.findOne({ status: 'success' }).sort({ fetched_at: -1 }).lean(),
        StockFundamentalsModel.findOne({ status: 'success' }).sort({ fetched_at: -1 }).lean(),
        NSEMostActiveModel.findOne({ status: 'success' }).sort({ fetched_at: -1 }).lean(),
        BSEMostActiveModel.findOne({ status: 'success' }).sort({ fetched_at: -1 }).lean(),
        IPODataModel.findOne({ status: 'success' }).sort({ fetched_at: -1 }).lean(),
        Week52HighLowAltModel.findOne({ status: 'success' }).sort({ fetched_at: -1 }).lean()
      ]);

      const summary = {
        total_apis: 11,
        available_data: {
          trending_stocks: !!trending,
          week_52_high_low: !!week52HighLow,
          company_details: !!companyDetails,
          historical_price_data: !!historicalPrice,
          industry_search: !!industrySearch,
          historical_ohlcv_data: !!historicalOHLCV,
          stock_fundamentals: !!stockFundamentals,
          nse_most_active: !!nseMostActive,
          bse_most_active: !!bseMostActive,
          ipo_data: !!ipoData,
          week_52_high_low_alt: !!week52HighLowAlt
        },
        last_updated: {
          trending_stocks: trending?.fetched_at,
          week_52_high_low: week52HighLow?.fetched_at,
          company_details: companyDetails?.fetched_at,
          historical_price_data: historicalPrice?.fetched_at,
          industry_search: industrySearch?.fetched_at,
          historical_ohlcv_data: historicalOHLCV?.fetched_at,
          stock_fundamentals: stockFundamentals?.fetched_at,
          nse_most_active: nseMostActive?.fetched_at,
          bse_most_active: bseMostActive?.fetched_at,
          ipo_data: ipoData?.fetched_at,
          week_52_high_low_alt: week52HighLowAlt?.fetched_at
        }
      };

      res.json({
        success: true,
        message: 'Data summary retrieved successfully',
        data: summary
      });
    } catch (error: any) {
      logger.error('Failed to get data summary from database', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve data summary',
        error: error.message
      });
    }
  }
}

export const userStockDataController = new UserStockDataController();
