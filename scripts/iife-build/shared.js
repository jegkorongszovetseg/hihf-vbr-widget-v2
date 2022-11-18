export var foo = 1;

export function bar() {
  return foo; // try changing this to `foo++`
}

function baz() {
  return bar();
}

export { baz };
export * from './shared/index';
