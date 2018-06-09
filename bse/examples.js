var API = require('./service/API');

function getTopTurnOvers() {
  return API.getTopTurnOvers()
    .then(function (value) {
      console.log(value.data);
    })
    .catch(function (reason) {
      console.log(reason)
    });
}

function getIndices() {
  return API.getIndices()
    .then(function (value) {
      console.log(value.data);
    })
    .catch(function (reason) {
      console.log(reason)
    });
}

function getGainers() {
  return API.getGainers()
    .then(function (value) {
      console.log(value.data);
    })
    .catch(function (reason) {
      console.log(reason)
    });
}

function getLosers() {
  return API.getLosers()
    .then(function (value) {
      console.log(value.data);
    })
    .catch(function (reason) {
      console.log(reason)
    });
}

function getDailyStocks() {
  return API.getDailyStocks(500325)
    .then(function (value) {
      console.log(value.data);
    })
    .catch(function (reason) {
      console.log(reason)
    });
}

function getCompanyInfo(){
  return API.getCompanyInfo(500325)
    .then(function (value) {
      console.log(value.data);
    })
    .catch(function (reason) {
      console.log(reason)
    });
}

function getDayStocks(){
  return API.getDayStocks(500325, '3M')
    .then(function (value) {
      console.log(value.data);
    })
    .catch(function (reason) {
      console.log(reason)
    });
}

//view-source:https://www.bseindia.com/stock-share-price/SiteCache/TabResult.aspx?text=500325&type=results
//document.body.innerText.replace(/\<\/td>/g,',').replace(/<\/tr>/g,'#').replace(/<(?:.|\n)*?>/gm, '');

// getTopTurnOvers();

// getIndices();

getDayStocks();


module.exports = bse;