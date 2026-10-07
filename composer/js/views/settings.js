/* global ZD */
(function (global) {
  "use strict";

  function render(state) {
    var theme = state.theme || "system";
    var html =
      '<div class="nav-header nav-header--large"><h1 class="nav-title nav-title--large">Ustawienia</h1>' +
      '<p class="nav-subtitle">Motyw i dane mocka</p></div>' +
      '<div class="screen-padding">' +
      '<div class="grouped-section"><p class="grouped-section__title">Wygląd</p>' +
      '<div class="card card__body">' +
      '<div class="settings-row"><span>Motyw</span></div>' +
      '<div class="segmented" role="group" aria-label="Motyw">' +
      '<button type="button" class="segmented__btn' +
      (theme === "system" ? " is-active" : "") +
      '" data-theme-pick="system">System</button>' +
      '<button type="button" class="segmented__btn' +
      (theme === "light" ? " is-active" : "") +
      '" data-theme-pick="light">Jasny</button>' +
      '<button type="button" class="segmented__btn' +
      (theme === "dark" ? " is-active" : "") +
      '" data-theme-pick="dark">Ciemny</button>' +
      "</div></div></div>" +
      '<div class="grouped-section"><p class="grouped-section__title">Dane</p>' +
      '<div class="card card__body">' +
      "<p>Reset przywraca dane demonstracyjne i postęp kursu od modułu 1, lekcji 1.</p>" +
      '<button type="button" class="btn btn--secondary btn--block" id="reset-data">Reset danych demo</button>' +
      "</div></div>" +
      '<p class="list-row__meta" style="text-align:center;margin-top:24px">ZeroDymu Mock · v1.0 · Composer</p>' +
      "</div>";

    setTimeout(function () {
      document.querySelectorAll("[data-theme-pick]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var t = btn.getAttribute("data-theme-pick");
          var s = ZD.store.load();
          s.theme = t;
          ZD.store.save(s);
          ZD.store.applyTheme(t);
          ZD.app.rerender();
        });
      });
      var reset = document.getElementById("reset-data");
      if (reset) {
        reset.addEventListener("click", function () {
          if (confirm("Na pewno zresetować wszystkie dane mocka?")) {
            ZD.store.reset();
            ZD.store.applyTheme("system");
            ZD.app.rerender();
            ZD.render.showToast("Dane zresetowane");
          }
        });
      }
    }, 0);

    return html;
  }

  global.ZD = global.ZD || {};
  global.ZD.views = global.ZD.views || {};
  global.ZD.views.settings = { render: render };
})(typeof window !== "undefined" ? window : this);
