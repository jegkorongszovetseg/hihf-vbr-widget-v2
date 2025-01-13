import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Game from './Game.vue';

vi.mock('@mjsz-vbr-elements/core/composables', () => {
  return {
    useI18n: () => {
      return {
        t: (t) => t,
      };
    },
    useMainClass: (t) => t,
  };
});

describe('Game', () => {
  describe('statusText', () => {
    it('Van status szöveg', () => {
      const wrapper = mount(Game, {
        props: propsData(),
      });
      expect(wrapper.get('.is-status').isVisible()).toBe(true);
    });

    it('Bajnokság adatok jelennek meg ha a mérkőzés még nem kezdődött el vagy már végetért', async () => {
      const wrapper = mount(Game, {
        props: propsData(),
      });
      expect(wrapper.get('.is-status').text()).toBe('Erste Liga - Alapszakasz');
      await wrapper.setProps(propsData({ gameStatus: 2 }));
      expect(wrapper.get('.is-status').text()).toBe('Erste Liga - Alapszakasz');
    });

    it('Period adatok jelennek meg, ha a mérkőzés megkezdődött (Bemelegítés)', () => {
      const wrapper = mount(Game, {
        props: propsData({ gameStatus: 1 }),
      });
      expect(wrapper.get('.is-status').text()).toBe('game.period.wu');
    });

    it('Idő adat is megjelenik ha a mérkőzés egy harmadban jár (1. harmad)', () => {
      const wrapper = mount(Game, {
        props: propsData({ gameStatus: 1, period: 'p1' }),
      });
      expect(wrapper.get('.is-status').text()).toBe('game.period.p1 - 15:00');
    });

    it('Idő adat nem jelenik meg, ha a mérkőzés egy harmad szünetében jár (1. harmad vége)', () => {
      const wrapper = mount(Game, {
        props: propsData({ gameStatus: 1, period: 'p1_int' }),
      });
      expect(wrapper.get('.is-status').text()).toBe('game.period.p1_int');
    });

    it('Nem szabad időadatnak megjelennie', async () => {
      const wrapper = mount(Game, {
        props: propsData({ gameStatus: 1, period: 'wu' }),
      });
      expect(wrapper.get('.is-status').text()).toBe('game.period.wu');
      await wrapper.setProps(propsData({ gameStatus: 1, period: 'pre' }));
      expect(wrapper.get('.is-status').text()).toBe('game.period.pre');
      await wrapper.setProps(propsData({ gameStatus: 1, period: 'p2_int' }));
      expect(wrapper.get('.is-status').text()).toBe('game.period.p2_int');
      await wrapper.setProps(propsData({ gameStatus: 1, period: 'so' }));
      expect(wrapper.get('.is-status').text()).toBe('game.period.so');
      await wrapper.setProps(propsData({ gameStatus: 1, period: 'end' }));
      expect(wrapper.get('.is-status').text()).toBe('game.period.end');
    });
  });
});

const propsData = (payload = {}) => {
  const { gameStatus = 0, period = 'wu' } = payload;
  return {
    gameData: {
      gameStatus,
      championshipName: 'Erste Liga',
      divisionName: 'Alapszakasz',
      period,
      periodTime: '15:00',
      homeTeam: {
        logo: '',
        longName: '',
      },
      awayTeam: {
        logo: '',
        longName: '',
      },
    },
  };
};
