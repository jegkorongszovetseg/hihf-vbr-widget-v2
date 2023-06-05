import { isRef, ref, unref, watch } from 'vue';
import { autoUpdate, computePosition, arrow as arrowCore } from '@floating-ui/dom';
import { appendTo } from '../utils/dom';

export function useFloating({ middleware, placement = null, strategy, append, enabled }) {
  const reference = ref(null);
  const floating = ref(null);
  const x = ref(null);
  const y = ref(null);
  const arrowX = ref(null);
  const arrowY = ref(null);
  const _placement = ref(null);
  const _strategy = ref(strategy ?? 'absolute');
  const _autoUpdate = ref(null);

  const update = () => {
    if (!reference.value || !floating.value) return;

    computePosition(reference.value, floating.value, {
      middleware,
      placement,
      strategy,
    }).then((data) => {
      // console.log(data);
      x.value = data.x;
      y.value = data.y;
      _strategy.value = data.strategy;

      arrowX.value = data.middlewareData.arrow.x;
      arrowY.value = data.middlewareData.arrow.y;

      _placement.value = data.placement;
    });
  };

  watch(
    () => ({
      reference: unref(reference),
      floating: unref(floating),
      append: unref(append),
    }),
    ({ floating, append }) => {
      if (append) appendTo(floating, append);
      update();
    },
    { flush: 'post' }
  );

  watch(
    enabled,
    (enabled) => {
      if (!reference.value || !floating.value) return;
      if (!enabled) return clean();
      _autoUpdate.value = autoUpdate(reference.value, floating.value, update, {});
    },
    { flush: 'post' }
  );

  const clean = () => {
    _autoUpdate.value?.();
    _autoUpdate.value = null;
  };

  return {
    x,
    y,
    arrowX,
    arrowY,
    placement: _placement,
    reference,
    floating,
    strategy: _strategy,
    update,
  };
}

export const arrow = (options) => {
  const { element, padding } = options;

  return {
    name: 'arrow',
    options,
    fn(args) {
      if (isRef(element)) {
        if (element.value != null) {
          return arrowCore({ element: element.value, padding }).fn(args);
        }

        return {};
      } else if (element) {
        return arrowCore({ element, padding }).fn(args);
      }

      return {};
    },
  };
};
