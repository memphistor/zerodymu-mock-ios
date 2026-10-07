import { getState, patch } from "../store.js";
import { MODULES, getModule } from "../data/course.js";

export function lessonKey(lessonId) {
  return lessonId;
}

export function isLessonCompleted(lessonId) {
  return Boolean(getState().progress.lessons[lessonId]?.completed);
}

export function isLessonQuizPassed(lessonId) {
  return Boolean(getState().progress.lessons[lessonId]?.quizPassed);
}

export function isModuleQuizPassed(moduleId) {
  return Boolean(getState().progress.modules[moduleId]?.quizPassed);
}

export function isExamPassed() {
  return Boolean(getState().progress.examPassed);
}

export function markLessonCompleted(lessonId) {
  const lessons = { ...getState().progress.lessons };
  lessons[lessonId] = { ...lessons[lessonId], completed: true };
  patch({ progress: { ...getState().progress, lessons } });
}

export function markLessonQuizPassed(lessonId) {
  const lessons = { ...getState().progress.lessons };
  lessons[lessonId] = { ...lessons[lessonId], quizPassed: true, completed: true };
  patch({ progress: { ...getState().progress, lessons } });
}

export function markModuleQuizPassed(moduleId) {
  const modules = { ...getState().progress.modules };
  modules[moduleId] = { ...modules[moduleId], quizPassed: true };
  patch({ progress: { ...getState().progress, modules } });
}

export function markExamPassed() {
  patch({ progress: { ...getState().progress, examPassed: true } });
}

export function getModuleProgress(moduleId) {
  const mod = getModule(moduleId);
  if (!mod) return { done: 0, total: 0, pct: 0 };
  const total = mod.lessons.length;
  const done = mod.lessons.filter((l) => isLessonCompleted(l.id)).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  return { done, total, pct };
}

export function getCourseProgress() {
  let done = 0;
  let total = 0;
  MODULES.forEach((m) => {
    const p = getModuleProgress(m.id);
    done += p.done;
    total += p.total;
  });
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

export function moduleStatusLabel(moduleId) {
  const p = getModuleProgress(moduleId);
  if (p.pct === 100 && isModuleQuizPassed(moduleId)) return "Ukończony";
  if (p.done > 0) return "W trakcie";
  return "Do zrobienia";
}
