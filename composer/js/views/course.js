/* global ZD */
(function (global) {
  "use strict";

  function getCtx(state) {
    return {
      moduleStates: ZD.progress.computeModuleStates(
        ZD.course.modules,
        ZD.course.lessons,
        state.completedLessons,
        state.passedModuleQuizzes
      ),
      state: state,
    };
  }

  function moduleList(state) {
    var ctx = getCtx(state);
    var html =
      '<div class="nav-header nav-header--large"><div class="nav-header__row"></div>' +
      '<h1 class="nav-title nav-title--large">Kurs</h1>' +
      '<p class="nav-subtitle">6 modułów · lekcje, quizy, egzamin</p></div>' +
      '<div class="screen-padding"><div class="stack">';

    ctx.moduleStates.forEach(function (ms) {
      var pct = ms.total ? Math.round((ms.done / ms.total) * 100) : 0;
      var locked = !ms.isUnlocked;
      var hint = "";
      if (locked) {
        hint = '<p class="list-row__meta">🔒 Ukończ poprzedni moduł i zdaj jego quiz modułowy.</p>';
      }
      html +=
        '<article class="card module-card ' +
        (locked ? "" : "card--interactive") +
        '" ' +
        (locked ? "" : 'data-nav="#/kurs/modul/' + ms.module.module_number + '"') +
        ">" +
        '<div class="module-card__header"><span class="module-card__num">Moduł ' +
        ms.module.module_number +
        "</span>" +
        ZD.render.statusBadge(ms.status) +
        "</div>" +
        '<h2 class="module-card__title">' +
        ZD.render.escapeHtml(ms.module.title) +
        "</h2>" +
        '<p class="module-card__desc">' +
        ZD.render.escapeHtml(ms.module.description) +
        "</p>" +
        hint +
        '<p class="list-row__meta">Lekcje: ' +
        ms.done +
        "/" +
        ms.total +
        "</p>" +
        '<div class="progress-bar"><div class="progress-bar__fill" style="width:' +
        pct +
        '%"></div></div></article>';
    });

    var examUnlocked = ZD.progress.isFinalExamUnlocked(ctx.moduleStates);
    html +=
      '<article class="card module-card ' +
      (examUnlocked ? "card--interactive" : "") +
      '" ' +
      (examUnlocked ? 'data-nav="#/kurs/egzamin"' : "") +
      ">" +
      '<div class="module-card__header"><span class="module-card__num">Finał</span>' +
      (state.finalExamPassed
        ? '<span class="badge badge--done">Zdany</span>'
        : examUnlocked
          ? '<span class="badge badge--progress">Dostępny</span>'
          : '<span class="badge badge--locked">🔒 Zablokowany</span>') +
      "</div>" +
      '<h2 class="module-card__title">Egzamin końcowy</h2>' +
      '<p class="module-card__desc">10 pytań · wymagane 100% poprawnych odpowiedzi.</p>' +
      (examUnlocked ? "" : '<p class="list-row__meta">Ukończ wszystkie moduły i quizy modułowe.</p>') +
      "</article>";

    html += "</div></div>";
    return html;
  }

  function moduleDetail(state, moduleNum) {
    var mod = ZD.course.getModuleByNumber(moduleNum);
    if (!mod) return '<div class="screen-padding">Moduł nie znaleziony.</div>';

    var ctx = getCtx(state);
    var ms = null;
    ctx.moduleStates.forEach(function (s) {
      if (s.module.id === mod.id) ms = s;
    });
    if (!ms || !ms.isUnlocked) {
      return (
        '<div class="nav-header"><div class="nav-header__row">' +
        '<button type="button" class="nav-back" data-nav="#/kurs">‹</button>' +
        '<h1 class="nav-title">Moduł ' +
        moduleNum +
        '</h1><span style="width:44px"></span></div></div>' +
        '<div class="screen-padding"><div class="card card__body">' +
        "<p>🔒 Ten moduł jest zablokowany.</p><p>Ukończ wszystkie lekcje i quiz modułowy poprzedniego modułu.</p></div></div>"
      );
    }

    var items = ZD.progress.buildLessonItems(
      ZD.course.lessons.filter(function (l) {
        return l.module_id === mod.id;
      }),
      state.completedLessons,
      state.readLessons
    );

    var pct = ms.total ? Math.round((ms.done / ms.total) * 100) : 0;
    var html =
      '<div class="nav-header"><div class="nav-header__row">' +
      '<button type="button" class="nav-back" data-nav="#/kurs">‹</button>' +
      '<h1 class="nav-title">Moduł ' +
      moduleNum +
      '</h1><span style="width:44px"></span></div>' +
      '<p class="nav-subtitle" style="padding:0 16px 8px">' +
      ZD.render.escapeHtml(mod.title) +
      "</p></div>" +
      '<div class="screen-padding">' +
      '<div class="progress-bar" style="margin-bottom:16px;height:8px"><div class="progress-bar__fill" style="width:' +
      pct +
      '%"></div></div>' +
      '<div class="card">';

    items.forEach(function (item) {
      var locked = !item.isUnlocked;
      var done = item.isDone;
      var st = done ? "done" : locked ? "locked" : "open";
      var rowClass = "list-row" + (locked ? " list-row--locked" : "");
      var nav = locked ? "" : ' data-nav="#/kurs/lekcja/' + item.lesson.id + '"';
      var hint = locked ? '<p class="list-row__meta">Ukończ poprzednią lekcję i quiz.</p>' : "";
      html +=
        '<div class="' +
        rowClass +
        '"' +
        nav +
        ' style="' +
        (locked ? "" : "cursor:pointer") +
        '">' +
        '<div class="list-row__icon">' +
        ZD.render.iconLesson(st) +
        "</div>" +
        '<div class="list-row__content"><p class="list-row__title">' +
        item.lesson.lesson_number +
        ". " +
        ZD.render.escapeHtml(item.lesson.title) +
        "</p>" +
        hint +
        "</div></div>";
    });

    html += "</div>";

    if (ms.allLessonsDone) {
      var mqKey = ZD.quiz.quizKey("module", mod.id);
      var att = ZD.quiz.getAttempts(state, mqKey);
      html +=
        '<div style="margin-top:16px" class="card card__body">' +
        "<h3 style=\"margin:0 0 8px\">Quiz modułowy</h3>" +
        (ms.quizPassed
          ? '<p class="badge badge--done">Zaliczony</p>'
          : '<p>5 pytań · podejścia: ' + att + "/" + ZD.quiz.MAX_ATTEMPTS + "</p>") +
        (ms.quizPassed
          ? ""
          : '<button type="button" class="btn btn--primary btn--block" style="margin-top:12px" data-nav="#/kurs/quiz-modul/' +
            mod.id +
            '">Rozpocznij quiz modułowy</button>') +
        "</div>";
    } else {
      html +=
        '<p class="list-row__meta" style="margin-top:12px">Quiz modułowy odblokuje się po ukończeniu wszystkich lekcji.</p>';
    }

    html += "</div>";
    return html;
  }

  function lessonDetail(state, lessonId) {
    var lesson = ZD.course.getLesson(lessonId);
    if (!lesson) return '<div class="screen-padding">Lekcja nie znaleziona.</div>';

    var mod = ZD.course.getModule(lesson.module_id);
    var items = ZD.progress.buildLessonItems(
      ZD.course.lessons.filter(function (l) {
        return l.module_id === lesson.module_id;
      }),
      state.completedLessons,
      state.readLessons
    );
    var unlocked = false;
    items.forEach(function (it) {
      if (it.lesson.id === lessonId) unlocked = it.isUnlocked;
    });

    if (!unlocked) {
      return (
        '<div class="nav-header"><div class="nav-header__row">' +
        '<button type="button" class="nav-back" data-nav="#/kurs/modul/' +
        (mod ? mod.module_number : 1) +
        '">‹</button><h1 class="nav-title">Lekcja</h1><span style="width:44px"></span></div></div>' +
        '<div class="screen-padding"><div class="card card__body"><p>🔒 Lekcja zablokowana. Ukończ poprzednią lekcję i quiz.</p></div></div>'
      );
    }

    var isRead = state.readLessons[lessonId];
    var isDone = state.completedLessons[lessonId];

    var html =
      '<div class="nav-header"><div class="nav-header__row">' +
      '<button type="button" class="nav-back" data-nav="#/kurs/modul/' +
      mod.module_number +
      '">‹</button>' +
      '<h1 class="nav-title">' +
      ZD.render.escapeHtml(lesson.title) +
      '</h1><span style="width:44px"></span></div></div>' +
      '<div class="screen-padding lesson-reader">';

    if (lesson.toc && lesson.toc.length) {
      html += '<nav class="lesson-toc" aria-label="Spis treści"><p class="lesson-toc__title">Spis treści</p><ul>';
      lesson.toc.forEach(function (t) {
        html += '<li><a href="#sec-' + t.id + '">' + ZD.render.escapeHtml(t.title) + "</a></li>";
      });
      html += "</ul></nav>";
    }

    if (lesson.nutshell) {
      html +=
        '<div class="callout"><div class="callout__label">Lekcja w pigułce</div><p style="margin:0">' +
        ZD.render.escapeHtml(lesson.nutshell) +
        "</p></div>";
    }

    html += '<div class="lesson-content">';
    (lesson.sections || []).forEach(function (sec) {
      html += '<section id="sec-' + sec.id + '">';
      if (sec.title) html += "<h2>" + ZD.render.escapeHtml(sec.title) + "</h2>";
      html += sec.body || "";
      if (sec.task) {
        html +=
          '<div class="callout callout--task"><div class="callout__label">Zadanie</div><p style="margin:0">' +
          ZD.render.escapeHtml(sec.task) +
          "</p></div>";
      }
      html += "</section>";
    });
    html += "</div>";

    html +=
      '<div style="margin-top:24px">' +
      (isRead
        ? '<p class="badge badge--done">Przeczytane</p>'
        : '<button type="button" class="btn btn--secondary btn--block" id="mark-read">Oznacz jako przeczytane</button>') +
      '<button type="button" class="btn btn--primary btn--block" style="margin-top:10px" ' +
      (isRead ? 'data-nav="#/kurs/quiz-lekcja/' + lessonId + '"' : "disabled") +
      ">" +
      (isDone ? "Quiz zaliczony ✓" : "Przejdź do quizu") +
      "</button></div></div>";

    setTimeout(function () {
      var btn = document.getElementById("mark-read");
      if (btn) {
        btn.addEventListener("click", function () {
          var s = ZD.store.load();
          ZD.store.markLessonRead(s, lessonId);
          ZD.app.rerender();
        });
      }
    }, 0);

    return html;
  }

  global.ZD = global.ZD || {};
  global.ZD.views = global.ZD.views || {};
  global.ZD.views.course = {
    moduleList: moduleList,
    moduleDetail: moduleDetail,
    lessonDetail: lessonDetail,
  };
})(typeof window !== "undefined" ? window : this);
