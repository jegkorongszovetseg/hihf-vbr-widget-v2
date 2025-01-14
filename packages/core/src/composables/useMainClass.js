export function useMainClass(className) {
  const prefix = import.meta.env.VITE_CSS_CLASS_PREFIX || 'mjsz-vbr-';
  return prefix + className;
}
