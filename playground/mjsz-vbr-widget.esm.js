import { unref as d, getCurrentScope as or, onScopeDispose as rr, shallowRef as nr, ref as K, watch as Bt, reactive as Me, computed as D, provide as ar, inject as ir, openBlock as y, createElementBlock as $, normalizeClass as nt, renderSlot as dt, Fragment as at, createCommentVNode as G, createElementVNode as T, isRef as sr, normalizeStyle as Ye, createVNode as L, Transition as lr, withCtx as R, createTextVNode as $t, toDisplayString as U, toRef as cr, renderList as bt, createBlock as J, withModifiers as Le, defineComponent as ur, normalizeProps as dr, guardReactiveProps as pr, defineCustomElement as Pt } from "vue";
/*!
  * MJSZ VBR Widgets v2.0.0-alpha.1
  * (c) 2022 Akos Stegner
  * Released: 21/10/2022, 11:38:46
  * Released under the MIT License.
  */
var Ue;
const Wt = typeof window < "u", fr = (e) => typeof e == "string", Vt = () => {
};
Wt && ((Ue = window == null ? void 0 : window.navigator) == null ? void 0 : Ue.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function Oe(e) {
  return typeof e == "function" ? e() : d(e);
}
function gr(e, t = !1, o = "Timeout") {
  return new Promise((r, n) => {
    setTimeout(t ? () => n(o) : r, e);
  });
}
function mr(e) {
  return e;
}
function hr(e) {
  return or() ? (rr(e), !0) : !1;
}
function Gt(e) {
  var t;
  const o = Oe(e);
  return (t = o == null ? void 0 : o.$el) != null ? t : o;
}
const Oo = Wt ? window : void 0;
Wt && window.document;
Wt && window.navigator;
Wt && window.location;
function ne(...e) {
  let t, o, r, n;
  if (fr(e[0]) ? ([o, r, n] = e, t = Oo) : [t, o, r, n] = e, !t)
    return Vt;
  let a = Vt;
  const i = Bt(() => Gt(t), (l) => {
    a(), l && (l.addEventListener(o, r, n), a = () => {
      l.removeEventListener(o, r, n), a = Vt;
    });
  }, { immediate: !0, flush: "post" }), s = () => {
    i(), a();
  };
  return hr(s), s;
}
function vr(e, t, o = {}) {
  const { window: r = Oo, ignore: n, capture: a = !0, detectIframe: i = !1 } = o;
  if (!r)
    return;
  const s = K(!0);
  let l;
  const c = (g) => {
    r.clearTimeout(l);
    const h = Gt(e);
    !h || h === g.target || g.composedPath().includes(h) || !s.value || t(g);
  }, f = (g) => n && n.some((h) => {
    const u = Gt(h);
    return u && (g.target === u || g.composedPath().includes(u));
  }), p = [
    ne(r, "click", c, { passive: !0, capture: a }),
    ne(r, "pointerdown", (g) => {
      const h = Gt(e);
      s.value = !!h && !g.composedPath().includes(h) && !f(g);
    }, { passive: !0 }),
    ne(r, "pointerup", (g) => {
      if (g.button === 0) {
        const h = g.composedPath();
        g.composedPath = () => h, l = r.setTimeout(() => c(g), 50);
      }
    }, { passive: !0 }),
    i && ne(r, "blur", (g) => {
      var h;
      const u = Gt(e);
      ((h = document.activeElement) == null ? void 0 : h.tagName) === "IFRAME" && !(u != null && u.contains(document.activeElement)) && t(g);
    })
  ].filter(Boolean);
  return () => p.forEach((g) => g());
}
function Ot(e, t, o) {
  const {
    immediate: r = !0,
    delay: n = 0,
    onError: a = Vt,
    resetOnExecute: i = !0,
    shallow: s = !0,
    throwError: l
  } = o != null ? o : {}, c = s ? nr(t) : K(t), f = K(!1), p = K(!1), m = K(void 0);
  async function g(h = 0, ...u) {
    i && (c.value = t), m.value = void 0, f.value = !1, p.value = !0, h > 0 && await gr(h);
    const v = typeof e == "function" ? e(...u) : e;
    try {
      const S = await v;
      c.value = S, f.value = !0;
    } catch (S) {
      if (m.value = S, a(S), l)
        throw m;
    } finally {
      p.value = !1;
    }
    return c.value;
  }
  return r && g(n), {
    state: c,
    isReady: f,
    isLoading: p,
    error: m,
    execute: g
  };
}
const Te = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, ze = "__vueuse_ssr_handlers__";
Te[ze] = Te[ze] || {};
Te[ze];
var br = Object.defineProperty, We = Object.getOwnPropertySymbols, yr = Object.prototype.hasOwnProperty, wr = Object.prototype.propertyIsEnumerable, Ke = (e, t, o) => t in e ? br(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o, _r = (e, t) => {
  for (var o in t || (t = {}))
    yr.call(t, o) && Ke(e, o, t[o]);
  if (We)
    for (var o of We(t))
      wr.call(t, o) && Ke(e, o, t[o]);
  return e;
};
async function xr(e) {
  return new Promise((t, o) => {
    const r = new Image(), { src: n, srcset: a, sizes: i } = e;
    r.src = n, a && (r.srcset = a), i && (r.sizes = i), r.onload = () => t(r), r.onerror = o;
  });
}
const $r = (e, t = {}) => {
  const o = Ot(() => xr(Oe(e)), void 0, _r({
    resetOnExecute: !0
  }, t));
  return Bt(() => Oe(e), () => o.execute(t.delay), { deep: !0 }), o;
};
var qe;
(function(e) {
  e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE";
})(qe || (qe = {}));
var Sr = Object.defineProperty, Ze = Object.getOwnPropertySymbols, Pr = Object.prototype.hasOwnProperty, Or = Object.prototype.propertyIsEnumerable, Xe = (e, t, o) => t in e ? Sr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o, Tr = (e, t) => {
  for (var o in t || (t = {}))
    Pr.call(t, o) && Xe(e, o, t[o]);
  if (Ze)
    for (var o of Ze(t))
      Or.call(t, o) && Xe(e, o, t[o]);
  return e;
};
const zr = {
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
Tr({
  linear: mr
}, zr);
var Tt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, De = { exports: {} };
(function(e, t) {
  (function(o, r) {
    e.exports = r();
  })(Tt, function() {
    var o = 1e3, r = 6e4, n = 36e5, a = "millisecond", i = "second", s = "minute", l = "hour", c = "day", f = "week", p = "month", m = "quarter", g = "year", h = "date", u = "Invalid Date", v = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, S = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, O = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, P = function(z, x, _) {
      var k = String(z);
      return !k || k.length >= x ? z : "" + Array(x + 1 - k.length).join(_) + z;
    }, C = { s: P, z: function(z) {
      var x = -z.utcOffset(), _ = Math.abs(x), k = Math.floor(_ / 60), b = _ % 60;
      return (x <= 0 ? "+" : "-") + P(k, 2, "0") + ":" + P(b, 2, "0");
    }, m: function z(x, _) {
      if (x.date() < _.date())
        return -z(_, x);
      var k = 12 * (_.year() - x.year()) + (_.month() - x.month()), b = x.clone().add(k, p), A = _ - b < 0, I = x.clone().add(k + (A ? -1 : 1), p);
      return +(-(k + (_ - b) / (A ? b - I : I - b)) || 0);
    }, a: function(z) {
      return z < 0 ? Math.ceil(z) || 0 : Math.floor(z);
    }, p: function(z) {
      return { M: p, y: g, w: f, d: c, D: h, h: l, m: s, s: i, ms: a, Q: m }[z] || String(z || "").toLowerCase().replace(/s$/, "");
    }, u: function(z) {
      return z === void 0;
    } }, E = "en", V = {};
    V[E] = O;
    var Y = function(z) {
      return z instanceof tt;
    }, B = function z(x, _, k) {
      var b;
      if (!x)
        return E;
      if (typeof x == "string") {
        var A = x.toLowerCase();
        V[A] && (b = A), _ && (V[A] = _, b = A);
        var I = x.split("-");
        if (!b && I.length > 1)
          return z(I[0]);
      } else {
        var N = x.name;
        V[N] = x, b = N;
      }
      return !k && b && (E = b), b || !k && E;
    }, M = function(z, x) {
      if (Y(z))
        return z.clone();
      var _ = typeof x == "object" ? x : {};
      return _.date = z, _.args = arguments, new tt(_);
    }, j = C;
    j.l = B, j.i = Y, j.w = function(z, x) {
      return M(z, { locale: x.$L, utc: x.$u, x: x.$x, $offset: x.$offset });
    };
    var tt = function() {
      function z(_) {
        this.$L = B(_.locale, null, !0), this.parse(_);
      }
      var x = z.prototype;
      return x.parse = function(_) {
        this.$d = function(k) {
          var b = k.date, A = k.utc;
          if (b === null)
            return new Date(NaN);
          if (j.u(b))
            return new Date();
          if (b instanceof Date)
            return new Date(b);
          if (typeof b == "string" && !/Z$/i.test(b)) {
            var I = b.match(v);
            if (I) {
              var N = I[2] - 1 || 0, X = (I[7] || "0").substring(0, 3);
              return A ? new Date(Date.UTC(I[1], N, I[3] || 1, I[4] || 0, I[5] || 0, I[6] || 0, X)) : new Date(I[1], N, I[3] || 1, I[4] || 0, I[5] || 0, I[6] || 0, X);
            }
          }
          return new Date(b);
        }(_), this.$x = _.x || {}, this.init();
      }, x.init = function() {
        var _ = this.$d;
        this.$y = _.getFullYear(), this.$M = _.getMonth(), this.$D = _.getDate(), this.$W = _.getDay(), this.$H = _.getHours(), this.$m = _.getMinutes(), this.$s = _.getSeconds(), this.$ms = _.getMilliseconds();
      }, x.$utils = function() {
        return j;
      }, x.isValid = function() {
        return this.$d.toString() !== u;
      }, x.isSame = function(_, k) {
        var b = M(_);
        return this.startOf(k) <= b && b <= this.endOf(k);
      }, x.isAfter = function(_, k) {
        return M(_) < this.startOf(k);
      }, x.isBefore = function(_, k) {
        return this.endOf(k) < M(_);
      }, x.$g = function(_, k, b) {
        return j.u(_) ? this[k] : this.set(b, _);
      }, x.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, x.valueOf = function() {
        return this.$d.getTime();
      }, x.startOf = function(_, k) {
        var b = this, A = !!j.u(k) || k, I = j.p(_), N = function(It, ot) {
          var ht = j.w(b.$u ? Date.UTC(b.$y, ot, It) : new Date(b.$y, ot, It), b);
          return A ? ht : ht.endOf(c);
        }, X = function(It, ot) {
          return j.w(b.toDate()[It].apply(b.toDate("s"), (A ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ot)), b);
        }, W = this.$W, et = this.$M, mt = this.$D, ct = "set" + (this.$u ? "UTC" : "");
        switch (I) {
          case g:
            return A ? N(1, 0) : N(31, 11);
          case p:
            return A ? N(1, et) : N(0, et + 1);
          case f:
            var Dt = this.$locale().weekStart || 0, Nt = (W < Dt ? W + 7 : W) - Dt;
            return N(A ? mt - Nt : mt + (6 - Nt), et);
          case c:
          case h:
            return X(ct + "Hours", 0);
          case l:
            return X(ct + "Minutes", 1);
          case s:
            return X(ct + "Seconds", 2);
          case i:
            return X(ct + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, x.endOf = function(_) {
        return this.startOf(_, !1);
      }, x.$set = function(_, k) {
        var b, A = j.p(_), I = "set" + (this.$u ? "UTC" : ""), N = (b = {}, b[c] = I + "Date", b[h] = I + "Date", b[p] = I + "Month", b[g] = I + "FullYear", b[l] = I + "Hours", b[s] = I + "Minutes", b[i] = I + "Seconds", b[a] = I + "Milliseconds", b)[A], X = A === c ? this.$D + (k - this.$W) : k;
        if (A === p || A === g) {
          var W = this.clone().set(h, 1);
          W.$d[N](X), W.init(), this.$d = W.set(h, Math.min(this.$D, W.daysInMonth())).$d;
        } else
          N && this.$d[N](X);
        return this.init(), this;
      }, x.set = function(_, k) {
        return this.clone().$set(_, k);
      }, x.get = function(_) {
        return this[j.p(_)]();
      }, x.add = function(_, k) {
        var b, A = this;
        _ = Number(_);
        var I = j.p(k), N = function(et) {
          var mt = M(A);
          return j.w(mt.date(mt.date() + Math.round(et * _)), A);
        };
        if (I === p)
          return this.set(p, this.$M + _);
        if (I === g)
          return this.set(g, this.$y + _);
        if (I === c)
          return N(1);
        if (I === f)
          return N(7);
        var X = (b = {}, b[s] = r, b[l] = n, b[i] = o, b)[I] || 1, W = this.$d.getTime() + _ * X;
        return j.w(W, this);
      }, x.subtract = function(_, k) {
        return this.add(-1 * _, k);
      }, x.format = function(_) {
        var k = this, b = this.$locale();
        if (!this.isValid())
          return b.invalidDate || u;
        var A = _ || "YYYY-MM-DDTHH:mm:ssZ", I = j.z(this), N = this.$H, X = this.$m, W = this.$M, et = b.weekdays, mt = b.months, ct = function(ot, ht, xe, re) {
          return ot && (ot[ht] || ot(k, A)) || xe[ht].slice(0, re);
        }, Dt = function(ot) {
          return j.s(N % 12 || 12, ot, "0");
        }, Nt = b.meridiem || function(ot, ht, xe) {
          var re = ot < 12 ? "AM" : "PM";
          return xe ? re.toLowerCase() : re;
        }, It = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: W + 1, MM: j.s(W + 1, 2, "0"), MMM: ct(b.monthsShort, W, mt, 3), MMMM: ct(mt, W), D: this.$D, DD: j.s(this.$D, 2, "0"), d: String(this.$W), dd: ct(b.weekdaysMin, this.$W, et, 2), ddd: ct(b.weekdaysShort, this.$W, et, 3), dddd: et[this.$W], H: String(N), HH: j.s(N, 2, "0"), h: Dt(1), hh: Dt(2), a: Nt(N, X, !0), A: Nt(N, X, !1), m: String(X), mm: j.s(X, 2, "0"), s: String(this.$s), ss: j.s(this.$s, 2, "0"), SSS: j.s(this.$ms, 3, "0"), Z: I };
        return A.replace(S, function(ot, ht) {
          return ht || It[ot] || I.replace(":", "");
        });
      }, x.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, x.diff = function(_, k, b) {
        var A, I = j.p(k), N = M(_), X = (N.utcOffset() - this.utcOffset()) * r, W = this - N, et = j.m(this, N);
        return et = (A = {}, A[g] = et / 12, A[p] = et, A[m] = et / 3, A[f] = (W - X) / 6048e5, A[c] = (W - X) / 864e5, A[l] = W / n, A[s] = W / r, A[i] = W / o, A)[I] || W, b ? et : j.a(et);
      }, x.daysInMonth = function() {
        return this.endOf(p).$D;
      }, x.$locale = function() {
        return V[this.$L];
      }, x.locale = function(_, k) {
        if (!_)
          return this.$L;
        var b = this.clone(), A = B(_, k, !0);
        return A && (b.$L = A), b;
      }, x.clone = function() {
        return j.w(this.$d, this);
      }, x.toDate = function() {
        return new Date(this.valueOf());
      }, x.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, x.toISOString = function() {
        return this.$d.toISOString();
      }, x.toString = function() {
        return this.$d.toUTCString();
      }, z;
    }(), st = tt.prototype;
    return M.prototype = st, [["$ms", a], ["$s", i], ["$m", s], ["$H", l], ["$W", c], ["$M", p], ["$y", g], ["$D", h]].forEach(function(z) {
      st[z[1]] = function(x) {
        return this.$g(x, z[0], z[1]);
      };
    }), M.extend = function(z, x) {
      return z.$i || (z(x, tt, M), z.$i = !0), M;
    }, M.locale = B, M.isDayjs = Y, M.unix = function(z) {
      return M(1e3 * z);
    }, M.en = V[E], M.Ls = V, M.p = {}, M;
  });
})(De);
const it = De.exports, ut = async (e, t, o) => {
  const r = `https://api.icehockey.hu/vbr${d(e)}?${kr(o)}`;
  return new Promise((n, a) => {
    var i;
    fetch(r, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": t || ((i = window.__MJSZ_VBR_WIDGET__) == null ? void 0 : i.apiKey) || ""
      }
    }).then((s) => s.json()).then((s) => {
      if (s.error)
        return a(s);
      n(s.data);
    }).catch((s) => {
      a(s);
    });
  });
}, kr = (e) => Object.keys(e).map((t) => t + "=" + e[t]).join("&");
function H(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function q(e) {
  return function t(o) {
    return arguments.length === 0 || H(o) ? t : e.apply(this, arguments);
  };
}
function F(e) {
  return function t(o, r) {
    switch (arguments.length) {
      case 0:
        return t;
      case 1:
        return H(o) ? t : q(function(n) {
          return e(o, n);
        });
      default:
        return H(o) && H(r) ? t : H(o) ? q(function(n) {
          return e(n, r);
        }) : H(r) ? q(function(n) {
          return e(o, n);
        }) : e(o, r);
    }
  };
}
function pe(e, t) {
  switch (e) {
    case 0:
      return function() {
        return t.apply(this, arguments);
      };
    case 1:
      return function(o) {
        return t.apply(this, arguments);
      };
    case 2:
      return function(o, r) {
        return t.apply(this, arguments);
      };
    case 3:
      return function(o, r, n) {
        return t.apply(this, arguments);
      };
    case 4:
      return function(o, r, n, a) {
        return t.apply(this, arguments);
      };
    case 5:
      return function(o, r, n, a, i) {
        return t.apply(this, arguments);
      };
    case 6:
      return function(o, r, n, a, i, s) {
        return t.apply(this, arguments);
      };
    case 7:
      return function(o, r, n, a, i, s, l) {
        return t.apply(this, arguments);
      };
    case 8:
      return function(o, r, n, a, i, s, l, c) {
        return t.apply(this, arguments);
      };
    case 9:
      return function(o, r, n, a, i, s, l, c, f) {
        return t.apply(this, arguments);
      };
    case 10:
      return function(o, r, n, a, i, s, l, c, f, p) {
        return t.apply(this, arguments);
      };
    default:
      throw new Error("First argument to _arity must be a non-negative integer no greater than ten");
  }
}
function To(e, t, o) {
  return function() {
    for (var r = [], n = 0, a = e, i = 0; i < t.length || n < arguments.length; ) {
      var s;
      i < t.length && (!H(t[i]) || n >= arguments.length) ? s = t[i] : (s = arguments[n], n += 1), r[i] = s, H(s) || (a -= 1), i += 1;
    }
    return a <= 0 ? o.apply(this, r) : pe(a, To(e, r, o));
  };
}
var Ar = /* @__PURE__ */ F(function(t, o) {
  return t === 1 ? q(o) : pe(t, To(t, [], o));
});
const fe = Ar;
function zt(e) {
  return function t(o, r, n) {
    switch (arguments.length) {
      case 0:
        return t;
      case 1:
        return H(o) ? t : F(function(a, i) {
          return e(o, a, i);
        });
      case 2:
        return H(o) && H(r) ? t : H(o) ? F(function(a, i) {
          return e(a, r, i);
        }) : H(r) ? F(function(a, i) {
          return e(o, a, i);
        }) : q(function(a) {
          return e(o, r, a);
        });
      default:
        return H(o) && H(r) && H(n) ? t : H(o) && H(r) ? F(function(a, i) {
          return e(a, i, n);
        }) : H(o) && H(n) ? F(function(a, i) {
          return e(a, r, i);
        }) : H(r) && H(n) ? F(function(a, i) {
          return e(o, a, i);
        }) : H(o) ? q(function(a) {
          return e(a, r, n);
        }) : H(r) ? q(function(a) {
          return e(o, a, n);
        }) : H(n) ? q(function(a) {
          return e(o, r, a);
        }) : e(o, r, n);
    }
  };
}
const ge = Array.isArray || function(t) {
  return t != null && t.length >= 0 && Object.prototype.toString.call(t) === "[object Array]";
};
function Ir(e) {
  return e != null && typeof e["@@transducer/step"] == "function";
}
function Ne(e, t, o) {
  return function() {
    if (arguments.length === 0)
      return o();
    var r = arguments[arguments.length - 1];
    if (!ge(r)) {
      for (var n = 0; n < e.length; ) {
        if (typeof r[e[n]] == "function")
          return r[e[n]].apply(r, Array.prototype.slice.call(arguments, 0, -1));
        n += 1;
      }
      if (Ir(r)) {
        var a = t.apply(null, Array.prototype.slice.call(arguments, 0, -1));
        return a(r);
      }
    }
    return o.apply(this, arguments);
  };
}
function jr(e) {
  return e && e["@@transducer/reduced"] ? e : {
    "@@transducer/value": e,
    "@@transducer/reduced": !0
  };
}
const Yt = {
  init: function() {
    return this.xf["@@transducer/init"]();
  },
  result: function(e) {
    return this.xf["@@transducer/result"](e);
  }
};
var Cr = /* @__PURE__ */ F(function(t, o) {
  return o > t ? o : t;
});
const Mr = Cr;
function ae(e, t) {
  for (var o = 0, r = t.length, n = Array(r); o < r; )
    n[o] = e(t[o]), o += 1;
  return n;
}
function me(e) {
  return Object.prototype.toString.call(e) === "[object String]";
}
var Lr = /* @__PURE__ */ q(function(t) {
  return ge(t) ? !0 : !t || typeof t != "object" || me(t) ? !1 : t.length === 0 ? !0 : t.length > 0 ? t.hasOwnProperty(0) && t.hasOwnProperty(t.length - 1) : !1;
});
const Dr = Lr;
var Nr = /* @__PURE__ */ function() {
  function e(t) {
    this.f = t;
  }
  return e.prototype["@@transducer/init"] = function() {
    throw new Error("init not implemented on XWrap");
  }, e.prototype["@@transducer/result"] = function(t) {
    return t;
  }, e.prototype["@@transducer/step"] = function(t, o) {
    return this.f(t, o);
  }, e;
}();
function Er(e) {
  return new Nr(e);
}
var Rr = /* @__PURE__ */ F(function(t, o) {
  return pe(t.length, function() {
    return t.apply(o, arguments);
  });
});
const Gr = Rr;
function Fr(e, t, o) {
  for (var r = 0, n = o.length; r < n; ) {
    if (t = e["@@transducer/step"](t, o[r]), t && t["@@transducer/reduced"]) {
      t = t["@@transducer/value"];
      break;
    }
    r += 1;
  }
  return e["@@transducer/result"](t);
}
function Je(e, t, o) {
  for (var r = o.next(); !r.done; ) {
    if (t = e["@@transducer/step"](t, r.value), t && t["@@transducer/reduced"]) {
      t = t["@@transducer/value"];
      break;
    }
    r = o.next();
  }
  return e["@@transducer/result"](t);
}
function Qe(e, t, o, r) {
  return e["@@transducer/result"](o[r](Gr(e["@@transducer/step"], e), t));
}
var to = typeof Symbol < "u" ? Symbol.iterator : "@@iterator";
function Ee(e, t, o) {
  if (typeof e == "function" && (e = Er(e)), Dr(o))
    return Fr(e, t, o);
  if (typeof o["fantasy-land/reduce"] == "function")
    return Qe(e, t, o, "fantasy-land/reduce");
  if (o[to] != null)
    return Je(e, t, o[to]());
  if (typeof o.next == "function")
    return Je(e, t, o);
  if (typeof o.reduce == "function")
    return Qe(e, t, o, "reduce");
  throw new TypeError("reduce: list must be array or iterable");
}
var Vr = /* @__PURE__ */ function() {
  function e(t, o) {
    this.xf = o, this.f = t;
  }
  return e.prototype["@@transducer/init"] = Yt.init, e.prototype["@@transducer/result"] = Yt.result, e.prototype["@@transducer/step"] = function(t, o) {
    return this.xf["@@transducer/step"](t, this.f(o));
  }, e;
}(), Hr = /* @__PURE__ */ F(function(t, o) {
  return new Vr(t, o);
});
const Br = Hr;
function ie(e, t) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
var eo = Object.prototype.toString, Yr = /* @__PURE__ */ function() {
  return eo.call(arguments) === "[object Arguments]" ? function(t) {
    return eo.call(t) === "[object Arguments]";
  } : function(t) {
    return ie("callee", t);
  };
}();
const zo = Yr;
var Ur = !/* @__PURE__ */ {
  toString: null
}.propertyIsEnumerable("toString"), oo = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"], ro = /* @__PURE__ */ function() {
  return arguments.propertyIsEnumerable("length");
}(), Wr = function(t, o) {
  for (var r = 0; r < t.length; ) {
    if (t[r] === o)
      return !0;
    r += 1;
  }
  return !1;
}, Kr = /* @__PURE__ */ q(typeof Object.keys == "function" && !ro ? function(t) {
  return Object(t) !== t ? [] : Object.keys(t);
} : function(t) {
  if (Object(t) !== t)
    return [];
  var o, r, n = [], a = ro && zo(t);
  for (o in t)
    ie(o, t) && (!a || o !== "length") && (n[n.length] = o);
  if (Ur)
    for (r = oo.length - 1; r >= 0; )
      o = oo[r], ie(o, t) && !Wr(n, o) && (n[n.length] = o), r -= 1;
  return n;
});
const St = Kr;
var qr = /* @__PURE__ */ F(
  /* @__PURE__ */ Ne(["fantasy-land/map", "map"], Br, function(t, o) {
    switch (Object.prototype.toString.call(o)) {
      case "[object Function]":
        return fe(o.length, function() {
          return t.call(this, o.apply(this, arguments));
        });
      case "[object Object]":
        return Ee(function(r, n) {
          return r[n] = t(o[n]), r;
        }, {}, St(o));
      default:
        return ae(t, o);
    }
  })
);
const Kt = qr, ko = Number.isInteger || function(t) {
  return t << 0 === t;
};
var Zr = /* @__PURE__ */ F(function(t, o) {
  var r = t < 0 ? o.length + t : t;
  return me(o) ? o.charAt(r) : o[r];
});
const Re = Zr;
var Xr = /* @__PURE__ */ F(function(t, o) {
  if (o != null)
    return ko(t) ? Re(t, o) : o[t];
});
const qt = Xr;
var Jr = /* @__PURE__ */ F(function(t, o) {
  return Kt(qt(t), o);
});
const Qr = Jr;
var tn = /* @__PURE__ */ zt(Ee);
const Ao = tn;
var en = /* @__PURE__ */ q(function(t) {
  return function() {
    return t;
  };
});
const no = en;
var on = /* @__PURE__ */ q(function(t) {
  return fe(Ao(Mr, 0, Qr("length", t)), function() {
    for (var o = 0, r = t.length; o < r; ) {
      if (t[o].apply(this, arguments))
        return !0;
      o += 1;
    }
    return !1;
  });
});
const rn = on;
var nn = /* @__PURE__ */ zt(function(t, o, r) {
  var n = t(o), a = t(r);
  return n < a ? -1 : n > a ? 1 : 0;
});
const an = nn;
function sn(e) {
  var t = Object.prototype.toString.call(e);
  return t === "[object Function]" || t === "[object AsyncFunction]" || t === "[object GeneratorFunction]" || t === "[object AsyncGeneratorFunction]";
}
var ln = /* @__PURE__ */ q(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
const ao = ln;
function cn(e, t) {
  return function() {
    return t.call(this, e.apply(this, arguments));
  };
}
function Io(e, t) {
  return function() {
    var o = arguments.length;
    if (o === 0)
      return t();
    var r = arguments[o - 1];
    return ge(r) || typeof r[e] != "function" ? t.apply(this, arguments) : r[e].apply(r, Array.prototype.slice.call(arguments, 0, o - 1));
  };
}
var un = /* @__PURE__ */ zt(
  /* @__PURE__ */ Io("slice", function(t, o, r) {
    return Array.prototype.slice.call(r, t, o);
  })
);
const dn = un;
var pn = /* @__PURE__ */ q(
  /* @__PURE__ */ Io(
    "tail",
    /* @__PURE__ */ dn(1, 1 / 0)
  )
);
const fn = pn;
function gn() {
  if (arguments.length === 0)
    throw new Error("pipe requires at least one argument");
  return pe(arguments[0].length, Ao(cn, arguments[0], fn(arguments)));
}
var mn = /* @__PURE__ */ q(function(t) {
  return me(t) ? t.split("").reverse().join("") : Array.prototype.slice.call(t, 0).reverse();
});
const hn = mn;
function jo() {
  if (arguments.length === 0)
    throw new Error("compose requires at least one argument");
  return gn.apply(this, hn(arguments));
}
var vn = /* @__PURE__ */ Re(0);
const io = vn;
function so(e) {
  for (var t = [], o; !(o = e.next()).done; )
    t.push(o.value);
  return t;
}
function lo(e, t, o) {
  for (var r = 0, n = o.length; r < n; ) {
    if (e(t, o[r]))
      return !0;
    r += 1;
  }
  return !1;
}
function bn(e) {
  var t = String(e).match(/^function (\w*)/);
  return t == null ? "" : t[1];
}
function yn(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
const $e = typeof Object.is == "function" ? Object.is : yn;
function co(e, t, o, r) {
  var n = so(e), a = so(t);
  function i(s, l) {
    return Ge(s, l, o.slice(), r.slice());
  }
  return !lo(function(s, l) {
    return !lo(i, l, s);
  }, a, n);
}
function Ge(e, t, o, r) {
  if ($e(e, t))
    return !0;
  var n = ao(e);
  if (n !== ao(t))
    return !1;
  if (typeof e["fantasy-land/equals"] == "function" || typeof t["fantasy-land/equals"] == "function")
    return typeof e["fantasy-land/equals"] == "function" && e["fantasy-land/equals"](t) && typeof t["fantasy-land/equals"] == "function" && t["fantasy-land/equals"](e);
  if (typeof e.equals == "function" || typeof t.equals == "function")
    return typeof e.equals == "function" && e.equals(t) && typeof t.equals == "function" && t.equals(e);
  switch (n) {
    case "Arguments":
    case "Array":
    case "Object":
      if (typeof e.constructor == "function" && bn(e.constructor) === "Promise")
        return e === t;
      break;
    case "Boolean":
    case "Number":
    case "String":
      if (!(typeof e == typeof t && $e(e.valueOf(), t.valueOf())))
        return !1;
      break;
    case "Date":
      if (!$e(e.valueOf(), t.valueOf()))
        return !1;
      break;
    case "Error":
      return e.name === t.name && e.message === t.message;
    case "RegExp":
      if (!(e.source === t.source && e.global === t.global && e.ignoreCase === t.ignoreCase && e.multiline === t.multiline && e.sticky === t.sticky && e.unicode === t.unicode))
        return !1;
      break;
  }
  for (var a = o.length - 1; a >= 0; ) {
    if (o[a] === e)
      return r[a] === t;
    a -= 1;
  }
  switch (n) {
    case "Map":
      return e.size !== t.size ? !1 : co(e.entries(), t.entries(), o.concat([e]), r.concat([t]));
    case "Set":
      return e.size !== t.size ? !1 : co(e.values(), t.values(), o.concat([e]), r.concat([t]));
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
      return !1;
  }
  var i = St(e);
  if (i.length !== St(t).length)
    return !1;
  var s = o.concat([e]), l = r.concat([t]);
  for (a = i.length - 1; a >= 0; ) {
    var c = i[a];
    if (!(ie(c, t) && Ge(t[c], e[c], s, l)))
      return !1;
    a -= 1;
  }
  return !0;
}
var wn = /* @__PURE__ */ F(function(t, o) {
  return Ge(t, o, [], []);
});
const he = wn;
function _n(e, t, o) {
  var r, n;
  if (typeof e.indexOf == "function")
    switch (typeof t) {
      case "number":
        if (t === 0) {
          for (r = 1 / t; o < e.length; ) {
            if (n = e[o], n === 0 && 1 / n === r)
              return o;
            o += 1;
          }
          return -1;
        } else if (t !== t) {
          for (; o < e.length; ) {
            if (n = e[o], typeof n == "number" && n !== n)
              return o;
            o += 1;
          }
          return -1;
        }
        return e.indexOf(t, o);
      case "string":
      case "boolean":
      case "function":
      case "undefined":
        return e.indexOf(t, o);
      case "object":
        if (t === null)
          return e.indexOf(t, o);
    }
  for (; o < e.length; ) {
    if (he(e[o], t))
      return o;
    o += 1;
  }
  return -1;
}
function xn(e, t) {
  return _n(t, e, 0) >= 0;
}
function Se(e) {
  var t = e.replace(/\\/g, "\\\\").replace(/[\b]/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\v/g, "\\v").replace(/\0/g, "\\0");
  return '"' + t.replace(/"/g, '\\"') + '"';
}
var Et = function(t) {
  return (t < 10 ? "0" : "") + t;
}, $n = typeof Date.prototype.toISOString == "function" ? function(t) {
  return t.toISOString();
} : function(t) {
  return t.getUTCFullYear() + "-" + Et(t.getUTCMonth() + 1) + "-" + Et(t.getUTCDate()) + "T" + Et(t.getUTCHours()) + ":" + Et(t.getUTCMinutes()) + ":" + Et(t.getUTCSeconds()) + "." + (t.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z";
};
const Sn = $n;
function Pn(e) {
  return function() {
    return !e.apply(this, arguments);
  };
}
function On(e, t) {
  for (var o = 0, r = t.length, n = []; o < r; )
    e(t[o]) && (n[n.length] = t[o]), o += 1;
  return n;
}
function Co(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
var Tn = /* @__PURE__ */ function() {
  function e(t, o) {
    this.xf = o, this.f = t;
  }
  return e.prototype["@@transducer/init"] = Yt.init, e.prototype["@@transducer/result"] = Yt.result, e.prototype["@@transducer/step"] = function(t, o) {
    return this.f(o) ? this.xf["@@transducer/step"](t, o) : t;
  }, e;
}(), zn = /* @__PURE__ */ F(function(t, o) {
  return new Tn(t, o);
});
const kn = zn;
var An = /* @__PURE__ */ F(
  /* @__PURE__ */ Ne(["fantasy-land/filter", "filter"], kn, function(e, t) {
    return Co(t) ? Ee(function(o, r) {
      return e(t[r]) && (o[r] = t[r]), o;
    }, {}, St(t)) : On(e, t);
  })
);
const Mo = An;
var In = /* @__PURE__ */ F(function(t, o) {
  return Mo(Pn(t), o);
});
const jn = In;
function Lo(e, t) {
  var o = function(i) {
    var s = t.concat([e]);
    return xn(i, s) ? "<Circular>" : Lo(i, s);
  }, r = function(a, i) {
    return ae(function(s) {
      return Se(s) + ": " + o(a[s]);
    }, i.slice().sort());
  };
  switch (Object.prototype.toString.call(e)) {
    case "[object Arguments]":
      return "(function() { return arguments; }(" + ae(o, e).join(", ") + "))";
    case "[object Array]":
      return "[" + ae(o, e).concat(r(e, jn(function(a) {
        return /^\d+$/.test(a);
      }, St(e)))).join(", ") + "]";
    case "[object Boolean]":
      return typeof e == "object" ? "new Boolean(" + o(e.valueOf()) + ")" : e.toString();
    case "[object Date]":
      return "new Date(" + (isNaN(e.valueOf()) ? o(NaN) : Se(Sn(e))) + ")";
    case "[object Null]":
      return "null";
    case "[object Number]":
      return typeof e == "object" ? "new Number(" + o(e.valueOf()) + ")" : 1 / e === -1 / 0 ? "-0" : e.toString(10);
    case "[object String]":
      return typeof e == "object" ? "new String(" + o(e.valueOf()) + ")" : Se(e);
    case "[object Undefined]":
      return "undefined";
    default:
      if (typeof e.toString == "function") {
        var n = e.toString();
        if (n !== "[object Object]")
          return n;
      }
      return "{" + r(e, St(e)).join(", ") + "}";
  }
}
var Cn = /* @__PURE__ */ q(function(t) {
  return Lo(t, []);
});
const Mn = Cn;
var Ln = /* @__PURE__ */ zt(function(t, o, r) {
  var n = t(o), a = t(r);
  return n > a ? -1 : n < a ? 1 : 0;
});
const Do = Ln;
function Dn(e) {
  var t = Object.prototype.toString.call(e);
  return t === "[object Uint8ClampedArray]" || t === "[object Int8Array]" || t === "[object Uint8Array]" || t === "[object Int16Array]" || t === "[object Uint16Array]" || t === "[object Int32Array]" || t === "[object Uint32Array]" || t === "[object Float32Array]" || t === "[object Float64Array]" || t === "[object BigInt64Array]" || t === "[object BigUint64Array]";
}
var Nn = /* @__PURE__ */ q(function(t) {
  return t != null && typeof t["fantasy-land/empty"] == "function" ? t["fantasy-land/empty"]() : t != null && t.constructor != null && typeof t.constructor["fantasy-land/empty"] == "function" ? t.constructor["fantasy-land/empty"]() : t != null && typeof t.empty == "function" ? t.empty() : t != null && t.constructor != null && typeof t.constructor.empty == "function" ? t.constructor.empty() : ge(t) ? [] : me(t) ? "" : Co(t) ? {} : zo(t) ? function() {
    return arguments;
  }() : Dn(t) ? t.constructor.from("") : void 0;
});
const En = Nn;
var Rn = /* @__PURE__ */ function() {
  function e(t, o) {
    this.xf = o, this.f = t, this.idx = -1, this.found = !1;
  }
  return e.prototype["@@transducer/init"] = Yt.init, e.prototype["@@transducer/result"] = function(t) {
    return this.found || (t = this.xf["@@transducer/step"](t, -1)), this.xf["@@transducer/result"](t);
  }, e.prototype["@@transducer/step"] = function(t, o) {
    return this.idx += 1, this.f(o) && (this.found = !0, t = jr(this.xf["@@transducer/step"](t, this.idx))), t;
  }, e;
}(), Gn = /* @__PURE__ */ F(function(t, o) {
  return new Rn(t, o);
});
const Fn = Gn;
var Vn = /* @__PURE__ */ F(
  /* @__PURE__ */ Ne([], Fn, function(t, o) {
    for (var r = 0, n = o.length; r < n; ) {
      if (t(o[r]))
        return r;
      r += 1;
    }
    return -1;
  })
);
const Hn = Vn;
var Bn = /* @__PURE__ */ zt(function(t, o, r) {
  return fe(Math.max(t.length, o.length, r.length), function() {
    return t.apply(this, arguments) ? o.apply(this, arguments) : r.apply(this, arguments);
  });
});
const Yn = Bn;
var Un = /* @__PURE__ */ F(function(t, o) {
  return fe(t + 1, function() {
    var r = arguments[t];
    if (r != null && sn(r[o]))
      return r[o].apply(r, Array.prototype.slice.call(arguments, 0, t));
    throw new TypeError(Mn(r) + ' does not have a method named "' + o + '"');
  });
});
const Wn = Un;
var Kn = /* @__PURE__ */ q(function(t) {
  return t != null && he(t, En(t));
});
const qn = Kn;
var Zn = /* @__PURE__ */ F(function(t, o) {
  return t.map(function(r) {
    for (var n = o, a = 0, i; a < r.length; ) {
      if (n == null)
        return;
      i = r[a], n = ko(i) ? Re(i, n) : n[i], a += 1;
    }
    return n;
  });
});
const Xn = Zn;
var Jn = /* @__PURE__ */ F(function(t, o) {
  return Xn([t], o)[0];
});
const Qn = Jn;
var ta = /* @__PURE__ */ F(function(t, o) {
  for (var r = {}, n = {}, a = 0, i = t.length; a < i; )
    n[t[a]] = 1, a += 1;
  for (var s in o)
    n.hasOwnProperty(s) || (r[s] = o[s]);
  return r;
});
const ea = ta;
var oa = /* @__PURE__ */ F(function(t, o) {
  for (var r = {}, n = 0; n < t.length; )
    t[n] in o && (r[t[n]] = o[t[n]]), n += 1;
  return r;
});
const ra = oa;
var na = /* @__PURE__ */ zt(function(t, o, r) {
  return he(o, qt(t, r));
});
const aa = na;
var ia = /* @__PURE__ */ zt(function(t, o, r) {
  return t(qt(o, r));
});
const sa = ia;
var la = /* @__PURE__ */ F(function(t, o) {
  return Array.prototype.slice.call(o, 0).sort(t);
});
const ca = la;
var ua = /* @__PURE__ */ F(function(t, o) {
  return Array.prototype.slice.call(o, 0).sort(function(r, n) {
    for (var a = 0, i = 0; a === 0 && i < t.length; )
      a = t[i](r, n), i += 1;
    return a;
  });
});
const da = ua;
var pa = /* @__PURE__ */ Wn(1, "split");
const No = pa;
var Rt = `	
\v\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF`, fa = "\u200B", ga = typeof String.prototype.trim == "function", ma = /* @__PURE__ */ q(!ga || /* @__PURE__ */ Rt.trim() || !/* @__PURE__ */ fa.trim() ? function(t) {
  var o = new RegExp("^[" + Rt + "][" + Rt + "]*"), r = new RegExp("[" + Rt + "][" + Rt + "]*$");
  return t.replace(o, "").replace(r, "");
} : function(t) {
  return t.trim();
});
const Eo = ma;
var Ro = { exports: {} };
(function(e, t) {
  (function(o, r) {
    e.exports = r();
  })(Tt, function() {
    var o = "minute", r = /[+-]\d\d(?::?\d\d)?/g, n = /([+-]|\d\d)/g;
    return function(a, i, s) {
      var l = i.prototype;
      s.utc = function(u) {
        var v = { date: u, utc: !0, args: arguments };
        return new i(v);
      }, l.utc = function(u) {
        var v = s(this.toDate(), { locale: this.$L, utc: !0 });
        return u ? v.add(this.utcOffset(), o) : v;
      }, l.local = function() {
        return s(this.toDate(), { locale: this.$L, utc: !1 });
      };
      var c = l.parse;
      l.parse = function(u) {
        u.utc && (this.$u = !0), this.$utils().u(u.$offset) || (this.$offset = u.$offset), c.call(this, u);
      };
      var f = l.init;
      l.init = function() {
        if (this.$u) {
          var u = this.$d;
          this.$y = u.getUTCFullYear(), this.$M = u.getUTCMonth(), this.$D = u.getUTCDate(), this.$W = u.getUTCDay(), this.$H = u.getUTCHours(), this.$m = u.getUTCMinutes(), this.$s = u.getUTCSeconds(), this.$ms = u.getUTCMilliseconds();
        } else
          f.call(this);
      };
      var p = l.utcOffset;
      l.utcOffset = function(u, v) {
        var S = this.$utils().u;
        if (S(u))
          return this.$u ? 0 : S(this.$offset) ? p.call(this) : this.$offset;
        if (typeof u == "string" && (u = function(E) {
          E === void 0 && (E = "");
          var V = E.match(r);
          if (!V)
            return null;
          var Y = ("" + V[0]).match(n) || ["-", 0, 0], B = Y[0], M = 60 * +Y[1] + +Y[2];
          return M === 0 ? 0 : B === "+" ? M : -M;
        }(u), u === null))
          return this;
        var O = Math.abs(u) <= 16 ? 60 * u : u, P = this;
        if (v)
          return P.$offset = O, P.$u = u === 0, P;
        if (u !== 0) {
          var C = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
          (P = this.local().add(O + C, o)).$offset = O, P.$x.$localOffset = C;
        } else
          P = this.utc();
        return P;
      };
      var m = l.format;
      l.format = function(u) {
        var v = u || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
        return m.call(this, v);
      }, l.valueOf = function() {
        var u = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
        return this.$d.valueOf() - 6e4 * u;
      }, l.isUTC = function() {
        return !!this.$u;
      }, l.toISOString = function() {
        return this.toDate().toISOString();
      }, l.toString = function() {
        return this.toDate().toUTCString();
      };
      var g = l.toDate;
      l.toDate = function(u) {
        return u === "s" && this.$offset ? s(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : g.call(this);
      };
      var h = l.diff;
      l.diff = function(u, v, S) {
        if (u && this.$u === u.$u)
          return h.call(this, u, v, S);
        var O = this.local(), P = s(u).local();
        return h.call(O, P, v, S);
      };
    };
  });
})(Ro);
const ha = Ro.exports;
var Go = { exports: {} };
(function(e, t) {
  (function(o, r) {
    e.exports = r();
  })(Tt, function() {
    var o = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, r = {};
    return function(n, a, i) {
      var s, l = function(m, g, h) {
        h === void 0 && (h = {});
        var u = new Date(m), v = function(S, O) {
          O === void 0 && (O = {});
          var P = O.timeZoneName || "short", C = S + "|" + P, E = r[C];
          return E || (E = new Intl.DateTimeFormat("en-US", { hour12: !1, timeZone: S, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: P }), r[C] = E), E;
        }(g, h);
        return v.formatToParts(u);
      }, c = function(m, g) {
        for (var h = l(m, g), u = [], v = 0; v < h.length; v += 1) {
          var S = h[v], O = S.type, P = S.value, C = o[O];
          C >= 0 && (u[C] = parseInt(P, 10));
        }
        var E = u[3], V = E === 24 ? 0 : E, Y = u[0] + "-" + u[1] + "-" + u[2] + " " + V + ":" + u[4] + ":" + u[5] + ":000", B = +m;
        return (i.utc(Y).valueOf() - (B -= B % 1e3)) / 6e4;
      }, f = a.prototype;
      f.tz = function(m, g) {
        m === void 0 && (m = s);
        var h = this.utcOffset(), u = this.toDate(), v = u.toLocaleString("en-US", { timeZone: m }), S = Math.round((u - new Date(v)) / 1e3 / 60), O = i(v).$set("millisecond", this.$ms).utcOffset(15 * -Math.round(u.getTimezoneOffset() / 15) - S, !0);
        if (g) {
          var P = O.utcOffset();
          O = O.add(h - P, "minute");
        }
        return O.$x.$timezone = m, O;
      }, f.offsetName = function(m) {
        var g = this.$x.$timezone || i.tz.guess(), h = l(this.valueOf(), g, { timeZoneName: m }).find(function(u) {
          return u.type.toLowerCase() === "timezonename";
        });
        return h && h.value;
      };
      var p = f.startOf;
      f.startOf = function(m, g) {
        if (!this.$x || !this.$x.$timezone)
          return p.call(this, m, g);
        var h = i(this.format("YYYY-MM-DD HH:mm:ss:SSS"));
        return p.call(h, m, g).tz(this.$x.$timezone, !0);
      }, i.tz = function(m, g, h) {
        var u = h && g, v = h || g || s, S = c(+i(), v);
        if (typeof m != "string")
          return i(m).tz(v);
        var O = function(V, Y, B) {
          var M = V - 60 * Y * 1e3, j = c(M, B);
          if (Y === j)
            return [M, Y];
          var tt = c(M -= 60 * (j - Y) * 1e3, B);
          return j === tt ? [M, j] : [V - 60 * Math.min(j, tt) * 1e3, Math.max(j, tt)];
        }(i.utc(m, u).valueOf(), S, v), P = O[0], C = O[1], E = i(P).utcOffset(C);
        return E.$x.$timezone = v, E;
      }, i.tz.guess = function() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      }, i.tz.setDefault = function(m) {
        s = m;
      };
    };
  });
})(Go);
const va = Go.exports;
var Fo = { exports: {} };
(function(e, t) {
  (function(o, r) {
    e.exports = r();
  })(Tt, function() {
    return function(o, r, n) {
      var a = r.prototype, i = a.format;
      n.en.ordinal = function(s) {
        var l = ["th", "st", "nd", "rd"], c = s % 100;
        return "[" + s + (l[(c - 20) % 10] || l[c] || l[0]) + "]";
      }, a.format = function(s) {
        var l = this, c = this.$locale();
        if (!this.isValid())
          return i.bind(this)(s);
        var f = this.$utils(), p = (s || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function(m) {
          switch (m) {
            case "Q":
              return Math.ceil((l.$M + 1) / 3);
            case "Do":
              return c.ordinal(l.$D);
            case "gggg":
              return l.weekYear();
            case "GGGG":
              return l.isoWeekYear();
            case "wo":
              return c.ordinal(l.week(), "W");
            case "w":
            case "ww":
              return f.s(l.week(), m === "w" ? 1 : 2, "0");
            case "W":
            case "WW":
              return f.s(l.isoWeek(), m === "W" ? 1 : 2, "0");
            case "k":
            case "kk":
              return f.s(String(l.$H === 0 ? 24 : l.$H), m === "k" ? 1 : 2, "0");
            case "X":
              return Math.floor(l.$d.getTime() / 1e3);
            case "x":
              return l.$d.getTime();
            case "z":
              return "[" + l.offsetName() + "]";
            case "zzz":
              return "[" + l.offsetName("long") + "]";
            default:
              return m;
          }
        });
        return i.bind(this)(p);
      };
    };
  });
})(Fo);
const ba = Fo.exports;
var Vo = { exports: {} };
(function(e, t) {
  (function(o, r) {
    e.exports = r();
  })(Tt, function() {
    return function(o, r) {
      r.prototype.isSameOrBefore = function(n, a) {
        return this.isSame(n, a) || this.isBefore(n, a);
      };
    };
  });
})(Vo);
const ya = Vo.exports;
var Ho = { exports: {} };
(function(e, t) {
  (function(o, r) {
    e.exports = r();
  })(Tt, function() {
    var o = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" };
    return function(r, n, a) {
      var i = n.prototype, s = i.format;
      a.en.formats = o, i.format = function(l) {
        l === void 0 && (l = "YYYY-MM-DDTHH:mm:ssZ");
        var c = this.$locale().formats, f = function(p, m) {
          return p.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(g, h, u) {
            var v = u && u.toUpperCase();
            return h || m[u] || o[u] || m[v].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(S, O, P) {
              return O || P.slice(1);
            });
          });
        }(l, c === void 0 ? {} : c);
        return s.call(this, f);
      };
    };
  });
})(Ho);
const wa = Ho.exports;
var _a = { exports: {} };
(function(e, t) {
  (function(o, r) {
    e.exports = r(De.exports);
  })(Tt, function(o) {
    function r(i) {
      return i && typeof i == "object" && "default" in i ? i : { default: i };
    }
    var n = r(o), a = { name: "hu", weekdays: "vas\xE1rnap_h\xE9tf\u0151_kedd_szerda_cs\xFCt\xF6rt\xF6k_p\xE9ntek_szombat".split("_"), weekdaysShort: "vas_h\xE9t_kedd_sze_cs\xFCt_p\xE9n_szo".split("_"), weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"), months: "janu\xE1r_febru\xE1r_m\xE1rcius_\xE1prilis_m\xE1jus_j\xFAnius_j\xFAlius_augusztus_szeptember_okt\xF3ber_november_december".split("_"), monthsShort: "jan_feb_m\xE1rc_\xE1pr_m\xE1j_j\xFAn_j\xFAl_aug_szept_okt_nov_dec".split("_"), ordinal: function(i) {
      return i + ".";
    }, weekStart: 1, relativeTime: { future: "%s m\xFAlva", past: "%s", s: function(i, s, l, c) {
      return "n\xE9h\xE1ny m\xE1sodperc" + (c || s ? "" : "e");
    }, m: function(i, s, l, c) {
      return "egy perc" + (c || s ? "" : "e");
    }, mm: function(i, s, l, c) {
      return i + " perc" + (c || s ? "" : "e");
    }, h: function(i, s, l, c) {
      return "egy " + (c || s ? "\xF3ra" : "\xF3r\xE1ja");
    }, hh: function(i, s, l, c) {
      return i + " " + (c || s ? "\xF3ra" : "\xF3r\xE1ja");
    }, d: function(i, s, l, c) {
      return "egy " + (c || s ? "nap" : "napja");
    }, dd: function(i, s, l, c) {
      return i + " " + (c || s ? "nap" : "napja");
    }, M: function(i, s, l, c) {
      return "egy " + (c || s ? "h\xF3nap" : "h\xF3napja");
    }, MM: function(i, s, l, c) {
      return i + " " + (c || s ? "h\xF3nap" : "h\xF3napja");
    }, y: function(i, s, l, c) {
      return "egy " + (c || s ? "\xE9v" : "\xE9ve");
    }, yy: function(i, s, l, c) {
      return i + " " + (c || s ? "\xE9v" : "\xE9ve");
    } }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "YYYY.MM.DD.", LL: "YYYY. MMMM D.", LLL: "YYYY. MMMM D. H:mm", LLLL: "YYYY. MMMM D., dddd H:mm" } };
    return n.default.locale(a, null, !0), a;
  });
})(_a);
const xa = "https://www.jegkorongszovetseg.hu/event/game/", $a = "https://jegkorongszovetseg.hu/assets/images/player_blank.png", vt = "original", w = "descend", Z = "ascend", Sa = (/* @__PURE__ */ new Map()).set("hu", "hu-hu").set("en", "hu-gb"), Pa = (/* @__PURE__ */ new Map()).set("Europe/Budapest", { countryLabelKey: "hungary", timezone: "Europe/Budapest" }).set("Europe/Bucharest", { countryLabelKey: "romania", timezone: "Europe/Bucharest" }), Oa = "/v1/playersGoaliePeriod", Ta = "/v1/playersGoalieUnderPeriod";
it.extend(ha);
it.extend(va);
it.extend(ba);
it.extend(wa);
it.extend(ya);
const uo = (e = "", t = "", o = "", r = "hu") => (o = o || it.tz.guess(), it(e).isValid() ? it(e).tz(o).locale(r).format(t) : ""), Ft = (e = "", t = "", o = "hu") => {
  if (!it(e).isValid())
    return "";
  t = t || it.tz.guess();
  const n = new Intl.DateTimeFormat(za(o), {
    timeZone: t,
    timeZoneName: "short"
  }).formatToParts(new Date(e)).find((a) => a.type === "timeZoneName");
  return n && n.value;
}, za = (e) => Sa.get(e), ka = (e) => {
  const t = e.split(":");
  return parseInt(t[0], 10) * 60 + parseInt(t[1], 10);
}, Aa = (e, t = "day") => it().isSameOrBefore(it(e), t), Zt = ({ initial: e = 1, items: t = [], limit: o, auto: r = !1 }) => {
  const n = K(e), a = (l) => Aa(l, "day");
  return Bt(t, () => {
    if (!r)
      return;
    const l = Hn(sa(a, "gameDate"))(d(t));
    n.value = Math.floor(l / o) + 1;
  }), {
    page: n,
    change: (l) => {
      n.value = l;
    }
  };
}, kt = (e = []) => ({
  result: [...e],
  filteredRowsLength: 0,
  value() {
    return {
      rows: this.result,
      totalItems: this.filteredRowsLength ? this.filteredRowsLength : e.length
    };
  },
  teamFilter(t, o = []) {
    if (t) {
      const r = o.map((a) => aa(a, t)), n = Mo(rn([...r]), this.result);
      this.filteredRowsLength = n.length, this.result = n;
    }
    return this;
  },
  sorted(t) {
    if (!t.sortTarget)
      return this;
    if (t.orders[0].direction === vt)
      return this;
    const o = Yn(he(Z), no(an), no(Do));
    return this.result = da(t.orders.map((r) => jo(o(r.direction), qt)(r.target)))(this.result), this;
  },
  addIndex(t = null) {
    return this.result.reduce((o, r, n) => {
      const a = o[o.length - 1] || [], i = t && a[t] === r[t];
      return r.index = i ? a.index : n + 1, r.indexClass = i ? "is-duplicated" : null, o.push(r), o;
    }, []), this;
  },
  addContinuousIndex() {
    return this.result = this.result.map((t, o) => ({
      ...t,
      index: o + 1
    })), this;
  },
  pagination(t, o) {
    t = Number(t), o = Number(o);
    const r = (t - 1) * o, n = r + o;
    return this.result = this.result.slice(r, n), this;
  },
  playerName() {
    return this.result = this.result.map((t) => ({
      ...t,
      name: `${t.lastName} ${t.firstName}`
    })), this;
  },
  schedule(t = "", o = "hu") {
    return this.result = this.result.map((r) => ({
      ...r,
      gameResult: `${r.homeTeamScore}-${r.awayTeamScore}`,
      gameDateDate: uo(r.gameDate, "L dddd", t, o),
      gameDateTime: uo(r.gameDate, "HH:mm", t, o)
    })), this;
  },
  convertTimes(t = []) {
    return this.result = this.result.map((o) => (t.map((r) => o[`${r}Sec`] = ka(o[r])), o)), this;
  }
}), Bo = Symbol("I18nContext"), rt = Me({
  messages: {},
  locale: "",
  fallbackLocale: ""
}), Ia = ({ messages: e = {}, locale: t = "", fallbackLocale: o = "" }) => {
  rt.messages = e, rt.locale = t, rt.fallbackLocale = o;
  const r = (l, c = {}) => {
    const f = !qn(c), p = Kt(Eo, No(".", l));
    return D(() => {
      let g = n(rt.locale, p, rt.messages);
      return !g && rt.fallbackLocale && (g = n(rt.fallbackLocale, p, rt.messages)), f ? Ca(g, c) : g;
    }).value;
  };
  function n(l, c, f) {
    return Qn([l, ...c], f);
  }
  const a = (l) => {
    rt.locale = l;
  }, s = {
    locale: D({
      get() {
        return rt.locale;
      },
      set(l) {
        rt.locale = l;
      }
    }),
    setLocale: a,
    translate: r
  };
  ar(Bo, s);
}, ve = (e) => {
  e && (rt.messages = e.messages, rt.locale = e.locale, rt.fallbackLocale = e.fallbackLocale);
  const t = ja();
  return {
    locale: t.locale,
    t: t.translate,
    setLocale: t.setLocale
  };
}, ja = () => {
  const e = ir(Bo, null);
  if (e === null)
    throw new Error("Privider is missing a parent component.");
  return e;
}, Ca = function(e, t) {
  return e.replace(/\{(\w+)\}/g, function(o, r) {
    return t[r];
  });
}, Fe = (e, t = "", o = {}) => {
  const r = K(""), { t: n } = ve();
  if (t)
    try {
      const s = Ma(d(e), t);
      e = ea(s, d(e));
    } catch (s) {
      r.value = n("errors.undefinedColumn", { column: s });
    }
  const a = (s) => {
    var l, c;
    return {
      ...s,
      ...s.label && { label: n((l = s.label) != null ? l : "", o) },
      ...s.tooltip && { tooltip: n((c = s.tooltip) != null ? c : "") }
    };
  };
  return {
    columns: D(() => Kt(a, d(e))),
    error: r
  };
}, Ma = (e, t = "") => {
  const o = Kt(Eo, No(",", t)), r = St(e);
  if (o[0] === "")
    return resolve([]);
  const n = o.findIndex((a) => !r.includes(a));
  if (n > -1)
    throw o[n];
  return o;
}, La = {
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
}, Da = {
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
    sortOrders: [{ target: "teamName", direction: Z }]
  },
  m: {
    label: "table.game.short",
    tooltip: "table.game.tooltip",
    sortOrders: [{ target: "m", direction: w }]
  },
  p3: {
    label: "table.wins.short",
    tooltip: "table.wins.tooltip",
    sortOrders: [
      { target: "p3", direction: w },
      { target: "p2", direction: w }
    ]
  },
  p2: {
    label: "table.otw.short",
    tooltip: "table.otw.tooltip",
    sortOrders: [{ target: "p2", direction: w }]
  },
  p1: {
    label: "table.otl.short",
    tooltip: "table.otl.tooltip",
    sortOrders: [{ target: "p1", direction: Z }]
  },
  p0: {
    label: "table.losses.short",
    tooltip: "table.losses.tooltip",
    sortOrders: [{ target: "p0", direction: Z }]
  },
  plus: {
    label: "table.goalFor.short",
    tooltip: "table.goalFor.tooltip",
    sortOrders: [{ target: "plus", direction: w }]
  },
  minus: {
    label: "table.goalAgainst.short",
    tooltip: "table.goalAgainst.tooltip",
    sortOrders: [{ target: "minus", direction: Z }]
  },
  gk: {
    label: "table.goalDiff.short",
    tooltip: "table.goalDiff.tooltip",
    sortOrders: [{ target: "gk", direction: w }]
  },
  p: {
    label: "table.points.short",
    tooltip: "table.points.tooltip",
    class: "is-text-bold",
    sortOrders: [{ target: "p", direction: w }]
  }
}, Na = {
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
    sortOrders: [{ target: "teamName", direction: Z }]
  },
  m: {
    label: "table.game.short",
    tooltip: "table.game.tooltip",
    sortOrders: [{ target: "m", direction: w }]
  },
  p2: {
    label: "table.wins.short",
    tooltip: "table.wins.tooltip",
    sortOrders: [
      { target: "p2", direction: w },
      { target: "p1", direction: w }
    ]
  },
  p1: {
    label: "table.draw.short",
    tooltip: "table.draw.tooltip",
    sortOrders: [
      { target: "p1", direction: w },
      { target: "p2", direction: w }
    ]
  },
  p0: {
    label: "table.losses.short",
    tooltip: "table.losses.tooltip",
    sortOrders: [{ target: "p0", direction: Z }]
  },
  plus: {
    label: "table.goalFor.short",
    tooltip: "table.goalFor.tooltip",
    sortOrders: [{ target: "plus", direction: w }]
  },
  minus: {
    label: "table.goalAgainst.short",
    tooltip: "table.goalAgainst.tooltip",
    sortOrders: [{ target: "minus", direction: Z }]
  },
  gk: {
    label: "table.goalDiff.short",
    tooltip: "table.goalDiff.tooltip",
    sortOrders: [{ target: "gk", direction: w }]
  },
  p: {
    label: "table.points.short",
    tooltip: "table.points.tooltip",
    class: "is-text-bold",
    sortOrders: [{ target: "p", direction: w }]
  }
}, ke = {
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
    sortOrders: [{ target: "name", direction: Z }]
  },
  teamLogo: {
    label: "",
    class: "is-has-image"
  },
  teamName: {
    label: "table.team.short",
    tooltip: "table.team.tooltip",
    class: "is-text-left is-w-auto",
    sortOrders: [{ target: "teamName", direction: Z }]
  },
  gp: {
    label: "table.game.short",
    tooltip: "table.game.tooltip",
    sortOrders: [{ target: "gp", direction: w }]
  },
  g: {
    label: "table.goals.short",
    tooltip: "table.goals.tooltip",
    sortOrders: [
      { target: "g", direction: w },
      { target: "a", direction: w }
    ]
  },
  a: {
    label: "table.assists.short",
    tooltip: "table.assists.tooltip",
    sortOrders: [
      { target: "a", direction: w },
      { target: "g", direction: w }
    ]
  },
  point: {
    label: "table.points.short",
    tooltip: "table.points.tooltip",
    sortOrders: [{ target: "point", direction: w }]
  },
  plusMinus: {
    label: "table.plusMinus.short",
    tooltip: "table.plusMinus.tooltip",
    sortOrders: [{ target: "plusMinus", direction: w }]
  },
  shoot: {
    label: "table.sog.short",
    tooltip: "table.sog.tooltip",
    sortOrders: [{ target: "shoot", direction: w }]
  },
  shootPercent: {
    label: "table.sogPercent.short",
    tooltip: "table.sogPercent.tooltip",
    sortOrders: [{ target: "shootPercent", direction: w }]
  }
}, Yo = {
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
    sortOrders: [{ target: "name", direction: Z }]
  },
  teamLogo: {
    label: "",
    class: "is-has-image"
  },
  teamName: {
    label: "table.team.short",
    tooltip: "table.team.tooltip",
    class: "is-text-left is-w-auto",
    sortOrders: [{ target: "teamName", direction: Z }]
  },
  gp: {
    label: "table.game.short",
    tooltip: "table.game.tooltip",
    sortOrders: [{ target: "gp", direction: w }]
  },
  p2: {
    label: "table.minorPenalties.short",
    tooltip: "table.minorPenalties.tooltip",
    sortOrders: [
      { target: "p2", direction: w },
      { target: "pim", direction: w }
    ]
  },
  p5: {
    label: "table.majorPenalties.short",
    tooltip: "table.majorPenalties.tooltip",
    sortOrders: [
      { target: "p5", direction: w },
      { target: "pim", direction: w }
    ]
  },
  p10: {
    label: "table.misconducts.short",
    tooltip: "table.misconducts.tooltip",
    sortOrders: [
      { target: "p10", direction: w },
      { target: "pim", direction: w }
    ]
  },
  p20: {
    label: "table.gameMisconducts.short",
    tooltip: "table.gameMisconducts.tooltip",
    sortOrders: [
      { target: "p20", direction: w },
      { target: "pim", direction: w }
    ]
  },
  p25: {
    label: "table.matchPenalties.short",
    tooltip: "table.matchPenalties.tooltip",
    sortOrders: [
      { target: "p25", direction: w },
      { target: "pim", direction: w }
    ]
  },
  pim: {
    label: "table.pim.short",
    tooltip: "table.pim.tooltip",
    sortOrders: [{ target: "pim", direction: w }]
  }
}, Ae = {
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
    sortOrders: [{ target: "name", direction: Z }]
  },
  teamLogo: {
    label: "",
    class: "is-has-image"
  },
  teamName: {
    label: "table.team.short",
    tooltip: "table.team.tooltip",
    class: "is-text-left is-w-auto",
    sortOrders: [{ target: "teamName", direction: Z }]
  },
  gkd: {
    label: "table.gpgk.short",
    tooltip: "table.gpgk.tooltip",
    sortOrders: [{ target: "gkd", direction: w }]
  },
  gpi: {
    label: "table.gpi.short",
    tooltip: "table.gpi.tooltip",
    sortOrders: [{ target: "gpi", direction: w }]
  },
  mip: {
    label: "table.toi.short",
    tooltip: "table.toi.tooltip",
    sortOrders: [{ target: "mipSec", direction: w }]
  },
  mipPercent: {
    label: "table.toiPercent.short",
    tooltip: "table.toiPercent.tooltip",
    sortOrders: [{ target: "mipPercent", direction: w }]
  },
  ga: {
    label: "table.ga.short",
    tooltip: "table.ga.tooltip",
    sortOrders: [{ target: "ga", direction: w }]
  },
  gaa: {
    label: "table.gaa.short",
    tooltip: "table.gaa.tooltip",
    sortOrders: [{ target: "gaa", direction: w }]
  },
  sa: {
    label: "table.sa.short",
    tooltip: "table.sa.tooltip",
    sortOrders: [{ target: "sa", direction: w }]
  },
  svs: {
    label: "table.svs.short",
    tooltip: "table.svs.tooltip",
    sortOrders: [{ target: "svs", direction: w }]
  },
  svsPercent: {
    label: "table.svsPercent.short",
    tooltip: "table.svsPercent.tooltip",
    sortOrders: [{ target: "svsPercent", direction: w }]
  }
}, Ea = {
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
    class: "is-text-left is-w-auto",
    sortOrders: [{ target: "teamName", direction: Z }]
  },
  gp: {
    label: "table.game.short",
    tooltip: "table.game.tooltip",
    sortOrders: [{ target: "gp", direction: w }]
  },
  p2: {
    label: "table.minorPenalties.short",
    tooltip: "table.minorPenalties.tooltip",
    sortOrders: [
      { target: "p2", direction: w },
      { target: "pim", direction: w }
    ]
  },
  p5: {
    label: "table.majorPenalties.short",
    tooltip: "table.majorPenalties.tooltip",
    sortOrders: [
      { target: "p5", direction: w },
      { target: "pim", direction: w }
    ]
  },
  p10: {
    label: "table.misconducts.short",
    tooltip: "table.misconducts.tooltip",
    sortOrders: [
      { target: "p10", direction: w },
      { target: "pim", direction: w }
    ]
  },
  p20: {
    label: "table.gameMisconducts.short",
    tooltip: "table.gameMisconducts.tooltip",
    sortOrders: [
      { target: "p20", direction: w },
      { target: "pim", direction: w }
    ]
  },
  p25: {
    label: "table.matchPenalties.short",
    tooltip: "table.matchPenalties.tooltip",
    sortOrders: [
      { target: "p25", direction: w },
      { target: "pim", direction: w }
    ]
  },
  pimPerGame: {
    label: "table.pimPerGame.short",
    tooltip: "table.pimPerGame.tooltip",
    sortOrders: [{ target: "pimPerGame", direction: w }]
  },
  pim: {
    label: "table.pim.short",
    tooltip: "table.pim.tooltip",
    sortOrders: [{ target: "pim", direction: w }]
  }
}, Xt = (e) => "mjsz-vbr-" + e, Ve = {
  __name: "ResponsiveTable",
  setup(e) {
    const t = K(null), o = Xt("table-responsive");
    return (r, n) => (y(), $("div", {
      ref_key: "el",
      ref: t,
      class: nt(d(o))
    }, [
      dt(r.$slots, "default", { el: t.value })
    ], 2));
  }
}, Ra = ["src"], Ga = ["src", "title"], Ut = {
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
  setup(e) {
    const t = e, o = K({ src: t.src }), r = K({ src: t.defaultSrc }), { error: n, isReady: a } = $r(o);
    return (i, s) => (y(), $(at, null, [
      d(n) && r.value ? (y(), $("img", {
        key: 0,
        src: r.value.src,
        class: nt(["is-loaded", i.$attrs.class])
      }, null, 10, Ra)) : G("", !0),
      d(n) ? G("", !0) : (y(), $("img", {
        key: 1,
        src: o.value.src,
        class: nt([i.$attrs.class, { "is-loaded": d(a) }]),
        title: t.title
      }, null, 10, Ga))
    ], 64));
  }
}, Q = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [r, n] of t)
    o[r] = n;
  return o;
}, Fa = {}, Va = {
  "aria-hidden": "true",
  focusable: "false",
  "data-prefix": "fas",
  "data-icon": "sort",
  class: "svg-inline--fa fa-sort fa-w-10",
  role: "img",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 320 512"
}, Ha = /* @__PURE__ */ T("path", {
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
}, null, -1), Ba = [
  Ha
];
function Ya(e, t) {
  return y(), $("svg", Va, Ba);
}
const po = /* @__PURE__ */ Q(Fa, [["render", Ya]]), Ua = {}, Wa = {
  "aria-hidden": "true",
  focusable: "false",
  "data-prefix": "fas",
  "data-icon": "sort-down",
  class: "svg-inline--fa fa-sort-down fa-w-10",
  role: "img",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 320 512"
}, Ka = /* @__PURE__ */ T("path", {
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
}, null, -1), qa = [
  Ka
];
function Za(e, t) {
  return y(), $("svg", Wa, qa);
}
const Xa = /* @__PURE__ */ Q(Ua, [["render", Za]]), Ja = {}, Qa = {
  "aria-hidden": "true",
  focusable: "false",
  "data-prefix": "fas",
  "data-icon": "sort-up",
  class: "svg-inline--fa fa-sort-up fa-w-10",
  role: "img",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 320 512"
}, ti = /* @__PURE__ */ T("path", {
  fill: "currentColor",
  d: "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
}, null, -1), ei = [
  ti
];
function oi(e, t) {
  return y(), $("svg", Qa, ei);
}
const ri = /* @__PURE__ */ Q(Ja, [["render", oi]]);
function Jt(e) {
  return e.split("-")[0];
}
function be(e) {
  return e.split("-")[1];
}
function Qt(e) {
  return ["top", "bottom"].includes(Jt(e)) ? "x" : "y";
}
function He(e) {
  return e === "y" ? "height" : "width";
}
function fo(e, t, o) {
  let {
    reference: r,
    floating: n
  } = e;
  const a = r.x + r.width / 2 - n.width / 2, i = r.y + r.height / 2 - n.height / 2, s = Qt(t), l = He(s), c = r[l] / 2 - n[l] / 2, f = Jt(t), p = s === "x";
  let m;
  switch (f) {
    case "top":
      m = {
        x: a,
        y: r.y - n.height
      };
      break;
    case "bottom":
      m = {
        x: a,
        y: r.y + r.height
      };
      break;
    case "right":
      m = {
        x: r.x + r.width,
        y: i
      };
      break;
    case "left":
      m = {
        x: r.x - n.width,
        y: i
      };
      break;
    default:
      m = {
        x: r.x,
        y: r.y
      };
  }
  switch (be(t)) {
    case "start":
      m[s] -= c * (o && p ? -1 : 1);
      break;
    case "end":
      m[s] += c * (o && p ? -1 : 1);
      break;
  }
  return m;
}
const ni = async (e, t, o) => {
  const {
    placement: r = "bottom",
    strategy: n = "absolute",
    middleware: a = [],
    platform: i
  } = o, s = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let l = await i.getElementRects({
    reference: e,
    floating: t,
    strategy: n
  }), {
    x: c,
    y: f
  } = fo(l, r, s), p = r, m = {}, g = 0;
  for (let h = 0; h < a.length; h++) {
    const {
      name: u,
      fn: v
    } = a[h], {
      x: S,
      y: O,
      data: P,
      reset: C
    } = await v({
      x: c,
      y: f,
      initialPlacement: r,
      placement: p,
      strategy: n,
      middlewareData: m,
      rects: l,
      platform: i,
      elements: {
        reference: e,
        floating: t
      }
    });
    if (c = S != null ? S : c, f = O != null ? O : f, m = {
      ...m,
      [u]: {
        ...m[u],
        ...P
      }
    }, C && g <= 50) {
      g++, typeof C == "object" && (C.placement && (p = C.placement), C.rects && (l = C.rects === !0 ? await i.getElementRects({
        reference: e,
        floating: t,
        strategy: n
      }) : C.rects), {
        x: c,
        y: f
      } = fo(l, p, s)), h = -1;
      continue;
    }
  }
  return {
    x: c,
    y: f,
    placement: p,
    strategy: n,
    middlewareData: m
  };
};
function ai(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Uo(e) {
  return typeof e != "number" ? ai(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function se(e) {
  return {
    ...e,
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height
  };
}
async function Wo(e, t) {
  var o;
  t === void 0 && (t = {});
  const {
    x: r,
    y: n,
    platform: a,
    rects: i,
    elements: s,
    strategy: l
  } = e, {
    boundary: c = "clippingAncestors",
    rootBoundary: f = "viewport",
    elementContext: p = "floating",
    altBoundary: m = !1,
    padding: g = 0
  } = t, h = Uo(g), v = s[m ? p === "floating" ? "reference" : "floating" : p], S = se(await a.getClippingRect({
    element: (o = await (a.isElement == null ? void 0 : a.isElement(v))) == null || o ? v : v.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(s.floating)),
    boundary: c,
    rootBoundary: f,
    strategy: l
  })), O = se(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: p === "floating" ? {
      ...i.floating,
      x: r,
      y: n
    } : i.reference,
    offsetParent: await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(s.floating)),
    strategy: l
  }) : i[p]);
  return {
    top: S.top - O.top + h.top,
    bottom: O.bottom - S.bottom + h.bottom,
    left: S.left - O.left + h.left,
    right: O.right - S.right + h.right
  };
}
const ii = Math.min, si = Math.max;
function Ie(e, t, o) {
  return si(e, ii(t, o));
}
const go = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      element: o,
      padding: r = 0
    } = e != null ? e : {}, {
      x: n,
      y: a,
      placement: i,
      rects: s,
      platform: l
    } = t;
    if (o == null)
      return {};
    const c = Uo(r), f = {
      x: n,
      y: a
    }, p = Qt(i), m = be(i), g = He(p), h = await l.getDimensions(o), u = p === "y" ? "top" : "left", v = p === "y" ? "bottom" : "right", S = s.reference[g] + s.reference[p] - f[p] - s.floating[g], O = f[p] - s.reference[p], P = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(o));
    let C = P ? p === "y" ? P.clientHeight || 0 : P.clientWidth || 0 : 0;
    C === 0 && (C = s.floating[g]);
    const E = S / 2 - O / 2, V = c[u], Y = C - h[g] - c[v], B = C / 2 - h[g] / 2 + E, M = Ie(V, B, Y), st = (m === "start" ? c[u] : c[v]) > 0 && B !== M && s.reference[g] <= s.floating[g] ? B < V ? V - B : Y - B : 0;
    return {
      [p]: f[p] - st,
      data: {
        [p]: M,
        centerOffset: B - M
      }
    };
  }
}), li = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function le(e) {
  return e.replace(/left|right|bottom|top/g, (t) => li[t]);
}
function ci(e, t, o) {
  o === void 0 && (o = !1);
  const r = be(e), n = Qt(e), a = He(n);
  let i = n === "x" ? r === (o ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (i = le(i)), {
    main: i,
    cross: le(i)
  };
}
const ui = {
  start: "end",
  end: "start"
};
function mo(e) {
  return e.replace(/start|end/g, (t) => ui[t]);
}
function di(e) {
  const t = le(e);
  return [mo(e), t, mo(t)];
}
const pi = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var o;
      const {
        placement: r,
        middlewareData: n,
        rects: a,
        initialPlacement: i,
        platform: s,
        elements: l
      } = t, {
        mainAxis: c = !0,
        crossAxis: f = !0,
        fallbackPlacements: p,
        fallbackStrategy: m = "bestFit",
        flipAlignment: g = !0,
        ...h
      } = e, u = Jt(r), S = p || (u === i || !g ? [le(i)] : di(i)), O = [i, ...S], P = await Wo(t, h), C = [];
      let E = ((o = n.flip) == null ? void 0 : o.overflows) || [];
      if (c && C.push(P[u]), f) {
        const {
          main: M,
          cross: j
        } = ci(r, a, await (s.isRTL == null ? void 0 : s.isRTL(l.floating)));
        C.push(P[M], P[j]);
      }
      if (E = [...E, {
        placement: r,
        overflows: C
      }], !C.every((M) => M <= 0)) {
        var V, Y;
        const M = ((V = (Y = n.flip) == null ? void 0 : Y.index) != null ? V : 0) + 1, j = O[M];
        if (j)
          return {
            data: {
              index: M,
              overflows: E
            },
            reset: {
              placement: j
            }
          };
        let tt = "bottom";
        switch (m) {
          case "bestFit": {
            var B;
            const st = (B = E.map((z) => [z, z.overflows.filter((x) => x > 0).reduce((x, _) => x + _, 0)]).sort((z, x) => z[1] - x[1])[0]) == null ? void 0 : B[0].placement;
            st && (tt = st);
            break;
          }
          case "initialPlacement":
            tt = i;
            break;
        }
        if (r !== tt)
          return {
            reset: {
              placement: tt
            }
          };
      }
      return {};
    }
  };
};
async function fi(e, t) {
  const {
    placement: o,
    platform: r,
    elements: n
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(n.floating)), i = Jt(o), s = be(o), l = Qt(o) === "x", c = ["left", "top"].includes(i) ? -1 : 1, f = a && l ? -1 : 1, p = typeof t == "function" ? t(e) : t;
  let {
    mainAxis: m,
    crossAxis: g,
    alignmentAxis: h
  } = typeof p == "number" ? {
    mainAxis: p,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...p
  };
  return s && typeof h == "number" && (g = s === "end" ? h * -1 : h), l ? {
    x: g * f,
    y: m * c
  } : {
    x: m * c,
    y: g * f
  };
}
const gi = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      const {
        x: o,
        y: r
      } = t, n = await fi(t, e);
      return {
        x: o + n.x,
        y: r + n.y,
        data: n
      };
    }
  };
};
function mi(e) {
  return e === "x" ? "y" : "x";
}
const hi = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: o,
        y: r,
        placement: n
      } = t, {
        mainAxis: a = !0,
        crossAxis: i = !1,
        limiter: s = {
          fn: (v) => {
            let {
              x: S,
              y: O
            } = v;
            return {
              x: S,
              y: O
            };
          }
        },
        ...l
      } = e, c = {
        x: o,
        y: r
      }, f = await Wo(t, l), p = Qt(Jt(n)), m = mi(p);
      let g = c[p], h = c[m];
      if (a) {
        const v = p === "y" ? "top" : "left", S = p === "y" ? "bottom" : "right", O = g + f[v], P = g - f[S];
        g = Ie(O, g, P);
      }
      if (i) {
        const v = m === "y" ? "top" : "left", S = m === "y" ? "bottom" : "right", O = h + f[v], P = h - f[S];
        h = Ie(O, h, P);
      }
      const u = s.fn({
        ...t,
        [p]: g,
        [m]: h
      });
      return {
        ...u,
        data: {
          x: u.x - o,
          y: u.y - r
        }
      };
    }
  };
};
function Ko(e) {
  return e && e.document && e.location && e.alert && e.setInterval;
}
function gt(e) {
  if (e == null)
    return window;
  if (!Ko(e)) {
    const t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function yt(e) {
  return gt(e).getComputedStyle(e);
}
function pt(e) {
  return Ko(e) ? "" : e ? (e.nodeName || "").toLowerCase() : "";
}
function qo() {
  const e = navigator.userAgentData;
  return e != null && e.brands ? e.brands.map((t) => t.brand + "/" + t.version).join(" ") : navigator.userAgent;
}
function lt(e) {
  return e instanceof gt(e).HTMLElement;
}
function wt(e) {
  return e instanceof gt(e).Element;
}
function vi(e) {
  return e instanceof gt(e).Node;
}
function ce(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  const t = gt(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function ye(e) {
  const {
    overflow: t,
    overflowX: o,
    overflowY: r
  } = yt(e);
  return /auto|scroll|overlay|hidden/.test(t + r + o);
}
function bi(e) {
  return ["table", "td", "th"].includes(pt(e));
}
function Zo(e) {
  const t = /firefox/i.test(qo()), o = yt(e);
  return o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].includes(o.willChange) || t && o.willChange === "filter" || t && (o.filter ? o.filter !== "none" : !1);
}
function Xo() {
  return !/^((?!chrome|android).)*safari/i.test(qo());
}
const ho = Math.min, Ht = Math.max, ue = Math.round;
function ft(e, t, o) {
  var r, n, a, i;
  t === void 0 && (t = !1), o === void 0 && (o = !1);
  const s = e.getBoundingClientRect();
  let l = 1, c = 1;
  t && lt(e) && (l = e.offsetWidth > 0 && ue(s.width) / e.offsetWidth || 1, c = e.offsetHeight > 0 && ue(s.height) / e.offsetHeight || 1);
  const f = wt(e) ? gt(e) : window, p = !Xo() && o, m = (s.left + (p && (r = (n = f.visualViewport) == null ? void 0 : n.offsetLeft) != null ? r : 0)) / l, g = (s.top + (p && (a = (i = f.visualViewport) == null ? void 0 : i.offsetTop) != null ? a : 0)) / c, h = s.width / l, u = s.height / c;
  return {
    width: h,
    height: u,
    top: g,
    right: m + h,
    bottom: g + u,
    left: m,
    x: m,
    y: g
  };
}
function _t(e) {
  return ((vi(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function we(e) {
  return wt(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.pageXOffset,
    scrollTop: e.pageYOffset
  };
}
function Jo(e) {
  return ft(_t(e)).left + we(e).scrollLeft;
}
function yi(e) {
  const t = ft(e);
  return ue(t.width) !== e.offsetWidth || ue(t.height) !== e.offsetHeight;
}
function wi(e, t, o) {
  const r = lt(t), n = _t(t), a = ft(
    e,
    r && yi(t),
    o === "fixed"
  );
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const s = {
    x: 0,
    y: 0
  };
  if (r || !r && o !== "fixed")
    if ((pt(t) !== "body" || ye(n)) && (i = we(t)), lt(t)) {
      const l = ft(t, !0);
      s.x = l.x + t.clientLeft, s.y = l.y + t.clientTop;
    } else
      n && (s.x = Jo(n));
  return {
    x: a.left + i.scrollLeft - s.x,
    y: a.top + i.scrollTop - s.y,
    width: a.width,
    height: a.height
  };
}
function Qo(e) {
  return pt(e) === "html" ? e : e.assignedSlot || e.parentNode || (ce(e) ? e.host : null) || _t(e);
}
function vo(e) {
  return !lt(e) || yt(e).position === "fixed" ? null : e.offsetParent;
}
function _i(e) {
  let t = Qo(e);
  for (ce(t) && (t = t.host); lt(t) && !["html", "body"].includes(pt(t)); ) {
    if (Zo(t))
      return t;
    {
      const o = t.parentNode;
      t = ce(o) ? o.host : o;
    }
  }
  return null;
}
function je(e) {
  const t = gt(e);
  let o = vo(e);
  for (; o && bi(o) && yt(o).position === "static"; )
    o = vo(o);
  return o && (pt(o) === "html" || pt(o) === "body" && yt(o).position === "static" && !Zo(o)) ? t : o || _i(e) || t;
}
function bo(e) {
  if (lt(e))
    return {
      width: e.offsetWidth,
      height: e.offsetHeight
    };
  const t = ft(e);
  return {
    width: t.width,
    height: t.height
  };
}
function xi(e) {
  let {
    rect: t,
    offsetParent: o,
    strategy: r
  } = e;
  const n = lt(o), a = _t(o);
  if (o === a)
    return t;
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const s = {
    x: 0,
    y: 0
  };
  if ((n || !n && r !== "fixed") && ((pt(o) !== "body" || ye(a)) && (i = we(o)), lt(o))) {
    const l = ft(o, !0);
    s.x = l.x + o.clientLeft, s.y = l.y + o.clientTop;
  }
  return {
    ...t,
    x: t.x - i.scrollLeft + s.x,
    y: t.y - i.scrollTop + s.y
  };
}
function $i(e, t) {
  const o = gt(e), r = _t(e), n = o.visualViewport;
  let a = r.clientWidth, i = r.clientHeight, s = 0, l = 0;
  if (n) {
    a = n.width, i = n.height;
    const c = Xo();
    (c || !c && t === "fixed") && (s = n.offsetLeft, l = n.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: s,
    y: l
  };
}
function Si(e) {
  var t;
  const o = _t(e), r = we(e), n = (t = e.ownerDocument) == null ? void 0 : t.body, a = Ht(o.scrollWidth, o.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0), i = Ht(o.scrollHeight, o.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0);
  let s = -r.scrollLeft + Jo(e);
  const l = -r.scrollTop;
  return yt(n || o).direction === "rtl" && (s += Ht(o.clientWidth, n ? n.clientWidth : 0) - a), {
    width: a,
    height: i,
    x: s,
    y: l
  };
}
function tr(e) {
  const t = Qo(e);
  return ["html", "body", "#document"].includes(pt(t)) ? e.ownerDocument.body : lt(t) && ye(t) ? t : tr(t);
}
function de(e, t) {
  var o;
  t === void 0 && (t = []);
  const r = tr(e), n = r === ((o = e.ownerDocument) == null ? void 0 : o.body), a = gt(r), i = n ? [a].concat(a.visualViewport || [], ye(r) ? r : []) : r, s = t.concat(i);
  return n ? s : s.concat(de(i));
}
function Pi(e, t) {
  const o = t.getRootNode == null ? void 0 : t.getRootNode();
  if (e.contains(t))
    return !0;
  if (o && ce(o)) {
    let r = t;
    do {
      if (r && e === r)
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function Oi(e, t) {
  const o = ft(e, !1, t === "fixed"), r = o.top + e.clientTop, n = o.left + e.clientLeft;
  return {
    top: r,
    left: n,
    x: n,
    y: r,
    right: n + e.clientWidth,
    bottom: r + e.clientHeight,
    width: e.clientWidth,
    height: e.clientHeight
  };
}
function yo(e, t, o) {
  return t === "viewport" ? se($i(e, o)) : wt(t) ? Oi(t, o) : se(Si(_t(e)));
}
function Ti(e) {
  const t = de(e), r = ["absolute", "fixed"].includes(yt(e).position) && lt(e) ? je(e) : e;
  return wt(r) ? t.filter((n) => wt(n) && Pi(n, r) && pt(n) !== "body") : [];
}
function zi(e) {
  let {
    element: t,
    boundary: o,
    rootBoundary: r,
    strategy: n
  } = e;
  const i = [...o === "clippingAncestors" ? Ti(t) : [].concat(o), r], s = i[0], l = i.reduce((c, f) => {
    const p = yo(t, f, n);
    return c.top = Ht(p.top, c.top), c.right = ho(p.right, c.right), c.bottom = ho(p.bottom, c.bottom), c.left = Ht(p.left, c.left), c;
  }, yo(t, s, n));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
const ki = {
  getClippingRect: zi,
  convertOffsetParentRelativeRectToViewportRelativeRect: xi,
  isElement: wt,
  getDimensions: bo,
  getOffsetParent: je,
  getDocumentElement: _t,
  getElementRects: (e) => {
    let {
      reference: t,
      floating: o,
      strategy: r
    } = e;
    return {
      reference: wi(t, je(o), r),
      floating: {
        ...bo(o),
        x: 0,
        y: 0
      }
    };
  },
  getClientRects: (e) => Array.from(e.getClientRects()),
  isRTL: (e) => yt(e).direction === "rtl"
};
function Ai(e, t, o, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: n = !0,
    ancestorResize: a = !0,
    elementResize: i = !0,
    animationFrame: s = !1
  } = r, l = n && !s, c = a && !s, f = l || c ? [...wt(e) ? de(e) : [], ...de(t)] : [];
  f.forEach((u) => {
    l && u.addEventListener("scroll", o, {
      passive: !0
    }), c && u.addEventListener("resize", o);
  });
  let p = null;
  if (i) {
    let u = !0;
    p = new ResizeObserver(() => {
      u || o(), u = !1;
    }), wt(e) && !s && p.observe(e), p.observe(t);
  }
  let m, g = s ? ft(e) : null;
  s && h();
  function h() {
    const u = ft(e);
    g && (u.x !== g.x || u.y !== g.y || u.width !== g.width || u.height !== g.height) && o(), g = u, m = requestAnimationFrame(h);
  }
  return o(), () => {
    var u;
    f.forEach((v) => {
      l && v.removeEventListener("scroll", o), c && v.removeEventListener("resize", o);
    }), (u = p) == null || u.disconnect(), p = null, s && cancelAnimationFrame(m);
  };
}
const Ii = (e, t, o) => ni(e, t, {
  platform: ki,
  ...o
}), ji = (e, t = "body") => {
  if (!e)
    return;
  if (typeof t != "string") {
    t == null || t.append(e);
    return;
  }
  const o = document.querySelector(t);
  o == null || o.append(e);
};
function Ci({ middleware: e, placement: t = null, strategy: o, append: r, enabled: n }) {
  const a = K(null), i = K(null), s = K(null), l = K(null), c = K(null), f = K(null), p = K(null), m = K(o != null ? o : "absolute"), g = K(null), h = () => {
    !a.value || !i.value || Ii(a.value, i.value, {
      middleware: e,
      placement: t,
      strategy: o
    }).then((v) => {
      s.value = v.x, l.value = v.y, m.value = v.strategy, c.value = v.middlewareData.arrow.x, f.value = v.middlewareData.arrow.y, p.value = v.placement;
    });
  };
  Bt(
    () => ({
      reference: d(a),
      floating: d(i),
      append: d(r)
    }),
    ({ floating: v, append: S }) => {
      S && ji(v, S), h();
    },
    { flush: "post" }
  ), Bt(
    n,
    (v) => {
      if (!(!a.value || !i.value)) {
        if (!v)
          return u();
        g.value = Ai(a.value, i.value, h, {});
      }
    },
    { flush: "post" }
  );
  const u = () => {
    var v;
    (v = g.value) == null || v.call(g), g.value = null;
  };
  return {
    x: s,
    y: l,
    arrowX: c,
    arrowY: f,
    placement: p,
    reference: a,
    floating: i,
    strategy: m,
    update: h
  };
}
const Mi = (e) => {
  const { element: t, padding: o } = e;
  return {
    name: "arrow",
    options: e,
    fn(r) {
      return sr(t) ? t.value != null ? go({ element: t.value, padding: o }).fn(r) : {} : t ? go({ element: t, padding: o }).fn(r) : {};
    }
  };
}, Li = ["data-placement"], er = {
  __name: "FloatingPanel",
  props: {
    disabled: {
      type: Boolean,
      default: !1
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
  setup(e) {
    const t = e, o = Xt("floating-content"), r = K(!1), n = K(null), { x: a, y: i, arrowX: s, arrowY: l, placement: c, reference: f, floating: p, strategy: m } = Ci({
      placement: t.placement,
      middleware: [pi(), hi({ padding: 5 }), gi(t.offset), Mi({ element: n, padding: 5 })],
      append: D(() => t.appendTo),
      enabled: r
    }), g = () => {
      t.disabled || (r.value = !0);
    }, h = () => {
      r.value = !1;
    }, u = (v) => {
      f.value = v;
    };
    return vr(p, (v) => {
      var S;
      (S = f.value) != null && S.contains(v.target) || h();
    }), (v, S) => (y(), $(at, null, [
      dt(v.$slots, "default", {
        setRef: u,
        show: g,
        hide: h
      }),
      T("div", {
        ref_key: "floating",
        ref: p,
        "data-placement": d(c),
        style: Ye({
          position: d(m),
          top: d(i) ? `${d(i)}px` : "",
          left: d(a) ? `${d(a)}px` : ""
        })
      }, [
        L(lr, {
          name: "transition-fade",
          mode: "out-in"
        }, {
          default: R(() => [
            r.value ? (y(), $("div", {
              key: 0,
              class: nt([d(o), [`is-${t.theme}`]])
            }, [
              dt(v.$slots, "content", { close: h }, () => [
                $t(U(e.content), 1)
              ]),
              T("div", {
                ref_key: "arrowRef",
                ref: n,
                class: "is-arrow",
                style: Ye({
                  position: d(m),
                  top: d(l) ? `${d(l)}px` : "",
                  left: d(s) ? `${d(s)}px` : ""
                })
              }, null, 4)
            ], 2)) : G("", !0)
          ]),
          _: 3
        })
      ], 12, Li)
    ], 64));
  }
}, Di = ["onMouseenter", "onMouseleave", "onFocus", "onBlur", "onClick"], Ni = { key: 0 }, Ei = ["colspan"], Ri = { key: 1 }, Gi = ["colspan"], Be = {
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
      default: !1
    },
    appendTo: {
      type: [Object, String],
      default: null
    }
  },
  emits: ["sort"],
  setup(e, { emit: t }) {
    const o = e, { t: r } = ve(), n = Xt("table"), a = D(() => o.columns), i = D(() => Object.keys(o.columns).length), s = cr(o, "appendTo"), l = (c, f) => {
      !c.sortOrders || t("sort", { target: f, orders: c.sortOrders });
    };
    return (c, f) => (y(), $("table", {
      class: nt(d(n))
    }, [
      T("thead", null, [
        T("tr", null, [
          (y(!0), $(at, null, bt(d(a), (p, m) => (y(), J(er, {
            key: m,
            placement: "top",
            content: p.tooltip,
            disabled: !p.tooltip,
            "append-to": d(s)
          }, {
            default: R(({ setRef: g, show: h, hide: u }) => [
              T("th", {
                ref_for: !0,
                ref: g,
                class: nt([
                  [p.class],
                  {
                    "is-active": m === e.sort.sortTarget && e.sort.orders[0].direction !== d(vt),
                    "is-sortable": p.sortOrders,
                    "is-desc": m === e.sort.sortTarget && e.sort.orders[0].direction === d(w),
                    "is-asc": m === e.sort.sortTarget && e.sort.orders[0].direction === d(Z)
                  }
                ]),
                onMouseenter: h,
                onMouseleave: u,
                onFocus: h,
                onBlur: u,
                onClick: (v) => l(p, m)
              }, [
                dt(c.$slots, `header-${m}`, { column: p }, () => [
                  $t(U(p.label), 1)
                ]),
                p.sortOrders && m !== e.sort.sortTarget ? (y(), J(po, {
                  key: 0,
                  class: "is-icon-sort"
                })) : G("", !0),
                m === e.sort.sortTarget && e.sort.orders[0].direction === d(vt) ? (y(), J(po, {
                  key: 1,
                  class: "is-icon-sort"
                })) : G("", !0),
                m === e.sort.sortTarget && e.sort.orders[0].direction === d(w) ? (y(), J(Xa, {
                  key: 2,
                  class: "is-icon-sort"
                })) : G("", !0),
                m === e.sort.sortTarget && e.sort.orders[0].direction === d(Z) ? (y(), J(ri, {
                  key: 3,
                  class: "is-icon-sort"
                })) : G("", !0)
              ], 42, Di)
            ]),
            _: 2
          }, 1032, ["content", "disabled", "append-to"]))), 128))
        ])
      ]),
      T("tbody", null, [
        (y(!0), $(at, null, bt(o.rows, (p, m) => (y(), $("tr", { key: m }, [
          (y(!0), $(at, null, bt(d(a), (g, h) => (y(), $("td", {
            key: h,
            class: nt([
              [g.class],
              {
                "is-active": h === e.sort.sortTarget && e.sort.orders[0].direction !== d(vt)
              }
            ])
          }, [
            dt(c.$slots, `cell-${h}`, {
              row: p,
              prop: h
            }, () => [
              $t(U(p[h]), 1)
            ])
          ], 2))), 128))
        ]))), 128))
      ]),
      T("tfoot", null, [
        e.rows.length === 0 && !e.isLoading ? (y(), $("tr", Ni, [
          T("td", { colspan: d(i) }, U(d(r)("common.noData")), 9, Ei)
        ])) : G("", !0),
        e.isLoading ? (y(), $("tr", Ri, [
          T("td", { colspan: d(i) }, U(d(r)("common.loading")), 9, Gi)
        ])) : G("", !0)
      ])
    ], 2));
  }
}, Fi = {}, Vi = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Hi = /* @__PURE__ */ T("rect", {
  x: "2",
  y: "3",
  width: "20",
  height: "14",
  rx: "2",
  ry: "2"
}, null, -1), Bi = /* @__PURE__ */ T("line", {
  x1: "8",
  y1: "21",
  x2: "16",
  y2: "21"
}, null, -1), Yi = /* @__PURE__ */ T("line", {
  x1: "12",
  y1: "17",
  x2: "12",
  y2: "21"
}, null, -1), Ui = [
  Hi,
  Bi,
  Yi
];
function Wi(e, t) {
  return y(), $("svg", Vi, Ui);
}
const Ki = /* @__PURE__ */ Q(Fi, [["render", Wi]]), qi = {}, Zi = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Xi = /* @__PURE__ */ T("circle", {
  cx: "12",
  cy: "12",
  r: "1"
}, null, -1), Ji = /* @__PURE__ */ T("circle", {
  cx: "12",
  cy: "5",
  r: "1"
}, null, -1), Qi = /* @__PURE__ */ T("circle", {
  cx: "12",
  cy: "19",
  r: "1"
}, null, -1), ts = [
  Xi,
  Ji,
  Qi
];
function es(e, t) {
  return y(), $("svg", Zi, ts);
}
const os = /* @__PURE__ */ Q(qi, [["render", es]]), rs = {}, ns = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, as = /* @__PURE__ */ T("path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }, null, -1), is = /* @__PURE__ */ T("rect", {
  x: "8",
  y: "2",
  width: "8",
  height: "4",
  rx: "1",
  ry: "1"
}, null, -1), ss = [
  as,
  is
];
function ls(e, t) {
  return y(), $("svg", ns, ss);
}
const cs = /* @__PURE__ */ Q(rs, [["render", ls]]), us = {}, ds = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, ps = /* @__PURE__ */ T("path", { d: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" }, null, -1), fs = /* @__PURE__ */ T("polygon", { points: "9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" }, null, -1), gs = [
  ps,
  fs
];
function ms(e, t) {
  return y(), $("svg", ds, gs);
}
const hs = /* @__PURE__ */ Q(us, [["render", ms]]), vs = { key: 0 }, bs = {
  key: 0,
  class: "is-text-dark"
}, ys = ["href"], ws = {
  key: 0,
  class: "label"
}, _s = {
  key: 1,
  class: "label"
}, xs = {
  key: 2,
  class: "label"
}, $s = { key: 1 }, Ss = ["onClick"], Ps = { class: "is-dropdown-menu" }, Os = ["href"], Ts = { key: 0 }, zs = ["href"], ks = {
  __name: "ScheduleTable",
  props: {
    rows: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      deafult: !1
    },
    externalBaseUrl: {
      type: String,
      default: xa
    },
    hideColumns: {
      type: String,
      default: ""
    },
    offsetName: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = e, { columns: o, error: r } = Fe(La, t.hideColumns, { offsetName: t.offsetName }), { t: n } = ve();
    return (a, i) => (y(), $(at, null, [
      d(r) ? (y(), $("div", vs, U(d(r)), 1)) : G("", !0),
      L(Ve, null, {
        default: R(({ el: s }) => [
          L(Be, {
            columns: d(o),
            rows: t.rows,
            "is-loading": e.isLoading,
            "append-to": s
          }, {
            "cell-homeTeamLogo": R(({ row: l }) => [
              (y(), J(Ut, {
                class: "is-logo-image is-right",
                key: l.id,
                src: l.homeTeamLogo
              }, null, 8, ["src"]))
            ]),
            "cell-awayTeamLogo": R(({ row: l }) => [
              (y(), J(Ut, {
                class: "is-logo-image is-right",
                key: l.id,
                src: l.awayTeamLogo
              }, null, 8, ["src"]))
            ]),
            "cell-gameResult": R(({ row: l }) => [
              l.gameStatus === 0 ? (y(), $("span", bs, "-:-")) : (y(), $("a", {
                key: 1,
                href: e.externalBaseUrl + l.id,
                target: "_blank",
                class: nt({ "is-text-dark": l.gameStatus !== 1, "is-text-accent": l.gameStatus === 1 })
              }, U(l.homeTeamScore) + ":" + U(l.awayTeamScore), 11, ys))
            ]),
            "cell-gameResultType": R(({ row: l }) => [
              l.isOvertime ? (y(), $("span", ws, U(d(n)("common.overtimeShort")), 1)) : G("", !0),
              l.isShootout ? (y(), $("span", _s, U(d(n)("common.shootoutShort").value), 1)) : G("", !0),
              l.seriesStandings ? (y(), $("span", xs, U(l.seriesStandings), 1)) : G("", !0)
            ]),
            "cell-broadcast": R(({ row: l }) => [
              l.broadcast ? (y(), J(Ki, { key: 0 })) : (y(), $("span", $s))
            ]),
            "cell-more": R(({ row: l }) => [
              L(er, {
                offset: 2,
                placement: "left",
                theme: "content",
                "append-to": s
              }, {
                default: R(({ setRef: c, show: f }) => [
                  T("button", {
                    ref: c,
                    onClick: Le(f, ["stop"])
                  }, [
                    L(os)
                  ], 8, Ss)
                ]),
                content: R(() => [
                  T("ul", Ps, [
                    T("li", null, [
                      T("a", {
                        href: e.externalBaseUrl + l.id,
                        class: "is-dropdown-item",
                        target: "_blank"
                      }, [
                        L(cs, { width: "14" }),
                        $t(" Jegyz\u0151k\xF6nyv ")
                      ], 8, Os)
                    ]),
                    l.video ? (y(), $("li", Ts, [
                      T("a", {
                        href: l.video,
                        class: "is-dropdown-item",
                        target: "_blank"
                      }, [
                        L(hs, { width: "14" }),
                        $t(" Vide\xF3 ")
                      ], 8, zs)
                    ])) : G("", !0)
                  ])
                ]),
                _: 2
              }, 1032, ["append-to"])
            ]),
            _: 2
          }, 1032, ["columns", "rows", "is-loading", "append-to"])
        ]),
        _: 1
      })
    ], 64));
  }
}, As = {
  undefinedColumn: "A(z) {column} oszlop nem l\xE9tezik!"
}, Is = {
  loading: "T\xF6lt\u0151d\xE9s...",
  noData: "Nincs megjelen\xEDthet\u0151 adat",
  selectTimezone: "*Minden id\u0151pont a sz\xE1m\xEDt\xF3g\xE9p id\u0151z\xF3n\xE1ja szerint jelenik meg ({0}). V\xE1lt\xE1s:",
  hungary: "Magyarorsz\xE1g",
  romania: "Rom\xE1nia",
  shootoutShort: "SzU.",
  overtimeShort: "HU."
}, js = {
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
}, Cs = {
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
}, Ms = {
  errors: As,
  common: Is,
  table: js,
  game: Cs
}, Ls = {
  undefinedColumn: "The {column} column is not exists!"
}, Ds = {
  loading: "Loading...",
  noData: "No data to display",
  selectTimezone: "*Minden id\u0151pont a sz\xE1m\xEDt\xF3g\xE9p id\u0151z\xF3n\xE1ja szerint jelenik meg ({0}). V\xE1lt\xE1s:",
  hungary: "Hungary",
  romania: "Romania",
  shootoutShort: "SO",
  overtimeShort: "OT"
}, Ns = {
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
}, Es = {
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
}, Rs = {
  errors: Ls,
  common: Ds,
  table: Ns,
  game: Es
}, Gs = ur({
  props: {
    locale: {
      type: String,
      default: "hu"
    }
  },
  setup(e) {
    Ia({
      locale: D(() => e.locale),
      messages: {
        hu: Ms,
        en: Rs
      }
    });
  }
});
function Fs(e, t, o, r, n, a) {
  return dt(e.$slots, "default");
}
const At = /* @__PURE__ */ Q(Gs, [["render", Fs]]);
function Vs({ currentPage: e, itemsPerPage: t = 20, totalItems: o, rangeLength: r = 5, update: n = Vt }) {
  const a = D(() => Math.ceil(d(o) / t)), i = D(() => {
    const f = d(e) - 1, p = Array.from({ length: a.value }, (h, u) => u + 1), m = Math.floor(r / 2);
    let g = Math.max(f - m, 0);
    return g + r >= a.value && (g = Math.max(a.value - r, 0)), p.slice(g, g + r);
  }), s = (f) => {
    const p = d(e) + f;
    c(p) && n(p);
  }, l = (f) => {
    c(f) && n(f);
  }, c = (f) => f <= a.value && f > 0;
  return {
    page: e,
    range: i,
    pageCount: a,
    goTo: l,
    pageStep: s
  };
}
const Hs = {}, Bs = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Ys = /* @__PURE__ */ T("polyline", { points: "15 18 9 12 15 6" }, null, -1), Us = [
  Ys
];
function Ws(e, t) {
  return y(), $("svg", Bs, Us);
}
const Ks = /* @__PURE__ */ Q(Hs, [["render", Ws]]), qs = {}, Zs = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Xs = /* @__PURE__ */ T("polyline", { points: "9 18 15 12 9 6" }, null, -1), Js = [
  Xs
];
function Qs(e, t) {
  return y(), $("svg", Zs, Js);
}
const tl = /* @__PURE__ */ Q(qs, [["render", Qs]]), el = ["disabled"], ol = ["disabled"], rl = {
  key: 1,
  class: "is-disabled"
}, nl = ["disabled", "onClick"], al = {
  key: 2,
  class: "is-disabled"
}, il = /* @__PURE__ */ T("span", null, "...", -1), sl = [
  il
], ll = ["disabled"], cl = ["disabled"], te = {
  __name: "Paginator",
  props: {
    page: {
      type: Number,
      required: !1,
      default: 0,
      validator: (e) => e >= 0
    },
    itemsPerPage: {
      type: Number,
      required: !1,
      default: 10,
      validator: (e) => e > 0
    },
    totalItems: {
      type: Number,
      required: !0,
      validator: (e) => e >= 0
    },
    rangeLength: {
      type: Number,
      default: 3,
      validator: (e) => e >= 2
    },
    isCompact: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const o = e, r = Xt("paginator"), { page: n, pageCount: a, range: i, goTo: s, pageStep: l } = Vs({
      currentPage: D(() => o.page),
      totalItems: D(() => o.totalItems),
      itemsPerPage: o.itemsPerPage,
      rangeLength: o.rangeLength,
      update: (c) => t("change", c)
    });
    return (c, f) => d(a) > 1 ? (y(), $("div", {
      key: 0,
      class: nt(d(r))
    }, [
      T("button", {
        type: "button",
        disabled: d(n) === 1,
        onClick: f[0] || (f[0] = (p) => d(l)(-1))
      }, [
        dt(c.$slots, "prev", {}, () => [
          L(Ks, { class: "icon paginator-left" })
        ])
      ], 8, el),
      e.isCompact ? G("", !0) : (y(), $("button", {
        key: 0,
        type: "button",
        disabled: d(n) === 1,
        onClick: f[1] || (f[1] = (p) => d(s)(1))
      }, "1", 8, ol)),
      e.isCompact ? G("", !0) : (y(), $("div", rl, "...")),
      (y(!0), $(at, null, bt(d(i), (p) => (y(), $("button", {
        type: "button",
        key: p,
        class: nt({ "is-active": p === d(n) }),
        disabled: p === d(n),
        onClick: (m) => d(s)(p)
      }, U(p), 11, nl))), 128)),
      e.isCompact ? G("", !0) : (y(), $("div", al, sl)),
      e.isCompact ? G("", !0) : (y(), $("button", {
        key: 3,
        type: "button",
        disabled: d(n) === d(a),
        onClick: f[2] || (f[2] = (p) => d(s)(d(a)))
      }, U(d(a)), 9, ll)),
      T("button", {
        type: "button",
        disabled: d(n) === d(a),
        onClick: f[3] || (f[3] = Le((p) => d(l)(1), ["prevent"]))
      }, [
        dt(c.$slots, "next", {}, () => [
          L(tl, { class: "icon paginator-left" })
        ])
      ], 8, cl)
    ], 2)) : G("", !0);
  }
}, ul = {}, dl = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, pl = /* @__PURE__ */ T("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }, null, -1), fl = /* @__PURE__ */ T("line", {
  x1: "12",
  y1: "9",
  x2: "12",
  y2: "13"
}, null, -1), gl = /* @__PURE__ */ T("line", {
  x1: "12",
  y1: "17",
  x2: "12.01",
  y2: "17"
}, null, -1), ml = [
  pl,
  fl,
  gl
];
function hl(e, t) {
  return y(), $("svg", dl, ml);
}
const vl = /* @__PURE__ */ Q(ul, [["render", hl]]), xt = {
  __name: "ErrorNotice",
  props: {
    error: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = e, o = Xt("error-notice"), r = D(() => t.error);
    return (n, a) => (y(), $("div", {
      class: nt(d(o))
    }, [
      L(vl, {
        class: "icon",
        width: "20",
        height: "20"
      }),
      T("span", null, U(d(r)), 1)
    ], 2));
  }
}, bl = ["onClick"], yl = {
  __name: "TimezoneSelector",
  props: {
    locale: {
      type: String,
      default: "hu"
    },
    currentZone: {
      type: String,
      required: !0
    }
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const o = e, { t: r } = ve(), n = D(() => Ft(new Date(), null, o.locale)), a = D(() => Array.from(Pa.values()).map((s) => ({
      ...s,
      isActive: Ft(new Date(), o.localTimezone, o.locale) === Ft(new Date(), s.timezone, o.locale),
      zoneOffsetName: Ft(new Date(), s.timezone, o.locale)
    }))), i = (s) => t("change", s);
    return (s, l) => (y(), $("div", null, [
      T("span", null, U(d(r)("common.selectTimezone", [d(n)])), 1),
      (y(!0), $(at, null, bt(d(a), (c) => (y(), $("a", {
        key: c.countryLabelKey,
        href: "#",
        class: nt({ "is-active": c.isActive }),
        onClick: Le((f) => i(c.timezone), ["prevent"])
      }, U(d(r)(`common.${c.countryLabelKey}`)) + " (" + U(c.zoneOffsetName) + ") ", 11, bl))), 128))
    ]));
  }
}, jt = `:root,:host{font-family:Inter,Avenir,Helvetica,Arial,sans-serif;--vbr-widget-primary-color-0: #ffffff;--vbr-widget-primary-color-50: #eceff1;--vbr-widget-primary-color-100: #cfd8dc;--vbr-widget-primary-color-200: #b0bec5;--vbr-widget-primary-color-300: #90a4ae;--vbr-widget-primary-color-400: #78909c;--vbr-widget-primary-color-500: #607d8b;--vbr-widget-primary-color-600: #546e7a;--vbr-widget-primary-color-700: #455a64;--vbr-widget-primary-color-800: #37474f;--vbr-widget-primary-color-900: #263238;--vbr-widget-secondary-color-100: #dcedc8;--vbr-widget-secondary-color-200: #badb94;--vbr-widget-secondary-color-300: #aed581;--vbr-widget-secondary-color-400: #9ccc65;--vbr-widget-secondary-color-500: #8bc34a;--vbr-widget-secondary-color-700: #689f38;--vbr-widget-secondary-color-800: #558b2f;--vbr-widget-secondary-color-900: #33691e;--vbr-widget-danger-color-50: #ffebee;--vbr-widget-danger-color-100: #ffcdd2;--vbr-widget-danger-color-200: #ef9a9a;--vbr-widget-danger-color-300: #e57373;--vbr-widget-danger-color-400: #ef5350;--vbr-widget-danger-color-500: #f44336;--vbr-widget-danger-color-700: #d32f2f;--vbr-widget-danger-color-900: #b71c1c;--vbr-widget-danger-color-a400: #ff1744;--vbr-widget-table-header-font-size: 12px;--vbr-widget-table-default-column-width: 30px;--vbr-widget-table-color: var(--vbr-widget-primary-color-800);--vbr-widget-table-neutral-color: var(--vbr-widget-primary-color-300);--vbr-widget-table-header-bg-color: var(--vbr-widget-primary-color-800);--vbr-widget-table-header-hover-bg-color: var(--vbr-widget-primary-color-700);--vbr-widget-table-header-color: var(--vbr-widget-primary-color-200);--vbr-widget-table-table-header-active-bg-color: var(--vbr-widget-primary-color-700);--vbr-widget-table-header-active-color: var(--vbr-widget-primary-color-0);--vbr-widget-table-hover-color: var(--vbr-widget-secondary-color-900);--vbr-widget-table-hover-bg-color: var(--vbr-widget-secondary-color-100);--vbr-widget-table-active-color: var(--vbr-widget-secondary-color-900);--vbr-widget-table-active-bg-color: var(--vbr-widget-secondary-color-200);--vbr-widget-table-active-even-bg-color: var(--vbr-widget-secondary-color-300);--vbr-widget-table-active-hover-color: var(--vbr-widget-secondary-color-900);--vbr-widget-table-active-hover-bg-color: var(--vbr-widget-secondary-color-400);--vbr-widget-table-portrait-border-color: var(--vbr-widget-primary-color-100);--vbr-widget-table-portrait-bg-color: var(--vbr-widget-primary-color-50);--vbr-widget-table-cell-light-color: var(--vbr-widget-primary-color-600);--vbr-widget-table-cell-dark-color: var(--vbr-widget-primary-color-900);--vbr-widget-table-stripped-bg-color: #f8f9fa;--vbr-widget-table-label-color: var(--vbr-widget-primary-color-500);--vbr-widget-table-label-bg-color: var(--vbr-widget-primary-color-50);--vbr-widget-table-cell-logo-size: 20px;--vbr-widget-table-cell-portrait-size: 26px;--vbr-widget-paginator-color: var(--vbr-widget-primary-color-500);--vbr-widget-paginator-bg-color: var(--vbr-widget-primary-color-0);--vbr-widget-paginator-hover-color: var(--vbr-widget-primary-color-700);--vbr-widget-paginator-hover-bg-color: var(--vbr-widget-primary-color-100);--vbr-widget-paginator-border-color: var(--vbr-widget-primary-color-100);--vbr-widget-paginator-active-color: var(--vbr-widget-primary-color-0);--vbr-widget-paginator-active-bg-color: var(--vbr-widget-primary-color-900);--vbr-widget-paginator-disabled-color: var(--vbr-widget-primary-color-200);--vbr-widget-tooltip-font-size: 12px;--vbr-widget-tooltip-color: #ffffff;--vbr-widget-tooltip-bg-color: #000000;--vbr-widget-popover-trigger-hover-bg-color: var(--vbr-widget-secondary-color-200);--vbr-widget-popover-trigger-focus-bg-color: var(--vbr-widget-secondary-color-300);--vbr-widget-popover-bg-color: var(--vbr-widget-primary-color-0);--vbr-widget-dropdown-item-color: var(--vbr-widget-primary-color-500);--vbr-widget-dropdown-item-hover-color: var(--vbr-widget-primary-color-800);--vbr-widget-dropdown-item-hover-bg-color: var(--vbr-widget-primary-color-50);--vbr-widget-error-notice-bg-color: var(--vbr-widget-danger-color-50);--vbr-widget-error-notice-border-color: var(--vbr-widget-danger-color-100);--vbr-widget-error-notice-color: var(--vbr-widget-danger-color-700)}.transition-fade-enter-active,.transition-fade-leave-active{transition:all .25s ease}.transition-fade-enter-from,.transition-fade-leave-to{opacity:0;transform:translateY(5px)}img{opacity:0;transition:opacity .5s ease-out}img.is-loaded{opacity:1}.mjsz-vbr-floating-content.is-tooltip{background-color:var(--vbr-widget-tooltip-bg-color);color:var(--vbr-widget-tooltip-color);font-weight:700;padding:5px 10px;border-radius:4px;font-size:var(--vbr-widget-tooltip-font-size);white-space:nowrap;pointer-events:none}.mjsz-vbr-floating-content.is-tooltip .is-arrow{background-color:var(--vbr-widget-tooltip-bg-color)}.mjsz-vbr-floating-content.is-content{border-radius:4px;box-shadow:2px 14px 23px #00000040}.mjsz-vbr-floating-content.is-content .is-arrow{background-color:var(--vbr-widget-primary-color-50)}.mjsz-vbr-floating-content .is-arrow{position:absolute;width:8px;height:8px;transform:rotate(45deg)}[data-placement^=top] .mjsz-vbr-floating-content .is-arrow{bottom:-4px}[data-placement^=bottom] .mjsz-vbr-floating-content .is-arrow{top:-4px}[data-placement^=left] .mjsz-vbr-floating-content .is-arrow{right:-4px}[data-placement^=right] .mjsz-vbr-floating-content .is-arrow{left:-4px}.mjsz-vbr-error-notice{display:flex;align-items:center;justify-items:flex-start;margin:10px 0;padding:10px 20px;background-color:var(--vbr-widget-error-notice-bg-color);color:var(--vbr-widget-error-notice-color);border:1px solid var(--vbr-widget-error-notice-border-color)}.mjsz-vbr-error-notice .icon{margin-right:15px}
`, Ct = `.mjsz-vbr-table{border-collapse:collapse;border-spacing:0}.mjsz-vbr-table table,.mjsz-vbr-table caption,.mjsz-vbr-table tbody,.mjsz-vbr-table tfoot,.mjsz-vbr-table thead,.mjsz-vbr-table tr,.mjsz-vbr-table th,.mjsz-vbr-table td{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}.mjsz-vbr-table{color:var(--vbr-widget-table-color)}.mjsz-vbr-table th{width:var(--vbr-widget-table-default-column-width);background-color:var(--vbr-widget-table-header-bg-color);font-size:var(--vbr-widget-table-header-font-size);font-weight:700;color:var(--vbr-widget-table-header-color);text-align:center}.mjsz-vbr-table th:hover{background-color:var(--vbr-widget-table-header-hover-bg-color)}.mjsz-vbr-table th.is-sortable{position:relative;cursor:pointer}.mjsz-vbr-table th.is-sortable .icon-sort{opacity:.5}.mjsz-vbr-table th.is-active{background-color:var(--vbr-widget-table-table-header-active-bg-color);color:var(--vbr-widget-table-header-active-color)}.mjsz-vbr-table th.is-active .icon-sort{opacity:1}.mjsz-vbr-table th.is-asc,.mjsz-vbr-table th.is-desc{position:relative}.mjsz-vbr-table th.is-w-auto{width:auto}.mjsz-vbr-table th .is-icon-sort{width:11px;height:11px;margin-left:5px}.mjsz-vbr-table td{text-align:center}.mjsz-vbr-table td.is-active{font-weight:700;color:var(--vbr-widget-table-active-color);background-color:var(--vbr-widget-table-active-bg-color)}.mjsz-vbr-table td .is-text-light,.mjsz-vbr-table td.is-text-light{color:var(--vbr-widget-table-cell-light-color)}.mjsz-vbr-table td .is-text-dark,.mjsz-vbr-table td.is-text-dark{color:var(--vbr-widget-table-cell-dark-color)}.mjsz-vbr-table td .is-logo-image{display:inline-block;vertical-align:middle;width:var(--vbr-widget-table-cell-logo-size);height:var(--vbr-widget-table-cell-logo-size)}.mjsz-vbr-table td .is-portrait-image{display:inline-block;vertical-align:middle;width:var(--vbr-widget-table-cell-portrait-size);height:var(--vbr-widget-table-cell-portrait-size);object-fit:cover;object-position:top;overflow:hidden;border-radius:100%;border:1px solid var(--vbr-widget-primary-color-100)}.mjsz-vbr-table td .is-portrait-image img{width:var(--vbr-widget-table-cell-portrait-size);height:auto}.mjsz-vbr-table td.is-text-bold{font-weight:700}.mjsz-vbr-table td.is-text-xl{font-size:1.2 rem}.mjsz-vbr-table td .is-text-accent{color:var(--vbr-widget-secondary-color-500)}.mjsz-vbr-table td svg{width:16px;height:16px}.mjsz-vbr-table td button{padding:3px;line-height:0;border:none;outline:none;background-color:transparent}.mjsz-vbr-table td button:hover{background-color:var(--vbr-widget-popover-trigger-hover-bg-color)}.mjsz-vbr-table td button:active,.mjsz-vbr-table td button:focus{background-color:var(--vbr-widget-popover-trigger-focus-bg-color)}.mjsz-vbr-table td a{text-decoration:none}.mjsz-vbr-table td .label{padding:3px 6px;font-size:11px;font-weight:700;color:var(--vbr-widget-table-label-color);background-color:var(--vbr-widget-table-label-bg-color);border-radius:2px}.mjsz-vbr-table td .label:not(:last-of-type){margin-right:3px}.mjsz-vbr-table th,.mjsz-vbr-table td{padding:8px;white-space:nowrap;vertical-align:middle}.mjsz-vbr-table th.is-text-left,.mjsz-vbr-table td.is-text-left{text-align:left}.mjsz-vbr-table th.is-text-right,.mjsz-vbr-table td.is-text-right{text-align:right}.mjsz-vbr-table th.is-has-image,.mjsz-vbr-table td.is-has-image{padding:0 2px}.mjsz-vbr-table th .is-duplicated,.mjsz-vbr-table td .is-duplicated{color:var(--vbr-widget-table-neutral-color)}.mjsz-vbr-table tr:nth-child(even){background-color:var(--vbr-widget-table-stripped-bg-color)}.mjsz-vbr-table tr:nth-child(even) td.is-active{background-color:var(--vbr-widget-table-active-even-bg-color)}.mjsz-vbr-table tr:focus-within,.mjsz-vbr-table tr:hover{color:var(--vbr-widget-table-hover-color);background-color:var(--vbr-widget-table-hover-bg-color)}.mjsz-vbr-table tr:focus-within td.is-active,.mjsz-vbr-table tr:hover td.is-active{color:var(--vbr-widget-table-active-hover-color);background-color:var(--vbr-widget-table-active-hover-bg-color)}
`, Mt = `.mjsz-vbr-table-responsive{width:100%;overflow-x:auto}.mjsz-vbr-table-responsive table{width:100%}
`, ee = `.mjsz-vbr-paginator{display:flex;flex-direction:row;list-style-type:none;margin:10px 0;padding:0}.mjsz-vbr-paginator button,.mjsz-vbr-paginator div{display:flex;align-items:center;justify-content:center;padding:6px 12px;text-decoration:none;cursor:pointer;color:var(--vbr-widget-paginator-color);border:1px solid var(--vbr-widget-paginator-border-color);background-color:var(--vbr-widget-paginator-bg-color);margin-left:-1px}.mjsz-vbr-paginator button .icon,.mjsz-vbr-paginator div .icon{width:16px;height:16px;margin:0 -4px}.mjsz-vbr-paginator button:hover:not(.mjsz-vbr-paginator button.is-disabled,.mjsz-vbr-paginator button.is-active),.mjsz-vbr-paginator div:hover:not(.mjsz-vbr-paginator div.is-disabled,.mjsz-vbr-paginator div.is-active){color:var(--vbr-widget-paginator-hover-color);background-color:var(--vbr-widget-paginator-hover-bg-color)}.mjsz-vbr-paginator button:disabled,.mjsz-vbr-paginator button.is-disabled,.mjsz-vbr-paginator div:disabled,.mjsz-vbr-paginator div.is-disabled{color:var(--vbr-widget-paginator-disabled-color);background-color:var(--vbr-widget-paginator-bg-color);pointer-events:none;cursor:default}.mjsz-vbr-paginator button.is-active,.mjsz-vbr-paginator div.is-active{color:var(--vbr-widget-paginator-active-color);background-color:var(--vbr-widget-paginator-active-bg-color);border-color:var(--vbr-widget-paginator-active-bg-color);cursor:default}.mjsz-vbr-paginator div{border:none;margin-left:0}
`, wl = `.is-dropdown-menu{padding:8px 0;margin:0;min-width:160px;color:#000;list-style:none;background:var(--vbr-widget-popover-bg-color);border-radius:3px;box-shadow:0 5px 30px rgba(black,.3)}.is-dropdown-menu .is-dropdown-item{display:flex;align-items:center;padding:.25rem 1rem;font-family:var(--vbr-widget-font-family);line-height:24px;color:var(--vbr-widget-dropdown-item-color);text-align:inherit;text-decoration:none;white-space:nowrap;background-color:transparent;border:0}.is-dropdown-menu .is-dropdown-item:hover{color:var(--vbr-widget-dropdown-item-hover-color);background-color:var(--vbr-widget-dropdown-item-hover-bg-color)}.is-dropdown-menu .is-dropdown-item svg{margin-right:8px}
`, _l = {
  __name: "Schedule.ce",
  props: {
    locale: {
      type: String,
      default: "hu"
    },
    championshipId: {
      type: String,
      default: "3314"
    },
    division: {
      type: String,
      default: "Alapszakasz"
    },
    apiKey: {
      type: String,
      default: ""
    },
    pagination: {
      type: Boolean,
      default: !0
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
      validator: (e) => e >= 1
    },
    autoInitialPage: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = e, o = D(() => t.locale), {
      state: r,
      error: n,
      isLoading: a
    } = Ot(
      ut("/v1/gamesList", t.apiKey, {
        championshipId: Number(t.championshipId),
        division: t.division
      }),
      []
    ), { page: i, change: s } = Zt({ initial: t.initialPage, items: r, limit: t.limit, auto: t.autoInitialPage }), l = K(it.tz.guess()), c = Ft(new Date(), d(l), t.locale), f = D(() => kt(d(r)).teamFilter(t.teamFilterByName, ["homeTeamName", "awayTeamName"]).schedule(d(l), d(o)).pagination(d(i), t.limit).value()), p = D(() => {
      var g;
      return (g = f.value) == null ? void 0 : g.totalItems;
    }), m = (g) => {
      l.value = g;
    };
    return (g, h) => (y(), $("div", null, [
      L(At, {
        locale: t.locale
      }, {
        default: R(() => {
          var u;
          return [
            (u = d(n)) != null && u.error ? (y(), J(xt, {
              key: 0,
              error: d(n).message
            }, null, 8, ["error"])) : G("", !0),
            L(yl, {
              locale: t.locale,
              "current-zone": l.value,
              onChange: m
            }, null, 8, ["locale", "current-zone"]),
            L(ks, {
              rows: d(f).rows,
              "is-loading": d(a),
              "offset-name": d(c)
            }, null, 8, ["rows", "is-loading", "offset-name"]),
            L(te, {
              page: d(i),
              "items-per-page": t.limit,
              "total-items": d(p),
              "range-length": 5,
              onChange: d(s)
            }, null, 8, ["page", "items-per-page", "total-items", "onChange"])
          ];
        }),
        _: 1
      }, 8, ["locale"])
    ]));
  }
}, xl = /* @__PURE__ */ Q(_l, [["styles", [jt, Ct, Mt, ee, wl]]]);
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
function wo(e, t) {
  var o = typeof Symbol == "function" && e[Symbol.iterator];
  if (!o)
    return e;
  var r, n, a = o.call(e), i = [];
  try {
    for (; (t === void 0 || t-- > 0) && !(r = a.next()).done; )
      i.push(r.value);
  } catch (s) {
    n = { error: s };
  } finally {
    try {
      r && !r.done && (o = a.return) && o.call(a);
    } finally {
      if (n)
        throw n.error;
    }
  }
  return i;
}
var _o;
(function(e) {
  e[e.NotStarted = 0] = "NotStarted", e[e.Running = 1] = "Running", e[e.Stopped = 2] = "Stopped";
})(_o || (_o = {}));
var $l = { type: "xstate.init" };
function Pe(e) {
  return e === void 0 ? [] : [].concat(e);
}
function xo(e, t) {
  return typeof (e = typeof e == "string" && t && t[e] ? t[e] : e) == "string" ? { type: e } : typeof e == "function" ? { type: e.name, exec: e } : e;
}
function Ce(e) {
  return function(t) {
    return e === t;
  };
}
function Sl(e) {
  return typeof e == "string" ? { type: e } : e;
}
function $o(e, t) {
  return { value: e, context: t, actions: [], changed: !1, matches: Ce(e) };
}
function So(e, t, o) {
  var r = t, n = !1;
  return [e.filter(function(a) {
    if (a.type === "xstate.assign") {
      n = !0;
      var i = Object.assign({}, r);
      return typeof a.assignment == "function" ? i = a.assignment(r, o) : Object.keys(a.assignment).forEach(function(s) {
        i[s] = typeof a.assignment[s] == "function" ? a.assignment[s](r, o) : a.assignment[s];
      }), r = i, !1;
    }
    return !0;
  }), r, n];
}
function Pl(e, t) {
  t === void 0 && (t = {});
  var o = wo(So(Pe(e.states[e.initial].entry).map(function(i) {
    return xo(i, t.actions);
  }), e.context, $l), 2), r = o[0], n = o[1], a = { config: e, _options: t, initialState: { value: e.initial, actions: r, context: n, matches: Ce(e.initial) }, transition: function(i, s) {
    var l, c, f = typeof i == "string" ? { value: i, context: e.context } : i, p = f.value, m = f.context, g = Sl(s), h = e.states[p];
    if (h.on) {
      var u = Pe(h.on[g.type]);
      try {
        for (var v = function(b) {
          var A = typeof Symbol == "function" && Symbol.iterator, I = A && b[A], N = 0;
          if (I)
            return I.call(b);
          if (b && typeof b.length == "number")
            return { next: function() {
              return b && N >= b.length && (b = void 0), { value: b && b[N++], done: !b };
            } };
          throw new TypeError(A ? "Object is not iterable." : "Symbol.iterator is not defined.");
        }(u), S = v.next(); !S.done; S = v.next()) {
          var O = S.value;
          if (O === void 0)
            return $o(p, m);
          var P = typeof O == "string" ? { target: O } : O, C = P.target, E = P.actions, V = E === void 0 ? [] : E, Y = P.cond, B = Y === void 0 ? function() {
            return !0;
          } : Y, M = C === void 0, j = C != null ? C : p, tt = e.states[j];
          if (B(m, g)) {
            var st = wo(So((M ? Pe(V) : [].concat(h.exit, V, tt.entry).filter(function(b) {
              return b;
            })).map(function(b) {
              return xo(b, a._options.actions);
            }), m, g), 3), z = st[0], x = st[1], _ = st[2], k = C != null ? C : p;
            return { value: k, context: x, actions: z, changed: C !== p || z.length > 0 || _, matches: Ce(k) };
          }
        }
      } catch (b) {
        l = { error: b };
      } finally {
        try {
          S && !S.done && (c = v.return) && c.call(v);
        } finally {
          if (l)
            throw l.error;
        }
      }
    }
    return $o(p, m);
  } };
  return a;
}
const Ol = Pl({
  id: "sort",
  initial: vt,
  states: {
    [vt]: {
      on: {
        DIRECTION1: w,
        DIRECTION2: Z
      }
    },
    [w]: {
      on: {
        DIRECTION1: Z,
        DIRECTION2: vt
      }
    },
    [Z]: {
      on: {
        DIRECTION1: vt,
        DIRECTION2: w
      }
    }
  }
}), Tl = (e, t) => {
  const o = t === Z ? "DIRECTION2" : "DIRECTION1";
  return Ol.transition(e, o).value;
};
function Lt({ sortTarget: e = null, orders: t = [] }) {
  const o = Me({ sortTarget: e, orders: t });
  return {
    sort: o,
    change: ({ target: n, orders: a }) => {
      if (o.sortTarget !== n) {
        o.sortTarget = n, o.orders = a;
        return;
      }
      const i = a.map((s, l) => ({
        ...s,
        direction: Tl(o.orders[l].direction, s.direction)
      }));
      o.sortTarget = n, o.orders = i;
    }
  };
}
const zl = {
  __name: "StandingsTable",
  props: {
    rows: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      deafult: !1
    },
    hideColumns: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "3",
      validator: (e) => ["2", "3"].includes(e)
    },
    sort: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["sort"],
  setup(e, { emit: t }) {
    const o = e, r = D(() => o.type === "3" ? Da : Na), { columns: n, error: a } = Fe(r.value, o.hideColumns), i = (s) => t("sort", s);
    return (s, l) => (y(), $(at, null, [
      d(a) ? (y(), J(xt, { key: 0 }, {
        default: R(() => [
          $t(U(d(a)), 1)
        ]),
        _: 1
      })) : G("", !0),
      L(Ve, null, {
        default: R(({ el: c }) => [
          L(Be, {
            columns: d(n),
            sort: o.sort,
            rows: o.rows,
            "is-loading": e.isLoading,
            "append-to": c,
            onSort: i
          }, {
            "cell-teamLogo": R(({ row: f }) => [
              (y(), J(Ut, {
                class: "is-logo-image",
                key: f.id,
                src: f.teamLogo
              }, null, 8, ["src"]))
            ]),
            _: 2
          }, 1032, ["columns", "sort", "rows", "is-loading", "append-to"])
        ]),
        _: 1
      })
    ], 64));
  }
}, kl = {
  __name: "Standings.ce",
  props: {
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
    type: {
      type: String,
      default: "3",
      validator: (e) => ["2", "3"].includes(e)
    },
    hideColumns: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = e, o = D(() => t.locale), {
      state: r,
      error: n,
      isLoading: a
    } = Ot(
      ut("/v1/standings", t.apiKey, {
        championshipId: Number(t.championshipId),
        division: t.division
      }),
      []
    ), { sort: i, change: s } = Lt({}), l = D(() => kt(d(r)).sorted(i).addContinuousIndex().value()), c = (f) => {
      s(f);
    };
    return (f, p) => (y(), $("div", null, [
      L(At, { locale: d(o) }, {
        default: R(() => {
          var m;
          return [
            (m = d(n)) != null && m.error ? (y(), J(xt, {
              key: 0,
              error: d(n).message
            }, null, 8, ["error"])) : G("", !0),
            L(zl, {
              type: t.type,
              rows: d(l).rows,
              "is-loading": d(a),
              "hide-columns": e.hideColumns,
              sort: d(i),
              onSort: c
            }, null, 8, ["type", "rows", "is-loading", "hide-columns", "sort"])
          ];
        }),
        _: 1
      }, 8, ["locale"])
    ]));
  }
}, Al = /* @__PURE__ */ Q(kl, [["styles", [jt, Ct, Mt]]]), _e = {
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
  type: {
    type: String,
    default: "3",
    validator: (e) => ["2", "3"].includes(e)
  },
  limit: {
    type: Number,
    default: 20
  },
  hideColumns: {
    type: String,
    default: ""
  },
  teamFilterByName: {
    type: String,
    default: ""
  }
}, Il = { class: "is-portrait-image" }, oe = {
  __name: "StatisticsTable",
  props: {
    columns: {
      type: Object,
      required: !0
    },
    rows: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      deafult: !1
    },
    hideColumns: {
      type: String,
      default: ""
    },
    sort: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["sort"],
  setup(e, { emit: t }) {
    const o = e, r = D(() => o.columns), { columns: n, error: a } = Fe(r, o.hideColumns), i = (s) => t("sort", s);
    return (s, l) => (y(), $(at, null, [
      d(a) ? (y(), J(xt, { key: 0 }, {
        default: R(() => [
          $t(U(d(a)), 1)
        ]),
        _: 1
      })) : G("", !0),
      L(Ve, null, {
        default: R(({ el: c }) => [
          L(Be, {
            columns: d(n),
            sort: o.sort,
            rows: o.rows,
            "is-loading": e.isLoading,
            "append-to": c,
            onSort: i
          }, {
            "cell-index": R(({ row: f }) => [
              T("span", {
                class: nt(f.indexClass)
              }, U(f.index), 3)
            ]),
            "cell-playerPortrait": R(({ row: f }) => [
              T("div", Il, [
                (y(), J(Ut, {
                  key: f.id || f.playerId,
                  src: f.playerPortrait,
                  "default-src": d($a)
                }, null, 8, ["src", "default-src"]))
              ])
            ]),
            "cell-teamLogo": R(({ row: f }) => [
              (y(), J(Ut, {
                class: "is-logo-image",
                key: f.teamId,
                src: f.teamLogo
              }, null, 8, ["src"]))
            ]),
            _: 2
          }, 1032, ["columns", "sort", "rows", "is-loading", "append-to"])
        ]),
        _: 1
      })
    ], 64));
  }
}, jl = {
  __name: "FieldPlayersLeader.ce",
  props: _e,
  setup(e) {
    const t = e, o = ke, r = D(() => t.locale), {
      state: n,
      error: a,
      isLoading: i
    } = Ot(
      ut("/v1/playersStatsPeriod", t.apiKey, {
        championshipId: Number(t.championshipId),
        division: t.division
      }),
      []
    ), { page: s, change: l } = Zt({}), { sort: c, change: f } = Lt({
      sortTarget: "point",
      orders: [{ target: "point", direction: w }]
    }), p = D(() => kt(d(n)).teamFilter(t.teamFilterByName, ["teamName"]).playerName().sorted(c).addIndex(c.sortTarget).pagination(d(s), t.limit).value()), m = D(() => {
      var g;
      return (g = p.value) == null ? void 0 : g.totalItems;
    });
    return (g, h) => (y(), $("div", null, [
      L(At, { locale: d(r) }, {
        default: R(() => {
          var u;
          return [
            (u = d(a)) != null && u.error ? (y(), J(xt, {
              key: 0,
              error: d(a).message
            }, null, 8, ["error"])) : G("", !0),
            L(oe, {
              columns: d(o),
              rows: d(p).rows,
              "is-loading": d(i),
              "hide-columns": t.hideColumns,
              sort: d(c),
              onSort: d(f)
            }, null, 8, ["columns", "rows", "is-loading", "hide-columns", "sort", "onSort"]),
            L(te, {
              page: d(s),
              "items-per-page": t.limit,
              "total-items": d(m),
              "range-length": 5,
              onChange: d(l)
            }, null, 8, ["page", "items-per-page", "total-items", "onChange"])
          ];
        }),
        _: 1
      }, 8, ["locale"])
    ]));
  }
}, Cl = /* @__PURE__ */ Q(jl, [["styles", [jt, Ct, Mt, ee]]]), Ml = {
  __name: "FieldPlayersPenalties.ce",
  props: _e,
  setup(e) {
    const t = e, o = Yo, r = D(() => t.locale), {
      state: n,
      error: a,
      isLoading: i
    } = Ot(
      ut("/v1/playersPenaltyPeriod", t.apiKey, {
        championshipId: Number(t.championshipId),
        division: t.division
      }),
      []
    ), { page: s, change: l } = Zt({}), { sort: c, change: f } = Lt({
      sortTarget: "pim",
      orders: [{ target: "pim", direction: w }]
    }), p = D(() => kt(d(n)).teamFilter(t.teamFilterByName, ["teamName"]).playerName().sorted(c).addIndex(c.sortTarget).pagination(d(s), t.limit).value()), m = D(() => {
      var g;
      return (g = p.value) == null ? void 0 : g.totalItems;
    });
    return (g, h) => (y(), $("div", null, [
      L(At, { locale: d(r) }, {
        default: R(() => {
          var u;
          return [
            (u = d(a)) != null && u.error ? (y(), J(xt, {
              key: 0,
              error: d(a).message
            }, null, 8, ["error"])) : G("", !0),
            L(oe, {
              columns: d(o),
              rows: d(p).rows,
              "is-loading": d(i),
              "hide-columns": t.hideColumns,
              sort: d(c),
              onSort: d(f)
            }, null, 8, ["columns", "rows", "is-loading", "hide-columns", "sort", "onSort"]),
            L(te, {
              page: d(s),
              "items-per-page": t.limit,
              "total-items": d(m),
              "range-length": 5,
              onChange: d(l)
            }, null, 8, ["page", "items-per-page", "total-items", "onChange"])
          ];
        }),
        _: 1
      }, 8, ["locale"])
    ]));
  }
}, Ll = /* @__PURE__ */ Q(Ml, [["styles", [jt, Ct, Mt, ee]]]), Dl = {
  __name: "GoaliesLeader.ce",
  props: {
    ..._e,
    underLimit: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = e, o = Ae, r = D(() => t.locale), n = D(() => t.underLimit ? Ta : Oa), {
      state: a,
      error: i,
      isLoading: s
    } = Ot(
      ut(n, t.apiKey, {
        championshipId: Number(t.championshipId),
        division: t.division
      }),
      []
    ), { page: l, change: c } = Zt({}), { sort: f, change: p } = Lt({
      sortTarget: "svsPercent",
      orders: [{ target: "svsPercent", direction: w }]
    }), m = D(() => kt(d(a)).teamFilter(t.teamFilterByName, ["teamName"]).playerName().sorted(f).addIndex(f.sortTarget).pagination(d(l), t.limit).value()), g = D(() => {
      var h;
      return (h = m.value) == null ? void 0 : h.totalItems;
    });
    return (h, u) => (y(), $("div", null, [
      L(At, { locale: d(r) }, {
        default: R(() => {
          var v;
          return [
            (v = d(i)) != null && v.error ? (y(), J(xt, {
              key: 0,
              error: d(i).message
            }, null, 8, ["error"])) : G("", !0),
            L(oe, {
              columns: d(o),
              rows: d(m).rows,
              "is-loading": d(s),
              "hide-columns": t.hideColumns,
              sort: d(f),
              onSort: d(p)
            }, null, 8, ["columns", "rows", "is-loading", "hide-columns", "sort", "onSort"]),
            L(te, {
              page: d(l),
              "items-per-page": t.limit,
              "total-items": d(g),
              "range-length": 5,
              onChange: d(c)
            }, null, 8, ["page", "items-per-page", "total-items", "onChange"])
          ];
        }),
        _: 1
      }, 8, ["locale"])
    ]));
  }
}, Nl = /* @__PURE__ */ Q(Dl, [["styles", [jt, Ct, Mt, ee]]]), El = {
  __name: "TeamFairplay.ce",
  props: _e,
  setup(e) {
    const t = e, o = Ea, r = D(() => t.locale), {
      state: n,
      error: a,
      isLoading: i
    } = Ot(
      ut("/v1/teamFairplayPeriod", t.apiKey, {
        championshipId: Number(t.championshipId),
        division: t.division
      }),
      []
    ), { sort: s, change: l } = Lt({
      sortTarget: "pim",
      orders: [{ target: "pim", direction: w }]
    }), c = D(() => kt(d(n)).sorted(s).addIndex(s.sortTarget).value());
    return D(() => {
      var f;
      return (f = c.value) == null ? void 0 : f.totalItems;
    }), (f, p) => (y(), $("div", null, [
      L(At, { locale: d(r) }, {
        default: R(() => {
          var m;
          return [
            (m = d(a)) != null && m.error ? (y(), J(xt, {
              key: 0,
              error: d(a).message
            }, null, 8, ["error"])) : G("", !0),
            L(oe, {
              columns: d(o),
              rows: d(c).rows,
              "is-loading": d(i),
              "hide-columns": t.hideColumns,
              sort: d(s),
              onSort: d(l)
            }, null, 8, ["columns", "rows", "is-loading", "hide-columns", "sort", "onSort"])
          ];
        }),
        _: 1
      }, 8, ["locale"])
    ]));
  }
}, Rl = /* @__PURE__ */ Q(El, [["styles", [jt, Ct, Mt, ee]]]), Po = (/* @__PURE__ */ new Map()).set("points", {
  api: "/v1/playersStatsPeriod",
  columns: ke,
  sort: {
    sortTarget: "point",
    orders: [{ target: "point", direction: w }]
  }
}).set("fieldplayers", {
  api: "/v1/playersStatsPeriod",
  columns: ke,
  sort: {
    sortTarget: "point",
    orders: [{ target: "point", direction: w }]
  }
}).set("playerspenalties", {
  api: "/v1/playersPenaltyPeriod",
  columns: Yo,
  sort: {
    sortTarget: "pim",
    orders: [{ target: "pim", direction: w }]
  }
}).set("goalies", {
  api: "/v1/playersGoaliePeriod",
  columns: Ae,
  sort: {
    sortTarget: "svsPercent",
    orders: [{ target: "svsPercent", direction: w }]
  }
}).set("goaliesunderlimit", {
  api: "/v1/playersGoalieUnderPeriod",
  columns: Ae,
  sort: {
    sortTarget: "svsPercent",
    orders: [{ target: "svsPercent", direction: w }]
  }
}), Gl = [
  {
    name: "Points",
    value: "points"
  },
  {
    name: "Field Players",
    value: "fieldplayers"
  },
  {
    name: "Field Players Penalties",
    value: "playerspenalties"
  },
  {
    name: "Goalies",
    value: "goalies"
  },
  {
    name: "Goalies under 40%",
    value: "goaliesunderlimit"
  }
], Fl = (e) => jo(ca(Do(qt("championshipId"))), Kt(ra(["championshipId", "seasonName"])))(e), Vl = {
  __name: "StatisticsProvider",
  props: {
    championshipName: {
      type: String,
      default: ""
    },
    limit: {
      type: Number,
      default: 20
    }
  },
  setup(e) {
    const t = e, o = Me({
      error: "",
      loading: !1,
      seasons: [],
      championshipId: null,
      sections: [],
      section: null,
      reports: Gl,
      currentReport: "fieldplayers",
      rows: [],
      columns: null,
      api: null
    }), r = Po.get("fieldplayers");
    o.columns = r.columns, o.api = r.api;
    const { page: n, change: a } = Zt({}), { sort: i, change: s } = Lt({
      sortTarget: "point",
      orders: [{ target: "point", direction: w }]
    }), l = async () => {
      try {
        o.loading = !0;
        const u = await ut("/v1/championshipSeasons", t.apiKey, {
          championshipName: t.championshipName
        });
        o.seasons = Fl(u), o.championshipId || (o.championshipId = io(o.seasons).championshipId), c();
      } catch (u) {
        console.log(u), o.error = u.message;
      } finally {
        o.loading = !1;
      }
    }, c = async () => {
      try {
        const u = await ut("/v1/championshipSections", t.apiKey, {
          championshipId: Number(o.championshipId)
        });
        o.sections = u.sectionName, o.section = io(o.sections), f();
      } catch (u) {
        console.log(u), o.error = u.message;
      }
    }, f = async () => {
      try {
        o.loading = !0, o.rows = [], a(1);
        const u = await ut(o.api, t.apiKey, {
          championshipId: Number(o.championshipId),
          division: o.section
        });
        o.rows = u;
      } catch (u) {
        console.log(u), o.error = u.message;
      } finally {
        o.loading = !1;
      }
    };
    l();
    const p = D(
      () => kt(o.rows).playerName().sorted(i).addIndex(i.sortTarget).pagination(d(n), t.limit).value()
    ), m = (u) => {
      o.championshipId = u.target.value, l();
    }, g = (u) => {
      o.section = u.target.value, f();
    }, h = (u) => {
      o.currentReport = u.target.value;
      const v = Po.get(u.target.value);
      o.columns = v.columns, o.api = v.api, i.sortTarget = v.sort.sortTarget, i.orders = v.sort.orders, f();
    };
    return (u, v) => dt(u.$slots, "default", dr(pr({
      ...o,
      rows: d(p),
      sort: d(i),
      page: d(n),
      onSeasonChange: m,
      onSectionChange: g,
      onReportChange: h,
      onPaginatorChange: d(a),
      onSort: d(s)
    })));
  }
}, Hl = /* @__PURE__ */ T("label", null, "Szezon", -1), Bl = ["value", "onChange"], Yl = ["value"], Ul = /* @__PURE__ */ T("label", null, "Szakasz", -1), Wl = ["onChange"], Kl = ["value"], ql = /* @__PURE__ */ T("label", null, "Riport", -1), Zl = ["value", "onChange"], Xl = ["value"], Jl = {
  __name: "Statistics.ce",
  props: {
    locale: {
      type: String,
      default: "hu"
    },
    limit: {
      type: Number,
      default: 20
    }
  },
  setup(e) {
    const t = e;
    return (o, r) => (y(), $("div", null, [
      L(At, {
        locale: t.locale
      }, {
        default: R(() => [
          L(Vl, {
            "championship-name": "Erste Liga",
            limit: t.limit
          }, {
            default: R(({
              sort: n,
              seasons: a,
              sections: i,
              championshipId: s,
              reports: l,
              columns: c,
              rows: f,
              page: p,
              loading: m,
              currentReport: g,
              onSort: h,
              onSeasonChange: u,
              onReportChange: v,
              onSectionChange: S,
              onPaginatorChange: O
            }) => [
              T("div", null, [
                T("div", null, [
                  Hl,
                  T("select", {
                    value: s,
                    onChange: u
                  }, [
                    (y(!0), $(at, null, bt(a, (P) => (y(), $("option", {
                      key: P.championshipId,
                      value: P.championshipId
                    }, U(P.seasonName), 9, Yl))), 128))
                  ], 40, Bl)
                ]),
                T("div", null, [
                  Ul,
                  T("select", { onChange: S }, [
                    (y(!0), $(at, null, bt(i, (P) => (y(), $("option", {
                      key: P,
                      value: P
                    }, U(P), 9, Kl))), 128))
                  ], 40, Wl)
                ]),
                T("div", null, [
                  ql,
                  T("select", {
                    value: g,
                    onChange: v
                  }, [
                    (y(!0), $(at, null, bt(l, ({ name: P, value: C }) => (y(), $("option", {
                      key: C,
                      value: C
                    }, U(P), 9, Xl))), 128))
                  ], 40, Zl)
                ])
              ]),
              L(oe, {
                columns: c,
                rows: f.rows,
                sort: n,
                "is-loading": m,
                onSort: h
              }, null, 8, ["columns", "rows", "sort", "is-loading", "onSort"]),
              L(te, {
                page: p,
                "items-per-page": t.limit,
                "total-items": f.totalItems,
                "range-length": 5,
                onChange: O
              }, null, 8, ["page", "items-per-page", "total-items", "onChange"])
            ]),
            _: 1
          }, 8, ["limit"])
        ]),
        _: 1
      }, 8, ["locale"])
    ]));
  }
}, lc = ({ apiKey: e }) => {
  window.__MJSZ_VBR_WIDGET__ = { apiKey: e }, ic();
}, Ql = Pt(Cl), tc = Pt(xl), ec = Pt(Al), oc = Pt(Ll), rc = Pt(Nl), nc = Pt(Rl), ac = Pt(Jl);
function ic() {
  customElements.define("mjsz-vbr-fielad-players-leader", Ql), customElements.define("mjsz-vbr-schedule", tc), customElements.define("mjsz-vbr-standings", ec), customElements.define("mjsz-vbr-players-penalties", oc), customElements.define("mjsz-vbr-goalies", rc), customElements.define("mjsz-vbr-team-fairplay", nc), customElements.define("mjsz-vbr-statistics", ac);
}
export {
  Ql as FieldPlayersLeaderCE,
  oc as FieldPlayersPenaltiesCE,
  rc as GoaliesLeaderCE,
  tc as ScheduleCE,
  ec as StandingsCE,
  ac as StatisticsCE,
  nc as TeamFairplayCE,
  ic as register,
  lc as setup
};
