import { Router } from 'express';
import { cronController } from '../controllers/cronController';

const router = Router();

/**
 * Cron Job Management Routes
 * Base path: /api/v1/cron
 */

router.post('/init', cronController.initCron.bind(cronController));
router.post('/start', cronController.startCron.bind(cronController));
router.post('/stop', cronController.stopCron.bind(cronController));
router.post('/destroy', cronController.destroyCron.bind(cronController));
router.get('/status', cronController.getCronStatus.bind(cronController));
router.post('/execute', cronController.executeCronManually.bind(cronController));

export default router;
