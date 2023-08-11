export function callFunctions() {
  for (const arg of arguments) {
    arg?.();
  }
}
