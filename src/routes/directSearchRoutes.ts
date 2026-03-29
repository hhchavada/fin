import { Router } from 'express';
import { directSearchController } from '../controllers/directSearchController';

const router = Router();

/**
 * Direct Search API Routes
 * These endpoints make direct API calls - no database storage
 * Base path: /api/v1/search
 */

// 1. Search company details by name
router.get('/company', directSearchController.searchCompanyDetails.bind(directSearchController));

// 2. Search historical data by stock name
router.get('/historical', directSearchController.searchHistoricalData.bind(directSearchController));

// 3. Search stock fundamentals by name
router.get('/fundamentals', directSearchController.searchStockFundamentals.bind(directSearchController));

// 4. Search industry by query
router.get('/industry', directSearchController.searchIndustry.bind(directSearchController));

// 5. Universal search endpoint
router.get('/universal', directSearchController.universalSearch.bind(directSearchController));

export default router;
