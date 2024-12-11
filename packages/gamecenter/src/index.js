import { defineCustomElement } from 'vue';

import Game from './components/game/Game.ce.vue';
import GameTimeline from './components/game-timeline/GameTimeline.ce.vue';

const GameCE = defineCustomElement(Game);
const GameTimelineCE = defineCustomElement(GameTimeline);

export { Game, GameTimeline, GameCE, GameTimelineCE };

export function register() {
  customElements.define('mjsz-vbr-game', GameCE);
  customElements.define('mjsz-vbr-game-timeline', GameTimelineCE);
}

export default {
  install: () => register(),
};
