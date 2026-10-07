/* global ZD */
(function (global) {
  "use strict";

  var loading = true;

  function tabBar(active) {
    var tabs = [
      { id: "kurs", label: "Kurs", path: "#/kurs", icon: "📖" },
      { id: "panel", label: "Panel", path: "#/panel", icon: "📊" },
      { id: "ustawienia", label: "Ustawienia", path: "#/ustawienia", icon: "⚙️" },
    ];
    var html = '<nav class="tab-bar" aria-label="Główne zakładki">';
    tabs.forEach(function (t) {
      html +=
        '<button type="button" class="tab-bar__item' +
        (active === t.id ? " is-active" : "") +
        '" data-nav="' +
        t.path +
        '" aria-current="' +
        (active === t.id ? "page" : "false") +
        '">' +
        '<span class="tab-bar__icon" aria-hidden="true">' +
        t.icon +
        "</span>" +
        ZD.render.escapeHtml(t.label) +
        "</button>";
    });
    html += "</nav>";
    return html;
  }

  function bindNav(root) {
    root.querySelectorAll("[data-nav]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        var path = el.getAttribute("data-nav");
        if (!path) return;
        if (el.tagName === "BUTTON" || el.hasAttribute("data-nav")) {
          e.preventDefault();
        }
        var hash = path.indexOf("#") === 0 ? path.slice(1) : path;
        ZD.router.navigate(hash);
      });
    });
  }

  function renderMain() {
    var app = document.getElementById("app");
    if (!app) return;

    if (loading) {
      app.innerHTML =
        '<div class="app-shell"><main class="app-main loading-screen">' +
        '<div class="skeleton" style="height:120px"></div><div class="skeleton"></div><div class="skeleton"></div>' +
        "</main></div>";
      return;
    }

    var state = ZD.store.load();
    if (state.__corrupt) {
      app.innerHTML =
        '<div class="app-shell"><main class="app-main"><div class="error-banner">' +
        "<p><strong>Błąd danych</strong></p><p>" +
        ZD.render.escapeHtml(state.error) +
        '</p><button type="button" class="btn btn--primary" id="fix-corrupt">Reset danych</button></div></main></div>';
      var fix = document.getElementById("fix-corrupt");
      if (fix) {
        fix.addEventListener("click", function () {
          ZD.store.reset();
          rerender();
        });
      }
      return;
    }

    var parsed = ZD.router.parseHash();
    var tab = ZD.router.currentTab(parsed);
    var hideTabs = ZD.router.isSubScreen(parsed) && parsed.parts[1] !== "egzamin";
    if (parsed.parts[0] === "kurs" && parsed.parts.length > 1) hideTabs = true;

    var content = "";
    var p = parsed.parts;

    if (p[0] === "kurs") {
      if (p.length === 1) content = ZD.views.course.moduleList(state);
      else if (p[1] === "modul" && p[2]) content = ZD.views.course.moduleDetail(state, parseInt(p[2], 10));
      else if (p[1] === "lekcja" && p[2]) content = ZD.views.course.lessonDetail(state, p[2]);
      else if (p[1] === "quiz-lekcja" && p[2]) {
        content = ZD.views.quiz.renderQuizScreen({
          quizType: "lesson",
          quizId: p[2],
          backPath: "#/kurs/lekcja/" + p[2],
          state: state,
        });
        hideTabs = true;
      } else if (p[1] === "quiz-modul" && p[2]) {
        content = ZD.views.quiz.renderQuizScreen({
          quizType: "module",
          quizId: p[2],
          backPath: "#/kurs/modul/" + (ZD.course.getModule(p[2]) ? ZD.course.getModule(p[2]).module_number : 1),
          state: state,
        });
        hideTabs = true;
      } else if (p[1] === "egzamin") {
        if (!ZD.progress.isFinalExamUnlocked(
          ZD.progress.computeModuleStates(
            ZD.course.modules,
            ZD.course.lessons,
            state.completedLessons,
            state.passedModuleQuizzes
          )
        )) {
          content =
            '<div class="nav-header"><div class="nav-header__row">' +
            '<button type="button" class="nav-back" data-nav="#/kurs">‹</button><h1 class="nav-title">Egzamin</h1><span style="width:44px"></span></div></div>' +
            '<div class="screen-padding"><div class="card card__body"><p>🔒 Egzamin zablokowany. Ukończ wszystkie moduły.</p></div></div>';
        } else {
          content = ZD.views.quiz.renderQuizScreen({
            quizType: "final",
            quizId: "final",
            backPath: "#/kurs",
            state: state,
          });
        }
        hideTabs = true;
      } else content = ZD.views.course.moduleList(state);
    } else if (p[0] === "ustawienia") {
      content = ZD.views.settings.render(state);
    } else {
      content = ZD.views.dashboard.render(state);
    }

    app.innerHTML =
      '<div class="app-shell"><main class="app-main" id="main-content">' +
      content +
      "</main>" +
      (hideTabs ? "" : tabBar(tab)) +
      "</div>";

    bindNav(app);
  }

  function rerender() {
    renderMain();
  }

  function init() {
    ZD.router.register(function (p) {
      return p[0] === "kurs" || p[0] === "panel" || p[0] === "ustawienia" || p.length === 0;
    }, function () {});

    var state = ZD.store.load();
    if (!state.__corrupt) {
      ZD.store.applyTheme(state.theme || "system");
    }

    if (!location.hash || location.hash === "#") {
      location.hash = "#/panel";
    }

    setTimeout(function () {
      loading = false;
      renderMain();
    }, 320);

    window.addEventListener("hashchange", renderMain);
  }

  global.ZD = global.ZD || {};
  global.ZD.app = {
    init: init,
    rerender: rerender,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(typeof window !== "undefined" ? window : this);
