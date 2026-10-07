/* global ZD */
(function (global) {
  "use strict";

  var MAX_ATTEMPTS = 5;

  function quizKey(type, id) {
    if (type === "final") return "final";
    if (type === "module") return "module:" + id;
    return "lesson:" + id;
  }

  function getAttempts(state, key) {
    return state.quizAttempts[key] || 0;
  }

  function canAttempt(state, key) {
    return getAttempts(state, key) < MAX_ATTEMPTS;
  }

  function recordAttempt(state, key) {
    state.quizAttempts[key] = getAttempts(state, key) + 1;
  }

  function gradeQuiz(questions, answers) {
    var results = {};
    var correct = 0;
    for (var i = 0; i < questions.length; i++) {
      var q = questions[i];
      var ok = answers[q.id] === q.correct;
      results[q.id] = ok;
      if (ok) correct++;
    }
    var passed = correct === questions.length && questions.length > 0;
    return {
      results: results,
      correct: correct,
      total: questions.length,
      passed: passed,
    };
  }

  function optionLabel(letter) {
    return letter.toUpperCase();
  }

  global.ZD = global.ZD || {};
  global.ZD.quiz = {
    MAX_ATTEMPTS: MAX_ATTEMPTS,
    quizKey: quizKey,
    getAttempts: getAttempts,
    canAttempt: canAttempt,
    recordAttempt: recordAttempt,
    gradeQuiz: gradeQuiz,
    optionLabel: optionLabel,
  };
})(typeof window !== "undefined" ? window : this);
