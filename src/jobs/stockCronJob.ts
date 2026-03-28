import * as cron from 'node-cron';
import { individualStockServices } from '../services/individualStockServices';
import { config } from '../config/env';
import { createLogger } from '../utils/logger';
import { CronJobResult } from '../types/stock';

const logger = createLogger('StockCronJob');

class StockCronJob {
  private task: cron.ScheduledTask | null = null;
  private isRunning: boolean = false;

  /**
   * Initialize and start the cron job
   * IMPORTANT: This function is exported but NOT called automatically
   */
  initStockCron(): void {
    if (this.task) {
      logger.warn('Cron job is already running');
      return;
    }

    if (!config.CRON_ENABLED || config.CRON_ENABLED === 'false') {
      logger.info('Cron job is disabled in configuration');
      return;
    }

    try {
      // Schedule the job to run every 3 minutes
      this.task = cron.schedule(config.CRON_SCHEDULE, this.executeJob.bind(this), {
        timezone: 'Asia/Kolkata'
      });

      logger.info('Stock cron job initialized', {
        schedule: config.CRON_SCHEDULE,
        enabled: config.CRON_ENABLED
      });
    } catch (error: any) {
      logger.error('Failed to initialize cron job', error);
      throw error;
    }
  }

  /**
   * Start the cron job
   */
  startCron(): void {
    if (!this.task) {
      logger.error('Cron job not initialized. Call initStockCron() first.');
      return;
    }

    this.task.start();
    logger.info('Stock cron job started', {
      schedule: config.CRON_SCHEDULE
    });
  }

  /**
   * Stop the cron job
   */
  stopCron(): void {
    if (!this.task) {
      logger.warn('No cron job to stop');
      return;
    }

    this.task.stop();
    logger.info('Stock cron job stopped');
  }

  /**
   * Destroy the cron job
   */
  destroyCron(): void {
    if (this.task) {
      this.task.stop();
      this.task.destroy();
      this.task = null;
      logger.info('Stock cron job destroyed');
    }
  }

  /**
   * Get cron job status
   */
  getStatus(): { isInitialized: boolean; schedule: string } {
    return {
      isInitialized: !!this.task,
      schedule: config.CRON_SCHEDULE
    };
  }

  /**
   * Execute the job manually
   */
  async executeJobManually(): Promise<CronJobResult> {
    logger.info('Manual execution of stock cron job triggered');
    return await this.executeJob();
  }

  /**
   * Main job execution logic
   */
  private async executeJob(): Promise<CronJobResult> {
    if (this.isRunning) {
      logger.warn('Previous job execution is still running, skipping this execution');
      throw new Error('Job execution already in progress');
    }

    const startTime = Date.now();
    const startedAt = new Date();
    
    this.isRunning = true;
    
    logger.info('Starting stock data fetch job', {
      started_at: startedAt,
      schedule: config.CRON_SCHEDULE
    });

    try {
      // Fetch data from all APIs
      const results = await individualStockServices.fetchAllStockApis();
      
      const completedAt = new Date();
      const totalDuration = Date.now() - startTime;
      
      const successful = results.filter(r => r.status === 'success').length;
      const failed = results.filter(r => r.status === 'failed').length;

      const jobResult: CronJobResult = {
        total_apis: results.length,
        successful,
        failed,
        results,
        started_at: startedAt,
        completed_at: completedAt,
        total_duration_ms: totalDuration
      };

      logger.info('Stock data fetch job completed', {
        total_apis: results.length,
        successful,
        failed,
        total_duration_ms: totalDuration,
        started_at: startedAt,
        completed_at: completedAt
      });

      // Log failed APIs for debugging
      if (failed > 0) {
        const failedApis = results.filter(r => r.status === 'failed');
        logger.warn('Some APIs failed during job execution', {
          failed_count: failed,
          failed_apis: failedApis.map(api => ({
            api_name: api.api_name,
            error: api.error
          }))
        });
      }

      return jobResult;

    } catch (error: any) {
      const completedAt = new Date();
      const totalDuration = Date.now() - startTime;
      
      logger.error('Stock data fetch job failed', error, {
        started_at: startedAt,
        completed_at: completedAt,
        total_duration_ms: totalDuration
      });

      throw error;
      
    } finally {
      this.isRunning = false;
    }
  }
}

// Export singleton instance
export const stockCronJob = new StockCronJob();

// Export the initialization function (IMPORTANT: Not called automatically)
export const initStockCron = (): void => {
  stockCronJob.initStockCron();
};

// Export control functions for manual management
export const startStockCron = (): void => {
  stockCronJob.startCron();
};

export const stopStockCron = (): void => {
  stockCronJob.stopCron();
};

export const destroyStockCron = (): void => {
  stockCronJob.destroyCron();
};

export const getStockCronStatus = () => {
  return stockCronJob.getStatus();
};

export const executeStockCronManually = async (): Promise<CronJobResult> => {
  return await stockCronJob.executeJobManually();
};
