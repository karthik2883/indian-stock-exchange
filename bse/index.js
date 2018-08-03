var API = require('./service/API');

/**
 * API returning top turnovers of day
 * @returns {*}
 */
function getTopTurnOvers() {
  return API.getTopTurnOvers();
}


/**
 * API returning top indices
 * @returns {*}
 */
function getIndices() {
  return API.getIndices();
}

/**
 * Get HeatMap data for index (stock list for a index)
 * @param symbolKey {number} pass in the 'key' value for index (check getIndices method)
 * @returns {*}
 */
function getIndexStocks(symbolKey) {
  return API.getIndexStocks(symbolKey);
}

/**
 * Get Full Day Chart data for a index
 * @param key {number} = use the index 'key' value (check getIndices method, every index has a key value)
 * @param time = {1|1M|3M|6M|12M}
 * @returns {*}
 */
function getIndexChartData(key, time) {
  return API.getIndexChartData(key, time);
}

/**
 * API returning top Gainers of day
 * @returns {*}
 */
function getGainers() {
  return API.getGainers();
}


/**
 * API returning top Losers of day
 * @returns {*}
 */
function getLosers() {
  return API.getLosers();
}


/**
 *  API returning Daily Stocks data of company
 * @param securityCode {number} BSE, company securityCode value
 * @returns {*}
 */
function getDailyStocks(securityCode) {
  return API.getDailyStocks(securityCode);
}


/**
 *  API returning Company Info
 * @param securityCode {number} BSE, company securityCode value
 * @returns {*}
 */
function getCompanyInfo(securityCode) {
  return API.getCompanyInfo(securityCode);
}


/**
 *  API returning Company Info
 * @param securityCode {number} BSE, company securityCode value
 * @param flag {enum}, oneOf [1D,5D,1M,3M,6M,12M]
 * @returns {*}
 */
function getDayStocks(securityCode, flag) {
  return API.getDayStocks(securityCode, flag);
}


var bse = {
  getTopTurnOvers: getTopTurnOvers,
  getIndices: getIndices,
  getGainers: getGainers,
  getLosers: getLosers,
  getDailyStocks: getDailyStocks,
  getCompanyInfo: getCompanyInfo,
  getDayStocks: getDayStocks,
  getIndexChartData: getIndexChartData,
  getIndexStocks: getIndexStocks
};

module.exports = bse;