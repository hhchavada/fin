import { Router } from 'express';
import { userStockDataController } from '../controllers/userStockDataController';

const router = Router();

/**
 * User-Facing Stock Data Routes
 * These endpoints serve data from database to end users
 * Base path: /api/v1/stock-data
 */

// 1. Trending stocks
router.get('/trending', userStockDataController.getTrendingStocks.bind(userStockDataController));

// 2. 52 week high/low
router.get('/52-week-high-low', userStockDataController.get52WeekHighLow.bind(userStockDataController));

// 3. Company details
router.get('/company-details', userStockDataController.getCompanyDetails.bind(userStockDataController));

// 4. Historical price data
router.get('/historical-price', userStockDataController.getHistoricalPrice.bind(userStockDataController));

// 5. Industry search
router.get('/industry-search', userStockDataController.getIndustrySearch.bind(userStockDataController));

// 6. Historical OHLCV data
router.get('/historical-ohlcv', userStockDataController.getHistoricalOHLCV.bind(userStockDataController));

// 7. Stock fundamentals
router.get('/stock-fundamentals', userStockDataController.getStockFundamentals.bind(userStockDataController));

// 8. NSE most active
router.get('/nse-most-active', userStockDataController.getNSEMostActive.bind(userStockDataController));

// 9. BSE most active
router.get('/bse-most-active', userStockDataController.getBSEMostActive.bind(userStockDataController));

// 10. IPO data
router.get('/ipo', userStockDataController.getIPOData.bind(userStockDataController));

// 11. 52 week high/low alternative
router.get('/52-week-high-low-alt', userStockDataController.get52WeekHighLowAlt.bind(userStockDataController));

// Summary endpoint
router.get('/summary', userStockDataController.getAllDataSummary.bind(userStockDataController));

export default router;
