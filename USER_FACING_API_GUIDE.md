# 📊 User-Facing Stock Market APIs - Complete Guide

## 🚀 Quick Setup

### 1. Import Collection
1. Open Postman
2. Click **Import** → **Select File**
3. Choose `user-facing-postman-collection.json` from your project folder
4. Click **Import**

### 2. Set Environment (Optional)
The collection uses base URL: `http://localhost:3000`
- Make sure your server is running: `npm run dev`

## 📊 Available User-Facing APIs (11 Total)

### 🔥 **Database-Serving APIs**

Each API serves data from its **own separate database collection**:

| # | API Name | Endpoint | Database Collection | Description |
|---|----------|----------|-------------------|-------------|
| 1 | 🔥 Trending Stocks | `/trending` | `trending_stocks` | Get trending stocks from database |
| 2 | 📈 52 Week High/Low | `/52-week-high-low` | `week_52_high_low` | Get 52 week high/low data from database |
| 3 | 🏢 Company Details | `/company-details` | `company_details` | Get company information from database |
| 4 | 📊 Historical Price Data | `/historical-price` | `historical_data` | Get historical price data from database |
| 5 | 🔍 Industry Search | `/industry-search` | `industry_search` | Search companies/industries in database |
| 6 | 📉 Historical OHLCV Data | `/historical-ohlcv` | `historical_ohlcv` | Get historical OHLCV data from database |
| 7 | 💰 Stock Fundamentals | `/stock-fundamentals` | `stock_fundamentals` | Get market cap, PE ratio from database |
| 8 | ⚡ NSE Most Active | `/nse-most-active` | `nse_most_active` | Get NSE active stocks from database |
| 9 | ⚡ BSE Most Active | `/bse-most-active` | `bse_most_active` | Get BSE active stocks from database |
| 10 | 🆕 IPO Data | `/ipo` | `ipo_data` | Get IPO information from database |
| 11 | 📊 52 Week High/Low Alt | `/52-week-high-low-alt` | `week_52_high_low_alt` | Alternative 52 week data from database |

### 📋 **Summary API**

| API | Endpoint | Description |
|-----|----------|-------------|
| Data Summary | `/summary` | Get overview of all 11 database collections |

## 🔧 **Usage Examples**

### Test Individual API
```bash
# Example: Get trending stocks from database
GET http://localhost:3000/api/v1/stock-data/trending
```

### Test Summary API
```bash
# Get overview of all available data
GET http://localhost:3000/api/v1/stock-data/summary
```

### Custom Parameters
Some APIs accept parameters:

```bash
# Company details with custom stock name
GET http://localhost:3000/api/v1/stock-data/company-details?stock_name=reliance

# Historical data with custom parameters
GET http://localhost:3000/api/v1/stock-data/historical-price?stock_name=infy&period=3m&filter=price

# Industry search
GET http://localhost:3000/api/v1/stock-data/industry-search?query=technology
```

## 📊 **Database Collections Structure**

Each API reads from its own MongoDB collection:

```
📦 Database Collections (11 Total):
├── trending_stocks          # API 1: Trending stocks
├── week_52_high_low         # API 2 & 11: 52 week data
├── company_details          # API 3 & 7: Company info & fundamentals
├── historical_data          # API 4 & 6: Historical data
├── industry_search          # API 5: Industry search
├── historical_ohlcv         # API 6: Historical OHLCV data
├── stock_fundamentals      # API 7: Stock fundamentals
├── nse_most_active          # API 8: NSE active stocks
├── bse_most_active          # API 9: BSE active stocks
├── ipo_data                 # API 10: IPO data
└── week_52_high_low_alt     # API 11: Alternative 52 week data
```

## ✅ **Response Format**

Each user-facing API returns:

```json
{
  "success": true,
  "message": "Data retrieved successfully",
  "data": { /* Actual stock data from database */ },
  "fetched_at": "2026-03-28T17:25:39.327Z",
  "response_time_ms": 656,
  "stock_name": "tata steel", // Optional for specific queries
  "period": "1m", // Optional for historical data
  "filter": "price", // Optional for filtered data
  "query": "tata" // Optional for search queries
}
```

## 🧪 **Testing in Postman**

### 1. Run Individual Tests
- Click any API request
- Hit **Send**
- Check **Tests** tab for validation results
- Check **Console** for detailed logs

### 2. Run All Tests
- Click collection name
- Click **Run** button
- Select all requests
- Click **Run Collection**

### 3. Monitor Database
After running APIs, check your MongoDB Atlas dashboard to see data in each collection.

## 🔍 **Debugging**

### Check Server Status
```bash
GET http://localhost:3000/health
```

### Check All Available Data
```bash
# Get summary of all 11 collections
GET http://localhost:3000/api/v1/stock-data/summary
```

### Check Specific Collection Data
```bash
# Get latest data from specific collection
GET http://localhost:3000/api/v1/stock-data/latest/trending

# Get multiple records with filtering
GET http://localhost:3000/api/v1/stock-data?api_name=trending&limit=5
```

## 📝 **Important Notes**

### Data Source
- ✅ **All data comes from database** (not live API calls)
- ✅ **Data is automatically updated** when admin APIs are called
- ✅ **Old data is deleted** and new data is stored on each admin API call

### Performance
- ⚡ **Fast responses** - Data served directly from database
- 📊 **Metadata included** - Response times, timestamps, filters
- 🔄 **Real-time updates** - When admin fetches new data

### Error Handling
- 🚨 **404 responses** - When no data exists in collection
- 📝 **Clear error messages** - Helpful debugging information
- ✅ **Consistent format** - Standardized response structure

## 🎯 **Workflow for Users**

1. **Admin fetches data** using `/api/v1/multi-stock/*` endpoints
2. **Data stored in database** with automatic cleanup of old data
3. **Users access data** using `/api/v1/stock-data/*` endpoints
4. **Real-time updates** available when admin refreshes data

## 🚀 **Next Steps**

1. **Import the collection** into Postman
2. **Start your server**: `npm run dev`
3. **Test individual APIs** to verify database data access
4. **Use summary endpoint** to check all available data
5. **Deploy for users** to access stock market data

## 📞 **Troubleshooting**

### No Data Found (404)
- Means the collection is empty
- Solution: Call the corresponding admin API first:
  ```bash
  POST http://localhost:3000/api/v1/multi-stock/fetch/trending
  ```

### Slow Response
- Check MongoDB indexes
- Monitor database performance
- Consider caching strategies

### Data Not Updating
- Verify admin APIs are being called
- Check cron job status
- Review database write operations

## 🎉 **Perfect System Ready**

Your system now has:
- ✅ **11 Admin APIs** - Fetch and store data
- ✅ **11 User APIs** - Serve data to end users  
- ✅ **11 Database Collections** - Separate storage
- ✅ **Automatic Data Management** - Clean and update
- ✅ **Complete Postman Collections** - For both admin and user APIs

**Perfect stock market data system ready for production!** 🚀
