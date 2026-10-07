/* global ZD */
(function (global) {
  "use strict";

  var MILESTONES = [1, 3, 7, 14, 30, 60, 90, 180, 365];

  function parseDate(str) {
    return new Date(str + "T12:00:00");
  }

  function formatDate(d) {
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  function addDays(d, n) {
    var x = new Date(d);
    x.setDate(x.getDate() + n);
    return x;
  }

  /** Smoke-free streak: missing log does not break; only day with cigs > 0 breaks. */
  function computeSmokeFreeStreak(logsByDate, todayStr) {
    var today = parseDate(todayStr);
    var streak = 0;
    var d = today;

    for (var i = 0; i < 400; i++) {
      var key = formatDate(d);
      if (key > todayStr) break;
      var val = logsByDate[key];
      if (val === undefined) {
        d = addDays(d, -1);
        continue;
      }
      if (val > 0) break;
      if (val === 0) streak++;
      d = addDays(d, -1);
    }
    return streak;
  }

  function achievedMilestones(streakDays) {
    return MILESTONES.filter(function (m) {
      return streakDays >= m;
    });
  }

  global.ZD = global.ZD || {};
  global.ZD.streak = {
    MILESTONES: MILESTONES,
    computeSmokeFreeStreak: computeSmokeFreeStreak,
    achievedMilestones: achievedMilestones,
    formatDate: formatDate,
    parseDate: parseDate,
    addDays: addDays,
  };
})(typeof window !== "undefined" ? window : this);
