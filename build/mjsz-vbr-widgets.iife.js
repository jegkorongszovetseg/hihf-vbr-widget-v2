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
      } catch (e2) {
        error.value = e2;
        onError(e2);
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
  const fetchVBRData = async (route, apiKey, data) => {
    const url = `${"https://api.icehockey.hu/vbr"}${vue.unref(route)}?${objectToQueryString(data)}`;
    return new Promise((resolve, reject2) => {
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
        resolve(response.data);
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
  const DEFAULT_EXTERNAL_TEAM_URL = "https://www.ersteliga.hu/stats/teams#/team/3314/21096?name=";
  const SORT_STATE_ORIGINAL = "original";
  const SORT_STATE_DESCEND = "descend";
  const SORT_STATE_ASCEND = "ascend";
  (/* @__PURE__ */ new Map()).set("hu", "hu-hu").set("en", "hu-gb");
  (/* @__PURE__ */ new Map()).set("Europe/Budapest", { countryLabelKey: "hungary", timezone: "Europe/Budapest" }).set("Europe/Bucharest", { countryLabelKey: "romania", timezone: "Europe/Bucharest" });
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
  var max = /* @__PURE__ */ _curry2(function max2(a2, b) {
    return b > a2 ? b : a2;
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
  const _isInteger = Number.isInteger || function _isInteger2(n2) {
    return n2 << 0 === n2;
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
  var toLower = /* @__PURE__ */ invoker$1(0, "toLowerCase");
  const toLower$1 = toLower;
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
  var isSameOrBefore = { exports: {} };
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
  })(isSameOrBefore);
  const _isSameOrBefore = isSameOrBefore.exports;
  var isBetween = { exports: {} };
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
  })(isBetween);
  const _isBetween = isBetween.exports;
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
  const dateDiff = (a2, b) => new Date(a2.gameDate).getTime() - new Date(b.gameDate).getTime();
  sortWith$1([dateDiff, ascend$1(prop$1("id"))]);
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
      const { onError, error, hasError } = useErrorProvider();
      const locale = vue.computed(() => props.locale);
      const {
        state: rows,
        error: apiError,
        isLoading
      } = useAsyncState(
        () => fetchVBRData("/v1/standings", props.apiKey, {
          championshipId: Number(props.championshipId),
          division: props.division
        }),
        [],
        {
          onError: (error2) => onError(error2)
        }
      );
      const { sort, change } = useSort();
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
