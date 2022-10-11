import { ref, unref, watch } from 'vue';
import { computePosition } from '@floating-ui/dom';
import { appendTo } from '../utils/dom';

export function useFloating({ middleware, placement = null, strategy, append }) {
  const reference = ref(null);
  const floating = ref(null);
  const x = ref(null);
  const y = ref(null);
  const _strategy = ref(strategy ?? 'absolute');

  const update = () => {
    console.log(reference.value, floating.value);
    if (!reference.value || !floating.value) return;

    computePosition(reference.value, floating.value, {
      middleware,
      placement,
      strategy,
    }).then((data) => {
      x.value = data.x;
      y.value = data.y;
      _strategy.value = data.strategy;
    });
  };

  watch(
    () => ({
      reference: unref(reference),
      floating: unref(floating),
    }),
    ({ floating }) => {
      if (unref(append)) appendTo(floating, append);
      update();
    },
    { immediate: true, flush: 'post' }
  );

  return {
    x,
    y,
    reference,
    floating,
    strategy: _strategy,
    update,
  };
}
