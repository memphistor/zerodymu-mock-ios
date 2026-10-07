/* global ZD */
(function (global) {
  "use strict";

  var STORAGE_KEY = "zerodymu-mock-v1";

  function todayStr() {
    return ZD.streak.formatDate(new Date());
  }

  function daysAgo(n) {
    return ZD.streak.formatDate(ZD.streak.addDays(new Date(), -n));
  }

  function buildSeedLogs() {
    var logs = {};
    var baseline = 15;
    for (var i = 13; i >= 0; i--) {
      var smoked = Math.max(0, Math.round(baseline - (13 - i) * 1.1 + (i % 3 === 0 ? 1 : 0)));
      logs[daysAgo(i)] = smoked;
    }
    return logs;
  }

  function defaultState() {
    var start = daysAgo(14);
    return {
      version: 1,
      userId: "user-demo-001",
      displayName: "Kursant",
      theme: "system",
      courseStartDate: start,
      smokeFreeStart: start,
      cigaretteBaseline: 15,
      cigaretteBaselineSet: true,
      cigaretteLogs: buildSeedLogs(),
      activityDates: (function () {
        var a = {};
        var logs = buildSeedLogs();
        Object.keys(logs).forEach(function (k) {
          a[k] = true;
        });
        return a;
      })(),
      habits: (function () {
        var h1 = { id: "h1", name: "Szklanka wody zamiast 1. papierosa", checks: {} };
        var h2 = { id: "h2", name: "5 minut spaceru po obiedzie", checks: {} };
        for (var d = 1; d <= 5; d++) {
          var key = daysAgo(d);
          h1.checks[key] = true;
          if (d % 2 === 0) h2.checks[key] = true;
        }
        return [h1, h2];
      })(),
      readLessons: {},
      completedLessons: {},
      passedModuleQuizzes: {},
      finalExamPassed: false,
      quizAttempts: {},
      smokeFreeLongest: 0,
      smokeFreeResets: 0,
      accordionOpen: {
        stats: true,
        cigarettes: true,
        smokefree: false,
        habits: false,
        health: false,
        achievements: false,
        discount: false,
      },
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      var parsed = JSON.parse(raw);
      var base = defaultState();
      for (var k in base) {
        if (parsed[k] === undefined) parsed[k] = base[k];
      }
      return parsed;
    } catch (e) {
      return { __corrupt: true, error: e.message };
    }
  }

  function save(state) {
    if (state.__corrupt) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    return defaultState();
  }

  function markActivity(state, dateStr) {
    state.activityDates[dateStr || todayStr()] = true;
  }

  function completeLesson(state, lessonId) {
    state.completedLessons[lessonId] = true;
    markActivity(state);
    save(state);
  }

  function markLessonRead(state, lessonId) {
    state.readLessons[lessonId] = true;
    markActivity(state);
    save(state);
  }

  function passModuleQuiz(state, moduleId) {
    state.passedModuleQuizzes[moduleId] = true;
    markActivity(state);
    save(state);
  }

  function passFinalExam(state) {
    state.finalExamPassed = true;
    markActivity(state);
    save(state);
  }

  function activityStreak(state) {
    var today = todayStr();
    var d = new Date();
    var streak = 0;
    for (var i = 0; i < 365; i++) {
      var key = ZD.streak.formatDate(d);
      if (key > today) break;
      if (state.activityDates[key]) {
        streak++;
        d = ZD.streak.addDays(d, -1);
      } else if (i === 0) {
        d = ZD.streak.addDays(d, -1);
      } else {
        break;
      }
    }
    return streak;
  }

  function daysInCourse(state) {
    var start = ZD.streak.parseDate(state.courseStartDate);
    var today = ZD.streak.parseDate(todayStr());
    var diff = Math.floor((today - start) / (86400000)) + 1;
    return Math.max(1, diff);
  }

  function updateSmokeFreeRecord(state) {
    var streak = ZD.streak.computeSmokeFreeStreak(state.cigaretteLogs, todayStr());
    if (streak > (state.smokeFreeLongest || 0)) {
      state.smokeFreeLongest = streak;
      save(state);
    }
    return streak;
  }

  function resetSmokeFreeStreak(state) {
    state.smokeFreeResets = (state.smokeFreeResets || 0) + 1;
    state.smokeFreeStart = todayStr();
    markActivity(state);
    save(state);
  }

  function setCigaretteLog(state, date, count) {
    state.cigaretteLogs[date] = Math.max(0, Math.floor(count));
    markActivity(state, date);
    updateSmokeFreeRecord(state);
    save(state);
  }

  function toggleHabitToday(state, habitId) {
    var key = todayStr();
    for (var i = 0; i < state.habits.length; i++) {
      if (state.habits[i].id === habitId) {
        state.habits[i].checks[key] = !state.habits[i].checks[key];
        markActivity(state);
        save(state);
        return;
      }
    }
  }

  function addHabit(state, name) {
    if (!name || !name.trim()) return;
    state.habits.push({
      id: "h" + Date.now(),
      name: name.trim(),
      checks: {},
    });
    markActivity(state);
    save(state);
  }

  function removeHabit(state, habitId) {
    state.habits = state.habits.filter(function (h) {
      return h.id !== habitId;
    });
    save(state);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme || "system");
  }

  global.ZD = global.ZD || {};
  global.ZD.store = {
    STORAGE_KEY: STORAGE_KEY,
    todayStr: todayStr,
    defaultState: defaultState,
    load: load,
    save: save,
    reset: reset,
    markActivity: markActivity,
    completeLesson: completeLesson,
    markLessonRead: markLessonRead,
    passModuleQuiz: passModuleQuiz,
    passFinalExam: passFinalExam,
    activityStreak: activityStreak,
    daysInCourse: daysInCourse,
    updateSmokeFreeRecord: updateSmokeFreeRecord,
    resetSmokeFreeStreak: resetSmokeFreeStreak,
    setCigaretteLog: setCigaretteLog,
    toggleHabitToday: toggleHabitToday,
    addHabit: addHabit,
    removeHabit: removeHabit,
    applyTheme: applyTheme,
  };
})(typeof window !== "undefined" ? window : this);
