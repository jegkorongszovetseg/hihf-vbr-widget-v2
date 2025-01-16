/**
 * Append element to target position
 *
 * @param element
 * @param targetSelector
 */
export function appendTo(element, targetSelector = 'body') {
  if (!element)
    return;
  if (typeof targetSelector !== 'string') {
    targetSelector?.append(element);
    return;
  }
  const target = document.querySelector(targetSelector);
  target?.append(element);
}

export function sortByDomNode(nodes, resolveKey = () => ({})) {
  return nodes.slice().sort((aItem, zItem) => {
    const a = resolveKey(aItem);
    const z = resolveKey(zItem);

    if (a === null || z === null)
      return 0;

    const position = a.compareDocumentPosition(z);

    if (position & Node.DOCUMENT_POSITION_FOLLOWING)
      return -1;
    if (position & Node.DOCUMENT_POSITION_PRECEDING)
      return 1;
    return 0;
  });
}
