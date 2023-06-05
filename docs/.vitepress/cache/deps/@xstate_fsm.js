import "./chunk-RSJERJUL.js";

// ../node_modules/.pnpm/@xstate+fsm@2.0.0/node_modules/@xstate/fsm/es/index.js
function t(t2, n2) {
  var e2 = "function" == typeof Symbol && t2[Symbol.iterator];
  if (!e2)
    return t2;
  var r2, i2, o2 = e2.call(t2), a2 = [];
  try {
    for (; (void 0 === n2 || n2-- > 0) && !(r2 = o2.next()).done; )
      a2.push(r2.value);
  } catch (t3) {
    i2 = { error: t3 };
  } finally {
    try {
      r2 && !r2.done && (e2 = o2.return) && e2.call(o2);
    } finally {
      if (i2)
        throw i2.error;
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
function i(t2) {
  return { type: "xstate.assign", assignment: t2 };
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
  var r2 = n2, i2 = false;
  return [t2.filter(function(t3) {
    if ("xstate.assign" === t3.type) {
      i2 = true;
      var n3 = Object.assign({}, r2);
      return "function" == typeof t3.assignment ? n3 = t3.assignment(r2, e2) : Object.keys(t3.assignment).forEach(function(i3) {
        n3[i3] = "function" == typeof t3.assignment[i3] ? t3.assignment[i3](r2, e2) : t3.assignment[i3];
      }), r2 = n3, false;
    }
    return true;
  }), r2, i2];
}
function s(n2, i2) {
  void 0 === i2 && (i2 = {});
  var s2 = t(f(r(n2.states[n2.initial].entry).map(function(t2) {
    return o(t2, i2.actions);
  }), n2.context, e), 2), l2 = s2[0], v2 = s2[1], y = { config: n2, _options: i2, initialState: { value: n2.initial, actions: l2, context: v2, matches: a(n2.initial) }, transition: function(e2, i3) {
    var s3, l3, v3 = "string" == typeof e2 ? { value: e2, context: n2.context } : e2, p = v3.value, g = v3.context, d = u(i3), x = n2.states[p];
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
          b && !b.done && (l3 = h.return) && l3.call(h);
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
var l = function(t2, n2) {
  return t2.actions.forEach(function(e2) {
    var r2 = e2.exec;
    return r2 && r2(t2.context, n2);
  });
};
function v(t2) {
  var r2 = t2.initialState, i2 = n.NotStarted, o2 = /* @__PURE__ */ new Set(), c2 = { _machine: t2, send: function(e2) {
    i2 === n.Running && (r2 = t2.transition(r2, e2), l(r2, u(e2)), o2.forEach(function(t3) {
      return t3(r2);
    }));
  }, subscribe: function(t3) {
    return o2.add(t3), t3(r2), { unsubscribe: function() {
      return o2.delete(t3);
    } };
  }, start: function(o3) {
    if (o3) {
      var u2 = "object" == typeof o3 ? o3 : { context: t2.config.context, value: o3 };
      r2 = { value: u2.value, actions: [], context: u2.context, matches: a(u2.value) };
    } else
      r2 = t2.initialState;
    return i2 = n.Running, l(r2, e), c2;
  }, stop: function() {
    return i2 = n.Stopped, o2.clear(), c2;
  }, get state() {
    return r2;
  }, get status() {
    return i2;
  } };
  return c2;
}
export {
  n as InterpreterStatus,
  i as assign,
  s as createMachine,
  v as interpret
};
/*! Bundled license information:

@xstate/fsm/es/index.js:
  (*! *****************************************************************************
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
  ***************************************************************************** *)
*/
//# sourceMappingURL=@xstate_fsm.js.map
