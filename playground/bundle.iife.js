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
  function _isString(x) {
    return Object.prototype.toString.call(x) === "[object String]";
  }
  const _isInteger = Number.isInteger || function _isInteger2(n) {
    return n << 0 === n;
  };
  var nth = /* @__PURE__ */ _curry2(function nth2(offset, list) {
    var idx = offset < 0 ? list.length + offset : offset;
    return _isString(list) ? list.charAt(idx) : list[idx];
  });
  const nth$1 = nth;
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
    const translate = (key) => {
      const keyArray = key.split(".") || [];
      let translation = vue.computed(() => getTranslation(state.locale, keyArray));
      if (!translation.value) {
        translation = vue.computed(() => getTranslation(state.fallbackLocale, keyArray));
      }
      return translation;
    };
    function getTranslation(locale2, keys) {
      return path$1([locale2, ...keys], state.messages);
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
                    vue.createElementVNode("span", null, vue.toDisplayString(vue.unref(t)(column.label)), 1)
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
              vue.createElementVNode("td", { colspan: vue.unref(columnCount) }, vue.toDisplayString("common.noData"), 9, _hoisted_3)
            ])) : vue.createCommentVNode("", true),
            __props.isLoading ? (vue.openBlock(), vue.createElementBlock("tr", _hoisted_4, [
              vue.createElementVNode("td", { colspan: vue.unref(columnCount) }, vue.toDisplayString("common.loading"), 9, _hoisted_5)
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
      const msg = t("hello");
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
  const _sfc_main$1 = vue.defineComponent({
    setup() {
      createI18n({
        locale: "en",
        messages: {
          hu: {
            hello: "Szia!"
          },
          en: {
            hello: "Hello!"
          },
          ja: {
            hello: "\u3053\u3093\u306B\u3061\u306F\uFF01"
          }
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
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createVNode(I18NProvider, null, {
            default: vue.withCtx(() => [
              vue.createVNode(_sfc_main$2)
            ]),
            _: 1
          })
        ]);
      };
    }
  };
  customElements.define("vbr-test-vue", vue.defineCustomElement(Test));
  customElements.define("vbr-test2-vue", vue.defineCustomElement(Test2));
  customElements.define("vbr-schedule", vue.defineCustomElement(_sfc_main));
})(Vue);
