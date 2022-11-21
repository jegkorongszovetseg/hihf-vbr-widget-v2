/*!
  * MJSZ VBR Widgets v2.0.0-alpha.1
  * (c) 2022 Akos Stegner
  * Released: 21/11/2022, 20:30:17
  * Released under the MIT License.
  */
var MjszWidgetElements = function(exports, vue, composables, utils, core, components) {
  "use strict";
  var _a;
  const isClient = typeof window !== "undefined";
  const isString = (val) => typeof val === "string";
  const noop = () => {
  };
  isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
  function resolveUnref(r) {
    return typeof r === "function" ? r() : vue.unref(r);
  }
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
  function tryOnScopeDispose(fn) {
    if (vue.getCurrentScope()) {
      vue.onScopeDispose(fn);
      return true;
    }
    return false;
  }
  function useTimeoutFn(cb, interval, options = {}) {
    const {
      immediate = true
    } = options;
    const isPending = vue.ref(false);
    let timer = null;
    function clear() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }
    function stop() {
      isPending.value = false;
      clear();
    }
    function start(...args) {
      clear();
      isPending.value = true;
      timer = setTimeout(() => {
        isPending.value = false;
        timer = null;
        cb(...args);
      }, resolveUnref(interval));
    }
    if (immediate) {
      isPending.value = true;
      if (isClient)
        start();
    }
    tryOnScopeDispose(stop);
    return {
      isPending,
      start,
      stop
    };
  }
  function unrefElement(elRef) {
    var _a2;
    const plain = resolveUnref(elRef);
    return (_a2 = plain == null ? void 0 : plain.$el) != null ? _a2 : plain;
  }
  const defaultWindow = isClient ? window : void 0;
  const defaultDocument = isClient ? window.document : void 0;
  isClient ? window.navigator : void 0;
  isClient ? window.location : void 0;
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
  function useDocumentVisibility({ document = defaultDocument } = {}) {
    if (!document)
      return vue.ref("visible");
    const visibility = vue.ref(document.visibilityState);
    useEventListener(document, "visibilitychange", () => {
      visibility.value = document.visibilityState;
    });
    return visibility;
  }
  var SwipeDirection;
  (function(SwipeDirection2) {
    SwipeDirection2["UP"] = "UP";
    SwipeDirection2["RIGHT"] = "RIGHT";
    SwipeDirection2["DOWN"] = "DOWN";
    SwipeDirection2["LEFT"] = "LEFT";
    SwipeDirection2["NONE"] = "NONE";
  })(SwipeDirection || (SwipeDirection = {}));
  function useTimeoutPoll(fn, interval, timeoutPollOptions) {
    const { start } = useTimeoutFn(loop, interval);
    const isActive = vue.ref(false);
    async function loop() {
      if (!isActive.value)
        return;
      await fn();
      start();
    }
    function resume() {
      if (!isActive.value) {
        isActive.value = true;
        loop();
      }
    }
    function pause() {
      isActive.value = false;
    }
    if (timeoutPollOptions == null ? void 0 : timeoutPollOptions.immediate)
      resume();
    tryOnScopeDispose(pause);
    return {
      isActive,
      pause,
      resume
    };
  }
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
  const _style_0$1 = ":root,\n:host {\n  font-family: 'Roboto Condensed', Avenir, Helvetica, Arial, sans-serif;\n\n  --vbr-widget-primary-color-0: #ffffff;\n  --vbr-widget-primary-color-50: #eceff1;\n  --vbr-widget-primary-color-100: #cfd8dc;\n  --vbr-widget-primary-color-200: #b0bec5;\n  --vbr-widget-primary-color-300: #90a4ae;\n  --vbr-widget-primary-color-400: #78909c;\n  --vbr-widget-primary-color-500: #607d8b;\n  --vbr-widget-primary-color-600: #546e7a;\n  --vbr-widget-primary-color-700: #455a64;\n  --vbr-widget-primary-color-800: #37474f;\n  --vbr-widget-primary-color-900: #263238;\n\n  --vbr-widget-secondary-color-100: #dcedc8;\n  --vbr-widget-secondary-color-200: #badb94;\n  --vbr-widget-secondary-color-300: #aed581;\n  --vbr-widget-secondary-color-400: #9ccc65;\n  --vbr-widget-secondary-color-500: #8bc34a;\n  --vbr-widget-secondary-color-700: #689f38;\n  --vbr-widget-secondary-color-800: #558b2f;\n  --vbr-widget-secondary-color-900: #33691e;\n\n  --vbr-widget-danger-color-50: #ffebee;\n  --vbr-widget-danger-color-100: #ffcdd2;\n  --vbr-widget-danger-color-200: #ef9a9a;\n  --vbr-widget-danger-color-300: #e57373;\n  --vbr-widget-danger-color-400: #ef5350;\n  --vbr-widget-danger-color-500: #f44336;\n  --vbr-widget-danger-color-700: #d32f2f;\n  --vbr-widget-danger-color-900: #b71c1c;\n  --vbr-widget-danger-color-a400: #ff1744;\n\n  --vbr-widget-table-header-font-size: 12px;\n  --vbr-widget-table-default-column-width: 30px;\n  --vbr-widget-table-default-bg-color: var(--vbr-widget-primary-color-0);\n  --vbr-widget-table-color: var(--vbr-widget-primary-color-800);\n  --vbr-widget-table-neutral-color: var(--vbr-widget-primary-color-300);\n  --vbr-widget-table-header-bg-color: var(--vbr-widget-primary-color-800);\n  --vbr-widget-table-header-hover-bg-color: var(--vbr-widget-primary-color-700);\n  --vbr-widget-table-header-color: var(--vbr-widget-primary-color-200);\n  --vbr-widget-table-table-header-active-bg-color: var(--vbr-widget-primary-color-700);\n  --vbr-widget-table-header-active-color: var(--vbr-widget-primary-color-0);\n  --vbr-widget-table-hover-color: var(--vbr-widget-secondary-color-900);\n  --vbr-widget-table-hover-bg-color: var(--vbr-widget-secondary-color-100);\n  --vbr-widget-table-active-color: var(--vbr-widget-secondary-color-900);\n  --vbr-widget-table-active-bg-color: var(--vbr-widget-secondary-color-200);\n  --vbr-widget-table-active-even-bg-color: var(--vbr-widget-secondary-color-300);\n  --vbr-widget-table-active-hover-color: var(--vbr-widget-secondary-color-900);\n  --vbr-widget-table-active-hover-bg-color: var(--vbr-widget-secondary-color-400);\n  --vbr-widget-table-portrait-border-color: var(--vbr-widget-primary-color-100);\n  --vbr-widget-table-portrait-bg-color: var(--vbr-widget-primary-color-50);\n  --vbr-widget-table-cell-light-color: var(--vbr-widget-primary-color-600);\n  --vbr-widget-table-cell-dark-color: var(--vbr-widget-primary-color-900);\n  --vbr-widget-table-stripped-bg-color: #f8f9fa;\n  --vbr-widget-table-label-color: var(--vbr-widget-primary-color-500);\n  --vbr-widget-table-label-bg-color: var(--vbr-widget-primary-color-50);\n  --vbr-widget-table-cell-logo-size: 20px;\n  --vbr-widget-table-cell-portrait-size: 26px;\n\n  --vbr-widget-paginator-color: var(--vbr-widget-primary-color-500);\n  --vbr-widget-paginator-bg-color: var(--vbr-widget-primary-color-0);\n  --vbr-widget-paginator-hover-color: var(--vbr-widget-primary-color-700);\n  --vbr-widget-paginator-hover-bg-color: var(--vbr-widget-primary-color-100);\n  --vbr-widget-paginator-border-color: var(--vbr-widget-primary-color-100);\n  --vbr-widget-paginator-active-color: var(--vbr-widget-primary-color-0);\n  --vbr-widget-paginator-active-bg-color: var(--vbr-widget-primary-color-900);\n  --vbr-widget-paginator-disabled-color: var(--vbr-widget-primary-color-200);\n\n  --vbr-widget-tooltip-font-size: 12px;\n  --vbr-widget-tooltip-color: #ffffff;\n  --vbr-widget-tooltip-bg-color: #000000;\n\n  --vbr-widget-popover-trigger-hover-bg-color: var(--vbr-widget-secondary-color-200);\n  --vbr-widget-popover-trigger-focus-bg-color: var(--vbr-widget-secondary-color-300);\n  --vbr-widget-popover-bg-color: var(--vbr-widget-primary-color-0);\n\n  --vbr-widget-dropdown-item-color: var(--vbr-widget-primary-color-500);\n  --vbr-widget-dropdown-item-hover-color: var(--vbr-widget-primary-color-800);\n  --vbr-widget-dropdown-item-hover-bg-color: var(--vbr-widget-primary-color-50);\n\n  --vbr-widget-error-notice-bg-color: var(--vbr-widget-danger-color-50);\n  --vbr-widget-error-notice-border-color: var(--vbr-widget-danger-color-100);\n  --vbr-widget-error-notice-color: var(--vbr-widget-danger-color-700);\n\n  --vbr-widget-link-color: var(--vbr-widget-secondary-color-700);\n  --vbr-widget-hover-color: var(--vbr-widget-secondary-color-900);\n\n  --vbr-widget-base-input-color: var(--vbr-widget-primary-color-800);\n  --vbr-widget-base-input-font-size: 0.875rem;\n  --vbr-widget-base-input-border-color: var(--vbr-widget-primary-color-300);\n  --vbr-widget-base-input-border-radius: 3px;\n\n  --vbr-widget-form-label-color: var(--vbr-widget-primary-color-500);\n  --vbr-widget-form-label-font-size: 0.75rem;\n\n  --vbr-widget-timezone-selector-color: var(--vbr-widget-primary-color-500);\n  --vbr-widget-timezone-selector-font-size: 0.8125rem;\n}\n.transition-fade-enter-active,\n.transition-fade-leave-active {\n  transition: all 0.25s ease;\n}\n.transition-fade-enter-from,\n.transition-fade-leave-to {\n  opacity: 0;\n  transform: translateY(5px);\n}\nimg {\n  opacity: 0;\n  transition: opacity 0.5s ease-out;\n}\nimg.is-loaded {\n  opacity: 1;\n}\na {\n  color: var(--vbr-widget-link-color);\n  text-decoration: none;\n}\na:hover {\n    color: var(--vbr-widget-hover-color);\n}\n.floating-content.is-tooltip {\n    background-color: var(--vbr-widget-tooltip-bg-color);\n    color: var(--vbr-widget-tooltip-color);\n    font-weight: bold;\n    padding: 5px 10px;\n    border-radius: 4px;\n    font-size: var(--vbr-widget-tooltip-font-size);\n    white-space: nowrap;\n    pointer-events: none;\n}\n.floating-content.is-tooltip .is-arrow {\n      background-color: var(--vbr-widget-tooltip-bg-color);\n}\n.floating-content.is-content {\n    /* width: 220px; */\n    border-radius: 4px;\n    box-shadow: 2px 14px 23px 0px rgba(0, 0, 0, 0.25);\n}\n.floating-content.is-content .is-arrow {\n      background-color: var(--vbr-widget-primary-color-50);\n}\n.floating-content .is-arrow {\n    position: absolute;\n    width: 8px;\n    height: 8px;\n    transform: rotate(45deg);\n}\n[data-placement^='top'] .floating-content .is-arrow {\n      bottom: -4px;\n}\n[data-placement^='bottom'] .floating-content .is-arrow {\n      top: -4px;\n}\n[data-placement^='left'] .floating-content .is-arrow {\n      right: -4px;\n}\n[data-placement^='right'] .floating-content .is-arrow {\n      left: -4px;\n}\n.mjsz-vbr-error-notice {\n  display: flex;\n  align-items: center;\n  justify-items: flex-start;\n  margin: 10px 0;\n  padding: 10px 20px;\n  background-color: var(--vbr-widget-error-notice-bg-color);\n  color: var(--vbr-widget-error-notice-color);\n  border: 1px solid var(--vbr-widget-error-notice-border-color);\n}\n.mjsz-vbr-error-notice .icon {\n    margin-right: 15px;\n}\n.mjsz-vbr-timezone-selector {\n  padding: 3px 0;\n  color: var(--vbr-widget-timezone-selector-color);\n  font-size: var(--vbr-widget-timezone-selector-font-size);\n}\n.is-card {\n  background-color: #fff;\n  padding: 15px;\n  margin-bottom: 20px;\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10), 0 2px 2px 0 rgba(0, 0, 0, 0.10);\n}\n";
  const _style_1$1 = ".mjsz-vbr-table {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n.mjsz-vbr-table table,\n  .mjsz-vbr-table caption,\n  .mjsz-vbr-table tbody,\n  .mjsz-vbr-table tfoot,\n  .mjsz-vbr-table thead,\n  .mjsz-vbr-table tr,\n  .mjsz-vbr-table th,\n  .mjsz-vbr-table td {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    vertical-align: baseline;\n}\n.mjsz-vbr-table {\n  color: var(--vbr-widget-table-color);\n  background-color: var(--vbr-widget-table-default-bg-color);\n}\n.mjsz-vbr-table th {\n    width: var(--vbr-widget-table-default-column-width);\n    background-color: var(--vbr-widget-table-header-bg-color);\n    font-size: var(--vbr-widget-table-header-font-size);\n    font-weight: 700;\n    color: var(--vbr-widget-table-header-color);\n    text-align: center;\n}\n.mjsz-vbr-table th:focus-visible,\n    .mjsz-vbr-table th:hover {\n      background-color: var(--vbr-widget-table-header-hover-bg-color);\n      outline: none;\n}\n.mjsz-vbr-table th.is-sortable {\n      position: relative;\n      cursor: pointer;\n}\n.mjsz-vbr-table th.is-sortable .icon-sort {\n        opacity: 0.5;\n}\n.mjsz-vbr-table th.is-active {\n      background-color: var(--vbr-widget-table-table-header-active-bg-color);\n      color: var(--vbr-widget-table-header-active-color);\n}\n.mjsz-vbr-table th.is-active .icon-sort {\n        opacity: 1;\n}\n.mjsz-vbr-table th.is-asc {\n      position: relative;\n}\n.mjsz-vbr-table th.is-desc {\n      position: relative;\n}\n.mjsz-vbr-table th.is-w-auto {\n      width: auto;\n}\n.mjsz-vbr-table th .is-icon-sort {\n      width: 11px;\n      height: 11px;\n      margin-left: 5px;\n}\n.mjsz-vbr-table td {\n    text-align: center;\n}\n.mjsz-vbr-table td.is-active {\n      font-weight: 700;\n      color: var(--vbr-widget-table-active-color);\n      background-color: var(--vbr-widget-table-active-bg-color);\n}\n.mjsz-vbr-table td .is-text-light,\n    .mjsz-vbr-table td.is-text-light {\n      color: var(--vbr-widget-table-cell-light-color);\n}\n.mjsz-vbr-table td .is-text-dark,\n    .mjsz-vbr-table td.is-text-dark {\n      color: var(--vbr-widget-table-cell-dark-color);\n}\n.mjsz-vbr-table td .is-logo-image {\n      display: inline-block;\n      vertical-align: middle;\n      width: var(--vbr-widget-table-cell-logo-size);\n      height: var(--vbr-widget-table-cell-logo-size);\n}\n.mjsz-vbr-table td .is-portrait-image {\n      display: inline-block;\n      vertical-align: middle;\n      width: var(--vbr-widget-table-cell-portrait-size);\n      height: var(--vbr-widget-table-cell-portrait-size);\n      object-fit: cover;\n      object-position: top;\n      overflow: hidden;\n      border-radius: 100%;\n      border: 1px solid var(--vbr-widget-primary-color-100);\n}\n.mjsz-vbr-table td .is-portrait-image img {\n        width: var(--vbr-widget-table-cell-portrait-size);\n        height: auto;\n}\n.mjsz-vbr-table td.is-text-bold {\n      font-weight: 700;\n}\n.mjsz-vbr-table td.is-text-xl {\n      font-size: 1.2 rem;\n}\n.mjsz-vbr-table td .is-text-accent {\n      color: var(--vbr-widget-secondary-color-500);\n}\n.mjsz-vbr-table td svg {\n      width: 16px;\n      height: 16px;\n}\n.mjsz-vbr-table td button {\n      padding: 3px 3px;\n      line-height: 0;\n      border: none;\n      outline: none;\n      background-color: transparent;\n}\n.mjsz-vbr-table td button:hover {\n        background-color: var(--vbr-widget-popover-trigger-hover-bg-color);\n}\n.mjsz-vbr-table td button:active,\n      .mjsz-vbr-table td button:focus {\n        background-color: var(--vbr-widget-popover-trigger-focus-bg-color);\n}\n.mjsz-vbr-table td a {\n      text-decoration: none;\n}\n.mjsz-vbr-table td .label {\n      padding: 3px 6px;\n      font-size: 11px;\n      font-weight: 700;\n      color: var(--vbr-widget-table-label-color);\n      background-color: var(--vbr-widget-table-label-bg-color);\n      border-radius: 2px;\n}\n.mjsz-vbr-table td .label:not(:last-of-type) {\n        margin-right: 3px;\n}\n.mjsz-vbr-table td a {\n      color: var(--vbr-widget-link-color);\n}\n.mjsz-vbr-table td a:hover {\n      color: var(--vbr-widget-hover-color);\n}\n.mjsz-vbr-table th,\n  .mjsz-vbr-table td {\n    padding: 8px;\n    white-space: nowrap;\n    vertical-align: middle;\n}\n.mjsz-vbr-table th.is-text-left, .mjsz-vbr-table td.is-text-left {\n      text-align: left;\n}\n.mjsz-vbr-table th.is-text-right, .mjsz-vbr-table td.is-text-right {\n      text-align: right;\n}\n.mjsz-vbr-table th.is-has-image, .mjsz-vbr-table td.is-has-image {\n      padding: 0 2px;\n}\n.mjsz-vbr-table th .is-duplicated, .mjsz-vbr-table td .is-duplicated {\n      color: var(--vbr-widget-table-neutral-color);\n}\n.mjsz-vbr-table tr:nth-child(even) {\n    background-color: var(--vbr-widget-table-stripped-bg-color);\n}\n.mjsz-vbr-table tr:nth-child(even) td.is-active {\n      background-color: var(--vbr-widget-table-active-even-bg-color);\n}\n.mjsz-vbr-table tr:focus-within,\n  .mjsz-vbr-table tr:hover {\n    color: var(--vbr-widget-table-hover-color);\n    background-color: var(--vbr-widget-table-hover-bg-color);\n}\n.mjsz-vbr-table tr:focus-within td.is-active, .mjsz-vbr-table tr:hover td.is-active {\n      color: var(--vbr-widget-table-active-hover-color);\n      background-color: var(--vbr-widget-table-active-hover-bg-color);\n}\n";
  const _style_2$1 = ".mjsz-vbr-table-responsive {\n  width: 100%;\n  overflow-x: auto;\n}\n.mjsz-vbr-table-responsive table {\n  width: 100%;\n}\n";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$6 = {
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
      const { onError, error, hasError } = composables.useErrorProvider();
      const locale = vue.computed(() => props.locale);
      const {
        state: rows,
        error: apiError,
        isLoading
      } = useAsyncState(
        () => composables.fetchVBRData("/v1/standings", props.apiKey, {
          championshipId: Number(props.championshipId),
          division: props.division
        }),
        [],
        {
          onError: (error2) => onError(error2)
        }
      );
      const { sort, change } = composables.useSort();
      const convertedRows = vue.computed(() => {
        return utils.convert(vue.unref(rows)).sorted(sort).addContinuousIndex().value();
      });
      const currentColumns = vue.computed(() => props.type === "3" ? core.COLUMNS_STANDINGS_P_3 : core.COLUMNS_STANDINGS_P_2);
      const onSort = (payload) => change(payload);
      const resolveExternalTeamLink = (teamName) => utils.externalTeamLinkResolver(props.externalTeamLink, teamName);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createVNode(vue.unref(components.I18NProvider), { locale: vue.unref(locale) }, {
            default: vue.withCtx(() => [
              vue.unref(hasError) ? (vue.openBlock(), vue.createBlock(vue.unref(components.ErrorNotice), {
                key: 0,
                error: vue.unref(error)
              }, null, 8, ["error"])) : vue.createCommentVNode("", true),
              vue.createVNode(vue.unref(components.StatisticsTable), {
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
  const Standings = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["styles", [_style_0$1, _style_1$1, _style_2$1]]]);
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
  const _hoisted_2$4 = /* @__PURE__ */ vue.createElementVNode("rect", {
    x: "2",
    y: "3",
    width: "20",
    height: "14",
    rx: "2",
    ry: "2"
  }, null, -1);
  const _hoisted_3$4 = /* @__PURE__ */ vue.createElementVNode("line", {
    x1: "8",
    y1: "21",
    x2: "16",
    y2: "21"
  }, null, -1);
  const _hoisted_4$4 = /* @__PURE__ */ vue.createElementVNode("line", {
    x1: "12",
    y1: "17",
    x2: "12",
    y2: "21"
  }, null, -1);
  const _hoisted_5$2 = [
    _hoisted_2$4,
    _hoisted_3$4,
    _hoisted_4$4
  ];
  function _sfc_render$3(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$4, _hoisted_5$2);
  }
  const IconBroadcast = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$3]]);
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
  const _hoisted_2$3 = /* @__PURE__ */ vue.createElementVNode("circle", {
    cx: "12",
    cy: "12",
    r: "1"
  }, null, -1);
  const _hoisted_3$3 = /* @__PURE__ */ vue.createElementVNode("circle", {
    cx: "12",
    cy: "5",
    r: "1"
  }, null, -1);
  const _hoisted_4$3 = /* @__PURE__ */ vue.createElementVNode("circle", {
    cx: "12",
    cy: "19",
    r: "1"
  }, null, -1);
  const _hoisted_5$1 = [
    _hoisted_2$3,
    _hoisted_3$3,
    _hoisted_4$3
  ];
  function _sfc_render$2(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$3, _hoisted_5$1);
  }
  const IconMore = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$2]]);
  const _sfc_main$3 = {};
  const _hoisted_1$2 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };
  const _hoisted_2$2 = /* @__PURE__ */ vue.createElementVNode("path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }, null, -1);
  const _hoisted_3$2 = /* @__PURE__ */ vue.createElementVNode("rect", {
    x: "8",
    y: "2",
    width: "8",
    height: "4",
    rx: "1",
    ry: "1"
  }, null, -1);
  const _hoisted_4$2 = [
    _hoisted_2$2,
    _hoisted_3$2
  ];
  function _sfc_render$1(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$2, _hoisted_4$2);
  }
  const IconSheet = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$1]]);
  const _sfc_main$2 = {};
  const _hoisted_1$1 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };
  const _hoisted_2$1 = /* @__PURE__ */ vue.createElementVNode("path", { d: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" }, null, -1);
  const _hoisted_3$1 = /* @__PURE__ */ vue.createElementVNode("polygon", { points: "9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" }, null, -1);
  const _hoisted_4$1 = [
    _hoisted_2$1,
    _hoisted_3$1
  ];
  function _sfc_render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$1, _hoisted_4$1);
  }
  const IconYoutube = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render]]);
  const _hoisted_1 = {
    key: 0,
    class: "is-text-dark"
  };
  const _hoisted_2 = ["href"];
  const _hoisted_3 = {
    key: 0,
    class: "label"
  };
  const _hoisted_4 = {
    key: 1,
    class: "label"
  };
  const _hoisted_5 = {
    key: 2,
    class: "label"
  };
  const _hoisted_6 = { key: 1 };
  const _hoisted_7 = ["onClick"];
  const _hoisted_8 = { class: "is-dropdown-menu" };
  const _hoisted_9 = ["href"];
  const _hoisted_10 = { key: 0 };
  const _hoisted_11 = ["href"];
  const _sfc_main$1 = {
    __name: "ScheduleTable",
    props: {
      rows: {
        type: Array,
        default: () => []
      },
      isLoading: {
        type: Boolean,
        deafult: false
      },
      externalBaseUrl: {
        type: String,
        default: core.DEFAULT_EXTERNAL_BASE_URL
      },
      hideColumns: {
        type: String,
        default: ""
      },
      offsetName: {
        type: String,
        default: ""
      },
      externalGameResolver: {
        type: Function,
        required: true
      }
    },
    setup(__props) {
      const props = __props;
      const { onError } = composables.useError();
      const { columns, error } = composables.useColumns(core.COLUMNS_SCHEDULE, props.hideColumns, { offsetName: props.offsetName });
      if (error.value)
        onError(
          new utils.WidgetError(utils.UndefinedColumn.message, {
            ...utils.UndefinedColumn.options,
            cause: { column: error.value }
          })
        );
      const { t } = composables.useI18n();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.unref(components.ResponsiveTable), null, {
          default: vue.withCtx(({ el: rootElement }) => [
            vue.createVNode(vue.unref(components.DataTable), {
              columns: vue.unref(columns),
              rows: props.rows,
              "is-loading": __props.isLoading,
              "append-to": rootElement
            }, {
              "cell-homeTeamLogo": vue.withCtx(({ row }) => [
                (vue.openBlock(), vue.createBlock(vue.unref(components.Image), {
                  class: "is-logo-image is-right",
                  key: row.id,
                  src: row.homeTeamLogo
                }, null, 8, ["src"]))
              ]),
              "cell-awayTeamLogo": vue.withCtx(({ row }) => [
                (vue.openBlock(), vue.createBlock(vue.unref(components.Image), {
                  class: "is-logo-image is-right",
                  key: row.id,
                  src: row.awayTeamLogo
                }, null, 8, ["src"]))
              ]),
              "cell-gameResult": vue.withCtx(({ row }) => [
                row.gameStatus === 0 ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_1, "-:-")) : (vue.openBlock(), vue.createElementBlock("a", {
                  key: 1,
                  href: __props.externalGameResolver(row.id),
                  target: "_blank",
                  class: vue.normalizeClass({ "is-text-dark": row.gameStatus !== 1, "is-text-accent": row.gameStatus === 1 })
                }, vue.toDisplayString(row.homeTeamScore) + ":" + vue.toDisplayString(row.awayTeamScore), 11, _hoisted_2))
              ]),
              "cell-gameResultType": vue.withCtx(({ row }) => [
                row.isOvertime ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_3, vue.toDisplayString(vue.unref(t)("common.overtimeShort")), 1)) : vue.createCommentVNode("", true),
                row.isShootout ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_4, vue.toDisplayString(vue.unref(t)("common.shootoutShort")), 1)) : vue.createCommentVNode("", true),
                row.seriesStandings ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_5, vue.toDisplayString(row.seriesStandings), 1)) : vue.createCommentVNode("", true)
              ]),
              "cell-broadcast": vue.withCtx(({ row }) => [
                row.broadcast ? (vue.openBlock(), vue.createBlock(IconBroadcast, { key: 0 })) : (vue.openBlock(), vue.createElementBlock("span", _hoisted_6))
              ]),
              "cell-more": vue.withCtx(({ row }) => [
                vue.createVNode(vue.unref(components.FloatingPanel), {
                  offset: 2,
                  placement: "left",
                  theme: "content",
                  "append-to": rootElement
                }, {
                  default: vue.withCtx(({ setRef, show }) => [
                    vue.createElementVNode("button", {
                      ref: setRef,
                      onClick: vue.withModifiers(show, ["stop"])
                    }, [
                      vue.createVNode(IconMore)
                    ], 8, _hoisted_7)
                  ]),
                  content: vue.withCtx(() => [
                    vue.createElementVNode("ul", _hoisted_8, [
                      vue.createElementVNode("li", null, [
                        vue.createElementVNode("a", {
                          href: __props.externalBaseUrl + row.id,
                          class: "is-dropdown-item",
                          target: "_blank"
                        }, [
                          vue.createVNode(IconSheet, { width: "14" }),
                          vue.createTextVNode(" Jegyz\u0151k\xF6nyv ")
                        ], 8, _hoisted_9)
                      ]),
                      row.video ? (vue.openBlock(), vue.createElementBlock("li", _hoisted_10, [
                        vue.createElementVNode("a", {
                          href: row.video,
                          class: "is-dropdown-item",
                          target: "_blank"
                        }, [
                          vue.createVNode(IconYoutube, { width: "14" }),
                          vue.createTextVNode(" Vide\xF3 ")
                        ], 8, _hoisted_11)
                      ])) : vue.createCommentVNode("", true)
                    ])
                  ]),
                  _: 2
                }, 1032, ["append-to"])
              ]),
              _: 2
            }, 1032, ["columns", "rows", "is-loading", "append-to"])
          ]),
          _: 1
        });
      };
    }
  };
  const _style_0 = ":root,\n:host {\n  font-family: 'Roboto Condensed', Avenir, Helvetica, Arial, sans-serif;\n\n  --vbr-widget-primary-color-0: #ffffff;\n  --vbr-widget-primary-color-50: #eceff1;\n  --vbr-widget-primary-color-100: #cfd8dc;\n  --vbr-widget-primary-color-200: #b0bec5;\n  --vbr-widget-primary-color-300: #90a4ae;\n  --vbr-widget-primary-color-400: #78909c;\n  --vbr-widget-primary-color-500: #607d8b;\n  --vbr-widget-primary-color-600: #546e7a;\n  --vbr-widget-primary-color-700: #455a64;\n  --vbr-widget-primary-color-800: #37474f;\n  --vbr-widget-primary-color-900: #263238;\n\n  --vbr-widget-secondary-color-100: #dcedc8;\n  --vbr-widget-secondary-color-200: #badb94;\n  --vbr-widget-secondary-color-300: #aed581;\n  --vbr-widget-secondary-color-400: #9ccc65;\n  --vbr-widget-secondary-color-500: #8bc34a;\n  --vbr-widget-secondary-color-700: #689f38;\n  --vbr-widget-secondary-color-800: #558b2f;\n  --vbr-widget-secondary-color-900: #33691e;\n\n  --vbr-widget-danger-color-50: #ffebee;\n  --vbr-widget-danger-color-100: #ffcdd2;\n  --vbr-widget-danger-color-200: #ef9a9a;\n  --vbr-widget-danger-color-300: #e57373;\n  --vbr-widget-danger-color-400: #ef5350;\n  --vbr-widget-danger-color-500: #f44336;\n  --vbr-widget-danger-color-700: #d32f2f;\n  --vbr-widget-danger-color-900: #b71c1c;\n  --vbr-widget-danger-color-a400: #ff1744;\n\n  --vbr-widget-table-header-font-size: 12px;\n  --vbr-widget-table-default-column-width: 30px;\n  --vbr-widget-table-default-bg-color: var(--vbr-widget-primary-color-0);\n  --vbr-widget-table-color: var(--vbr-widget-primary-color-800);\n  --vbr-widget-table-neutral-color: var(--vbr-widget-primary-color-300);\n  --vbr-widget-table-header-bg-color: var(--vbr-widget-primary-color-800);\n  --vbr-widget-table-header-hover-bg-color: var(--vbr-widget-primary-color-700);\n  --vbr-widget-table-header-color: var(--vbr-widget-primary-color-200);\n  --vbr-widget-table-table-header-active-bg-color: var(--vbr-widget-primary-color-700);\n  --vbr-widget-table-header-active-color: var(--vbr-widget-primary-color-0);\n  --vbr-widget-table-hover-color: var(--vbr-widget-secondary-color-900);\n  --vbr-widget-table-hover-bg-color: var(--vbr-widget-secondary-color-100);\n  --vbr-widget-table-active-color: var(--vbr-widget-secondary-color-900);\n  --vbr-widget-table-active-bg-color: var(--vbr-widget-secondary-color-200);\n  --vbr-widget-table-active-even-bg-color: var(--vbr-widget-secondary-color-300);\n  --vbr-widget-table-active-hover-color: var(--vbr-widget-secondary-color-900);\n  --vbr-widget-table-active-hover-bg-color: var(--vbr-widget-secondary-color-400);\n  --vbr-widget-table-portrait-border-color: var(--vbr-widget-primary-color-100);\n  --vbr-widget-table-portrait-bg-color: var(--vbr-widget-primary-color-50);\n  --vbr-widget-table-cell-light-color: var(--vbr-widget-primary-color-600);\n  --vbr-widget-table-cell-dark-color: var(--vbr-widget-primary-color-900);\n  --vbr-widget-table-stripped-bg-color: #f8f9fa;\n  --vbr-widget-table-label-color: var(--vbr-widget-primary-color-500);\n  --vbr-widget-table-label-bg-color: var(--vbr-widget-primary-color-50);\n  --vbr-widget-table-cell-logo-size: 20px;\n  --vbr-widget-table-cell-portrait-size: 26px;\n\n  --vbr-widget-paginator-color: var(--vbr-widget-primary-color-500);\n  --vbr-widget-paginator-bg-color: var(--vbr-widget-primary-color-0);\n  --vbr-widget-paginator-hover-color: var(--vbr-widget-primary-color-700);\n  --vbr-widget-paginator-hover-bg-color: var(--vbr-widget-primary-color-100);\n  --vbr-widget-paginator-border-color: var(--vbr-widget-primary-color-100);\n  --vbr-widget-paginator-active-color: var(--vbr-widget-primary-color-0);\n  --vbr-widget-paginator-active-bg-color: var(--vbr-widget-primary-color-900);\n  --vbr-widget-paginator-disabled-color: var(--vbr-widget-primary-color-200);\n\n  --vbr-widget-tooltip-font-size: 12px;\n  --vbr-widget-tooltip-color: #ffffff;\n  --vbr-widget-tooltip-bg-color: #000000;\n\n  --vbr-widget-popover-trigger-hover-bg-color: var(--vbr-widget-secondary-color-200);\n  --vbr-widget-popover-trigger-focus-bg-color: var(--vbr-widget-secondary-color-300);\n  --vbr-widget-popover-bg-color: var(--vbr-widget-primary-color-0);\n\n  --vbr-widget-dropdown-item-color: var(--vbr-widget-primary-color-500);\n  --vbr-widget-dropdown-item-hover-color: var(--vbr-widget-primary-color-800);\n  --vbr-widget-dropdown-item-hover-bg-color: var(--vbr-widget-primary-color-50);\n\n  --vbr-widget-error-notice-bg-color: var(--vbr-widget-danger-color-50);\n  --vbr-widget-error-notice-border-color: var(--vbr-widget-danger-color-100);\n  --vbr-widget-error-notice-color: var(--vbr-widget-danger-color-700);\n\n  --vbr-widget-link-color: var(--vbr-widget-secondary-color-700);\n  --vbr-widget-hover-color: var(--vbr-widget-secondary-color-900);\n\n  --vbr-widget-base-input-color: var(--vbr-widget-primary-color-800);\n  --vbr-widget-base-input-font-size: 0.875rem;\n  --vbr-widget-base-input-border-color: var(--vbr-widget-primary-color-300);\n  --vbr-widget-base-input-border-radius: 3px;\n\n  --vbr-widget-form-label-color: var(--vbr-widget-primary-color-500);\n  --vbr-widget-form-label-font-size: 0.75rem;\n\n  --vbr-widget-timezone-selector-color: var(--vbr-widget-primary-color-500);\n  --vbr-widget-timezone-selector-font-size: 0.8125rem;\n}\n.transition-fade-enter-active,\n.transition-fade-leave-active {\n  transition: all 0.25s ease;\n}\n.transition-fade-enter-from,\n.transition-fade-leave-to {\n  opacity: 0;\n  transform: translateY(5px);\n}\nimg {\n  opacity: 0;\n  transition: opacity 0.5s ease-out;\n}\nimg.is-loaded {\n  opacity: 1;\n}\na {\n  color: var(--vbr-widget-link-color);\n  text-decoration: none;\n}\na:hover {\n    color: var(--vbr-widget-hover-color);\n}\n.floating-content.is-tooltip {\n    background-color: var(--vbr-widget-tooltip-bg-color);\n    color: var(--vbr-widget-tooltip-color);\n    font-weight: bold;\n    padding: 5px 10px;\n    border-radius: 4px;\n    font-size: var(--vbr-widget-tooltip-font-size);\n    white-space: nowrap;\n    pointer-events: none;\n}\n.floating-content.is-tooltip .is-arrow {\n      background-color: var(--vbr-widget-tooltip-bg-color);\n}\n.floating-content.is-content {\n    /* width: 220px; */\n    border-radius: 4px;\n    box-shadow: 2px 14px 23px 0px rgba(0, 0, 0, 0.25);\n}\n.floating-content.is-content .is-arrow {\n      background-color: var(--vbr-widget-primary-color-50);\n}\n.floating-content .is-arrow {\n    position: absolute;\n    width: 8px;\n    height: 8px;\n    transform: rotate(45deg);\n}\n[data-placement^='top'] .floating-content .is-arrow {\n      bottom: -4px;\n}\n[data-placement^='bottom'] .floating-content .is-arrow {\n      top: -4px;\n}\n[data-placement^='left'] .floating-content .is-arrow {\n      right: -4px;\n}\n[data-placement^='right'] .floating-content .is-arrow {\n      left: -4px;\n}\n.mjsz-vbr-error-notice {\n  display: flex;\n  align-items: center;\n  justify-items: flex-start;\n  margin: 10px 0;\n  padding: 10px 20px;\n  background-color: var(--vbr-widget-error-notice-bg-color);\n  color: var(--vbr-widget-error-notice-color);\n  border: 1px solid var(--vbr-widget-error-notice-border-color);\n}\n.mjsz-vbr-error-notice .icon {\n    margin-right: 15px;\n}\n.mjsz-vbr-timezone-selector {\n  padding: 3px 0;\n  color: var(--vbr-widget-timezone-selector-color);\n  font-size: var(--vbr-widget-timezone-selector-font-size);\n}\n.is-card {\n  background-color: #fff;\n  padding: 15px;\n  margin-bottom: 20px;\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10), 0 2px 2px 0 rgba(0, 0, 0, 0.10);\n}\n";
  const _style_1 = ".mjsz-vbr-table {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n.mjsz-vbr-table table,\n  .mjsz-vbr-table caption,\n  .mjsz-vbr-table tbody,\n  .mjsz-vbr-table tfoot,\n  .mjsz-vbr-table thead,\n  .mjsz-vbr-table tr,\n  .mjsz-vbr-table th,\n  .mjsz-vbr-table td {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    vertical-align: baseline;\n}\n.mjsz-vbr-table {\n  color: var(--vbr-widget-table-color);\n  background-color: var(--vbr-widget-table-default-bg-color);\n}\n.mjsz-vbr-table th {\n    width: var(--vbr-widget-table-default-column-width);\n    background-color: var(--vbr-widget-table-header-bg-color);\n    font-size: var(--vbr-widget-table-header-font-size);\n    font-weight: 700;\n    color: var(--vbr-widget-table-header-color);\n    text-align: center;\n}\n.mjsz-vbr-table th:focus-visible,\n    .mjsz-vbr-table th:hover {\n      background-color: var(--vbr-widget-table-header-hover-bg-color);\n      outline: none;\n}\n.mjsz-vbr-table th.is-sortable {\n      position: relative;\n      cursor: pointer;\n}\n.mjsz-vbr-table th.is-sortable .icon-sort {\n        opacity: 0.5;\n}\n.mjsz-vbr-table th.is-active {\n      background-color: var(--vbr-widget-table-table-header-active-bg-color);\n      color: var(--vbr-widget-table-header-active-color);\n}\n.mjsz-vbr-table th.is-active .icon-sort {\n        opacity: 1;\n}\n.mjsz-vbr-table th.is-asc {\n      position: relative;\n}\n.mjsz-vbr-table th.is-desc {\n      position: relative;\n}\n.mjsz-vbr-table th.is-w-auto {\n      width: auto;\n}\n.mjsz-vbr-table th .is-icon-sort {\n      width: 11px;\n      height: 11px;\n      margin-left: 5px;\n}\n.mjsz-vbr-table td {\n    text-align: center;\n}\n.mjsz-vbr-table td.is-active {\n      font-weight: 700;\n      color: var(--vbr-widget-table-active-color);\n      background-color: var(--vbr-widget-table-active-bg-color);\n}\n.mjsz-vbr-table td .is-text-light,\n    .mjsz-vbr-table td.is-text-light {\n      color: var(--vbr-widget-table-cell-light-color);\n}\n.mjsz-vbr-table td .is-text-dark,\n    .mjsz-vbr-table td.is-text-dark {\n      color: var(--vbr-widget-table-cell-dark-color);\n}\n.mjsz-vbr-table td .is-logo-image {\n      display: inline-block;\n      vertical-align: middle;\n      width: var(--vbr-widget-table-cell-logo-size);\n      height: var(--vbr-widget-table-cell-logo-size);\n}\n.mjsz-vbr-table td .is-portrait-image {\n      display: inline-block;\n      vertical-align: middle;\n      width: var(--vbr-widget-table-cell-portrait-size);\n      height: var(--vbr-widget-table-cell-portrait-size);\n      object-fit: cover;\n      object-position: top;\n      overflow: hidden;\n      border-radius: 100%;\n      border: 1px solid var(--vbr-widget-primary-color-100);\n}\n.mjsz-vbr-table td .is-portrait-image img {\n        width: var(--vbr-widget-table-cell-portrait-size);\n        height: auto;\n}\n.mjsz-vbr-table td.is-text-bold {\n      font-weight: 700;\n}\n.mjsz-vbr-table td.is-text-xl {\n      font-size: 1.2 rem;\n}\n.mjsz-vbr-table td .is-text-accent {\n      color: var(--vbr-widget-secondary-color-500);\n}\n.mjsz-vbr-table td svg {\n      width: 16px;\n      height: 16px;\n}\n.mjsz-vbr-table td button {\n      padding: 3px 3px;\n      line-height: 0;\n      border: none;\n      outline: none;\n      background-color: transparent;\n}\n.mjsz-vbr-table td button:hover {\n        background-color: var(--vbr-widget-popover-trigger-hover-bg-color);\n}\n.mjsz-vbr-table td button:active,\n      .mjsz-vbr-table td button:focus {\n        background-color: var(--vbr-widget-popover-trigger-focus-bg-color);\n}\n.mjsz-vbr-table td a {\n      text-decoration: none;\n}\n.mjsz-vbr-table td .label {\n      padding: 3px 6px;\n      font-size: 11px;\n      font-weight: 700;\n      color: var(--vbr-widget-table-label-color);\n      background-color: var(--vbr-widget-table-label-bg-color);\n      border-radius: 2px;\n}\n.mjsz-vbr-table td .label:not(:last-of-type) {\n        margin-right: 3px;\n}\n.mjsz-vbr-table td a {\n      color: var(--vbr-widget-link-color);\n}\n.mjsz-vbr-table td a:hover {\n      color: var(--vbr-widget-hover-color);\n}\n.mjsz-vbr-table th,\n  .mjsz-vbr-table td {\n    padding: 8px;\n    white-space: nowrap;\n    vertical-align: middle;\n}\n.mjsz-vbr-table th.is-text-left, .mjsz-vbr-table td.is-text-left {\n      text-align: left;\n}\n.mjsz-vbr-table th.is-text-right, .mjsz-vbr-table td.is-text-right {\n      text-align: right;\n}\n.mjsz-vbr-table th.is-has-image, .mjsz-vbr-table td.is-has-image {\n      padding: 0 2px;\n}\n.mjsz-vbr-table th .is-duplicated, .mjsz-vbr-table td .is-duplicated {\n      color: var(--vbr-widget-table-neutral-color);\n}\n.mjsz-vbr-table tr:nth-child(even) {\n    background-color: var(--vbr-widget-table-stripped-bg-color);\n}\n.mjsz-vbr-table tr:nth-child(even) td.is-active {\n      background-color: var(--vbr-widget-table-active-even-bg-color);\n}\n.mjsz-vbr-table tr:focus-within,\n  .mjsz-vbr-table tr:hover {\n    color: var(--vbr-widget-table-hover-color);\n    background-color: var(--vbr-widget-table-hover-bg-color);\n}\n.mjsz-vbr-table tr:focus-within td.is-active, .mjsz-vbr-table tr:hover td.is-active {\n      color: var(--vbr-widget-table-active-hover-color);\n      background-color: var(--vbr-widget-table-active-hover-bg-color);\n}\n";
  const _style_2 = ".mjsz-vbr-table-responsive {\n  width: 100%;\n  overflow-x: auto;\n}\n.mjsz-vbr-table-responsive table {\n  width: 100%;\n}\n";
  const _style_3 = ".mjsz-vbr-paginator {\n  display: flex;\n  flex-direction: row;\n  list-style-type: none;\n  margin: 10px 0;\n  padding: 0;\n}\n.mjsz-vbr-paginator button,\n  .mjsz-vbr-paginator div {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 6px 12px;\n    text-decoration: none;\n    cursor: pointer;\n    color: var(--vbr-widget-paginator-color);\n    border: 1px solid var(--vbr-widget-paginator-border-color);\n    background-color: var(--vbr-widget-paginator-bg-color);\n    margin-left: -1px;\n}\n.mjsz-vbr-paginator button .icon, .mjsz-vbr-paginator div .icon {\n      width: 16px;\n      height: 16px;\n      margin: 0 -4px;\n}\n.mjsz-vbr-paginator button:hover:not(.mjsz-vbr-paginator button.is-disabled,.mjsz-vbr-paginator button.is-active), .mjsz-vbr-paginator div:hover:not(.mjsz-vbr-paginator div.is-disabled,.mjsz-vbr-paginator div.is-active) {\n      color: var(--vbr-widget-paginator-hover-color);\n      background-color: var(--vbr-widget-paginator-hover-bg-color);\n}\n.mjsz-vbr-paginator button:disabled,\n    .mjsz-vbr-paginator button.is-disabled,\n    .mjsz-vbr-paginator div:disabled,\n    .mjsz-vbr-paginator div.is-disabled {\n      color: var(--vbr-widget-paginator-disabled-color);\n      background-color: var(--vbr-widget-paginator-bg-color);\n      pointer-events: none;\n      cursor: default;\n}\n.mjsz-vbr-paginator button.is-active, .mjsz-vbr-paginator div.is-active {\n      color: var(--vbr-widget-paginator-active-color);\n      background-color: var(--vbr-widget-paginator-active-bg-color);\n      border-color: var(--vbr-widget-paginator-active-bg-color);\n      cursor: default;\n}\n";
  const _style_4 = ".is-dropdown-menu {\n  padding: 8px 0;\n  margin: 0;\n  min-width: 160px;\n  color: black;\n  list-style: none;\n  background: var(--vbr-widget-popover-bg-color);\n  border-radius: 3px;\n  box-shadow: 0 5px 30px rgba(black, 0.3);\n}\n.is-dropdown-menu .is-dropdown-item {\n    display: flex;\n    align-items: center;\n    padding: .25rem 1rem;\n    font-family: var(--vbr-widget-font-family);\n    line-height: 24px;\n    color: var(--vbr-widget-dropdown-item-color);\n    text-align: inherit;\n    text-decoration: none;\n    white-space: nowrap;\n    background-color: transparent;\n    border: 0;\n}\n.is-dropdown-menu .is-dropdown-item:hover {\n      color: var(--vbr-widget-dropdown-item-hover-color);\n      background-color: var(--vbr-widget-dropdown-item-hover-bg-color);\n}\n.is-dropdown-menu .is-dropdown-item svg {\n      margin-right: 8px;\n}\n";
  const _sfc_main = {
    __name: "Schedule.ce",
    props: {
      ...baseProps,
      pagination: {
        type: Boolean,
        default: true
      },
      limit: {
        type: Number,
        default: 20
      },
      teamFilterByName: {
        type: String,
        default: ""
      },
      initialPage: {
        type: Number,
        default: 1,
        validator: (value) => value >= 1
      },
      autoInitialPage: {
        type: Boolean,
        default: false
      },
      externalGameLink: {
        type: [String, Function],
        default: ""
      },
      timezoneSelector: {
        type: Boolean,
        default: false
      },
      autoRefresh: {
        type: Boolean,
        default: false
      }
    },
    setup(__props) {
      const props = __props;
      const { onError, error, hasError } = composables.useErrorProvider();
      const locale = vue.computed(() => props.locale);
      const {
        state: rawRows,
        isLoading,
        execute
      } = useAsyncState(
        () => composables.fetchVBRData("/v1/gamesList", props.apiKey, {
          championshipId: props.championshipId,
          division: props.division
        }),
        [],
        {
          resetOnExecute: false,
          immediate: !props.autoRefresh,
          onError: (error2) => {
            onError(error2);
            pause == null ? void 0 : pause();
          }
        }
      );
      const rows = vue.computed(() => utils.sortGames(rawRows.value));
      const { pause, resume } = useTimeoutPoll(execute, core.REFRESH_DELAY, { immediate: false });
      const { page, change: onPaginatorChange } = composables.usePage({
        initial: props.initialPage,
        items: rows,
        limit: props.limit,
        auto: props.autoInitialPage
      });
      const timezone = vue.ref(utils.getLocalTimezone());
      const currentOffsetName = composables.offsetName(new Date(), vue.unref(timezone), props.locale);
      const convertedRows = vue.computed(() => {
        return utils.convert(vue.unref(rows)).filter(props.teamFilterByName, ["homeTeamName", "awayTeamName"]).schedule(vue.unref(timezone), vue.unref(locale)).pagination(vue.unref(page), props.limit).value();
      });
      if (props.autoRefresh) {
        resume();
        const visibility = useDocumentVisibility();
        vue.watch(visibility, (visible) => {
          if (visible === "visible")
            return resume();
          pause();
        });
      }
      const totalItems = vue.computed(() => {
        var _a2;
        return (_a2 = convertedRows.value) == null ? void 0 : _a2.totalItems;
      });
      const onTimezoneChange = (tz) => {
        timezone.value = tz;
      };
      const resolveExternalGameLink = (gameId) => core.externalGameLinkResolver(props.externalGameLink, gameId);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createVNode(vue.unref(components.I18NProvider), {
            locale: props.locale
          }, {
            default: vue.withCtx(() => [
              vue.unref(hasError) ? (vue.openBlock(), vue.createBlock(vue.unref(components.ErrorNotice), {
                key: 0,
                error: vue.unref(error)
              }, null, 8, ["error"])) : vue.createCommentVNode("", true),
              __props.timezoneSelector ? (vue.openBlock(), vue.createBlock(vue.unref(components.TimezoneSelector), {
                key: props.locale,
                locale: props.locale,
                "current-zone": timezone.value,
                onChange: onTimezoneChange
              }, null, 8, ["locale", "current-zone"])) : vue.createCommentVNode("", true),
              vue.createVNode(_sfc_main$1, {
                rows: vue.unref(convertedRows).rows,
                "is-loading": vue.unref(isLoading) && vue.unref(convertedRows).rows.length > 0,
                "offset-name": vue.unref(currentOffsetName),
                "hide-columns": props.hideColumns,
                "external-game-resolver": resolveExternalGameLink
              }, null, 8, ["rows", "is-loading", "offset-name", "hide-columns"]),
              vue.createVNode(vue.unref(components.Paginator), {
                page: vue.unref(page),
                "items-per-page": props.limit,
                "total-items": vue.unref(totalItems),
                "range-length": 5,
                onChange: vue.unref(onPaginatorChange)
              }, null, 8, ["page", "items-per-page", "total-items", "onChange"])
            ]),
            _: 1
          }, 8, ["locale"])
        ]);
      };
    }
  };
  const Schedule = /* @__PURE__ */ _export_sfc(_sfc_main, [["styles", [_style_0, _style_1, _style_2, _style_3, _style_4]]]);
  const setup = ({ apiKey }) => {
    window.__MJSZ_VBR_WIDGET__ = { apiKey };
    register();
  };
  const StandingsCE = vue.defineCustomElement(Standings);
  const ScheduleCE = vue.defineCustomElement(Schedule);
  function register() {
    customElements.define("mjsz-vbr-standings", StandingsCE);
    customElements.define("mjsz-vbr-schedule", ScheduleCE);
  }
  exports.StandingsCE = StandingsCE;
  exports.register = register;
  exports.setup = setup;
  Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
  return exports;
}({}, Vue, MjszWidgetCore, MjszWidgetCore, MjszWidgetCore, MjszWidgetCore);
