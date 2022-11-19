var Widgets = function(exports, vue, _shared) {
  "use strict";
  var _a;
  const isClient = typeof window !== "undefined";
  const noop = () => {
  };
  isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
  function promiseTimeout(ms, throwOnTimeout = false, reason = "Timeout") {
    return new Promise((resolve, reject2) => {
      if (throwOnTimeout)
        setTimeout(() => reject2(reason), ms);
      else
        setTimeout(resolve, ms);
    });
  }
  function identity(arg) {
    return arg;
  }
  isClient ? window : void 0;
  isClient ? window.document : void 0;
  isClient ? window.navigator : void 0;
  isClient ? window.location : void 0;
  function useAsyncState(promise, initialState, options) {
    const {
      immediate = true,
      delay = 0,
      onError = noop,
      resetOnExecute = true,
      shallow = true,
      throwError
    } = options != null ? options : {};
    const state = shallow ? vue.shallowRef(initialState) : vue.ref(initialState);
    const isReady = vue.ref(false);
    const isLoading = vue.ref(false);
    const error = vue.ref(void 0);
    async function execute(delay2 = 0, ...args) {
      if (resetOnExecute)
        state.value = initialState;
      error.value = void 0;
      isReady.value = false;
      isLoading.value = true;
      if (delay2 > 0)
        await promiseTimeout(delay2);
      const _promise = typeof promise === "function" ? promise(...args) : promise;
      try {
        const data = await _promise;
        state.value = data;
        isReady.value = true;
      } catch (e) {
        error.value = e;
        onError(e);
        if (throwError)
          throw error;
      } finally {
        isLoading.value = false;
      }
      return state.value;
    }
    if (immediate)
      execute(delay);
    return {
      state,
      isReady,
      isLoading,
      error,
      execute
    };
  }
  const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  const globalKey = "__vueuse_ssr_handlers__";
  _global[globalKey] = _global[globalKey] || {};
  _global[globalKey];
  var SwipeDirection;
  (function(SwipeDirection2) {
    SwipeDirection2["UP"] = "UP";
    SwipeDirection2["RIGHT"] = "RIGHT";
    SwipeDirection2["DOWN"] = "DOWN";
    SwipeDirection2["LEFT"] = "LEFT";
    SwipeDirection2["NONE"] = "NONE";
  })(SwipeDirection || (SwipeDirection = {}));
  var __defProp = Object.defineProperty;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop2 in b || (b = {}))
      if (__hasOwnProp.call(b, prop2))
        __defNormalProp(a, prop2, b[prop2]);
    if (__getOwnPropSymbols)
      for (var prop2 of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop2))
          __defNormalProp(a, prop2, b[prop2]);
      }
    return a;
  };
  const _TransitionPresets = {
    easeInSine: [0.12, 0, 0.39, 0],
    easeOutSine: [0.61, 1, 0.88, 1],
    easeInOutSine: [0.37, 0, 0.63, 1],
    easeInQuad: [0.11, 0, 0.5, 0],
    easeOutQuad: [0.5, 1, 0.89, 1],
    easeInOutQuad: [0.45, 0, 0.55, 1],
    easeInCubic: [0.32, 0, 0.67, 0],
    easeOutCubic: [0.33, 1, 0.68, 1],
    easeInOutCubic: [0.65, 0, 0.35, 1],
    easeInQuart: [0.5, 0, 0.75, 0],
    easeOutQuart: [0.25, 1, 0.5, 1],
    easeInOutQuart: [0.76, 0, 0.24, 1],
    easeInQuint: [0.64, 0, 0.78, 0],
    easeOutQuint: [0.22, 1, 0.36, 1],
    easeInOutQuint: [0.83, 0, 0.17, 1],
    easeInExpo: [0.7, 0, 0.84, 0],
    easeOutExpo: [0.16, 1, 0.3, 1],
    easeInOutExpo: [0.87, 0, 0.13, 1],
    easeInCirc: [0.55, 0, 1, 0.45],
    easeOutCirc: [0, 0.55, 0.45, 1],
    easeInOutCirc: [0.85, 0, 0.15, 1],
    easeInBack: [0.36, 0, 0.66, -0.56],
    easeOutBack: [0.34, 1.56, 0.64, 1],
    easeInOutBack: [0.68, -0.6, 0.32, 1.6]
  };
  __spreadValues({
    linear: identity
  }, _TransitionPresets);
  function _isPlaceholder(a) {
    return a != null && typeof a === "object" && a["@@functional/placeholder"] === true;
  }
  function _curry1(fn) {
    return function f1(a) {
      if (arguments.length === 0 || _isPlaceholder(a)) {
        return f1;
      } else {
        return fn.apply(this, arguments);
      }
    };
  }
  function _curry2(fn) {
    return function f2(a, b) {
      switch (arguments.length) {
        case 0:
          return f2;
        case 1:
          return _isPlaceholder(a) ? f2 : _curry1(function(_b) {
            return fn(a, _b);
          });
        default:
          return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function(_a2) {
            return fn(_a2, b);
          }) : _isPlaceholder(b) ? _curry1(function(_b) {
            return fn(a, _b);
          }) : fn(a, b);
      }
    };
  }
  function _arity(n, fn) {
    switch (n) {
      case 0:
        return function() {
          return fn.apply(this, arguments);
        };
      case 1:
        return function(a0) {
          return fn.apply(this, arguments);
        };
      case 2:
        return function(a0, a1) {
          return fn.apply(this, arguments);
        };
      case 3:
        return function(a0, a1, a2) {
          return fn.apply(this, arguments);
        };
      case 4:
        return function(a0, a1, a2, a3) {
          return fn.apply(this, arguments);
        };
      case 5:
        return function(a0, a1, a2, a3, a4) {
          return fn.apply(this, arguments);
        };
      case 6:
        return function(a0, a1, a2, a3, a4, a5) {
          return fn.apply(this, arguments);
        };
      case 7:
        return function(a0, a1, a2, a3, a4, a5, a6) {
          return fn.apply(this, arguments);
        };
      case 8:
        return function(a0, a1, a2, a3, a4, a5, a6, a7) {
          return fn.apply(this, arguments);
        };
      case 9:
        return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
          return fn.apply(this, arguments);
        };
      case 10:
        return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
          return fn.apply(this, arguments);
        };
      default:
        throw new Error("First argument to _arity must be a non-negative integer no greater than ten");
    }
  }
  function _curryN(length, received, fn) {
    return function() {
      var combined = [];
      var argsIdx = 0;
      var left = length;
      var combinedIdx = 0;
      while (combinedIdx < received.length || argsIdx < arguments.length) {
        var result;
        if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
          result = received[combinedIdx];
        } else {
          result = arguments[argsIdx];
          argsIdx += 1;
        }
        combined[combinedIdx] = result;
        if (!_isPlaceholder(result)) {
          left -= 1;
        }
        combinedIdx += 1;
      }
      return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
    };
  }
  var curryN = /* @__PURE__ */ _curry2(function curryN2(length, fn) {
    if (length === 1) {
      return _curry1(fn);
    }
    return _arity(length, _curryN(length, [], fn));
  });
  const curryN$1 = curryN;
  function _curry3(fn) {
    return function f3(a, b, c) {
      switch (arguments.length) {
        case 0:
          return f3;
        case 1:
          return _isPlaceholder(a) ? f3 : _curry2(function(_b, _c) {
            return fn(a, _b, _c);
          });
        case 2:
          return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function(_a2, _c) {
            return fn(_a2, b, _c);
          }) : _isPlaceholder(b) ? _curry2(function(_b, _c) {
            return fn(a, _b, _c);
          }) : _curry1(function(_c) {
            return fn(a, b, _c);
          });
        default:
          return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function(_a2, _b) {
            return fn(_a2, _b, c);
          }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function(_a2, _c) {
            return fn(_a2, b, _c);
          }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function(_b, _c) {
            return fn(a, _b, _c);
          }) : _isPlaceholder(a) ? _curry1(function(_a2) {
            return fn(_a2, b, c);
          }) : _isPlaceholder(b) ? _curry1(function(_b) {
            return fn(a, _b, c);
          }) : _isPlaceholder(c) ? _curry1(function(_c) {
            return fn(a, b, _c);
          }) : fn(a, b, c);
      }
    };
  }
  const _isArray = Array.isArray || function _isArray2(val) {
    return val != null && val.length >= 0 && Object.prototype.toString.call(val) === "[object Array]";
  };
  function _isTransformer(obj) {
    return obj != null && typeof obj["@@transducer/step"] === "function";
  }
  function _dispatchable(methodNames, transducerCreator, fn) {
    return function() {
      if (arguments.length === 0) {
        return fn();
      }
      var obj = arguments[arguments.length - 1];
      if (!_isArray(obj)) {
        var idx = 0;
        while (idx < methodNames.length) {
          if (typeof obj[methodNames[idx]] === "function") {
            return obj[methodNames[idx]].apply(obj, Array.prototype.slice.call(arguments, 0, -1));
          }
          idx += 1;
        }
        if (_isTransformer(obj)) {
          var transducer = transducerCreator.apply(null, Array.prototype.slice.call(arguments, 0, -1));
          return transducer(obj);
        }
      }
      return fn.apply(this, arguments);
    };
  }
  function _reduced(x) {
    return x && x["@@transducer/reduced"] ? x : {
      "@@transducer/value": x,
      "@@transducer/reduced": true
    };
  }
  const _xfBase = {
    init: function() {
      return this.xf["@@transducer/init"]();
    },
    result: function(result) {
      return this.xf["@@transducer/result"](result);
    }
  };
  var max = /* @__PURE__ */ _curry2(function max2(a, b) {
    return b > a ? b : a;
  });
  const max$1 = max;
  function _map(fn, functor) {
    var idx = 0;
    var len = functor.length;
    var result = Array(len);
    while (idx < len) {
      result[idx] = fn(functor[idx]);
      idx += 1;
    }
    return result;
  }
  function _isString(x) {
    return Object.prototype.toString.call(x) === "[object String]";
  }
  var _isArrayLike = /* @__PURE__ */ _curry1(function isArrayLike(x) {
    if (_isArray(x)) {
      return true;
    }
    if (!x) {
      return false;
    }
    if (typeof x !== "object") {
      return false;
    }
    if (_isString(x)) {
      return false;
    }
    if (x.length === 0) {
      return true;
    }
    if (x.length > 0) {
      return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
    }
    return false;
  });
  const _isArrayLike$1 = _isArrayLike;
  var XWrap = /* @__PURE__ */ function() {
    function XWrap2(fn) {
      this.f = fn;
    }
    XWrap2.prototype["@@transducer/init"] = function() {
      throw new Error("init not implemented on XWrap");
    };
    XWrap2.prototype["@@transducer/result"] = function(acc) {
      return acc;
    };
    XWrap2.prototype["@@transducer/step"] = function(acc, x) {
      return this.f(acc, x);
    };
    return XWrap2;
  }();
  function _xwrap(fn) {
    return new XWrap(fn);
  }
  var bind = /* @__PURE__ */ _curry2(function bind2(fn, thisObj) {
    return _arity(fn.length, function() {
      return fn.apply(thisObj, arguments);
    });
  });
  const bind$1 = bind;
  function _arrayReduce(xf, acc, list) {
    var idx = 0;
    var len = list.length;
    while (idx < len) {
      acc = xf["@@transducer/step"](acc, list[idx]);
      if (acc && acc["@@transducer/reduced"]) {
        acc = acc["@@transducer/value"];
        break;
      }
      idx += 1;
    }
    return xf["@@transducer/result"](acc);
  }
  function _iterableReduce(xf, acc, iter) {
    var step = iter.next();
    while (!step.done) {
      acc = xf["@@transducer/step"](acc, step.value);
      if (acc && acc["@@transducer/reduced"]) {
        acc = acc["@@transducer/value"];
        break;
      }
      step = iter.next();
    }
    return xf["@@transducer/result"](acc);
  }
  function _methodReduce(xf, acc, obj, methodName) {
    return xf["@@transducer/result"](obj[methodName](bind$1(xf["@@transducer/step"], xf), acc));
  }
  var symIterator = typeof Symbol !== "undefined" ? Symbol.iterator : "@@iterator";
  function _reduce(fn, acc, list) {
    if (typeof fn === "function") {
      fn = _xwrap(fn);
    }
    if (_isArrayLike$1(list)) {
      return _arrayReduce(fn, acc, list);
    }
    if (typeof list["fantasy-land/reduce"] === "function") {
      return _methodReduce(fn, acc, list, "fantasy-land/reduce");
    }
    if (list[symIterator] != null) {
      return _iterableReduce(fn, acc, list[symIterator]());
    }
    if (typeof list.next === "function") {
      return _iterableReduce(fn, acc, list);
    }
    if (typeof list.reduce === "function") {
      return _methodReduce(fn, acc, list, "reduce");
    }
    throw new TypeError("reduce: list must be array or iterable");
  }
  var XMap = /* @__PURE__ */ function() {
    function XMap2(f, xf) {
      this.xf = xf;
      this.f = f;
    }
    XMap2.prototype["@@transducer/init"] = _xfBase.init;
    XMap2.prototype["@@transducer/result"] = _xfBase.result;
    XMap2.prototype["@@transducer/step"] = function(result, input) {
      return this.xf["@@transducer/step"](result, this.f(input));
    };
    return XMap2;
  }();
  var _xmap = /* @__PURE__ */ _curry2(function _xmap2(f, xf) {
    return new XMap(f, xf);
  });
  const _xmap$1 = _xmap;
  function _has(prop2, obj) {
    return Object.prototype.hasOwnProperty.call(obj, prop2);
  }
  var toString$2 = Object.prototype.toString;
  var _isArguments = /* @__PURE__ */ function() {
    return toString$2.call(arguments) === "[object Arguments]" ? function _isArguments2(x) {
      return toString$2.call(x) === "[object Arguments]";
    } : function _isArguments2(x) {
      return _has("callee", x);
    };
  }();
  const _isArguments$1 = _isArguments;
  var hasEnumBug = !/* @__PURE__ */ {
    toString: null
  }.propertyIsEnumerable("toString");
  var nonEnumerableProps = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
  var hasArgsEnumBug = /* @__PURE__ */ function() {
    return arguments.propertyIsEnumerable("length");
  }();
  var contains = function contains2(list, item) {
    var idx = 0;
    while (idx < list.length) {
      if (list[idx] === item) {
        return true;
      }
      idx += 1;
    }
    return false;
  };
  var keys = typeof Object.keys === "function" && !hasArgsEnumBug ? /* @__PURE__ */ _curry1(function keys2(obj) {
    return Object(obj) !== obj ? [] : Object.keys(obj);
  }) : /* @__PURE__ */ _curry1(function keys2(obj) {
    if (Object(obj) !== obj) {
      return [];
    }
    var prop2, nIdx;
    var ks = [];
    var checkArgsLength = hasArgsEnumBug && _isArguments$1(obj);
    for (prop2 in obj) {
      if (_has(prop2, obj) && (!checkArgsLength || prop2 !== "length")) {
        ks[ks.length] = prop2;
      }
    }
    if (hasEnumBug) {
      nIdx = nonEnumerableProps.length - 1;
      while (nIdx >= 0) {
        prop2 = nonEnumerableProps[nIdx];
        if (_has(prop2, obj) && !contains(ks, prop2)) {
          ks[ks.length] = prop2;
        }
        nIdx -= 1;
      }
    }
    return ks;
  });
  const keys$1 = keys;
  var map = /* @__PURE__ */ _curry2(
    /* @__PURE__ */ _dispatchable(["fantasy-land/map", "map"], _xmap$1, function map2(fn, functor) {
      switch (Object.prototype.toString.call(functor)) {
        case "[object Function]":
          return curryN$1(functor.length, function() {
            return fn.call(this, functor.apply(this, arguments));
          });
        case "[object Object]":
          return _reduce(function(acc, key) {
            acc[key] = fn(functor[key]);
            return acc;
          }, {}, keys$1(functor));
        default:
          return _map(fn, functor);
      }
    })
  );
  const map$1 = map;
  const _isInteger = Number.isInteger || function _isInteger2(n) {
    return n << 0 === n;
  };
  var nth = /* @__PURE__ */ _curry2(function nth2(offset, list) {
    var idx = offset < 0 ? list.length + offset : offset;
    return _isString(list) ? list.charAt(idx) : list[idx];
  });
  const nth$1 = nth;
  var prop = /* @__PURE__ */ _curry2(function prop2(p, obj) {
    if (obj == null) {
      return;
    }
    return _isInteger(p) ? nth$1(p, obj) : obj[p];
  });
  const prop$1 = prop;
  var pluck = /* @__PURE__ */ _curry2(function pluck2(p, list) {
    return map$1(prop$1(p), list);
  });
  const pluck$1 = pluck;
  var reduce = /* @__PURE__ */ _curry3(_reduce);
  const reduce$1 = reduce;
  var always = /* @__PURE__ */ _curry1(function always2(val) {
    return function() {
      return val;
    };
  });
  const always$1 = always;
  var anyPass = /* @__PURE__ */ _curry1(function anyPass2(preds) {
    return curryN$1(reduce$1(max$1, 0, pluck$1("length", preds)), function() {
      var idx = 0;
      var len = preds.length;
      while (idx < len) {
        if (preds[idx].apply(this, arguments)) {
          return true;
        }
        idx += 1;
      }
      return false;
    });
  });
  const anyPass$1 = anyPass;
  var ascend = /* @__PURE__ */ _curry3(function ascend2(fn, a, b) {
    var aa = fn(a);
    var bb = fn(b);
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });
  const ascend$1 = ascend;
  function _isFunction(x) {
    var type2 = Object.prototype.toString.call(x);
    return type2 === "[object Function]" || type2 === "[object AsyncFunction]" || type2 === "[object GeneratorFunction]" || type2 === "[object AsyncGeneratorFunction]";
  }
  function _cloneRegExp(pattern) {
    return new RegExp(pattern.source, (pattern.global ? "g" : "") + (pattern.ignoreCase ? "i" : "") + (pattern.multiline ? "m" : "") + (pattern.sticky ? "y" : "") + (pattern.unicode ? "u" : ""));
  }
  var type = /* @__PURE__ */ _curry1(function type2(val) {
    return val === null ? "Null" : val === void 0 ? "Undefined" : Object.prototype.toString.call(val).slice(8, -1);
  });
  const type$1 = type;
  function _clone(value, refFrom, refTo, deep) {
    var copy = function copy2(copiedValue) {
      var len = refFrom.length;
      var idx = 0;
      while (idx < len) {
        if (value === refFrom[idx]) {
          return refTo[idx];
        }
        idx += 1;
      }
      refFrom[idx] = value;
      refTo[idx] = copiedValue;
      for (var key in value) {
        if (value.hasOwnProperty(key)) {
          copiedValue[key] = deep ? _clone(value[key], refFrom, refTo, true) : value[key];
        }
      }
      return copiedValue;
    };
    switch (type$1(value)) {
      case "Object":
        return copy(Object.create(Object.getPrototypeOf(value)));
      case "Array":
        return copy([]);
      case "Date":
        return new Date(value.valueOf());
      case "RegExp":
        return _cloneRegExp(value);
      case "Int8Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Int16Array":
      case "Uint16Array":
      case "Int32Array":
      case "Uint32Array":
      case "Float32Array":
      case "Float64Array":
      case "BigInt64Array":
      case "BigUint64Array":
        return value.slice();
      default:
        return value;
    }
  }
  function _pipe(f, g) {
    return function() {
      return g.call(this, f.apply(this, arguments));
    };
  }
  function _checkForMethod(methodname, fn) {
    return function() {
      var length = arguments.length;
      if (length === 0) {
        return fn();
      }
      var obj = arguments[length - 1];
      return _isArray(obj) || typeof obj[methodname] !== "function" ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
    };
  }
  var slice = /* @__PURE__ */ _curry3(
    /* @__PURE__ */ _checkForMethod("slice", function slice2(fromIndex, toIndex, list) {
      return Array.prototype.slice.call(list, fromIndex, toIndex);
    })
  );
  const slice$1 = slice;
  var tail = /* @__PURE__ */ _curry1(
    /* @__PURE__ */ _checkForMethod(
      "tail",
      /* @__PURE__ */ slice$1(1, Infinity)
    )
  );
  const tail$1 = tail;
  function pipe() {
    if (arguments.length === 0) {
      throw new Error("pipe requires at least one argument");
    }
    return _arity(arguments[0].length, reduce$1(_pipe, arguments[0], tail$1(arguments)));
  }
  var reverse = /* @__PURE__ */ _curry1(function reverse2(list) {
    return _isString(list) ? list.split("").reverse().join("") : Array.prototype.slice.call(list, 0).reverse();
  });
  const reverse$1 = reverse;
  function compose() {
    if (arguments.length === 0) {
      throw new Error("compose requires at least one argument");
    }
    return pipe.apply(this, reverse$1(arguments));
  }
  function _arrayFromIterator(iter) {
    var list = [];
    var next;
    while (!(next = iter.next()).done) {
      list.push(next.value);
    }
    return list;
  }
  function _includesWith(pred, x, list) {
    var idx = 0;
    var len = list.length;
    while (idx < len) {
      if (pred(x, list[idx])) {
        return true;
      }
      idx += 1;
    }
    return false;
  }
  function _functionName(f) {
    var match = String(f).match(/^function (\w*)/);
    return match == null ? "" : match[1];
  }
  function _objectIs(a, b) {
    if (a === b) {
      return a !== 0 || 1 / a === 1 / b;
    } else {
      return a !== a && b !== b;
    }
  }
  const _objectIs$1 = typeof Object.is === "function" ? Object.is : _objectIs;
  function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
    var a = _arrayFromIterator(aIterator);
    var b = _arrayFromIterator(bIterator);
    function eq(_a2, _b) {
      return _equals(_a2, _b, stackA.slice(), stackB.slice());
    }
    return !_includesWith(function(b2, aItem) {
      return !_includesWith(eq, aItem, b2);
    }, b, a);
  }
  function _equals(a, b, stackA, stackB) {
    if (_objectIs$1(a, b)) {
      return true;
    }
    var typeA = type$1(a);
    if (typeA !== type$1(b)) {
      return false;
    }
    if (typeof a["fantasy-land/equals"] === "function" || typeof b["fantasy-land/equals"] === "function") {
      return typeof a["fantasy-land/equals"] === "function" && a["fantasy-land/equals"](b) && typeof b["fantasy-land/equals"] === "function" && b["fantasy-land/equals"](a);
    }
    if (typeof a.equals === "function" || typeof b.equals === "function") {
      return typeof a.equals === "function" && a.equals(b) && typeof b.equals === "function" && b.equals(a);
    }
    switch (typeA) {
      case "Arguments":
      case "Array":
      case "Object":
        if (typeof a.constructor === "function" && _functionName(a.constructor) === "Promise") {
          return a === b;
        }
        break;
      case "Boolean":
      case "Number":
      case "String":
        if (!(typeof a === typeof b && _objectIs$1(a.valueOf(), b.valueOf()))) {
          return false;
        }
        break;
      case "Date":
        if (!_objectIs$1(a.valueOf(), b.valueOf())) {
          return false;
        }
        break;
      case "Error":
        return a.name === b.name && a.message === b.message;
      case "RegExp":
        if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
          return false;
        }
        break;
    }
    var idx = stackA.length - 1;
    while (idx >= 0) {
      if (stackA[idx] === a) {
        return stackB[idx] === b;
      }
      idx -= 1;
    }
    switch (typeA) {
      case "Map":
        if (a.size !== b.size) {
          return false;
        }
        return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));
      case "Set":
        if (a.size !== b.size) {
          return false;
        }
        return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));
      case "Arguments":
      case "Array":
      case "Object":
      case "Boolean":
      case "Number":
      case "String":
      case "Date":
      case "Error":
      case "RegExp":
      case "Int8Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Int16Array":
      case "Uint16Array":
      case "Int32Array":
      case "Uint32Array":
      case "Float32Array":
      case "Float64Array":
      case "ArrayBuffer":
        break;
      default:
        return false;
    }
    var keysA = keys$1(a);
    if (keysA.length !== keys$1(b).length) {
      return false;
    }
    var extendedStackA = stackA.concat([a]);
    var extendedStackB = stackB.concat([b]);
    idx = keysA.length - 1;
    while (idx >= 0) {
      var key = keysA[idx];
      if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
        return false;
      }
      idx -= 1;
    }
    return true;
  }
  var equals = /* @__PURE__ */ _curry2(function equals2(a, b) {
    return _equals(a, b, [], []);
  });
  const equals$1 = equals;
  function _indexOf(list, a, idx) {
    var inf, item;
    if (typeof list.indexOf === "function") {
      switch (typeof a) {
        case "number":
          if (a === 0) {
            inf = 1 / a;
            while (idx < list.length) {
              item = list[idx];
              if (item === 0 && 1 / item === inf) {
                return idx;
              }
              idx += 1;
            }
            return -1;
          } else if (a !== a) {
            while (idx < list.length) {
              item = list[idx];
              if (typeof item === "number" && item !== item) {
                return idx;
              }
              idx += 1;
            }
            return -1;
          }
          return list.indexOf(a, idx);
        case "string":
        case "boolean":
        case "function":
        case "undefined":
          return list.indexOf(a, idx);
        case "object":
          if (a === null) {
            return list.indexOf(a, idx);
          }
      }
    }
    while (idx < list.length) {
      if (equals$1(list[idx], a)) {
        return idx;
      }
      idx += 1;
    }
    return -1;
  }
  function _includes(a, list) {
    return _indexOf(list, a, 0) >= 0;
  }
  function _quote(s) {
    var escaped = s.replace(/\\/g, "\\\\").replace(/[\b]/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\v/g, "\\v").replace(/\0/g, "\\0");
    return '"' + escaped.replace(/"/g, '\\"') + '"';
  }
  var pad = function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  };
  var _toISOString = typeof Date.prototype.toISOString === "function" ? function _toISOString2(d) {
    return d.toISOString();
  } : function _toISOString2(d) {
    return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "." + (d.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z";
  };
  const _toISOString$1 = _toISOString;
  function _complement(f) {
    return function() {
      return !f.apply(this, arguments);
    };
  }
  function _filter(fn, list) {
    var idx = 0;
    var len = list.length;
    var result = [];
    while (idx < len) {
      if (fn(list[idx])) {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
    return result;
  }
  function _isObject(x) {
    return Object.prototype.toString.call(x) === "[object Object]";
  }
  var XFilter = /* @__PURE__ */ function() {
    function XFilter2(f, xf) {
      this.xf = xf;
      this.f = f;
    }
    XFilter2.prototype["@@transducer/init"] = _xfBase.init;
    XFilter2.prototype["@@transducer/result"] = _xfBase.result;
    XFilter2.prototype["@@transducer/step"] = function(result, input) {
      return this.f(input) ? this.xf["@@transducer/step"](result, input) : result;
    };
    return XFilter2;
  }();
  var _xfilter = /* @__PURE__ */ _curry2(function _xfilter2(f, xf) {
    return new XFilter(f, xf);
  });
  const _xfilter$1 = _xfilter;
  var filter = /* @__PURE__ */ _curry2(
    /* @__PURE__ */ _dispatchable(["fantasy-land/filter", "filter"], _xfilter$1, function(pred, filterable) {
      return _isObject(filterable) ? _reduce(function(acc, key) {
        if (pred(filterable[key])) {
          acc[key] = filterable[key];
        }
        return acc;
      }, {}, keys$1(filterable)) : _filter(pred, filterable);
    })
  );
  const filter$1 = filter;
  var reject = /* @__PURE__ */ _curry2(function reject2(pred, filterable) {
    return filter$1(_complement(pred), filterable);
  });
  const reject$1 = reject;
  function _toString(x, seen) {
    var recur = function recur2(y) {
      var xs = seen.concat([x]);
      return _includes(y, xs) ? "<Circular>" : _toString(y, xs);
    };
    var mapPairs = function(obj, keys2) {
      return _map(function(k) {
        return _quote(k) + ": " + recur(obj[k]);
      }, keys2.slice().sort());
    };
    switch (Object.prototype.toString.call(x)) {
      case "[object Arguments]":
        return "(function() { return arguments; }(" + _map(recur, x).join(", ") + "))";
      case "[object Array]":
        return "[" + _map(recur, x).concat(mapPairs(x, reject$1(function(k) {
          return /^\d+$/.test(k);
        }, keys$1(x)))).join(", ") + "]";
      case "[object Boolean]":
        return typeof x === "object" ? "new Boolean(" + recur(x.valueOf()) + ")" : x.toString();
      case "[object Date]":
        return "new Date(" + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString$1(x))) + ")";
      case "[object Null]":
        return "null";
      case "[object Number]":
        return typeof x === "object" ? "new Number(" + recur(x.valueOf()) + ")" : 1 / x === -Infinity ? "-0" : x.toString(10);
      case "[object String]":
        return typeof x === "object" ? "new String(" + recur(x.valueOf()) + ")" : _quote(x);
      case "[object Undefined]":
        return "undefined";
      default:
        if (typeof x.toString === "function") {
          var repr = x.toString();
          if (repr !== "[object Object]") {
            return repr;
          }
        }
        return "{" + mapPairs(x, keys$1(x)).join(", ") + "}";
    }
  }
  var toString = /* @__PURE__ */ _curry1(function toString2(val) {
    return _toString(val, []);
  });
  const toString$1 = toString;
  var XReduceBy = /* @__PURE__ */ function() {
    function XReduceBy2(valueFn, valueAcc, keyFn, xf) {
      this.valueFn = valueFn;
      this.valueAcc = valueAcc;
      this.keyFn = keyFn;
      this.xf = xf;
      this.inputs = {};
    }
    XReduceBy2.prototype["@@transducer/init"] = _xfBase.init;
    XReduceBy2.prototype["@@transducer/result"] = function(result) {
      var key;
      for (key in this.inputs) {
        if (_has(key, this.inputs)) {
          result = this.xf["@@transducer/step"](result, this.inputs[key]);
          if (result["@@transducer/reduced"]) {
            result = result["@@transducer/value"];
            break;
          }
        }
      }
      this.inputs = null;
      return this.xf["@@transducer/result"](result);
    };
    XReduceBy2.prototype["@@transducer/step"] = function(result, input) {
      var key = this.keyFn(input);
      this.inputs[key] = this.inputs[key] || [key, this.valueAcc];
      this.inputs[key][1] = this.valueFn(this.inputs[key][1], input);
      return result;
    };
    return XReduceBy2;
  }();
  var _xreduceBy = /* @__PURE__ */ _curryN(4, [], function _xreduceBy2(valueFn, valueAcc, keyFn, xf) {
    return new XReduceBy(valueFn, valueAcc, keyFn, xf);
  });
  const _xreduceBy$1 = _xreduceBy;
  var reduceBy = /* @__PURE__ */ _curryN(
    4,
    [],
    /* @__PURE__ */ _dispatchable([], _xreduceBy$1, function reduceBy2(valueFn, valueAcc, keyFn, list) {
      return _reduce(function(acc, elt) {
        var key = keyFn(elt);
        var value = valueFn(_has(key, acc) ? acc[key] : _clone(valueAcc, [], [], false), elt);
        if (value && value["@@transducer/reduced"]) {
          return _reduced(acc);
        }
        acc[key] = value;
        return acc;
      }, {}, list);
    })
  );
  const reduceBy$1 = reduceBy;
  var descend = /* @__PURE__ */ _curry3(function descend2(fn, a, b) {
    var aa = fn(a);
    var bb = fn(b);
    return aa > bb ? -1 : aa < bb ? 1 : 0;
  });
  const descend$1 = descend;
  var groupBy = /* @__PURE__ */ _curry2(
    /* @__PURE__ */ _checkForMethod(
      "groupBy",
      /* @__PURE__ */ reduceBy$1(function(acc, item) {
        acc.push(item);
        return acc;
      }, [])
    )
  );
  const groupBy$1 = groupBy;
  var ifElse = /* @__PURE__ */ _curry3(function ifElse2(condition, onTrue, onFalse) {
    return curryN$1(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
      return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
    });
  });
  const ifElse$1 = ifElse;
  var includes = /* @__PURE__ */ _curry2(_includes);
  const includes$1 = includes;
  var invoker = /* @__PURE__ */ _curry2(function invoker2(arity, method) {
    return curryN$1(arity + 1, function() {
      var target = arguments[arity];
      if (target != null && _isFunction(target[method])) {
        return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
      }
      throw new TypeError(toString$1(target) + ' does not have a method named "' + method + '"');
    });
  });
  const invoker$1 = invoker;
  var propEq = /* @__PURE__ */ _curry3(function propEq2(name, val, obj) {
    return equals$1(val, prop$1(name, obj));
  });
  const propEq$1 = propEq;
  var sortWith = /* @__PURE__ */ _curry2(function sortWith2(fns, list) {
    return Array.prototype.slice.call(list, 0).sort(function(a, b) {
      var result = 0;
      var i = 0;
      while (result === 0 && i < fns.length) {
        result = fns[i](a, b);
        i += 1;
      }
      return result;
    });
  });
  const sortWith$1 = sortWith;
  var toLower = /* @__PURE__ */ invoker$1(0, "toLowerCase");
  const toLower$1 = toLower;
  const DEFAULT_EXTERNAL_TEAM_URL = "https://www.ersteliga.hu/stats/teams#/team/3314/21096?name=";
  const SORT_STATE_ORIGINAL = "original";
  const SORT_STATE_DESCEND = "descend";
  const SORT_STATE_ASCEND = "ascend";
  (/* @__PURE__ */ new Map()).set("hu", "hu-hu").set("en", "hu-gb");
  (/* @__PURE__ */ new Map()).set("Europe/Budapest", { countryLabelKey: "hungary", timezone: "Europe/Budapest" }).set("Europe/Bucharest", { countryLabelKey: "romania", timezone: "Europe/Bucharest" });
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  var dayjs_min = { exports: {} };
  (function(module, exports2) {
    !function(t, e) {
      module.exports = e();
    }(commonjsGlobal, function() {
      var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", f = "month", h = "quarter", c = "year", d = "date", $ = "Invalid Date", l = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, m = function(t2, e2, n2) {
        var r2 = String(t2);
        return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
      }, g = { s: m, z: function(t2) {
        var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
        return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
      }, m: function t2(e2, n2) {
        if (e2.date() < n2.date())
          return -t2(n2, e2);
        var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, f), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), f);
        return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
      }, a: function(t2) {
        return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
      }, p: function(t2) {
        return { M: f, y: c, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: h }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t2) {
        return void 0 === t2;
      } }, v = "en", D = {};
      D[v] = M;
      var p = function(t2) {
        return t2 instanceof _;
      }, S = function t2(e2, n2, r2) {
        var i2;
        if (!e2)
          return v;
        if ("string" == typeof e2) {
          var s2 = e2.toLowerCase();
          D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
          var u2 = e2.split("-");
          if (!i2 && u2.length > 1)
            return t2(u2[0]);
        } else {
          var a2 = e2.name;
          D[a2] = e2, i2 = a2;
        }
        return !r2 && i2 && (v = i2), i2 || !r2 && v;
      }, w = function(t2, e2) {
        if (p(t2))
          return t2.clone();
        var n2 = "object" == typeof e2 ? e2 : {};
        return n2.date = t2, n2.args = arguments, new _(n2);
      }, O = g;
      O.l = S, O.i = p, O.w = function(t2, e2) {
        return w(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
      };
      var _ = function() {
        function M2(t2) {
          this.$L = S(t2.locale, null, true), this.parse(t2);
        }
        var m2 = M2.prototype;
        return m2.parse = function(t2) {
          this.$d = function(t3) {
            var e2 = t3.date, n2 = t3.utc;
            if (null === e2)
              return new Date(NaN);
            if (O.u(e2))
              return new Date();
            if (e2 instanceof Date)
              return new Date(e2);
            if ("string" == typeof e2 && !/Z$/i.test(e2)) {
              var r2 = e2.match(l);
              if (r2) {
                var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
              }
            }
            return new Date(e2);
          }(t2), this.$x = t2.x || {}, this.init();
        }, m2.init = function() {
          var t2 = this.$d;
          this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
        }, m2.$utils = function() {
          return O;
        }, m2.isValid = function() {
          return !(this.$d.toString() === $);
        }, m2.isSame = function(t2, e2) {
          var n2 = w(t2);
          return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
        }, m2.isAfter = function(t2, e2) {
          return w(t2) < this.startOf(e2);
        }, m2.isBefore = function(t2, e2) {
          return this.endOf(e2) < w(t2);
        }, m2.$g = function(t2, e2, n2) {
          return O.u(t2) ? this[e2] : this.set(n2, t2);
        }, m2.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m2.valueOf = function() {
          return this.$d.getTime();
        }, m2.startOf = function(t2, e2) {
          var n2 = this, r2 = !!O.u(e2) || e2, h2 = O.p(t2), $2 = function(t3, e3) {
            var i2 = O.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
            return r2 ? i2 : i2.endOf(a);
          }, l2 = function(t3, e3) {
            return O.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
          }, y2 = this.$W, M3 = this.$M, m3 = this.$D, g2 = "set" + (this.$u ? "UTC" : "");
          switch (h2) {
            case c:
              return r2 ? $2(1, 0) : $2(31, 11);
            case f:
              return r2 ? $2(1, M3) : $2(0, M3 + 1);
            case o:
              var v2 = this.$locale().weekStart || 0, D2 = (y2 < v2 ? y2 + 7 : y2) - v2;
              return $2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
            case a:
            case d:
              return l2(g2 + "Hours", 0);
            case u:
              return l2(g2 + "Minutes", 1);
            case s:
              return l2(g2 + "Seconds", 2);
            case i:
              return l2(g2 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m2.endOf = function(t2) {
          return this.startOf(t2, false);
        }, m2.$set = function(t2, e2) {
          var n2, o2 = O.p(t2), h2 = "set" + (this.$u ? "UTC" : ""), $2 = (n2 = {}, n2[a] = h2 + "Date", n2[d] = h2 + "Date", n2[f] = h2 + "Month", n2[c] = h2 + "FullYear", n2[u] = h2 + "Hours", n2[s] = h2 + "Minutes", n2[i] = h2 + "Seconds", n2[r] = h2 + "Milliseconds", n2)[o2], l2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
          if (o2 === f || o2 === c) {
            var y2 = this.clone().set(d, 1);
            y2.$d[$2](l2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
          } else
            $2 && this.$d[$2](l2);
          return this.init(), this;
        }, m2.set = function(t2, e2) {
          return this.clone().$set(t2, e2);
        }, m2.get = function(t2) {
          return this[O.p(t2)]();
        }, m2.add = function(r2, h2) {
          var d2, $2 = this;
          r2 = Number(r2);
          var l2 = O.p(h2), y2 = function(t2) {
            var e2 = w($2);
            return O.w(e2.date(e2.date() + Math.round(t2 * r2)), $2);
          };
          if (l2 === f)
            return this.set(f, this.$M + r2);
          if (l2 === c)
            return this.set(c, this.$y + r2);
          if (l2 === a)
            return y2(1);
          if (l2 === o)
            return y2(7);
          var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[l2] || 1, m3 = this.$d.getTime() + r2 * M3;
          return O.w(m3, this);
        }, m2.subtract = function(t2, e2) {
          return this.add(-1 * t2, e2);
        }, m2.format = function(t2) {
          var e2 = this, n2 = this.$locale();
          if (!this.isValid())
            return n2.invalidDate || $;
          var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = O.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, f2 = n2.months, h2 = function(t3, n3, i3, s3) {
            return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
          }, c2 = function(t3) {
            return O.s(s2 % 12 || 12, t3, "0");
          }, d2 = n2.meridiem || function(t3, e3, n3) {
            var r3 = t3 < 12 ? "AM" : "PM";
            return n3 ? r3.toLowerCase() : r3;
          }, l2 = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: a2 + 1, MM: O.s(a2 + 1, 2, "0"), MMM: h2(n2.monthsShort, a2, f2, 3), MMMM: h2(f2, a2), D: this.$D, DD: O.s(this.$D, 2, "0"), d: String(this.$W), dd: h2(n2.weekdaysMin, this.$W, o2, 2), ddd: h2(n2.weekdaysShort, this.$W, o2, 3), dddd: o2[this.$W], H: String(s2), HH: O.s(s2, 2, "0"), h: c2(1), hh: c2(2), a: d2(s2, u2, true), A: d2(s2, u2, false), m: String(u2), mm: O.s(u2, 2, "0"), s: String(this.$s), ss: O.s(this.$s, 2, "0"), SSS: O.s(this.$ms, 3, "0"), Z: i2 };
          return r2.replace(y, function(t3, e3) {
            return e3 || l2[t3] || i2.replace(":", "");
          });
        }, m2.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m2.diff = function(r2, d2, $2) {
          var l2, y2 = O.p(d2), M3 = w(r2), m3 = (M3.utcOffset() - this.utcOffset()) * e, g2 = this - M3, v2 = O.m(this, M3);
          return v2 = (l2 = {}, l2[c] = v2 / 12, l2[f] = v2, l2[h] = v2 / 3, l2[o] = (g2 - m3) / 6048e5, l2[a] = (g2 - m3) / 864e5, l2[u] = g2 / n, l2[s] = g2 / e, l2[i] = g2 / t, l2)[y2] || g2, $2 ? v2 : O.a(v2);
        }, m2.daysInMonth = function() {
          return this.endOf(f).$D;
        }, m2.$locale = function() {
          return D[this.$L];
        }, m2.locale = function(t2, e2) {
          if (!t2)
            return this.$L;
          var n2 = this.clone(), r2 = S(t2, e2, true);
          return r2 && (n2.$L = r2), n2;
        }, m2.clone = function() {
          return O.w(this.$d, this);
        }, m2.toDate = function() {
          return new Date(this.valueOf());
        }, m2.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m2.toISOString = function() {
          return this.$d.toISOString();
        }, m2.toString = function() {
          return this.$d.toUTCString();
        }, M2;
      }(), T = _.prototype;
      return w.prototype = T, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", f], ["$y", c], ["$D", d]].forEach(function(t2) {
        T[t2[1]] = function(e2) {
          return this.$g(e2, t2[0], t2[1]);
        };
      }), w.extend = function(t2, e2) {
        return t2.$i || (t2(e2, _, w), t2.$i = true), w;
      }, w.locale = S, w.isDayjs = p, w.unix = function(t2) {
        return w(1e3 * t2);
      }, w.en = D[v], w.Ls = D, w.p = {}, w;
    });
  })(dayjs_min);
  const dayjs = dayjs_min.exports;
  var utc$1 = { exports: {} };
  (function(module, exports2) {
    !function(t, i) {
      module.exports = i();
    }(commonjsGlobal, function() {
      var t = "minute", i = /[+-]\d\d(?::?\d\d)?/g, e = /([+-]|\d\d)/g;
      return function(s, f, n) {
        var u = f.prototype;
        n.utc = function(t2) {
          var i2 = { date: t2, utc: true, args: arguments };
          return new f(i2);
        }, u.utc = function(i2) {
          var e2 = n(this.toDate(), { locale: this.$L, utc: true });
          return i2 ? e2.add(this.utcOffset(), t) : e2;
        }, u.local = function() {
          return n(this.toDate(), { locale: this.$L, utc: false });
        };
        var o = u.parse;
        u.parse = function(t2) {
          t2.utc && (this.$u = true), this.$utils().u(t2.$offset) || (this.$offset = t2.$offset), o.call(this, t2);
        };
        var r = u.init;
        u.init = function() {
          if (this.$u) {
            var t2 = this.$d;
            this.$y = t2.getUTCFullYear(), this.$M = t2.getUTCMonth(), this.$D = t2.getUTCDate(), this.$W = t2.getUTCDay(), this.$H = t2.getUTCHours(), this.$m = t2.getUTCMinutes(), this.$s = t2.getUTCSeconds(), this.$ms = t2.getUTCMilliseconds();
          } else
            r.call(this);
        };
        var a = u.utcOffset;
        u.utcOffset = function(s2, f2) {
          var n2 = this.$utils().u;
          if (n2(s2))
            return this.$u ? 0 : n2(this.$offset) ? a.call(this) : this.$offset;
          if ("string" == typeof s2 && (s2 = function(t2) {
            void 0 === t2 && (t2 = "");
            var s3 = t2.match(i);
            if (!s3)
              return null;
            var f3 = ("" + s3[0]).match(e) || ["-", 0, 0], n3 = f3[0], u3 = 60 * +f3[1] + +f3[2];
            return 0 === u3 ? 0 : "+" === n3 ? u3 : -u3;
          }(s2), null === s2))
            return this;
          var u2 = Math.abs(s2) <= 16 ? 60 * s2 : s2, o2 = this;
          if (f2)
            return o2.$offset = u2, o2.$u = 0 === s2, o2;
          if (0 !== s2) {
            var r2 = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
            (o2 = this.local().add(u2 + r2, t)).$offset = u2, o2.$x.$localOffset = r2;
          } else
            o2 = this.utc();
          return o2;
        };
        var h = u.format;
        u.format = function(t2) {
          var i2 = t2 || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
          return h.call(this, i2);
        }, u.valueOf = function() {
          var t2 = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
          return this.$d.valueOf() - 6e4 * t2;
        }, u.isUTC = function() {
          return !!this.$u;
        }, u.toISOString = function() {
          return this.toDate().toISOString();
        }, u.toString = function() {
          return this.toDate().toUTCString();
        };
        var l = u.toDate;
        u.toDate = function(t2) {
          return "s" === t2 && this.$offset ? n(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : l.call(this);
        };
        var c = u.diff;
        u.diff = function(t2, i2, e2) {
          if (t2 && this.$u === t2.$u)
            return c.call(this, t2, i2, e2);
          var s2 = this.local(), f2 = n(t2).local();
          return c.call(s2, f2, i2, e2);
        };
      };
    });
  })(utc$1);
  const utc = utc$1.exports;
  var timezone$1 = { exports: {} };
  (function(module, exports2) {
    !function(t, e) {
      module.exports = e();
    }(commonjsGlobal, function() {
      var t = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, e = {};
      return function(n, i, o) {
        var r, a = function(t2, n2, i2) {
          void 0 === i2 && (i2 = {});
          var o2 = new Date(t2), r2 = function(t3, n3) {
            void 0 === n3 && (n3 = {});
            var i3 = n3.timeZoneName || "short", o3 = t3 + "|" + i3, r3 = e[o3];
            return r3 || (r3 = new Intl.DateTimeFormat("en-US", { hour12: false, timeZone: t3, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: i3 }), e[o3] = r3), r3;
          }(n2, i2);
          return r2.formatToParts(o2);
        }, u = function(e2, n2) {
          for (var i2 = a(e2, n2), r2 = [], u2 = 0; u2 < i2.length; u2 += 1) {
            var f2 = i2[u2], s2 = f2.type, m = f2.value, c = t[s2];
            c >= 0 && (r2[c] = parseInt(m, 10));
          }
          var d = r2[3], l = 24 === d ? 0 : d, v = r2[0] + "-" + r2[1] + "-" + r2[2] + " " + l + ":" + r2[4] + ":" + r2[5] + ":000", h = +e2;
          return (o.utc(v).valueOf() - (h -= h % 1e3)) / 6e4;
        }, f = i.prototype;
        f.tz = function(t2, e2) {
          void 0 === t2 && (t2 = r);
          var n2 = this.utcOffset(), i2 = this.toDate(), a2 = i2.toLocaleString("en-US", { timeZone: t2 }), u2 = Math.round((i2 - new Date(a2)) / 1e3 / 60), f2 = o(a2).$set("millisecond", this.$ms).utcOffset(15 * -Math.round(i2.getTimezoneOffset() / 15) - u2, true);
          if (e2) {
            var s2 = f2.utcOffset();
            f2 = f2.add(n2 - s2, "minute");
          }
          return f2.$x.$timezone = t2, f2;
        }, f.offsetName = function(t2) {
          var e2 = this.$x.$timezone || o.tz.guess(), n2 = a(this.valueOf(), e2, { timeZoneName: t2 }).find(function(t3) {
            return "timezonename" === t3.type.toLowerCase();
          });
          return n2 && n2.value;
        };
        var s = f.startOf;
        f.startOf = function(t2, e2) {
          if (!this.$x || !this.$x.$timezone)
            return s.call(this, t2, e2);
          var n2 = o(this.format("YYYY-MM-DD HH:mm:ss:SSS"));
          return s.call(n2, t2, e2).tz(this.$x.$timezone, true);
        }, o.tz = function(t2, e2, n2) {
          var i2 = n2 && e2, a2 = n2 || e2 || r, f2 = u(+o(), a2);
          if ("string" != typeof t2)
            return o(t2).tz(a2);
          var s2 = function(t3, e3, n3) {
            var i3 = t3 - 60 * e3 * 1e3, o2 = u(i3, n3);
            if (e3 === o2)
              return [i3, e3];
            var r2 = u(i3 -= 60 * (o2 - e3) * 1e3, n3);
            return o2 === r2 ? [i3, o2] : [t3 - 60 * Math.min(o2, r2) * 1e3, Math.max(o2, r2)];
          }(o.utc(t2, i2).valueOf(), f2, a2), m = s2[0], c = s2[1], d = o(m).utcOffset(c);
          return d.$x.$timezone = a2, d;
        }, o.tz.guess = function() {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        }, o.tz.setDefault = function(t2) {
          r = t2;
        };
      };
    });
  })(timezone$1);
  const timezone = timezone$1.exports;
  var advancedFormat$1 = { exports: {} };
  (function(module, exports2) {
    !function(e, t) {
      module.exports = t();
    }(commonjsGlobal, function() {
      return function(e, t, r) {
        var n = t.prototype, s = n.format;
        r.en.ordinal = function(e2) {
          var t2 = ["th", "st", "nd", "rd"], r2 = e2 % 100;
          return "[" + e2 + (t2[(r2 - 20) % 10] || t2[r2] || t2[0]) + "]";
        }, n.format = function(e2) {
          var t2 = this, r2 = this.$locale();
          if (!this.isValid())
            return s.bind(this)(e2);
          var n2 = this.$utils(), a = (e2 || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function(e3) {
            switch (e3) {
              case "Q":
                return Math.ceil((t2.$M + 1) / 3);
              case "Do":
                return r2.ordinal(t2.$D);
              case "gggg":
                return t2.weekYear();
              case "GGGG":
                return t2.isoWeekYear();
              case "wo":
                return r2.ordinal(t2.week(), "W");
              case "w":
              case "ww":
                return n2.s(t2.week(), "w" === e3 ? 1 : 2, "0");
              case "W":
              case "WW":
                return n2.s(t2.isoWeek(), "W" === e3 ? 1 : 2, "0");
              case "k":
              case "kk":
                return n2.s(String(0 === t2.$H ? 24 : t2.$H), "k" === e3 ? 1 : 2, "0");
              case "X":
                return Math.floor(t2.$d.getTime() / 1e3);
              case "x":
                return t2.$d.getTime();
              case "z":
                return "[" + t2.offsetName() + "]";
              case "zzz":
                return "[" + t2.offsetName("long") + "]";
              default:
                return e3;
            }
          });
          return s.bind(this)(a);
        };
      };
    });
  })(advancedFormat$1);
  const advancedFormat = advancedFormat$1.exports;
  var isSameOrBefore = { exports: {} };
  (function(module, exports2) {
    !function(e, i) {
      module.exports = i();
    }(commonjsGlobal, function() {
      return function(e, i) {
        i.prototype.isSameOrBefore = function(e2, i2) {
          return this.isSame(e2, i2) || this.isBefore(e2, i2);
        };
      };
    });
  })(isSameOrBefore);
  const _isSameOrBefore = isSameOrBefore.exports;
  var isBetween = { exports: {} };
  (function(module, exports2) {
    !function(e, i) {
      module.exports = i();
    }(commonjsGlobal, function() {
      return function(e, i, t) {
        i.prototype.isBetween = function(e2, i2, s, f) {
          var n = t(e2), o = t(i2), r = "(" === (f = f || "()")[0], u = ")" === f[1];
          return (r ? this.isAfter(n, s) : !this.isBefore(n, s)) && (u ? this.isBefore(o, s) : !this.isAfter(o, s)) || (r ? this.isBefore(n, s) : !this.isAfter(n, s)) && (u ? this.isAfter(o, s) : !this.isBefore(o, s));
        };
      };
    });
  })(isBetween);
  const _isBetween = isBetween.exports;
  var localizedFormat$1 = { exports: {} };
  (function(module, exports2) {
    !function(e, t) {
      module.exports = t();
    }(commonjsGlobal, function() {
      var e = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" };
      return function(t, o, n) {
        var r = o.prototype, i = r.format;
        n.en.formats = e, r.format = function(t2) {
          void 0 === t2 && (t2 = "YYYY-MM-DDTHH:mm:ssZ");
          var o2 = this.$locale().formats, n2 = function(t3, o3) {
            return t3.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(t4, n3, r2) {
              var i2 = r2 && r2.toUpperCase();
              return n3 || o3[r2] || e[r2] || o3[i2].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(e2, t5, o4) {
                return t5 || o4.slice(1);
              });
            });
          }(t2, void 0 === o2 ? {} : o2);
          return i.call(this, n2);
        };
      };
    });
  })(localizedFormat$1);
  const localizedFormat = localizedFormat$1.exports;
  var hu = { exports: {} };
  (function(module, exports2) {
    !function(e, n) {
      module.exports = n(dayjs_min.exports);
    }(commonjsGlobal, function(e) {
      function n(e2) {
        return e2 && "object" == typeof e2 && "default" in e2 ? e2 : { default: e2 };
      }
      var t = n(e), r = { name: "hu", weekdays: "vas\xE1rnap_h\xE9tf\u0151_kedd_szerda_cs\xFCt\xF6rt\xF6k_p\xE9ntek_szombat".split("_"), weekdaysShort: "vas_h\xE9t_kedd_sze_cs\xFCt_p\xE9n_szo".split("_"), weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"), months: "janu\xE1r_febru\xE1r_m\xE1rcius_\xE1prilis_m\xE1jus_j\xFAnius_j\xFAlius_augusztus_szeptember_okt\xF3ber_november_december".split("_"), monthsShort: "jan_feb_m\xE1rc_\xE1pr_m\xE1j_j\xFAn_j\xFAl_aug_szept_okt_nov_dec".split("_"), ordinal: function(e2) {
        return e2 + ".";
      }, weekStart: 1, relativeTime: { future: "%s m\xFAlva", past: "%s", s: function(e2, n2, t2, r2) {
        return "n\xE9h\xE1ny m\xE1sodperc" + (r2 || n2 ? "" : "e");
      }, m: function(e2, n2, t2, r2) {
        return "egy perc" + (r2 || n2 ? "" : "e");
      }, mm: function(e2, n2, t2, r2) {
        return e2 + " perc" + (r2 || n2 ? "" : "e");
      }, h: function(e2, n2, t2, r2) {
        return "egy " + (r2 || n2 ? "\xF3ra" : "\xF3r\xE1ja");
      }, hh: function(e2, n2, t2, r2) {
        return e2 + " " + (r2 || n2 ? "\xF3ra" : "\xF3r\xE1ja");
      }, d: function(e2, n2, t2, r2) {
        return "egy " + (r2 || n2 ? "nap" : "napja");
      }, dd: function(e2, n2, t2, r2) {
        return e2 + " " + (r2 || n2 ? "nap" : "napja");
      }, M: function(e2, n2, t2, r2) {
        return "egy " + (r2 || n2 ? "h\xF3nap" : "h\xF3napja");
      }, MM: function(e2, n2, t2, r2) {
        return e2 + " " + (r2 || n2 ? "h\xF3nap" : "h\xF3napja");
      }, y: function(e2, n2, t2, r2) {
        return "egy " + (r2 || n2 ? "\xE9v" : "\xE9ve");
      }, yy: function(e2, n2, t2, r2) {
        return e2 + " " + (r2 || n2 ? "\xE9v" : "\xE9ve");
      } }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "YYYY.MM.DD.", LL: "YYYY. MMMM D.", LLL: "YYYY. MMMM D. H:mm", LLLL: "YYYY. MMMM D., dddd H:mm" } };
      return t.default.locale(r, null, true), r;
    });
  })(hu);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(advancedFormat);
  dayjs.extend(localizedFormat);
  dayjs.extend(_isSameOrBefore);
  dayjs.extend(_isBetween);
  const format = (datetime = "", format2 = "", timezone2 = "", locale = "hu") => {
    timezone2 = timezone2 ? timezone2 : dayjs.tz.guess();
    return dayjs(datetime).isValid() ? dayjs(datetime).tz(timezone2).locale(locale).format(format2) : "";
  };
  const convertMinToSec = (minutes) => {
    const splitted = minutes.split(":");
    return parseInt(splitted[0], 10) * 60 + parseInt(splitted[1], 10);
  };
  const convert = (data = []) => {
    return {
      result: [...data],
      filteredRowsLength: 0,
      isFiltered: false,
      value() {
        return {
          rows: this.result,
          totalItems: this.filteredRowsLength,
          totalItems: this.isFiltered ? this.filteredRowsLength : data.length
        };
      },
      filter(name, condition = [], exact = false) {
        if (name) {
          const predicate = condition.map(
            (key) => exact ? propEq$1(key, name) : pipe(prop$1(key), toLower$1, includes$1(name))
          );
          const filteredRows = filter$1(anyPass$1([...predicate]), this.result);
          this.isFiltered = true;
          this.filteredRowsLength = filteredRows.length;
          this.result = filteredRows;
        }
        return this;
      },
      sorted(sort) {
        if (!sort.sortTarget)
          return this;
        if (sort.orders[0].direction === SORT_STATE_ORIGINAL)
          return this;
        const sortDirection = ifElse$1(equals$1(SORT_STATE_ASCEND), always$1(ascend$1), always$1(descend$1));
        this.result = sortWith$1(sort.orders.map((s) => compose(sortDirection(s.direction), prop$1)(s.target)))(this.result);
        return this;
      },
      addIndex(target = null) {
        this.result.reduce((rows, row, index) => {
          const lastRow = rows[rows.length - 1] || [];
          const isSameRow = target && lastRow[target] === row[target];
          row.index = isSameRow ? lastRow.index : index + 1;
          row.indexClass = isSameRow ? "is-duplicated" : null;
          rows.push(row);
          return rows;
        }, []);
        return this;
      },
      addContinuousIndex() {
        this.result = this.result.map((row, index) => ({
          ...row,
          index: index + 1
        }));
        return this;
      },
      pagination(page, limit) {
        page = Number(page);
        limit = Number(limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        this.result = this.result.slice(startIndex, endIndex);
        return this;
      },
      playerName() {
        this.result = this.result.map((row) => ({
          ...row,
          name: `${row.lastName} ${row.firstName}`
        }));
        return this;
      },
      schedule(timezone2 = "", locale = "hu") {
        this.result = this.result.map((row) => ({
          ...row,
          gameResult: `${row.homeTeamScore}-${row.awayTeamScore}`,
          gameDateDate: format(row.gameDate, "L dddd", timezone2, locale),
          gameDateTime: format(row.gameDate, "HH:mm", timezone2, locale)
        }));
        return this;
      },
      gameDateFilter(month) {
        if (month === null)
          return this;
        this.result = this.result.filter((game) => {
          return new Date(game.gameDate).getMonth() == month;
        });
        return this;
      },
      convertTimes(targets = []) {
        this.result = this.result.map((row) => {
          targets.map((key) => {
            if (!row[key])
              return row;
            return row[`${key}Sec`] = convertMinToSec(row[key]);
          });
          return row;
        });
        return this;
      },
      groupByDays() {
        this.result = groupBy$1((row) => {
          return format(row.gameDate, "YYYY-MM-DD");
        })(this.result);
        return this;
      }
    };
  };
  const dateDiff = (a, b) => new Date(a.gameDate).getTime() - new Date(b.gameDate).getTime();
  sortWith$1([dateDiff, ascend$1(prop$1("id"))]);
  const externalTeamLinkResolver = (resolver, teamName) => {
    var _a2;
    if (typeof resolver === "function")
      return resolver(teamName);
    if (resolver)
      return encodeURI(resolver + teamName);
    if ((_a2 = window == null ? void 0 : window.__MJSZ_VBR_WIDGET__) == null ? void 0 : _a2.gameUrl)
      return encodeURI(window.__MJSZ_VBR_WIDGET__.teamUrl + teamName);
    return encodeURI(DEFAULT_EXTERNAL_TEAM_URL + teamName);
  };
  const COLUMNS_STANDINGS_P_3 = {
    index: {
      label: "table.blank",
      class: "is-text-left"
    },
    teamLogo: {
      label: "",
      class: "is-has-image"
    },
    teamName: {
      label: "table.team.short",
      tooltip: "table.team.tooltip",
      class: "is-text-left is-w-auto is-text-bold",
      sortOrders: [{ target: "teamName", direction: SORT_STATE_ASCEND }]
    },
    m: {
      label: "table.game.short",
      tooltip: "table.game.tooltip",
      sortOrders: [{ target: "m", direction: SORT_STATE_DESCEND }]
    },
    p3: {
      label: "table.wins.short",
      tooltip: "table.wins.tooltip",
      sortOrders: [
        { target: "p3", direction: SORT_STATE_DESCEND },
        { target: "p2", direction: SORT_STATE_DESCEND }
      ]
    },
    p2: {
      label: "table.otw.short",
      tooltip: "table.otw.tooltip",
      sortOrders: [{ target: "p2", direction: SORT_STATE_DESCEND }]
    },
    p1: {
      label: "table.otl.short",
      tooltip: "table.otl.tooltip",
      sortOrders: [{ target: "p1", direction: SORT_STATE_ASCEND }]
    },
    p0: {
      label: "table.losses.short",
      tooltip: "table.losses.tooltip",
      sortOrders: [{ target: "p0", direction: SORT_STATE_ASCEND }]
    },
    plus: {
      label: "table.goalFor.short",
      tooltip: "table.goalFor.tooltip",
      sortOrders: [{ target: "plus", direction: SORT_STATE_DESCEND }]
    },
    minus: {
      label: "table.goalAgainst.short",
      tooltip: "table.goalAgainst.tooltip",
      sortOrders: [{ target: "minus", direction: SORT_STATE_ASCEND }]
    },
    gk: {
      label: "table.goalDiff.short",
      tooltip: "table.goalDiff.tooltip",
      sortOrders: [{ target: "gk", direction: SORT_STATE_DESCEND }]
    },
    p: {
      label: "table.points.short",
      tooltip: "table.points.tooltip",
      class: "is-text-bold",
      sortOrders: [{ target: "p", direction: SORT_STATE_DESCEND }]
    }
  };
  const COLUMNS_STANDINGS_P_2 = {
    index: {
      label: "#",
      class: "is-text-left"
    },
    teamLogo: {
      label: "",
      class: "is-has-image"
    },
    teamName: {
      label: "table.team.short",
      tooltip: "table.team.tooltip",
      class: "is-text-left is-w-auto is-text-bold",
      sortOrders: [{ target: "teamName", direction: SORT_STATE_ASCEND }]
    },
    m: {
      label: "table.game.short",
      tooltip: "table.game.tooltip",
      sortOrders: [{ target: "m", direction: SORT_STATE_DESCEND }]
    },
    p2: {
      label: "table.wins.short",
      tooltip: "table.wins.tooltip",
      sortOrders: [
        { target: "p2", direction: SORT_STATE_DESCEND },
        { target: "p1", direction: SORT_STATE_DESCEND }
      ]
    },
    p1: {
      label: "table.draw.short",
      tooltip: "table.draw.tooltip",
      sortOrders: [
        { target: "p1", direction: SORT_STATE_DESCEND },
        { target: "p2", direction: SORT_STATE_DESCEND }
      ]
    },
    p0: {
      label: "table.losses.short",
      tooltip: "table.losses.tooltip",
      sortOrders: [{ target: "p0", direction: SORT_STATE_ASCEND }]
    },
    plus: {
      label: "table.goalFor.short",
      tooltip: "table.goalFor.tooltip",
      sortOrders: [{ target: "plus", direction: SORT_STATE_DESCEND }]
    },
    minus: {
      label: "table.goalAgainst.short",
      tooltip: "table.goalAgainst.tooltip",
      sortOrders: [{ target: "minus", direction: SORT_STATE_ASCEND }]
    },
    gk: {
      label: "table.goalDiff.short",
      tooltip: "table.goalDiff.tooltip",
      sortOrders: [{ target: "gk", direction: SORT_STATE_DESCEND }]
    },
    p: {
      label: "table.points.short",
      tooltip: "table.points.tooltip",
      class: "is-text-bold",
      sortOrders: [{ target: "p", direction: SORT_STATE_DESCEND }]
    }
  };
  const baseProps = {
    locale: {
      type: String,
      default: "hu"
    },
    championshipId: {
      type: String,
      default: ""
    },
    division: {
      type: String,
      default: ""
    },
    apiKey: {
      type: String,
      default: ""
    },
    hideColumns: {
      type: String,
      default: ""
    }
  };
  const teamStatsProps = {
    externalTeamLink: {
      type: [String, Function],
      default: ""
    },
    isTeamLinked: {
      type: Boolean,
      default: false
    }
  };
  const _style_0 = ":root,\n:host {\n  font-family: 'Roboto Condensed', Avenir, Helvetica, Arial, sans-serif;\n\n  --vbr-widget-primary-color-0: #ffffff;\n  --vbr-widget-primary-color-50: #eceff1;\n  --vbr-widget-primary-color-100: #cfd8dc;\n  --vbr-widget-primary-color-200: #b0bec5;\n  --vbr-widget-primary-color-300: #90a4ae;\n  --vbr-widget-primary-color-400: #78909c;\n  --vbr-widget-primary-color-500: #607d8b;\n  --vbr-widget-primary-color-600: #546e7a;\n  --vbr-widget-primary-color-700: #455a64;\n  --vbr-widget-primary-color-800: #37474f;\n  --vbr-widget-primary-color-900: #263238;\n\n  --vbr-widget-secondary-color-100: #dcedc8;\n  --vbr-widget-secondary-color-200: #badb94;\n  --vbr-widget-secondary-color-300: #aed581;\n  --vbr-widget-secondary-color-400: #9ccc65;\n  --vbr-widget-secondary-color-500: #8bc34a;\n  --vbr-widget-secondary-color-700: #689f38;\n  --vbr-widget-secondary-color-800: #558b2f;\n  --vbr-widget-secondary-color-900: #33691e;\n\n  --vbr-widget-danger-color-50: #ffebee;\n  --vbr-widget-danger-color-100: #ffcdd2;\n  --vbr-widget-danger-color-200: #ef9a9a;\n  --vbr-widget-danger-color-300: #e57373;\n  --vbr-widget-danger-color-400: #ef5350;\n  --vbr-widget-danger-color-500: #f44336;\n  --vbr-widget-danger-color-700: #d32f2f;\n  --vbr-widget-danger-color-900: #b71c1c;\n  --vbr-widget-danger-color-a400: #ff1744;\n\n  --vbr-widget-table-header-font-size: 12px;\n  --vbr-widget-table-default-column-width: 30px;\n  --vbr-widget-table-default-bg-color: var(--vbr-widget-primary-color-0);\n  --vbr-widget-table-color: var(--vbr-widget-primary-color-800);\n  --vbr-widget-table-neutral-color: var(--vbr-widget-primary-color-300);\n  --vbr-widget-table-header-bg-color: var(--vbr-widget-primary-color-800);\n  --vbr-widget-table-header-hover-bg-color: var(--vbr-widget-primary-color-700);\n  --vbr-widget-table-header-color: var(--vbr-widget-primary-color-200);\n  --vbr-widget-table-table-header-active-bg-color: var(--vbr-widget-primary-color-700);\n  --vbr-widget-table-header-active-color: var(--vbr-widget-primary-color-0);\n  --vbr-widget-table-hover-color: var(--vbr-widget-secondary-color-900);\n  --vbr-widget-table-hover-bg-color: var(--vbr-widget-secondary-color-100);\n  --vbr-widget-table-active-color: var(--vbr-widget-secondary-color-900);\n  --vbr-widget-table-active-bg-color: var(--vbr-widget-secondary-color-200);\n  --vbr-widget-table-active-even-bg-color: var(--vbr-widget-secondary-color-300);\n  --vbr-widget-table-active-hover-color: var(--vbr-widget-secondary-color-900);\n  --vbr-widget-table-active-hover-bg-color: var(--vbr-widget-secondary-color-400);\n  --vbr-widget-table-portrait-border-color: var(--vbr-widget-primary-color-100);\n  --vbr-widget-table-portrait-bg-color: var(--vbr-widget-primary-color-50);\n  --vbr-widget-table-cell-light-color: var(--vbr-widget-primary-color-600);\n  --vbr-widget-table-cell-dark-color: var(--vbr-widget-primary-color-900);\n  --vbr-widget-table-stripped-bg-color: #f8f9fa;\n  --vbr-widget-table-label-color: var(--vbr-widget-primary-color-500);\n  --vbr-widget-table-label-bg-color: var(--vbr-widget-primary-color-50);\n  --vbr-widget-table-cell-logo-size: 20px;\n  --vbr-widget-table-cell-portrait-size: 26px;\n\n  --vbr-widget-paginator-color: var(--vbr-widget-primary-color-500);\n  --vbr-widget-paginator-bg-color: var(--vbr-widget-primary-color-0);\n  --vbr-widget-paginator-hover-color: var(--vbr-widget-primary-color-700);\n  --vbr-widget-paginator-hover-bg-color: var(--vbr-widget-primary-color-100);\n  --vbr-widget-paginator-border-color: var(--vbr-widget-primary-color-100);\n  --vbr-widget-paginator-active-color: var(--vbr-widget-primary-color-0);\n  --vbr-widget-paginator-active-bg-color: var(--vbr-widget-primary-color-900);\n  --vbr-widget-paginator-disabled-color: var(--vbr-widget-primary-color-200);\n\n  --vbr-widget-tooltip-font-size: 12px;\n  --vbr-widget-tooltip-color: #ffffff;\n  --vbr-widget-tooltip-bg-color: #000000;\n\n  --vbr-widget-popover-trigger-hover-bg-color: var(--vbr-widget-secondary-color-200);\n  --vbr-widget-popover-trigger-focus-bg-color: var(--vbr-widget-secondary-color-300);\n  --vbr-widget-popover-bg-color: var(--vbr-widget-primary-color-0);\n\n  --vbr-widget-dropdown-item-color: var(--vbr-widget-primary-color-500);\n  --vbr-widget-dropdown-item-hover-color: var(--vbr-widget-primary-color-800);\n  --vbr-widget-dropdown-item-hover-bg-color: var(--vbr-widget-primary-color-50);\n\n  --vbr-widget-error-notice-bg-color: var(--vbr-widget-danger-color-50);\n  --vbr-widget-error-notice-border-color: var(--vbr-widget-danger-color-100);\n  --vbr-widget-error-notice-color: var(--vbr-widget-danger-color-700);\n\n  --vbr-widget-link-color: var(--vbr-widget-secondary-color-700);\n  --vbr-widget-hover-color: var(--vbr-widget-secondary-color-900);\n\n  --vbr-widget-base-input-color: var(--vbr-widget-primary-color-800);\n  --vbr-widget-base-input-font-size: 0.875rem;\n  --vbr-widget-base-input-border-color: var(--vbr-widget-primary-color-300);\n  --vbr-widget-base-input-border-radius: 3px;\n\n  --vbr-widget-form-label-color: var(--vbr-widget-primary-color-500);\n  --vbr-widget-form-label-font-size: 0.75rem;\n\n  --vbr-widget-timezone-selector-color: var(--vbr-widget-primary-color-500);\n  --vbr-widget-timezone-selector-font-size: 0.8125rem;\n}\n.transition-fade-enter-active,\n.transition-fade-leave-active {\n  transition: all 0.25s ease;\n}\n.transition-fade-enter-from,\n.transition-fade-leave-to {\n  opacity: 0;\n  transform: translateY(5px);\n}\nimg {\n  opacity: 0;\n  transition: opacity 0.5s ease-out;\n}\nimg.is-loaded {\n  opacity: 1;\n}\na {\n  color: var(--vbr-widget-link-color);\n  text-decoration: none;\n}\na:hover {\n    color: var(--vbr-widget-hover-color);\n}\n.floating-content.is-tooltip {\n    background-color: var(--vbr-widget-tooltip-bg-color);\n    color: var(--vbr-widget-tooltip-color);\n    font-weight: bold;\n    padding: 5px 10px;\n    border-radius: 4px;\n    font-size: var(--vbr-widget-tooltip-font-size);\n    white-space: nowrap;\n    pointer-events: none;\n}\n.floating-content.is-tooltip .is-arrow {\n      background-color: var(--vbr-widget-tooltip-bg-color);\n}\n.floating-content.is-content {\n    /* width: 220px; */\n    border-radius: 4px;\n    box-shadow: 2px 14px 23px 0px rgba(0, 0, 0, 0.25);\n}\n.floating-content.is-content .is-arrow {\n      background-color: var(--vbr-widget-primary-color-50);\n}\n.floating-content .is-arrow {\n    position: absolute;\n    width: 8px;\n    height: 8px;\n    transform: rotate(45deg);\n}\n[data-placement^='top'] .floating-content .is-arrow {\n      bottom: -4px;\n}\n[data-placement^='bottom'] .floating-content .is-arrow {\n      top: -4px;\n}\n[data-placement^='left'] .floating-content .is-arrow {\n      right: -4px;\n}\n[data-placement^='right'] .floating-content .is-arrow {\n      left: -4px;\n}\n.mjsz-vbr-error-notice {\n  display: flex;\n  align-items: center;\n  justify-items: flex-start;\n  margin: 10px 0;\n  padding: 10px 20px;\n  background-color: var(--vbr-widget-error-notice-bg-color);\n  color: var(--vbr-widget-error-notice-color);\n  border: 1px solid var(--vbr-widget-error-notice-border-color);\n}\n.mjsz-vbr-error-notice .icon {\n    margin-right: 15px;\n}\n.mjsz-vbr-timezone-selector {\n  padding: 3px 0;\n  color: var(--vbr-widget-timezone-selector-color);\n  font-size: var(--vbr-widget-timezone-selector-font-size);\n}\n.is-card {\n  background-color: #fff;\n  padding: 15px;\n  margin-bottom: 20px;\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10), 0 2px 2px 0 rgba(0, 0, 0, 0.10);\n}\n";
  const _style_1 = ".mjsz-vbr-table {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n.mjsz-vbr-table table,\n  .mjsz-vbr-table caption,\n  .mjsz-vbr-table tbody,\n  .mjsz-vbr-table tfoot,\n  .mjsz-vbr-table thead,\n  .mjsz-vbr-table tr,\n  .mjsz-vbr-table th,\n  .mjsz-vbr-table td {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    vertical-align: baseline;\n}\n.mjsz-vbr-table {\n  color: var(--vbr-widget-table-color);\n  background-color: var(--vbr-widget-table-default-bg-color);\n}\n.mjsz-vbr-table th {\n    width: var(--vbr-widget-table-default-column-width);\n    background-color: var(--vbr-widget-table-header-bg-color);\n    font-size: var(--vbr-widget-table-header-font-size);\n    font-weight: 700;\n    color: var(--vbr-widget-table-header-color);\n    text-align: center;\n}\n.mjsz-vbr-table th:focus-visible,\n    .mjsz-vbr-table th:hover {\n      background-color: var(--vbr-widget-table-header-hover-bg-color);\n      outline: none;\n}\n.mjsz-vbr-table th.is-sortable {\n      position: relative;\n      cursor: pointer;\n}\n.mjsz-vbr-table th.is-sortable .icon-sort {\n        opacity: 0.5;\n}\n.mjsz-vbr-table th.is-active {\n      background-color: var(--vbr-widget-table-table-header-active-bg-color);\n      color: var(--vbr-widget-table-header-active-color);\n}\n.mjsz-vbr-table th.is-active .icon-sort {\n        opacity: 1;\n}\n.mjsz-vbr-table th.is-asc {\n      position: relative;\n}\n.mjsz-vbr-table th.is-desc {\n      position: relative;\n}\n.mjsz-vbr-table th.is-w-auto {\n      width: auto;\n}\n.mjsz-vbr-table th .is-icon-sort {\n      width: 11px;\n      height: 11px;\n      margin-left: 5px;\n}\n.mjsz-vbr-table td {\n    text-align: center;\n}\n.mjsz-vbr-table td.is-active {\n      font-weight: 700;\n      color: var(--vbr-widget-table-active-color);\n      background-color: var(--vbr-widget-table-active-bg-color);\n}\n.mjsz-vbr-table td .is-text-light,\n    .mjsz-vbr-table td.is-text-light {\n      color: var(--vbr-widget-table-cell-light-color);\n}\n.mjsz-vbr-table td .is-text-dark,\n    .mjsz-vbr-table td.is-text-dark {\n      color: var(--vbr-widget-table-cell-dark-color);\n}\n.mjsz-vbr-table td .is-logo-image {\n      display: inline-block;\n      vertical-align: middle;\n      width: var(--vbr-widget-table-cell-logo-size);\n      height: var(--vbr-widget-table-cell-logo-size);\n}\n.mjsz-vbr-table td .is-portrait-image {\n      display: inline-block;\n      vertical-align: middle;\n      width: var(--vbr-widget-table-cell-portrait-size);\n      height: var(--vbr-widget-table-cell-portrait-size);\n      object-fit: cover;\n      object-position: top;\n      overflow: hidden;\n      border-radius: 100%;\n      border: 1px solid var(--vbr-widget-primary-color-100);\n}\n.mjsz-vbr-table td .is-portrait-image img {\n        width: var(--vbr-widget-table-cell-portrait-size);\n        height: auto;\n}\n.mjsz-vbr-table td.is-text-bold {\n      font-weight: 700;\n}\n.mjsz-vbr-table td.is-text-xl {\n      font-size: 1.2 rem;\n}\n.mjsz-vbr-table td .is-text-accent {\n      color: var(--vbr-widget-secondary-color-500);\n}\n.mjsz-vbr-table td svg {\n      width: 16px;\n      height: 16px;\n}\n.mjsz-vbr-table td button {\n      padding: 3px 3px;\n      line-height: 0;\n      border: none;\n      outline: none;\n      background-color: transparent;\n}\n.mjsz-vbr-table td button:hover {\n        background-color: var(--vbr-widget-popover-trigger-hover-bg-color);\n}\n.mjsz-vbr-table td button:active,\n      .mjsz-vbr-table td button:focus {\n        background-color: var(--vbr-widget-popover-trigger-focus-bg-color);\n}\n.mjsz-vbr-table td a {\n      text-decoration: none;\n}\n.mjsz-vbr-table td .label {\n      padding: 3px 6px;\n      font-size: 11px;\n      font-weight: 700;\n      color: var(--vbr-widget-table-label-color);\n      background-color: var(--vbr-widget-table-label-bg-color);\n      border-radius: 2px;\n}\n.mjsz-vbr-table td .label:not(:last-of-type) {\n        margin-right: 3px;\n}\n.mjsz-vbr-table td a {\n      color: var(--vbr-widget-link-color);\n}\n.mjsz-vbr-table td a:hover {\n      color: var(--vbr-widget-hover-color);\n}\n.mjsz-vbr-table th,\n  .mjsz-vbr-table td {\n    padding: 8px;\n    white-space: nowrap;\n    vertical-align: middle;\n}\n.mjsz-vbr-table th.is-text-left, .mjsz-vbr-table td.is-text-left {\n      text-align: left;\n}\n.mjsz-vbr-table th.is-text-right, .mjsz-vbr-table td.is-text-right {\n      text-align: right;\n}\n.mjsz-vbr-table th.is-has-image, .mjsz-vbr-table td.is-has-image {\n      padding: 0 2px;\n}\n.mjsz-vbr-table th .is-duplicated, .mjsz-vbr-table td .is-duplicated {\n      color: var(--vbr-widget-table-neutral-color);\n}\n.mjsz-vbr-table tr:nth-child(even) {\n    background-color: var(--vbr-widget-table-stripped-bg-color);\n}\n.mjsz-vbr-table tr:nth-child(even) td.is-active {\n      background-color: var(--vbr-widget-table-active-even-bg-color);\n}\n.mjsz-vbr-table tr:focus-within,\n  .mjsz-vbr-table tr:hover {\n    color: var(--vbr-widget-table-hover-color);\n    background-color: var(--vbr-widget-table-hover-bg-color);\n}\n.mjsz-vbr-table tr:focus-within td.is-active, .mjsz-vbr-table tr:hover td.is-active {\n      color: var(--vbr-widget-table-active-hover-color);\n      background-color: var(--vbr-widget-table-active-hover-bg-color);\n}\n";
  const _style_2 = ".mjsz-vbr-table-responsive {\n  width: 100%;\n  overflow-x: auto;\n}\n.mjsz-vbr-table-responsive table {\n  width: 100%;\n}\n";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main = {
    __name: "Standings.ce",
    props: {
      ...baseProps,
      ...teamStatsProps,
      type: {
        type: String,
        default: "3",
        validator: (value) => ["2", "3"].includes(value)
      }
    },
    setup(__props) {
      const props = __props;
      const { onError, error, hasError } = _shared.useErrorProvider();
      const locale = vue.computed(() => props.locale);
      const {
        state: rows,
        error: apiError,
        isLoading
      } = useAsyncState(
        () => _shared.fetchVBRData("/v1/standings", props.apiKey, {
          championshipId: Number(props.championshipId),
          division: props.division
        }),
        [],
        {
          onError: (error2) => onError(error2)
        }
      );
      const { sort, change } = _shared.useSort();
      const convertedRows = vue.computed(() => {
        return convert(vue.unref(rows)).sorted(sort).addContinuousIndex().value();
      });
      const currentColumns = vue.computed(() => props.type === "3" ? COLUMNS_STANDINGS_P_3 : COLUMNS_STANDINGS_P_2);
      const onSort = (payload) => change(payload);
      const resolveExternalTeamLink = (teamName) => externalTeamLinkResolver(props.externalTeamLink, teamName);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createVNode(vue.unref(_shared.I18NProvider), { locale: vue.unref(locale) }, {
            default: vue.withCtx(() => [
              vue.unref(hasError) ? (vue.openBlock(), vue.createBlock(vue.unref(_shared.ErrorNotice), {
                key: 0,
                error: vue.unref(error)
              }, null, 8, ["error"])) : vue.createCommentVNode("", true),
              vue.createVNode(vue.unref(_shared.StatisticsTable), {
                columns: vue.unref(currentColumns),
                rows: vue.unref(convertedRows).rows,
                "is-loading": vue.unref(isLoading),
                "hide-columns": _ctx.hideColumns,
                sort: vue.unref(sort),
                "external-team-resolver": resolveExternalTeamLink,
                "is-team-linked": _ctx.isTeamLinked,
                onSort
              }, null, 8, ["columns", "rows", "is-loading", "hide-columns", "sort", "is-team-linked"])
            ]),
            _: 1
          }, 8, ["locale"])
        ]);
      };
    }
  };
  const Standings = /* @__PURE__ */ _export_sfc(_sfc_main, [["styles", [_style_0, _style_1, _style_2]]]);
  const setup = ({ apiKey }) => {
    window.__MJSZ_VBR_WIDGET__ = { apiKey };
    register();
  };
  const StandingsCE = vue.defineCustomElement(Standings);
  function register() {
    customElements.define("mjsz-vbr-standings", StandingsCE);
  }
  exports.StandingsCE = StandingsCE;
  exports.register = register;
  exports.setup = setup;
  Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
  return exports;
}({}, Vue, Shared);
