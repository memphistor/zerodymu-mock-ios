/* global ZD */
(function (global) {
  "use strict";

  var pendingAnswers = {};

  function renderQuizScreen(ctx) {
    var type = ctx.quizType;
    var id = ctx.quizId;
    var key = ZD.quiz.quizKey(type, id);
    var state = ctx.state;
    var attempts = ZD.quiz.getAttempts(state, key);
    var canTry = ZD.quiz.canAttempt(state, key);

    var questions = [];
    var title = "Quiz";
    if (type === "lesson") {
      questions = ZD.course.lessonQuizzes[id] || [];
      var les = ZD.course.getLesson(id);
      title = les ? "Quiz: " + les.title : title;
    } else if (type === "module") {
      questions = ZD.course.moduleQuizzes[id] || [];
      var mod = ZD.course.getModule(id);
      title = mod ? "Quiz modułu " + mod.module_number : title;
    } else {
      questions = ZD.course.finalExam;
      title = "Egzamin końcowy";
    }

    pendingAnswers = {};

    if (!canTry) {
      return (
        '<div class="nav-header"><div class="nav-header__row">' +
        '<button type="button" class="nav-back" data-nav="' +
        escapeAttr(ctx.backPath) +
        '" aria-label="Wstecz">‹</button>' +
        '<h1 class="nav-title">' +
        ZD.render.escapeHtml(title) +
        "</h1><span style=\"width:44px\"></span></div></div>" +
        '<div class="screen-padding"><div class="card card__body">' +
        "<p><strong>Wykorzystałeś wszystkie " +
        ZD.quiz.MAX_ATTEMPTS +
        " podejść.</strong></p>" +
        "<p>Skontaktuj się z supportem kursu lub zresetuj dane demo w ustawieniach, aby spróbować ponownie w mocku.</p>" +
        '<button type="button" class="btn btn--secondary btn--block" data-nav="' +
        escapeAttr(ctx.backPath) +
        '">Wróć</button></div></div>'
      );
    }

    var html =
      '<div class="nav-header"><div class="nav-header__row">' +
      '<button type="button" class="nav-back" data-nav="' +
      escapeAttr(ctx.backPath) +
      '" aria-label="Wstecz">‹</button>' +
      '<h1 class="nav-title">' +
      ZD.render.escapeHtml(title) +
      "</h1><span style=\"width:44px\"></span></div>" +
      '<p class="nav-subtitle" style="padding:0 16px 8px">Podejście ' +
      (attempts + 1) +
      " / " +
      ZD.quiz.MAX_ATTEMPTS +
      " · wymagane 100%</p></div>" +
      '<div class="screen-padding" id="quiz-root">';

    for (var i = 0; i < questions.length; i++) {
      var q = questions[i];
      html += '<div class="quiz-block" data-qid="' + q.id + '" style="margin-bottom:24px">';
      html += "<p><strong>" + (i + 1) + ". " + ZD.render.escapeHtml(q.question_text) + "</strong></p>";
      ["a", "b", "c", "d"].forEach(function (letter) {
        var opt = q["option_" + letter];
        html +=
          '<button type="button" class="quiz-option" data-qid="' +
          q.id +
          '" data-opt="' +
          letter +
          '"><span style="font-weight:700;margin-right:8px">' +
          letter.toUpperCase() +
          ".</span> " +
          ZD.render.escapeHtml(opt) +
          "</button>";
      });
      html += '<div class="quiz-feedback" id="fb-' + q.id + '"></div></div>';
    }

    html +=
      '<button type="button" class="btn btn--primary btn--block" id="quiz-submit" disabled>Sprawdź odpowiedzi</button>';
    html += '<div id="quiz-summary"></div></div>';

    setTimeout(function () {
      bindQuizEvents(ctx, questions, key);
    }, 0);

    return html;
  }

  function escapeAttr(s) {
    return String(s).replace(/"/g, "&quot;");
  }

  function bindQuizEvents(ctx, questions, key) {
    var root = document.getElementById("quiz-root");
    if (!root) return;

    root.querySelectorAll(".quiz-option").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var qid = btn.getAttribute("data-qid");
        var opt = btn.getAttribute("data-opt");
        pendingAnswers[qid] = opt;
        root.querySelectorAll('.quiz-option[data-qid="' + qid + '"]').forEach(function (b) {
          b.classList.toggle("is-selected", b === btn);
        });
        var allAnswered = questions.every(function (q) {
          return pendingAnswers[q.id];
        });
        var submit = document.getElementById("quiz-submit");
        if (submit) submit.disabled = !allAnswered;
      });
    });

    var submit = document.getElementById("quiz-submit");
    if (!submit) return;
    submit.addEventListener("click", function () {
      var state = ZD.store.load();
      if (state.__corrupt) return;
      var grade = ZD.quiz.gradeQuiz(questions, pendingAnswers);
      ZD.quiz.recordAttempt(state, key);
      ZD.store.save(state);

      questions.forEach(function (q) {
        var fb = document.getElementById("fb-" + q.id);
        if (!fb) return;
        var yours = pendingAnswers[q.id];
        var ok = grade.results[q.id];
        root.querySelectorAll('.quiz-option[data-qid="' + q.id + '"]').forEach(function (b) {
          b.disabled = true;
          if (b.getAttribute("data-opt") === q.correct) b.classList.add("is-correct");
          if (b.getAttribute("data-opt") === yours && !ok) b.classList.add("is-wrong");
        });
        fb.innerHTML =
          '<div class="quiz-result ' +
          (ok ? "quiz-result--ok" : "quiz-result--fail") +
          '">' +
          (ok ? "✓ Poprawnie" : "✗ Błędnie") +
          "<br>Twoja: <strong>" +
          yours.toUpperCase() +
          "</strong> · Poprawna: <strong>" +
          q.correct.toUpperCase() +
          "</strong><br><span style=\"font-size:14px\">" +
          ZD.render.escapeHtml(q.explanation) +
          "</span></div>";
      });

      submit.style.display = "none";
      var summary = document.getElementById("quiz-summary");
      if (!summary) return;

      if (grade.passed) {
        if (ctx.quizType === "lesson") {
          var stLesson = ZD.store.load();
          if (!stLesson.readLessons[ctx.quizId]) {
            summary.innerHTML =
              '<div class="quiz-result quiz-result--fail">Oznacz lekcję jako przeczytaną, aby ją ukończyć.</div>';
          } else {
            ZD.store.completeLesson(stLesson, ctx.quizId);
            summary.innerHTML =
          '<div class="quiz-result quiz-result--ok">Quiz zaliczony! Lekcja ukończona.</div>' +
          '<button type="button" class="btn btn--primary btn--block" data-nav="' +
          escapeAttr(ctx.backPath) +
          '">Kontynuuj</button>';
          }
        } else if (ctx.quizType === "module") {
          ZD.store.passModuleQuiz(state, ctx.quizId);
          summary.innerHTML =
            '<div class="quiz-result quiz-result--ok">Quiz modułowy zaliczony!</div>' +
            '<button type="button" class="btn btn--primary btn--block" data-nav="#/kurs">Wróć do kursu</button>';
        } else {
          ZD.store.passFinalExam(state);
          summary.innerHTML =
            '<div class="quiz-result quiz-result--ok">Egzamin zdany! Gratulacje!</div>' +
            '<button type="button" class="btn btn--primary btn--block" data-nav="#/panel">Idź do panelu</button>';
        }
      } else {
        var left = ZD.quiz.MAX_ATTEMPTS - ZD.quiz.getAttempts(state, key);
        summary.innerHTML =
          '<div class="quiz-result quiz-result--fail">Wynik: ' +
          grade.correct +
          "/" +
          grade.total +
          ". Wymagane 100%." +
          (left > 0 ? " Zostało podejść: " + left + "." : "") +
          '</div>' +
          (left > 0
            ? '<button type="button" class="btn btn--secondary btn--block" id="quiz-retry">Spróbuj ponownie</button>'
            : "");
      }
      var retry = document.getElementById("quiz-retry");
      if (retry) {
        retry.addEventListener("click", function () {
          ZD.app.rerender();
        });
      }
    });
  }

  global.ZD = global.ZD || {};
  global.ZD.views = global.ZD.views || {};
  global.ZD.views.quiz = {
    renderQuizScreen: renderQuizScreen,
  };
})(typeof window !== "undefined" ? window : this);
