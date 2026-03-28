# Stock Market Data API System

A scalable Node.js backend system for fetching and storing stock market data from RapidAPI endpoints with MongoDB storage.

## 🏗️ Architecture

### Clean Architecture (Service-based)
- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic and API interactions
- **Models**: MongoDB data models with flexible schema
- **Utils**: Shared utilities (API client, logger)
- **Jobs**: Cron job management
- **Types**: TypeScript type definitions

## 📡 API Endpoints

### Stock Data Fetching
```
GET /api/v1/stock/fetch/trending                    - Get trending stocks
GET /api/v1/stock/fetch/52-week-high-low           - Get 52 week high/low data
GET /api/v1/stock/fetch/stock?name=tata steel      - Get stock data by name
GET /api/v1/stock/fetch/historical?stock_name=tcs&period=1m&filter=price - Get historical data
GET /api/v1/stock/fetch/industry-search?query=tata - Search industry
GET /api/v1/stock/fetch/nse-most-active            - Get NSE most active stocks
GET /api/v1/stock/fetch/bse-most-active            - Get BSE most active stocks
GET /api/v1/stock/fetch/ipo                        - Get IPO data
GET /api/v1/stock/fetch/price-shockers            - Get price shockers
GET /api/v1/stock/fetch/target-price?stock_id=TCS  - Get stock target price
GET /api/v1/stock/fetch/corporate-actions?stock_name=infosys - Get corporate actions
GET /api/v1/stock/fetch/all                        - Fetch all APIs (batch)
```

### Data Retrieval
```
GET /api/v1/stock/data?api_name=trending&limit=10   - Get stored data
GET /api/v1/stock/data/latest/:api_name            - Get latest data for specific API
```

### Cron Job Management
```
POST /api/v1/cron/init     - Initialize cron job
POST /api/v1/cron/start    - Start cron job
POST /api/v1/cron/stop     - Stop cron job
POST /api/v1/cron/destroy  - Destroy cron job
GET  /api/v1/cron/status   - Get cron job status
POST /api/v1/cron/execute  - Execute cron job manually
```

## 🗄️ Database Schema

### Flexible API Data Collection
```javascript
{
  api_name: string,           // API endpoint name
  data: Mixed,               // Raw API response (dynamic JSON)
  fetched_at: Date,          // Timestamp when data was fetched
  status: 'success' | 'failed' | 'pending',
  meta: {                    // Flexible metadata
    stock_name?: string,
    stock_id?: string,
    response_time_ms?: number,
    error_message?: string,
    // ... any other metadata
  }
}
```

## ⚙️ Configuration

### Environment Variables
```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/fin-db

# RapidAPI Configuration
RAPIDAPI_HOST=stock-market-data.p.rapidapi.com
RAPIDAPI_KEY=your-rapidapi-key-here
STOCK_API_BASE_URL=https://stock-market-data.p.rapidapi.com

# Cron Configuration
CRON_ENABLED=false
CRON_SCHEDULE=*/3 * * * *

# API Configuration
API_TIMEOUT=30000
API_MAX_RETRIES=3
API_RETRY_DELAY=1000

# Logging Configuration
LOG_LEVEL=info
```

## 🔄 Cron Job System

### Features
- **Runs every 3 minutes** (configurable)
- **NOT auto-started** - must be manually initialized and started
- **Concurrent API execution** - all 11 APIs called in parallel
- **Error handling** - failed APIs are logged and stored
- **Retry logic** - automatic retries for failed requests
- **Status tracking** - monitor job execution status

### Usage
```javascript
import { initStockCron, startStockCron } from './jobs/stockCronJob';

// Initialize (does not start automatically)
initStockCron();

// Start the cron job
startStockCron();
```

### Manual Execution
```bash
# Execute all APIs once
curl -X POST http://localhost:3000/api/v1/cron/execute
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your RapidAPI key and MongoDB URI
```

### 3. Start the Server
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

### 4. Initialize and Start Cron Job
```bash
# Initialize cron job
curl -X POST http://localhost:3000/api/v1/cron/init

# Start cron job
curl -X POST http://localhost:3000/api/v1/cron/start
```

## 📊 Usage Examples

### Fetch Individual API Data
```bash
# Get trending stocks
curl http://localhost:3000/api/v1/stock/fetch/trending

# Get stock data for specific company
curl "http://localhost:3000/api/v1/stock/fetch/stock?name=reliance"

# Get historical data
curl "http://localhost:3000/api/v1/stock/fetch/historical?stock_name=tcs&period=1m&filter=price"
```

### Fetch All APIs
```bash
# Fetch data from all 11 APIs
curl http://localhost:3000/api/v1/stock/fetch/all
```

### Retrieve Stored Data
```bash
# Get latest trending stocks data
curl http://localhost:3000/api/v1/stock/data/latest/trending

# Get all stored data for specific API
curl "http://localhost:3000/api/v1/stock/data?api_name=trending&limit=5"
```

## 🛠️ Key Features

### ✅ Scalability
- **Generic fetchAndStore function** - easy to add new APIs
- **Modular architecture** - clean separation of concerns
- **Concurrent execution** - all APIs called in parallel
- **Flexible schema** - handles any JSON response structure

### ✅ Production Ready
- **Error handling** - comprehensive try/catch with logging
- **Retry mechanism** - automatic retries with exponential backoff
- **Request timeout** - configurable timeouts
- **Structured logging** - detailed logs for debugging

### ✅ Data Management
- **Flexible MongoDB schema** - stores raw API responses
- **Metadata tracking** - response times, errors, parameters
- **Indexed queries** - optimized for performance
- **Data retention** - configurable based on your needs

### ✅ Monitoring
- **Health check endpoint** - `/health`
- **Cron job status** - `/api/v1/cron/status`
- **Execution metrics** - response times, success/failure rates
- **Detailed logging** - API calls, errors, performance

## 🔧 Adding New APIs

1. **Add to API Configuration** (`src/types/stock.ts`):
```typescript
export const STOCK_API_ENDPOINTS: StockApiConfig[] = [
  // ... existing endpoints
  {
    name: 'new_api',
    endpoint: '/new-endpoint',
    method: 'GET',
    params: { param1: 'value1' }
  }
];
```

2. **Add Service Method** (`src/services/individualStockServices.ts`):
```typescript
async getNewApiData() {
  logger.info('Fetching new API data');
  const config = STOCK_API_ENDPOINTS.find(api => api.name === 'new_api')!;
  return await stockApiService.fetchAndStore(config);
}
```

3. **Add Controller Method** (`src/controllers/stockController.ts`):
```typescript
async getNewApi(req: Request, res: Response) {
  try {
    const result = await individualStockServices.getNewApiData();
    // ... response handling
  } catch (error) {
    // ... error handling
  }
}
```

4. **Add Route** (`src/routes/stockRoutes.ts`):
```typescript
router.get('/fetch/new-api', stockController.getNewApi.bind(stockController));
```

## 📈 Performance Considerations

- **Concurrent API calls** - all 11 APIs executed in parallel
- **Connection pooling** - MongoDB connection reuse
- **Indexed queries** - optimized database queries
- **Response caching** - latest data stored for quick retrieval
- **Memory management** - efficient JSON handling

## 🐛 Troubleshooting

### Common Issues
1. **API Rate Limits** - Check RapidAPI quota
2. **MongoDB Connection** - Verify URI and network access
3. **Environment Variables** - Ensure all required vars are set
4. **Cron Job Not Starting** - Check CRON_ENABLED=false setting

### Debug Logs
```bash
# Enable debug logging
LOG_LEVEL=debug

# Check logs for API failures
tail -f logs/app.log
```

## 📝 License

MIT License - feel free to use this code for your projects!
