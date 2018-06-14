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
 * @param time = {1, 5, 15, 30, 60} minutes
 * @returns {*}
 */
function getIntraDayData(symbol, time) {
  return NSEAPI.getIntraDayData(symbol, time);
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

  getIntraDayData: getIntraDayData
};

module.exports = nse;