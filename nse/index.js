var API = require('./service/API');


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
  return API.getIndices();
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
  return API.getSectorsList();
}

/**
 * Get info about a stock
 * @param symbol {string} symbol of company
 *
 * @returns {object}
 */
function getQuoteInfo(symbol) {
  return API.getQuoteInfo(symbol);
}


function getQuotes(symbol) {
  return API.getQuotes();
}

/**
 * Get List of Gainers
 * @returns {*}
 */
function getGainers() {
  return API.getGainers();
}

/**
 * Get List of Losers
 * @returns {*}
 */
function getLosers() {
  return API.getLosers();
}

/**
 * Get Incline and Decline values
 * @returns {*}
 */
function getInclineDecline() {
  return API.getInclineDecline();
}

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