import { externalPlayerLinkResolver } from '@mjsz-vbr-elements/core/utils';
import { inject, provide, toValue } from 'vue';

const usePlayerResolverContext = Symbol('usePlayerResolverContext');

export function usePlayerResolverProvider(externalPlayerResolverProp, gameData) {
  function resolveExternalPlayerLink(params) {
    const { championshipId } = toValue(gameData);
    return externalPlayerLinkResolver(externalPlayerResolverProp, { ...params, championshipId });
  }

  provide(usePlayerResolverContext, {
    resolver: resolveExternalPlayerLink,
  });
}

export function usePlayerResolver() {
  const resolver = inject(usePlayerResolverContext, null);

  if (!resolver)
    return;

  return resolver;
}
