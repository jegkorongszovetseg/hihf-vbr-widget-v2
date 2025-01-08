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

export function sortByDomNode(nodes, resolveKey = () => ({})) {
  return nodes.slice().sort((aItem, zItem) => {
    let a = resolveKey(aItem);
    let z = resolveKey(zItem);

    if (a === null || z === null) return 0;

    let position = a.compareDocumentPosition(z);

    if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
    if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
    return 0;
  });
}
