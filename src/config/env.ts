import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from explicit path
const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

interface EnvConfig {
  PORT: number;
  NODE_ENV: string;
  MONGODB_URI: string;
  MONGODB_TEST_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  CORS_ORIGIN: string;
  RAPIDAPI_HOST: string;
  RAPIDAPI_KEY: string;
  STOCK_API_BASE_URL: string;
  CRON_ENABLED: string;
  CRON_SCHEDULE: string;
  API_TIMEOUT: number;
  API_MAX_RETRIES: number;
  API_RETRY_DELAY: number;
  LOG_LEVEL: string;
}

export const config: EnvConfig = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/fin-db',
  MONGODB_TEST_URI: process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/fin-db-test',
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  RAPIDAPI_HOST: process.env.RAPIDAPI_HOST || 'indian-stock-exchange-api2.p.rapidapi.com',
  RAPIDAPI_KEY: process.env.RAPIDAPI_KEY || '',
  STOCK_API_BASE_URL: process.env.STOCK_API_BASE_URL || 'https://indian-stock-exchange-api2.p.rapidapi.com',
  CRON_ENABLED: process.env.CRON_ENABLED || 'false',
  CRON_SCHEDULE: process.env.CRON_SCHEDULE || '*/3 * * * *',
  API_TIMEOUT: parseInt(process.env.API_TIMEOUT || '30000', 10),
  API_MAX_RETRIES: parseInt(process.env.API_MAX_RETRIES || '3', 10),
  API_RETRY_DELAY: parseInt(process.env.API_RETRY_DELAY || '1000', 10),
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI'];

const validateEnv = (): void => {
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }
};

validateEnv();
