/**
 * Append element to target position
 *
 * @param el
 * @param prop
 */
export const appendTo = (element, targetSelector = 'body') => {
  console.log({ element });
  if (!element) return;
  const target = document.querySelector(targetSelector);
  target?.append(element);
};
