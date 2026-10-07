/* global ZD */
(function (global) {
  "use strict";

  function accordionItem(id, title, bodyHtml, state) {
    var open = state.accordionOpen[id];
    return (
      '<div class="accordion__item' +
      (open ? " is-open" : "") +
      '" data-acc="' +
      id +
      '">' +
      '<button type="button" class="accordion__trigger" aria-expanded="' +
      open +
      '">' +
      "<span>" +
      ZD.render.escapeHtml(title) +
      '</span><span class="accordion__chevron">▼</span></button>' +
      '<div class="accordion__panel">' +
      bodyHtml +
      "</div></div>"
    );
  }

  function drawChart(canvas, series) {
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var w = canvas.width = canvas.clientWidth * 2;
    var h = canvas.height = 160 * 2;
    ctx.scale(2, 2);
    var cw = w / 2;
    var ch = 160;
    ctx.clearRect(0, 0, cw, ch);
    var values = series.map(function (s) {
      return s.value === null ? null : s.value;
    });
    var max = 1;
    values.forEach(function (v) {
      if (v !== null && v > max) max = v;
    });
    var barW = cw / series.length - 2;
    var pad = 8;
    series.forEach(function (s, i) {
      var v = s.value;
      if (v === null) return;
      var bh = (v / max) * (ch - 24);
      var x = i * (barW + 2) + pad;
      var y = ch - bh - 8;
      ctx.fillStyle = v === 0 ? "#22c55e" : "#3b82f6";
      ctx.fillRect(x, y, barW, bh);
    });
  }

  function render(state) {
    var moduleStates = ZD.progress.computeModuleStates(
      ZD.course.modules,
      ZD.course.lessons,
      state.completedLessons,
      state.passedModuleQuizzes
    );
    var completed = ZD.progress.completedModulesCount(moduleStates);
    var current = ZD.progress.currentModuleState(moduleStates);
    var next = ZD.progress.findNextLesson(moduleStates, ZD.course.lessons, state.completedLessons);
    var streakDays = ZD.streak.computeSmokeFreeStreak(state.cigaretteLogs, ZD.store.todayStr());
    ZD.store.updateSmokeFreeRecord(state);
    var savings = ZD.cigarettes.savingsVsBaseline(
      state.cigaretteLogs,
      state.cigaretteBaseline,
      30,
      ZD.store.todayStr()
    );
    var chartData = ZD.cigarettes.chartSeries(state.cigaretteLogs, ZD.store.todayStr());

    var hero = "";
    if (next) {
      hero =
        '<div class="card cta-hero card__body" data-nav="#/kurs/lekcja/' +
        next.lesson.id +
        '" style="cursor:pointer;margin-bottom:16px">' +
        "<p style=\"margin:0 0 4px;opacity:.9;font-size:13px\">Kontynuuj naukę</p>" +
        "<h2 style=\"margin:0 0 8px;font-size:22px\">Moduł " +
        next.module.module_number +
        ": " +
        ZD.render.escapeHtml(next.lesson.title) +
        '</h2><button type="button" class="btn btn--secondary">Otwórz lekcję</button></div>';
    } else if (state.finalExamPassed) {
      hero =
        '<div class="card card__body" style="margin-bottom:16px"><p>🎉 Kurs ukończony — utrzymuj nawyki w panelu.</p></div>';
    } else if (ZD.progress.isFinalExamUnlocked(moduleStates)) {
      hero =
        '<div class="card cta-hero card__body" data-nav="#/kurs/egzamin" style="cursor:pointer;margin-bottom:16px">' +
        "<h2 style=\"margin:0\">Egzamin końcowy czeka</h2><p class=\"nav-subtitle\">10 pytań · 100%</p></div>";
    }

    var curPct = current && current.total ? Math.round((current.done / current.total) * 100) : 0;

    var statsBody =
      '<div class="stats-grid">' +
      '<div class="stat-tile"><div class="stat-tile__value">' +
      completed +
      "/6</div><div class=\"stat-tile__label\">Moduły</div></div>" +
      '<div class="stat-tile"><div class="stat-tile__value">' +
      curPct +
      "%</div><div class=\"stat-tile__label\">Bieżący moduł</div></div>" +
      '<div class="stat-tile"><div class="stat-tile__value">' +
      ZD.store.daysInCourse(state) +
      "</div><div class=\"stat-tile__label\">Dni w kursie</div></div>" +
      '<div class="stat-tile"><div class="stat-tile__value">' +
      ZD.store.activityStreak(state) +
      "</div><div class=\"stat-tile__label\">Seria aktywności</div></div></div>";

    var cigBody = "";
    if (!state.cigaretteBaselineSet) {
      cigBody =
        '<p>Ustaw bazę — ile papierosów dziennie paliłeś przed kursem.</p>' +
        '<label class="field-label">Papierosy / dzień (baza)</label>' +
        '<input class="field-input" type="number" min="0" id="baseline-input" value="15">' +
        '<button type="button" class="btn btn--primary btn--block" style="margin-top:12px" id="save-baseline">Zapisz bazę</button>';
    } else {
      cigBody =
        "<p>Baza: <strong>" +
        state.cigaretteBaseline +
        "</strong> / dzień · " +
        ZD.cigarettes.PRICE_PER_CIG +
        " zł/szt. · paczka ~" +
        ZD.cigarettes.PACK_PRICE +
        " zł</p>" +
        '<label class="field-label">Wpisy na dziś (' +
        ZD.store.todayStr() +
        ")</label>" +
        '<input class="field-input" type="number" min="0" id="cig-today" value="' +
        (state.cigaretteLogs[ZD.store.todayStr()] != null ? state.cigaretteLogs[ZD.store.todayStr()] : "") +
        '" placeholder="0 = dzień bez">' +
        '<button type="button" class="btn btn--primary btn--block" style="margin-top:8px" id="save-cig-today">Zapisz dziś</button>' +
        "<p style=\"margin-top:12px\">Oszczędność (30 dni): <strong>" +
        savings.savedMoney.toFixed(2) +
        " zł</strong> (" +
        savings.savedCigs +
        " szt.)</p>" +
        '<div class="chart-wrap"><canvas id="cig-chart" height="160" aria-label="Wykres papierosów"></canvas>' +
        '<div class="chart-legend"><span>30 dni wstecz</span><span>max ' +
        Math.max.apply(
          null,
          chartData.map(function (d) {
            return d.value || 0;
          })
        ) +
        "</span></div></div>";
    }

    var milestoneHtml = '<div class="milestone-pills">';
    ZD.streak.MILESTONES.forEach(function (m) {
      var done = streakDays >= m;
      milestoneHtml +=
        '<span class="milestone-pill' +
        (done ? " is-done" : "") +
        '">' +
        (done ? "✓ " : "") +
        m +
        " d.</span>";
    });
    milestoneHtml += "</div>";

    var smokeBody =
      "<p>Aktualna seria bez dymu (wpisy 0, brak wpisu nie przerywa): <strong>" +
      streakDays +
      " dni</strong></p>" +
      "<p>Rekord: <strong>" +
      (state.smokeFreeLongest || 0) +
      " dni</strong> · Resety: " +
      (state.smokeFreeResets || 0) +
      "</p>" +
      milestoneHtml +
      '<button type="button" class="btn btn--ghost btn--block" style="margin-top:12px" id="reset-streak">Restart serii (zachowaj rekord)</button>';

    var habitsDone = 0;
    var today = ZD.store.todayStr();
    state.habits.forEach(function (h) {
      if (h.checks[today]) habitsDone++;
    });
    var habitPct = state.habits.length ? Math.round((habitsDone / state.habits.length) * 100) : 0;
    var habitsBody =
      '<div class="progress-bar" style="margin-bottom:12px"><div class="progress-bar__fill" style="width:' +
      habitPct +
      '%"></div></div>' +
      '<p class="list-row__meta">Dziś: ' +
      habitsDone +
      "/" +
      state.habits.length +
      "</p>";
    if (!state.habits.length) {
      habitsBody += '<div class="empty-state"><div class="empty-state__icon">✨</div><p>Dodaj pierwszy nawyk</p></div>';
    }
    state.habits.forEach(function (h) {
      var checked = h.checks[today];
      habitsBody +=
        '<div class="habit-item"><button type="button" class="habit-check' +
        (checked ? " is-checked" : "") +
        '" data-habit="' +
        h.id +
        '" aria-label="Odhacz">' +
        (checked ? "✓" : "") +
        "</button><span>" +
        ZD.render.escapeHtml(h.name) +
        '</span><button type="button" class="btn btn--ghost" style="min-height:36px;padding:0 8px" data-del-habit="' +
        h.id +
        '">Usuń</button></div>';
    });
    habitsBody +=
      '<input class="field-input" id="new-habit" placeholder="Nowy nawyk…" style="margin-top:12px">' +
      '<button type="button" class="btn btn--secondary btn--block" style="margin-top:8px" id="add-habit">Dodaj nawyk</button>';

    var daysQuit = streakDays;
    var healthBody = '<div class="health-timeline">';
    ZD.course.HEALTH_MILESTONES.forEach(function (m) {
      var done = daysQuit >= m.days;
      healthBody +=
        '<div class="health-step' +
        (done ? " is-done" : "") +
        '"><p class="health-step__title">' +
        ZD.render.escapeHtml(m.title) +
        "</p><p class=\"health-step__desc\">" +
        ZD.render.escapeHtml(m.description) +
        "</p></div>";
    });
    healthBody += "</div>";

    var ach = ZD.achievements.evaluate({
      completedModules: completed,
      streakDays: streakDays,
      finalExamPassed: state.finalExamPassed,
    });
    var achBody = "";
    ach.forEach(function (a) {
      achBody +=
        '<div class="achievement-row' +
        (a.unlocked ? " is-unlocked" : "") +
        '"><span class="achievement-row__icon">' +
        a.icon +
        "</span><div><p style=\"margin:0;font-weight:600\">" +
        ZD.render.escapeHtml(a.title) +
        "</p><p class=\"list-row__meta\">" +
        ZD.render.escapeHtml(a.desc) +
        "</p></div></div>";
    });

    var disc = ZD.discount.calculateDiscount(completed, 6, streakDays);
    var code = ZD.discount.discountCode(state.userId);
    var discBody =
      "<p>Łączna zniżka: <strong>" +
      disc.total +
      "%</strong> (max " +
      ZD.discount.MAX_DISCOUNT +
      "%)</p>" +
      "<p class=\"list-row__meta\">Moduły: +" +
      disc.fromModules +
      "% · Kamienie: +" +
      disc.fromMilestones +
      "%</p>" +
      (disc.nextStep ? "<p>" + ZD.render.escapeHtml(disc.nextStep) + "</p>" : "") +
      '<div class="discount-code"><span id="disc-code">' +
      code +
      '</span><button type="button" class="btn btn--secondary" id="copy-code">Kopiuj</button></div>';

    var html =
      '<div class="nav-header nav-header--large"><h1 class="nav-title nav-title--large">Cześć, ' +
      ZD.render.escapeHtml(state.displayName) +
      "!</h1>" +
      '<p class="nav-subtitle">Twój panel ZeroDymu</p></div>' +
      '<div class="screen-padding">' +
      hero +
      '<div class="grouped-section"><p class="grouped-section__title">Panel</p><div class="accordion">' +
      accordionItem("stats", "Statystyki", statsBody, state) +
      accordionItem("cigarettes", "Tracker papierosów", cigBody, state) +
      accordionItem("smokefree", "Życie bez dymu", smokeBody, state) +
      accordionItem("habits", "Nawyki", habitsBody, state) +
      accordionItem("health", "Regeneracja zdrowia", healthBody, state) +
      accordionItem("achievements", "Osiągnięcia", achBody, state) +
      accordionItem("discount", "Zniżka lojalnościowa", discBody, state) +
      "</div></div></div>";

    setTimeout(function () {
      bindDashboard(state, chartData);
    }, 0);

    return html;
  }

  function bindDashboard(state, chartData) {
    document.querySelectorAll("[data-acc]").forEach(function (item) {
      var trigger = item.querySelector(".accordion__trigger");
      if (!trigger) return;
      trigger.addEventListener("click", function () {
        var id = item.getAttribute("data-acc");
        var s = ZD.store.load();
        s.accordionOpen[id] = !s.accordionOpen[id];
        ZD.store.save(s);
        ZD.app.rerender();
      });
    });

    var chart = document.getElementById("cig-chart");
    if (chart) drawChart(chart, chartData);

    var baseBtn = document.getElementById("save-baseline");
    if (baseBtn) {
      baseBtn.addEventListener("click", function () {
        var inp = document.getElementById("baseline-input");
        var s = ZD.store.load();
        s.cigaretteBaseline = parseInt(inp.value, 10) || 0;
        s.cigaretteBaselineSet = true;
        ZD.store.save(s);
        ZD.render.showToast("Baza zapisana");
        ZD.app.rerender();
      });
    }

    var cigBtn = document.getElementById("save-cig-today");
    if (cigBtn) {
      cigBtn.addEventListener("click", function () {
        var inp = document.getElementById("cig-today");
        var s = ZD.store.load();
        ZD.store.setCigaretteLog(s, ZD.store.todayStr(), parseInt(inp.value, 10) || 0);
        ZD.render.showToast("Zapisano na dziś");
        ZD.app.rerender();
      });
    }

    var resetSt = document.getElementById("reset-streak");
    if (resetSt) {
      resetSt.addEventListener("click", function () {
        var s = ZD.store.load();
        ZD.store.resetSmokeFreeStreak(s);
        ZD.render.showToast("Seria zrestartowana");
        ZD.app.rerender();
      });
    }

    document.querySelectorAll(".habit-check").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var s = ZD.store.load();
        ZD.store.toggleHabitToday(s, btn.getAttribute("data-habit"));
        ZD.app.rerender();
      });
    });

    document.querySelectorAll("[data-del-habit]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var s = ZD.store.load();
        ZD.store.removeHabit(s, btn.getAttribute("data-del-habit"));
        ZD.app.rerender();
      });
    });

    var addH = document.getElementById("add-habit");
    if (addH) {
      addH.addEventListener("click", function () {
        var inp = document.getElementById("new-habit");
        var s = ZD.store.load();
        ZD.store.addHabit(s, inp.value);
        ZD.app.rerender();
      });
    }

    var copy = document.getElementById("copy-code");
    if (copy) {
      copy.addEventListener("click", function () {
        var code = document.getElementById("disc-code").textContent;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(code).then(function () {
            ZD.render.showToast("Kod skopiowany");
          });
        } else {
          ZD.render.showToast(code);
        }
      });
    }
  }

  global.ZD = global.ZD || {};
  global.ZD.views = global.ZD.views || {};
  global.ZD.views.dashboard = { render: render };
})(typeof window !== "undefined" ? window : this);
