(function(vue) {
  "use strict";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$9 = {};
  const _hoisted_1$6 = { class: "child" };
  function _sfc_render$4(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$6, "CHILD");
  }
  const Child = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$4]]);
  const _style_0 = ":host {\n  --text-color: red;\n  --bg-color: white;\n}\n.text {\n  width: 100%;\n  text-align: center;\n  color: var(--text-color);\n}\n.child {\n  width: 100%;\n  text-align: center;\n  font-weight: 700;\n  background-color: var(--bg-color);\n}\n";
  const _hoisted_1$5 = { class: "text" };
  const _sfc_main$8 = {
    __name: "Test.ce",
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$5, [
          vue.createTextVNode(" TEST "),
          vue.createVNode(Child)
        ]);
      };
    }
  };
  const Test = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["styles", [_style_0]]]);
  const _style_1 = ".table {\n  background-color: beige;\n}\n";
  const _hoisted_1$4 = { class: "text" };
  const _hoisted_2$4 = /* @__PURE__ */ vue.createElementVNode("div", { class: "table" }, "Table", -1);
  const _sfc_main$7 = {
    __name: "Test2.ce",
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$4, [
          vue.createTextVNode(" TEST2 "),
          vue.createVNode(Child),
          _hoisted_2$4
        ]);
      };
    }
  };
  const Test2 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["styles", [_style_0, _style_1]]]);
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
          return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function(_a) {
            return fn(_a, b);
          }) : _isPlaceholder(b) ? _curry1(function(_b) {
            return fn(a, _b);
          }) : fn(a, b);
      }
    };
  }
  const _isArray = Array.isArray || function _isArray2(val) {
    return val != null && val.length >= 0 && Object.prototype.toString.call(val) === "[object Array]";
  };
  function _isString(x) {
    return Object.prototype.toString.call(x) === "[object String]";
  }
  function _has(prop, obj) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
  var toString = Object.prototype.toString;
  var _isArguments = /* @__PURE__ */ function() {
    return toString.call(arguments) === "[object Arguments]" ? function _isArguments2(x) {
      return toString.call(x) === "[object Arguments]";
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
    var prop, nIdx;
    var ks = [];
    var checkArgsLength = hasArgsEnumBug && _isArguments$1(obj);
    for (prop in obj) {
      if (_has(prop, obj) && (!checkArgsLength || prop !== "length")) {
        ks[ks.length] = prop;
      }
    }
    if (hasEnumBug) {
      nIdx = nonEnumerableProps.length - 1;
      while (nIdx >= 0) {
        prop = nonEnumerableProps[nIdx];
        if (_has(prop, obj) && !contains(ks, prop)) {
          ks[ks.length] = prop;
        }
        nIdx -= 1;
      }
    }
    return ks;
  });
  const keys$1 = keys;
  const _isInteger = Number.isInteger || function _isInteger2(n) {
    return n << 0 === n;
  };
  var nth = /* @__PURE__ */ _curry2(function nth2(offset, list) {
    var idx = offset < 0 ? list.length + offset : offset;
    return _isString(list) ? list.charAt(idx) : list[idx];
  });
  const nth$1 = nth;
  var type = /* @__PURE__ */ _curry1(function type2(val) {
    return val === null ? "Null" : val === void 0 ? "Undefined" : Object.prototype.toString.call(val).slice(8, -1);
  });
  const type$1 = type;
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
    function eq(_a, _b) {
      return _equals(_a, _b, stackA.slice(), stackB.slice());
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
  function _isObject(x) {
    return Object.prototype.toString.call(x) === "[object Object]";
  }
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
      const keyArray = key.split(".") || [];
      let translation = vue.computed(() => getTranslation(state.locale, keyArray, state.messages));
      if (!translation.value) {
        translation = vue.computed(() => getTranslation(state.fallbackLocale, keyArray, state.messages));
      }
      return hasInterpolation ? vue.computed(() => replacer(translation.value, data)) : translation;
    };
    function getTranslation(locale2, keys2, messages2) {
      return path$1([locale2, ...keys2], messages2);
    }
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
      translate
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
      setLocale: api.setLocale
    };
  };
  const useI18nContext = () => {
    const api = vue.inject(I18nContext, null);
    if (api === null) {
      throw new Error("Privider is missing a parent component.");
    }
    return api;
  };
  const replacer = function(tpl, data) {
    return tpl.replace(/\{(\w+)\}/g, function($1, $2) {
      return data[$2];
    });
  };
  const _sfc_main$6 = {};
  const _hoisted_1$3 = {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "sort",
    class: "svg-inline--fa fa-sort fa-w-10",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 320 512"
  };
  const _hoisted_2$3 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
  }, null, -1);
  const _hoisted_3$3 = [
    _hoisted_2$3
  ];
  function _sfc_render$3(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$3, _hoisted_3$3);
  }
  const IconSort = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$3]]);
  const _sfc_main$5 = {};
  const _hoisted_1$2 = {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "sort-down",
    class: "svg-inline--fa fa-sort-down fa-w-10",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 320 512"
  };
  const _hoisted_2$2 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
  }, null, -1);
  const _hoisted_3$2 = [
    _hoisted_2$2
  ];
  function _sfc_render$2(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$2, _hoisted_3$2);
  }
  const IconSortAsc = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$2]]);
  const _sfc_main$4 = {};
  const _hoisted_1$1 = {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "sort-up",
    class: "svg-inline--fa fa-sort-up fa-w-10",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 320 512"
  };
  const _hoisted_2$1 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
  }, null, -1);
  const _hoisted_3$1 = [
    _hoisted_2$1
  ];
  function _sfc_render$1(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$1, _hoisted_3$1);
  }
  const IconSortDesc = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$1]]);
  const SORT_STATE_ORIGINAL = "original";
  const SORT_STATE_DESCEND = "descend";
  const SORT_STATE_ASCEND = "ascend";
  const _hoisted_1 = ["onClick"];
  const _hoisted_2 = { key: 0 };
  const _hoisted_3 = ["colspan"];
  const _hoisted_4 = { key: 1 };
  const _hoisted_5 = ["colspan"];
  const _sfc_main$3 = {
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
      }
    },
    setup(__props) {
      const props = __props;
      const { t } = useI18n();
      console.log(t("table.homeTeam.short").value);
      const columns = vue.computed(() => props.columns);
      const columnCount = vue.computed(() => Object.keys(props.columns).length);
      const sortBy = (column, prop) => {
        if (!column.sortOrders)
          return;
        this.$emit("sort", { target: prop, orders: column.sortOrders });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("table", null, [
          vue.createElementVNode("thead", null, [
            vue.createElementVNode("tr", null, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(columns), (column, prop) => {
                return vue.openBlock(), vue.createElementBlock("th", {
                  key: prop,
                  class: vue.normalizeClass([
                    [column.class],
                    {
                      "is-active": prop === __props.sort.sortTarget && __props.sort.orders[0].direction !== vue.unref(SORT_STATE_ORIGINAL),
                      "is-sortable": column.sortOrders,
                      "is-desc": prop === __props.sort.sortTarget && __props.sort.orders[0].direction === vue.unref(SORT_STATE_DESCEND),
                      "is-asc": prop === __props.sort.sortTarget && __props.sort.orders[0].direction === vue.unref(SORT_STATE_ASCEND)
                    }
                  ]),
                  onClick: ($event) => sortBy(column, prop)
                }, [
                  vue.renderSlot(_ctx.$slots, `header-${prop}`, { column }, () => [
                    vue.createTextVNode(vue.toDisplayString(vue.unref(t)(column.label)), 1)
                  ]),
                  column.sortOrders && prop !== __props.sort.sortTarget ? (vue.openBlock(), vue.createBlock(IconSort, {
                    key: 0,
                    class: "icon-sort"
                  })) : vue.createCommentVNode("", true),
                  prop === __props.sort.sortTarget && __props.sort.orders[0].direction === vue.unref(SORT_STATE_ORIGINAL) ? (vue.openBlock(), vue.createBlock(IconSort, {
                    key: 1,
                    class: "icon-sort"
                  })) : vue.createCommentVNode("", true),
                  prop === __props.sort.sortTarget && __props.sort.orders[0].direction === vue.unref(SORT_STATE_DESCEND) ? (vue.openBlock(), vue.createBlock(IconSortAsc, {
                    key: 2,
                    class: "icon-sort"
                  })) : vue.createCommentVNode("", true),
                  prop === __props.sort.sortTarget && __props.sort.orders[0].direction === vue.unref(SORT_STATE_ASCEND) ? (vue.openBlock(), vue.createBlock(IconSortDesc, {
                    key: 3,
                    class: "icon-sort"
                  })) : vue.createCommentVNode("", true)
                ], 10, _hoisted_1);
              }), 128))
            ])
          ]),
          vue.createElementVNode("tbody", null, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(props.rows, (row, index) => {
              return vue.openBlock(), vue.createElementBlock("tr", { key: index }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(columns), (_, prop) => {
                  return vue.openBlock(), vue.createElementBlock("td", {
                    key: prop,
                    class: vue.normalizeClass([
                      [_.class],
                      {
                        "is-active": prop === __props.sort.sortTarget && __props.sort.orders[0].direction !== vue.unref(SORT_STATE_ORIGINAL)
                      }
                    ])
                  }, [
                    vue.renderSlot(_ctx.$slots, `cell-${prop}`, {
                      row,
                      prop
                    }, () => [
                      vue.createTextVNode(vue.toDisplayString(row[prop]), 1)
                    ])
                  ], 2);
                }), 128))
              ]);
            }), 128))
          ]),
          vue.createElementVNode("tfoot", null, [
            __props.rows.length === 0 && !__props.isLoading ? (vue.openBlock(), vue.createElementBlock("tr", _hoisted_2, [
              vue.createElementVNode("td", { colspan: vue.unref(columnCount) }, vue.toDisplayString(vue.unref(t)("common.noData")), 9, _hoisted_3)
            ])) : vue.createCommentVNode("", true),
            __props.isLoading ? (vue.openBlock(), vue.createElementBlock("tr", _hoisted_4, [
              vue.createElementVNode("td", { colspan: vue.unref(columnCount) }, vue.toDisplayString(vue.unref(t)("common.loading")), 9, _hoisted_5)
            ])) : vue.createCommentVNode("", true)
          ])
        ]);
      };
    }
  };
  const COLUMNS_SCHEDULE = {
    name: {
      label: "table.gameName.short",
      tooltip: "table.gameName.tooltip",
      class: "text-left text-light"
    },
    gameDateDate: {
      label: "table.gameDate.short",
      tooltip: "table.gameDate.tooltip",
      class: "text-left"
    },
    gameDateTime: {
      label: "table.gameDateTime.short",
      tooltip: "table.gameDateTime.tooltip",
      class: "text-left"
    },
    homeTeamName: {
      label: "table.homeTeam.short",
      tooltip: "table.homeTeam.tooltip",
      class: "text-right w-auto text-bold"
    },
    gameResult: {
      label: "",
      class: "text-bold text-xl"
    },
    gameResultType: {
      label: "",
      tooltip: ""
    },
    awayTeamName: {
      label: "table.awayTeam.short",
      tooltip: "table.awayTeam.tooltip",
      class: "text-left w-auto text-bold"
    },
    location: {
      label: "table.location.short",
      tooltip: "table.location.tooltip",
      class: "text-left"
    },
    broadcast: {
      label: "table.broadcast.short",
      tooltip: "table.broadcast.tooltip"
    },
    more: {
      label: ""
    }
  };
  const _sfc_main$2 = {
    __name: "ScheduleTable",
    setup(__props) {
      const { t, locale, setLocale } = useI18n();
      const msg = t("table.gameDateTime.short", { offsetName: "CET" });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createTextVNode(vue.toDisplayString(vue.unref(msg)) + " " + vue.toDisplayString(vue.unref(locale)) + " ", 1),
          vue.createElementVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(setLocale)(vue.unref(locale) === "en" ? "hu" : "en"))
          }, "EN"),
          vue.createVNode(_sfc_main$3, { columns: vue.unref(COLUMNS_SCHEDULE) }, null, 8, ["columns"])
        ], 64);
      };
    }
  };
  const hu = {
    errors: {
      undefinedColumn: "A(z) {column} oszlop nem l\xE9tezik!"
    },
    common: {
      loading: "T\xF6lt\u0151d\xE9s...",
      noData: "Nincs megjelen\xEDthet\u0151 adat",
      selectTimezone: "*Minden id\u0151pont a sz\xE1m\xEDt\xF3g\xE9p id\u0151z\xF3n\xE1ja szerint jelenik meg ({0}). V\xE1lt\xE1s:",
      hungary: "Magyarorsz\xE1g",
      romania: "Rom\xE1nia",
      shootoutShort: "SzU.",
      overtimeShort: "HU."
    },
    table: {
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
      points: {
        short: "P",
        tooltip: "Pontok"
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
    },
    game: {
      data: {
        localTime: "Helysz\xEDn szerinti id\u0151"
      },
      period: {
        Bemeleg\u00EDt\u00E9s: "Bemeleg\xEDt\xE9s",
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
        Hosszabb\u00EDt\u00E1s: "Hosszabb\xEDt\xE1s",
        "Hosszabb\xEDt\xE1s v\xE9ge": "Hosszabb\xEDt\xE1s v\xE9ge",
        B\u00FCntet\u0151k: "Sz\xE9tl\xF6v\xE9s",
        "B\xFCntet\u0151k v\xE9ge": "Sz\xE9tl\xF6v\xE9s v\xE9ge",
        V\u00E9geredm\u00E9ny: "V\xE9geredm\xE9ny",
        Sz\u00E9tl\u00F6v\u00E9s: "Sz\xE9tl\xF6v\xE9s"
      }
    }
  };
  const en = {
    errors: {
      undefinedColumn: "The {column} column is not exists!"
    },
    common: {
      loading: "Loading...",
      noData: "No data to display",
      selectTimezone: "*Minden id\u0151pont a sz\xE1m\xEDt\xF3g\xE9p id\u0151z\xF3n\xE1ja szerint jelenik meg ({0}). V\xE1lt\xE1s:",
      hungary: "Hungary",
      romania: "Romania",
      shootoutShort: "SO",
      overtimeShort: "OT"
    },
    table: {
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
      points: {
        short: "P",
        tooltip: "Points"
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
    },
    game: {
      data: {
        localTime: "Game local time"
      },
      period: {
        Bemeleg\u00EDt\u00E9s: "Warm-up",
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
        Hosszabb\u00EDt\u00E1s: "Overtime",
        "Hosszabb\xEDt\xE1s v\xE9ge": "Overtime End",
        B\u00FCntet\u0151l\u00F6v\u00E9sek: "Penalty Shot",
        V\u00E9geredm\u00E9ny: "Game Completed",
        Sz\u00E9tl\u00F6v\u00E9s: "Shoot Out"
      }
    }
  };
  const _sfc_main$1 = vue.defineComponent({
    props: {
      locale: {
        type: String,
        default: "hu"
      }
    },
    setup(props) {
      createI18n({
        locale: props.locale,
        messages: {
          hu,
          en
        }
      });
    }
  });
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.renderSlot(_ctx.$slots, "default");
  }
  const I18NProvider = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
  const _sfc_main = {
    __name: "Schedule.ce",
    props: {
      locale: {
        type: String,
        default: "hu"
      }
    },
    setup(__props) {
      const props = __props;
      const locale = vue.computed(() => props.locale);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createVNode(I18NProvider, { locale: vue.unref(locale) }, {
            default: vue.withCtx(() => [
              vue.createVNode(_sfc_main$2)
            ]),
            _: 1
          }, 8, ["locale"])
        ]);
      };
    }
  };
  customElements.define("vbr-test-vue", vue.defineCustomElement(Test));
  customElements.define("vbr-test2-vue", vue.defineCustomElement(Test2));
  customElements.define("vbr-schedule", vue.defineCustomElement(_sfc_main));
})(Vue);
