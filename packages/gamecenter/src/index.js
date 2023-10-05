import { defineCustomElement } from 'vue';

import Game from './components/game/Game.ce.vue';

const GameCE = defineCustomElement(Game);

export { Game, GameCE };

export function register() {
  customElements.define('mjsz-vbr-game', GameCE);
}

export default register;
