/* global ZD */
(function (global) {
  "use strict";

  var PRICE_PER_CIG = 1.1;
  var PACK_PRICE = 22;
  var HISTORY_DAYS = 30;

  function lastNDays(n, todayStr) {
    var today = ZD.streak.parseDate(todayStr);
    var out = [];
    for (var i = n - 1; i >= 0; i--) {
      var d = ZD.streak.addDays(today, -i);
      out.push(ZD.streak.formatDate(d));
    }
    return out;
  }

  function savingsVsBaseline(logsByDate, baseline, days, todayStr) {
    var dates = lastNDays(days, todayStr);
    var savedCigs = 0;
    var spent = 0;
    for (var i = 0; i < dates.length; i++) {
      var key = dates[i];
      var smoked = logsByDate[key];
      if (smoked === undefined) continue;
      savedCigs += Math.max(0, baseline - smoked);
      spent += smoked * PRICE_PER_CIG;
    }
    return {
      savedCigs: savedCigs,
      savedMoney: savedCigs * PRICE_PER_CIG,
      spent: spent,
      baseline: baseline,
    };
  }

  function chartSeries(logsByDate, todayStr) {
    var dates = lastNDays(HISTORY_DAYS, todayStr);
    return dates.map(function (date) {
      return {
        date: date,
        value: logsByDate[date] !== undefined ? logsByDate[date] : null,
      };
    });
  }

  function isEditableDate(dateStr, todayStr) {
    if (dateStr > todayStr) return false;
    var today = ZD.streak.parseDate(todayStr);
    var min = ZD.streak.addDays(today, -(HISTORY_DAYS - 1));
    var minStr = ZD.streak.formatDate(min);
    return dateStr >= minStr;
  }

  global.ZD = global.ZD || {};
  global.ZD.cigarettes = {
    PRICE_PER_CIG: PRICE_PER_CIG,
    PACK_PRICE: PACK_PRICE,
    HISTORY_DAYS: HISTORY_DAYS,
    lastNDays: lastNDays,
    savingsVsBaseline: savingsVsBaseline,
    chartSeries: chartSeries,
    isEditableDate: isEditableDate,
  };
})(typeof window !== "undefined" ? window : this);
