import { Request, Response } from 'express';
import { 
  initStockCron, 
  startStockCron, 
  stopStockCron, 
  destroyStockCron, 
  getStockCronStatus, 
  executeStockCronManually 
} from '../jobs/stockCronJob';
import { createLogger } from '../utils/logger';

const logger = createLogger('CronController');

export class CronController {
  
  /**
   * Initialize the cron job
   */
  async initCron(req: Request, res: Response) {
    try {
      initStockCron();
      
      logger.info('Cron job initialized via API call');
      
      res.json({
        success: true,
        message: 'Cron job initialized successfully',
        data: {
          status: 'initialized',
          note: 'Cron job is ready but not started. Use /start to begin execution.'
        }
      });
    } catch (error: any) {
      logger.error('Failed to initialize cron job', error);
      res.status(500).json({
        success: false,
        message: 'Failed to initialize cron job',
        error: error.message
      });
    }
  }

  /**
   * Start the cron job
   */
  async startCron(req: Request, res: Response) {
    try {
      startStockCron();
      
      logger.info('Cron job started via API call');
      
      res.json({
        success: true,
        message: 'Cron job started successfully',
        data: getStockCronStatus()
      });
    } catch (error: any) {
      logger.error('Failed to start cron job', error);
      res.status(500).json({
        success: false,
        message: 'Failed to start cron job',
        error: error.message
      });
    }
  }

  /**
   * Stop the cron job
   */
  async stopCron(req: Request, res: Response) {
    try {
      stopStockCron();
      
      logger.info('Cron job stopped via API call');
      
      res.json({
        success: true,
        message: 'Cron job stopped successfully',
        data: getStockCronStatus()
      });
    } catch (error: any) {
      logger.error('Failed to stop cron job', error);
      res.status(500).json({
        success: false,
        message: 'Failed to stop cron job',
        error: error.message
      });
    }
  }

  /**
   * Destroy the cron job
   */
  async destroyCron(req: Request, res: Response) {
    try {
      destroyStockCron();
      
      logger.info('Cron job destroyed via API call');
      
      res.json({
        success: true,
        message: 'Cron job destroyed successfully',
        data: {
          status: 'destroyed',
          note: 'Cron job has been completely stopped and cannot be restarted without re-initialization.'
        }
      });
    } catch (error: any) {
      logger.error('Failed to destroy cron job', error);
      res.status(500).json({
        success: false,
        message: 'Failed to destroy cron job',
        error: error.message
      });
    }
  }

  /**
   * Get cron job status
   */
  async getCronStatus(req: Request, res: Response) {
    try {
      const status = getStockCronStatus();
      
      res.json({
        success: true,
        message: 'Cron job status retrieved successfully',
        data: status
      });
    } catch (error: any) {
      logger.error('Failed to get cron job status', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get cron job status',
        error: error.message
      });
    }
  }

  /**
   * Execute cron job manually
   */
  async executeCronManually(req: Request, res: Response) {
    try {
      logger.info('Manual cron job execution triggered via API');
      
      const result = await executeStockCronManually();
      
      res.json({
        success: true,
        message: 'Cron job executed manually successfully',
        data: {
          summary: {
            total_apis: result.total_apis,
            successful: result.successful,
            failed: result.failed,
            total_duration_ms: result.total_duration_ms,
            started_at: result.started_at,
            completed_at: result.completed_at
          },
          results: result.results.map(r => ({
            api_name: r.api_name,
            status: r.status,
            response_time_ms: r.response_time_ms,
            fetched_at: r.fetched_at,
            error: r.error,
            meta: r.meta
          }))
        }
      });
    } catch (error: any) {
      logger.error('Failed to execute cron job manually', error);
      res.status(500).json({
        success: false,
        message: 'Failed to execute cron job manually',
        error: error.message
      });
    }
  }
}

export const cronController = new CronController();
