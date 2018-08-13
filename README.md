# Indian Stock Exchange NSEAPI
 - Provides API to get Data from National Stock Exchange

## IMPORTANT

#### API Calls will fail when made from browser due to 'OPTIONS' request sent by browsers before making an API call and Have few 'insecure' headers set which fails when changed from browser. Workaround is to make the call either on your server or in your app. 



 ## BSE (WIP)
 
 ### Available Methods
 
 - getTopTurnOvers
 - getIndices
 - getGainers
 - getLosers
 - getStockInfoAndDayChartData(securityCode)
 - getCompanyInfo(securityCode)
 - getStockMarketDepth(securityCode)
 - getStocksChartData(securityCode, flag=[5D, 1M, 3M, 6M, 12M]) ## BSE
 - getIndexChartData(symbolKey, time=[1|1M|3M|6M|12M])
 - getIndexStocks(symbolKey)
 - getIndexInfo(symbolKey)
 - getStockCandleStickData(securityCode, flag=[1D|1Y]) **(when using '1Y' as time, will return all data for the stock, you can filter out data accordingly for week wise or month wise data)**
 
 ***`symbolKey` is different from `symbol` or `securityCode`, this value is present in response of getIndices method in 'key' property
 
 ## NSE (WIP, actively working)
 
 ### Available Methods
   
 - getMarketStatus
 - getIndices
 - getIndices2
 - getAllStocksCSV
 - getGainers
 - getLosers
 - getSectorsList
 - getQuoteInfo(symbol)
 - getQuotes(symbol)
 - getInclineDecline
 - getAllStocksCSV
 
 - getIndexStocks(slug) => see below code for slug values for different indices
 
 - getIndexChartData(symbol, time) => time values = (1, 5, 15, 30, 60, 'week', 'month', 'year') // pass int values as integer and not string (!important)
 
 - getIntraDayData(symbol, time) => time values = (1, 5, 15, 30, 60, 'week', 'month', 'year') // pass int values as integer and not string (!important)
 
 - getCandleStickData(symbol, time, isIndex: boolean) => time values as above, isIndex param to fetch data for indices
 
 - searchStocks(string) => search stocks by name or symbol (min 3 chars)
 
 - searchEquityDerivatives(string) => search Equity Derivatives (min 3 chars) (! provides wrapper around site search)
 
 
 - getStockFutureOptionsExpiryDates(symbol, isFutures? boolean) 
 
 - getStockOptionsPrices(symbol, expiryDate, isCall? boolean) expiryDate value must be from one of values returned by above methods
 
 - getStockOptionsData(symbol, expiryDate, isCall, strikePrice) strikePrice value from above api result only
 
 - getStockFuturesData(symbol, expiryDate) expiryDate from api method only


## Slug List
 ```javascript

 {
  'NIFTY 50': 'nifty',
  'NIFTY NEXT 50': 'juniorNifty',
  'NIFTY MIDCAP 50': 'niftyMidcap50',
  'NIFTY AUTO': 'cnxAuto',
  'NIFTY BANK': 'bankNifty',
  'NIFTY ENERGY': 'cnxEnergy',
  'NIFTY FIN SERVICE': 'cnxFinance',
  'NIFTY FMCG': 'cnxFMCG',
  'NIFTY IT': 'cnxit',
  'NIFTY MEDIA': 'cnxMedia',
  'NIFTY METAL': 'cnxMetal',
  'NIFTY PHARMA': 'cnxPharma',
  'NIFTY PSU BANK': 'cnxPSU',
  'NIFTY REALTY': 'cnxRealty',
  'NIFTY PVT BANK': 'niftyPvtBank',
  'NIFTY COMMODITIES': 'cnxCommodities',
  'NIFTY CONSUMPTION': 'cnxConsumption',
  'NIFTY CPSE': 'cpse',
  'NIFTY INFRA': 'cnxInfra',
  'NIFTY MNC': 'cnxMNC',
  'NIFTY GROWSECT 15': 'ni15',
  'NIFTY PSE': 'cnxPSE',
  'NIFTY SERV SECTOR': 'cnxService',
  'NIFTY100 LIQ 15': 'nseliquid',
  'NIFTY MID LIQ 15': 'niftyMidcapLiq15',
  'NIFTY DIV OPPS 50': 'cnxDividendOppt',
  'NIFTY50 VALUE 20': 'nv20',
  'NIFTY QUALITY 30': 'niftyQuality30',
  'NIFTY50 EQL WGT': 'nifty50EqualWeight',
  'NIFTY100 EQL WGT': 'nifty100EqualWeight',
  'NIFTY100 LOWVOL30': 'nifty100LowVolatility30',
  'NIFTY ALPHA 50': 'niftyAlpha50',


  'INDIA VIX': '-',
  'NIFTY 100': '-',
  'NIFTY 500': '-',
  'NIFTY MIDCAP 100': '-',
  'NIFTY GS 11 15YR': '-',
  'NIFTY50 PR 1X INV': '-',
  'NIFTY GS COMPSITE': '-',
  'NIFTY GS 15YRPLUS': '-',
  'NIFTY50 PR 2X LEV': '-',
  'NIFTY50 TR 1X INV': '-',
  'NIFTY 200': '-',
  'NIFTY GS 4 8YR': '-',
  'NIFTY GS 8 13YR': '-',
  'NIFTY50 TR 2X LEV': '-',
  'NIFTY50 DIV POINT': '-',
  'NIFTY SMLCAP 100': '-',
  'NIFTY GS 10YR': '-',
  'NIFTY GS 10YR CLN': '-',
};

```