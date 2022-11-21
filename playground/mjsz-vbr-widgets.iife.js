/*!
  * MJSZ VBR Widgets v2.0.0-alpha.1
  * (c) 2022 Akos Stegner
  * Released: 21/11/2022, 11:26:21
  * Released under the MIT License.
  */
var Widgets = function(exports, vue, _shared) {
  "use strict";
  var _a;
  const isClient = typeof window !== "undefined";
  const noop = () => {
  };
  isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
  function promiseTimeout(ms, throwOnTimeout = false, reason = "Timeout") {
    return new Promise((resolve, reject) => {
      if (throwOnTimeout)
        setTimeout(() => reject(reason), ms);
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
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
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
      sortOrders: [{ target: "teamName", direction: _shared.SORT_STATE_ASCEND }]
    },
    m: {
      label: "table.game.short",
      tooltip: "table.game.tooltip",
      sortOrders: [{ target: "m", direction: _shared.SORT_STATE_DESCEND }]
    },
    p3: {
      label: "table.wins.short",
      tooltip: "table.wins.tooltip",
      sortOrders: [
        { target: "p3", direction: _shared.SORT_STATE_DESCEND },
        { target: "p2", direction: _shared.SORT_STATE_DESCEND }
      ]
    },
    p2: {
      label: "table.otw.short",
      tooltip: "table.otw.tooltip",
      sortOrders: [{ target: "p2", direction: _shared.SORT_STATE_DESCEND }]
    },
    p1: {
      label: "table.otl.short",
      tooltip: "table.otl.tooltip",
      sortOrders: [{ target: "p1", direction: _shared.SORT_STATE_ASCEND }]
    },
    p0: {
      label: "table.losses.short",
      tooltip: "table.losses.tooltip",
      sortOrders: [{ target: "p0", direction: _shared.SORT_STATE_ASCEND }]
    },
    plus: {
      label: "table.goalFor.short",
      tooltip: "table.goalFor.tooltip",
      sortOrders: [{ target: "plus", direction: _shared.SORT_STATE_DESCEND }]
    },
    minus: {
      label: "table.goalAgainst.short",
      tooltip: "table.goalAgainst.tooltip",
      sortOrders: [{ target: "minus", direction: _shared.SORT_STATE_ASCEND }]
    },
    gk: {
      label: "table.goalDiff.short",
      tooltip: "table.goalDiff.tooltip",
      sortOrders: [{ target: "gk", direction: _shared.SORT_STATE_DESCEND }]
    },
    p: {
      label: "table.points.short",
      tooltip: "table.points.tooltip",
      class: "is-text-bold",
      sortOrders: [{ target: "p", direction: _shared.SORT_STATE_DESCEND }]
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
      sortOrders: [{ target: "teamName", direction: _shared.SORT_STATE_ASCEND }]
    },
    m: {
      label: "table.game.short",
      tooltip: "table.game.tooltip",
      sortOrders: [{ target: "m", direction: _shared.SORT_STATE_DESCEND }]
    },
    p2: {
      label: "table.wins.short",
      tooltip: "table.wins.tooltip",
      sortOrders: [
        { target: "p2", direction: _shared.SORT_STATE_DESCEND },
        { target: "p1", direction: _shared.SORT_STATE_DESCEND }
      ]
    },
    p1: {
      label: "table.draw.short",
      tooltip: "table.draw.tooltip",
      sortOrders: [
        { target: "p1", direction: _shared.SORT_STATE_DESCEND },
        { target: "p2", direction: _shared.SORT_STATE_DESCEND }
      ]
    },
    p0: {
      label: "table.losses.short",
      tooltip: "table.losses.tooltip",
      sortOrders: [{ target: "p0", direction: _shared.SORT_STATE_ASCEND }]
    },
    plus: {
      label: "table.goalFor.short",
      tooltip: "table.goalFor.tooltip",
      sortOrders: [{ target: "plus", direction: _shared.SORT_STATE_DESCEND }]
    },
    minus: {
      label: "table.goalAgainst.short",
      tooltip: "table.goalAgainst.tooltip",
      sortOrders: [{ target: "minus", direction: _shared.SORT_STATE_ASCEND }]
    },
    gk: {
      label: "table.goalDiff.short",
      tooltip: "table.goalDiff.tooltip",
      sortOrders: [{ target: "gk", direction: _shared.SORT_STATE_DESCEND }]
    },
    p: {
      label: "table.points.short",
      tooltip: "table.points.tooltip",
      class: "is-text-bold",
      sortOrders: [{ target: "p", direction: _shared.SORT_STATE_DESCEND }]
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
        return _shared.convert(vue.unref(rows)).sorted(sort).addContinuousIndex().value();
      });
      const currentColumns = vue.computed(() => props.type === "3" ? COLUMNS_STANDINGS_P_3 : COLUMNS_STANDINGS_P_2);
      const onSort = (payload) => change(payload);
      const resolveExternalTeamLink = (teamName) => _shared.externalTeamLinkResolver(props.externalTeamLink, teamName);
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
