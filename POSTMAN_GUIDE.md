# 📮 Postman Collection Guide

## 🚀 Quick Setup

### 1. Import Collection
1. Open Postman
2. Click **Import** → **Select File**
3. Choose `postman-collection.json` from your project folder
4. Click **Import**

### 2. Set Environment (Optional)
The collection uses the base URL: `http://localhost:3000`
- Make sure your server is running: `npm run dev`

## 📊 Available APIs (11 Total)

### 🔥 **Individual API Calls**

Each API stores data in its **own separate database collection**:

| # | API Name | Endpoint | Database Collection | Description |
|---|----------|----------|-------------------|-------------|
| 1 | 🔥 Trending Stocks | `/fetch/trending` | `trending_stocks` | Get trending stocks |
| 2 | 📈 52 Week Gainers/Losers | `/fetch/52-week-high-low` | `week_52_high_low` | 52 week high/low data |
| 3 | 🏢 Company Details | `/fetch/company-details` | `company_details` | Company information |
| 4 | 📊 Historical Data (Price) | `/fetch/historical-price` | `historical_data` | Historical price data |
| 5 | 🔍 Industry Search | `/fetch/industry-search` | `industry_search` | Search companies |
| 6 | 📉 Historical Data (OHLCV) | `/fetch/historical-ohlcv` | `historical_data` | OHLCV data |
| 7 | 💰 Stock Fundamentals | `/fetch/stock-fundamentals` | `company_details` | Market cap, PE ratio |
| 8 | ⚡ NSE Most Active | `/fetch/nse-most-active` | `nse_most_active` | NSE active stocks |
| 9 | ⚡ BSE Most Active | `/fetch/bse-most-active` | `bse_most_active` | BSE active stocks |
| 10 | 🆕 IPO Data | `/fetch/ipo` | `ipo_data` | IPO information |
| 11 | 📊 52 Week High/Low (Alt) | `/fetch/52-week-high-low-alt` | `week_52_high_low` | Alternative 52 week data |

### 🚀 **Batch API Call**

| API | Endpoint | Description |
|-----|----------|-------------|
| Fetch All | `/fetch/all` | **Executes all 11 APIs at once** |

## 🔧 **Usage Examples**

### Test Individual API
```bash
# Example: Get trending stocks
GET http://localhost:3000/api/v1/multi-stock/fetch/trending
```

### Test All APIs Together
```bash
# Execute all 11 APIs
GET http://localhost:3000/api/v1/multi-stock/fetch/all
```

### Custom Parameters
Some APIs accept parameters:

```bash
# Company details with custom name
GET http://localhost:3000/api/v1/multi-stock/fetch/company-details?name=reliance

# Historical data with custom parameters
GET http://localhost:3000/api/v1/multi-stock/fetch/historical-price?stock_name=infy&period=3m&filter=price

# Industry search
GET http://localhost:3000/api/v1/multi-stock/fetch/industry-search?query=technology
```

## 📊 **Database Collections Created**

Each API creates its own MongoDB collection:

```
📦 Database Collections:
├── trending_stocks          # API 1: Trending stocks
├── week_52_high_low         # API 2 & 11: 52 week data
├── company_details          # API 3 & 7: Company info & fundamentals
├── historical_data          # API 4 & 6: Historical data
├── industry_search          # API 5: Industry search
├── nse_most_active          # API 8: NSE active stocks
├── bse_most_active          # API 9: BSE active stocks
└── ipo_data                 # API 10: IPO data
```

## ✅ **Response Format**

Each API returns:

```json
{
  "success": true,
  "message": "Data fetched successfully",
  "data": {
    "api_name": "trending",
    "status": "success",
    "fetched_at": "2026-03-28T12:00:00.000Z",
    "response_time_ms": 1234,
    "data": { /* Actual API response */ },
    "meta": {
      "response_time_ms": 1234,
      "api_endpoint": "/trending"
    }
  }
}
```

## 🧪 **Testing in Postman**

### 1. Run Individual Tests
- Click any API request
- Hit **Send**
- Check **Tests** tab for results
- Check **Console** for logs

### 2. Run All Tests
- Click collection name
- Click **Run** button
- Select all requests
- Click **Run Collection**

### 3. Monitor Database
After running APIs, check your MongoDB Atlas dashboard to see the data in each collection.

## 🔍 **Debugging**

### Check Server Status
```bash
GET http://localhost:3000/health
```

### Check Stored Data
```bash
# Get latest data from specific collection
GET http://localhost:3000/api/v1/multi-stock/data/latest/trending

# Get multiple records
GET http://localhost:3000/api/v1/multi-stock/data?api_name=trending&limit=5
```

## 📝 **Notes**

- ✅ All APIs run concurrently when using `/fetch/all`
- ✅ Each API has retry logic and error handling
- ✅ Data is stored with metadata (response time, timestamp, etc.)
- ✅ Failed requests are also stored with error information
- ✅ Server must be running before using Postman collection

## 🎯 **Next Steps**

1. **Import the collection** into Postman
2. **Start your server**: `npm run dev`
3. **Test individual APIs** to verify they work
4. **Run the batch call** to populate all collections
5. **Check MongoDB Atlas** to see stored data

Happy testing! 🚀
