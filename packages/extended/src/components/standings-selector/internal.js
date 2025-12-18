import { sum } from '@mjsz-vbr-elements/core/utils';

export function transformStandings(list) {
  return list.map(item => ({ ...item, w: sum([item.w, item.otw, item.sow]), l: sum([item.l, item.otl, item.sol]) }));
}
