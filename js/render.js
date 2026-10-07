/* global ZD */
(function (global) {
  "use strict";

  function escapeHtml(str) {
    if (str == null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  function showToast(message) {
    var existing = document.querySelector(".toast");
    if (existing) existing.remove();
    var node = el('<div class="toast" role="status">' + escapeHtml(message) + "</div>");
    document.body.appendChild(node);
    setTimeout(function () {
      node.remove();
    }, 2800);
  }

  function statusBadge(status) {
    if (status === "done") return '<span class="badge badge--done">Ukończony</span>';
    if (status === "progress") return '<span class="badge badge--progress">W trakcie</span>';
    return '<span class="badge badge--locked">🔒 Zablokowany</span>';
  }

  function iconLesson(state) {
    if (state === "done") return "✓";
    if (state === "locked") return "🔒";
    return "○";
  }

  global.ZD = global.ZD || {};
  global.ZD.render = {
    escapeHtml: escapeHtml,
    el: el,
    showToast: showToast,
    statusBadge: statusBadge,
    iconLesson: iconLesson,
  };
})(typeof window !== "undefined" ? window : this);
