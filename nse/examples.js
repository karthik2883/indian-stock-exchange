var API = require('./service/NSEAPI');

/**
 * Returns market status
 * true => market Close
 * false => market Open
 * @returns {boolean}
 */
function getMarketStatus() {
  return API.getMarketStatus()
    .then(function (value) {
      console.log(value.data)
    });
}

/**
 * API returning top indices
 * @returns {*}
 */
function getIndices() {
  return API.getIndices()
    .then(function (value) {
      console.log(value.data)
    });
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
  return API.getSectorsList()
    .then(function (value) {
      console.log(value.data)
    });
}

/**
 * Get info about a stock
 * @param symbol {string} symbol of company
 *
 * @returns {object}
 */
function getQuoteInfo(symbol) {
  return API.getQuoteInfo(symbol)
    .then(function (value) {
      console.log(value.data)
    });
}


function getQuotes(symbol) {
  return API.getQuotes()
    .then(function (value) {
      console.log(value.data)
    });
}

/**
 * Get List of Gainers
 * @returns {*}
 */
function getGainers() {
  return API.getGainers()
    .then(function (value) {
      console.log(value.data)
    });
}

/**
 * Get List of Losers
 * @returns {*}
 */
function getLosers() {
  return API.getLosers()
    .then(function (value) {
      console.log(value.data)
    });
}

/**
 * Get Incline and Decline values
 * @returns {*}
 */
function getInclineDecline() {
  return API.getInclineDecline()
    .then(function (value) {
      console.log(value.data)
    });
}

function getAllStocksCSV() {
  return API.getAllStocksCSV()
    .then(function (value) {
      console.log(value.data)
    });
}

function getIntraDayData(symbol) {
  return API.getIntraDayData('TCS', 'month')
    .then(function (value) {
      console.log(value.data, 'value')
    });
}

function getCandleStickData(symbol) {
  return API.getCandleStickData(symbol, 1, true)
    .then(function (value) {
      console.log(value.data, 'value')
    });
}

function searchStocks(symbol) {
  return API.searchStocks(symbol)
    .then(function (value) {
      var data = value.data;
      console.log(data);

    });
}

searchStocks('IN');
// getIndices();
// getQuotes('SUNPHARMA');
// getQuoteInfo('SUNPHARMA');

var nse = {
  getMarketStatus: getMarketStatus,
  getIndices: getIndices,
  getSectorsList: getSectorsList,
  getQuoteInfo: getQuoteInfo,

  getQuotes: getQuotes,

  getGainers: getGainers,
  getLosers: getLosers,

  getInclineDecline: getInclineDecline,
};

module.exports = nse;