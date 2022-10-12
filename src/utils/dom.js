/**
 * Append element to target position
 *
 * @param el
 * @param prop
 */
export const appendTo = (element, targetSelector = 'body') => {
  if (!element) return;
  if (typeof targetSelector !== 'string') {
    targetSelector?.append(element);
    return;
  }
  const target = document.querySelector(targetSelector);
  target?.append(element);
};
