var shared = function(exports) {
  "use strict";
  var qux = "QUX";
  var foo = 1;
  function bar() {
    return foo;
  }
  function baz() {
    return bar();
  }
  exports.bar = bar;
  exports.baz = baz;
  exports.foo = foo;
  exports.qux = qux;
  Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
  return exports;
}({});
