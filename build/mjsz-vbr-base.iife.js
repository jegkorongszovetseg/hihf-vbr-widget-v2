var base = function(exports, shared_js) {
  "use strict";
  const bBar = () => shared_js.bar();
  exports.bBar = bBar;
  Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
  return exports;
}({}, shared);
