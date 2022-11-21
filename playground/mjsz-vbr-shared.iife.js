/*!
  * MJSZ VBR Widgets v2.0.0-alpha.1
  * (c) 2022 Akos Stegner
  * Released: 21/11/2022, 17:59:26
  * Released under the MIT License.
  */
var Shared = function(exports, vue) {
  "use strict";
  const useMainClass = (className) => {
    const prefix = "mjsz-vbr-";
    return prefix + className;
  };
  const _sfc_main$h = {
    __name: "BaseSelect",
    props: {
      modelValue: {
        type: [String, Number],
        default: null
      }
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: emits }) {
      const props = __props;
      const baseInputClass = useMainClass("base-input");
      const value = vue.computed({ get: () => props.modelValue, set: (value2) => emits("update:modelValue", value2) });
      return (_ctx, _cache) => {
        return vue.withDirectives((vue.openBlock(), vue.createElementBlock("select", {
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(value) ? value.value = $event : null),
          class: vue.normalizeClass([vue.unref(baseInputClass), "is-select"])
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 2)), [
          [vue.vModelSelect, vue.unref(value)]
        ]);
      };
    }
  };
  var _a;
  const isClient = typeof window !== "undefined";
  const isString = (val) => typeof val === "string";
  const noop = () => {
  };
  isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
  function resolveUnref(r2) {
    return typeof r2 === "function" ? r2() : vue.unref(r2);
  }
  function createFilterWrapper(filter2, fn) {
    function wrapper(...args) {
      filter2(() => fn.apply(this, args), { fn, thisArg: this, args });
    }
    return wrapper;
  }
  function debounceFilter(ms, options = {}) {
    let timer;
    let maxTimer;
    const filter2 = (invoke) => {
      const duration = resolveUnref(ms);
      const maxDuration = resolveUnref(options.maxWait);
      if (timer)
        clearTimeout(timer);
      if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
        if (maxTimer) {
          clearTimeout(maxTimer);
          maxTimer = null;
        }
        return invoke();
      }
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          if (timer)
            clearTimeout(timer);
          maxTimer = null;
          invoke();
        }, maxDuration);
      }
      timer = setTimeout(() => {
        if (maxTimer)
          clearTimeout(maxTimer);
        maxTimer = null;
        invoke();
      }, duration);
    };
    return filter2;
  }
  function promiseTimeout(ms, throwOnTimeout = false, reason = "Timeout") {
    return new Promise((resolve2, reject2) => {
      if (throwOnTimeout)
        setTimeout(() => reject2(reason), ms);
      else
        setTimeout(resolve2, ms);
    });
  }
  function identity(arg) {
    return arg;
  }
  function tryOnScopeDispose(fn) {
    if (vue.getCurrentScope()) {
      vue.onScopeDispose(fn);
      return true;
    }
    return false;
  }
  function useDebounceFn(fn, ms = 200, options = {}) {
    return createFilterWrapper(debounceFilter(ms, options), fn);
  }
  function refDebounced(value, ms = 200, options = {}) {
    if (ms <= 0)
      return value;
    const debounced = vue.ref(value.value);
    const updater = useDebounceFn(() => {
      debounced.value = value.value;
    }, ms, options);
    vue.watch(value, () => updater());
    return debounced;
  }
  function watchOnce(source, cb, options) {
    const stop = vue.watch(source, (...args) => {
      vue.nextTick(() => stop());
      return cb(...args);
    }, options);
  }
  function _isPlaceholder(a2) {
    return a2 != null && typeof a2 === "object" && a2["@@functional/placeholder"] === true;
  }
  function _curry1(fn) {
    return function f1(a2) {
      if (arguments.length === 0 || _isPlaceholder(a2)) {
        return f1;
      } else {
        return fn.apply(this, arguments);
      }
    };
  }
  function _curry2(fn) {
    return function f2(a2, b) {
      switch (arguments.length) {
        case 0:
          return f2;
        case 1:
          return _isPlaceholder(a2) ? f2 : _curry1(function(_b) {
            return fn(a2, _b);
          });
        default:
          return _isPlaceholder(a2) && _isPlaceholder(b) ? f2 : _isPlaceholder(a2) ? _curry1(function(_a2) {
            return fn(_a2, b);
          }) : _isPlaceholder(b) ? _curry1(function(_b) {
            return fn(a2, _b);
          }) : fn(a2, b);
      }
    };
  }
  function _arity(n2, fn) {
    switch (n2) {
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
    return function f3(a2, b, c2) {
      switch (arguments.length) {
        case 0:
          return f3;
        case 1:
          return _isPlaceholder(a2) ? f3 : _curry2(function(_b, _c) {
            return fn(a2, _b, _c);
          });
        case 2:
          return _isPlaceholder(a2) && _isPlaceholder(b) ? f3 : _isPlaceholder(a2) ? _curry2(function(_a2, _c) {
            return fn(_a2, b, _c);
          }) : _isPlaceholder(b) ? _curry2(function(_b, _c) {
            return fn(a2, _b, _c);
          }) : _curry1(function(_c) {
            return fn(a2, b, _c);
          });
        default:
          return _isPlaceholder(a2) && _isPlaceholder(b) && _isPlaceholder(c2) ? f3 : _isPlaceholder(a2) && _isPlaceholder(b) ? _curry2(function(_a2, _b) {
            return fn(_a2, _b, c2);
          }) : _isPlaceholder(a2) && _isPlaceholder(c2) ? _curry2(function(_a2, _c) {
            return fn(_a2, b, _c);
          }) : _isPlaceholder(b) && _isPlaceholder(c2) ? _curry2(function(_b, _c) {
            return fn(a2, _b, _c);
          }) : _isPlaceholder(a2) ? _curry1(function(_a2) {
            return fn(_a2, b, c2);
          }) : _isPlaceholder(b) ? _curry1(function(_b) {
            return fn(a2, _b, c2);
          }) : _isPlaceholder(c2) ? _curry1(function(_c) {
            return fn(a2, b, _c);
          }) : fn(a2, b, c2);
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
  var max$2 = /* @__PURE__ */ _curry2(function max2(a2, b) {
    return b > a2 ? b : a2;
  });
  const max$3 = max$2;
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
    function XMap2(f2, xf) {
      this.xf = xf;
      this.f = f2;
    }
    XMap2.prototype["@@transducer/init"] = _xfBase.init;
    XMap2.prototype["@@transducer/result"] = _xfBase.result;
    XMap2.prototype["@@transducer/step"] = function(result, input) {
      return this.xf["@@transducer/step"](result, this.f(input));
    };
    return XMap2;
  }();
  var _xmap = /* @__PURE__ */ _curry2(function _xmap2(f2, xf) {
    return new XMap(f2, xf);
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
  var contains$1 = function contains2(list, item) {
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
        if (_has(prop2, obj) && !contains$1(ks, prop2)) {
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
  const _isInteger = Number.isInteger || function _isInteger2(n2) {
    return n2 << 0 === n2;
  };
  var nth = /* @__PURE__ */ _curry2(function nth2(offset2, list) {
    var idx = offset2 < 0 ? list.length + offset2 : offset2;
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
    return curryN$1(reduce$1(max$3, 0, pluck$1("length", preds)), function() {
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
  var ascend = /* @__PURE__ */ _curry3(function ascend2(fn, a2, b) {
    var aa = fn(a2);
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
  function _pipe(f2, g) {
    return function() {
      return g.call(this, f2.apply(this, arguments));
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
  function _functionName(f2) {
    var match = String(f2).match(/^function (\w*)/);
    return match == null ? "" : match[1];
  }
  function _objectIs(a2, b) {
    if (a2 === b) {
      return a2 !== 0 || 1 / a2 === 1 / b;
    } else {
      return a2 !== a2 && b !== b;
    }
  }
  const _objectIs$1 = typeof Object.is === "function" ? Object.is : _objectIs;
  function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
    var a2 = _arrayFromIterator(aIterator);
    var b = _arrayFromIterator(bIterator);
    function eq(_a2, _b) {
      return _equals(_a2, _b, stackA.slice(), stackB.slice());
    }
    return !_includesWith(function(b2, aItem) {
      return !_includesWith(eq, aItem, b2);
    }, b, a2);
  }
  function _equals(a2, b, stackA, stackB) {
    if (_objectIs$1(a2, b)) {
      return true;
    }
    var typeA = type$1(a2);
    if (typeA !== type$1(b)) {
      return false;
    }
    if (typeof a2["fantasy-land/equals"] === "function" || typeof b["fantasy-land/equals"] === "function") {
      return typeof a2["fantasy-land/equals"] === "function" && a2["fantasy-land/equals"](b) && typeof b["fantasy-land/equals"] === "function" && b["fantasy-land/equals"](a2);
    }
    if (typeof a2.equals === "function" || typeof b.equals === "function") {
      return typeof a2.equals === "function" && a2.equals(b) && typeof b.equals === "function" && b.equals(a2);
    }
    switch (typeA) {
      case "Arguments":
      case "Array":
      case "Object":
        if (typeof a2.constructor === "function" && _functionName(a2.constructor) === "Promise") {
          return a2 === b;
        }
        break;
      case "Boolean":
      case "Number":
      case "String":
        if (!(typeof a2 === typeof b && _objectIs$1(a2.valueOf(), b.valueOf()))) {
          return false;
        }
        break;
      case "Date":
        if (!_objectIs$1(a2.valueOf(), b.valueOf())) {
          return false;
        }
        break;
      case "Error":
        return a2.name === b.name && a2.message === b.message;
      case "RegExp":
        if (!(a2.source === b.source && a2.global === b.global && a2.ignoreCase === b.ignoreCase && a2.multiline === b.multiline && a2.sticky === b.sticky && a2.unicode === b.unicode)) {
          return false;
        }
        break;
    }
    var idx = stackA.length - 1;
    while (idx >= 0) {
      if (stackA[idx] === a2) {
        return stackB[idx] === b;
      }
      idx -= 1;
    }
    switch (typeA) {
      case "Map":
        if (a2.size !== b.size) {
          return false;
        }
        return _uniqContentEquals(a2.entries(), b.entries(), stackA.concat([a2]), stackB.concat([b]));
      case "Set":
        if (a2.size !== b.size) {
          return false;
        }
        return _uniqContentEquals(a2.values(), b.values(), stackA.concat([a2]), stackB.concat([b]));
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
    var keysA = keys$1(a2);
    if (keysA.length !== keys$1(b).length) {
      return false;
    }
    var extendedStackA = stackA.concat([a2]);
    var extendedStackB = stackB.concat([b]);
    idx = keysA.length - 1;
    while (idx >= 0) {
      var key = keysA[idx];
      if (!(_has(key, b) && _equals(b[key], a2[key], extendedStackA, extendedStackB))) {
        return false;
      }
      idx -= 1;
    }
    return true;
  }
  var equals = /* @__PURE__ */ _curry2(function equals2(a2, b) {
    return _equals(a2, b, [], []);
  });
  const equals$1 = equals;
  function _indexOf(list, a2, idx) {
    var inf, item;
    if (typeof list.indexOf === "function") {
      switch (typeof a2) {
        case "number":
          if (a2 === 0) {
            inf = 1 / a2;
            while (idx < list.length) {
              item = list[idx];
              if (item === 0 && 1 / item === inf) {
                return idx;
              }
              idx += 1;
            }
            return -1;
          } else if (a2 !== a2) {
            while (idx < list.length) {
              item = list[idx];
              if (typeof item === "number" && item !== item) {
                return idx;
              }
              idx += 1;
            }
            return -1;
          }
          return list.indexOf(a2, idx);
        case "string":
        case "boolean":
        case "function":
        case "undefined":
          return list.indexOf(a2, idx);
        case "object":
          if (a2 === null) {
            return list.indexOf(a2, idx);
          }
      }
    }
    while (idx < list.length) {
      if (equals$1(list[idx], a2)) {
        return idx;
      }
      idx += 1;
    }
    return -1;
  }
  function _includes(a2, list) {
    return _indexOf(list, a2, 0) >= 0;
  }
  function _quote(s2) {
    var escaped = s2.replace(/\\/g, "\\\\").replace(/[\b]/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\v/g, "\\v").replace(/\0/g, "\\0");
    return '"' + escaped.replace(/"/g, '\\"') + '"';
  }
  var pad = function pad2(n2) {
    return (n2 < 10 ? "0" : "") + n2;
  };
  var _toISOString = typeof Date.prototype.toISOString === "function" ? function _toISOString2(d) {
    return d.toISOString();
  } : function _toISOString2(d) {
    return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "." + (d.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z";
  };
  const _toISOString$1 = _toISOString;
  function _complement(f2) {
    return function() {
      return !f2.apply(this, arguments);
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
    function XFilter2(f2, xf) {
      this.xf = xf;
      this.f = f2;
    }
    XFilter2.prototype["@@transducer/init"] = _xfBase.init;
    XFilter2.prototype["@@transducer/result"] = _xfBase.result;
    XFilter2.prototype["@@transducer/step"] = function(result, input) {
      return this.f(input) ? this.xf["@@transducer/step"](result, input) : result;
    };
    return XFilter2;
  }();
  var _xfilter = /* @__PURE__ */ _curry2(function _xfilter2(f2, xf) {
    return new XFilter(f2, xf);
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
  var descend = /* @__PURE__ */ _curry3(function descend2(fn, a2, b) {
    var aa = fn(a2);
    var bb = fn(b);
    return aa > bb ? -1 : aa < bb ? 1 : 0;
  });
  const descend$1 = descend;
  function _isTypedArray(val) {
    var type2 = Object.prototype.toString.call(val);
    return type2 === "[object Uint8ClampedArray]" || type2 === "[object Int8Array]" || type2 === "[object Uint8Array]" || type2 === "[object Int16Array]" || type2 === "[object Uint16Array]" || type2 === "[object Int32Array]" || type2 === "[object Uint32Array]" || type2 === "[object Float32Array]" || type2 === "[object Float64Array]" || type2 === "[object BigInt64Array]" || type2 === "[object BigUint64Array]";
  }
  var empty = /* @__PURE__ */ _curry1(function empty2(x) {
    return x != null && typeof x["fantasy-land/empty"] === "function" ? x["fantasy-land/empty"]() : x != null && x.constructor != null && typeof x.constructor["fantasy-land/empty"] === "function" ? x.constructor["fantasy-land/empty"]() : x != null && typeof x.empty === "function" ? x.empty() : x != null && x.constructor != null && typeof x.constructor.empty === "function" ? x.constructor.empty() : _isArray(x) ? [] : _isString(x) ? "" : _isObject(x) ? {} : _isArguments$1(x) ? function() {
      return arguments;
    }() : _isTypedArray(x) ? x.constructor.from("") : void 0;
  });
  const empty$1 = empty;
  var XFindIndex = /* @__PURE__ */ function() {
    function XFindIndex2(f2, xf) {
      this.xf = xf;
      this.f = f2;
      this.idx = -1;
      this.found = false;
    }
    XFindIndex2.prototype["@@transducer/init"] = _xfBase.init;
    XFindIndex2.prototype["@@transducer/result"] = function(result) {
      if (!this.found) {
        result = this.xf["@@transducer/step"](result, -1);
      }
      return this.xf["@@transducer/result"](result);
    };
    XFindIndex2.prototype["@@transducer/step"] = function(result, input) {
      this.idx += 1;
      if (this.f(input)) {
        this.found = true;
        result = _reduced(this.xf["@@transducer/step"](result, this.idx));
      }
      return result;
    };
    return XFindIndex2;
  }();
  var _xfindIndex = /* @__PURE__ */ _curry2(function _xfindIndex2(f2, xf) {
    return new XFindIndex(f2, xf);
  });
  const _xfindIndex$1 = _xfindIndex;
  var findIndex = /* @__PURE__ */ _curry2(
    /* @__PURE__ */ _dispatchable([], _xfindIndex$1, function findIndex2(fn, list) {
      var idx = 0;
      var len = list.length;
      while (idx < len) {
        if (fn(list[idx])) {
          return idx;
        }
        idx += 1;
      }
      return -1;
    })
  );
  const findIndex$1 = findIndex;
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
  var isEmpty = /* @__PURE__ */ _curry1(function isEmpty2(x) {
    return x != null && equals$1(x, empty$1(x));
  });
  const isEmpty$1 = isEmpty;
  var paths = /* @__PURE__ */ _curry2(function paths2(pathsArray, obj) {
    return pathsArray.map(function(paths3) {
      var val = obj;
      var idx = 0;
      var p;
      while (idx < paths3.length) {
        if (val == null) {
          return;
        }
        p = paths3[idx];
        val = _isInteger(p) ? nth$1(p, val) : val[p];
        idx += 1;
      }
      return val;
    });
  });
  const paths$1 = paths;
  var path = /* @__PURE__ */ _curry2(function path2(pathAr, obj) {
    return paths$1([pathAr], obj)[0];
  });
  const path$1 = path;
  var omit = /* @__PURE__ */ _curry2(function omit2(names, obj) {
    var result = {};
    var index = {};
    var idx = 0;
    var len = names.length;
    while (idx < len) {
      index[names[idx]] = 1;
      idx += 1;
    }
    for (var prop2 in obj) {
      if (!index.hasOwnProperty(prop2)) {
        result[prop2] = obj[prop2];
      }
    }
    return result;
  });
  const omit$1 = omit;
  var propEq = /* @__PURE__ */ _curry3(function propEq2(name, val, obj) {
    return equals$1(val, prop$1(name, obj));
  });
  const propEq$1 = propEq;
  var propSatisfies = /* @__PURE__ */ _curry3(function propSatisfies2(pred, name, obj) {
    return pred(prop$1(name, obj));
  });
  const propSatisfies$1 = propSatisfies;
  var sortWith = /* @__PURE__ */ _curry2(function sortWith2(fns, list) {
    return Array.prototype.slice.call(list, 0).sort(function(a2, b) {
      var result = 0;
      var i = 0;
      while (result === 0 && i < fns.length) {
        result = fns[i](a2, b);
        i += 1;
      }
      return result;
    });
  });
  const sortWith$1 = sortWith;
  var split = /* @__PURE__ */ invoker$1(1, "split");
  const split$1 = split;
  var toLower = /* @__PURE__ */ invoker$1(0, "toLowerCase");
  const toLower$1 = toLower;
  var ws = "	\n\v\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";
  var zeroWidth = "\u200B";
  var hasProtoTrim = typeof String.prototype.trim === "function";
  var trim = !hasProtoTrim || /* @__PURE__ */ ws.trim() || !/* @__PURE__ */ zeroWidth.trim() ? /* @__PURE__ */ _curry1(function trim2(str) {
    var beginRx = new RegExp("^[" + ws + "][" + ws + "]*");
    var endRx = new RegExp("[" + ws + "][" + ws + "]*$");
    return str.replace(beginRx, "").replace(endRx, "");
  }) : /* @__PURE__ */ _curry1(function trim2(str) {
    return str.trim();
  });
  const trim$1 = trim;
  const I18nContext = Symbol("I18nContext");
  const state = vue.reactive({
    messages: {},
    locale: "",
    fallbackLocale: ""
  });
  const createI18n = ({ messages = {}, locale = "", fallbackLocale = "" }) => {
    state.messages = messages;
    state.locale = locale;
    state.fallbackLocale = fallbackLocale;
    const translate = (key, data = {}) => {
      const hasInterpolation = !isEmpty$1(data);
      const keyArray = map$1(trim$1, split$1(".", key));
      const translation = vue.computed(() => {
        const rawTransition = resolveTransition(keyArray);
        return hasInterpolation ? replacer(rawTransition, data) : rawTransition;
      });
      return translation.value;
    };
    const hasTranlation = (key) => {
      const keyArray = map$1(trim$1, split$1(".", key));
      return Boolean(getTranslation(state.locale, keyArray, state.messages));
    };
    const setLocale = (locale2) => {
      state.locale = locale2;
    };
    const reactiveLocale = vue.computed({
      get() {
        return state.locale;
      },
      set(locale2) {
        state.locale = locale2;
      }
    });
    const api = {
      locale: reactiveLocale,
      setLocale,
      translate,
      hasTranlation
    };
    vue.provide(I18nContext, api);
  };
  const useI18n = (settings) => {
    if (settings) {
      state.messages = settings.messages;
      state.locale = settings.locale;
      state.fallbackLocale = settings.fallbackLocale;
    }
    const api = useI18nContext();
    return {
      locale: api.locale,
      t: api.translate,
      setLocale: api.setLocale,
      hasTranlation: api.hasTranlation
    };
  };
  const useI18nContext = () => {
    const api = vue.inject(I18nContext, null);
    if (api === null) {
      throw new Error("Privider is missing a parent component.");
    }
    return api;
  };
  const resolveTransition = (keys2 = []) => {
    let rawTransition = getTranslation(state.locale, keys2, state.messages);
    if (!rawTransition && state.fallbackLocale) {
      rawTransition = getTranslation(state.fallbackLocale, keys2, state.messages);
    }
    if (!rawTransition)
      return keys2.join(".");
    return rawTransition;
  };
  function getTranslation(locale, keys2, messages) {
    return path$1([locale, ...keys2], messages);
  }
  const replacer = function(tpl, data) {
    return tpl.replace(/\{(\w+)\}/g, function($1, $2) {
      return data[$2];
    });
  };
  const i18n = vue.defineComponent({
    props: {
      tag: {
        type: String,
        default: "div"
      },
      path: {
        type: String,
        defult: ""
      }
    },
    setup(props, { slots }) {
      const keys2 = map$1(trim$1, split$1(".", props.path));
      const transition = resolveTransition(keys2);
      const interpolationItems = split$1(/{|}/, transition);
      const children = Object.keys(slots).map((item) => {
        const index = interpolationItems.indexOf(item);
        if (index > -1)
          interpolationItems[index] = slots[item]()[0];
        return interpolationItems;
      });
      return () => vue.h(props.tag, children);
    }
  });
  const DEFAULT_EXTERNAL_BASE_URL = "https://www.jegkorongszovetseg.hu/event/game/";
  const DEFAULT_PORTRAIT_IMAGE_URL = "https://jegkorongszovetseg.hu/assets/images/player_blank.png";
  const DEFAULT_EXTERNAL_PLAYER_URL = "https://www.ersteliga.hu/stats/players#/player/3314/";
  const DEFAULT_EXTERNAL_TEAM_URL = "https://www.ersteliga.hu/stats/teams#/team/3314/21096?name=";
  const SORT_STATE_ORIGINAL = "original";
  const SORT_STATE_DESCEND = "descend";
  const SORT_STATE_ASCEND = "ascend";
  const LOCALE_FOR_LANG = (/* @__PURE__ */ new Map()).set("hu", "hu-hu").set("en", "hu-gb");
  const AVAILABLE_TIMEZONES_BY_COUNTRY = (/* @__PURE__ */ new Map()).set("Europe/Budapest", { countryLabelKey: "hungary", timezone: "Europe/Budapest" }).set("Europe/Bucharest", { countryLabelKey: "romania", timezone: "Europe/Bucharest" });
  const VBR_API_GOALIE_PATH = "/v1/playersGoaliePeriod";
  const VBR_API_GOALIE_UNDER_PATH = "/v1/playersGoalieUnderPeriod";
  const REFRESH_DELAY = 1e3 * 60 * 5;
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$g = {};
  const _hoisted_1$c = {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "sort",
    class: "svg-inline--fa fa-sort fa-w-10",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 320 512"
  };
  const _hoisted_2$9 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
  }, null, -1);
  const _hoisted_3$8 = [
    _hoisted_2$9
  ];
  function _sfc_render$6(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$c, _hoisted_3$8);
  }
  const IconSort = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$6]]);
  const _sfc_main$f = {};
  const _hoisted_1$b = {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "sort-down",
    class: "svg-inline--fa fa-sort-down fa-w-10",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 320 512"
  };
  const _hoisted_2$8 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
  }, null, -1);
  const _hoisted_3$7 = [
    _hoisted_2$8
  ];
  function _sfc_render$5(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$b, _hoisted_3$7);
  }
  const IconSortAsc = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$5]]);
  const _sfc_main$e = {};
  const _hoisted_1$a = {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "sort-up",
    class: "svg-inline--fa fa-sort-up fa-w-10",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 320 512"
  };
  const _hoisted_2$7 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
  }, null, -1);
  const _hoisted_3$6 = [
    _hoisted_2$7
  ];
  function _sfc_render$4(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$a, _hoisted_3$6);
  }
  const IconSortDesc = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$4]]);
  function getSide(placement) {
    return placement.split("-")[0];
  }
  function getAlignment(placement) {
    return placement.split("-")[1];
  }
  function getMainAxisFromPlacement(placement) {
    return ["top", "bottom"].includes(getSide(placement)) ? "x" : "y";
  }
  function getLengthFromAxis(axis) {
    return axis === "y" ? "height" : "width";
  }
  function computeCoordsFromPlacement(_ref, placement, rtl) {
    let {
      reference,
      floating
    } = _ref;
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    const mainAxis = getMainAxisFromPlacement(placement);
    const length = getLengthFromAxis(mainAxis);
    const commonAlign = reference[length] / 2 - floating[length] / 2;
    const side = getSide(placement);
    const isVertical = mainAxis === "x";
    let coords;
    switch (side) {
      case "top":
        coords = {
          x: commonX,
          y: reference.y - floating.height
        };
        break;
      case "bottom":
        coords = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
      case "right":
        coords = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
      case "left":
        coords = {
          x: reference.x - floating.width,
          y: commonY
        };
        break;
      default:
        coords = {
          x: reference.x,
          y: reference.y
        };
    }
    switch (getAlignment(placement)) {
      case "start":
        coords[mainAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
        break;
      case "end":
        coords[mainAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
        break;
    }
    return coords;
  }
  const computePosition$1 = async (reference, floating, config) => {
    const {
      placement = "bottom",
      strategy = "absolute",
      middleware = [],
      platform: platform2
    } = config;
    const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
    let rects = await platform2.getElementRects({
      reference,
      floating,
      strategy
    });
    let {
      x,
      y
    } = computeCoordsFromPlacement(rects, placement, rtl);
    let statefulPlacement = placement;
    let middlewareData = {};
    let resetCount = 0;
    for (let i = 0; i < middleware.length; i++) {
      const {
        name,
        fn
      } = middleware[i];
      const {
        x: nextX,
        y: nextY,
        data,
        reset
      } = await fn({
        x,
        y,
        initialPlacement: placement,
        placement: statefulPlacement,
        strategy,
        middlewareData,
        rects,
        platform: platform2,
        elements: {
          reference,
          floating
        }
      });
      x = nextX != null ? nextX : x;
      y = nextY != null ? nextY : y;
      middlewareData = {
        ...middlewareData,
        [name]: {
          ...middlewareData[name],
          ...data
        }
      };
      if (reset && resetCount <= 50) {
        resetCount++;
        if (typeof reset === "object") {
          if (reset.placement) {
            statefulPlacement = reset.placement;
          }
          if (reset.rects) {
            rects = reset.rects === true ? await platform2.getElementRects({
              reference,
              floating,
              strategy
            }) : reset.rects;
          }
          ({
            x,
            y
          } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
        }
        i = -1;
        continue;
      }
    }
    return {
      x,
      y,
      placement: statefulPlacement,
      strategy,
      middlewareData
    };
  };
  function expandPaddingObject(padding) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...padding
    };
  }
  function getSideObjectFromPadding(padding) {
    return typeof padding !== "number" ? expandPaddingObject(padding) : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }
  function rectToClientRect(rect) {
    return {
      ...rect,
      top: rect.y,
      left: rect.x,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    };
  }
  async function detectOverflow(middlewareArguments, options) {
    var _await$platform$isEle;
    if (options === void 0) {
      options = {};
    }
    const {
      x,
      y,
      platform: platform2,
      rects,
      elements,
      strategy
    } = middlewareArguments;
    const {
      boundary = "clippingAncestors",
      rootBoundary = "viewport",
      elementContext = "floating",
      altBoundary = false,
      padding = 0
    } = options;
    const paddingObject = getSideObjectFromPadding(padding);
    const altContext = elementContext === "floating" ? "reference" : "floating";
    const element = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
      element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
      boundary,
      rootBoundary,
      strategy
    }));
    const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
      rect: elementContext === "floating" ? {
        ...rects.floating,
        x,
        y
      } : rects.reference,
      offsetParent: await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating)),
      strategy
    }) : rects[elementContext]);
    return {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
  }
  const min$1 = Math.min;
  const max$1 = Math.max;
  function within(min$1$1, value, max$1$1) {
    return max$1(min$1$1, min$1(value, max$1$1));
  }
  const arrow$1 = (options) => ({
    name: "arrow",
    options,
    async fn(middlewareArguments) {
      const {
        element,
        padding = 0
      } = options != null ? options : {};
      const {
        x,
        y,
        placement,
        rects,
        platform: platform2
      } = middlewareArguments;
      if (element == null) {
        return {};
      }
      const paddingObject = getSideObjectFromPadding(padding);
      const coords = {
        x,
        y
      };
      const axis = getMainAxisFromPlacement(placement);
      const alignment = getAlignment(placement);
      const length = getLengthFromAxis(axis);
      const arrowDimensions = await platform2.getDimensions(element);
      const minProp = axis === "y" ? "top" : "left";
      const maxProp = axis === "y" ? "bottom" : "right";
      const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
      const startDiff = coords[axis] - rects.reference[axis];
      const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
      let clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
      if (clientSize === 0) {
        clientSize = rects.floating[length];
      }
      const centerToReference = endDiff / 2 - startDiff / 2;
      const min2 = paddingObject[minProp];
      const max2 = clientSize - arrowDimensions[length] - paddingObject[maxProp];
      const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
      const offset2 = within(min2, center, max2);
      const alignmentPadding = alignment === "start" ? paddingObject[minProp] : paddingObject[maxProp];
      const shouldAddOffset = alignmentPadding > 0 && center !== offset2 && rects.reference[length] <= rects.floating[length];
      const alignmentOffset = shouldAddOffset ? center < min2 ? min2 - center : max2 - center : 0;
      return {
        [axis]: coords[axis] - alignmentOffset,
        data: {
          [axis]: offset2,
          centerOffset: center - offset2
        }
      };
    }
  });
  const hash$1 = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, (matched) => hash$1[matched]);
  }
  function getAlignmentSides(placement, rects, rtl) {
    if (rtl === void 0) {
      rtl = false;
    }
    const alignment = getAlignment(placement);
    const mainAxis = getMainAxisFromPlacement(placement);
    const length = getLengthFromAxis(mainAxis);
    let mainAlignmentSide = mainAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
    if (rects.reference[length] > rects.floating[length]) {
      mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }
    return {
      main: mainAlignmentSide,
      cross: getOppositePlacement(mainAlignmentSide)
    };
  }
  const hash = {
    start: "end",
    end: "start"
  };
  function getOppositeAlignmentPlacement(placement) {
    return placement.replace(/start|end/g, (matched) => hash[matched]);
  }
  function getExpandedPlacements(placement) {
    const oppositePlacement = getOppositePlacement(placement);
    return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
  }
  const flip = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "flip",
      options,
      async fn(middlewareArguments) {
        var _middlewareData$flip;
        const {
          placement,
          middlewareData,
          rects,
          initialPlacement,
          platform: platform2,
          elements
        } = middlewareArguments;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true,
          fallbackPlacements: specifiedFallbackPlacements,
          fallbackStrategy = "bestFit",
          flipAlignment = true,
          ...detectOverflowOptions
        } = options;
        const side = getSide(placement);
        const isBasePlacement = side === initialPlacement;
        const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
        const placements = [initialPlacement, ...fallbackPlacements];
        const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
        const overflows = [];
        let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
        if (checkMainAxis) {
          overflows.push(overflow[side]);
        }
        if (checkCrossAxis) {
          const {
            main,
            cross
          } = getAlignmentSides(placement, rects, await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)));
          overflows.push(overflow[main], overflow[cross]);
        }
        overflowsData = [...overflowsData, {
          placement,
          overflows
        }];
        if (!overflows.every((side2) => side2 <= 0)) {
          var _middlewareData$flip$, _middlewareData$flip2;
          const nextIndex = ((_middlewareData$flip$ = (_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) != null ? _middlewareData$flip$ : 0) + 1;
          const nextPlacement = placements[nextIndex];
          if (nextPlacement) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
          let resetPlacement = "bottom";
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$map$so;
              const placement2 = (_overflowsData$map$so = overflowsData.map((d) => [d, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a2, b) => a2[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0].placement;
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
          if (placement !== resetPlacement) {
            return {
              reset: {
                placement: resetPlacement
              }
            };
          }
        }
        return {};
      }
    };
  };
  async function convertValueToCoords(middlewareArguments, value) {
    const {
      placement,
      platform: platform2,
      elements
    } = middlewareArguments;
    const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
    const side = getSide(placement);
    const alignment = getAlignment(placement);
    const isVertical = getMainAxisFromPlacement(placement) === "x";
    const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
    const crossAxisMulti = rtl && isVertical ? -1 : 1;
    const rawValue = typeof value === "function" ? value(middlewareArguments) : value;
    let {
      mainAxis,
      crossAxis,
      alignmentAxis
    } = typeof rawValue === "number" ? {
      mainAxis: rawValue,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: 0,
      crossAxis: 0,
      alignmentAxis: null,
      ...rawValue
    };
    if (alignment && typeof alignmentAxis === "number") {
      crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
    }
    return isVertical ? {
      x: crossAxis * crossAxisMulti,
      y: mainAxis * mainAxisMulti
    } : {
      x: mainAxis * mainAxisMulti,
      y: crossAxis * crossAxisMulti
    };
  }
  const offset = function(value) {
    if (value === void 0) {
      value = 0;
    }
    return {
      name: "offset",
      options: value,
      async fn(middlewareArguments) {
        const {
          x,
          y
        } = middlewareArguments;
        const diffCoords = await convertValueToCoords(middlewareArguments, value);
        return {
          x: x + diffCoords.x,
          y: y + diffCoords.y,
          data: diffCoords
        };
      }
    };
  };
  function getCrossAxis(axis) {
    return axis === "x" ? "y" : "x";
  }
  const shift = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "shift",
      options,
      async fn(middlewareArguments) {
        const {
          x,
          y,
          placement
        } = middlewareArguments;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = false,
          limiter = {
            fn: (_ref) => {
              let {
                x: x2,
                y: y2
              } = _ref;
              return {
                x: x2,
                y: y2
              };
            }
          },
          ...detectOverflowOptions
        } = options;
        const coords = {
          x,
          y
        };
        const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
        const mainAxis = getMainAxisFromPlacement(getSide(placement));
        const crossAxis = getCrossAxis(mainAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        if (checkMainAxis) {
          const minSide = mainAxis === "y" ? "top" : "left";
          const maxSide = mainAxis === "y" ? "bottom" : "right";
          const min2 = mainAxisCoord + overflow[minSide];
          const max2 = mainAxisCoord - overflow[maxSide];
          mainAxisCoord = within(min2, mainAxisCoord, max2);
        }
        if (checkCrossAxis) {
          const minSide = crossAxis === "y" ? "top" : "left";
          const maxSide = crossAxis === "y" ? "bottom" : "right";
          const min2 = crossAxisCoord + overflow[minSide];
          const max2 = crossAxisCoord - overflow[maxSide];
          crossAxisCoord = within(min2, crossAxisCoord, max2);
        }
        const limitedCoords = limiter.fn({
          ...middlewareArguments,
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        });
        return {
          ...limitedCoords,
          data: {
            x: limitedCoords.x - x,
            y: limitedCoords.y - y
          }
        };
      }
    };
  };
  function isWindow(value) {
    return value && value.document && value.location && value.alert && value.setInterval;
  }
  function getWindow(node) {
    if (node == null) {
      return window;
    }
    if (!isWindow(node)) {
      const ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }
    return node;
  }
  function getComputedStyle(element) {
    return getWindow(element).getComputedStyle(element);
  }
  function getNodeName(node) {
    return isWindow(node) ? "" : node ? (node.nodeName || "").toLowerCase() : "";
  }
  function getUAString() {
    const uaData = navigator.userAgentData;
    if (uaData != null && uaData.brands) {
      return uaData.brands.map((item) => item.brand + "/" + item.version).join(" ");
    }
    return navigator.userAgent;
  }
  function isHTMLElement(value) {
    return value instanceof getWindow(value).HTMLElement;
  }
  function isElement(value) {
    return value instanceof getWindow(value).Element;
  }
  function isNode(value) {
    return value instanceof getWindow(value).Node;
  }
  function isShadowRoot(node) {
    if (typeof ShadowRoot === "undefined") {
      return false;
    }
    const OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }
  function isOverflowElement(element) {
    const {
      overflow,
      overflowX,
      overflowY
    } = getComputedStyle(element);
    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }
  function isTableElement(element) {
    return ["table", "td", "th"].includes(getNodeName(element));
  }
  function isContainingBlock(element) {
    const isFirefox = /firefox/i.test(getUAString());
    const css = getComputedStyle(element);
    return css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].includes(css.willChange) || isFirefox && css.willChange === "filter" || isFirefox && (css.filter ? css.filter !== "none" : false);
  }
  function isLayoutViewport() {
    return !/^((?!chrome|android).)*safari/i.test(getUAString());
  }
  const min = Math.min;
  const max = Math.max;
  const round = Math.round;
  function getBoundingClientRect(element, includeScale, isFixedStrategy) {
    var _win$visualViewport$o, _win$visualViewport, _win$visualViewport$o2, _win$visualViewport2;
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    const clientRect = element.getBoundingClientRect();
    let scaleX = 1;
    let scaleY = 1;
    if (includeScale && isHTMLElement(element)) {
      scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
      scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
    }
    const win = isElement(element) ? getWindow(element) : window;
    const addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
    const x = (clientRect.left + (addVisualOffsets ? (_win$visualViewport$o = (_win$visualViewport = win.visualViewport) == null ? void 0 : _win$visualViewport.offsetLeft) != null ? _win$visualViewport$o : 0 : 0)) / scaleX;
    const y = (clientRect.top + (addVisualOffsets ? (_win$visualViewport$o2 = (_win$visualViewport2 = win.visualViewport) == null ? void 0 : _win$visualViewport2.offsetTop) != null ? _win$visualViewport$o2 : 0 : 0)) / scaleY;
    const width = clientRect.width / scaleX;
    const height = clientRect.height / scaleY;
    return {
      width,
      height,
      top: y,
      right: x + width,
      bottom: y + height,
      left: x,
      x,
      y
    };
  }
  function getDocumentElement(node) {
    return ((isNode(node) ? node.ownerDocument : node.document) || window.document).documentElement;
  }
  function getNodeScroll(element) {
    if (isElement(element)) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
    return {
      scrollLeft: element.pageXOffset,
      scrollTop: element.pageYOffset
    };
  }
  function getWindowScrollBarX(element) {
    return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
  }
  function isScaled(element) {
    const rect = getBoundingClientRect(element);
    return round(rect.width) !== element.offsetWidth || round(rect.height) !== element.offsetHeight;
  }
  function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    const rect = getBoundingClientRect(
      element,
      isOffsetParentAnElement && isScaled(offsetParent),
      strategy === "fixed"
    );
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = {
      x: 0,
      y: 0
    };
    if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
      if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent, true);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }
    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }
  function getParentNode(node) {
    if (getNodeName(node) === "html") {
      return node;
    }
    return node.assignedSlot || node.parentNode || (isShadowRoot(node) ? node.host : null) || getDocumentElement(node);
  }
  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
      return null;
    }
    return element.offsetParent;
  }
  function getContainingBlock(element) {
    let currentNode = getParentNode(element);
    if (isShadowRoot(currentNode)) {
      currentNode = currentNode.host;
    }
    while (isHTMLElement(currentNode) && !["html", "body"].includes(getNodeName(currentNode))) {
      if (isContainingBlock(currentNode)) {
        return currentNode;
      } else {
        const parent = currentNode.parentNode;
        currentNode = isShadowRoot(parent) ? parent.host : parent;
      }
    }
    return null;
  }
  function getOffsetParent(element) {
    const window2 = getWindow(element);
    let offsetParent = getTrueOffsetParent(element);
    while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
      offsetParent = getTrueOffsetParent(offsetParent);
    }
    if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static" && !isContainingBlock(offsetParent))) {
      return window2;
    }
    return offsetParent || getContainingBlock(element) || window2;
  }
  function getDimensions(element) {
    if (isHTMLElement(element)) {
      return {
        width: element.offsetWidth,
        height: element.offsetHeight
      };
    }
    const rect = getBoundingClientRect(element);
    return {
      width: rect.width,
      height: rect.height
    };
  }
  function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    let {
      rect,
      offsetParent,
      strategy
    } = _ref;
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    if (offsetParent === documentElement) {
      return rect;
    }
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = {
      x: 0,
      y: 0
    };
    if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
      if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent, true);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    return {
      ...rect,
      x: rect.x - scroll.scrollLeft + offsets.x,
      y: rect.y - scroll.scrollTop + offsets.y
    };
  }
  function getViewportRect(element, strategy) {
    const win = getWindow(element);
    const html = getDocumentElement(element);
    const visualViewport = win.visualViewport;
    let width = html.clientWidth;
    let height = html.clientHeight;
    let x = 0;
    let y = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      const layoutViewport = isLayoutViewport();
      if (layoutViewport || !layoutViewport && strategy === "fixed") {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
    return {
      width,
      height,
      x,
      y
    };
  }
  function getDocumentRect(element) {
    var _element$ownerDocumen;
    const html = getDocumentElement(element);
    const scroll = getNodeScroll(element);
    const body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    const width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    const height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    let x = -scroll.scrollLeft + getWindowScrollBarX(element);
    const y = -scroll.scrollTop;
    if (getComputedStyle(body || html).direction === "rtl") {
      x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }
    return {
      width,
      height,
      x,
      y
    };
  }
  function getNearestOverflowAncestor(node) {
    const parentNode = getParentNode(node);
    if (["html", "body", "#document"].includes(getNodeName(parentNode))) {
      return node.ownerDocument.body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
      return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
  }
  function getOverflowAncestors(node, list) {
    var _node$ownerDocument;
    if (list === void 0) {
      list = [];
    }
    const scrollableAncestor = getNearestOverflowAncestor(node);
    const isBody = scrollableAncestor === ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.body);
    const win = getWindow(scrollableAncestor);
    const target = isBody ? [win].concat(win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []) : scrollableAncestor;
    const updatedList = list.concat(target);
    return isBody ? updatedList : updatedList.concat(getOverflowAncestors(target));
  }
  function contains(parent, child) {
    const rootNode = child.getRootNode == null ? void 0 : child.getRootNode();
    if (parent.contains(child)) {
      return true;
    } else if (rootNode && isShadowRoot(rootNode)) {
      let next = child;
      do {
        if (next && parent === next) {
          return true;
        }
        next = next.parentNode || next.host;
      } while (next);
    }
    return false;
  }
  function getInnerBoundingClientRect(element, strategy) {
    const clientRect = getBoundingClientRect(element, false, strategy === "fixed");
    const top = clientRect.top + element.clientTop;
    const left = clientRect.left + element.clientLeft;
    return {
      top,
      left,
      x: left,
      y: top,
      right: left + element.clientWidth,
      bottom: top + element.clientHeight,
      width: element.clientWidth,
      height: element.clientHeight
    };
  }
  function getClientRectFromClippingAncestor(element, clippingParent, strategy) {
    if (clippingParent === "viewport") {
      return rectToClientRect(getViewportRect(element, strategy));
    }
    if (isElement(clippingParent)) {
      return getInnerBoundingClientRect(clippingParent, strategy);
    }
    return rectToClientRect(getDocumentRect(getDocumentElement(element)));
  }
  function getClippingAncestors(element) {
    const clippingAncestors = getOverflowAncestors(element);
    const canEscapeClipping = ["absolute", "fixed"].includes(getComputedStyle(element).position);
    const clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
    if (!isElement(clipperElement)) {
      return [];
    }
    return clippingAncestors.filter((clippingAncestors2) => isElement(clippingAncestors2) && contains(clippingAncestors2, clipperElement) && getNodeName(clippingAncestors2) !== "body");
  }
  function getClippingRect(_ref) {
    let {
      element,
      boundary,
      rootBoundary,
      strategy
    } = _ref;
    const mainClippingAncestors = boundary === "clippingAncestors" ? getClippingAncestors(element) : [].concat(boundary);
    const clippingAncestors = [...mainClippingAncestors, rootBoundary];
    const firstClippingAncestor = clippingAncestors[0];
    const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
      const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
    return {
      width: clippingRect.right - clippingRect.left,
      height: clippingRect.bottom - clippingRect.top,
      x: clippingRect.left,
      y: clippingRect.top
    };
  }
  const platform = {
    getClippingRect,
    convertOffsetParentRelativeRectToViewportRelativeRect,
    isElement,
    getDimensions,
    getOffsetParent,
    getDocumentElement,
    getElementRects: (_ref) => {
      let {
        reference,
        floating,
        strategy
      } = _ref;
      return {
        reference: getRectRelativeToOffsetParent(reference, getOffsetParent(floating), strategy),
        floating: {
          ...getDimensions(floating),
          x: 0,
          y: 0
        }
      };
    },
    getClientRects: (element) => Array.from(element.getClientRects()),
    isRTL: (element) => getComputedStyle(element).direction === "rtl"
  };
  function autoUpdate(reference, floating, update, options) {
    if (options === void 0) {
      options = {};
    }
    const {
      ancestorScroll: _ancestorScroll = true,
      ancestorResize: _ancestorResize = true,
      elementResize = true,
      animationFrame = false
    } = options;
    const ancestorScroll = _ancestorScroll && !animationFrame;
    const ancestorResize = _ancestorResize && !animationFrame;
    const ancestors = ancestorScroll || ancestorResize ? [...isElement(reference) ? getOverflowAncestors(reference) : [], ...getOverflowAncestors(floating)] : [];
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.addEventListener("scroll", update, {
        passive: true
      });
      ancestorResize && ancestor.addEventListener("resize", update);
    });
    let observer = null;
    if (elementResize) {
      let initialUpdate = true;
      observer = new ResizeObserver(() => {
        if (!initialUpdate) {
          update();
        }
        initialUpdate = false;
      });
      isElement(reference) && !animationFrame && observer.observe(reference);
      observer.observe(floating);
    }
    let frameId;
    let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
    if (animationFrame) {
      frameLoop();
    }
    function frameLoop() {
      const nextRefRect = getBoundingClientRect(reference);
      if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
        update();
      }
      prevRefRect = nextRefRect;
      frameId = requestAnimationFrame(frameLoop);
    }
    update();
    return () => {
      var _observer;
      ancestors.forEach((ancestor) => {
        ancestorScroll && ancestor.removeEventListener("scroll", update);
        ancestorResize && ancestor.removeEventListener("resize", update);
      });
      (_observer = observer) == null ? void 0 : _observer.disconnect();
      observer = null;
      if (animationFrame) {
        cancelAnimationFrame(frameId);
      }
    };
  }
  const computePosition = (reference, floating, options) => computePosition$1(reference, floating, {
    platform,
    ...options
  });
  function unrefElement(elRef) {
    var _a2;
    const plain = resolveUnref(elRef);
    return (_a2 = plain == null ? void 0 : plain.$el) != null ? _a2 : plain;
  }
  const defaultWindow = isClient ? window : void 0;
  function useEventListener(...args) {
    let target;
    let event;
    let listener;
    let options;
    if (isString(args[0])) {
      [event, listener, options] = args;
      target = defaultWindow;
    } else {
      [target, event, listener, options] = args;
    }
    if (!target)
      return noop;
    let cleanup = noop;
    const stopWatch = vue.watch(() => unrefElement(target), (el) => {
      cleanup();
      if (!el)
        return;
      el.addEventListener(event, listener, options);
      cleanup = () => {
        el.removeEventListener(event, listener, options);
        cleanup = noop;
      };
    }, { immediate: true, flush: "post" });
    const stop = () => {
      stopWatch();
      cleanup();
    };
    tryOnScopeDispose(stop);
    return stop;
  }
  function onClickOutside(target, handler, options = {}) {
    const { window: window2 = defaultWindow, ignore, capture = true, detectIframe = false } = options;
    if (!window2)
      return;
    const shouldListen = vue.ref(true);
    let fallback;
    const listener = (event) => {
      window2.clearTimeout(fallback);
      const el = unrefElement(target);
      if (!el || el === event.target || event.composedPath().includes(el) || !shouldListen.value)
        return;
      handler(event);
    };
    const shouldIgnore = (event) => {
      return ignore && ignore.some((target2) => {
        const el = unrefElement(target2);
        return el && (event.target === el || event.composedPath().includes(el));
      });
    };
    const cleanup = [
      useEventListener(window2, "click", listener, { passive: true, capture }),
      useEventListener(window2, "pointerdown", (e2) => {
        const el = unrefElement(target);
        shouldListen.value = !!el && !e2.composedPath().includes(el) && !shouldIgnore(e2);
      }, { passive: true }),
      useEventListener(window2, "pointerup", (e2) => {
        if (e2.button === 0) {
          const path2 = e2.composedPath();
          e2.composedPath = () => path2;
          fallback = window2.setTimeout(() => listener(e2), 50);
        }
      }, { passive: true }),
      detectIframe && useEventListener(window2, "blur", (event) => {
        var _a2;
        const el = unrefElement(target);
        if (((_a2 = document.activeElement) == null ? void 0 : _a2.tagName) === "IFRAME" && !(el == null ? void 0 : el.contains(document.activeElement)))
          handler(event);
      })
    ].filter(Boolean);
    const stop = () => cleanup.forEach((fn) => fn());
    return stop;
  }
  function useAsyncState(promise, initialState, options) {
    const {
      immediate = true,
      delay = 0,
      onError = noop,
      resetOnExecute = true,
      shallow = true,
      throwError
    } = options != null ? options : {};
    const state2 = shallow ? vue.shallowRef(initialState) : vue.ref(initialState);
    const isReady = vue.ref(false);
    const isLoading = vue.ref(false);
    const error = vue.ref(void 0);
    async function execute(delay2 = 0, ...args) {
      if (resetOnExecute)
        state2.value = initialState;
      error.value = void 0;
      isReady.value = false;
      isLoading.value = true;
      if (delay2 > 0)
        await promiseTimeout(delay2);
      const _promise = typeof promise === "function" ? promise(...args) : promise;
      try {
        const data = await _promise;
        state2.value = data;
        isReady.value = true;
      } catch (e2) {
        error.value = e2;
        onError(e2);
        if (throwError)
          throw error;
      } finally {
        isLoading.value = false;
      }
      return state2.value;
    }
    if (immediate)
      execute(delay);
    return {
      state: state2,
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
  var __defProp$9 = Object.defineProperty;
  var __getOwnPropSymbols$a = Object.getOwnPropertySymbols;
  var __hasOwnProp$a = Object.prototype.hasOwnProperty;
  var __propIsEnum$a = Object.prototype.propertyIsEnumerable;
  var __defNormalProp$9 = (obj, key, value) => key in obj ? __defProp$9(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues$9 = (a2, b) => {
    for (var prop2 in b || (b = {}))
      if (__hasOwnProp$a.call(b, prop2))
        __defNormalProp$9(a2, prop2, b[prop2]);
    if (__getOwnPropSymbols$a)
      for (var prop2 of __getOwnPropSymbols$a(b)) {
        if (__propIsEnum$a.call(b, prop2))
          __defNormalProp$9(a2, prop2, b[prop2]);
      }
    return a2;
  };
  async function loadImage(options) {
    return new Promise((resolve2, reject2) => {
      const img = new Image();
      const { src, srcset, sizes } = options;
      img.src = src;
      if (srcset)
        img.srcset = srcset;
      if (sizes)
        img.sizes = sizes;
      img.onload = () => resolve2(img);
      img.onerror = reject2;
    });
  }
  const useImage = (options, asyncStateOptions = {}) => {
    const state2 = useAsyncState(() => loadImage(resolveUnref(options)), void 0, __spreadValues$9({
      resetOnExecute: true
    }, asyncStateOptions));
    vue.watch(() => resolveUnref(options), () => state2.execute(asyncStateOptions.delay), { deep: true });
    return state2;
  };
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
  var __spreadValues = (a2, b) => {
    for (var prop2 in b || (b = {}))
      if (__hasOwnProp.call(b, prop2))
        __defNormalProp(a2, prop2, b[prop2]);
    if (__getOwnPropSymbols)
      for (var prop2 of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop2))
          __defNormalProp(a2, prop2, b[prop2]);
      }
    return a2;
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
  const appendTo = (element, targetSelector = "body") => {
    if (!element)
      return;
    if (typeof targetSelector !== "string") {
      targetSelector == null ? void 0 : targetSelector.append(element);
      return;
    }
    const target = document.querySelector(targetSelector);
    target == null ? void 0 : target.append(element);
  };
  function useFloating({ middleware, placement = null, strategy, append, enabled }) {
    const reference = vue.ref(null);
    const floating = vue.ref(null);
    const x = vue.ref(null);
    const y = vue.ref(null);
    const arrowX = vue.ref(null);
    const arrowY = vue.ref(null);
    const _placement = vue.ref(null);
    const _strategy = vue.ref(strategy != null ? strategy : "absolute");
    const _autoUpdate = vue.ref(null);
    const update = () => {
      if (!reference.value || !floating.value)
        return;
      computePosition(reference.value, floating.value, {
        middleware,
        placement,
        strategy
      }).then((data) => {
        x.value = data.x;
        y.value = data.y;
        _strategy.value = data.strategy;
        arrowX.value = data.middlewareData.arrow.x;
        arrowY.value = data.middlewareData.arrow.y;
        _placement.value = data.placement;
      });
    };
    vue.watch(
      () => ({
        reference: vue.unref(reference),
        floating: vue.unref(floating),
        append: vue.unref(append)
      }),
      ({ floating: floating2, append: append2 }) => {
        if (append2)
          appendTo(floating2, append2);
        update();
      },
      { flush: "post" }
    );
    vue.watch(
      enabled,
      (enabled2) => {
        if (!reference.value || !floating.value)
          return;
        if (!enabled2)
          return clean();
        _autoUpdate.value = autoUpdate(reference.value, floating.value, update, {});
      },
      { flush: "post" }
    );
    const clean = () => {
      var _a2;
      (_a2 = _autoUpdate.value) == null ? void 0 : _a2.call(_autoUpdate);
      _autoUpdate.value = null;
    };
    return {
      x,
      y,
      arrowX,
      arrowY,
      placement: _placement,
      reference,
      floating,
      strategy: _strategy,
      update
    };
  }
  const arrow = (options) => {
    const { element, padding } = options;
    return {
      name: "arrow",
      options,
      fn(args) {
        if (vue.isRef(element)) {
          if (element.value != null) {
            return arrow$1({ element: element.value, padding }).fn(args);
          }
          return {};
        } else if (element) {
          return arrow$1({ element, padding }).fn(args);
        }
        return {};
      }
    };
  };
  const _hoisted_1$9 = ["data-placement"];
  const _sfc_main$d = {
    __name: "FloatingPanel",
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      placement: {
        type: String,
        default: "bottom"
      },
      theme: {
        type: String,
        default: "tooltip"
      },
      content: {
        type: String,
        default: ""
      },
      appendTo: {
        type: [Object, String],
        default: "body"
      },
      offset: {
        type: Number,
        default: 2
      }
    },
    setup(__props) {
      const props = __props;
      const open = vue.ref(false);
      const arrowRef = vue.ref(null);
      const { x, y, arrowX, arrowY, placement, reference, floating, strategy } = useFloating({
        placement: props.placement,
        middleware: [flip(), shift({ padding: 5 }), offset(props.offset), arrow({ element: arrowRef, padding: 5 })],
        append: vue.computed(() => props.appendTo),
        enabled: open
      });
      const show = () => {
        if (props.disabled)
          return;
        open.value = true;
      };
      const hide = () => {
        open.value = false;
      };
      const setSlotRef = (el) => {
        reference.value = el;
      };
      onClickOutside(floating, (event) => {
        var _a2;
        if ((_a2 = reference.value) == null ? void 0 : _a2.contains(event.target))
          return;
        hide();
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.renderSlot(_ctx.$slots, "default", {
            setRef: setSlotRef,
            show,
            hide
          }),
          vue.createElementVNode("div", {
            ref_key: "floating",
            ref: floating,
            "data-placement": vue.unref(placement),
            style: vue.normalizeStyle({
              position: vue.unref(strategy),
              top: vue.unref(y) ? `${vue.unref(y)}px` : "",
              left: vue.unref(x) ? `${vue.unref(x)}px` : ""
            })
          }, [
            vue.createVNode(vue.Transition, {
              name: "transition-fade",
              mode: "out-in"
            }, {
              default: vue.withCtx(() => [
                open.value ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 0,
                  class: vue.normalizeClass(["floating-content", [`is-${props.theme}`]])
                }, [
                  vue.renderSlot(_ctx.$slots, "content", { close: hide }, () => [
                    vue.createTextVNode(vue.toDisplayString(__props.content), 1)
                  ]),
                  vue.createElementVNode("div", {
                    ref_key: "arrowRef",
                    ref: arrowRef,
                    class: "is-arrow",
                    style: vue.normalizeStyle({
                      position: vue.unref(strategy),
                      top: vue.unref(arrowY) ? `${vue.unref(arrowY)}px` : "",
                      left: vue.unref(arrowX) ? `${vue.unref(arrowX)}px` : ""
                    })
                  }, null, 4)
                ], 2)) : vue.createCommentVNode("", true)
              ]),
              _: 3
            })
          ], 12, _hoisted_1$9)
        ], 64);
      };
    }
  };
  const _hoisted_1$8 = ["onMouseenter", "onMouseleave", "onFocus", "onBlur", "onClick", "onKeydown", "tabindex"];
  const _hoisted_2$6 = { key: 0 };
  const _hoisted_3$5 = ["colspan"];
  const _hoisted_4$2 = { key: 1 };
  const _hoisted_5$2 = ["colspan"];
  const _sfc_main$c = {
    __name: "DataTable",
    props: {
      columns: {
        type: Object,
        default: () => ({})
      },
      rows: {
        type: Array,
        default: () => []
      },
      sort: {
        type: Object,
        default: () => ({})
      },
      isLoading: {
        type: Boolean,
        default: false
      },
      appendTo: {
        type: [Object, String],
        default: null
      }
    },
    emits: ["sort"],
    setup(__props, { emit }) {
      const props = __props;
      const { isLoading, appendTo: appendTo2 } = vue.toRefs(props);
      const { t: t2 } = useI18n();
      const mainClassName = useMainClass("table");
      const columns = vue.computed(() => props.columns);
      const columnCount = vue.computed(() => Object.keys(props.columns).length);
      const isLoadingDebounced = refDebounced(isLoading, 300);
      const sortBy = (column, prop2) => {
        if (!column.sortOrders)
          return;
        emit("sort", { target: prop2, orders: column.sortOrders });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("table", {
          class: vue.normalizeClass(vue.unref(mainClassName))
        }, [
          vue.createElementVNode("thead", null, [
            vue.createElementVNode("tr", null, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(columns), (column, prop2) => {
                return vue.openBlock(), vue.createBlock(_sfc_main$d, {
                  key: prop2,
                  placement: "top",
                  content: column.tooltip,
                  disabled: !column.tooltip,
                  "append-to": vue.unref(appendTo2)
                }, {
                  default: vue.withCtx(({ setRef, show, hide }) => [
                    vue.createElementVNode("th", {
                      ref_for: true,
                      ref: setRef,
                      class: vue.normalizeClass([
                        [column.class],
                        {
                          "is-active": prop2 === __props.sort.sortTarget && __props.sort.orders[0].direction !== vue.unref(SORT_STATE_ORIGINAL),
                          "is-sortable": column.sortOrders,
                          "is-desc": prop2 === __props.sort.sortTarget && __props.sort.orders[0].direction === vue.unref(SORT_STATE_DESCEND),
                          "is-asc": prop2 === __props.sort.sortTarget && __props.sort.orders[0].direction === vue.unref(SORT_STATE_ASCEND)
                        }
                      ]),
                      onMouseenter: show,
                      onMouseleave: hide,
                      onFocus: show,
                      onBlur: hide,
                      onClick: ($event) => sortBy(column, prop2),
                      onKeydown: [
                        vue.withKeys(vue.withModifiers(($event) => sortBy(column, prop2), ["prevent"]), ["space"]),
                        vue.withKeys(vue.withModifiers(($event) => sortBy(column, prop2), ["prevent"]), ["enter"])
                      ],
                      tabindex: column.sortOrders ? 0 : -1,
                      role: "button"
                    }, [
                      vue.renderSlot(_ctx.$slots, `header-${prop2}`, { column }, () => [
                        vue.createTextVNode(vue.toDisplayString(column.label), 1)
                      ]),
                      column.sortOrders && prop2 !== __props.sort.sortTarget ? (vue.openBlock(), vue.createBlock(IconSort, {
                        key: 0,
                        class: "is-icon-sort"
                      })) : vue.createCommentVNode("", true),
                      prop2 === __props.sort.sortTarget && __props.sort.orders[0].direction === vue.unref(SORT_STATE_ORIGINAL) ? (vue.openBlock(), vue.createBlock(IconSort, {
                        key: 1,
                        class: "is-icon-sort"
                      })) : vue.createCommentVNode("", true),
                      prop2 === __props.sort.sortTarget && __props.sort.orders[0].direction === vue.unref(SORT_STATE_DESCEND) ? (vue.openBlock(), vue.createBlock(IconSortAsc, {
                        key: 2,
                        class: "is-icon-sort"
                      })) : vue.createCommentVNode("", true),
                      prop2 === __props.sort.sortTarget && __props.sort.orders[0].direction === vue.unref(SORT_STATE_ASCEND) ? (vue.openBlock(), vue.createBlock(IconSortDesc, {
                        key: 3,
                        class: "is-icon-sort"
                      })) : vue.createCommentVNode("", true)
                    ], 42, _hoisted_1$8)
                  ]),
                  _: 2
                }, 1032, ["content", "disabled", "append-to"]);
              }), 128))
            ])
          ]),
          vue.createElementVNode("tbody", null, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(props.rows, (row, index) => {
              return vue.openBlock(), vue.createElementBlock("tr", { key: index }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(columns), (_, prop2) => {
                  return vue.openBlock(), vue.createElementBlock("td", {
                    key: prop2,
                    class: vue.normalizeClass([
                      [_.class],
                      {
                        "is-active": prop2 === __props.sort.sortTarget && __props.sort.orders[0].direction !== vue.unref(SORT_STATE_ORIGINAL)
                      }
                    ])
                  }, [
                    vue.renderSlot(_ctx.$slots, `cell-${prop2}`, {
                      row,
                      prop: prop2
                    }, () => [
                      vue.createTextVNode(vue.toDisplayString(row[prop2]), 1)
                    ])
                  ], 2);
                }), 128))
              ]);
            }), 128))
          ]),
          vue.createElementVNode("tfoot", null, [
            __props.rows.length === 0 && !vue.unref(isLoading) ? (vue.openBlock(), vue.createElementBlock("tr", _hoisted_2$6, [
              vue.createElementVNode("td", { colspan: vue.unref(columnCount) }, vue.toDisplayString(vue.unref(t2)("common.noData")), 9, _hoisted_3$5)
            ])) : vue.createCommentVNode("", true),
            vue.unref(isLoadingDebounced) ? (vue.openBlock(), vue.createElementBlock("tr", _hoisted_4$2, [
              vue.createElementVNode("td", { colspan: vue.unref(columnCount) }, vue.toDisplayString(vue.unref(t2)("common.loading")), 9, _hoisted_5$2)
            ])) : vue.createCommentVNode("", true)
          ])
        ], 2);
      };
    }
  };
  const _sfc_main$b = {};
  const _hoisted_1$7 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };
  const _hoisted_2$5 = /* @__PURE__ */ vue.createElementVNode("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }, null, -1);
  const _hoisted_3$4 = /* @__PURE__ */ vue.createElementVNode("line", {
    x1: "12",
    y1: "9",
    x2: "12",
    y2: "13"
  }, null, -1);
  const _hoisted_4$1 = /* @__PURE__ */ vue.createElementVNode("line", {
    x1: "12",
    y1: "17",
    x2: "12.01",
    y2: "17"
  }, null, -1);
  const _hoisted_5$1 = [
    _hoisted_2$5,
    _hoisted_3$4,
    _hoisted_4$1
  ];
  function _sfc_render$3(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$7, _hoisted_5$1);
  }
  const IconWarning = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$3]]);
  const _sfc_main$a = {
    __name: "ErrorNotice",
    props: {
      error: {
        type: Object,
        default: () => ({})
      }
    },
    setup(__props) {
      const props = __props;
      const { t: t2, hasTranlation } = useI18n();
      const mainClass = useMainClass("error-notice");
      const errorMessage = vue.computed(() => {
        var _a2;
        if (!hasTranlation(`errors.${props.error.key}`))
          return (_a2 = props.error) == null ? void 0 : _a2.message;
        return t2(`errors.${props.error.key}`, props.error.cause);
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(vue.unref(mainClass))
        }, [
          vue.createVNode(IconWarning, {
            class: "icon",
            width: "20",
            height: "20"
          }),
          vue.createElementVNode("span", null, vue.toDisplayString(vue.unref(errorMessage)), 1)
        ], 2);
      };
    }
  };
  function toKebabCase(str) {
    return str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map((x) => x.toLowerCase()).join("-");
  }
  const ErrorProviderContext = Symbol("ErrorProviderContext");
  const useErrorProvider = () => {
    const errorMessage = vue.ref("");
    const errorObject = vue.ref({});
    const onError = (error) => {
      console.log({ error });
      errorMessage.value = error.message;
      errorObject.value = {
        message: error.message,
        key: error.key || toKebabCase(error.message),
        cause: error.cause
      };
    };
    const reset = () => {
      errorMessage.value = "";
      errorObject.value = {};
    };
    const api = {
      onError,
      reset
    };
    vue.provide(ErrorProviderContext, api);
    window.onerror = (e2) => {
      console.log("WINDOW_ONERROR:", e2);
    };
    vue.onErrorCaptured((error, vm, info) => {
      console.log("onErrorCaptured:", error, vm, info);
    });
    return {
      hasError: vue.computed(() => errorMessage.value.length > 0),
      message: errorMessage,
      error: errorObject,
      onError
    };
  };
  const useError = () => {
    const api = useErrorProviderContext();
    return {
      onError: api.onError,
      reset: api.reset
    };
  };
  const useErrorProviderContext = () => {
    const api = vue.inject(ErrorProviderContext, null);
    if (api === null) {
      throw new Error("Privider is missing a parent component.");
    }
    return api;
  };
  const _sfc_main$9 = {
    __name: "ErrorProvider",
    setup(__props) {
      const { message, hasError, error } = useErrorProvider();
      return (_ctx, _cache) => {
        return vue.renderSlot(_ctx.$slots, "default", {
          message: vue.unref(message),
          error: vue.unref(error),
          hasError: vue.unref(hasError)
        });
      };
    }
  };
  const errors$1 = {
    "undefined-column": "A(z) {column} oszlop nem l\xE9tezik!",
    "invalid-season-name": "\xC9rv\xE9nytelen szezon n\xE9v",
    "api-key-not-found": "API Kulcs nem megfelel\u0151"
  };
  const common$1 = {
    loading: "T\xF6lt\u0151d\xE9s...",
    noData: "Nincs megjelen\xEDthet\u0151 adat",
    selectTimezone: "*Minden id\u0151pont a sz\xE1m\xEDt\xF3g\xE9p id\u0151z\xF3n\xE1ja szerint jelenik meg ({timezone}). V\xE1lt\xE1s: ",
    hungary: "Magyarorsz\xE1g",
    romania: "Rom\xE1nia",
    shootoutShort: "SU.",
    overtimeShort: "HU.",
    all: "Mind"
  };
  const report$1 = {
    points: "Pontok",
    goals: "G\xF3lok",
    assists: "G\xF3lpasszok",
    penalties: "B\xFCntet\xE9sek",
    goalies: "Kapusok",
    goaliesLimit: "Kapusok 40% j\xE9gid\u0151 alatt",
    teamAttendance: "N\xE9z\u0151sz\xE1m",
    teamFairplay: "B\xFCntet\xE9sek",
    teamPenaltyKilling: "Emberh\xE1tr\xE1nyok",
    teamPowerplay: "Emberel\u0151ny\xF6k",
    teamScoringEfficiency: "Hat\xE9konys\xE1g"
  };
  const table$1 = {
    blank: "#",
    team: {
      short: "Csapat",
      tooltip: "Csapatn\xE9v"
    },
    game: {
      short: "M",
      tooltip: "M\xE9rk\u0151z\xE9ssz\xE1m"
    },
    wins: {
      short: "GY",
      tooltip: "Gy\u0151zelem"
    },
    draw: {
      short: "D",
      tooltip: "D\xF6ntetlen"
    },
    otw: {
      short: "GYH",
      tooltip: "Gy\u0151zelem Hosszabb\xEDt\xE1sban"
    },
    otl: {
      short: "VH",
      tooltip: "Veres\xE9g Hosszabb\xEDt\xE1sban"
    },
    losses: {
      short: "V",
      tooltip: "Veres\xE9g"
    },
    goalFor: {
      short: "SZG",
      tooltip: "Szerzett G\xF3l"
    },
    goalAgainst: {
      short: "KG",
      tooltip: "Kapott G\xF3l"
    },
    goalDiff: {
      short: "GK",
      tooltip: "G\xF3lk\xFCl\xF6nbs\xE9g"
    },
    name: {
      short: "N\xE9v",
      tooltip: "J\xE1t\xE9kosn\xE9v"
    },
    goals: {
      short: "G",
      tooltip: "G\xF3lok"
    },
    assists: {
      short: "A",
      tooltip: "G\xF3lpasszok"
    },
    points: {
      short: "P",
      tooltip: "Pontok"
    },
    plusMinus: {
      short: "+/-",
      tooltip: "Plussz/Minusz"
    },
    sog: {
      short: "L",
      tooltip: "L\xF6v\xE9sek"
    },
    sogPercent: {
      short: "L%",
      tooltip: "L\xF6v\xE9s Hat\xE9konys\xE1g"
    },
    gameName: {
      short: "#",
      tooltip: "M\xE9rk\u0151z\xE9s Sorsz\xE1ma"
    },
    gameDate: {
      short: "D\xE1tum",
      tooltip: "M\xE9rk\u0151z\xE9s D\xE1tuma"
    },
    gameDateTime: {
      short: "*Id\u0151 ({offsetName})",
      tooltip: "M\xE9rk\u0151z\xE9s kezd\xE9si ideje (Z\xF3na neve)"
    },
    homeTeam: {
      short: "Hazai",
      tooltip: "Hazai Csapat"
    },
    awayTeam: {
      short: "Vend\xE9g",
      tooltip: "Vend\xE9g Csapat"
    },
    location: {
      short: "Helysz\xEDn",
      tooltip: "M\xE9rk\u0151z\xE9s Helysz\xEDne"
    },
    broadcast: {
      short: "TV",
      tooltip: "TV K\xF6zvet\xEDt\xE9s"
    },
    minorPenalties: {
      short: "MINOR",
      tooltip: "Kisb\xFCntet\xE9s (2p)"
    },
    majorPenalties: {
      short: "MAJOR",
      tooltip: "B\xFCntet\xE9s (5p)"
    },
    misconducts: {
      short: "MISC",
      tooltip: "Fegyelmi b\xFCntet\xE9s (10p)"
    },
    gameMisconducts: {
      short: "GA-MI",
      tooltip: "Fegyelmi b\xFCntet\xE9s (20p)"
    },
    matchPenalties: {
      short: "MATCH",
      tooltip: "V\xE9gleges ki\xE1ll\xEDt\xE1sok (25p)"
    },
    pim: {
      short: "B\xDCP",
      tooltip: "B\xFCntet\xE9s Percek"
    },
    pimPerGame: {
      short: "B\xDCP/M",
      tooltip: "M\xE9rk\u0151z\xE9senk\xE9nti B\xFCntet\xE9s Percek"
    },
    gpgk: {
      short: "M",
      tooltip: "M\xE9rk\u0151z\xE9sre Nevezve"
    },
    gpi: {
      short: "LM",
      tooltip: "M\xE9rk\u0151z\xE9sen J\xE1tszott"
    },
    toi: {
      short: "TOI",
      tooltip: "J\xE9gen T\xF6lt\xF6tt Id\u0151"
    },
    toiPercent: {
      short: "TOI%",
      tooltip: "J\xE9gen T\xF6lt\xF6tt Id\u0151 Sz\xE1zal\xE9k"
    },
    ga: {
      short: "GA",
      tooltip: "Kapott G\xF3l"
    },
    gaa: {
      short: "GAA",
      tooltip: "Kapott G\xF3l\xE1tlag"
    },
    sa: {
      short: "KL",
      tooltip: "Kapott L\xF6v\xE9s"
    },
    svs: {
      short: "VL",
      tooltip: "V\xE9dett L\xF6v\xE9s"
    },
    svsPercent: {
      short: "VH%",
      tooltip: "V\xE9d\xE9s Hat\xE9konys\xE1g"
    },
    homeHeader: {
      short: "Hazai:",
      tooltip: ""
    },
    awayHeader: {
      short: "Vend\xE9g:",
      tooltip: ""
    },
    totalHeader: {
      short: "\xD6sszes:",
      tooltip: ""
    },
    homeGame: {
      short: "M",
      tooltip: "Hazai M\xE9rk\u0151z\xE9s"
    },
    awayGame: {
      short: "M",
      tooltip: "Vend\xE9g M\xE9rk\u0151z\xE9s"
    },
    totalGame: {
      short: "M",
      tooltip: "\xD6sszes M\xE9rk\u0151z\xE9s"
    },
    homeAttendance: {
      short: "N\xE9z\u0151sz\xE1m",
      tooltip: "Hazai N\xE9z\u0151"
    },
    awayAttendance: {
      short: "N\xE9z\u0151sz\xE1m",
      tooltip: "Vend\xE9g N\xE9z\u0151"
    },
    totalAttendance: {
      short: "N\xE9z\u0151sz\xE1m",
      tooltip: "\xD6sszes N\xE9z\u0151"
    },
    homeAttendanceAvg: {
      short: "\xC1tlag",
      tooltip: "Hazi N\xE9z\u0151 \xC1tlag"
    },
    awayAttendanceAvg: {
      short: "\xC1tlag",
      tooltip: "Vend\xE9g N\xE9z\u0151 \xC1tlag"
    },
    totalAttendanceAvg: {
      short: "\xC1tlag",
      tooltip: "\xD6sszes N\xE9z\u0151 \xC1tlag"
    },
    powerplayDisadvantages: {
      short: "DVG",
      tooltip: "Emberh\xE1tr\xE1nyok"
    },
    dvgTime: {
      short: "DVG-T",
      tooltip: "Emberh\xE1tr\xE1nyban T\xF6lt\xF6tt Id\u0151"
    },
    dvgTimePP1: {
      short: "DVG-T PP1",
      tooltip: "Szimpla emberh\xE1tr\xE1nyban t\xF6lt\xF6tt id\u0151"
    },
    dvgTimePP2: {
      short: "DVG-T PP2",
      tooltip: "Kett\u0151s emberh\xE1tr\xE1nyban t\xF6lt\xF6tt id\u0151"
    },
    ppga: {
      short: "PPGA",
      tooltip: "Emberh\xE1tr\xE1nyban kapott g\xF3lok"
    },
    shgf: {
      short: "SHGF",
      tooltip: "Emberh\xE1tr\xE1nyban szerzett g\xF3l"
    },
    pkPercent: {
      short: "PK%",
      tooltip: "Emberh\xE1tr\xE1ny kiv\xE9dekez\xE9s"
    },
    adv: {
      short: "ADV",
      tooltip: "Emberel\u0151ny\xF6k sz\xE1ma"
    },
    advTime: {
      short: "ADV-T",
      tooltip: "Emberel\u0151nyben t\xF6lt\xF6tt id\u0151"
    },
    advTimePP1: {
      short: "ADV-T PP1",
      tooltip: "Szimpla emberel\u0151nyben t\xF6lt\xF6tt id\u0151"
    },
    advTimePP2: {
      short: "ADV-T PP2",
      tooltip: "Kett\u0151s emberel\u0151nyben t\xF6lt\xF6tt id\u0151"
    },
    ppgf: {
      short: "PPGF",
      tooltip: "Emberel\u0151nyben szerzett g\xF3lok"
    },
    shga: {
      short: "SHGA",
      tooltip: "Emberel\u0151nyben kapott g\xF3lok"
    },
    ppPercent: {
      short: "PP%",
      tooltip: "Emberel\u0151ny kihaszn\xE1l\xE1s"
    },
    gfgp: {
      short: "GF/GP",
      tooltip: "Szerzett g\xF3l\xE1tlag"
    },
    gagp: {
      short: "GA/GP",
      tooltip: "Kapott g\xF3l\xE1tlag"
    },
    sogp: {
      short: "Shots/GP",
      tooltip: "\xC1tlagos l\xF6v\xE9ssz\xE1m"
    },
    sagp: {
      short: "SA/GP",
      tooltip: "\xC1tlagos kapott l\xF6v\xE9ssz\xE1m"
    }
  };
  const game$1 = {
    data: {
      localTime: "Helysz\xEDn szerinti id\u0151"
    },
    period: {
      "Bemeleg\xEDt\xE9s": "Bemeleg\xEDt\xE9s",
      "Bemeleg\xEDt\xE9s v\xE9ge": "Bemeleg\xEDt\xE9s V\xE9ge",
      "1. harmad": "I. harmad",
      "1. harmad v\xE9ge": "I. harmad V\xE9ge",
      "2. harmad": "II. harmad",
      "2. harmad v\xE9ge": "II. harmad V\xE9ge",
      "3. harmad": "III. harmad",
      "3. harmad v\xE9ge": "III. harmad V\xE9ge",
      "4. harmad": "IV. harmad",
      "4. harmad v\xE9ge": "IV. harmad V\xE9ge",
      "5. harmad": "V. harmad",
      "5. harmad v\xE9ge": "V. harmad V\xE9ge",
      "6. harmad": "VI. harmad",
      "6. harmad v\xE9ge": "VI. harmad V\xE9ge",
      "Hosszabb\xEDt\xE1s": "Hosszabb\xEDt\xE1s",
      "Hosszabb\xEDt\xE1s v\xE9ge": "Hosszabb\xEDt\xE1s v\xE9ge",
      "B\xFCntet\u0151k": "Sz\xE9tl\xF6v\xE9s",
      "B\xFCntet\u0151k v\xE9ge": "Sz\xE9tl\xF6v\xE9s v\xE9ge",
      "V\xE9geredm\xE9ny": "V\xE9geredm\xE9ny",
      "Sz\xE9tl\xF6v\xE9s": "Sz\xE9tl\xF6v\xE9s"
    }
  };
  const hu$1 = {
    errors: errors$1,
    common: common$1,
    report: report$1,
    table: table$1,
    game: game$1
  };
  const errors = {
    "undefined-column": "The {column} column is not exists!",
    "invalid-season-name": "Invalid season name",
    "api-key-not-found": "API Key not found"
  };
  const common = {
    loading: "Loading...",
    noData: "No data to display",
    selectTimezone: "*All times are displayed according to your computer's time zone ({timezone}). Change: ",
    hungary: "Hungary",
    romania: "Romania",
    shootoutShort: "SO",
    overtimeShort: "OT",
    all: "All"
  };
  const report = {
    points: "Points",
    goals: "Goals",
    assists: "Assists",
    penalties: "Penalties",
    goalies: "Goalies",
    goaliesLimit: "Goalies under 40%",
    teamAttendance: "Attendance",
    teamFairplay: "Fairplay",
    teamPenaltyKilling: "Penalty Killing",
    teamPowerplay: "Powerplay",
    teamScoringEfficiency: "Scoring Efficiency"
  };
  const table = {
    blank: "#",
    team: {
      short: "Team",
      tooltip: "Team name"
    },
    game: {
      short: "GP",
      tooltip: "Game Played"
    },
    wins: {
      short: "W",
      tooltip: "Wins"
    },
    draw: {
      short: "D",
      tooltip: "Draw"
    },
    otw: {
      short: "OTW",
      tooltip: "Overtime Wins"
    },
    otl: {
      short: "OTL",
      tooltip: "Overtime Losses"
    },
    losses: {
      short: "L",
      tooltip: "Losses"
    },
    goalFor: {
      short: "GF",
      tooltip: "Goals For"
    },
    goalAgainst: {
      short: "GA",
      tooltip: "Goals Against"
    },
    goalDiff: {
      short: "GD",
      tooltip: "Goal Differential"
    },
    points: {
      short: "PTS",
      tooltip: "Points"
    },
    name: {
      short: "Name",
      tooltip: "Player name"
    },
    goals: {
      short: "G",
      tooltip: "Goals"
    },
    assists: {
      short: "A",
      tooltip: "Assists"
    },
    plusMinus: {
      short: "+/-",
      tooltip: "Plus/Minus"
    },
    sog: {
      short: "SOG",
      tooltip: "Shots on Goal"
    },
    sogPercent: {
      short: "SOG%",
      tooltip: "Shots on Goal Percent"
    },
    gameName: {
      short: "#",
      tooltip: "Game name"
    },
    gameDate: {
      short: "Date",
      tooltip: "Scheduled Date"
    },
    gameDateTime: {
      short: "*Time ({offsetName})",
      tooltip: "Scheduled Time (Offset Name)"
    },
    homeTeam: {
      short: "Home",
      tooltip: "Home Team"
    },
    awayTeam: {
      short: "Away",
      tooltip: "Away Team"
    },
    location: {
      short: "Location",
      tooltip: "Game Location"
    },
    broadcast: {
      short: "Broadcast",
      tooltip: "Television Broadcast"
    },
    minorPenalties: {
      short: "MINOR",
      tooltip: "Penalties Minor"
    },
    majorPenalties: {
      short: "MAJOR",
      tooltip: "Penalties Major"
    },
    misconducts: {
      short: "MISC",
      tooltip: "Penalties Misconduct"
    },
    gameMisconducts: {
      short: "GA-MI",
      tooltip: "Penalties Game Misconduct"
    },
    matchPenalties: {
      short: "MATCH",
      tooltip: "Penalties Match"
    },
    pim: {
      short: "PIM",
      tooltip: "Penalty Minutes"
    },
    pimPerGame: {
      short: "PIM/G",
      tooltip: "Penalty Minutes per Game"
    },
    gpgk: {
      short: "GP",
      tooltip: "Games Played"
    },
    gpi: {
      short: "GPI",
      tooltip: "Games Played In"
    },
    toi: {
      short: "TOI",
      tooltip: "Time On Ice"
    },
    toiPercent: {
      short: "TOI%",
      tooltip: "Time On Ice as Percentage"
    },
    ga: {
      short: "GA",
      tooltip: "Goals Against"
    },
    gaa: {
      short: "GAA",
      tooltip: "Goals Against Average"
    },
    sa: {
      short: "SA",
      tooltip: "Shots Against"
    },
    svs: {
      short: "SVS",
      tooltip: "Saves"
    },
    svsPercent: {
      short: "SV%",
      tooltip: "Save Percentage"
    },
    homeHeader: {
      short: "Home:",
      tooltip: ""
    },
    awayHeader: {
      short: "Away:",
      tooltip: ""
    },
    totalHeader: {
      short: "Total:",
      tooltip: ""
    },
    homeGame: {
      short: "GP",
      tooltip: "Home Games Played"
    },
    awayGame: {
      short: "GP",
      tooltip: "Away Games Played"
    },
    totalGame: {
      short: "GP",
      tooltip: "Total Games Played"
    },
    homeAttendance: {
      short: "Att",
      tooltip: "Home Attendance"
    },
    awayAttendance: {
      short: "Att",
      tooltip: "Away Attendance"
    },
    totalAttendance: {
      short: "Att",
      tooltip: "Total Attendance"
    },
    homeAttendanceAvg: {
      short: "Avg",
      tooltip: "Home Average Attendance"
    },
    awayAttendanceAvg: {
      short: "Avg",
      tooltip: "Away Average Attendance"
    },
    totalAttendanceAvg: {
      short: "Avg",
      tooltip: "Total Average Attendance"
    },
    powerplayDisadvantages: {
      short: "DVG",
      tooltip: "Disadvantages (Number of Times Shorthanded)"
    },
    dvgTime: {
      short: "DVG-T",
      tooltip: "Disadvantages Time"
    },
    dvgTimePP1: {
      short: "DVG-T PP1",
      tooltip: "Disadvantages Time (Period of PP1)"
    },
    dvgTimePP2: {
      short: "DVG-T PP2",
      tooltip: "Disadvantages Time (Period of PP2)"
    },
    ppga: {
      short: "PPGA",
      tooltip: "Powerplay Goals Against"
    },
    shgf: {
      short: "SHGF",
      tooltip: "Shorthanded Goals For"
    },
    pkPercent: {
      short: "PK%",
      tooltip: "Penalty Killing Percentage"
    },
    adv: {
      short: "ADV",
      tooltip: "Advantages (Times on Powerplay)"
    },
    advTime: {
      short: "ADV-T",
      tooltip: "Advantages Time (Period of Powerplay)"
    },
    advTimePP1: {
      short: "ADV-T PP1",
      tooltip: "Advantages Time (Period of PP1)"
    },
    advTimePP2: {
      short: "ADV-T PP2",
      tooltip: "Advantages Time (Period of PP2)"
    },
    ppgf: {
      short: "PPGF",
      tooltip: "Powerplay Goals For"
    },
    shga: {
      short: "SHGA",
      tooltip: "Shorthanded Goals Against"
    },
    ppPercent: {
      short: "PP%",
      tooltip: "Powerplay Percentage"
    },
    gfgp: {
      short: "GF/GP",
      tooltip: "Szerzett g\xF3l\xE1tlag"
    },
    gagp: {
      short: "GA/GP",
      tooltip: "Kapott g\xF3l\xE1tlag"
    },
    sogp: {
      short: "Shots/GP",
      tooltip: "\xC1tlagos l\xF6v\xE9ssz\xE1m"
    },
    sagp: {
      short: "SA/GP",
      tooltip: "Shots Against per Game"
    }
  };
  const game = {
    data: {
      localTime: "Game local time"
    },
    period: {
      "Bemeleg\xEDt\xE9s": "Warm-up",
      "Bemeleg\xEDt\xE9s v\xE9ge": "Warm-up End",
      "1. harmad": "First period",
      "1. harmad v\xE9ge": "First period End",
      "2. harmad": "Second period",
      "2. harmad v\xE9ge": "Second period End",
      "3. harmad": "Third period",
      "3. harmad v\xE9ge": "Third period End",
      "4. harmad": "IV. period",
      "4. harmad v\xE9ge": "IV. period End",
      "5. harmad": "V. period",
      "5. harmad v\xE9ge": "V. period End",
      "6. harmad": "VI. period",
      "6. harmad v\xE9ge": "VI. period End",
      "Hosszabb\xEDt\xE1s": "Overtime",
      "Hosszabb\xEDt\xE1s v\xE9ge": "Overtime End",
      "B\xFCntet\u0151l\xF6v\xE9sek": "Penalty Shot",
      "V\xE9geredm\xE9ny": "Game Completed",
      "Sz\xE9tl\xF6v\xE9s": "Shoot Out"
    }
  };
  const en = {
    errors,
    common,
    report,
    table,
    game
  };
  const _sfc_main$8 = vue.defineComponent({
    props: {
      locale: {
        type: String,
        default: "hu"
      }
    },
    setup(props) {
      createI18n({
        locale: vue.computed(() => props.locale),
        messages: {
          hu: hu$1,
          en
        }
      });
    }
  });
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.renderSlot(_ctx.$slots, "default");
  }
  const I18NProvider = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$2]]);
  const _hoisted_1$6 = ["src"];
  const _hoisted_2$4 = ["src", "title"];
  const _sfc_main$7 = {
    __name: "Image",
    props: {
      src: {
        type: String,
        default: ""
      },
      title: {
        type: String,
        default: ""
      },
      defaultSrc: {
        type: String,
        default: ""
      }
    },
    setup(__props) {
      const props = __props;
      const { defaultSrc } = vue.toRefs(props);
      const imageOptions = vue.ref({ src: props.src });
      const { error, isReady } = useImage(imageOptions, { resetOnExecute: false, shallow: false });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.unref(error) && vue.unref(defaultSrc) ? (vue.openBlock(), vue.createElementBlock("img", {
            key: 0,
            src: vue.unref(defaultSrc),
            class: vue.normalizeClass(["is-loaded", _ctx.$attrs.class])
          }, null, 10, _hoisted_1$6)) : vue.createCommentVNode("", true),
          !vue.unref(error) ? (vue.openBlock(), vue.createElementBlock("img", {
            key: 1,
            src: imageOptions.value.src,
            class: vue.normalizeClass([_ctx.$attrs.class, { "is-loaded": vue.unref(isReady) }]),
            title: props.title
          }, null, 10, _hoisted_2$4)) : vue.createCommentVNode("", true)
        ], 64);
      };
    }
  };
  const _hoisted_1$5 = { style: { "text-align": "center" } };
  const _sfc_main$6 = {
    __name: "LoadingIndicator",
    setup(__props) {
      const { t: t2 } = useI18n();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$5, vue.toDisplayString(vue.unref(t2)("common.loading")), 1);
      };
    }
  };
  function usePagination({ currentPage, itemsPerPage = 20, totalItems, rangeLength = 5, update = noop }) {
    const pageCount = vue.computed(() => Math.ceil(vue.unref(totalItems) / itemsPerPage));
    const range = vue.computed(() => {
      const page = vue.unref(currentPage) - 1;
      const range2 = Array.from({ length: pageCount.value }, (_, i) => i + 1);
      const minus = Math.floor(rangeLength / 2);
      let startIndex = Math.max(page - minus, 0);
      if (startIndex + rangeLength >= pageCount.value) {
        startIndex = Math.max(pageCount.value - rangeLength, 0);
      }
      return range2.slice(startIndex, startIndex + rangeLength);
    });
    const pageStep = (v) => {
      const page = vue.unref(currentPage) + v;
      if (validPage(page))
        update(page);
    };
    const goTo = (page) => {
      if (validPage(page))
        update(page);
    };
    const validPage = (page) => {
      return page <= pageCount.value && page > 0;
    };
    return {
      page: currentPage,
      range,
      pageCount,
      goTo,
      pageStep
    };
  }
  const _sfc_main$5 = {};
  const _hoisted_1$4 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };
  const _hoisted_2$3 = /* @__PURE__ */ vue.createElementVNode("polyline", { points: "15 18 9 12 15 6" }, null, -1);
  const _hoisted_3$3 = [
    _hoisted_2$3
  ];
  function _sfc_render$1(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$4, _hoisted_3$3);
  }
  const IconLeft = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$1]]);
  const _sfc_main$4 = {};
  const _hoisted_1$3 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };
  const _hoisted_2$2 = /* @__PURE__ */ vue.createElementVNode("polyline", { points: "9 18 15 12 9 6" }, null, -1);
  const _hoisted_3$2 = [
    _hoisted_2$2
  ];
  function _sfc_render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$3, _hoisted_3$2);
  }
  const IconRight = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render]]);
  const _hoisted_1$2 = ["disabled"];
  const _hoisted_2$1 = ["disabled"];
  const _hoisted_3$1 = {
    key: 1,
    class: "is-disabled"
  };
  const _hoisted_4 = ["disabled", "onClick"];
  const _hoisted_5 = {
    key: 2,
    class: "is-disabled"
  };
  const _hoisted_6 = /* @__PURE__ */ vue.createElementVNode("span", null, "...", -1);
  const _hoisted_7 = [
    _hoisted_6
  ];
  const _hoisted_8 = ["disabled"];
  const _hoisted_9 = ["disabled"];
  const _sfc_main$3 = {
    __name: "Paginator",
    props: {
      page: {
        type: Number,
        required: false,
        default: 0,
        validator: (value) => {
          return value >= 0;
        }
      },
      itemsPerPage: {
        type: Number,
        required: false,
        default: 10,
        validator: (value) => {
          return value > 0;
        }
      },
      totalItems: {
        type: Number,
        required: true,
        validator: (value) => {
          return value >= 0;
        }
      },
      rangeLength: {
        type: Number,
        default: 3,
        validator: (value) => {
          return value >= 2;
        }
      },
      isCompact: {
        type: Boolean,
        default: false
      }
    },
    emits: ["change"],
    setup(__props, { emit }) {
      const props = __props;
      const mainClassName = useMainClass("paginator");
      const { page, pageCount, range, goTo, pageStep } = usePagination({
        currentPage: vue.computed(() => props.page),
        totalItems: vue.computed(() => props.totalItems),
        itemsPerPage: props.itemsPerPage,
        rangeLength: props.rangeLength,
        update: (page2) => emit("change", page2)
      });
      return (_ctx, _cache) => {
        return vue.unref(pageCount) > 1 ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: vue.normalizeClass(vue.unref(mainClassName))
        }, [
          vue.createElementVNode("button", {
            type: "button",
            disabled: vue.unref(page) === 1,
            onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(pageStep)(-1))
          }, [
            vue.renderSlot(_ctx.$slots, "prev", {}, () => [
              vue.createVNode(IconLeft, { class: "icon paginator-left" })
            ])
          ], 8, _hoisted_1$2),
          !__props.isCompact ? (vue.openBlock(), vue.createElementBlock("button", {
            key: 0,
            type: "button",
            disabled: vue.unref(page) === 1,
            onClick: _cache[1] || (_cache[1] = ($event) => vue.unref(goTo)(1))
          }, "1", 8, _hoisted_2$1)) : vue.createCommentVNode("", true),
          !__props.isCompact ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$1, "...")) : vue.createCommentVNode("", true),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(range), (n2) => {
            return vue.openBlock(), vue.createElementBlock("button", {
              type: "button",
              key: n2,
              class: vue.normalizeClass({ "is-active": n2 === vue.unref(page) }),
              disabled: n2 === vue.unref(page),
              onClick: ($event) => vue.unref(goTo)(n2)
            }, vue.toDisplayString(n2), 11, _hoisted_4);
          }), 128)),
          !__props.isCompact ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5, _hoisted_7)) : vue.createCommentVNode("", true),
          !__props.isCompact ? (vue.openBlock(), vue.createElementBlock("button", {
            key: 3,
            type: "button",
            disabled: vue.unref(page) === vue.unref(pageCount),
            onClick: _cache[2] || (_cache[2] = ($event) => vue.unref(goTo)(vue.unref(pageCount)))
          }, vue.toDisplayString(vue.unref(pageCount)), 9, _hoisted_8)) : vue.createCommentVNode("", true),
          vue.createElementVNode("button", {
            type: "button",
            disabled: vue.unref(page) === vue.unref(pageCount),
            onClick: _cache[3] || (_cache[3] = vue.withModifiers(($event) => vue.unref(pageStep)(1), ["prevent"]))
          }, [
            vue.renderSlot(_ctx.$slots, "next", {}, () => [
              vue.createVNode(IconRight, { class: "icon paginator-left" })
            ])
          ], 8, _hoisted_9)
        ], 2)) : vue.createCommentVNode("", true);
      };
    }
  };
  const _sfc_main$2 = {
    __name: "ResponsiveTable",
    setup(__props) {
      const el = vue.ref(null);
      const mainClassName = useMainClass("table-responsive");
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          ref_key: "el",
          ref: el,
          class: vue.normalizeClass(vue.unref(mainClassName))
        }, [
          vue.renderSlot(_ctx.$slots, "default", { el: el.value })
        ], 2);
      };
    }
  };
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  var dayjs_min = { exports: {} };
  (function(module, exports2) {
    !function(t2, e2) {
      module.exports = e2();
    }(commonjsGlobal, function() {
      var t2 = 1e3, e2 = 6e4, n2 = 36e5, r2 = "millisecond", i = "second", s2 = "minute", u2 = "hour", a2 = "day", o2 = "week", f2 = "month", h = "quarter", c2 = "year", d = "date", $ = "Invalid Date", l = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, m = function(t3, e3, n3) {
        var r3 = String(t3);
        return !r3 || r3.length >= e3 ? t3 : "" + Array(e3 + 1 - r3.length).join(n3) + t3;
      }, g = { s: m, z: function(t3) {
        var e3 = -t3.utcOffset(), n3 = Math.abs(e3), r3 = Math.floor(n3 / 60), i2 = n3 % 60;
        return (e3 <= 0 ? "+" : "-") + m(r3, 2, "0") + ":" + m(i2, 2, "0");
      }, m: function t3(e3, n3) {
        if (e3.date() < n3.date())
          return -t3(n3, e3);
        var r3 = 12 * (n3.year() - e3.year()) + (n3.month() - e3.month()), i2 = e3.clone().add(r3, f2), s3 = n3 - i2 < 0, u3 = e3.clone().add(r3 + (s3 ? -1 : 1), f2);
        return +(-(r3 + (n3 - i2) / (s3 ? i2 - u3 : u3 - i2)) || 0);
      }, a: function(t3) {
        return t3 < 0 ? Math.ceil(t3) || 0 : Math.floor(t3);
      }, p: function(t3) {
        return { M: f2, y: c2, w: o2, d: a2, D: d, h: u2, m: s2, s: i, ms: r2, Q: h }[t3] || String(t3 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t3) {
        return void 0 === t3;
      } }, v = "en", D = {};
      D[v] = M;
      var p = function(t3) {
        return t3 instanceof _;
      }, S = function t3(e3, n3, r3) {
        var i2;
        if (!e3)
          return v;
        if ("string" == typeof e3) {
          var s3 = e3.toLowerCase();
          D[s3] && (i2 = s3), n3 && (D[s3] = n3, i2 = s3);
          var u3 = e3.split("-");
          if (!i2 && u3.length > 1)
            return t3(u3[0]);
        } else {
          var a3 = e3.name;
          D[a3] = e3, i2 = a3;
        }
        return !r3 && i2 && (v = i2), i2 || !r3 && v;
      }, w = function(t3, e3) {
        if (p(t3))
          return t3.clone();
        var n3 = "object" == typeof e3 ? e3 : {};
        return n3.date = t3, n3.args = arguments, new _(n3);
      }, O = g;
      O.l = S, O.i = p, O.w = function(t3, e3) {
        return w(t3, { locale: e3.$L, utc: e3.$u, x: e3.$x, $offset: e3.$offset });
      };
      var _ = function() {
        function M2(t3) {
          this.$L = S(t3.locale, null, true), this.parse(t3);
        }
        var m2 = M2.prototype;
        return m2.parse = function(t3) {
          this.$d = function(t4) {
            var e3 = t4.date, n3 = t4.utc;
            if (null === e3)
              return new Date(NaN);
            if (O.u(e3))
              return new Date();
            if (e3 instanceof Date)
              return new Date(e3);
            if ("string" == typeof e3 && !/Z$/i.test(e3)) {
              var r3 = e3.match(l);
              if (r3) {
                var i2 = r3[2] - 1 || 0, s3 = (r3[7] || "0").substring(0, 3);
                return n3 ? new Date(Date.UTC(r3[1], i2, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s3)) : new Date(r3[1], i2, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s3);
              }
            }
            return new Date(e3);
          }(t3), this.$x = t3.x || {}, this.init();
        }, m2.init = function() {
          var t3 = this.$d;
          this.$y = t3.getFullYear(), this.$M = t3.getMonth(), this.$D = t3.getDate(), this.$W = t3.getDay(), this.$H = t3.getHours(), this.$m = t3.getMinutes(), this.$s = t3.getSeconds(), this.$ms = t3.getMilliseconds();
        }, m2.$utils = function() {
          return O;
        }, m2.isValid = function() {
          return !(this.$d.toString() === $);
        }, m2.isSame = function(t3, e3) {
          var n3 = w(t3);
          return this.startOf(e3) <= n3 && n3 <= this.endOf(e3);
        }, m2.isAfter = function(t3, e3) {
          return w(t3) < this.startOf(e3);
        }, m2.isBefore = function(t3, e3) {
          return this.endOf(e3) < w(t3);
        }, m2.$g = function(t3, e3, n3) {
          return O.u(t3) ? this[e3] : this.set(n3, t3);
        }, m2.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m2.valueOf = function() {
          return this.$d.getTime();
        }, m2.startOf = function(t3, e3) {
          var n3 = this, r3 = !!O.u(e3) || e3, h2 = O.p(t3), $2 = function(t4, e4) {
            var i2 = O.w(n3.$u ? Date.UTC(n3.$y, e4, t4) : new Date(n3.$y, e4, t4), n3);
            return r3 ? i2 : i2.endOf(a2);
          }, l2 = function(t4, e4) {
            return O.w(n3.toDate()[t4].apply(n3.toDate("s"), (r3 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e4)), n3);
          }, y2 = this.$W, M3 = this.$M, m3 = this.$D, g2 = "set" + (this.$u ? "UTC" : "");
          switch (h2) {
            case c2:
              return r3 ? $2(1, 0) : $2(31, 11);
            case f2:
              return r3 ? $2(1, M3) : $2(0, M3 + 1);
            case o2:
              var v2 = this.$locale().weekStart || 0, D2 = (y2 < v2 ? y2 + 7 : y2) - v2;
              return $2(r3 ? m3 - D2 : m3 + (6 - D2), M3);
            case a2:
            case d:
              return l2(g2 + "Hours", 0);
            case u2:
              return l2(g2 + "Minutes", 1);
            case s2:
              return l2(g2 + "Seconds", 2);
            case i:
              return l2(g2 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m2.endOf = function(t3) {
          return this.startOf(t3, false);
        }, m2.$set = function(t3, e3) {
          var n3, o3 = O.p(t3), h2 = "set" + (this.$u ? "UTC" : ""), $2 = (n3 = {}, n3[a2] = h2 + "Date", n3[d] = h2 + "Date", n3[f2] = h2 + "Month", n3[c2] = h2 + "FullYear", n3[u2] = h2 + "Hours", n3[s2] = h2 + "Minutes", n3[i] = h2 + "Seconds", n3[r2] = h2 + "Milliseconds", n3)[o3], l2 = o3 === a2 ? this.$D + (e3 - this.$W) : e3;
          if (o3 === f2 || o3 === c2) {
            var y2 = this.clone().set(d, 1);
            y2.$d[$2](l2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
          } else
            $2 && this.$d[$2](l2);
          return this.init(), this;
        }, m2.set = function(t3, e3) {
          return this.clone().$set(t3, e3);
        }, m2.get = function(t3) {
          return this[O.p(t3)]();
        }, m2.add = function(r3, h2) {
          var d2, $2 = this;
          r3 = Number(r3);
          var l2 = O.p(h2), y2 = function(t3) {
            var e3 = w($2);
            return O.w(e3.date(e3.date() + Math.round(t3 * r3)), $2);
          };
          if (l2 === f2)
            return this.set(f2, this.$M + r3);
          if (l2 === c2)
            return this.set(c2, this.$y + r3);
          if (l2 === a2)
            return y2(1);
          if (l2 === o2)
            return y2(7);
          var M3 = (d2 = {}, d2[s2] = e2, d2[u2] = n2, d2[i] = t2, d2)[l2] || 1, m3 = this.$d.getTime() + r3 * M3;
          return O.w(m3, this);
        }, m2.subtract = function(t3, e3) {
          return this.add(-1 * t3, e3);
        }, m2.format = function(t3) {
          var e3 = this, n3 = this.$locale();
          if (!this.isValid())
            return n3.invalidDate || $;
          var r3 = t3 || "YYYY-MM-DDTHH:mm:ssZ", i2 = O.z(this), s3 = this.$H, u3 = this.$m, a3 = this.$M, o3 = n3.weekdays, f3 = n3.months, h2 = function(t4, n4, i3, s4) {
            return t4 && (t4[n4] || t4(e3, r3)) || i3[n4].slice(0, s4);
          }, c3 = function(t4) {
            return O.s(s3 % 12 || 12, t4, "0");
          }, d2 = n3.meridiem || function(t4, e4, n4) {
            var r4 = t4 < 12 ? "AM" : "PM";
            return n4 ? r4.toLowerCase() : r4;
          }, l2 = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: a3 + 1, MM: O.s(a3 + 1, 2, "0"), MMM: h2(n3.monthsShort, a3, f3, 3), MMMM: h2(f3, a3), D: this.$D, DD: O.s(this.$D, 2, "0"), d: String(this.$W), dd: h2(n3.weekdaysMin, this.$W, o3, 2), ddd: h2(n3.weekdaysShort, this.$W, o3, 3), dddd: o3[this.$W], H: String(s3), HH: O.s(s3, 2, "0"), h: c3(1), hh: c3(2), a: d2(s3, u3, true), A: d2(s3, u3, false), m: String(u3), mm: O.s(u3, 2, "0"), s: String(this.$s), ss: O.s(this.$s, 2, "0"), SSS: O.s(this.$ms, 3, "0"), Z: i2 };
          return r3.replace(y, function(t4, e4) {
            return e4 || l2[t4] || i2.replace(":", "");
          });
        }, m2.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m2.diff = function(r3, d2, $2) {
          var l2, y2 = O.p(d2), M3 = w(r3), m3 = (M3.utcOffset() - this.utcOffset()) * e2, g2 = this - M3, v2 = O.m(this, M3);
          return v2 = (l2 = {}, l2[c2] = v2 / 12, l2[f2] = v2, l2[h] = v2 / 3, l2[o2] = (g2 - m3) / 6048e5, l2[a2] = (g2 - m3) / 864e5, l2[u2] = g2 / n2, l2[s2] = g2 / e2, l2[i] = g2 / t2, l2)[y2] || g2, $2 ? v2 : O.a(v2);
        }, m2.daysInMonth = function() {
          return this.endOf(f2).$D;
        }, m2.$locale = function() {
          return D[this.$L];
        }, m2.locale = function(t3, e3) {
          if (!t3)
            return this.$L;
          var n3 = this.clone(), r3 = S(t3, e3, true);
          return r3 && (n3.$L = r3), n3;
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
      return w.prototype = T, [["$ms", r2], ["$s", i], ["$m", s2], ["$H", u2], ["$W", a2], ["$M", f2], ["$y", c2], ["$D", d]].forEach(function(t3) {
        T[t3[1]] = function(e3) {
          return this.$g(e3, t3[0], t3[1]);
        };
      }), w.extend = function(t3, e3) {
        return t3.$i || (t3(e3, _, w), t3.$i = true), w;
      }, w.locale = S, w.isDayjs = p, w.unix = function(t3) {
        return w(1e3 * t3);
      }, w.en = D[v], w.Ls = D, w.p = {}, w;
    });
  })(dayjs_min);
  const dayjs = dayjs_min.exports;
  var utc$1 = { exports: {} };
  (function(module, exports2) {
    !function(t2, i) {
      module.exports = i();
    }(commonjsGlobal, function() {
      var t2 = "minute", i = /[+-]\d\d(?::?\d\d)?/g, e2 = /([+-]|\d\d)/g;
      return function(s2, f2, n2) {
        var u2 = f2.prototype;
        n2.utc = function(t3) {
          var i2 = { date: t3, utc: true, args: arguments };
          return new f2(i2);
        }, u2.utc = function(i2) {
          var e3 = n2(this.toDate(), { locale: this.$L, utc: true });
          return i2 ? e3.add(this.utcOffset(), t2) : e3;
        }, u2.local = function() {
          return n2(this.toDate(), { locale: this.$L, utc: false });
        };
        var o2 = u2.parse;
        u2.parse = function(t3) {
          t3.utc && (this.$u = true), this.$utils().u(t3.$offset) || (this.$offset = t3.$offset), o2.call(this, t3);
        };
        var r2 = u2.init;
        u2.init = function() {
          if (this.$u) {
            var t3 = this.$d;
            this.$y = t3.getUTCFullYear(), this.$M = t3.getUTCMonth(), this.$D = t3.getUTCDate(), this.$W = t3.getUTCDay(), this.$H = t3.getUTCHours(), this.$m = t3.getUTCMinutes(), this.$s = t3.getUTCSeconds(), this.$ms = t3.getUTCMilliseconds();
          } else
            r2.call(this);
        };
        var a2 = u2.utcOffset;
        u2.utcOffset = function(s3, f3) {
          var n3 = this.$utils().u;
          if (n3(s3))
            return this.$u ? 0 : n3(this.$offset) ? a2.call(this) : this.$offset;
          if ("string" == typeof s3 && (s3 = function(t3) {
            void 0 === t3 && (t3 = "");
            var s4 = t3.match(i);
            if (!s4)
              return null;
            var f4 = ("" + s4[0]).match(e2) || ["-", 0, 0], n4 = f4[0], u4 = 60 * +f4[1] + +f4[2];
            return 0 === u4 ? 0 : "+" === n4 ? u4 : -u4;
          }(s3), null === s3))
            return this;
          var u3 = Math.abs(s3) <= 16 ? 60 * s3 : s3, o3 = this;
          if (f3)
            return o3.$offset = u3, o3.$u = 0 === s3, o3;
          if (0 !== s3) {
            var r3 = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
            (o3 = this.local().add(u3 + r3, t2)).$offset = u3, o3.$x.$localOffset = r3;
          } else
            o3 = this.utc();
          return o3;
        };
        var h = u2.format;
        u2.format = function(t3) {
          var i2 = t3 || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
          return h.call(this, i2);
        }, u2.valueOf = function() {
          var t3 = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
          return this.$d.valueOf() - 6e4 * t3;
        }, u2.isUTC = function() {
          return !!this.$u;
        }, u2.toISOString = function() {
          return this.toDate().toISOString();
        }, u2.toString = function() {
          return this.toDate().toUTCString();
        };
        var l = u2.toDate;
        u2.toDate = function(t3) {
          return "s" === t3 && this.$offset ? n2(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : l.call(this);
        };
        var c2 = u2.diff;
        u2.diff = function(t3, i2, e3) {
          if (t3 && this.$u === t3.$u)
            return c2.call(this, t3, i2, e3);
          var s3 = this.local(), f3 = n2(t3).local();
          return c2.call(s3, f3, i2, e3);
        };
      };
    });
  })(utc$1);
  const utc = utc$1.exports;
  var timezone$1 = { exports: {} };
  (function(module, exports2) {
    !function(t2, e2) {
      module.exports = e2();
    }(commonjsGlobal, function() {
      var t2 = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, e2 = {};
      return function(n2, i, o2) {
        var r2, a2 = function(t3, n3, i2) {
          void 0 === i2 && (i2 = {});
          var o3 = new Date(t3), r3 = function(t4, n4) {
            void 0 === n4 && (n4 = {});
            var i3 = n4.timeZoneName || "short", o4 = t4 + "|" + i3, r4 = e2[o4];
            return r4 || (r4 = new Intl.DateTimeFormat("en-US", { hour12: false, timeZone: t4, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: i3 }), e2[o4] = r4), r4;
          }(n3, i2);
          return r3.formatToParts(o3);
        }, u2 = function(e3, n3) {
          for (var i2 = a2(e3, n3), r3 = [], u3 = 0; u3 < i2.length; u3 += 1) {
            var f3 = i2[u3], s3 = f3.type, m = f3.value, c2 = t2[s3];
            c2 >= 0 && (r3[c2] = parseInt(m, 10));
          }
          var d = r3[3], l = 24 === d ? 0 : d, v = r3[0] + "-" + r3[1] + "-" + r3[2] + " " + l + ":" + r3[4] + ":" + r3[5] + ":000", h = +e3;
          return (o2.utc(v).valueOf() - (h -= h % 1e3)) / 6e4;
        }, f2 = i.prototype;
        f2.tz = function(t3, e3) {
          void 0 === t3 && (t3 = r2);
          var n3 = this.utcOffset(), i2 = this.toDate(), a3 = i2.toLocaleString("en-US", { timeZone: t3 }), u3 = Math.round((i2 - new Date(a3)) / 1e3 / 60), f3 = o2(a3).$set("millisecond", this.$ms).utcOffset(15 * -Math.round(i2.getTimezoneOffset() / 15) - u3, true);
          if (e3) {
            var s3 = f3.utcOffset();
            f3 = f3.add(n3 - s3, "minute");
          }
          return f3.$x.$timezone = t3, f3;
        }, f2.offsetName = function(t3) {
          var e3 = this.$x.$timezone || o2.tz.guess(), n3 = a2(this.valueOf(), e3, { timeZoneName: t3 }).find(function(t4) {
            return "timezonename" === t4.type.toLowerCase();
          });
          return n3 && n3.value;
        };
        var s2 = f2.startOf;
        f2.startOf = function(t3, e3) {
          if (!this.$x || !this.$x.$timezone)
            return s2.call(this, t3, e3);
          var n3 = o2(this.format("YYYY-MM-DD HH:mm:ss:SSS"));
          return s2.call(n3, t3, e3).tz(this.$x.$timezone, true);
        }, o2.tz = function(t3, e3, n3) {
          var i2 = n3 && e3, a3 = n3 || e3 || r2, f3 = u2(+o2(), a3);
          if ("string" != typeof t3)
            return o2(t3).tz(a3);
          var s3 = function(t4, e4, n4) {
            var i3 = t4 - 60 * e4 * 1e3, o3 = u2(i3, n4);
            if (e4 === o3)
              return [i3, e4];
            var r3 = u2(i3 -= 60 * (o3 - e4) * 1e3, n4);
            return o3 === r3 ? [i3, o3] : [t4 - 60 * Math.min(o3, r3) * 1e3, Math.max(o3, r3)];
          }(o2.utc(t3, i2).valueOf(), f3, a3), m = s3[0], c2 = s3[1], d = o2(m).utcOffset(c2);
          return d.$x.$timezone = a3, d;
        }, o2.tz.guess = function() {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        }, o2.tz.setDefault = function(t3) {
          r2 = t3;
        };
      };
    });
  })(timezone$1);
  const timezone = timezone$1.exports;
  var advancedFormat$1 = { exports: {} };
  (function(module, exports2) {
    !function(e2, t2) {
      module.exports = t2();
    }(commonjsGlobal, function() {
      return function(e2, t2, r2) {
        var n2 = t2.prototype, s2 = n2.format;
        r2.en.ordinal = function(e3) {
          var t3 = ["th", "st", "nd", "rd"], r3 = e3 % 100;
          return "[" + e3 + (t3[(r3 - 20) % 10] || t3[r3] || t3[0]) + "]";
        }, n2.format = function(e3) {
          var t3 = this, r3 = this.$locale();
          if (!this.isValid())
            return s2.bind(this)(e3);
          var n3 = this.$utils(), a2 = (e3 || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function(e4) {
            switch (e4) {
              case "Q":
                return Math.ceil((t3.$M + 1) / 3);
              case "Do":
                return r3.ordinal(t3.$D);
              case "gggg":
                return t3.weekYear();
              case "GGGG":
                return t3.isoWeekYear();
              case "wo":
                return r3.ordinal(t3.week(), "W");
              case "w":
              case "ww":
                return n3.s(t3.week(), "w" === e4 ? 1 : 2, "0");
              case "W":
              case "WW":
                return n3.s(t3.isoWeek(), "W" === e4 ? 1 : 2, "0");
              case "k":
              case "kk":
                return n3.s(String(0 === t3.$H ? 24 : t3.$H), "k" === e4 ? 1 : 2, "0");
              case "X":
                return Math.floor(t3.$d.getTime() / 1e3);
              case "x":
                return t3.$d.getTime();
              case "z":
                return "[" + t3.offsetName() + "]";
              case "zzz":
                return "[" + t3.offsetName("long") + "]";
              default:
                return e4;
            }
          });
          return s2.bind(this)(a2);
        };
      };
    });
  })(advancedFormat$1);
  const advancedFormat = advancedFormat$1.exports;
  var isSameOrBefore$1 = { exports: {} };
  (function(module, exports2) {
    !function(e2, i) {
      module.exports = i();
    }(commonjsGlobal, function() {
      return function(e2, i) {
        i.prototype.isSameOrBefore = function(e3, i2) {
          return this.isSame(e3, i2) || this.isBefore(e3, i2);
        };
      };
    });
  })(isSameOrBefore$1);
  const _isSameOrBefore = isSameOrBefore$1.exports;
  var isBetween$1 = { exports: {} };
  (function(module, exports2) {
    !function(e2, i) {
      module.exports = i();
    }(commonjsGlobal, function() {
      return function(e2, i, t2) {
        i.prototype.isBetween = function(e3, i2, s2, f2) {
          var n2 = t2(e3), o2 = t2(i2), r2 = "(" === (f2 = f2 || "()")[0], u2 = ")" === f2[1];
          return (r2 ? this.isAfter(n2, s2) : !this.isBefore(n2, s2)) && (u2 ? this.isBefore(o2, s2) : !this.isAfter(o2, s2)) || (r2 ? this.isBefore(n2, s2) : !this.isAfter(n2, s2)) && (u2 ? this.isAfter(o2, s2) : !this.isBefore(o2, s2));
        };
      };
    });
  })(isBetween$1);
  const _isBetween = isBetween$1.exports;
  var localizedFormat$1 = { exports: {} };
  (function(module, exports2) {
    !function(e2, t2) {
      module.exports = t2();
    }(commonjsGlobal, function() {
      var e2 = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" };
      return function(t2, o2, n2) {
        var r2 = o2.prototype, i = r2.format;
        n2.en.formats = e2, r2.format = function(t3) {
          void 0 === t3 && (t3 = "YYYY-MM-DDTHH:mm:ssZ");
          var o3 = this.$locale().formats, n3 = function(t4, o4) {
            return t4.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(t5, n4, r3) {
              var i2 = r3 && r3.toUpperCase();
              return n4 || o4[r3] || e2[r3] || o4[i2].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(e3, t6, o5) {
                return t6 || o5.slice(1);
              });
            });
          }(t3, void 0 === o3 ? {} : o3);
          return i.call(this, n3);
        };
      };
    });
  })(localizedFormat$1);
  const localizedFormat = localizedFormat$1.exports;
  var hu = { exports: {} };
  (function(module, exports2) {
    !function(e2, n2) {
      module.exports = n2(dayjs_min.exports);
    }(commonjsGlobal, function(e2) {
      function n2(e3) {
        return e3 && "object" == typeof e3 && "default" in e3 ? e3 : { default: e3 };
      }
      var t2 = n2(e2), r2 = { name: "hu", weekdays: "vas\xE1rnap_h\xE9tf\u0151_kedd_szerda_cs\xFCt\xF6rt\xF6k_p\xE9ntek_szombat".split("_"), weekdaysShort: "vas_h\xE9t_kedd_sze_cs\xFCt_p\xE9n_szo".split("_"), weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"), months: "janu\xE1r_febru\xE1r_m\xE1rcius_\xE1prilis_m\xE1jus_j\xFAnius_j\xFAlius_augusztus_szeptember_okt\xF3ber_november_december".split("_"), monthsShort: "jan_feb_m\xE1rc_\xE1pr_m\xE1j_j\xFAn_j\xFAl_aug_szept_okt_nov_dec".split("_"), ordinal: function(e3) {
        return e3 + ".";
      }, weekStart: 1, relativeTime: { future: "%s m\xFAlva", past: "%s", s: function(e3, n3, t3, r3) {
        return "n\xE9h\xE1ny m\xE1sodperc" + (r3 || n3 ? "" : "e");
      }, m: function(e3, n3, t3, r3) {
        return "egy perc" + (r3 || n3 ? "" : "e");
      }, mm: function(e3, n3, t3, r3) {
        return e3 + " perc" + (r3 || n3 ? "" : "e");
      }, h: function(e3, n3, t3, r3) {
        return "egy " + (r3 || n3 ? "\xF3ra" : "\xF3r\xE1ja");
      }, hh: function(e3, n3, t3, r3) {
        return e3 + " " + (r3 || n3 ? "\xF3ra" : "\xF3r\xE1ja");
      }, d: function(e3, n3, t3, r3) {
        return "egy " + (r3 || n3 ? "nap" : "napja");
      }, dd: function(e3, n3, t3, r3) {
        return e3 + " " + (r3 || n3 ? "nap" : "napja");
      }, M: function(e3, n3, t3, r3) {
        return "egy " + (r3 || n3 ? "h\xF3nap" : "h\xF3napja");
      }, MM: function(e3, n3, t3, r3) {
        return e3 + " " + (r3 || n3 ? "h\xF3nap" : "h\xF3napja");
      }, y: function(e3, n3, t3, r3) {
        return "egy " + (r3 || n3 ? "\xE9v" : "\xE9ve");
      }, yy: function(e3, n3, t3, r3) {
        return e3 + " " + (r3 || n3 ? "\xE9v" : "\xE9ve");
      } }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "YYYY.MM.DD.", LL: "YYYY. MMMM D.", LLL: "YYYY. MMMM D. H:mm", LLLL: "YYYY. MMMM D., dddd H:mm" } };
      return t2.default.locale(r2, null, true), r2;
    });
  })(hu);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(advancedFormat);
  dayjs.extend(localizedFormat);
  dayjs.extend(_isSameOrBefore);
  dayjs.extend(_isBetween);
  const getLocalTimezone = () => dayjs.tz.guess();
  const format = (datetime = "", format2 = "", timezone2 = "", locale = "hu") => {
    timezone2 = timezone2 ? timezone2 : dayjs.tz.guess();
    return dayjs(datetime).isValid() ? dayjs(datetime).tz(timezone2).locale(locale).format(format2) : "";
  };
  const offsetName = (datetime = "", timezone2 = "", lang = "hu") => {
    if (!dayjs(datetime).isValid())
      return "";
    timezone2 = timezone2 ? timezone2 : dayjs.tz.guess();
    const dtf = new Intl.DateTimeFormat(getLocaleForLang(lang), {
      timeZone: timezone2,
      timeZoneName: "short"
    });
    const result = dtf.formatToParts(new Date(datetime)).find((o2) => o2.type === "timeZoneName");
    return result && result.value;
  };
  const getLocaleForLang = (lang) => {
    return LOCALE_FOR_LANG.get(lang);
  };
  const convertMinToSec = (minutes) => {
    const splitted = minutes.split(":");
    return parseInt(splitted[0], 10) * 60 + parseInt(splitted[1], 10);
  };
  const isSameOrBefore = (date, unit = "day") => {
    return dayjs().isSameOrBefore(dayjs(date), unit);
  };
  const isBetween = (date, startDate, endDate) => {
    return dayjs(date).isBetween(startDate, dayjs(endDate));
  };
  const isSame = (date, compareDate, unit = "month") => {
    return dayjs(date).isSame(compareDate, unit);
  };
  const _hoisted_1$1 = ["onClick"];
  const _sfc_main$1 = {
    __name: "TimezoneSelector",
    props: {
      locale: {
        type: String,
        default: "hu"
      },
      currentZone: {
        type: String,
        required: true
      }
    },
    emits: ["change"],
    setup(__props, { emit }) {
      const props = __props;
      const { t: t2 } = useI18n();
      const mainClass = useMainClass("timezone-selector");
      const localZoneName = vue.computed(() => offsetName(new Date(), null, props.locale));
      const localTimeZone = dayjs.tz.guess();
      const timezoneCountries = vue.computed(() => {
        return Array.from(AVAILABLE_TIMEZONES_BY_COUNTRY.values()).map((item) => ({
          ...item,
          isActive: offsetName(new Date(), props.localTimezone, props.locale) === offsetName(new Date(), item.timezone, props.locale),
          zoneOffsetName: offsetName(new Date(), item.timezone, props.locale)
        }));
      });
      const onChangeTimezone = (tz) => emit("change", tz);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(vue.unref(mainClass))
        }, [
          vue.createVNode(vue.unref(i18n), {
            path: "common.selectTimezone",
            tag: "span"
          }, {
            timezone: vue.withCtx(() => [
              vue.createElementVNode("a", {
                href: "#",
                onClick: _cache[0] || (_cache[0] = vue.withModifiers(($event) => onChangeTimezone(vue.unref(localTimeZone)), ["prevent"]))
              }, vue.toDisplayString(vue.unref(localZoneName)), 1)
            ]),
            _: 1
          }),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(timezoneCountries), (country) => {
            return vue.openBlock(), vue.createElementBlock("a", {
              key: country.countryLabelKey,
              href: "#",
              class: vue.normalizeClass({ "is-active": country.isActive }),
              onClick: vue.withModifiers(($event) => onChangeTimezone(country.timezone), ["prevent"])
            }, vue.toDisplayString(vue.unref(t2)(`common.${country.countryLabelKey}`)) + " (" + vue.toDisplayString(country.zoneOffsetName) + ") ", 11, _hoisted_1$1);
          }), 128))
        ], 2);
      };
    }
  };
  const useColumns = (columns, hiddenColumns = "", variables = {}) => {
    const errorRef = vue.ref("");
    const { t: t2 } = useI18n();
    if (hiddenColumns) {
      try {
        const columnsToHide = validateColumnsName(vue.unref(columns), hiddenColumns);
        columns = omit$1(columnsToHide, vue.unref(columns));
      } catch (err) {
        errorRef.value = err;
      }
    }
    const convert2 = (column) => {
      var _a2, _b;
      return {
        ...column,
        ...column.label && { label: t2((_a2 = column.label) != null ? _a2 : "", variables) },
        ...column.tooltip && { tooltip: t2((_b = column.tooltip) != null ? _b : "") }
      };
    };
    const converted = vue.computed(() => map$1(convert2, vue.unref(columns)));
    return {
      columns: converted,
      error: errorRef
    };
  };
  const validateColumnsName = (columns, hiddenColumns = "") => {
    const hiddenColumnsArray = map$1(trim$1, split$1(",", hiddenColumns));
    const columnsArray = keys$1(columns);
    if (hiddenColumnsArray[0] === "")
      return resolve([]);
    const index = hiddenColumnsArray.findIndex((column) => !columnsArray.includes(column));
    if (index > -1) {
      throw hiddenColumnsArray[index];
    }
    return hiddenColumnsArray;
  };
  class WidgetError extends Error {
    constructor(message, options = {}) {
      const { key, cause } = options;
      super(message);
      this.name = "WidgetError";
      this.key = key;
      this.cause = cause;
    }
  }
  const UndefinedColumn = {
    message: "Undefined Column name Message",
    options: {
      key: "undefined-column",
      cause: {}
    }
  };
  const InvalidSeasonName = {
    message: "Invalid season name",
    options: {
      key: "invalid-season-name",
      cause: {}
    }
  };
  const _hoisted_1 = { class: "is-portrait-image" };
  const _hoisted_2 = ["href"];
  const _hoisted_3 = ["href"];
  const _sfc_main = {
    __name: "StatisticsTable",
    props: {
      columns: {
        type: Object,
        required: true
      },
      rows: {
        type: Array,
        default: () => []
      },
      isLoading: {
        type: Boolean,
        deafult: false
      },
      hideColumns: {
        type: String,
        default: ""
      },
      sort: {
        type: Object,
        default: () => ({})
      },
      externalTeamResolver: {
        type: Function,
        required: true
      },
      externalPlayerResolver: {
        type: Function,
        default: () => {
        }
      },
      isTeamLinked: {
        type: Boolean,
        default: false
      },
      isPlayerLinked: {
        type: Boolean,
        default: false
      }
    },
    emits: ["sort"],
    setup(__props, { emit }) {
      const props = __props;
      const { onError } = useError();
      const currentColumns = vue.computed(() => props.columns);
      const { columns, error } = useColumns(currentColumns, props.hideColumns);
      if (error.value)
        onError(
          new WidgetError(UndefinedColumn.message, {
            ...UndefinedColumn.options,
            cause: { column: error.value }
          })
        );
      const onSort = (payload) => emit("sort", payload);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(_sfc_main$2, null, {
          default: vue.withCtx(({ el: rootElement }) => [
            vue.createVNode(_sfc_main$c, {
              columns: vue.unref(columns),
              sort: props.sort,
              rows: props.rows,
              "is-loading": __props.isLoading,
              "append-to": rootElement,
              onSort
            }, vue.createSlots({
              "cell-index": vue.withCtx(({ row }) => [
                vue.createElementVNode("span", {
                  class: vue.normalizeClass(row.indexClass)
                }, vue.toDisplayString(row.index), 3)
              ]),
              "cell-playerPortrait": vue.withCtx(({ row }) => [
                vue.createElementVNode("div", _hoisted_1, [
                  (vue.openBlock(), vue.createBlock(_sfc_main$7, {
                    key: row.id || row.playerId,
                    src: row.playerPortrait,
                    "default-src": vue.unref(DEFAULT_PORTRAIT_IMAGE_URL)
                  }, null, 8, ["src", "default-src"]))
                ])
              ]),
              "cell-teamLogo": vue.withCtx(({ row }) => [
                (vue.openBlock(), vue.createBlock(_sfc_main$7, {
                  class: "is-logo-image",
                  key: row.teamId || row.id,
                  src: row.teamLogo
                }, null, 8, ["src"]))
              ]),
              _: 2
            }, [
              __props.isTeamLinked ? {
                name: "cell-teamName",
                fn: vue.withCtx(({ row }) => [
                  vue.createElementVNode("a", {
                    href: __props.externalTeamResolver(row.teamName),
                    target: "_blank"
                  }, vue.toDisplayString(row.teamName), 9, _hoisted_2)
                ]),
                key: "0"
              } : void 0,
              __props.isPlayerLinked ? {
                name: "cell-name",
                fn: vue.withCtx(({ row }) => [
                  vue.createElementVNode("a", {
                    href: __props.externalPlayerResolver(row.id),
                    target: "_blank"
                  }, vue.toDisplayString(row.name), 9, _hoisted_3)
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["columns", "sort", "rows", "is-loading", "append-to"])
          ]),
          _: 1
        });
      };
    }
  };
  const fetchVBRData = async (route, apiKey, data) => {
    const url = `${"https://api.icehockey.hu/vbr"}${vue.unref(route)}?${objectToQueryString(data)}`;
    return new Promise((resolve2, reject2) => {
      fetch(url, {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": resolveApiKey(apiKey)
        }
      }).then((response) => {
        return response.json();
      }).then((response) => {
        if (response.error)
          return reject2(response);
        resolve2(response.data);
      }).catch((error) => {
        reject2(error);
      });
    });
  };
  const objectToQueryString = (obj) => {
    return Object.keys(obj).map((key) => key + "=" + obj[key]).join("&");
  };
  const resolveApiKey = (apiKey) => {
    var _a2;
    if (apiKey)
      return apiKey;
    if ((_a2 = window.__MJSZ_VBR_WIDGET__) == null ? void 0 : _a2.apiKey)
      return window.__MJSZ_VBR_WIDGET__.apiKey;
    if ({ "VITE_API_URL": "https://api.icehockey.hu/vbr", "VITE_CSS_CLASS_PREFIX": "mjsz-vbr-", "VITE_VBR_API_KEY": "dd8adf5fdb738b3741fa579b5ede5ce69b681f62", "VITE_DOCS_BASE": "/widgets/docs/v2/", "VITE_USER_NODE_ENV": "production", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true }.NODE_ENV !== "production")
      return "dd8adf5fdb738b3741fa579b5ede5ce69b681f62";
    return "";
  };
  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.
  
    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.
  
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
  function t(t2, n2) {
    var e2 = "function" == typeof Symbol && t2[Symbol.iterator];
    if (!e2)
      return t2;
    var r2, i, o2 = e2.call(t2), a2 = [];
    try {
      for (; (void 0 === n2 || n2-- > 0) && !(r2 = o2.next()).done; )
        a2.push(r2.value);
    } catch (t3) {
      i = { error: t3 };
    } finally {
      try {
        r2 && !r2.done && (e2 = o2.return) && e2.call(o2);
      } finally {
        if (i)
          throw i.error;
      }
    }
    return a2;
  }
  var n;
  !function(t2) {
    t2[t2.NotStarted = 0] = "NotStarted", t2[t2.Running = 1] = "Running", t2[t2.Stopped = 2] = "Stopped";
  }(n || (n = {}));
  var e = { type: "xstate.init" };
  function r(t2) {
    return void 0 === t2 ? [] : [].concat(t2);
  }
  function o(t2, n2) {
    return "string" == typeof (t2 = "string" == typeof t2 && n2 && n2[t2] ? n2[t2] : t2) ? { type: t2 } : "function" == typeof t2 ? { type: t2.name, exec: t2 } : t2;
  }
  function a(t2) {
    return function(n2) {
      return t2 === n2;
    };
  }
  function u(t2) {
    return "string" == typeof t2 ? { type: t2 } : t2;
  }
  function c(t2, n2) {
    return { value: t2, context: n2, actions: [], changed: false, matches: a(t2) };
  }
  function f(t2, n2, e2) {
    var r2 = n2, i = false;
    return [t2.filter(function(t3) {
      if ("xstate.assign" === t3.type) {
        i = true;
        var n3 = Object.assign({}, r2);
        return "function" == typeof t3.assignment ? n3 = t3.assignment(r2, e2) : Object.keys(t3.assignment).forEach(function(i2) {
          n3[i2] = "function" == typeof t3.assignment[i2] ? t3.assignment[i2](r2, e2) : t3.assignment[i2];
        }), r2 = n3, false;
      }
      return true;
    }), r2, i];
  }
  function s(n2, i) {
    void 0 === i && (i = {});
    var s2 = t(f(r(n2.states[n2.initial].entry).map(function(t2) {
      return o(t2, i.actions);
    }), n2.context, e), 2), l = s2[0], v = s2[1], y = { config: n2, _options: i, initialState: { value: n2.initial, actions: l, context: v, matches: a(n2.initial) }, transition: function(e2, i2) {
      var s3, l2, v2 = "string" == typeof e2 ? { value: e2, context: n2.context } : e2, p = v2.value, g = v2.context, d = u(i2), x = n2.states[p];
      if (x.on) {
        var m = r(x.on[d.type]);
        try {
          for (var h = function(t2) {
            var n3 = "function" == typeof Symbol && Symbol.iterator, e3 = n3 && t2[n3], r2 = 0;
            if (e3)
              return e3.call(t2);
            if (t2 && "number" == typeof t2.length)
              return { next: function() {
                return t2 && r2 >= t2.length && (t2 = void 0), { value: t2 && t2[r2++], done: !t2 };
              } };
            throw new TypeError(n3 ? "Object is not iterable." : "Symbol.iterator is not defined.");
          }(m), b = h.next(); !b.done; b = h.next()) {
            var S = b.value;
            if (void 0 === S)
              return c(p, g);
            var w = "string" == typeof S ? { target: S } : S, j = w.target, E = w.actions, R = void 0 === E ? [] : E, N = w.cond, O = void 0 === N ? function() {
              return true;
            } : N, _ = void 0 === j, k = null != j ? j : p, T = n2.states[k];
            if (O(g, d)) {
              var q = t(f((_ ? r(R) : [].concat(x.exit, R, T.entry).filter(function(t2) {
                return t2;
              })).map(function(t2) {
                return o(t2, y._options.actions);
              }), g, d), 3), z = q[0], A = q[1], B = q[2], C = null != j ? j : p;
              return { value: C, context: A, actions: z, changed: j !== p || z.length > 0 || B, matches: a(C) };
            }
          }
        } catch (t2) {
          s3 = { error: t2 };
        } finally {
          try {
            b && !b.done && (l2 = h.return) && l2.call(h);
          } finally {
            if (s3)
              throw s3.error;
          }
        }
      }
      return c(p, g);
    } };
    return y;
  }
  const sortMachine = s({
    id: "sort",
    initial: SORT_STATE_ORIGINAL,
    states: {
      [SORT_STATE_ORIGINAL]: {
        on: {
          DIRECTION1: SORT_STATE_DESCEND,
          DIRECTION2: SORT_STATE_ASCEND
        }
      },
      [SORT_STATE_DESCEND]: {
        on: {
          DIRECTION1: SORT_STATE_ASCEND,
          DIRECTION2: SORT_STATE_ORIGINAL
        }
      },
      [SORT_STATE_ASCEND]: {
        on: {
          DIRECTION1: SORT_STATE_ORIGINAL,
          DIRECTION2: SORT_STATE_DESCEND
        }
      }
    }
  });
  const transitionOrderState = (originalSortState, sortState) => {
    const direction = sortState === SORT_STATE_ASCEND ? "DIRECTION2" : "DIRECTION1";
    return sortMachine.transition(originalSortState, direction).value;
  };
  function useSort(sortParams = {}) {
    const { sortTarget = null, orders = [] } = sortParams;
    const sort = vue.reactive({ sortTarget, orders });
    const change = ({ target, orders: orders2 }) => {
      if (sort.sortTarget !== target) {
        sort.sortTarget = target;
        sort.orders = orders2;
        return;
      }
      const nextOrders = orders2.map((order, index) => ({
        ...order,
        direction: transitionOrderState(sort.orders[index].direction, order.direction)
      }));
      sort.sortTarget = target;
      sort.orders = nextOrders;
    };
    return {
      sort,
      change
    };
  }
  const usePage = (options = {}) => {
    const { initial = 1, items = [], limit, auto = false } = options;
    const page = vue.ref(initial);
    const condition = (date) => {
      return isSameOrBefore(date, "day");
    };
    const calculatePage = () => {
      if (!auto)
        return;
      const index = findIndex$1(propSatisfies$1(condition, "gameDate"))(vue.unref(items));
      page.value = index === -1 ? 1 : Math.floor(index / limit) + 1;
    };
    watchOnce(items, calculatePage);
    const change = (value) => {
      page.value = value;
    };
    return {
      page,
      change
    };
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
        this.result = sortWith$1(sort.orders.map((s2) => compose(sortDirection(s2.direction), prop$1)(s2.target)))(this.result);
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
        this.result = this.result.filter((game2) => {
          return new Date(game2.gameDate).getMonth() == month;
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
  const rawConvert = (data, ...fn) => map$1(compose(...fn))(data);
  const playerName = (row) => ({
    ...row,
    ...row.lastName && { name: `${row.lastName} ${row.firstName}` }
  });
  const convertTimes = (targets = []) => (row) => {
    targets.map((key) => {
      if (!row[key])
        return row;
      return row[`${key}Sec`] = convertMinToSec(row[key]);
    });
    return row;
  };
  const dateDiff = (a2, b) => new Date(a2.gameDate).getTime() - new Date(b.gameDate).getTime();
  const sortGames = sortWith$1([dateDiff, ascend$1(prop$1("id"))]);
  const externalGameLinkResolver = (resolver, gameId) => {
    var _a2;
    if (typeof resolver === "function")
      return resolver(gameId);
    if (resolver)
      return resolver + gameId;
    if ((_a2 = window == null ? void 0 : window.__MJSZ_VBR_WIDGET__) == null ? void 0 : _a2.gameUrl)
      return window.__MJSZ_VBR_WIDGET__.gameUrl + gameId;
    return DEFAULT_EXTERNAL_BASE_URL + gameId;
  };
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
  const externalPlayerLinkResolver = (resolver, playerId) => {
    var _a2;
    if (typeof resolver === "function")
      return resolver(playerId);
    if (resolver)
      return encodeURI(resolver + playerId);
    if ((_a2 = window == null ? void 0 : window.__MJSZ_VBR_WIDGET__) == null ? void 0 : _a2.gameUrl)
      return encodeURI(window.__MJSZ_VBR_WIDGET__.playerUrl + playerId);
    return encodeURI(DEFAULT_EXTERNAL_PLAYER_URL + playerId);
  };
  const COLUMNS_SCHEDULE = {
    name: {
      label: "table.gameName.short",
      tooltip: "table.gameName.tooltip",
      class: "is-text-left is-text-light"
    },
    gameDateDate: {
      label: "table.gameDate.short",
      tooltip: "table.gameDate.tooltip",
      class: "is-text-left"
    },
    gameDateTime: {
      label: "table.gameDateTime.short",
      tooltip: "table.gameDateTime.tooltip",
      class: "is-text-left"
    },
    homeTeamName: {
      label: "table.homeTeam.short",
      tooltip: "table.homeTeam.tooltip",
      class: "is-text-right is-w-auto is-text-bold"
    },
    homeTeamLogo: {
      label: "",
      class: "is-has-image"
    },
    gameResult: {
      label: "",
      class: "is-text-bold is-text-xl"
    },
    gameResultType: {
      label: "",
      tooltip: ""
    },
    awayTeamLogo: {
      label: "",
      class: "is-has-image"
    },
    awayTeamName: {
      label: "table.awayTeam.short",
      tooltip: "table.awayTeam.tooltip",
      class: "is-text-left is-w-auto is-text-bold"
    },
    location: {
      label: "table.location.short",
      tooltip: "table.location.tooltip",
      class: "is-text-left"
    },
    broadcast: {
      label: "table.broadcast.short",
      tooltip: "table.broadcast.tooltip"
    },
    more: {
      label: ""
    }
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
  const COLUMNS_FIELD_PLAYERS = {
    index: {
      label: "#",
      class: "is-text-left"
    },
    playerPortrait: {
      label: "",
      class: "is-has-image"
    },
    name: {
      label: "table.name.short",
      tooltip: "table.name.tooltip",
      class: "is-text-left is-w-auto is-text-bold",
      sortOrders: [{ target: "name", direction: SORT_STATE_ASCEND }]
    },
    teamLogo: {
      label: "",
      class: "is-has-image"
    },
    teamName: {
      label: "table.team.short",
      tooltip: "table.team.tooltip",
      class: "is-text-left is-w-auto",
      sortOrders: [{ target: "teamName", direction: SORT_STATE_ASCEND }]
    },
    gp: {
      label: "table.game.short",
      tooltip: "table.game.tooltip",
      sortOrders: [{ target: "gp", direction: SORT_STATE_DESCEND }]
    },
    g: {
      label: "table.goals.short",
      tooltip: "table.goals.tooltip",
      sortOrders: [
        { target: "g", direction: SORT_STATE_DESCEND },
        { target: "a", direction: SORT_STATE_DESCEND }
      ]
    },
    a: {
      label: "table.assists.short",
      tooltip: "table.assists.tooltip",
      sortOrders: [
        { target: "a", direction: SORT_STATE_DESCEND },
        { target: "g", direction: SORT_STATE_DESCEND }
      ]
    },
    point: {
      label: "table.points.short",
      tooltip: "table.points.tooltip",
      sortOrders: [{ target: "point", direction: SORT_STATE_DESCEND }]
    },
    plusMinus: {
      label: "table.plusMinus.short",
      tooltip: "table.plusMinus.tooltip",
      sortOrders: [{ target: "plusMinus", direction: SORT_STATE_DESCEND }]
    },
    shoot: {
      label: "table.sog.short",
      tooltip: "table.sog.tooltip",
      sortOrders: [{ target: "shoot", direction: SORT_STATE_DESCEND }]
    },
    shootPercent: {
      label: "table.sogPercent.short",
      tooltip: "table.sogPercent.tooltip",
      sortOrders: [{ target: "shootPercent", direction: SORT_STATE_DESCEND }]
    }
  };
  const COLUMNS_FIELD_PLAYERS_PENALTY = {
    index: {
      label: "table.blank",
      class: "is-text-left"
    },
    playerPortrait: {
      label: "",
      class: "is-has-image"
    },
    name: {
      label: "table.name.short",
      tooltip: "table.name.tooltip",
      class: "is-text-left is-w-auto is-text-bold",
      sortOrders: [{ target: "name", direction: SORT_STATE_ASCEND }]
    },
    teamLogo: {
      label: "",
      class: "is-has-image"
    },
    teamName: {
      label: "table.team.short",
      tooltip: "table.team.tooltip",
      class: "is-text-left is-w-auto",
      sortOrders: [{ target: "teamName", direction: SORT_STATE_ASCEND }]
    },
    gp: {
      label: "table.game.short",
      tooltip: "table.game.tooltip",
      sortOrders: [{ target: "gp", direction: SORT_STATE_DESCEND }]
    },
    p2: {
      label: "table.minorPenalties.short",
      tooltip: "table.minorPenalties.tooltip",
      sortOrders: [
        { target: "p2", direction: SORT_STATE_DESCEND },
        { target: "pim", direction: SORT_STATE_DESCEND }
      ]
    },
    p5: {
      label: "table.majorPenalties.short",
      tooltip: "table.majorPenalties.tooltip",
      sortOrders: [
        { target: "p5", direction: SORT_STATE_DESCEND },
        { target: "pim", direction: SORT_STATE_DESCEND }
      ]
    },
    p10: {
      label: "table.misconducts.short",
      tooltip: "table.misconducts.tooltip",
      sortOrders: [
        { target: "p10", direction: SORT_STATE_DESCEND },
        { target: "pim", direction: SORT_STATE_DESCEND }
      ]
    },
    p20: {
      label: "table.gameMisconducts.short",
      tooltip: "table.gameMisconducts.tooltip",
      sortOrders: [
        { target: "p20", direction: SORT_STATE_DESCEND },
        { target: "pim", direction: SORT_STATE_DESCEND }
      ]
    },
    p25: {
      label: "table.matchPenalties.short",
      tooltip: "table.matchPenalties.tooltip",
      sortOrders: [
        { target: "p25", direction: SORT_STATE_DESCEND },
        { target: "pim", direction: SORT_STATE_DESCEND }
      ]
    },
    pim: {
      label: "table.pim.short",
      tooltip: "table.pim.tooltip",
      sortOrders: [{ target: "pim", direction: SORT_STATE_DESCEND }]
    }
  };
  const COLUMNS_GOALIES = {
    index: {
      label: "table.blank",
      class: "is-text-left"
    },
    playerPortrait: {
      label: "",
      class: "is-has-image"
    },
    name: {
      label: "table.name.short",
      tooltip: "table.name.tooltip",
      class: "is-text-left is-w-auto is-text-bold",
      sortOrders: [{ target: "name", direction: SORT_STATE_ASCEND }]
    },
    teamLogo: {
      label: "",
      class: "is-has-image"
    },
    teamName: {
      label: "table.team.short",
      tooltip: "table.team.tooltip",
      class: "is-text-left is-w-auto",
      sortOrders: [{ target: "teamName", direction: SORT_STATE_ASCEND }]
    },
    gkd: {
      label: "table.gpgk.short",
      tooltip: "table.gpgk.tooltip",
      sortOrders: [{ target: "gkd", direction: SORT_STATE_DESCEND }]
    },
    gpi: {
      label: "table.gpi.short",
      tooltip: "table.gpi.tooltip",
      sortOrders: [{ target: "gpi", direction: SORT_STATE_DESCEND }]
    },
    mip: {
      label: "table.toi.short",
      tooltip: "table.toi.tooltip",
      sortOrders: [{ target: "mipSec", direction: SORT_STATE_DESCEND }]
    },
    mipPercent: {
      label: "table.toiPercent.short",
      tooltip: "table.toiPercent.tooltip",
      sortOrders: [{ target: "mipPercent", direction: SORT_STATE_DESCEND }]
    },
    ga: {
      label: "table.ga.short",
      tooltip: "table.ga.tooltip",
      sortOrders: [{ target: "ga", direction: SORT_STATE_DESCEND }]
    },
    gaa: {
      label: "table.gaa.short",
      tooltip: "table.gaa.tooltip",
      sortOrders: [{ target: "gaa", direction: SORT_STATE_DESCEND }]
    },
    sa: {
      label: "table.sa.short",
      tooltip: "table.sa.tooltip",
      sortOrders: [{ target: "sa", direction: SORT_STATE_DESCEND }]
    },
    svs: {
      label: "table.svs.short",
      tooltip: "table.svs.tooltip",
      sortOrders: [{ target: "svs", direction: SORT_STATE_DESCEND }]
    },
    svsPercent: {
      label: "table.svsPercent.short",
      tooltip: "table.svsPercent.tooltip",
      sortOrders: [{ target: "svsPercent", direction: SORT_STATE_DESCEND }]
    }
  };
  const COLUMNS_TEAM_ATTENDANCE = {
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
    home: {
      label: "table.homeHeader.short"
    },
    homeGame: {
      label: "table.homeGame.short",
      tooltip: "table.homeGame.tooltip",
      sortOrders: [{ target: "homeGame", direction: SORT_STATE_DESCEND }]
    },
    homeAttendance: {
      label: "table.homeAttendance.short",
      tooltip: "table.homeAttendance.tooltip",
      sortOrders: [{ target: "homeAttendance", direction: SORT_STATE_DESCEND }]
    },
    homeAttendanceAvg: {
      label: "table.homeAttendanceAvg.short",
      tooltip: "table.homeAttendanceAvg.tooltip",
      sortOrders: [{ target: "homeAttendanceAvg", direction: SORT_STATE_DESCEND }]
    },
    away: {
      label: "table.awayHeader.short"
    },
    awayGame: {
      label: "table.awayGame.short",
      tooltip: "table.awayGame.tooltip",
      sortOrders: [{ target: "awayGame", direction: SORT_STATE_DESCEND }]
    },
    awayAttendance: {
      label: "table.awayAttendance.short",
      tooltip: "table.awayAttendance.tooltip",
      sortOrders: [{ target: "awayAttendance", direction: SORT_STATE_DESCEND }]
    },
    awayAttendanceAvg: {
      label: "table.awayAttendanceAvg.short",
      tooltip: "table.awayAttendanceAvg.tooltip",
      sortOrders: [{ target: "awayAttendanceAvg", direction: SORT_STATE_DESCEND }]
    },
    total: {
      label: "table.totalHeader.short"
    },
    totalGame: {
      label: "table.totalGame.short",
      tooltip: "table.totalGame.tooltip",
      sortOrders: [{ target: "totalGame", direction: SORT_STATE_DESCEND }]
    },
    totalAttendance: {
      label: "table.totalAttendance.short",
      tooltip: "table.totalAttendance.tooltip",
      sortOrders: [{ target: "totalAttendance", direction: SORT_STATE_DESCEND }]
    },
    totalAttendanceAvg: {
      label: "table.totalAttendanceAvg.short",
      tooltip: "table.totalAttendanceAvg.tooltip",
      sortOrders: [{ target: "totalAttendanceAvg", direction: SORT_STATE_DESCEND }]
    }
  };
  const COLUMNS_TEAMS_FAIRPLAY = {
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
    gp: {
      label: "table.game.short",
      tooltip: "table.game.tooltip",
      sortOrders: [{ target: "gp", direction: SORT_STATE_DESCEND }]
    },
    p2: {
      label: "table.minorPenalties.short",
      tooltip: "table.minorPenalties.tooltip",
      sortOrders: [
        { target: "p2", direction: SORT_STATE_DESCEND },
        { target: "pim", direction: SORT_STATE_DESCEND }
      ]
    },
    p5: {
      label: "table.majorPenalties.short",
      tooltip: "table.majorPenalties.tooltip",
      sortOrders: [
        { target: "p5", direction: SORT_STATE_DESCEND },
        { target: "pim", direction: SORT_STATE_DESCEND }
      ]
    },
    p10: {
      label: "table.misconducts.short",
      tooltip: "table.misconducts.tooltip",
      sortOrders: [
        { target: "p10", direction: SORT_STATE_DESCEND },
        { target: "pim", direction: SORT_STATE_DESCEND }
      ]
    },
    p20: {
      label: "table.gameMisconducts.short",
      tooltip: "table.gameMisconducts.tooltip",
      sortOrders: [
        { target: "p20", direction: SORT_STATE_DESCEND },
        { target: "pim", direction: SORT_STATE_DESCEND }
      ]
    },
    p25: {
      label: "table.matchPenalties.short",
      tooltip: "table.matchPenalties.tooltip",
      sortOrders: [
        { target: "p25", direction: SORT_STATE_DESCEND },
        { target: "pim", direction: SORT_STATE_DESCEND }
      ]
    },
    pimPerGame: {
      label: "table.pimPerGame.short",
      tooltip: "table.pimPerGame.tooltip",
      sortOrders: [{ target: "pimPerGame", direction: SORT_STATE_DESCEND }]
    },
    pim: {
      label: "table.pim.short",
      tooltip: "table.pim.tooltip",
      sortOrders: [{ target: "pim", direction: SORT_STATE_DESCEND }]
    }
  };
  const COLUMNS_TEAMS_PENALTY_KILLING = {
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
    gp: {
      label: "table.game.short",
      tooltip: "table.game.tooltip",
      sortOrders: [{ target: "gp", direction: SORT_STATE_DESCEND }]
    },
    dvg: {
      label: "table.powerplayDisadvantages.short",
      tooltip: "table.powerplayDisadvantages.tooltip",
      sortOrders: [{ target: "dvg", direction: SORT_STATE_DESCEND }]
    },
    dvgTime: {
      label: "table.dvgTime.short",
      tooltip: "table.dvgTime.tooltip",
      sortOrders: [{ target: "dvgTimeSec", direction: SORT_STATE_DESCEND }]
    },
    dvgTimePP1: {
      label: "table.dvgTimePP1.short",
      tooltip: "table.dvgTimePP1.tooltip",
      sortOrders: [{ target: "dvgTimePP1Sec", direction: SORT_STATE_DESCEND }]
    },
    dvgTimePP2: {
      label: "table.dvgTimePP2.short",
      tooltip: "table.dvgTimePP2.tooltip",
      sortOrders: [{ target: "dvgTimePP2", direction: SORT_STATE_DESCEND }]
    },
    ppga: {
      label: "table.ppga.short",
      tooltip: "table.ppga.tooltip",
      sortOrders: [{ target: "ppga", direction: SORT_STATE_DESCEND }]
    },
    shgf: {
      label: "table.shgf.short",
      tooltip: "table.shgf.tooltip",
      sortOrders: [{ target: "shgf", direction: SORT_STATE_DESCEND }]
    },
    pkPercent: {
      label: "table.pkPercent.short",
      tooltip: "table.pkPercent.tooltip",
      sortOrders: [{ target: "pkPercent", direction: SORT_STATE_DESCEND }]
    }
  };
  const COLUMNS_TEAMS_POWERPLAY = {
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
    gp: {
      label: "table.game.short",
      tooltip: "table.game.tooltip",
      sortOrders: [{ target: "gp", direction: SORT_STATE_DESCEND }]
    },
    adv: {
      label: "table.adv.short",
      tooltip: "table.adv.tooltip",
      sortOrders: [{ target: "adv", direction: SORT_STATE_DESCEND }]
    },
    advTime: {
      label: "table.advTime.short",
      tooltip: "table.advTime.tooltip",
      sortOrders: [{ target: "advTimeSec", direction: SORT_STATE_DESCEND }]
    },
    advTimePP1: {
      label: "table.advTimePP1.short",
      tooltip: "table.advTimePP1.tooltip",
      sortOrders: [{ target: "advTimePP1Sec", direction: SORT_STATE_DESCEND }]
    },
    advTimePP2: {
      label: "table.advTimePP2.short",
      tooltip: "table.advTimePP2.tooltip",
      sortOrders: [{ target: "advTimePP2Sec", direction: SORT_STATE_DESCEND }]
    },
    ppgf: {
      label: "table.ppgf.short",
      tooltip: "table.ppgf.tooltip",
      sortOrders: [{ target: "ppgf", direction: SORT_STATE_DESCEND }]
    },
    shga: {
      label: "table.shga.short",
      tooltip: "table.shga.tooltip",
      sortOrders: [{ target: "shga", direction: SORT_STATE_DESCEND }]
    },
    ppPercent: {
      label: "table.ppPercent.short",
      tooltip: "table.ppPercent.tooltip",
      sortOrders: [{ target: "ppPercent", direction: SORT_STATE_DESCEND }]
    }
  };
  const COLUMNS_SCORING_EFFICIENCY = {
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
      sortOrders: [{ target: "gp", direction: SORT_STATE_DESCEND }]
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
    GFGP: {
      label: "table.gfgp.short",
      tooltip: "table.gfgp.tooltip",
      sortOrders: [{ target: "GFGP", direction: SORT_STATE_DESCEND }]
    },
    GAGP: {
      label: "table.gagp.short",
      tooltip: "table.gagp.tooltip",
      sortOrders: [{ target: "GAGP", direction: SORT_STATE_ASCEND }]
    },
    Shots: {
      label: "table.sog.short",
      tooltip: "table.sog.tooltip",
      sortOrders: [{ target: "Shots", direction: SORT_STATE_DESCEND }]
    },
    SA: {
      label: "table.sa.short",
      tooltip: "table.sa.tooltip",
      sortOrders: [{ target: "SA", direction: SORT_STATE_ASCEND }]
    },
    ShotsGP: {
      label: "table.sogp.short",
      tooltip: "table.sogp.tooltip",
      sortOrders: [{ target: "ShotsGP", direction: SORT_STATE_DESCEND }]
    },
    SAGP: {
      label: "table.sagp.short",
      tooltip: "table.sagp.tooltip",
      sortOrders: [{ target: "SAGP", direction: SORT_STATE_ASCEND }]
    },
    GFShots: {
      label: "table.sogPercent.short",
      tooltip: "table.sogPercent.tooltip",
      sortOrders: [{ target: "GFShots", direction: SORT_STATE_DESCEND }]
    }
  };
  exports.AVAILABLE_TIMEZONES_BY_COUNTRY = AVAILABLE_TIMEZONES_BY_COUNTRY;
  exports.BaseSelect = _sfc_main$h;
  exports.COLUMNS_FIELD_PLAYERS = COLUMNS_FIELD_PLAYERS;
  exports.COLUMNS_FIELD_PLAYERS_PENALTY = COLUMNS_FIELD_PLAYERS_PENALTY;
  exports.COLUMNS_GOALIES = COLUMNS_GOALIES;
  exports.COLUMNS_SCHEDULE = COLUMNS_SCHEDULE;
  exports.COLUMNS_SCORING_EFFICIENCY = COLUMNS_SCORING_EFFICIENCY;
  exports.COLUMNS_STANDINGS_P_2 = COLUMNS_STANDINGS_P_2;
  exports.COLUMNS_STANDINGS_P_3 = COLUMNS_STANDINGS_P_3;
  exports.COLUMNS_TEAMS_FAIRPLAY = COLUMNS_TEAMS_FAIRPLAY;
  exports.COLUMNS_TEAMS_PENALTY_KILLING = COLUMNS_TEAMS_PENALTY_KILLING;
  exports.COLUMNS_TEAMS_POWERPLAY = COLUMNS_TEAMS_POWERPLAY;
  exports.COLUMNS_TEAM_ATTENDANCE = COLUMNS_TEAM_ATTENDANCE;
  exports.DEFAULT_EXTERNAL_BASE_URL = DEFAULT_EXTERNAL_BASE_URL;
  exports.DEFAULT_EXTERNAL_PLAYER_URL = DEFAULT_EXTERNAL_PLAYER_URL;
  exports.DEFAULT_EXTERNAL_TEAM_URL = DEFAULT_EXTERNAL_TEAM_URL;
  exports.DEFAULT_PORTRAIT_IMAGE_URL = DEFAULT_PORTRAIT_IMAGE_URL;
  exports.DataTable = _sfc_main$c;
  exports.ErrorNotice = _sfc_main$a;
  exports.ErrorProvider = _sfc_main$9;
  exports.FloatingPanel = _sfc_main$d;
  exports.I18NProvider = I18NProvider;
  exports.Image = _sfc_main$7;
  exports.InvalidSeasonName = InvalidSeasonName;
  exports.LOCALE_FOR_LANG = LOCALE_FOR_LANG;
  exports.LoadingIndicator = _sfc_main$6;
  exports.Paginator = _sfc_main$3;
  exports.REFRESH_DELAY = REFRESH_DELAY;
  exports.ResponsiveTable = _sfc_main$2;
  exports.SORT_STATE_ASCEND = SORT_STATE_ASCEND;
  exports.SORT_STATE_DESCEND = SORT_STATE_DESCEND;
  exports.SORT_STATE_ORIGINAL = SORT_STATE_ORIGINAL;
  exports.StatisticsTable = _sfc_main;
  exports.TimezoneSelector = _sfc_main$1;
  exports.UndefinedColumn = UndefinedColumn;
  exports.VBR_API_GOALIE_PATH = VBR_API_GOALIE_PATH;
  exports.VBR_API_GOALIE_UNDER_PATH = VBR_API_GOALIE_UNDER_PATH;
  exports.WidgetError = WidgetError;
  exports.appendTo = appendTo;
  exports.convert = convert;
  exports.convertMinToSec = convertMinToSec;
  exports.convertTimes = convertTimes;
  exports.createI18n = createI18n;
  exports.externalGameLinkResolver = externalGameLinkResolver;
  exports.externalPlayerLinkResolver = externalPlayerLinkResolver;
  exports.externalTeamLinkResolver = externalTeamLinkResolver;
  exports.fetchVBRData = fetchVBRData;
  exports.format = format;
  exports.getLocalTimezone = getLocalTimezone;
  exports.i18n = i18n;
  exports.isBetween = isBetween;
  exports.isSame = isSame;
  exports.isSameOrBefore = isSameOrBefore;
  exports.offsetName = offsetName;
  exports.playerName = playerName;
  exports.rawConvert = rawConvert;
  exports.sortGames = sortGames;
  exports.toKebabCase = toKebabCase;
  exports.useColumns = useColumns;
  exports.useError = useError;
  exports.useErrorProvider = useErrorProvider;
  exports.useI18n = useI18n;
  exports.usePage = usePage;
  exports.useSort = useSort;
  exports.validateColumnsName = validateColumnsName;
  Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
  return exports;
}({}, Vue);
