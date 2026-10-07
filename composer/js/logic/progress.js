/* global ZD */
(function (global) {
  "use strict";

  function buildLessonItems(lessons, completedIds, readIds) {
    var sorted = lessons.slice().sort(function (a, b) {
      return a.lesson_number - b.lesson_number;
    });
    return sorted.map(function (lesson, index) {
      var isDone = completedIds[lesson.id] === true;
      var prev = sorted[index - 1];
      var prevDone = !prev || completedIds[prev.id] === true;
      var isUnlocked = index === 0 || isDone || prevDone;
      return {
        lesson: lesson,
        isDone: isDone,
        isRead: readIds[lesson.id] === true,
        isUnlocked: isUnlocked,
      };
    });
  }

  function computeModuleStates(modules, lessons, completedIds, passedModuleQuizzes) {
    var sorted = modules.slice().sort(function (a, b) {
      return a.module_number - b.module_number;
    });

    return sorted.map(function (module, index) {
      var moduleLessons = lessons.filter(function (l) {
        return l.module_id === module.id;
      });
      var done = moduleLessons.filter(function (l) {
        return completedIds[l.id] === true;
      }).length;
      var quizPassed = passedModuleQuizzes[module.id] === true;
      var allLessonsDone = moduleLessons.length > 0 && done === moduleLessons.length;
      var isCompleted = allLessonsDone && quizPassed;

      var isUnlocked = index === 0;
      if (index > 0) {
        var prev = sorted[index - 1];
        var prevLessons = lessons.filter(function (l) {
          return l.module_id === prev.id;
        });
        var prevDone = prevLessons.filter(function (l) {
          return completedIds[l.id] === true;
        }).length;
        var prevAllDone = prevLessons.length === 0 || prevDone === prevLessons.length;
        isUnlocked = prevAllDone && passedModuleQuizzes[prev.id] === true;
      }

      var status = "locked";
      if (isCompleted) status = "done";
      else if (isUnlocked) status = "progress";

      return {
        module: module,
        total: moduleLessons.length,
        done: done,
        isUnlocked: isUnlocked,
        isCompleted: isCompleted,
        quizPassed: quizPassed,
        allLessonsDone: allLessonsDone,
        status: status,
      };
    });
  }

  function findNextLesson(moduleStates, lessons, completedIds) {
    for (var i = 0; i < moduleStates.length; i++) {
      var state = moduleStates[i];
      if (!state.isUnlocked) continue;
      var items = buildLessonItems(
        lessons.filter(function (l) {
          return l.module_id === state.module.id;
        }),
        completedIds,
        {}
      );
      for (var j = 0; j < items.length; j++) {
        if (!items[j].isDone && items[j].isUnlocked) {
          return { module: state.module, lesson: items[j].lesson };
        }
      }
    }
    return null;
  }

  function isFinalExamUnlocked(moduleStates) {
    if (!moduleStates.length) return false;
    for (var i = 0; i < moduleStates.length; i++) {
      if (!moduleStates[i].isCompleted) return false;
    }
    return true;
  }

  function completedModulesCount(moduleStates) {
    var n = 0;
    for (var i = 0; i < moduleStates.length; i++) {
      if (moduleStates[i].isCompleted) n++;
    }
    return n;
  }

  function currentModuleState(moduleStates) {
    for (var i = 0; i < moduleStates.length; i++) {
      if (moduleStates[i].isUnlocked && !moduleStates[i].isCompleted) {
        return moduleStates[i];
      }
    }
    return moduleStates[moduleStates.length - 1] || null;
  }

  global.ZD = global.ZD || {};
  global.ZD.progress = {
    buildLessonItems: buildLessonItems,
    computeModuleStates: computeModuleStates,
    findNextLesson: findNextLesson,
    isFinalExamUnlocked: isFinalExamUnlocked,
    completedModulesCount: completedModulesCount,
    currentModuleState: currentModuleState,
  };
})(typeof window !== "undefined" ? window : this);
