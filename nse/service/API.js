var axios = require('axios');
var LOSERS_URL = require('../constant').LOSERS_URL;
var GAINERS_URL = require('../constant').GAINERS_URL;
var SECTORS_LIST = require('../constant').SECTORS_LIST;
var GET_QUOTE_URL = require('../constant').GET_QUOTE_URL;
var QUOTE_INFO_URL = require('../constant').QUOTE_INFO_URL;
var INDICES_WATCH_URL = require('../constant').INDICES_WATCH_URL;
var MARKET_STATUS_URL = require('../constant').MARKET_STATUS_URL;
var ADVANCES_DECLINES_URL = require('../constant').ADVANCES_DECLINES_URL;

function getMarketStatus() {
  return axios.get(MARKET_STATUS_URL);
}

function getIndices() {
  return axios.get(INDICES_WATCH_URL);
}

function getSectorsList() {
  return axios.get(SECTORS_LIST);
}

function getQuotes(symbol) {
  return axios.get(GET_QUOTE_URL + symbol);
}

function getQuoteInfo(symbol) {
  return axios.get(QUOTE_INFO_URL + symbol)
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

var API = {
  getIndices: getIndices,
  getMarketStatus: getMarketStatus,
  getSectorsList: getSectorsList,
  getQuotes: getQuotes,
  getQuoteInfo: getQuoteInfo,
  getGainers: getGainers,
  getLosers: getLosers,
  getInclineDecline: getInclineDecline,
  // getDailyStocks: getDailyStocks,
  // getCompanyInfo: getCompanyInfo,
  // getDayStocks: getDayStocks,
};

module.exports = API;