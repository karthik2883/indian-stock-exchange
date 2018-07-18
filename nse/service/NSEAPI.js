var axios = require('axios');

var csv2Json = require('../../utils/csv2Json');
var candleStickMapper = require('../../utils/candleStickMapper');
var INDEX_CHARTDATA_URL = require('../constant').INDEX_CHARTDATA_URL;
var STOCK_OPTIONS_INFO_URL = require('../constant').STOCK_OPTIONS_INFO_URL;
var STOCK_OPTIONS_URL = require('../constant').STOCK_OPTIONS_URL;
var STOCK_FUTURES_URL = require('../constant').STOCK_FUTURES_URL;
var SEARCH_FUTURE_OPTIONS_URL = require('../constant').SEARCH_FUTURE_OPTIONS_URL;
var SEARCH_URL = require('../constant').SEARCH_URL;
var CANDLESTICK_URL = require('../constant').CANDLESTICK_URL;
var INTRADAY_URL = require('../constant').INTRADAY_URL;
var INDEX_STOCKS_URL = require('../constant').INDEX_STOCKS_URL;
var STOCKS_CSV_URL = require('../constant').STOCKS_CSV_URL;
var INDEX_URL = require('../constant').INDEX_URL;
var LOSERS_URL = require('../constant').LOSERS_URL;
var GAINERS_URL = require('../constant').GAINERS_URL;
var SECTORS_LIST = require('../constant').SECTORS_LIST;
var GET_QUOTE_URL = require('../constant').GET_QUOTE_URL;
var QUOTE_INFO_URL = require('../constant').QUOTE_INFO_URL;
var INDICES_WATCH_URL = require('../constant').INDICES_WATCH_URL;
var MARKET_STATUS_URL = require('../constant').MARKET_STATUS_URL;
var ADVANCES_DECLINES_URL = require('../constant').ADVANCES_DECLINES_URL;

function getTime(periodType, time) {
  if (periodType === 1) {
    switch (time) {
      case 'week':
        return 2;
      case 'month':
        return 3;
      case 'year':
        return 1;
      default:
        return 2;
    }
  } else {
    switch (time) {
      case 1:
        return 1;
      case 5:
        return 2;
      case 15:
        return 3;
      case 30:
        return 4;
      case 60:
        return 5;
      default:
        return 1;
    }
  }
}

function stripTags(string) {
  return string.replace(/<(.|\n)*?>/g, '').trim();
}

function searchTransformer(isIndex) {
  var matcher = '';
  if (isIndex) {
    matcher = /underlying=(.*?)&/;
  } else {
    matcher = /symbol=(.*?)&/;
  }

  return function (data) {
    var matches = data.match(/<li>(.*?)<\/li>/g);
    return matches.map(function (value1) {
      var symbol = value1.match(matcher);
      value1 = stripTags(value1).replace(symbol[1], '');
      return {
        name: value1 || '',
        symbol: symbol[1] || ''
      }
    });
  }
}

function getCandleStick(url, data, headers) {
  return axios.post(url, data, {
    headers: headers,
    transformResponse: function (data) {
      return candleStickMapper(data);
    }
  })
}

function getMarketStatus() {
  return axios.get(MARKET_STATUS_URL, {
    transformResponse: function (data) {
      return {
        status: JSON.parse(data).NormalMktStatus
      };
    }
  });
}

function axiosCSV(url) {
  return axios.get(url, {
    transformResponse: function (data) {
      return csv2Json(data);
    }
  });

}

function getIndices() {
  return axios.get(INDICES_WATCH_URL);
}

function getIndices2() {
  return axios.get(INDEX_URL);
}

function getAllStocksCSV() {
  return axiosCSV(STOCKS_CSV_URL);
}

function getSectorsList() {
  return axios.get(SECTORS_LIST);
}

function getQuotes(symbol) {
  return axios.get(GET_QUOTE_URL + encodeURIComponent(symbol));
}

function getQuoteInfo(symbol) {
  return axios.get(QUOTE_INFO_URL + encodeURIComponent(symbol), {
    headers: {
      Referer: GET_QUOTE_URL + encodeURIComponent(symbol),
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
}

function getGainers() {
  return axios.get(GAINERS_URL);
}

function getLosers() {
  return axios.get(LOSERS_URL);
}

function getInclineDecline() {
  return axios.get(ADVANCES_DECLINES_URL);
}

function getIndexStocks(slug) {
  return axios.get(INDEX_STOCKS_URL + encodeURI(slug) + 'StockWatch.json');
}

function getIntraDayData(symbol, time) {
  var periodType = typeof time === 'string' ? 1 : 2;
  var period = getTime(periodType, time);

  return axios.get(INTRADAY_URL + encodeURIComponent(symbol) + '&Periodicity=' + period + '&PeriodType=' + periodType);
}

function getIndexChartData(symbol, time) {
  var periodType = typeof time === 'string' ? 1 : 2;
  var period = getTime(periodType, time);

  return axios.get(INDEX_CHARTDATA_URL + encodeURIComponent(symbol) + '&Periodicity=' + period + '&PeriodType=' + periodType);
}

function getCandleStickData(symbol, time, isIndex) {
  var periodType = typeof time === 'string' ? 1 : 2;
  var period = getTime(periodType, time);
  var segment = isIndex ? 'OI' : 'CM';

  var options =
    {
      headers: {
        'Referer': 'https://www.nseindia.com/ChartApp/install/charts/mainpage.jsp',
        'Content-Type': 'application/x-www-form-urlencoded',
        Host: 'www.nseindia.com'
      }
    };

  var data = 'Instrument=FUTSTK&CDSymbol=' + symbol +
    '&Segment=' + segment +
    '&Series=EQ&CDExpiryMonth=1&FOExpiryMonth=1&CDIntraExpiryMonth=&' +
    'FOIntraExpiryMonth=&IRFIntraExpiryMonth=&CDDate1=&CDDate2=&PeriodType=' + periodType +
    '&Periodicity=' + period + '&ct0=g1%7C1%7C1&ct1=g2%7C2%7C1&ctcount=2&time=' + new Date().getTime();

  return getCandleStick(CANDLESTICK_URL, data, options.headers);
}

function searchStocks(searchString) {
  var options = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Referer': 'https://www.nseindia.com/ChartApp/install/charts/mainpage.jsp',
      Host: 'www.nseindia.com'
    },
    transformResponse: searchTransformer(false)
  };

  return axios.get(SEARCH_URL + encodeURIComponent(searchString), options);
}

function searchEquityDerivatives(searchString) {
  var options = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Referer': 'https://www.nseindia.com/ChartApp/install/charts/mainpage.jsp',
      Host: 'www.nseindia.com'
    },
    transformResponse: searchTransformer(true)
  };

  return axios.get(SEARCH_FUTURE_OPTIONS_URL + encodeURIComponent(searchString), options);
}

function getStockFutureOptionsExpiryDates(symbol, isFutures) {
  var params = {
    i: isFutures ? 'FUTSTK' : 'OPTSTK',
    u: symbol,
    o: '',
    k: ''
  };

  return axios({
    method: 'GET',
    url: STOCK_OPTIONS_INFO_URL,
    params: params,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Host: 'www.nseindia.com',
      'Referer': 'https://www.nseindia.com/live_market/dynaContent/live_watch/get_quote/GetQuote.jsp?illiquid=0&smeFlag=0&itpFlag=0&symbol=' + symbol,
    }
  });
}

function getStockOptionsPrices(symbol, expiryDate, isCall) {
  var params = {
    i: 'OPTSTK',
    e: expiryDate,
    u: symbol,
    o: isCall ? 'CE' : 'PE',
    k: isCall ? 'CE' : 'PE'
  };

  return axios({
    method: 'GET',
    url: STOCK_OPTIONS_INFO_URL,
    params: params,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Host: 'www.nseindia.com',
      'Referer': 'https://www.nseindia.com/live_market/dynaContent/live_watch/get_quote/GetQuote.jsp?illiquid=0&smeFlag=0&itpFlag=0&symbol=' + symbol,
    }
  });
}

function getStockOptionsData(symbol, expiryDate, isCall, strikePrice) {
  var params = {
    'underlying': symbol,
    'instrument': 'OPTSTK',
    'expiry': expiryDate,
    'type': isCall ? 'CE' : 'PE',
    'strike': strikePrice
  };

  return axios({
    method: 'GET',
    url: STOCK_OPTIONS_URL,
    params: params,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Host: 'www.nseindia.com',
      'Referer': 'https://nseindia.com/live_market/dynaContent/live_watch/get_quote/GetQuoteFO.jsp?underlying=' + symbol + '&instrument=OPTSTK&type=-&strike=-&expiry=' + expiryDate,
    }
  });
}


function getStockFuturesData(symbol, expiryDate) {
  var params = {
    'underlying': symbol,
    'instrument': 'FUTSTK',
    'expiry': expiryDate,
    'type': 'SELECT',
    'strike': 'SELECT'
  };

  return axios({
    method: 'GET',
    url: STOCK_OPTIONS_URL,
    params: params,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Host: 'www.nseindia.com',
      'Referer': 'https://nseindia.com/live_market/dynaContent/live_watch/get_quote/GetQuoteFO.jsp?underlying=' + symbol + '&instrument=FUTSTK&type=-&strike=-&expiry=' + expiryDate,
    }
  });
}


var NSEAPI = {
  getIndices: getIndices,
  getIndices2: getIndices2,
  getMarketStatus: getMarketStatus,
  getSectorsList: getSectorsList,
  getQuotes: getQuotes,
  getQuoteInfo: getQuoteInfo,
  getGainers: getGainers,
  getLosers: getLosers,
  getInclineDecline: getInclineDecline,
  getAllStocksCSV: getAllStocksCSV,
  getIndexStocks: getIndexStocks,
  getIntraDayData: getIntraDayData,
  getIndexChartData: getIndexChartData,
  getCandleStickData: getCandleStickData,
  searchStocks: searchStocks,
  searchEquityDerivatives: searchEquityDerivatives,

  getStockFutureOptionsExpiryDates: getStockFutureOptionsExpiryDates,
  getStockOptionsPrices: getStockOptionsPrices,
  getStockOptionsData: getStockOptionsData,
  getStockFuturesData: getStockFuturesData
};

module.exports = NSEAPI;