import { groupBy, prop } from '@mjsz-vbr-elements/core/utils';

const ROUND_ORDER = ['Negyeddöntő', 'Elődöntő', 'Döntő'];

function createMatchNode(match) {
  return { type: 'match', match, id: null, childIds: [] };
}

function createByeNode() {
  return { type: 'bye', match: null, id: null, childIds: [] };
}

function getExpectedRounds(numberOfTeams) {
  return Math.ceil(Math.log2(numberOfTeams));
}

function sortRounds(rounds) {
  return rounds.toSorted(
    (a, b) => ROUND_ORDER.indexOf(a) - ROUND_ORDER.indexOf(b),
  );
}

/**
 * Builds a playoff tree structure from flat API data.
 *
 * @param {Array} playoffsData - Flat array from /v2/playoffs-tree API
 * @param {number} numberOfTeams - 4, 6, or 8
 * @returns {{ columns: Array<Array<{ type: string, match: object|null }>> }}
 *   columns[0] = quarter-finals, columns[1] = semi-finals, columns[last] = final
 */
export function buildPlayoffTree(playoffsData, numberOfTeams) {
  if (!playoffsData?.length) {
    return { columns: [] };
  }

  const groupByRound = groupBy(prop('divisionStage2Name'));
  const grouped = groupByRound(playoffsData);
  const roundNames = sortRounds(Object.keys(grouped));
  const expectedRounds = getExpectedRounds(numberOfTeams);

  const columns = [];

  for (const roundName of roundNames) {
    const matches = grouped[roundName];
    const sorted = matches.toSorted(
      (a, b) => (a.divisionStageNumber || 0) - (b.divisionStageNumber || 0),
    );
    columns.push(sorted.map(m => createMatchNode(m)));
  }

  // 6 csapat: 3 kör kell, de a negyeddöntőben csak 2 meccs van
  // BYE node-ok hozzáadása a megfelelő pozíciókra
  // Az első oszlop (index 0) a negyeddöntő a ROUND_ORDER sorrend miatt
  if (numberOfTeams === 6 && columns.length >= 2) {
    const firstRoundIndex = 0;
    const quarterFinals = columns[firstRoundIndex];

    // A fa struktúra: ED-1 [BYE, ND-1], ED-2 [ND-2, BYE]
    // BYE-ok kívülre, meccsek középre
    if (quarterFinals.length === 2) {
      columns[firstRoundIndex] = [
        createByeNode(),
        quarterFinals[0],
        quarterFinals[1],
        createByeNode(),
      ];
    }
  }

  // 8 csapat: a negyeddöntő 4 meccsből áll, nincs BYE
  // 4 csapat: elődöntő 2 meccs + döntő, nincs BYE

  // Oszlopok feltöltése: ha kevesebb oszlop van mint kellene,
  // placeholder oszlopokat adunk a megfelelő számú node-dal.
  // Minden körben: 2^(expectedRounds - 1 - roundIndex) meccs kell.
  while (columns.length < expectedRounds) {
    const roundIndex = columns.length;
    const expectedMatches = 2 ** (expectedRounds - 1 - roundIndex);
    columns.push(Array.from({ length: expectedMatches }).fill(null).map(() => createByeNode()));
  }

  // Node ID-k hozzárendelése
  for (let colIndex = 0; colIndex < columns.length; colIndex++) {
    for (let nodeIndex = 0; nodeIndex < columns[colIndex].length; nodeIndex++) {
      columns[colIndex][nodeIndex].id = `node-${colIndex}-${nodeIndex}`;
    }
  }

  // Szülő-gyerek kapcsolatok: col+1 node → col 2*n és 2*n+1 node
  for (let colIndex = 1; colIndex < columns.length; colIndex++) {
    const parentCol = columns[colIndex];
    const childCol = columns[colIndex - 1];
    for (let nodeIndex = 0; nodeIndex < parentCol.length; nodeIndex++) {
      const topChildIndex = nodeIndex * 2;
      const bottomChildIndex = nodeIndex * 2 + 1;
      if (topChildIndex < childCol.length) {
        parentCol[nodeIndex].childIds.push(childCol[topChildIndex].id);
      }
      if (bottomChildIndex < childCol.length) {
        parentCol[nodeIndex].childIds.push(childCol[bottomChildIndex].id);
      }
    }
  }

  return { columns };
}
