import { Router } from 'express';
import { stockController } from '../controllers/stockController';

const router = Router();

/**
 * Stock API Routes
 * Base path: /api/v1/stock
 */

// Individual API endpoints
router.get('/fetch/trending', stockController.getTrending.bind(stockController));
router.get('/fetch/52-week-high-low', stockController.get52WeekHighLow.bind(stockController));
router.get('/fetch/stock', stockController.getStock.bind(stockController));
router.get('/fetch/historical', stockController.getHistoricalData.bind(stockController));
router.get('/fetch/industry-search', stockController.searchIndustry.bind(stockController));
router.get('/fetch/nse-most-active', stockController.getNSEMostActive.bind(stockController));
router.get('/fetch/bse-most-active', stockController.getBSEMostActive.bind(stockController));
router.get('/fetch/ipo', stockController.getIPO.bind(stockController));
router.get('/fetch/price-shockers', stockController.getPriceShockers.bind(stockController));
router.get('/fetch/target-price', stockController.getStockTargetPrice.bind(stockController));
router.get('/fetch/corporate-actions', stockController.getCorporateActions.bind(stockController));

// Batch endpoint
router.get('/fetch/all', stockController.fetchAll.bind(stockController));

// Data retrieval endpoints
router.get('/data', stockController.getStoredData.bind(stockController));
router.get('/data/latest/:api_name', stockController.getLatestStoredData.bind(stockController));

export default router;
