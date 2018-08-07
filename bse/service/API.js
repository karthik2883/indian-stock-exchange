var axios = require('axios');
var _ = require('lodash');

var csvTojs = require('../utils/csvToJson');
var csvToJson2Keys = require('../utils/csvToJson_2Keys');
var companyNames = require('../constant/names');

var INDEX_INFO_URL = require('../constant').INDEX_INFO_URL;
var INDEX_HEAT_MAP = require('../constant').INDEX_HEAT_MAP;
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
var INDICES_CHART_DATA_URL = require('../constant').INDICES_CHART_DATA_URL;
var HISTORY_STOCKS_URL = require('../constant').HISTORY_STOCKS_URL;
var DAILY_STOCKS_HEADERS = require('../constant').DAILY_STOCKS_HEADERS;
var DAILY_STOCKS_CLOSING_HEADERS = require('../constant').DAILY_STOCKS_CLOSING_HEADERS;

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

//TODO https://www.bseindia.com/stock-share-price/SiteCache/Stock_Trading.aspx?text=500520&type=EQ

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

function getIndexStocks(symbolKey) {
  return axios({
    method: 'GET',
    url: INDEX_HEAT_MAP,
    params: {
      indexcode: symbolKey,
      random: Math.random()
    },
    transformResponse: [function (data) {
      var actualData = data.split('$#$');
      var stocks = _.compact(_.map(actualData[1].split('|'), function (stock) {
        var vals = stock.split(',');
        if (vals.length === 13 && vals[0] !== 'aaaa') {
          return {
            name: vals[0],
            percChange: vals[1] || vals[12] || 0,
            companyName: companyNames(vals[8]) || vals[2],
            open: vals[3],
            high: vals[4],
            low: vals[5],
            ltp: vals[6],
            pointChange: vals[7],
            symbol: vals[8],
            wap: vals[9],
            totalQuantityTraded: vals[10],
            url: vals[11]
          };
        }
        return null;
      }));
      return stocks || [];
    }]
  });
}


// TODO https://www.bseindia.com/stock-share-price/SiteCache/EQHeaderData.aspx?text=532134

function getIndexInfo(symbolKey) {
  return axios({
    method: 'GET',
    url: INDEX_INFO_URL,
    params: {
      flag: 'INDEX',
      indexcode: symbolKey,
      random: Math.random()
    },
    transformResponse: [function (data) {
      var actualData = data.split('$#$');
      var values = actualData[1].split('@');
      var statusType = 'Close';

      if (values.length >= 11) {

        switch (values[10]) {
          case '2':
            statusType = 'Close';
            break;
          case '1':
            statusType = 'Pre-open';
            break;
          case '0':
            statusType = 'Open';
            break;
        }
        return {
          symbol: values[1],
          open: values[2],
          high: values[3],
          low: values[4],
          ltp: values[5],
          previousClose: values[6],
          pointChange: values[7],
          percChange: values[8],
          timeVal: values[9]
        }
      } else {
        return {};
      }
    }]
  });
}

function getIndexChartData(symbolKey, time) {
  return axiosTransformerAdvance(
    INDICES_CHART_DATA_URL + symbolKey + '&flag=' + time.toUpperCase() + '&random=' + Math.random(),
    'date,previousClose,high,low,symbol,close,time',
    'date,preOpen,value');
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

function getStockInfoAndDayChartData(securityCode) {
  return axiosTransformerAdvance(DAILY_STOCKS_URL + securityCode, DAILY_STOCKS_CLOSING_HEADERS, DAILY_STOCKS_HEADERS);
}

function getStocksChartData(securityCode, flag) {
  var flagtemp = flag.toUpperCase();
  var flagSlug = (flagtemp === '1D' ? '' : '&Flag=' + flagtemp);
  return axiosTransformerAdvance(
    HISTORY_STOCKS_URL + securityCode + (flagSlug),
    DAILY_STOCKS_CLOSING_HEADERS, DAILY_STOCKS_HEADERS);
}

function getStockMarketDepth(securityCode) {
  return axios({
    method: 'GET',
    url: 'https://www.bseindia.com/stock-share-price/SiteCache/MarketDepth.aspx',
    params: {
      Type: 'EQ',
      text: securityCode,
      random: Math.random(),
    },
    transformResponse: function (data) {
      try {
        data = data.replaceAll(' type=\'hidden\'', '');
        var regex = /(?:id='(.*?)'(?:.*?)value='(.*?)')/gim;
        var newData = _.map(data.match(regex), function (a) {

          var key = a.match('id=\'.*?\'')[0].replaceAll(/(id=)|(hd)|(\')/, '');
          var newKey = key;

          if (key === 'Date') {
            //pass
          }
          else if (key === '6a') {
            newKey = 'totalBuyQuantity';
          }
          else if (key === '6b') {
            newKey = 'totalSellQuantity';
          }
          else if (_.includes(key, 'a')) {
            newKey = 'buyQuantity' + newKey.replace('a', '');
          }
          else if (_.includes(key, 'b')) {
            newKey = 'buyPrice' + newKey.replace('b', '');
          }
          else if (_.includes(key, 'c')) {
            newKey = 'sellPrice' + newKey.replace('c', '');
          }
          else if (_.includes(key, 'd')) {
            newKey = 'sellQuantity' + newKey.replace('d', '');
          }
          var value = a.match('value=\'.*?\'')[0].replaceAll(/(value=)|(\')/, '');
          var o = {};
          o[newKey] = value || '-';
          return o;
        });

        return newData.reduce(function (obj, item) {
          var key = _.keys(item)[0];
          obj[key] = item[key];
          return obj;
        }, {});
      } catch (e) {
        return {
          buyQuantity1: '-',
          buyPrice1: '-',
          sellPrice1: '-',
          sellQuantity1: '-',
          buyQuantity2: '-',
          buyPrice2: '-',
          sellPrice2: '-',
          sellQuantity2: '-',
          buyQuantity3: '-',
          buyPrice3: '-',
          sellPrice3: '-',
          sellQuantity3: '-',
          buyQuantity4: '-',
          buyPrice4: '-',
          sellPrice4: '-',
          sellQuantity4: '-',
          buyQuantity5: '-',
          buyPrice5: '-',
          sellPrice5: '-',
          sellQuantity5: '-',
          totalBuyQuantity: '-',
          totalSellQuantity: '-'
        }
      }
    }
  })
}

var API = {
  getTopTurnOvers: getTopTurnOvers,
  getIndices: getIndices,
  getGainers: getGainers,
  getLosers: getLosers,
  getStockInfoAndDayChartData: getStockInfoAndDayChartData,
  getCompanyInfo: getCompanyInfo,
  getStocksChartData: getStocksChartData,
  getIndexChartData: getIndexChartData,
  getIndexStocks: getIndexStocks,
  getIndexInfo: getIndexInfo,
  getStockMarketDepth: getStockMarketDepth
};

module.exports = API;