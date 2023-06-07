import {
  require_dayjs_min
} from "./chunk-UQB2Y5Q5.js";
import {
  __commonJS
} from "./chunk-RSJERJUL.js";

// ../node_modules/.pnpm/dayjs@1.11.7/node_modules/dayjs/locale/hu.js
var require_hu = __commonJS({
  "../node_modules/.pnpm/dayjs@1.11.7/node_modules/dayjs/locale/hu.js"(exports, module) {
    !function(e, n) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = n(require_dayjs_min()) : "function" == typeof define && define.amd ? define(["dayjs"], n) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_locale_hu = n(e.dayjs);
    }(exports, function(e) {
      "use strict";
      function n(e2) {
        return e2 && "object" == typeof e2 && "default" in e2 ? e2 : { default: e2 };
      }
      var t = n(e), r = { name: "hu", weekdays: "vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"), weekdaysShort: "vas_hét_kedd_sze_csüt_pén_szo".split("_"), weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"), months: "január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"), monthsShort: "jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"), ordinal: function(e2) {
        return e2 + ".";
      }, weekStart: 1, relativeTime: { future: "%s múlva", past: "%s", s: function(e2, n2, t2, r2) {
        return "néhány másodperc" + (r2 || n2 ? "" : "e");
      }, m: function(e2, n2, t2, r2) {
        return "egy perc" + (r2 || n2 ? "" : "e");
      }, mm: function(e2, n2, t2, r2) {
        return e2 + " perc" + (r2 || n2 ? "" : "e");
      }, h: function(e2, n2, t2, r2) {
        return "egy " + (r2 || n2 ? "óra" : "órája");
      }, hh: function(e2, n2, t2, r2) {
        return e2 + " " + (r2 || n2 ? "óra" : "órája");
      }, d: function(e2, n2, t2, r2) {
        return "egy " + (r2 || n2 ? "nap" : "napja");
      }, dd: function(e2, n2, t2, r2) {
        return e2 + " " + (r2 || n2 ? "nap" : "napja");
      }, M: function(e2, n2, t2, r2) {
        return "egy " + (r2 || n2 ? "hónap" : "hónapja");
      }, MM: function(e2, n2, t2, r2) {
        return e2 + " " + (r2 || n2 ? "hónap" : "hónapja");
      }, y: function(e2, n2, t2, r2) {
        return "egy " + (r2 || n2 ? "év" : "éve");
      }, yy: function(e2, n2, t2, r2) {
        return e2 + " " + (r2 || n2 ? "év" : "éve");
      } }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "YYYY.MM.DD.", LL: "YYYY. MMMM D.", LLL: "YYYY. MMMM D. H:mm", LLLL: "YYYY. MMMM D., dddd H:mm" } };
      return t.default.locale(r, null, true), r;
    });
  }
});
export default require_hu();
//# sourceMappingURL=dayjs_locale_hu.js.map