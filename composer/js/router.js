/* global ZD */
(function (global) {
  "use strict";

  var routes = [];

  function parseHash() {
    var hash = location.hash.replace(/^#/, "") || "/panel";
    if (hash.charAt(0) !== "/") hash = "/" + hash;
    var parts = hash.split("/").filter(Boolean);
    return { parts: parts, raw: hash };
  }

  function navigate(path) {
    if (path.charAt(0) !== "/") path = "/" + path;
    location.hash = "#" + path;
  }

  function register(matcher, handler) {
    routes.push({ matcher: matcher, handler: handler });
  }

  function matchRoute(parsed) {
    var p = parsed.parts;
    for (var i = 0; i < routes.length; i++) {
      var m = routes[i].matcher(p);
      if (m) return { handler: routes[i].handler, params: m };
    }
    return null;
  }

  function currentTab(parsed) {
    var first = parsed.parts[0] || "panel";
    if (first === "kurs") return "kurs";
    if (first === "ustawienia") return "ustawienia";
    return "panel";
  }

  function isSubScreen(parsed) {
    return parsed.parts.length > 1 && parsed.parts[0] === "kurs";
  }

  global.ZD = global.ZD || {};
  global.ZD.router = {
    parseHash: parseHash,
    navigate: navigate,
    register: register,
    matchRoute: matchRoute,
    currentTab: currentTab,
    isSubScreen: isSubScreen,
  };
})(typeof window !== "undefined" ? window : this);
