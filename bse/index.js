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
 * Fetch Index info, eg., high, low, open etc…
 * @param symbolKey {number} Index 'key' value
 * @returns {*}
 */
function getIndexInfo(symbolKey) {
  return API.getIndexInfo(symbolKey);
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
function getStockInfoAndDayChartData(securityCode) {
  return API.getStockInfoAndDayChartData(securityCode);
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
 * Returns stock buy and sell quantity
 * @param securityCode
 * @returns {*}
 */
function getStockMarketDepth(securityCode) {
  return API.getStockMarketDepth(securityCode);
}


/**
 *  API returning Company Info
 * @param securityCode {number} BSE, company securityCode value
 * @param flag {enum}, oneOf [1D,5D,1M,3M,6M,12M]
 * @returns {*}
 */
function getStocksChartData(securityCode, flag) {
  return API.getStocksChartData(securityCode, flag);
}


var bse = {
  getTopTurnOvers: getTopTurnOvers,
  getIndices: getIndices,
  getGainers: getGainers,
  getLosers: getLosers,
  getStocksChartData: getStocksChartData,
  getCompanyInfo: getCompanyInfo,
  getStockInfoAndDayChartData: getStockInfoAndDayChartData,
  getIndexChartData: getIndexChartData,
  getIndexStocks: getIndexStocks,
  getIndexInfo: getIndexInfo,
  getStockMarketDepth: getStockMarketDepth
};

module.exports = bse;