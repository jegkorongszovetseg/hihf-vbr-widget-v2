export const useMainClass = (className) => {
  const prefix = import.meta.env.VITE_CSS_CLASS_PREFIX;
  return prefix + className;
};
