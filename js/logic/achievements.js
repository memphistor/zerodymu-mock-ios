/* global ZD */
(function (global) {
  "use strict";

  var DEFINITIONS = [
    { id: "mod1", title: "Pierwszy moduł", desc: "Ukończ moduł 1", icon: "📘", check: function (ctx) { return ctx.completedModules >= 1; } },
    { id: "mod3", title: "Połowa drogi", desc: "Ukończ 3 moduły", icon: "📚", check: function (ctx) { return ctx.completedModules >= 3; } },
    { id: "mod6", title: "Mistrz kursu", desc: "Ukończ wszystkie 6 modułów", icon: "🎓", check: function (ctx) { return ctx.completedModules >= 6; } },
    { id: "streak7", title: "Tydzień bez dymu", desc: "Seria 7 dni (wpisy z 0 papierosów)", icon: "🔥", check: function (ctx) { return ctx.streakDays >= 7; } },
    { id: "streak30", title: "Miesiąc wolności", desc: "Seria 30 dni", icon: "🏆", check: function (ctx) { return ctx.streakDays >= 30; } },
    { id: "exam", title: "Egzamin zdany", desc: "Zalicz egzamin końcowy", icon: "✅", check: function (ctx) { return ctx.finalExamPassed; } },
  ];

  function evaluate(ctx) {
    return DEFINITIONS.map(function (def) {
      return {
        id: def.id,
        title: def.title,
        desc: def.desc,
        icon: def.icon,
        unlocked: def.check(ctx),
      };
    });
  }

  global.ZD = global.ZD || {};
  global.ZD.achievements = {
    DEFINITIONS: DEFINITIONS,
    evaluate: evaluate,
  };
})(typeof window !== "undefined" ? window : this);
