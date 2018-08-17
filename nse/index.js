var NSEAPI = require('./service/NSEAPI');


/**
 * Returns market status
 * true => market Close
 * false => market Open
 * @returns {boolean}
 */
function getMarketStatus() {
  return NSEAPI.getMarketStatus();
}

/**
 * API returning indices list
 * @returns {*}
 */
function getIndices() {
  return NSEAPI.getIndices();
}


/**
 * API returning indices list v2
 * @returns {*}
 */
function getIndices2() {
  return NSEAPI.getIndices2();
}

/**
 * Return list of companies with their sector name
 * [{
      sector: "NIFTY IT ", //Sector name
      symbol: "TRIGYN", //company symbol
      PE: "0", // Symbol P/E value
      date: "08-Jun-2018 06:45:10", // last date
      sectorPE: "19.53" // Sectoral Index P/E value
    }],
 * @returns {array}
 */
function getSectorsList() {
  return NSEAPI.getSectorsList();
}

/**
 * Get info about a stock
 * @param symbol {string} symbol of company
 *
 * @returns {object}
 */
function getQuoteInfo(symbol) {
  return NSEAPI.getQuoteInfo(symbol);
}


function getQuotes(symbol) {
  return NSEAPI.getQuotes(symbol);
}

/**
 * Get List of Gainers
 * @returns {*}
 */
function getGainers() {
  return NSEAPI.getGainers();
}

/**
 * Get List of Losers
 * @returns {*}
 */
function getLosers() {
  return NSEAPI.getLosers();
}

/**
 * Get Incline and Decline values
 * @returns {*}
 */
function getInclineDecline() {
  return NSEAPI.getInclineDecline();
}

/**
 * Return a json Array of all Equities listed on NSE
 * @returns {Array}
 */
function getAllStocksCSV() {
  return NSEAPI.getAllStocksCSV();
}

/**
 * Return stocks list for specified index slug
 * @param slug
 * @returns {*}
 */
function getIndexStocks(slug) {
  return NSEAPI.getIndexStocks(slug);
}


/**
 * Intra-day Stocks data
 * @param symbol = stock symbol
 * @param time [1, 5, 15, 30, 60, 'week', 'month', 'year'] minutes
 * @returns {*}
 */
function getIntraDayDataXML(symbol, time) {
  return NSEAPI.getIntraDayData(symbol, time);
}

/**
 * Intra-day Index chart data
 * @param symbol = index symbol
 * @param time [1, 5, 15, 30, 60, 'week', 'month', 'year'] minutes
 * @returns {*}
 */
function getIndexChartData(symbol, time) {
  return NSEAPI.getIndexChartData(symbol, time);
}


/**
 * Get CandleStick Data
 * @param symbol = stock symbol
 * @param time = [1, 5, 15, 30, 60, 'week', 'month', 'year'] minutes
 * @param isIndex {boolean} to fetch candleStick data of index
 * @returns {*}
 */
function getCandleStickData(symbol, time, isIndex) {
  return NSEAPI.getCandleStickData(symbol, time, isIndex);
}

/**
 * Search NSE Stocks by symbol or name
 * @param symbol {string} min 3 chars
 * @returns {[{name, symbol]}
 */

function searchStocks(symbol) {
  return NSEAPI.searchStocks(symbol);
}

/**
 * Search Equity Derivatives
 * @param symbol {string} min 3 chars
 * @returns {[{name, symbol]}
 */

function searchEquityDerivatives(symbol) {
  return NSEAPI.searchIndex(symbol);
}

/**
 * Get Stock options and futures expiry dates
 * @param symbol
 * @param isFutures true=> return expiry date of futures else options
 * @returns {*}
 */
function getStockFutureOptionsExpiryDates(symbol, isFutures) {
  return NSEAPI.getStockFutureOptionsExpiryDates(symbol, isFutures);
}

/**
 * Get Call/Put Stock Options Prices Data
 * @param symbol
 * @param expiryDate use one of values returned by getStockFutureOptionsExpiryDates method only
 * @param isCall true=> call strike prices values else 'Put'
 * @returns {*}
 */
function getStockOptionsPrices(symbol, expiryDate, isCall) {
  return NSEAPI.getStockOptionsPrices(symbol, expiryDate, isCall);
}

/**
 * Get Stock Options Data
 * @param symbol
 * @param expiryDate
 * @param isCall
 * @param strikePrice
 * @returns {*}
 */
function getStockOptionsData(symbol, expiryDate, isCall, strikePrice) {
  return NSEAPI.getStockOptionsData(symbol, expiryDate, isCall, strikePrice);
}

/**
 * Get Stock Futures Data
 * @param symbol
 * @param expiryDate
 * @returns {*}
 */
function getStockFuturesData(symbol, expiryDate) {
  return NSEAPI.getStockFuturesData(symbol, expiryDate);
}


/**
 * A Wrapper method to fetch all the data for expiries date together
 * @param symbol
 * @returns {*} an object with expiry date as key and future data as value
 */
function getFuturesData(symbol) {
  return NSEAPI.getStockFutureOptionsExpiryDates(symbol, true)
    .then(function (response) {
      var data = response.data;
      var expiries = data['expiries'];
      if (expiries && expiries.length > 0) {
        return Promise.all(expiries.map(function (date) {
            return NSEAPI.getStockFuturesData(symbol, date);
          })
        );
      } else {
        return Promise.reject('No expiry dates present');
      }
    })
    .then(function (value) {
      var res = {};
      value.map(function (v) {
        var d = {};
        try {
          d[v.config.params.expiry] = v.data.data[0] || {};
        } catch (e) {
          d[v.config.params.expiry] = {};
        }
        res = Object.assign(res, d);
      });
      return Promise.resolve(res);
    });
}


var nse = {
  getMarketStatus: getMarketStatus,
  getIndices: getIndices,
  getIndices2: getIndices2,

  getSectorsList: getSectorsList,
  getQuoteInfo: getQuoteInfo,

  getQuotes: getQuotes,

  getGainers: getGainers,
  getLosers: getLosers,

  getInclineDecline: getInclineDecline,

  getAllStocksCSV: getAllStocksCSV,

  getIndexStocks: getIndexStocks,

  getIntraDayDataXML: getIntraDayDataXML,

  getIndexChartData: getIndexChartData,

  getCandleStickData: getCandleStickData,

  searchStocks: searchStocks,

  searchEquityDerivatives: searchEquityDerivatives,

  getStockFutureOptionsExpiryDates: getStockFutureOptionsExpiryDates,

  getStockOptionsPrices: getStockOptionsPrices,

  getStockOptionsData: getStockOptionsData,

  getStockFuturesData: getStockFuturesData,

  getFuturesData: getFuturesData
};

module.exports = nse;