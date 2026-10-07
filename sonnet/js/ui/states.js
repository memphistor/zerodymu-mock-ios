export function renderLoading(message = "Ładowanie…") {
  return `
    <div class="state-block" role="status">
      <div class="spinner" aria-hidden="true"></div>
      <p class="state-block__title">${message}</p>
    </div>
  `;
}

export function renderError(message, retryLabel = "Spróbuj ponownie") {
  return `
    <div class="state-block" role="alert">
      <div class="state-block__icon" aria-hidden="true">⚠️</div>
      <h2 class="state-block__title">Coś poszło nie tak</h2>
      <p class="state-block__text">${message}</p>
      <button type="button" class="btn btn--primary" data-action="retry">${retryLabel}</button>
    </div>
  `;
}

export function renderEmpty({ icon = "📭", title, text, actionHtml = "" }) {
  return `
    <div class="state-block">
      <div class="state-block__icon" aria-hidden="true">${icon}</div>
      <h2 class="state-block__title">${title}</h2>
      <p class="state-block__text">${text}</p>
      ${actionHtml}
    </div>
  `;
}
