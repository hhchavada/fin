import { Router } from 'express';
import { multiModelStockController } from '../controllers/multiModelStockController';

const router = Router();

/**
 * Multi-Model Stock API Routes
 * Each API stores data in its own separate database collection
 * Base path: /api/v1/multi-stock
 */

// Individual API endpoints
router.get('/fetch/trending', multiModelStockController.getTrending.bind(multiModelStockController));
router.get('/fetch/52-week-high-low', multiModelStockController.get52WeekHighLow.bind(multiModelStockController));
router.get('/fetch/company-details', multiModelStockController.getCompanyDetails.bind(multiModelStockController));
router.get('/fetch/historical-price', multiModelStockController.getHistoricalDataPrice.bind(multiModelStockController));
router.get('/fetch/industry-search', multiModelStockController.searchIndustry.bind(multiModelStockController));
router.get('/fetch/historical-ohlcv', multiModelStockController.getHistoricalDataOHLCV.bind(multiModelStockController));
router.get('/fetch/stock-fundamentals', multiModelStockController.getStockFundamentals.bind(multiModelStockController));
router.get('/fetch/nse-most-active', multiModelStockController.getNSEMostActive.bind(multiModelStockController));
router.get('/fetch/bse-most-active', multiModelStockController.getBSEMostActive.bind(multiModelStockController));
router.get('/fetch/ipo', multiModelStockController.getIPO.bind(multiModelStockController));
router.get('/fetch/52-week-high-low-alt', multiModelStockController.get52WeekHighLowAlt.bind(multiModelStockController));

// Batch endpoint
router.get('/fetch/all', multiModelStockController.fetchAll.bind(multiModelStockController));

// Data retrieval endpoints
router.get('/data', multiModelStockController.getStoredData.bind(multiModelStockController));
router.get('/data/latest/:api_name', multiModelStockController.getLatestStoredData.bind(multiModelStockController));

export default router;
