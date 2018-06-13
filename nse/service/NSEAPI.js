var axios = require('axios');
var csv2Json = require('../../utils/csv2Json');
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
  return axios.get(GET_QUOTE_URL + symbol);
}

function getQuoteInfo(symbol) {
  return axios.get(QUOTE_INFO_URL + symbol, {
    headers: {
      Referer: GET_QUOTE_URL + symbol,
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
  getAllStocksCSV: getAllStocksCSV

  // getDailyStocks: getDailyStocks,
  // getCompanyInfo: getCompanyInfo,
  // getDayStocks: getDayStocks,
};

module.exports = NSEAPI;