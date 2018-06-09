var axios = require('axios');

var csvTojs = require('../utils/csvToJson');
var csvToJson2Keys = require('../utils/csvToJson_2Keys');

var LOSERS_URL = require('../constant').LOSERS_URL;
var INDICES_URL = require('../constant').INDICES_URL;
var GAINERS_URL = require('../constant').GAINERS_URL;
var TURNOVER_URL = require('../constant').TURNOVER_URL;
var COMPANY_HEADER = require('../constant').COMPANY_HEADER;
var LOSERS_HEADERS = require('../constant').LOSERS_HEADERS;
var GAINERS_HEADERS = require('../constant').GAINERS_HEADERS;
var INDICES_HEADERS = require('../constant').INDICES_HEADERS;
var DAILY_STOCKS_URL = require('../constant').DAILY_STOCKS_URL;
var TURNOVER_HEADERS = require('../constant').TURNOVER_HEADERS;
var INDICES_INFO_URL = require('../constant').INDICES_INFO_URL;
var HISTORY_STOCKS_URL = require('../constant').HISTORY_STOCKS_URL;
var DAILY_STOCKS_HEADERS = require('../constant').DAILY_STOCKS_HEADERS;
var DAILY_STOCKS_CLOSING_HEADERS = require('../constant').DAILY_STOCKS_CLOSING_HEADERS;

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

function axiosTransformer(url, headers) {
  return axios.get(url, {
    transformResponse: [function (data) {
      return csvTojs(data, headers || null)
    }]
  });
}

function axiosTransformerAdvance(url, closeHeaders, normalHeaders) {
  return axios.get(url, {
    transformResponse: [function (data) {
      var getClosing = data.split('#@#');
      var closingInfo = [];
      var normalData = [];
      if (getClosing.length > 1) { // day ended we have closing data
        closingInfo = csvTojs(getClosing[0], closeHeaders);
        normalData = csvTojs(getClosing[1], normalHeaders)
      } else {
        normalData = csvTojs(data, normalHeaders);
      }
      return {
        closing: closingInfo,
        dailyData: normalData
      }
    }]
  });
}

function axiosTableTransformer(url) {
  return axios.get(url, {
    transformResponse: [function (data) {
      var formattedString = data;
      formattedString = formattedString.replace(/<\/td>/g, ',<\/td>');
      formattedString = formattedString.replace(/<\/tr>/g, '#<\/tr>');
      formattedString = formattedString.replace(/<(?:.|\n)*?>/gm, '');
      formattedString = formattedString.replaceAll(',#', '');
      formattedString = formattedString.replaceAll(',:,', ',');
      formattedString = formattedString.replaceAll(',,', '#');

      return csvToJson2Keys(formattedString);
    }]
  });
}

function getTopTurnOvers() {
  return axiosTransformer(TURNOVER_URL, TURNOVER_HEADERS);
}

function getIndices() {
  return axiosTransformer(INDICES_URL, INDICES_HEADERS);
}

function getIndicesInfo(symbol) {
  return axiosTransformerAdvance(INDICES_INFO_URL);
}

function getGainers() {
  return axiosTransformer(GAINERS_URL, GAINERS_HEADERS);
}

function getLosers() {
  return axiosTransformer(LOSERS_URL, LOSERS_HEADERS);
}

function getCompanyInfo(securityCode) {
  return axiosTableTransformer(COMPANY_HEADER + securityCode);
}

function getDailyStocks(securityCode) {
  return axiosTransformerAdvance(DAILY_STOCKS_URL + securityCode, DAILY_STOCKS_CLOSING_HEADERS, DAILY_STOCKS_HEADERS);
}

function getDayStocks(securityCode, flag) {
  return axiosTransformerAdvance(
    HISTORY_STOCKS_URL + securityCode + '&Flag=' + flag.toUpperCase(),
    DAILY_STOCKS_CLOSING_HEADERS, DAILY_STOCKS_HEADERS);
}

var API = {
  getTopTurnOvers: getTopTurnOvers,
  getIndices: getIndices,
  getGainers: getGainers,
  getLosers: getLosers,
  getDailyStocks: getDailyStocks,
  getCompanyInfo: getCompanyInfo,
  getDayStocks: getDayStocks,
  getIndicesInfo: getIndicesInfo
};

module.exports = API;