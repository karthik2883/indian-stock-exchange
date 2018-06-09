exports.STOCKS_URL = 'https://www.bseindia.com/markets/equity/EQReports/MarketWatch.aspx?expandable=2';
exports.TURNOVER_URL = 'https://www.bseindia.com/Msource/Turnover.aspx?ln=en';
exports.INDICES_URL = 'https://www.bseindia.com/Msource/IndexMovers.aspx?ln=en';
exports.GAINERS_URL = 'https://www.bseindia.com/Msource/gainers.aspx?ln=en';
exports.LOSERS_URL = 'https://www.bseindia.com/Msource/Losers.aspx?ln=en';
exports.DAILY_STOCKS_URL = 'https://www.bseindia.com/BSEGraph/Graphs/GetStockReachVolPriceDatav1.aspx?index=';
exports.HISTORY_STOCKS_URL = 'https://www.bseindia.com/BSEGraph/Graphs/GetStockReachVolPriceData.aspx?index=';
exports.COMPANY_HEADER = 'https://www.bseindia.com/SiteCache/1D/CompanyHeader.aspx?Type=EQ&text=';
exports.INDICES_INFO_URL = 'https://www.bseindia.com/BSEGraph/Graphs/GetSensexDatav1.aspx?index=';

exports.TURNOVER_HEADERS = 'securityCode,todayClose,pointChange,pointPercent,symbol,turnover,volume,url';
exports.INDICES_HEADERS = 'securityCode,todayClose,pointChange,pointPercent,unknownValue1,unknownValue2,symbol';
exports.GAINERS_HEADERS = 'securityCode,todayClose,pointChange,pointPercent,symbol,url';
exports.LOSERS_HEADERS = 'securityCode,todayClose,pointChange,pointPercent,symbol,url';
exports.DAILY_STOCKS_CLOSING_HEADERS = 'date,previousClose,minLow,maxHigh,symbol,latestValue,time,volumeRangeLow,volumeRangeHigh';
exports.DAILY_STOCKS_HEADERS = 'dateTime,,stockValue,volume';