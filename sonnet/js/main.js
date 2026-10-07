import { h } from './dom.js';
import * as store from './store.js';
import { applyTheme, watchSystemTheme } from './theme.js';
import { startRouter } from './router.js';

store.init();
applyTheme(store.getState().settings.theme);
watchSystemTheme(() => store.getState().settings.theme);

const app = document.querySelector('.app');
const banner = document.getElementById('banner');

function renderBanner() {
  const status = store.getStatus();
  banner.className = 'banner';
  banner.replaceChildren();

  if (!status.persistent) {
    banner.textContent = 'Pamięć przeglądarki jest niedostępna — postęp nie zostanie zapisany po zamknięciu karty.';
  } else if (status.recovered) {
    banner.classList.add('banner--info');
    banner.append(
      h('span', null, 'Zapisane dane były uszkodzone — zaczynamy od nowa.'),
      h('button', { class: 'btn btn--secondary', type: 'button', onClick: store.dismissRecovered }, 'Rozumiem'),
    );
  } else {
    banner.hidden = true;
    app.classList.remove('has-banner');
    return;
  }
  banner.hidden = false;
  app.classList.add('has-banner');
}

store.subscribe(renderBanner);
renderBanner();

startRouter(document.getElementById('view'));
