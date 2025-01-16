import { computed, toValue } from 'vue';

export function useTeamColors(gameData) {
  const colors = computed(() => {
    const { homeTeam, awayTeam } = toValue(gameData);
    if (!homeTeam?.color || !awayTeam?.color)
      return {};

    return {
      '--vbr-widget-gamecenter-home-team-identifier-color': `#${homeTeam.color}`,
      '--vbr-widget-gamecenter-away-team-identifier-color': `#${awayTeam.color}`,
      ...(homeTeam.color === 'ffffff' && {
        '--vbr-widget-gamecenter-home-team-identifie-borderr-color': '#343434',
      }),
      ...(awayTeam.color === 'ffffff' && {
        '--vbr-widget-gamecenter-away-team-identifier-border-color': '#343434',
      }),
    };
  });

  return colors;
}
