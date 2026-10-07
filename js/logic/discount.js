/* global ZD */
(function (global) {
  "use strict";

  var MODULE_DISCOUNT = 10;
  var MILESTONE_DISCOUNT = 5;
  var MAX_DISCOUNT = 90;

  function calculateDiscount(completedModules, totalModules, streakDays) {
    var achieved = ZD.streak.achievedMilestones(streakDays).length;
    var fromModules = completedModules * MODULE_DISCOUNT;
    var fromMilestones = achieved * MILESTONE_DISCOUNT;
    var total = Math.min(MAX_DISCOUNT, fromModules + fromMilestones);

    var nextStep = null;
    if (total < MAX_DISCOUNT) {
      if (completedModules < totalModules) {
        nextStep = "Ukończ kolejny moduł, aby zdobyć +" + MODULE_DISCOUNT + "% zniżki";
      } else {
        var next = null;
        var ms = ZD.streak.MILESTONES;
        for (var i = 0; i < ms.length; i++) {
          if (streakDays < ms[i]) {
            next = ms[i];
            break;
          }
        }
        if (next) {
          nextStep =
            "Wytrzymaj " + next + " dni bez dymu, aby zdobyć +" + MILESTONE_DISCOUNT + "% zniżki";
        }
      }
    }

    return {
      fromModules: fromModules,
      fromMilestones: fromMilestones,
      total: total,
      completedModules: completedModules,
      achievedMilestones: achieved,
      nextStep: nextStep,
    };
  }

  function discountCode(userId) {
    var hash = 0;
    var s = String(userId || "zd-mock");
    for (var i = 0; i < s.length; i++) {
      hash = (hash << 5) - hash + s.charCodeAt(i);
      hash |= 0;
    }
    var hex = Math.abs(hash).toString(16).toUpperCase();
    while (hex.length < 8) hex = "0" + hex;
    return "ZD-" + hex.slice(0, 8);
  }

  global.ZD = global.ZD || {};
  global.ZD.discount = {
    MODULE_DISCOUNT: MODULE_DISCOUNT,
    MILESTONE_DISCOUNT: MILESTONE_DISCOUNT,
    MAX_DISCOUNT: MAX_DISCOUNT,
    calculateDiscount: calculateDiscount,
    discountCode: discountCode,
  };
})(typeof window !== "undefined" ? window : this);
