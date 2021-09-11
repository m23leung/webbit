parcelRequire = (function (e, r, t, n) {
  var i,
    o = "function" == typeof parcelRequire && parcelRequire,
    u = "function" == typeof require && require;
  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = "function" == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && "string" == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw ((c.code = "MODULE_NOT_FOUND"), c);
      }
      (p.resolve = function (r) {
        return e[t][1][r] || r;
      }),
        (p.cache = {});
      var l = (r[t] = new f.Module(t));
      e[t][0].call(l.exports, p, l, l.exports, this);
    }
    return r[t].exports;
    function p(e) {
      return f(p.resolve(e));
    }
  }
  (f.isParcelRequire = !0),
    (f.Module = function (e) {
      (this.id = e), (this.bundle = f), (this.exports = {});
    }),
    (f.modules = e),
    (f.cache = r),
    (f.parent = o),
    (f.register = function (r, t) {
      e[r] = [
        function (e, r) {
          r.exports = t;
        },
        {},
      ];
    });
  for (var c = 0; c < t.length; c++)
    try {
      f(t[c]);
    } catch (e) {
      i || (i = e);
    }
  if (t.length) {
    var l = f(t[t.length - 1]);
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = l)
      : "function" == typeof define && define.amd
      ? define(function () {
          return l;
        })
      : n && (this[n] = l);
  }
  if (((parcelRequire = f), i)) throw i;
  return f;
})(
  {
    aSor: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.render = L),
          (exports.hydrate = M),
          (exports.h = exports.createElement = a),
          (exports.Fragment = v),
          (exports.createRef = h),
          (exports.Component = y),
          (exports.cloneElement = F),
          (exports.createContext = R),
          (exports.toChildArray = C),
          (exports._unmount = W),
          (exports.options = exports.isValidElement = void 0);
        var e,
          t,
          n,
          o,
          _,
          l,
          r,
          i,
          u = {},
          s = [],
          c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
        function p(e, t) {
          for (var n in t) e[n] = t[n];
          return e;
        }
        function f(e) {
          var t = e.parentNode;
          t && t.removeChild(e);
        }
        function a(e, t, n) {
          var o,
            _ = arguments,
            l = {};
          for (o in t) "key" !== o && "ref" !== o && (l[o] = t[o]);
          if (arguments.length > 3)
            for (n = [n], o = 3; o < arguments.length; o++) n.push(_[o]);
          if (
            (null != n && (l.children = n),
            "function" == typeof e && null != e.defaultProps)
          )
            for (o in e.defaultProps)
              void 0 === l[o] && (l[o] = e.defaultProps[o]);
          return d(e, l, t && t.key, t && t.ref, null);
        }
        function d(t, n, o, _, l) {
          var r = {
            type: t,
            props: n,
            key: o,
            ref: _,
            __k: null,
            __: null,
            __b: 0,
            __e: null,
            __d: void 0,
            __c: null,
            constructor: void 0,
            __v: l,
          };
          return null == l && (r.__v = r), e.vnode && e.vnode(r), r;
        }
        function h() {
          return {};
        }
        function v(e) {
          return e.children;
        }
        function y(e, t) {
          (this.props = e), (this.context = t);
        }
        function m(e, t) {
          if (null == t) return e.__ ? m(e.__, e.__.__k.indexOf(e) + 1) : null;
          for (var n; t < e.__k.length; t++)
            if (null != (n = e.__k[t]) && null != n.__e) return n.__e;
          return "function" == typeof e.type ? m(e) : null;
        }
        function k(e) {
          var t, n;
          if (null != (e = e.__) && null != e.__c) {
            for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)
              if (null != (n = e.__k[t]) && null != n.__e) {
                e.__e = e.__c.base = n.__e;
                break;
              }
            return k(e);
          }
        }
        function g(t) {
          ((!t.__d && (t.__d = !0) && n.push(t) && !o++) ||
            l !== e.debounceRendering) &&
            ((l = e.debounceRendering) || _)(x);
        }
        function x() {
          for (var e; (o = n.length); )
            (e = n.sort(function (e, t) {
              return e.__v.__b - t.__v.__b;
            })),
              (n = []),
              e.some(function (e) {
                var t, n, o, _, l, r, i;
                e.__d &&
                  ((r = (l = (t = e).__v).__e),
                  (i = t.__P) &&
                    ((n = []),
                    ((o = p({}, l)).__v = o),
                    (_ = N(
                      i,
                      l,
                      o,
                      t.__n,
                      void 0 !== i.ownerSVGElement,
                      null,
                      n,
                      null == r ? m(l) : r
                    )),
                    U(n, l),
                    _ != r && k(l)));
              });
        }
        function b(e, t, n, o, _, l, r, i, c) {
          var p,
            a,
            d,
            h,
            v,
            y,
            k,
            g = (n && n.__k) || s,
            x = g.length;
          if (
            (i == u && (i = null != l ? l[0] : x ? m(n, 0) : null),
            (p = 0),
            (t.__k = C(t.__k, function (n) {
              if (null != n) {
                if (
                  ((n.__ = t),
                  (n.__b = t.__b + 1),
                  null === (d = g[p]) ||
                    (d && n.key == d.key && n.type === d.type))
                )
                  g[p] = void 0;
                else
                  for (a = 0; a < x; a++) {
                    if ((d = g[a]) && n.key == d.key && n.type === d.type) {
                      g[a] = void 0;
                      break;
                    }
                    d = null;
                  }
                if (
                  ((h = N(e, n, (d = d || u), o, _, l, r, i, c)),
                  (a = n.ref) &&
                    d.ref != a &&
                    (k || (k = []),
                    d.ref && k.push(d.ref, null, n),
                    k.push(a, n.__c || h, n)),
                  null != h)
                ) {
                  var s;
                  if ((null == y && (y = h), void 0 !== n.__d))
                    (s = n.__d), (n.__d = void 0);
                  else if (l == d || h != i || null == h.parentNode) {
                    e: if (null == i || i.parentNode !== e)
                      e.appendChild(h), (s = null);
                    else {
                      for (v = i, a = 0; (v = v.nextSibling) && a < x; a += 2)
                        if (v == h) break e;
                      e.insertBefore(h, i), (s = i);
                    }
                    "option" == t.type && (e.value = "");
                  }
                  (i = void 0 !== s ? s : h.nextSibling),
                    "function" == typeof t.type && (t.__d = i);
                } else i && d.__e == i && i.parentNode != e && (i = m(d));
              }
              return p++, n;
            })),
            (t.__e = y),
            null != l && "function" != typeof t.type)
          )
            for (p = l.length; p--; ) null != l[p] && f(l[p]);
          for (p = x; p--; ) null != g[p] && W(g[p], g[p]);
          if (k) for (p = 0; p < k.length; p++) T(k[p], k[++p], k[++p]);
        }
        function C(e, t, n) {
          if ((null == n && (n = []), null == e || "boolean" == typeof e))
            t && n.push(t(null));
          else if (Array.isArray(e))
            for (var o = 0; o < e.length; o++) C(e[o], t, n);
          else
            n.push(
              t
                ? t(
                    "string" == typeof e || "number" == typeof e
                      ? d(null, e, null, null, e)
                      : null != e.__e || null != e.__c
                      ? d(e.type, e.props, e.key, null, e.__v)
                      : e
                  )
                : e
            );
          return n;
        }
        function w(e, t, n, o, _) {
          var l;
          for (l in n)
            "children" === l || "key" === l || l in t || P(e, l, null, n[l], o);
          for (l in t)
            (_ && "function" != typeof t[l]) ||
              "children" === l ||
              "key" === l ||
              "value" === l ||
              "checked" === l ||
              n[l] === t[l] ||
              P(e, l, t[l], n[l], o);
        }
        function S(e, t, n) {
          "-" === t[0]
            ? e.setProperty(t, n)
            : (e[t] =
                "number" == typeof n && !1 === c.test(t)
                  ? n + "px"
                  : null == n
                  ? ""
                  : n);
        }
        function P(e, t, n, o, _) {
          var l, r, i, u, s;
          if (
            (_
              ? "className" === t && (t = "class")
              : "class" === t && (t = "className"),
            "style" === t)
          )
            if (((l = e.style), "string" == typeof n)) l.cssText = n;
            else {
              if (("string" == typeof o && ((l.cssText = ""), (o = null)), o))
                for (u in o) (n && u in n) || S(l, u, "");
              if (n) for (s in n) (o && n[s] === o[s]) || S(l, s, n[s]);
            }
          else
            "o" === t[0] && "n" === t[1]
              ? ((r = t !== (t = t.replace(/Capture$/, ""))),
                (i = t.toLowerCase()),
                (t = (i in e ? i : t).slice(2)),
                n
                  ? (o || e.addEventListener(t, E, r),
                    ((e.l || (e.l = {}))[t] = n))
                  : e.removeEventListener(t, E, r))
              : "list" !== t &&
                "tagName" !== t &&
                "form" !== t &&
                "type" !== t &&
                "size" !== t &&
                !_ &&
                t in e
              ? (e[t] = null == n ? "" : n)
              : "function" != typeof n &&
                "dangerouslySetInnerHTML" !== t &&
                (t !== (t = t.replace(/^xlink:?/, ""))
                  ? null == n || !1 === n
                    ? e.removeAttributeNS(
                        "http://www.w3.org/1999/xlink",
                        t.toLowerCase()
                      )
                    : e.setAttributeNS(
                        "http://www.w3.org/1999/xlink",
                        t.toLowerCase(),
                        n
                      )
                  : null == n || (!1 === n && !/^ar/.test(t))
                  ? e.removeAttribute(t)
                  : e.setAttribute(t, n));
        }
        function E(t) {
          this.l[t.type](e.event ? e.event(t) : t);
        }
        function N(t, n, o, _, l, r, i, u, s) {
          var c,
            f,
            a,
            d,
            h,
            m,
            k,
            g,
            x,
            C,
            w = n.type;
          if (void 0 !== n.constructor) return null;
          (c = e.__b) && c(n);
          try {
            e: if ("function" == typeof w) {
              if (
                ((g = n.props),
                (x = (c = w.contextType) && _[c.__c]),
                (C = c ? (x ? x.props.value : c.__) : _),
                o.__c
                  ? (k = (f = n.__c = o.__c).__ = f.__E)
                  : ("prototype" in w && w.prototype.render
                      ? (n.__c = f = new w(g, C))
                      : ((n.__c = f = new y(g, C)),
                        (f.constructor = w),
                        (f.render = A)),
                    x && x.sub(f),
                    (f.props = g),
                    f.state || (f.state = {}),
                    (f.context = C),
                    (f.__n = _),
                    (a = f.__d = !0),
                    (f.__h = [])),
                null == f.__s && (f.__s = f.state),
                null != w.getDerivedStateFromProps &&
                  (f.__s == f.state && (f.__s = p({}, f.__s)),
                  p(f.__s, w.getDerivedStateFromProps(g, f.__s))),
                (d = f.props),
                (h = f.state),
                a)
              )
                null == w.getDerivedStateFromProps &&
                  null != f.componentWillMount &&
                  f.componentWillMount(),
                  null != f.componentDidMount &&
                    f.__h.push(f.componentDidMount);
              else {
                if (
                  (null == w.getDerivedStateFromProps &&
                    g !== d &&
                    null != f.componentWillReceiveProps &&
                    f.componentWillReceiveProps(g, C),
                  (!f.__e &&
                    null != f.shouldComponentUpdate &&
                    !1 === f.shouldComponentUpdate(g, f.__s, C)) ||
                    (n.__v === o.__v && !f.__))
                ) {
                  for (
                    f.props = g,
                      f.state = f.__s,
                      n.__v !== o.__v && (f.__d = !1),
                      f.__v = n,
                      n.__e = o.__e,
                      n.__k = o.__k,
                      f.__h.length && i.push(f),
                      c = 0;
                    c < n.__k.length;
                    c++
                  )
                    n.__k[c] && (n.__k[c].__ = n);
                  break e;
                }
                null != f.componentWillUpdate &&
                  f.componentWillUpdate(g, f.__s, C),
                  null != f.componentDidUpdate &&
                    f.__h.push(function () {
                      f.componentDidUpdate(d, h, m);
                    });
              }
              (f.context = C),
                (f.props = g),
                (f.state = f.__s),
                (c = e.__r) && c(n),
                (f.__d = !1),
                (f.__v = n),
                (f.__P = t),
                (c = f.render(f.props, f.state, f.context)),
                (n.__k =
                  null != c && c.type == v && null == c.key
                    ? c.props.children
                    : Array.isArray(c)
                    ? c
                    : [c]),
                null != f.getChildContext &&
                  (_ = p(p({}, _), f.getChildContext())),
                a ||
                  null == f.getSnapshotBeforeUpdate ||
                  (m = f.getSnapshotBeforeUpdate(d, h)),
                b(t, n, o, _, l, r, i, u, s),
                (f.base = n.__e),
                f.__h.length && i.push(f),
                k && (f.__E = f.__ = null),
                (f.__e = !1);
            } else
              null == r && n.__v === o.__v
                ? ((n.__k = o.__k), (n.__e = o.__e))
                : (n.__e = D(o.__e, n, o, _, l, r, i, s));
            (c = e.diffed) && c(n);
          } catch (t) {
            (n.__v = null), e.__e(t, n, o);
          }
          return n.__e;
        }
        function U(t, n) {
          e.__c && e.__c(n, t),
            t.some(function (n) {
              try {
                (t = n.__h),
                  (n.__h = []),
                  t.some(function (e) {
                    e.call(n);
                  });
              } catch (t) {
                e.__e(t, n.__v);
              }
            });
        }
        function D(e, t, n, o, _, l, r, i) {
          var c,
            p,
            f,
            a,
            d,
            h = n.props,
            v = t.props;
          if (((_ = "svg" === t.type || _), null != l))
            for (c = 0; c < l.length; c++)
              if (
                null != (p = l[c]) &&
                ((null === t.type
                  ? 3 === p.nodeType
                  : p.localName === t.type) ||
                  e == p)
              ) {
                (e = p), (l[c] = null);
                break;
              }
          if (null == e) {
            if (null === t.type) return document.createTextNode(v);
            (e = _
              ? document.createElementNS("http://www.w3.org/2000/svg", t.type)
              : document.createElement(t.type, v.is && { is: v.is })),
              (l = null),
              (i = !1);
          }
          if (null === t.type) h !== v && e.data != v && (e.data = v);
          else {
            if (
              (null != l && (l = s.slice.call(e.childNodes)),
              (f = (h = n.props || u).dangerouslySetInnerHTML),
              (a = v.dangerouslySetInnerHTML),
              !i)
            ) {
              if (h === u)
                for (h = {}, d = 0; d < e.attributes.length; d++)
                  h[e.attributes[d].name] = e.attributes[d].value;
              (a || f) &&
                ((a && f && a.__html == f.__html) ||
                  (e.innerHTML = (a && a.__html) || ""));
            }
            w(e, v, h, _, i),
              a
                ? (t.__k = [])
                : ((t.__k = t.props.children),
                  b(e, t, n, o, "foreignObject" !== t.type && _, l, r, u, i)),
              i ||
                ("value" in v &&
                  void 0 !== (c = v.value) &&
                  c !== e.value &&
                  P(e, "value", c, h.value, !1),
                "checked" in v &&
                  void 0 !== (c = v.checked) &&
                  c !== e.checked &&
                  P(e, "checked", c, h.checked, !1));
          }
          return e;
        }
        function T(t, n, o) {
          try {
            "function" == typeof t ? t(n) : (t.current = n);
          } catch (t) {
            e.__e(t, o);
          }
        }
        function W(t, n, o) {
          var _, l, r;
          if (
            (e.unmount && e.unmount(t),
            (_ = t.ref) &&
              ((_.current && _.current !== t.__e) || T(_, null, n)),
            o || "function" == typeof t.type || (o = null != (l = t.__e)),
            (t.__e = t.__d = void 0),
            null != (_ = t.__c))
          ) {
            if (_.componentWillUnmount)
              try {
                _.componentWillUnmount();
              } catch (t) {
                e.__e(t, n);
              }
            _.base = _.__P = null;
          }
          if ((_ = t.__k)) for (r = 0; r < _.length; r++) _[r] && W(_[r], n, o);
          null != l && f(l);
        }
        function A(e, t, n) {
          return this.constructor(e, n);
        }
        function L(t, n, o) {
          var _, l, i;
          e.__ && e.__(t, n),
            (l = (_ = o === r) ? null : (o && o.__k) || n.__k),
            (t = a(v, null, [t])),
            (i = []),
            N(
              n,
              ((_ ? n : o || n).__k = t),
              l || u,
              u,
              void 0 !== n.ownerSVGElement,
              o && !_ ? [o] : l ? null : s.slice.call(n.childNodes),
              i,
              o || u,
              _
            ),
            U(i, t);
        }
        function M(e, t) {
          L(e, t, r);
        }
        function F(e, t) {
          var n, o;
          for (o in ((t = p(p({}, e.props), t)),
          arguments.length > 2 && (t.children = s.slice.call(arguments, 2)),
          (n = {}),
          t))
            "key" !== o && "ref" !== o && (n[o] = t[o]);
          return d(e.type, n, t.key || e.key, t.ref || e.ref, null);
        }
        function R(e) {
          var t = {},
            n = {
              __c: "__cC" + i++,
              __: e,
              Consumer: function (e, t) {
                return e.children(t);
              },
              Provider: function (e) {
                var o,
                  _ = this;
                return (
                  this.getChildContext ||
                    ((o = []),
                    (this.getChildContext = function () {
                      return (t[n.__c] = _), t;
                    }),
                    (this.shouldComponentUpdate = function (e) {
                      _.props.value !== e.value &&
                        o.some(function (t) {
                          (t.context = e.value), g(t);
                        });
                    }),
                    (this.sub = function (e) {
                      o.push(e);
                      var t = e.componentWillUnmount;
                      e.componentWillUnmount = function () {
                        o.splice(o.indexOf(e), 1), t && t.call(e);
                      };
                    })),
                  e.children
                );
              },
            };
          return (n.Consumer.contextType = n), (n.Provider.__ = n), n;
        }
        (exports.isValidElement = t),
          (exports.options = e),
          (exports.options = e =
            {
              __e: function (e, t) {
                for (var n, o; (t = t.__); )
                  if ((n = t.__c) && !n.__)
                    try {
                      if (
                        (n.constructor &&
                          null != n.constructor.getDerivedStateFromError &&
                          ((o = !0),
                          n.setState(
                            n.constructor.getDerivedStateFromError(e)
                          )),
                        null != n.componentDidCatch &&
                          ((o = !0), n.componentDidCatch(e)),
                        o)
                      )
                        return g((n.__E = n));
                    } catch (t) {
                      e = t;
                    }
                throw e;
              },
            }),
          (exports.isValidElement = t =
            function (e) {
              return null != e && void 0 === e.constructor;
            }),
          (y.prototype.setState = function (e, t) {
            var n;
            (n =
              this.__s !== this.state
                ? this.__s
                : (this.__s = p({}, this.state))),
              "function" == typeof e && (e = e(n, this.props)),
              e && p(n, e),
              null != e && this.__v && (t && this.__h.push(t), g(this));
          }),
          (y.prototype.forceUpdate = function (e) {
            this.__v && ((this.__e = !0), e && this.__h.push(e), g(this));
          }),
          (y.prototype.render = v),
          (n = []),
          (o = 0),
          (_ =
            "function" == typeof Promise
              ? Promise.prototype.then.bind(Promise.resolve())
              : setTimeout),
          (r = u),
          (i = 0);
      },
      {},
    ],
    UDzr: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.actionCreator = o),
          (exports.setter = r),
          (exports.bindActionCreator = s),
          (exports.StatelessComponent = void 0);
        var e = require("preact");
        const t = new Set();
        function o(e) {
          if (t.has(e)) throw new Error(`Cannot re-use action type name: ${e}`);
          const o = (t = {}) => ({ type: e, payload: t });
          return (o.matches = (t) => t.type === e), o;
        }
        function r(e, t) {
          return (o = t, r) => (e.matches(r) ? r.payload : o);
        }
        class n extends e.Component {}
        function s(e, t) {
          return (o) => {
            e(t(o));
          };
        }
        exports.StatelessComponent = n;
      },
      { preact: "aSor" },
    ],
    tDuZ: [
      function (require, module, exports) {
        "use strict";
        function t(t, i, s) {
          return t < i ? i : t > s ? s : t;
        }
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.clamp = t),
          (exports.Rect = exports.AffineTransform = exports.Vec2 = void 0);
        let i = (() => {
          class i {
            constructor(t, i) {
              (this.x = t), (this.y = i);
            }
            withX(t) {
              return new i(t, this.y);
            }
            withY(t) {
              return new i(this.x, t);
            }
            plus(t) {
              return new i(this.x + t.x, this.y + t.y);
            }
            minus(t) {
              return new i(this.x - t.x, this.y - t.y);
            }
            times(t) {
              return new i(this.x * t, this.y * t);
            }
            timesPointwise(t) {
              return new i(this.x * t.x, this.y * t.y);
            }
            dividedByPointwise(t) {
              return new i(this.x / t.x, this.y / t.y);
            }
            dot(t) {
              return this.x * t.x + this.y * t.y;
            }
            equals(t) {
              return this.x === t.x && this.y === t.y;
            }
            approxEquals(t, i = 1e-9) {
              return Math.abs(this.x - t.x) < i && Math.abs(this.y - t.y) < i;
            }
            length2() {
              return this.dot(this);
            }
            length() {
              return Math.sqrt(this.length2());
            }
            abs() {
              return new i(Math.abs(this.x), Math.abs(this.y));
            }
            static min(t, s) {
              return new i(Math.min(t.x, s.x), Math.min(t.y, s.y));
            }
            static max(t, s) {
              return new i(Math.max(t.x, s.x), Math.max(t.y, s.y));
            }
            static clamp(s, e, r) {
              return new i(t(s.x, e.x, r.x), t(s.y, e.y, r.y));
            }
            flatten() {
              return [this.x, this.y];
            }
          }
          return (i.zero = new i(0, 0)), (i.unit = new i(1, 1)), i;
        })();
        exports.Vec2 = i;
        class s {
          constructor(t = 1, i = 0, s = 0, e = 0, r = 1, n = 0) {
            (this.m00 = t),
              (this.m01 = i),
              (this.m02 = s),
              (this.m10 = e),
              (this.m11 = r),
              (this.m12 = n);
          }
          withScale(t) {
            let { m00: i, m01: e, m02: r, m10: n, m11: h, m12: m } = this;
            return (i = t.x), (h = t.y), new s(i, e, r, n, h, m);
          }
          static withScale(t) {
            return new s().withScale(t);
          }
          scaledBy(t) {
            return s.withScale(t).times(this);
          }
          getScale() {
            return new i(this.m00, this.m11);
          }
          withTranslation(t) {
            let { m00: i, m01: e, m02: r, m10: n, m11: h, m12: m } = this;
            return (r = t.x), (m = t.y), new s(i, e, r, n, h, m);
          }
          static withTranslation(t) {
            return new s().withTranslation(t);
          }
          getTranslation() {
            return new i(this.m02, this.m12);
          }
          translatedBy(t) {
            return s.withTranslation(t).times(this);
          }
          static betweenRects(t, e) {
            return s
              .withTranslation(t.origin.times(-1))
              .scaledBy(new i(e.size.x / t.size.x, e.size.y / t.size.y))
              .translatedBy(e.origin);
          }
          times(t) {
            const i = this.m00 * t.m00 + this.m01 * t.m10,
              e = this.m00 * t.m01 + this.m01 * t.m11,
              r = this.m00 * t.m02 + this.m01 * t.m12 + this.m02,
              n = this.m10 * t.m00 + this.m11 * t.m10,
              h = this.m10 * t.m01 + this.m11 * t.m11,
              m = this.m10 * t.m02 + this.m11 * t.m12 + this.m12;
            return new s(i, e, r, n, h, m);
          }
          equals(t) {
            return (
              this.m00 == t.m00 &&
              this.m01 == t.m01 &&
              this.m02 == t.m02 &&
              this.m10 == t.m10 &&
              this.m11 == t.m11 &&
              this.m12 == t.m12
            );
          }
          approxEquals(t, i = 1e-9) {
            return (
              Math.abs(this.m00 - t.m00) < i &&
              Math.abs(this.m01 - t.m01) < i &&
              Math.abs(this.m02 - t.m02) < i &&
              Math.abs(this.m10 - t.m10) < i &&
              Math.abs(this.m11 - t.m11) < i &&
              Math.abs(this.m12 - t.m12) < i
            );
          }
          timesScalar(t) {
            const { m00: i, m01: e, m02: r, m10: n, m11: h, m12: m } = this;
            return new s(t * i, t * e, t * r, t * n, t * h, t * m);
          }
          det() {
            const { m00: t, m01: i, m02: s, m10: e, m11: r, m12: n } = this;
            return (
              t * (1 * r - 0 * n) - i * (1 * e - 0 * n) + s * (0 * e - 0 * r)
            );
          }
          adj() {
            const { m00: t, m01: i, m02: e, m10: r, m11: n, m12: h } = this;
            return new s(
              +(1 * n - 0 * h),
              -(1 * i - 0 * e),
              +(i * h - e * n),
              -(1 * r - 0 * h),
              +(1 * t - 0 * e),
              -(t * h - e * r)
            );
          }
          inverted() {
            const t = this.det();
            return 0 === t ? null : this.adj().timesScalar(1 / t);
          }
          transformVector(t) {
            return new i(
              t.x * this.m00 + t.y * this.m01,
              t.x * this.m10 + t.y * this.m11
            );
          }
          inverseTransformVector(t) {
            const i = this.inverted();
            return i ? i.transformVector(t) : null;
          }
          transformPosition(t) {
            return new i(
              t.x * this.m00 + t.y * this.m01 + this.m02,
              t.x * this.m10 + t.y * this.m11 + this.m12
            );
          }
          inverseTransformPosition(t) {
            const i = this.inverted();
            return i ? i.transformPosition(t) : null;
          }
          transformRect(t) {
            const i = this.transformVector(t.size),
              s = this.transformPosition(t.origin);
            return i.x < 0 && i.y < 0
              ? new e(s.plus(i), i.abs())
              : i.x < 0
              ? new e(s.withX(s.x + i.x), i.abs())
              : i.y < 0
              ? new e(s.withY(s.y + i.y), i.abs())
              : new e(s, i);
          }
          inverseTransformRect(t) {
            const i = this.inverted();
            return i ? i.transformRect(t) : null;
          }
          flatten() {
            return [
              this.m00,
              this.m10,
              0,
              this.m01,
              this.m11,
              0,
              this.m02,
              this.m12,
              1,
            ];
          }
        }
        exports.AffineTransform = s;
        let e = (() => {
          class s {
            constructor(t, i) {
              (this.origin = t), (this.size = i);
            }
            isEmpty() {
              return 0 == this.width() || 0 == this.height();
            }
            width() {
              return this.size.x;
            }
            height() {
              return this.size.y;
            }
            left() {
              return this.origin.x;
            }
            right() {
              return this.left() + this.width();
            }
            top() {
              return this.origin.y;
            }
            bottom() {
              return this.top() + this.height();
            }
            topLeft() {
              return this.origin;
            }
            topRight() {
              return this.origin.plus(new i(this.width(), 0));
            }
            bottomRight() {
              return this.origin.plus(this.size);
            }
            bottomLeft() {
              return this.origin.plus(new i(0, this.height()));
            }
            withOrigin(t) {
              return new s(t, this.size);
            }
            withSize(t) {
              return new s(this.origin, t);
            }
            closestPointTo(s) {
              return new i(
                t(s.x, this.left(), this.right()),
                t(s.y, this.top(), this.bottom())
              );
            }
            distanceFrom(t) {
              return t.minus(this.closestPointTo(t)).length();
            }
            contains(t) {
              return 0 === this.distanceFrom(t);
            }
            hasIntersectionWith(t) {
              const i = Math.max(this.top(), t.top());
              if (Math.max(i, Math.min(this.bottom(), t.bottom())) - i == 0)
                return !1;
              const s = Math.max(this.left(), t.left());
              return Math.max(s, Math.min(this.right(), t.right())) - s != 0;
            }
            intersectWith(t) {
              const e = i.max(this.topLeft(), t.topLeft()),
                r = i.max(e, i.min(this.bottomRight(), t.bottomRight()));
              return new s(e, r.minus(e));
            }
            equals(t) {
              return this.origin.equals(t.origin) && this.size.equals(t.size);
            }
            approxEquals(t) {
              return (
                this.origin.approxEquals(t.origin) &&
                this.size.approxEquals(t.size)
              );
            }
            area() {
              return this.size.x * this.size.y;
            }
          }
          return (
            (s.empty = new s(i.zero, i.zero)),
            (s.unit = new s(i.zero, i.unit)),
            (s.NDC = new s(new i(-1, -1), new i(2, 2))),
            s
          );
        })();
        exports.Rect = e;
      },
      {},
    ],
    n9w8: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.createFlamechartViewStateReducer = c),
          (exports.FlamechartID = void 0);
        var e,
          t = require("../lib/math"),
          a = require("./actions");
        function c(e, c) {
          let r = {
            hover: null,
            selectedNode: null,
            configSpaceViewportRect: t.Rect.empty,
            logicalSpaceViewportSize: t.Vec2.zero,
          };
          function s(t) {
            const { payload: a } = t;
            return a.args.id === e && a.profileIndex === c;
          }
          return (e = r, t) => {
            if (a.actions.flamechart.setHoveredNode.matches(t) && s(t)) {
              const { hover: a } = t.payload.args;
              return Object.assign(Object.assign({}, e), { hover: a });
            }
            if (a.actions.flamechart.setSelectedNode.matches(t) && s(t)) {
              const { selectedNode: a } = t.payload.args;
              return Object.assign(Object.assign({}, e), { selectedNode: a });
            }
            if (
              a.actions.flamechart.setConfigSpaceViewportRect.matches(t) &&
              s(t)
            ) {
              const { configSpaceViewportRect: a } = t.payload.args;
              return Object.assign(Object.assign({}, e), {
                configSpaceViewportRect: a,
              });
            }
            if (
              a.actions.flamechart.setLogicalSpaceViewportSize.matches(t) &&
              s(t)
            ) {
              const { logicalSpaceViewportSize: a } = t.payload.args;
              return Object.assign(Object.assign({}, e), {
                logicalSpaceViewportSize: a,
              });
            }
            return a.actions.setViewMode.matches(t)
              ? Object.assign(Object.assign({}, e), { hover: null })
              : e;
          };
        }
        (exports.FlamechartID = e),
          (function (e) {
            (e.LEFT_HEAVY = "LEFT_HEAVY"),
              (e.CHRONO = "CHRONO"),
              (e.SANDWICH_INVERTED_CALLERS = "SANDWICH_INVERTED_CALLERS"),
              (e.SANDWICH_CALLEES = "SANDWICH_CALLEES");
          })(e || (exports.FlamechartID = e = {}));
      },
      { "../lib/math": "tDuZ", "./actions": "M9Ab" },
    ],
    kAzy: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.createSandwichView = l);
        var e = require("./flamechart-view-state"),
          a = require("./actions");
        function l(l) {
          const r = (0, e.createFlamechartViewStateReducer)(
              e.FlamechartID.SANDWICH_CALLEES,
              l
            ),
            t = (0, e.createFlamechartViewStateReducer)(
              e.FlamechartID.SANDWICH_INVERTED_CALLERS,
              l
            );
          return (e = { callerCallee: null }, c) => {
            if (
              a.actions.sandwichView.setSelectedFrame.matches(c) &&
              (function (e) {
                const { payload: a } = e;
                return a.profileIndex === l;
              })(c)
            )
              return null == c.payload.args
                ? Object.assign(Object.assign({}, e), { callerCallee: null })
                : Object.assign(Object.assign({}, e), {
                    callerCallee: {
                      selectedFrame: c.payload.args,
                      calleeFlamegraph: r(void 0, c),
                      invertedCallerFlamegraph: t(void 0, c),
                    },
                  });
            const { callerCallee: s } = e;
            if (s) {
              const { calleeFlamegraph: a, invertedCallerFlamegraph: l } = s,
                n = r(a, c),
                i = t(l, c);
              return n === a && i === l
                ? e
                : Object.assign(Object.assign({}, e), {
                    callerCallee: Object.assign(Object.assign({}, s), {
                      calleeFlamegraph: n,
                      invertedCallerFlamegraph: i,
                    }),
                  });
            }
            return e;
          };
        }
      },
      { "./flamechart-view-state": "n9w8", "./actions": "M9Ab" },
    ],
    ucYa: [
      function (require, module, exports) {
        "use strict";
        function t(t) {
          return t[t.length - 1] || null;
        }
        function e(t, e) {
          t.sort(function (t, r) {
            const n = e(t),
              o = e(r);
            return n < o ? -1 : n > o ? 1 : 0;
          });
        }
        function r(t, e, r) {
          return t.has(e) || t.set(e, r(e)), t.get(e);
        }
        function n(t, e, r) {
          return t.has(e) ? t.get(e) : r(e);
        }
        function o(t, e) {
          if (!t.has(e)) throw new Error(`Expected key ${e}`);
          return t.get(e);
        }
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.lastOf = t),
          (exports.sortBy = e),
          (exports.getOrInsert = r),
          (exports.getOrElse = n),
          (exports.getOrThrow = o),
          (exports.itMap = l),
          (exports.itForEach = u),
          (exports.itReduce = i),
          (exports.zeroPad = c),
          (exports.formatPercent = a),
          (exports.fract = f),
          (exports.triangle = h),
          (exports.findValueBisect = g),
          (exports.findIndexBisect = p),
          (exports.noop = x),
          (exports.objectsHaveShallowEquality = d),
          (exports.memoizeByShallowEquality = y),
          (exports.memoizeByReference = w),
          (exports.lazyStatic = E),
          (exports.decodeBase64 = A),
          (exports.KeyedSet = void 0);
        class s {
          constructor() {
            this.map = new Map();
          }
          getOrInsert(t) {
            const e = t.key,
              r = this.map.get(e);
            return r || (this.map.set(e, t), t);
          }
          forEach(t) {
            this.map.forEach(t);
          }
          [Symbol.iterator]() {
            return this.map.values();
          }
        }
        function* l(t, e) {
          for (let r of t) yield e(r);
        }
        function u(t, e) {
          for (let r of t) e(r);
        }
        function i(t, e, r) {
          let n = r;
          for (let o of t) n = e(n, o);
          return n;
        }
        function c(t, e) {
          return new Array(Math.max(e - t.length, 0) + 1).join("0") + t;
        }
        function a(t) {
          let e = `${t.toFixed(0)}%`;
          return (
            100 === t
              ? (e = "100%")
              : t > 99
              ? (e = ">99%")
              : t < 0.01
              ? (e = "<0.01%")
              : t < 1
              ? (e = `${t.toFixed(2)}%`)
              : t < 10 && (e = `${t.toFixed(1)}%`),
            e
          );
        }
        function f(t) {
          return t - Math.floor(t);
        }
        function h(t) {
          return 2 * Math.abs(f(t) - 0.5) - 1;
        }
        function g(t, e, r, n, o = 1) {
          for (console.assert(!isNaN(o) && !isNaN(n)); ; ) {
            if (e - t <= o) return [t, e];
            const s = (e + t) / 2;
            r(s) < n ? (t = s) : (e = s);
          }
        }
        function p(t, e) {
          if (0 === t.length) return -1;
          let r = 0,
            n = t.length - 1;
          for (; n !== r; ) {
            const o = Math.floor((r + n) / 2);
            e(t[o]) ? (n = o) : (r = o + 1);
          }
          return e(t[n]) ? n : -1;
        }
        function x(...t) {}
        function d(t, e) {
          for (let r in t) if (t[r] !== e[r]) return !1;
          for (let r in e) if (t[r] !== e[r]) return !1;
          return !0;
        }
        function y(t) {
          let e = null;
          return (r) => {
            let n;
            return null == e
              ? ((n = t(r)), (e = { args: r, result: n }), n)
              : d(e.args, r)
              ? e.result
              : ((e.args = r), (e.result = t(r)), e.result);
          };
        }
        function w(t) {
          let e = null;
          return (r) => {
            let n;
            return null == e
              ? ((n = t(r)), (e = { args: r, result: n }), n)
              : e.args === r
              ? e.result
              : ((e.args = r), (e.result = t(r)), e.result);
          };
        }
        function E(t) {
          let e = null;
          return () => (null == e && (e = { result: t() }), e.result);
        }
        exports.KeyedSet = s;
        const m = E(() => {
          const t =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            e = new Map();
          for (let r = 0; r < t.length; r++) e.set(t.charAt(r), r);
          return e.set("=", -1), e;
        });
        function A(t) {
          const e = m();
          if (t.length % 4 != 0)
            throw new Error(
              `Invalid length for base64 encoded string. Expected length % 4 = 0, got length = ${t.length}`
            );
          const r = t.length / 4;
          let n;
          n =
            t.length >= 4 && "=" === t.charAt(t.length - 1)
              ? "=" === t.charAt(t.length - 2)
                ? 3 * r - 2
                : 3 * r - 1
              : 3 * r;
          const o = new Uint8Array(n);
          let s = 0;
          for (let l = 0; l < r; l++) {
            const r = t.charAt(4 * l + 0),
              n = t.charAt(4 * l + 1),
              u = t.charAt(4 * l + 2),
              i = t.charAt(4 * l + 3),
              c = e.get(r),
              a = e.get(n),
              f = e.get(u),
              h = e.get(i);
            if (null == c || null == a || null == f || null == h)
              throw new Error(
                `Invalid quartet at indices ${4 * l} .. ${
                  4 * l + 3
                }: ${t.substring(4 * l, 4 * l + 3)}`
              );
            (o[s++] = (c << 2) | (a >> 4)),
              "=" !== u && (o[s++] = ((15 & a) << 4) | (f >> 2)),
              "=" !== i && (o[s++] = ((7 & f) << 6) | h);
          }
          if (s !== n)
            throw new Error(
              `Expected to decode ${n} bytes, but only decoded ${s})`
            );
          return o;
        }
      },
      {},
    ],
    HCyk: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.actionCreatorWithIndex = n),
          (exports.profileGroup = void 0);
        var e = require("./flamechart-view-state"),
          t = require("./sandwich-view-state"),
          i = require("../lib/typed-redux"),
          r = require("./actions"),
          a = require("../lib/math"),
          o = require("../lib/utils");
        function n(e) {
          return (0, i.actionCreator)(e);
        }
        function c(i, r) {
          const a = (0, e.createFlamechartViewStateReducer)(
              e.FlamechartID.CHRONO,
              r
            ),
            n = (0, e.createFlamechartViewStateReducer)(
              e.FlamechartID.LEFT_HEAVY,
              r
            ),
            c = (0, t.createSandwichView)(r);
          return (e, t) => {
            if (void 0 === e)
              return {
                profile: i,
                chronoViewState: a(void 0, t),
                leftHeavyViewState: n(void 0, t),
                sandwichViewState: c(void 0, t),
              };
            const r = {
              profile: i,
              chronoViewState: a(e.chronoViewState, t),
              leftHeavyViewState: n(e.leftHeavyViewState, t),
              sandwichViewState: c(e.sandwichViewState, t),
            };
            return (0, o.objectsHaveShallowEquality)(e, r) ? e : r;
          };
        }
        const l = (e = null, t) => {
          if (r.actions.setProfileGroup.matches(t)) {
            const { indexToView: e, profiles: i, name: r } = t.payload;
            return {
              indexToView: e,
              name: r,
              profiles: i.map((e, i) => c(e, i)(void 0, t)),
            };
          }
          if (null != e) {
            const { indexToView: n, profiles: l } = e,
              s = (0, a.clamp)(
                (0, i.setter)(r.actions.setProfileIndexToView, 0)(n, t),
                0,
                l.length - 1
              ),
              u = l.map((e, i) => c(e.profile, i)(e, t));
            return n === s && (0, o.objectsHaveShallowEquality)(l, u)
              ? e
              : Object.assign(Object.assign({}, e), {
                  indexToView: s,
                  profiles: u,
                });
          }
          return e;
        };
        exports.profileGroup = l;
      },
      {
        "./flamechart-view-state": "n9w8",
        "./sandwich-view-state": "kAzy",
        "../lib/typed-redux": "UDzr",
        "./actions": "M9Ab",
        "../lib/math": "tDuZ",
        "../lib/utils": "ucYa",
      },
    ],
    M9Ab: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.actions = void 0);
        var e,
          t = require("../lib/typed-redux"),
          r = require("./profiles-state");
        (exports.actions = e),
          (function (e) {
            let a, o;
            (e.setProfileGroup = (0, t.actionCreator)("setProfileGroup")),
              (e.setProfileIndexToView = (0, t.actionCreator)(
                "setProfileIndexToView"
              )),
              (e.setGLCanvas = (0, t.actionCreator)("setGLCanvas")),
              (e.setViewMode = (0, t.actionCreator)("setViewMode")),
              (e.setFlattenRecursion = (0, t.actionCreator)(
                "setFlattenRecursion"
              )),
              (e.setSearchQuery = (0, t.actionCreator)("setSearchQuery")),
              (e.setSearchIsActive = (0, t.actionCreator)("setSearchIsActive")),
              (e.setDragActive = (0, t.actionCreator)("setDragActive")),
              (e.setLoading = (0, t.actionCreator)("setLoading")),
              (e.setError = (0, t.actionCreator)("setError")),
              (e.setHashParams = (0, t.actionCreator)("setHashParams")),
              (e.setColorScheme = (0, t.actionCreator)("setColorScheme")),
              (function (e) {
                (e.setTableSortMethod = (0, t.actionCreator)(
                  "sandwichView.setTableSortMethod"
                )),
                  (e.setSelectedFrame = (0, r.actionCreatorWithIndex)(
                    "sandwichView.setSelectedFrame"
                  ));
              })((a = e.sandwichView || (e.sandwichView = {}))),
              (function (e) {
                (e.setHoveredNode = (0, r.actionCreatorWithIndex)(
                  "flamechart.setHoveredNode"
                )),
                  (e.setSelectedNode = (0, r.actionCreatorWithIndex)(
                    "flamechart.setSelectedNode"
                  )),
                  (e.setConfigSpaceViewportRect = (0, r.actionCreatorWithIndex)(
                    "flamechart.setConfigSpaceViewportRect"
                  )),
                  (e.setLogicalSpaceViewportSize = (0,
                  r.actionCreatorWithIndex)(
                    "flamechart.setLogicalSpaceViewportSpace"
                  ));
              })((o = e.flamechart || (e.flamechart = {})));
          })(e || (exports.actions = e = {}));
      },
      { "../lib/typed-redux": "UDzr", "./profiles-state": "HCyk" },
    ],
    JZ8d: [
      function (require, module, exports) {
        "use strict";
        function e(e) {
          var o,
            r = e.Symbol;
          return (
            "function" == typeof r
              ? r.observable
                ? (o = r.observable)
                : ((o = r("observable")), (r.observable = o))
              : (o = "@@observable"),
            o
          );
        }
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = e);
      },
      {},
    ],
    LkZ7: [
      function (require, module, exports) {
        var global = arguments[3];
        var e = arguments[3];
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = void 0);
        var d,
          o = t(require("./ponyfill.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        d =
          "undefined" != typeof self
            ? self
            : "undefined" != typeof window
            ? window
            : void 0 !== e
            ? e
            : "undefined" != typeof module
            ? module
            : Function("return this")();
        var u = (0, o.default)(d),
          n = u;
        exports.default = n;
      },
      { "./ponyfill.js": "JZ8d" },
    ],
    aVFJ: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.applyMiddleware = w),
          (exports.bindActionCreators = p),
          (exports.combineReducers = f),
          (exports.compose = b),
          (exports.createStore = i),
          (exports.__DO_NOT_USE__ActionTypes = void 0);
        var e = t(require("symbol-observable"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var r = function () {
            return Math.random().toString(36).substring(7).split("").join(".");
          },
          n = {
            INIT: "@@redux/INIT" + r(),
            REPLACE: "@@redux/REPLACE" + r(),
            PROBE_UNKNOWN_ACTION: function () {
              return "@@redux/PROBE_UNKNOWN_ACTION" + r();
            },
          };
        function o(e) {
          if ("object" != typeof e || null === e) return !1;
          for (var t = e; null !== Object.getPrototypeOf(t); )
            t = Object.getPrototypeOf(t);
          return Object.getPrototypeOf(e) === t;
        }
        function i(t, r, u) {
          var c;
          if (
            ("function" == typeof r && "function" == typeof u) ||
            ("function" == typeof u && "function" == typeof arguments[3])
          )
            throw new Error(
              "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function."
            );
          if (
            ("function" == typeof r && void 0 === u && ((u = r), (r = void 0)),
            void 0 !== u)
          ) {
            if ("function" != typeof u)
              throw new Error("Expected the enhancer to be a function.");
            return u(i)(t, r);
          }
          if ("function" != typeof t)
            throw new Error("Expected the reducer to be a function.");
          var a = t,
            s = r,
            f = [],
            d = f,
            p = !1;
          function l() {
            d === f && (d = f.slice());
          }
          function h() {
            if (p)
              throw new Error(
                "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store."
              );
            return s;
          }
          function y(e) {
            if ("function" != typeof e)
              throw new Error("Expected the listener to be a function.");
            if (p)
              throw new Error(
                "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribelistener for more details."
              );
            var t = !0;
            return (
              l(),
              d.push(e),
              function () {
                if (t) {
                  if (p)
                    throw new Error(
                      "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribelistener for more details."
                    );
                  (t = !1), l();
                  var r = d.indexOf(e);
                  d.splice(r, 1), (f = null);
                }
              }
            );
          }
          function b(e) {
            if (!o(e))
              throw new Error(
                "Actions must be plain objects. Use custom middleware for async actions."
              );
            if (void 0 === e.type)
              throw new Error(
                'Actions may not have an undefined "type" property. Have you misspelled a constant?'
              );
            if (p) throw new Error("Reducers may not dispatch actions.");
            try {
              (p = !0), (s = a(s, e));
            } finally {
              p = !1;
            }
            for (var t = (f = d), r = 0; r < t.length; r++) {
              (0, t[r])();
            }
            return e;
          }
          return (
            b({ type: n.INIT }),
            ((c = {
              dispatch: b,
              subscribe: y,
              getState: h,
              replaceReducer: function (e) {
                if ("function" != typeof e)
                  throw new Error("Expected the nextReducer to be a function.");
                (a = e), b({ type: n.REPLACE });
              },
            })[e.default] = function () {
              var t,
                r = y;
              return (
                ((t = {
                  subscribe: function (e) {
                    if ("object" != typeof e || null === e)
                      throw new TypeError(
                        "Expected the observer to be an object."
                      );
                    function t() {
                      e.next && e.next(h());
                    }
                    return t(), { unsubscribe: r(t) };
                  },
                })[e.default] = function () {
                  return this;
                }),
                t
              );
            }),
            c
          );
        }
        function u(e) {
          "undefined" != typeof console &&
            "function" == typeof console.error &&
            console.error(e);
          try {
            throw new Error(e);
          } catch (t) {}
        }
        function c(e, t) {
          var r = t && t.type;
          return (
            "Given " +
            ((r && 'action "' + String(r) + '"') || "an action") +
            ', reducer "' +
            e +
            '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'
          );
        }
        function a(e, t, r, i) {
          var u = Object.keys(t),
            c =
              r && r.type === n.INIT
                ? "preloadedState argument passed to createStore"
                : "previous state received by the reducer";
          if (0 === u.length)
            return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
          if (!o(e))
            return (
              "The " +
              c +
              ' has unexpected type of "' +
              {}.toString.call(e).match(/\s([a-z|A-Z]+)/)[1] +
              '". Expected argument to be an object with the following keys: "' +
              u.join('", "') +
              '"'
            );
          var a = Object.keys(e).filter(function (e) {
            return !t.hasOwnProperty(e) && !i[e];
          });
          return (
            a.forEach(function (e) {
              i[e] = !0;
            }),
            r && r.type === n.REPLACE
              ? void 0
              : a.length > 0
              ? "Unexpected " +
                (a.length > 1 ? "keys" : "key") +
                ' "' +
                a.join('", "') +
                '" found in ' +
                c +
                '. Expected to find one of the known reducer keys instead: "' +
                u.join('", "') +
                '". Unexpected keys will be ignored.'
              : void 0
          );
        }
        function s(e) {
          Object.keys(e).forEach(function (t) {
            var r = e[t];
            if (void 0 === r(void 0, { type: n.INIT }))
              throw new Error(
                'Reducer "' +
                  t +
                  "\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined."
              );
            if (void 0 === r(void 0, { type: n.PROBE_UNKNOWN_ACTION() }))
              throw new Error(
                'Reducer "' +
                  t +
                  "\" returned undefined when probed with a random type. Don't try to handle " +
                  n.INIT +
                  ' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.'
              );
          });
        }
        function f(e) {
          for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
            var o = t[n];
            0, "function" == typeof e[o] && (r[o] = e[o]);
          }
          var i,
            u = Object.keys(r);
          try {
            s(r);
          } catch (a) {
            i = a;
          }
          return function (e, t) {
            if ((void 0 === e && (e = {}), i)) throw i;
            for (var n = !1, o = {}, a = 0; a < u.length; a++) {
              var s = u[a],
                f = r[s],
                d = e[s],
                p = f(d, t);
              if (void 0 === p) {
                var l = c(s, t);
                throw new Error(l);
              }
              (o[s] = p), (n = n || p !== d);
            }
            return (n = n || u.length !== Object.keys(e).length) ? o : e;
          };
        }
        function d(e, t) {
          return function () {
            return t(e.apply(this, arguments));
          };
        }
        function p(e, t) {
          if ("function" == typeof e) return d(e, t);
          if ("object" != typeof e || null === e)
            throw new Error(
              "bindActionCreators expected an object or a function, instead received " +
                (null === e ? "null" : typeof e) +
                '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
            );
          var r = {};
          for (var n in e) {
            var o = e[n];
            "function" == typeof o && (r[n] = d(o, t));
          }
          return r;
        }
        function l(e, t, r) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = r),
            e
          );
        }
        function h(e, t) {
          var r = Object.keys(e);
          return (
            Object.getOwnPropertySymbols &&
              r.push.apply(r, Object.getOwnPropertySymbols(e)),
            t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
            r
          );
        }
        function y(e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? h(r, !0).forEach(function (t) {
                  l(e, t, r[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : h(r).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(r, t)
                  );
                });
          }
          return e;
        }
        function b() {
          for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
            t[r] = arguments[r];
          return 0 === t.length
            ? function (e) {
                return e;
              }
            : 1 === t.length
            ? t[0]
            : t.reduce(function (e, t) {
                return function () {
                  return e(t.apply(void 0, arguments));
                };
              });
        }
        function w() {
          for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
            t[r] = arguments[r];
          return function (e) {
            return function () {
              var r = e.apply(void 0, arguments),
                n = function () {
                  throw new Error(
                    "Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch."
                  );
                },
                o = {
                  getState: r.getState,
                  dispatch: function () {
                    return n.apply(void 0, arguments);
                  },
                },
                i = t.map(function (e) {
                  return e(o);
                });
              return y({}, r, {
                dispatch: (n = b.apply(void 0, i)(r.dispatch)),
              });
            };
          };
        }
        function v() {}
        exports.__DO_NOT_USE__ActionTypes = n;
      },
      { "symbol-observable": "LkZ7" },
    ],
    O1pB: [
      function (require, module, exports) {
        "use strict";
        function t(t = window.location.hash) {
          try {
            if (!t.startsWith("#")) return {};
            const r = t.substr(1).split("&"),
              o = {};
            for (const t of r) {
              let [e, r] = t.split("=");
              (r = decodeURIComponent(r)),
                "profileURL" === e
                  ? (o.profileURL = r)
                  : "title" === e
                  ? (o.title = r)
                  : "localProfilePath" === e && (o.localProfilePath = r);
            }
            return o;
          } catch (e) {
            return (
              console.error("Error when loading hash fragment."),
              console.error(e),
              {}
            );
          }
        }
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.getHashParams = t);
      },
      {},
    ],
    QXNG: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = t);
        var e = /-webkit-|-moz-|-ms-/;
        function t(t) {
          return "string" == typeof t && e.test(t);
        }
        module.exports = exports.default;
      },
      {},
    ],
    tSfb: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = i);
        var e = require("css-in-js-utils/lib/isPrefixedValue"),
          t = r(e);
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var u = ["-webkit-", "-moz-", ""];
        function i(e, r) {
          if (
            "string" == typeof r &&
            !(0, t.default)(r) &&
            r.indexOf("calc(") > -1
          )
            return u.map(function (e) {
              return r.replace(/calc\(/g, e + "calc(");
            });
        }
        module.exports = exports.default;
      },
      { "css-in-js-utils/lib/isPrefixedValue": "QXNG" },
    ],
    ie1g: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = u);
        var e = require("css-in-js-utils/lib/isPrefixedValue"),
          r = t(e);
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var s = ["-webkit-", ""];
        function u(e, t) {
          if (
            "string" == typeof t &&
            !(0, r.default)(t) &&
            t.indexOf("cross-fade(") > -1
          )
            return s.map(function (e) {
              return t.replace(/cross-fade\(/g, e + "cross-fade(");
            });
        }
        module.exports = exports.default;
      },
      { "css-in-js-utils/lib/isPrefixedValue": "QXNG" },
    ],
    CYBj: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = o);
        var e = ["-webkit-", "-moz-", ""],
          r = { "zoom-in": !0, "zoom-out": !0, grab: !0, grabbing: !0 };
        function o(o, t) {
          if ("cursor" === o && r.hasOwnProperty(t))
            return e.map(function (e) {
              return e + t;
            });
        }
        module.exports = exports.default;
      },
      {},
    ],
    MH9I: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = u);
        var e = require("css-in-js-utils/lib/isPrefixedValue"),
          t = r(e);
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var i = ["-webkit-", ""];
        function u(e, r) {
          if (
            "string" == typeof r &&
            !(0, t.default)(r) &&
            r.indexOf("filter(") > -1
          )
            return i.map(function (e) {
              return r.replace(/filter\(/g, e + "filter(");
            });
        }
        module.exports = exports.default;
      },
      { "css-in-js-utils/lib/isPrefixedValue": "QXNG" },
    ],
    jmPR: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = i);
        var e = {
          flex: [
            "-webkit-box",
            "-moz-box",
            "-ms-flexbox",
            "-webkit-flex",
            "flex",
          ],
          "inline-flex": [
            "-webkit-inline-box",
            "-moz-inline-box",
            "-ms-inline-flexbox",
            "-webkit-inline-flex",
            "inline-flex",
          ],
        };
        function i(i, l) {
          if ("display" === i && e.hasOwnProperty(l)) return e[l];
        }
        module.exports = exports.default;
      },
      {},
    ],
    FRuF: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = s);
        var e = {
            "space-around": "distribute",
            "space-between": "justify",
            "flex-start": "start",
            "flex-end": "end",
          },
          t = {
            alignContent: "msFlexLinePack",
            alignSelf: "msFlexItemAlign",
            alignItems: "msFlexAlign",
            justifyContent: "msFlexPack",
            order: "msFlexOrder",
            flexGrow: "msFlexPositive",
            flexShrink: "msFlexNegative",
            flexBasis: "msFlexPreferredSize",
          };
        function s(s, l, r) {
          t.hasOwnProperty(s) && (r[t[s]] = e[l] || l);
        }
        module.exports = exports.default;
      },
      {},
    ],
    bHSr: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = i);
        var e = {
            "space-around": "justify",
            "space-between": "justify",
            "flex-start": "start",
            "flex-end": "end",
            "wrap-reverse": "multiple",
            wrap: "multiple",
          },
          t = {
            alignItems: "WebkitBoxAlign",
            justifyContent: "WebkitBoxPack",
            flexWrap: "WebkitBoxLines",
          };
        function i(i, r, o) {
          "flexDirection" === i &&
            "string" == typeof r &&
            (r.indexOf("column") > -1
              ? (o.WebkitBoxOrient = "vertical")
              : (o.WebkitBoxOrient = "horizontal"),
            r.indexOf("reverse") > -1
              ? (o.WebkitBoxDirection = "reverse")
              : (o.WebkitBoxDirection = "normal")),
            t.hasOwnProperty(i) && (o[t[i]] = e[r] || r);
        }
        module.exports = exports.default;
      },
      {},
    ],
    QxYG: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = n);
        var e = require("css-in-js-utils/lib/isPrefixedValue"),
          t = r(e);
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var i = ["-webkit-", "-moz-", ""],
          a =
            /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;
        function n(e, r) {
          if ("string" == typeof r && !(0, t.default)(r) && a.test(r))
            return i.map(function (e) {
              return e + r;
            });
        }
        module.exports = exports.default;
      },
      { "css-in-js-utils/lib/isPrefixedValue": "QXNG" },
    ],
    qrrU: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = u);
        var e = require("css-in-js-utils/lib/isPrefixedValue"),
          t = r(e);
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var i = ["-webkit-", ""];
        function u(e, r) {
          if (
            "string" == typeof r &&
            !(0, t.default)(r) &&
            r.indexOf("image-set(") > -1
          )
            return i.map(function (e) {
              return r.replace(/image-set\(/g, e + "image-set(");
            });
        }
        module.exports = exports.default;
      },
      { "css-in-js-utils/lib/isPrefixedValue": "QXNG" },
    ],
    pEQ2: [
      function (require, module, exports) {
        "use strict";
        function e(e, t) {
          if ("position" === e && "sticky" === t)
            return ["-webkit-sticky", "sticky"];
        }
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = e),
          (module.exports = exports.default);
      },
      {},
    ],
    M0DH: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = i);
        var t = ["-webkit-", "-moz-", ""],
          e = {
            maxHeight: !0,
            maxWidth: !0,
            width: !0,
            height: !0,
            columnWidth: !0,
            minWidth: !0,
            minHeight: !0,
          },
          n = {
            "min-content": !0,
            "max-content": !0,
            "fill-available": !0,
            "fit-content": !0,
            "contain-floats": !0,
          };
        function i(i, o) {
          if (e.hasOwnProperty(i) && n.hasOwnProperty(o))
            return t.map(function (t) {
              return t + o;
            });
        }
        module.exports = exports.default;
      },
      {},
    ],
    jNGL: [
      function (require, module, exports) {
        "use strict";
        var e = /[A-Z]/g,
          r = /^ms-/,
          s = {};
        function t(t) {
          return t in s
            ? s[t]
            : (s[t] = t.replace(e, "-$&").toLowerCase().replace(r, "-ms-"));
        }
        module.exports = t;
      },
      {},
    ],
    S6J3: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = u);
        var e = require("hyphenate-style-name"),
          t = r(e);
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function u(e) {
          return (0, t.default)(e);
        }
        module.exports = exports.default;
      },
      { "hyphenate-style-name": "jNGL" },
    ],
    XxlV: [
      function (require, module, exports) {
        "use strict";
        function e(e) {
          return e.charAt(0).toUpperCase() + e.slice(1);
        }
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = e),
          (module.exports = exports.default);
      },
      {},
    ],
    cnM4: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = l);
        var t = require("css-in-js-utils/lib/hyphenateProperty"),
          e = s(t),
          r = require("css-in-js-utils/lib/isPrefixedValue"),
          i = s(r),
          n = require("../../utils/capitalizeString"),
          o = s(n);
        function s(t) {
          return t && t.__esModule ? t : { default: t };
        }
        var u = {
            transition: !0,
            transitionProperty: !0,
            WebkitTransition: !0,
            WebkitTransitionProperty: !0,
            MozTransition: !0,
            MozTransitionProperty: !0,
          },
          a = { Webkit: "-webkit-", Moz: "-moz-", ms: "-ms-" };
        function f(t, r) {
          if ((0, i.default)(t)) return t;
          for (
            var n = t.split(/,(?![^()]*(?:\([^()]*\))?\))/g),
              o = 0,
              s = n.length;
            o < s;
            ++o
          ) {
            var u = n[o],
              f = [u];
            for (var l in r) {
              var p = (0, e.default)(l);
              if (u.indexOf(p) > -1 && "order" !== p)
                for (var d = r[l], c = 0, b = d.length; c < b; ++c)
                  f.unshift(u.replace(p, a[d[c]] + p));
            }
            n[o] = f.join(",");
          }
          return n.join(",");
        }
        function l(t, e, r, i) {
          if ("string" == typeof e && u.hasOwnProperty(t)) {
            var n = f(e, i),
              s = n
                .split(/,(?![^()]*(?:\([^()]*\))?\))/g)
                .filter(function (t) {
                  return !/-moz-|-ms-/.test(t);
                })
                .join(",");
            if (t.indexOf("Webkit") > -1) return s;
            var a = n
              .split(/,(?![^()]*(?:\([^()]*\))?\))/g)
              .filter(function (t) {
                return !/-webkit-|-ms-/.test(t);
              })
              .join(",");
            return t.indexOf("Moz") > -1
              ? a
              : ((r["Webkit" + (0, o.default)(t)] = s),
                (r["Moz" + (0, o.default)(t)] = a),
                n);
          }
        }
        module.exports = exports.default;
      },
      {
        "css-in-js-utils/lib/hyphenateProperty": "S6J3",
        "css-in-js-utils/lib/isPrefixedValue": "QXNG",
        "../../utils/capitalizeString": "XxlV",
      },
    ],
    ZBgn: [
      function (require, module, exports) {
        "use strict";
        function r(r) {
          for (var t = 5381, e = r.length; e; )
            t = (33 * t) ^ r.charCodeAt(--e);
          return t >>> 0;
        }
        module.exports = r;
      },
      {},
    ],
    D2Wi: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = u);
        var e = require("./capitalizeString"),
          r = t(e);
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function u(e, t, u) {
          if (e.hasOwnProperty(t)) {
            for (
              var o = {},
                a = e[t],
                n = (0, r.default)(t),
                f = Object.keys(u),
                l = 0;
              l < f.length;
              l++
            ) {
              var i = f[l];
              if (i === t)
                for (var s = 0; s < a.length; s++) o[a[s] + n] = u[t];
              o[i] = u[i];
            }
            return o;
          }
          return u;
        }
        module.exports = exports.default;
      },
      { "./capitalizeString": "XxlV" },
    ],
    qgi9: [
      function (require, module, exports) {
        "use strict";
        function e(e, t, r, o, u) {
          for (var s = 0, f = e.length; s < f; ++s) {
            var l = e[s](t, r, o, u);
            if (l) return l;
          }
        }
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = e),
          (module.exports = exports.default);
      },
      {},
    ],
    a80f: [
      function (require, module, exports) {
        "use strict";
        function e(e, r) {
          -1 === e.indexOf(r) && e.push(r);
        }
        function r(r, t) {
          if (Array.isArray(t))
            for (var o = 0, s = t.length; o < s; ++o) e(r, t[o]);
          else e(r, t);
        }
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = r),
          (module.exports = exports.default);
      },
      {},
    ],
    ek9P: [
      function (require, module, exports) {
        "use strict";
        function e(e) {
          return e instanceof Object && !Array.isArray(e);
        }
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = e),
          (module.exports = exports.default);
      },
      {},
    ],
    rHEJ: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = n);
        var e = require("../utils/prefixProperty"),
          r = s(e),
          t = require("../utils/prefixValue"),
          u = s(t),
          l = require("../utils/addNewValuesOnly"),
          a = s(l),
          i = require("../utils/isObject"),
          f = s(i);
        function s(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function n(e) {
          var t = e.prefixMap,
            l = e.plugins;
          return function e(i) {
            for (var s in i) {
              var n = i[s];
              if ((0, f.default)(n)) i[s] = e(n);
              else if (Array.isArray(n)) {
                for (var d = [], o = 0, p = n.length; o < p; ++o) {
                  var v = (0, u.default)(l, s, n[o], i, t);
                  (0, a.default)(d, v || n[o]);
                }
                d.length > 0 && (i[s] = d);
              } else {
                var x = (0, u.default)(l, s, n, i, t);
                x && (i[s] = x), (i = (0, r.default)(t, s, i));
              }
            }
            return i;
          };
        }
        module.exports = exports.default;
      },
      {
        "../utils/prefixProperty": "D2Wi",
        "../utils/prefixValue": "qgi9",
        "../utils/addNewValuesOnly": "a80f",
        "../utils/isObject": "ek9P",
      },
    ],
    AARE: [
      function (require, module, exports) {
        var global = arguments[3];
        var e = arguments[3];
        function t(e) {
          r.length || (n(), (a = !0)), (r[r.length] = e);
        }
        module.exports = t;
        var n,
          r = [],
          a = !1,
          o = 0,
          u = 1024;
        function l() {
          for (; o < r.length; ) {
            var e = o;
            if (((o += 1), r[e].call(), o > u)) {
              for (var t = 0, n = r.length - o; t < n; t++) r[t] = r[t + o];
              (r.length -= o), (o = 0);
            }
          }
          (r.length = 0), (o = 0), (a = !1);
        }
        var i = void 0 !== e ? e : self,
          c = i.MutationObserver || i.WebKitMutationObserver;
        function f(e) {
          var t = 1,
            n = new c(e),
            r = document.createTextNode("");
          return (
            n.observe(r, { characterData: !0 }),
            function () {
              (t = -t), (r.data = t);
            }
          );
        }
        function v(e) {
          return function () {
            var t = setTimeout(r, 0),
              n = setInterval(r, 50);
            function r() {
              clearTimeout(t), clearInterval(n), e();
            }
          };
        }
        (n = "function" == typeof c ? f(l) : v(l)),
          (t.requestFlush = n),
          (t.makeRequestCallFromTimer = v);
      },
      {},
    ],
    Ezpt: [
      function (require, module, exports) {
        "use strict";
        var t = require("./raw"),
          r = [],
          n = [],
          e = t.makeRequestCallFromTimer(l);
        function l() {
          if (n.length) throw n.shift();
        }
        function o(n) {
          var e;
          ((e = r.length ? r.pop() : new i()).task = n), t(e);
        }
        function i() {
          this.task = null;
        }
        (module.exports = o),
          (i.prototype.call = function () {
            try {
              this.task.call();
            } catch (t) {
              o.onerror ? o.onerror(t) : (n.push(t), e());
            } finally {
              (this.task = null), (r[r.length] = this);
            }
          });
      },
      { "./raw": "AARE" },
    ],
    CxN7: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.flushToStyleTag =
            exports.minify =
            exports.css =
            exports.StyleSheetTestUtils =
            exports.StyleSheetServer =
            exports.StyleSheet =
              void 0);
        var e = m(require("inline-style-prefixer/static/plugins/calc")),
          t = m(require("inline-style-prefixer/static/plugins/crossFade")),
          r = m(require("inline-style-prefixer/static/plugins/cursor")),
          n = m(require("inline-style-prefixer/static/plugins/filter")),
          i = m(require("inline-style-prefixer/static/plugins/flex")),
          o = m(require("inline-style-prefixer/static/plugins/flexboxIE")),
          a = m(require("inline-style-prefixer/static/plugins/flexboxOld")),
          s = m(require("inline-style-prefixer/static/plugins/gradient")),
          u = m(require("inline-style-prefixer/static/plugins/imageSet")),
          l = m(require("inline-style-prefixer/static/plugins/position")),
          f = m(require("inline-style-prefixer/static/plugins/sizing")),
          c = m(require("inline-style-prefixer/static/plugins/transition")),
          y = m(require("string-hash")),
          p = m(require("inline-style-prefixer/static/createPrefixer")),
          d = m(require("asap"));
        function m(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var h = ["Webkit"],
          g = ["Moz"],
          S = ["ms"],
          v = ["Webkit", "Moz"],
          x = ["Webkit", "ms"],
          b = ["Webkit", "Moz", "ms"],
          k = {
            plugins: [
              e.default,
              t.default,
              r.default,
              n.default,
              i.default,
              o.default,
              a.default,
              s.default,
              u.default,
              l.default,
              f.default,
              c.default,
            ],
            prefixMap: {
              transform: x,
              transformOrigin: x,
              transformOriginX: x,
              transformOriginY: x,
              backfaceVisibility: h,
              perspective: h,
              perspectiveOrigin: h,
              transformStyle: h,
              transformOriginZ: h,
              animation: h,
              animationDelay: h,
              animationDirection: h,
              animationFillMode: h,
              animationDuration: h,
              animationIterationCount: h,
              animationName: h,
              animationPlayState: h,
              animationTimingFunction: h,
              appearance: v,
              userSelect: b,
              fontKerning: h,
              textEmphasisPosition: h,
              textEmphasis: h,
              textEmphasisStyle: h,
              textEmphasisColor: h,
              boxDecorationBreak: h,
              clipPath: h,
              maskImage: h,
              maskMode: h,
              maskRepeat: h,
              maskPosition: h,
              maskClip: h,
              maskOrigin: h,
              maskSize: h,
              maskComposite: h,
              mask: h,
              maskBorderSource: h,
              maskBorderMode: h,
              maskBorderSlice: h,
              maskBorderWidth: h,
              maskBorderOutset: h,
              maskBorderRepeat: h,
              maskBorder: h,
              maskType: h,
              textDecorationStyle: v,
              textDecorationSkip: v,
              textDecorationLine: v,
              textDecorationColor: v,
              filter: h,
              fontFeatureSettings: v,
              breakAfter: b,
              breakBefore: b,
              breakInside: b,
              columnCount: v,
              columnFill: v,
              columnGap: v,
              columnRule: v,
              columnRuleColor: v,
              columnRuleStyle: v,
              columnRuleWidth: v,
              columns: v,
              columnSpan: v,
              columnWidth: v,
              writingMode: x,
              flex: x,
              flexBasis: h,
              flexDirection: x,
              flexGrow: h,
              flexFlow: x,
              flexShrink: h,
              flexWrap: x,
              alignContent: h,
              alignItems: h,
              alignSelf: h,
              justifyContent: h,
              order: h,
              transitionDelay: h,
              transitionDuration: h,
              transitionProperty: h,
              transitionTimingFunction: h,
              backdropFilter: h,
              scrollSnapType: x,
              scrollSnapPointsX: x,
              scrollSnapPointsY: x,
              scrollSnapDestination: x,
              scrollSnapCoordinate: x,
              shapeImageThreshold: h,
              shapeImageMargin: h,
              shapeImageOutside: h,
              hyphens: b,
              flowInto: x,
              flowFrom: x,
              regionFragment: x,
              boxSizing: g,
              textAlignLast: g,
              tabSize: g,
              wrapFlow: S,
              wrapThrough: S,
              wrapMargin: S,
              touchAction: S,
              gridTemplateColumns: S,
              gridTemplateRows: S,
              gridTemplateAreas: S,
              gridTemplate: S,
              gridAutoColumns: S,
              gridAutoRows: S,
              gridAutoFlow: S,
              grid: S,
              gridRowStart: S,
              gridColumnStart: S,
              gridRowEnd: S,
              gridRow: S,
              gridColumn: S,
              gridColumnEnd: S,
              gridColumnGap: S,
              gridRowGap: S,
              gridArea: S,
              gridGap: S,
              textSizeAdjust: x,
              borderImage: h,
              borderImageOutset: h,
              borderImageRepeat: h,
              borderImageSlice: h,
              borderImageSource: h,
              borderImageWidth: h,
            },
          },
          O =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                },
          w = (function () {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  "value" in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function (t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })();
        function A(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        var C = "undefined" != typeof Map,
          j = (function () {
            function e() {
              A(this, e), (this.elements = {}), (this.keyOrder = []);
            }
            return (
              w(e, [
                {
                  key: "forEach",
                  value: (function () {
                    return function (e) {
                      for (var t = 0; t < this.keyOrder.length; t++)
                        e(this.elements[this.keyOrder[t]], this.keyOrder[t]);
                    };
                  })(),
                },
                {
                  key: "set",
                  value: (function () {
                    return function (t, r, n) {
                      if (this.elements.hasOwnProperty(t)) {
                        if (n) {
                          var i = this.keyOrder.indexOf(t);
                          this.keyOrder.splice(i, 1), this.keyOrder.push(t);
                        }
                      } else this.keyOrder.push(t);
                      if (null != r) {
                        if ((C && r instanceof Map) || r instanceof e) {
                          var o = this.elements.hasOwnProperty(t)
                            ? this.elements[t]
                            : new e();
                          return (
                            r.forEach(function (e, t) {
                              o.set(t, e, n);
                            }),
                            void (this.elements[t] = o)
                          );
                        }
                        if (
                          Array.isArray(r) ||
                          "object" !== (void 0 === r ? "undefined" : O(r))
                        )
                          this.elements[t] = r;
                        else {
                          for (
                            var a = this.elements.hasOwnProperty(t)
                                ? this.elements[t]
                                : new e(),
                              s = Object.keys(r),
                              u = 0;
                            u < s.length;
                            u += 1
                          )
                            a.set(s[u], r[s[u]], n);
                          this.elements[t] = a;
                        }
                      } else this.elements[t] = r;
                    };
                  })(),
                },
                {
                  key: "get",
                  value: (function () {
                    return function (e) {
                      return this.elements[e];
                    };
                  })(),
                },
                {
                  key: "has",
                  value: (function () {
                    return function (e) {
                      return this.elements.hasOwnProperty(e);
                    };
                  })(),
                },
                {
                  key: "addStyleType",
                  value: (function () {
                    return function (t) {
                      var r = this;
                      if ((C && t instanceof Map) || t instanceof e)
                        t.forEach(function (e, t) {
                          r.set(t, e, !0);
                        });
                      else
                        for (var n = Object.keys(t), i = 0; i < n.length; i++)
                          this.set(n[i], t[n[i]], !0);
                    };
                  })(),
                },
              ]),
              e
            );
          })(),
          T = /([A-Z])/g,
          E = function (e) {
            return "-" + String(e.toLowerCase());
          },
          I = function (e) {
            var t = e.replace(T, E);
            return "m" === t[0] && "s" === t[1] && "-" === t[2]
              ? "-" + String(t)
              : t;
          },
          R = {
            animationIterationCount: !0,
            borderImageOutset: !0,
            borderImageSlice: !0,
            borderImageWidth: !0,
            boxFlex: !0,
            boxFlexGroup: !0,
            boxOrdinalGroup: !0,
            columnCount: !0,
            flex: !0,
            flexGrow: !0,
            flexPositive: !0,
            flexShrink: !0,
            flexNegative: !0,
            flexOrder: !0,
            gridRow: !0,
            gridColumn: !0,
            fontWeight: !0,
            lineClamp: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            tabSize: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
            fillOpacity: !0,
            floodOpacity: !0,
            stopOpacity: !0,
            strokeDasharray: !0,
            strokeDashoffset: !0,
            strokeMiterlimit: !0,
            strokeOpacity: !0,
            strokeWidth: !0,
          };
        function M(e, t) {
          return e + t.charAt(0).toUpperCase() + t.substring(1);
        }
        var q = ["Webkit", "ms", "Moz", "O"];
        Object.keys(R).forEach(function (e) {
          q.forEach(function (t) {
            R[M(t, e)] = R[e];
          });
        });
        var F = function (e, t) {
            return "number" == typeof t ? (R[e] ? "" + t : t + "px") : "" + t;
          },
          P = function (e, t) {
            return _(F(e, t));
          },
          W = function (e, t) {
            return (0, y.default)(e).toString(36);
          },
          D = function (e) {
            return W(JSON.stringify(e));
          },
          _ = function (e) {
            return "!" === e[e.length - 10] && " !important" === e.slice(-11)
              ? e
              : String(e) + " !important";
          };
        function z(e) {
          if (Array.isArray(e)) {
            for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
            return r;
          }
          return Array.from(e);
        }
        var B = (0, p.default)(k),
          G = [
            (function () {
              return function (e, t, r) {
                return ":" !== e[0] ? null : r(t + e);
              };
            })(),
            (function () {
              return function (e, t, r) {
                if ("@" !== e[0]) return null;
                var n = r(t);
                return [String(e) + "{" + String(n.join("")) + "}"];
              };
            })(),
          ],
          N = function e(t, r, n, i, o) {
            for (var a = new j(), s = 0; s < r.length; s++)
              a.addStyleType(r[s]);
            var u = new j(),
              l = [];
            a.forEach(function (r, a) {
              n.some(function (s) {
                var u = s(a, t, function (t) {
                  return e(t, [r], n, i, o);
                });
                if (null != u)
                  return (
                    Array.isArray(u)
                      ? l.push.apply(l, z(u))
                      : (console.warn(
                          "WARNING: Selector handlers should return an array of rules.Returning a string containing multiple rules is deprecated.",
                          s
                        ),
                        l.push("@media all {" + String(u) + "}")),
                    !0
                  );
              }) || u.set(a, r, !0);
            });
            var f = J(t, u, i, o, n);
            return f && l.unshift(f), l;
          },
          L = function (e, t, r) {
            if (t)
              for (var n = Object.keys(t), i = 0; i < n.length; i++) {
                var o = n[i];
                e.has(o) && e.set(o, t[o](e.get(o), r), !1);
              }
          },
          U = function (e, t, r) {
            return String(I(e)) + ":" + String(r(e, t)) + ";";
          },
          H = function (e, t) {
            return (e[t] = !0), e;
          },
          J = function (e, t, r, n, i) {
            L(t, r, i);
            var o = Object.keys(t.elements).reduce(H, Object.create(null)),
              a = B(t.elements),
              s = Object.keys(a);
            if (s.length !== t.keyOrder.length)
              for (var u = 0; u < s.length; u++)
                if (!o[s[u]]) {
                  var l = void 0;
                  if (
                    (l =
                      "W" === s[u][0]
                        ? s[u][6].toLowerCase() + s[u].slice(7)
                        : "o" === s[u][1]
                        ? s[u][3].toLowerCase() + s[u].slice(4)
                        : s[u][2].toLowerCase() + s[u].slice(3)) &&
                    o[l]
                  ) {
                    var f = t.keyOrder.indexOf(l);
                    t.keyOrder.splice(f, 0, s[u]);
                  } else t.keyOrder.unshift(s[u]);
                }
            for (
              var c = !1 === n ? F : P, y = [], p = 0;
              p < t.keyOrder.length;
              p++
            ) {
              var d = t.keyOrder[p],
                m = a[d];
              if (Array.isArray(m))
                for (var h = 0; h < m.length; h++) y.push(U(d, m[h], c));
              else y.push(U(d, m, c));
            }
            return y.length ? String(e) + "{" + String(y.join("")) + "}" : "";
          },
          X =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                };
        function Y(e) {
          if (Array.isArray(e)) {
            for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
            return r;
          }
          return Array.from(e);
        }
        var Z = null,
          K = function (e) {
            if (
              null == Z &&
              null == (Z = document.querySelector("style[data-aphrodite]"))
            ) {
              var t = document.head || document.getElementsByTagName("head")[0];
              ((Z = document.createElement("style")).type = "text/css"),
                Z.setAttribute("data-aphrodite", ""),
                t.appendChild(Z);
            }
            var r = Z.styleSheet || Z.sheet;
            if (r.insertRule) {
              var n = r.cssRules.length;
              e.forEach(function (e) {
                try {
                  r.insertRule(e, n), (n += 1);
                } catch (t) {}
              });
            } else Z.innerText = (Z.innerText || "") + e.join("");
          },
          V = {
            fontFamily: (function () {
              return function e(t) {
                return Array.isArray(t)
                  ? t.map(e).join(",")
                  : "object" === (void 0 === t ? "undefined" : X(t))
                  ? (re(t.src, "@font-face", [t], !1),
                    '"' + String(t.fontFamily) + '"')
                  : t;
              };
            })(),
            animationName: (function () {
              return function e(t, r) {
                if (Array.isArray(t))
                  return t
                    .map(function (t) {
                      return e(t, r);
                    })
                    .join(",");
                if ("object" === (void 0 === t ? "undefined" : X(t))) {
                  var n = "keyframe_" + String(D(t)),
                    i = "@keyframes " + n + "{";
                  return (
                    t instanceof j
                      ? t.forEach(function (e, t) {
                          i += N(t, [e], r, V, !1).join("");
                        })
                      : Object.keys(t).forEach(function (e) {
                          i += N(e, [t[e]], r, V, !1).join("");
                        }),
                    te(n, [(i += "}")]),
                    n
                  );
                }
                return t;
              };
            })(),
          },
          Q = {},
          $ = [],
          ee = !1,
          te = function (e, t) {
            var r;
            if (!Q[e]) {
              if (!ee) {
                if ("undefined" == typeof document)
                  throw new Error(
                    "Cannot automatically buffer without a document"
                  );
                (ee = !0), (0, d.default)(ue);
              }
              (r = $).push.apply(r, Y(t)), (Q[e] = !0);
            }
          },
          re = function (e, t, r, n) {
            var i =
              arguments.length > 4 && void 0 !== arguments[4]
                ? arguments[4]
                : [];
            if (!Q[e]) {
              var o = N(t, r, i, V, n);
              te(e, o);
            }
          },
          ne = function () {
            ($ = []), (Q = {}), (ee = !1), (Z = null);
          },
          ie = function () {
            return $;
          },
          oe = function () {
            if (ee) throw new Error("Cannot buffer while already buffering");
            ee = !0;
          },
          ae = function () {
            ee = !1;
            var e = $;
            return ($ = []), e;
          },
          se = function () {
            return ae().join("");
          },
          ue = function () {
            var e = ae();
            e.length > 0 && K(e);
          };
        exports.flushToStyleTag = ue;
        var le = function () {
            return Object.keys(Q);
          },
          fe = function (e) {
            e.forEach(function (e) {
              Q[e] = !0;
            });
          },
          ce = function e(t, r, n, i) {
            for (var o = 0; o < t.length; o += 1)
              t[o] &&
                (Array.isArray(t[o])
                  ? (i += e(t[o], r, n, i))
                  : (r.push(t[o]._name),
                    n.push(t[o]._definition),
                    (i += t[o]._len)));
            return i;
          },
          ye = function (e, t, r) {
            var n = [],
              i = [],
              o = ce(t, n, i, 0);
            if (0 === n.length) return "";
            var a = void 0;
            return (
              (a =
                1 === n.length
                  ? "_" + String(n[0])
                  : "_" + String(W(n.join())) + String((o % 36).toString(36))),
              re(a, "." + String(a), i, e, r),
              a
            );
          },
          pe = function (e, t) {
            return String(t) + "_" + String(W(e));
          },
          de = function () {
            return W;
          },
          me = de(),
          he = {
            create: (function () {
              return function (e) {
                for (
                  var t = {}, r = Object.keys(e), n = 0;
                  n < r.length;
                  n += 1
                ) {
                  var i = r[n],
                    o = e[i],
                    a = JSON.stringify(o);
                  t[i] = { _len: a.length, _name: me(a, i), _definition: o };
                }
                return t;
              };
            })(),
            rehydrate: (function () {
              return function () {
                var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : [];
                fe(e);
              };
            })(),
          },
          ge =
            "undefined" != typeof window
              ? null
              : {
                  renderStatic: (function () {
                    return function (e) {
                      return (
                        ne(),
                        oe(),
                        {
                          html: e(),
                          css: { content: se(), renderedClassNames: le() },
                        }
                      );
                    };
                  })(),
                },
          Se = null;
        function ve(e, t) {
          return {
            StyleSheet: Object.assign({}, he, {
              extend: (function () {
                return function (r) {
                  var n = r
                    .map(function (e) {
                      return e.selectorHandler;
                    })
                    .filter(function (e) {
                      return e;
                    });
                  return ve(e, t.concat(n));
                };
              })(),
            }),
            StyleSheetServer: ge,
            StyleSheetTestUtils: Se,
            minify: (function () {
              return function (e) {
                me = e ? W : pe;
              };
            })(),
            css: (function () {
              return function () {
                for (var r = arguments.length, n = Array(r), i = 0; i < r; i++)
                  n[i] = arguments[i];
                return ye(e, n, t);
              };
            })(),
          };
        }
        var xe = !0,
          be = ve(xe, G),
          ke = be.StyleSheet,
          Oe = be.StyleSheetServer,
          we = be.StyleSheetTestUtils,
          Ae = be.css,
          Ce = be.minify;
        (exports.minify = Ce),
          (exports.css = Ae),
          (exports.StyleSheetTestUtils = we),
          (exports.StyleSheetServer = Oe),
          (exports.StyleSheet = ke);
      },
      {
        "inline-style-prefixer/static/plugins/calc": "tSfb",
        "inline-style-prefixer/static/plugins/crossFade": "ie1g",
        "inline-style-prefixer/static/plugins/cursor": "CYBj",
        "inline-style-prefixer/static/plugins/filter": "MH9I",
        "inline-style-prefixer/static/plugins/flex": "jmPR",
        "inline-style-prefixer/static/plugins/flexboxIE": "FRuF",
        "inline-style-prefixer/static/plugins/flexboxOld": "bHSr",
        "inline-style-prefixer/static/plugins/gradient": "QxYG",
        "inline-style-prefixer/static/plugins/imageSet": "qrrU",
        "inline-style-prefixer/static/plugins/position": "pEQ2",
        "inline-style-prefixer/static/plugins/sizing": "M0DH",
        "inline-style-prefixer/static/plugins/transition": "cnM4",
        "string-hash": "ZBgn",
        "inline-style-prefixer/static/createPrefixer": "rHEJ",
        asap: "Ezpt",
      },
    ],
    hvr4: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.commonStyle =
            exports.ZIndex =
            exports.Duration =
            exports.Sizes =
            exports.FontSize =
            exports.FontFamily =
              void 0);
        var e,
          o,
          t,
          T,
          i,
          r = require("aphrodite");
        (exports.FontFamily = e),
          (function (e) {
            e.MONOSPACE = '"Source Code Pro", Courier, monospace';
          })(e || (exports.FontFamily = e = {})),
          (exports.FontSize = o),
          (function (e) {
            (e[(e.LABEL = 10)] = "LABEL"),
              (e[(e.TITLE = 12)] = "TITLE"),
              (e[(e.BIG_BUTTON = 36)] = "BIG_BUTTON");
          })(o || (exports.FontSize = o = {})),
          (exports.Sizes = t),
          (function (e) {
            (e[(e.MINIMAP_HEIGHT = 100)] = "MINIMAP_HEIGHT"),
              (e[(e.DETAIL_VIEW_HEIGHT = 150)] = "DETAIL_VIEW_HEIGHT"),
              (e[(e.TOOLTIP_WIDTH_MAX = 900)] = "TOOLTIP_WIDTH_MAX"),
              (e[(e.TOOLTIP_HEIGHT_MAX = 80)] = "TOOLTIP_HEIGHT_MAX"),
              (e[(e.SEPARATOR_HEIGHT = 2)] = "SEPARATOR_HEIGHT"),
              (e[(e.FRAME_HEIGHT = 20)] = "FRAME_HEIGHT"),
              (e[(e.TOOLBAR_HEIGHT = 20)] = "TOOLBAR_HEIGHT"),
              (e[(e.TOOLBAR_TAB_HEIGHT = 18)] = "TOOLBAR_TAB_HEIGHT");
          })(t || (exports.Sizes = t = {})),
          (exports.Duration = T),
          (function (e) {
            e.HOVER_CHANGE = "0.07s";
          })(T || (exports.Duration = T = {})),
          (exports.ZIndex = i),
          (function (e) {
            (e[(e.PROFILE_SELECT = 1)] = "PROFILE_SELECT"),
              (e[(e.HOVERTIP = 2)] = "HOVERTIP");
          })(i || (exports.ZIndex = i = {}));
        const I = r.StyleSheet.create({
          fillY: { height: "100%" },
          fillX: { width: "100%" },
          hbox: {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            overflow: "hidden",
          },
          vbox: {
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
          },
        });
        exports.commonStyle = I;
      },
      { aphrodite: "CxN7" },
    ],
    MwGB: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.useState = a),
          (exports.useReducer = p),
          (exports.useEffect = h),
          (exports.useLayoutEffect = v),
          (exports.useRef = m),
          (exports.useImperativeHandle = H),
          (exports.useMemo = l),
          (exports.useCallback = d),
          (exports.useContext = x),
          (exports.useDebugValue = y),
          (exports.useErrorBoundary = E);
        var _,
          n,
          t,
          o = require("preact"),
          e = 0,
          u = [],
          r = o.options.__r,
          i = o.options.diffed,
          c = o.options.__c,
          s = o.options.unmount;
        function f(_, t) {
          o.options.__h && o.options.__h(n, _, e || t), (e = 0);
          var u = n.__H || (n.__H = { __: [], __h: [] });
          return _ >= u.__.length && u.__.push({}), u.__[_];
        }
        function a(_) {
          return (e = 1), p(A, _);
        }
        function p(t, o, e) {
          var u = f(_++, 2);
          return (
            u.__c ||
              ((u.__c = n),
              (u.__ = [
                e ? e(o) : A(void 0, o),
                function (_) {
                  var n = t(u.__[0], _);
                  u.__[0] !== n && ((u.__[0] = n), u.__c.setState({}));
                },
              ])),
            u.__
          );
        }
        function h(t, e) {
          var u = f(_++, 3);
          !o.options.__s &&
            q(u.__H, e) &&
            ((u.__ = t), (u.__H = e), n.__H.__h.push(u));
        }
        function v(t, e) {
          var u = f(_++, 4);
          !o.options.__s &&
            q(u.__H, e) &&
            ((u.__ = t), (u.__H = e), n.__h.push(u));
        }
        function m(_) {
          return (
            (e = 5),
            l(function () {
              return { current: _ };
            }, [])
          );
        }
        function H(_, n, t) {
          (e = 6),
            v(
              function () {
                "function" == typeof _ ? _(n()) : _ && (_.current = n());
              },
              null == t ? t : t.concat(_)
            );
        }
        function l(n, t) {
          var o = f(_++, 7);
          return q(o.__H, t) ? ((o.__H = t), (o.__h = n), (o.__ = n())) : o.__;
        }
        function d(_, n) {
          return (
            (e = 8),
            l(function () {
              return _;
            }, n)
          );
        }
        function x(t) {
          var o = n.context[t.__c],
            e = f(_++, 9);
          return (
            (e.__c = t),
            o ? (null == e.__ && ((e.__ = !0), o.sub(n)), o.props.value) : t.__
          );
        }
        function y(_, n) {
          o.options.useDebugValue && o.options.useDebugValue(n ? n(_) : _);
        }
        function E(t) {
          var o = f(_++, 10),
            e = a();
          return (
            (o.__ = t),
            n.componentDidCatch ||
              (n.componentDidCatch = function (_) {
                o.__ && o.__(_), e[1](_);
              }),
            [
              e[0],
              function () {
                e[1](void 0);
              },
            ]
          );
        }
        function b() {
          u.some(function (_) {
            if (_.__P)
              try {
                _.__H.__h.forEach(g), _.__H.__h.forEach(D), (_.__H.__h = []);
              } catch (n) {
                return (_.__H.__h = []), o.options.__e(n, _.__v), !0;
              }
          }),
            (u = []);
        }
        function g(_) {
          _.t && _.t();
        }
        function D(_) {
          var n = _.__();
          "function" == typeof n && (_.t = n);
        }
        function q(_, n) {
          return (
            !_ ||
            n.some(function (n, t) {
              return n !== _[t];
            })
          );
        }
        function A(_, n) {
          return "function" == typeof n ? n(_) : n;
        }
        (o.options.__r = function (t) {
          r && r(t),
            (_ = 0),
            (n = t.__c).__H &&
              (n.__H.__h.forEach(g), n.__H.__h.forEach(D), (n.__H.__h = []));
        }),
          (o.options.diffed = function (_) {
            i && i(_);
            var n = _.__c;
            if (n) {
              var e = n.__H;
              e &&
                e.__h.length &&
                ((1 !== u.push(n) && t === o.options.requestAnimationFrame) ||
                  (
                    (t = o.options.requestAnimationFrame) ||
                    function (_) {
                      var n,
                        t = function () {
                          clearTimeout(o),
                            cancelAnimationFrame(n),
                            setTimeout(_);
                        },
                        o = setTimeout(t, 100);
                      "undefined" != typeof window &&
                        (n = requestAnimationFrame(t));
                    }
                  )(b));
            }
          }),
          (o.options.__c = function (_, n) {
            n.some(function (_) {
              try {
                _.__h.forEach(g),
                  (_.__h = _.__h.filter(function (_) {
                    return !_.__ || D(_);
                  }));
              } catch (t) {
                n.some(function (_) {
                  _.__h && (_.__h = []);
                }),
                  (n = []),
                  o.options.__e(t, _.__v);
              }
            }),
              c && c(_, n);
          }),
          (o.options.unmount = function (_) {
            s && s(_);
            var n = _.__c;
            if (n) {
              var t = n.__H;
              if (t)
                try {
                  t.__.forEach(function (_) {
                    return _.t && _.t();
                  });
                } catch (_) {
                  o.options.__e(_, n.__v);
                }
            }
          });
      },
      { preact: "aSor" },
    ],
    x77Y: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.Color = void 0);
        var t = require("./math");
        class r {
          constructor(t = 0, r = 0, s = 0, e = 1) {
            (this.r = t), (this.g = r), (this.b = s), (this.a = e);
          }
          static fromLumaChromaHue(s, e, o) {
            const i = o / 60,
              a = e * (1 - Math.abs((i % 2) - 1)),
              [n, h, u] =
                i < 1
                  ? [e, a, 0]
                  : i < 2
                  ? [a, e, 0]
                  : i < 3
                  ? [0, e, a]
                  : i < 4
                  ? [0, a, e]
                  : i < 5
                  ? [a, 0, e]
                  : [e, 0, a],
              c = s - (0.3 * n + 0.59 * h + 0.11 * u);
            return new r(
              (0, t.clamp)(n + c, 0, 1),
              (0, t.clamp)(h + c, 0, 1),
              (0, t.clamp)(u + c, 0, 1),
              1
            );
          }
          static fromCSSHex(t) {
            if (7 !== t.length || "#" !== t[0])
              throw new Error(`Invalid color input ${t}`);
            const s = parseInt(t.substr(1, 2), 16) / 255,
              e = parseInt(t.substr(3, 2), 16) / 255,
              o = parseInt(t.substr(5, 2), 16) / 255;
            if (s < 0 || s > 1 || e < 0 || e > 1 || o < 0 || o > 1)
              throw new Error(`Invalid color input ${t}`);
            return new r(s, e, o);
          }
          withAlpha(t) {
            return new r(this.r, this.g, this.b, t);
          }
          toCSS() {
            return `rgba(${(255 * this.r).toFixed()}, ${(
              255 * this.g
            ).toFixed()}, ${(255 * this.b).toFixed()}, ${this.a.toFixed(2)})`;
          }
        }
        exports.Color = r;
      },
      { "./math": "tDuZ" },
    ],
    osod: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.darkTheme = void 0);
        var o,
          r = require("../../lib/color"),
          e = require("../../lib/utils");
        !(function (o) {
          (o.LIGHTER_GRAY = "#D0D0D0"),
            (o.LIGHT_GRAY = "#BDBDBD"),
            (o.GRAY = "#666666"),
            (o.DARK_GRAY = "#222222"),
            (o.DARKER_GRAY = "#0C0C0C"),
            (o.OFF_BLACK = "#060606"),
            (o.BLACK = "#000000"),
            (o.BLUE = "#00769B"),
            (o.PALE_BLUE = "#004E75"),
            (o.GREEN = "#0F8A42"),
            (o.LIGHT_BROWN = "#D6AE24"),
            (o.BROWN = "#A66F1C");
        })(o || (o = {}));
        const t = 0.2,
          l = 0.1,
          a = 0.2,
          R = 0.1,
          c = (o) => {
            const t = (0, e.triangle)(30 * o),
              l = 0.9 * o * 360,
              a = 0.2 + 0.1 * t,
              R = 0.2 - 0.1 * t;
            return r.Color.fromLumaChromaHue(R, a, l);
          },
          A = `\n  vec3 colorForBucket(float t) {\n    float x = triangle(30.0 * t);\n    float H = 360.0 * (0.9 * t);\n    float C = ${(0.2).toFixed(
            1
          )} + ${(0.1).toFixed(1)} * x;\n    float L = ${(0.2).toFixed(
            1
          )} - ${(0.1).toFixed(1)} * x;\n    return hcl2rgb(H, C, L);\n  }\n`,
          C = {
            fgPrimaryColor: o.LIGHTER_GRAY,
            fgSecondaryColor: o.GRAY,
            bgPrimaryColor: o.OFF_BLACK,
            bgSecondaryColor: o.DARKER_GRAY,
            altFgPrimaryColor: o.LIGHTER_GRAY,
            altFgSecondaryColor: o.GRAY,
            altBgPrimaryColor: o.BLACK,
            altBgSecondaryColor: o.DARKER_GRAY,
            selectionPrimaryColor: o.BLUE,
            selectionSecondaryColor: o.PALE_BLUE,
            weightColor: o.GREEN,
            searchMatchTextColor: o.DARKER_GRAY,
            searchMatchPrimaryColor: o.BROWN,
            searchMatchSecondaryColor: o.LIGHT_BROWN,
            colorForBucket: c,
            colorForBucketGLSL: A,
          };
        exports.darkTheme = C;
      },
      { "../../lib/color": "x77Y", "../../lib/utils": "ucYa" },
    ],
    CjU5: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.lightTheme = void 0);
        var o,
          r = require("../../lib/color"),
          e = require("../../lib/utils");
        !(function (o) {
          (o.WHITE = "#FFFFFF"),
            (o.OFF_WHITE = "#F6F6F6"),
            (o.LIGHT_GRAY = "#BDBDBD"),
            (o.GRAY = "#666666"),
            (o.DARK_GRAY = "#222222"),
            (o.OFF_BLACK = "#111111"),
            (o.BLACK = "#000000"),
            (o.DARK_BLUE = "#2F80ED"),
            (o.PALE_DARK_BLUE = "#8EB7ED"),
            (o.GREEN = "#6FCF97"),
            (o.YELLOW = "#FEDC62"),
            (o.ORANGE = "#FFAC02");
        })(o || (o = {}));
        const t = 0.25,
          l = 0.2,
          a = 0.8,
          F = 0.15,
          c = (o) => {
            const t = (0, e.triangle)(30 * o),
              l = 0.9 * o * 360,
              a = 0.25 + 0.2 * t,
              F = 0.8 - 0.15 * t;
            return r.Color.fromLumaChromaHue(F, a, l);
          },
          i = `\n  vec3 colorForBucket(float t) {\n    float x = triangle(30.0 * t);\n    float H = 360.0 * (0.9 * t);\n    float C = ${(0.25).toFixed(
            1
          )} + ${(0.2).toFixed(1)} * x;\n    float L = ${(0.8).toFixed(
            1
          )} - ${(0.15).toFixed(1)} * x;\n    return hcl2rgb(H, C, L);\n  }\n`,
          C = {
            fgPrimaryColor: o.BLACK,
            fgSecondaryColor: o.LIGHT_GRAY,
            bgPrimaryColor: o.WHITE,
            bgSecondaryColor: o.OFF_WHITE,
            altFgPrimaryColor: o.WHITE,
            altFgSecondaryColor: o.LIGHT_GRAY,
            altBgPrimaryColor: o.BLACK,
            altBgSecondaryColor: o.DARK_GRAY,
            selectionPrimaryColor: o.DARK_BLUE,
            selectionSecondaryColor: o.PALE_DARK_BLUE,
            weightColor: o.GREEN,
            searchMatchTextColor: o.BLACK,
            searchMatchPrimaryColor: o.ORANGE,
            searchMatchSecondaryColor: o.YELLOW,
            colorForBucket: c,
            colorForBucketGLSL: i,
          };
        exports.lightTheme = C;
      },
      { "../../lib/color": "x77Y", "../../lib/utils": "ucYa" },
    ],
    gzKG: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.useTheme = s),
          (exports.withTheme = m),
          (exports.colorSchemeToString = i),
          (exports.nextColorScheme = l),
          (exports.ThemeProvider = a),
          (exports.ThemeContext = void 0);
        var e = require("preact"),
          r = require("preact/hooks"),
          t = require("../../lib/utils"),
          o = require("../../store"),
          c = require("./dark-theme"),
          h = require("./light-theme");
        const n = (0, e.createContext)(h.lightTheme);
        function s() {
          return (0, r.useContext)(n);
        }
        function m(e) {
          return (0, t.memoizeByReference)(e);
        }
        function u() {
          return matchMedia("(prefers-color-scheme: dark)");
        }
        function i(e) {
          switch (e) {
            case o.ColorScheme.SYSTEM:
              return "System";
            case o.ColorScheme.DARK:
              return "Dark";
            case o.ColorScheme.LIGHT:
              return "Light";
          }
        }
        function l(e) {
          if (u().matches)
            switch (e) {
              case o.ColorScheme.SYSTEM:
                return o.ColorScheme.LIGHT;
              case o.ColorScheme.LIGHT:
                return o.ColorScheme.DARK;
              case o.ColorScheme.DARK:
                return o.ColorScheme.SYSTEM;
            }
          else
            switch (e) {
              case o.ColorScheme.SYSTEM:
                return o.ColorScheme.DARK;
              case o.ColorScheme.DARK:
                return o.ColorScheme.LIGHT;
              case o.ColorScheme.LIGHT:
                return o.ColorScheme.SYSTEM;
            }
        }
        function S(e, r) {
          switch (e) {
            case o.ColorScheme.SYSTEM:
              return r ? c.darkTheme : h.lightTheme;
            case o.ColorScheme.DARK:
              return c.darkTheme;
            case o.ColorScheme.LIGHT:
              return h.lightTheme;
          }
        }
        function a(t) {
          const [c, h] = (0, r.useState)(() => u().matches),
            s = (0, r.useCallback)(
              (e) => {
                h(e.matches);
              },
              [h]
            );
          (0, r.useEffect)(() => {
            const e = u();
            return (
              e.addEventListener("change", s),
              () => {
                e.removeEventListener("change", s);
              }
            );
          }, [s]);
          const m = S(
            (0, o.useAppSelector)((e) => e.colorScheme, []),
            c
          );
          return (0, e.h)(n.Provider, { value: m, children: t.children });
        }
        exports.ThemeContext = n;
      },
      {
        preact: "aSor",
        "preact/hooks": "MwGB",
        "../../lib/utils": "ucYa",
        "../../store": "LSXo",
        "./dark-theme": "osod",
        "./light-theme": "CjU5",
      },
    ],
    Pua8: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.ColorChit = o);
        var e = require("preact"),
          t = require("aphrodite"),
          r = require("./style"),
          i = require("./themes/theme");
        function o(r) {
          const o = s((0, i.useTheme)());
          return (0, e.h)("span", {
            className: (0, t.css)(o.stackChit),
            style: { backgroundColor: r.color },
          });
        }
        const s = (0, i.withTheme)((e) =>
          t.StyleSheet.create({
            stackChit: {
              position: "relative",
              top: -1,
              display: "inline-block",
              verticalAlign: "middle",
              marginRight: "0.5em",
              border: `1px solid ${e.fgSecondaryColor}`,
              width: r.FontSize.LABEL - 2,
              height: r.FontSize.LABEL - 2,
            },
          })
        );
      },
      {
        preact: "aSor",
        aphrodite: "CxN7",
        "./style": "hvr4",
        "./themes/theme": "gzKG",
      },
    ],
    SGwe: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.ScrollableListView = void 0);
        var e = require("preact"),
          l = require("preact/hooks");
        const t = ({
          items: t,
          axis: r,
          renderItems: i,
          className: n,
          initialIndexInView: s,
        }) => {
          const [u, o] = (0, l.useState)(null),
            [c, a] = (0, l.useState)(0),
            d = (0, l.useRef)(null),
            f = "x" === r ? "width" : "height",
            x = "x" === r ? "left" : "top",
            b = "x" === r ? "scrollLeft" : "scrollTop",
            v = s ? t.reduce((e, l, t) => (t < s ? e + l.size : e), 0) : 0,
            h = (0, l.useRef)(v),
            m = (0, l.useCallback)(
              (e) => {
                e
                  ? requestAnimationFrame(() => {
                      o(e.getBoundingClientRect()[f]),
                        null != h.current &&
                          (e.scrollTo({ [x]: h.current }), (h.current = null));
                    })
                  : o(null),
                  (d.current = e);
              },
              [o, f, x]
            ),
            g = (0, l.useMemo)(() => {
              if (null == d.current || null == u || null == c) return null;
              const e = c - u / 4,
                l = c + u + u / 4;
              let r = 0,
                i = 0,
                n = 0;
              for (; n < t.length; n++) {
                if (((i = r), (r += t[n].size) >= e)) break;
              }
              const s = n;
              for (; n < t.length; n++) {
                if ((r += t[n].size) >= l) break;
              }
              return {
                firstVisibleIndex: s,
                lastVisibleIndex: Math.min(n, t.length - 1),
                invisiblePrefixSize: i,
              };
            }, [u, c, t]),
            p = (0, l.useMemo)(() => t.reduce((e, l) => e + l.size, 0), [t]),
            z = (0, l.useCallback)(() => {
              null != d.current && a(d.current[b]);
            }, [b]);
          (0, l.useEffect)(() => {
            const e = () => {
              null != d.current && o(d.current.getBoundingClientRect()[f]);
            };
            return (
              window.addEventListener("resize", e),
              () => {
                window.removeEventListener("resize", e);
              }
            );
          }, [f]);
          const w = (0, l.useMemo)(
              () => (g ? i(g.firstVisibleIndex, g.lastVisibleIndex) : null),
              [i, g]
            ),
            S = (0, l.useMemo)(
              () =>
                (0, e.h)(
                  "div",
                  { style: { height: p } },
                  (0, e.h)(
                    "div",
                    {
                      style: {
                        transform: `translateY(${
                          (null == g ? void 0 : g.invisiblePrefixSize) || 0
                        }px)`,
                      },
                    },
                    w
                  )
                ),
              [null == g ? void 0 : g.invisiblePrefixSize, w, p]
            );
          return (0, e.h)("div", { className: n, ref: m, onScroll: z }, S);
        };
        exports.ScrollableListView = t;
      },
      { preact: "aSor", "preact/hooks": "MwGB" },
    ],
    EhY8: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.LRUCache = exports.List = void 0);
        class t {
          constructor(t) {
            (this.data = t), (this.prev = null), (this.next = null);
          }
        }
        class e {
          constructor() {
            (this.head = null), (this.tail = null), (this.size = 0);
          }
          getHead() {
            return this.head;
          }
          getTail() {
            return this.tail;
          }
          getSize() {
            return this.size;
          }
          append(t) {
            this.tail
              ? ((this.tail.next = t), (t.prev = this.tail), (this.tail = t))
              : (this.head = this.tail = t),
              this.size++;
          }
          prepend(t) {
            return (
              this.head
                ? ((this.head.prev = t), (t.next = this.head), (this.head = t))
                : (this.head = this.tail = t),
              this.size++,
              t
            );
          }
          pop() {
            if (this.tail) {
              const t = this.tail;
              return (
                t.prev
                  ? ((this.tail = t.prev), (this.tail.next = null))
                  : (this.head = this.tail = null),
                this.size--,
                (t.prev = null),
                t
              );
            }
            return null;
          }
          dequeue() {
            if (this.head) {
              const t = this.head;
              return (
                t.next
                  ? ((this.head = t.next), (this.head.prev = null))
                  : (this.head = this.tail = null),
                this.size--,
                (t.next = null),
                t
              );
            }
            return null;
          }
          remove(t) {
            null == t.prev
              ? this.dequeue()
              : null == t.next
              ? this.pop()
              : ((t.next.prev = t.prev),
                (t.prev.next = t.next),
                (t.next = null),
                (t.prev = null),
                this.size--);
          }
        }
        exports.List = e;
        class i {
          constructor(t) {
            (this.capacity = t), (this.list = new e()), (this.map = new Map());
          }
          has(t) {
            return this.map.has(t);
          }
          get(t) {
            const e = this.map.get(t);
            return e
              ? (this.list.remove(e.listNode),
                this.list.prepend(e.listNode),
                e ? e.value : null)
              : null;
          }
          getSize() {
            return this.list.getSize();
          }
          getCapacity() {
            return this.capacity;
          }
          insert(e, i) {
            const s = this.map.get(e);
            for (
              s && this.list.remove(s.listNode);
              this.list.getSize() >= this.capacity;

            )
              this.map.delete(this.list.pop().data);
            const h = this.list.prepend(new t(e));
            this.map.set(e, { value: i, listNode: h });
          }
          getOrInsert(t, e) {
            let i = this.get(t);
            return null == i && ((i = e(t)), this.insert(t, i)), i;
          }
          removeLRU() {
            const t = this.list.pop();
            if (!t) return null;
            const e = t.data,
              i = this.map.get(e).value;
            return this.map.delete(e), [e, i];
          }
          clear() {
            (this.list = new e()), (this.map = new Map());
          }
        }
        exports.LRUCache = i;
      },
      {},
    ],
    pBGv: [
      function (require, module, exports) {
        var t,
          e,
          n = (module.exports = {});
        function r() {
          throw new Error("setTimeout has not been defined");
        }
        function o() {
          throw new Error("clearTimeout has not been defined");
        }
        function i(e) {
          if (t === setTimeout) return setTimeout(e, 0);
          if ((t === r || !t) && setTimeout)
            return (t = setTimeout), setTimeout(e, 0);
          try {
            return t(e, 0);
          } catch (n) {
            try {
              return t.call(null, e, 0);
            } catch (n) {
              return t.call(this, e, 0);
            }
          }
        }
        function u(t) {
          if (e === clearTimeout) return clearTimeout(t);
          if ((e === o || !e) && clearTimeout)
            return (e = clearTimeout), clearTimeout(t);
          try {
            return e(t);
          } catch (n) {
            try {
              return e.call(null, t);
            } catch (n) {
              return e.call(this, t);
            }
          }
        }
        !(function () {
          try {
            t = "function" == typeof setTimeout ? setTimeout : r;
          } catch (n) {
            t = r;
          }
          try {
            e = "function" == typeof clearTimeout ? clearTimeout : o;
          } catch (n) {
            e = o;
          }
        })();
        var c,
          s = [],
          l = !1,
          a = -1;
        function f() {
          l &&
            c &&
            ((l = !1),
            c.length ? (s = c.concat(s)) : (a = -1),
            s.length && h());
        }
        function h() {
          if (!l) {
            var t = i(f);
            l = !0;
            for (var e = s.length; e; ) {
              for (c = s, s = []; ++a < e; ) c && c[a].run();
              (a = -1), (e = s.length);
            }
            (c = null), (l = !1), u(t);
          }
        }
        function m(t, e) {
          (this.fun = t), (this.array = e);
        }
        function p() {}
        (n.nextTick = function (t) {
          var e = new Array(arguments.length - 1);
          if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
          s.push(new m(t, e)), 1 !== s.length || l || i(h);
        }),
          (m.prototype.run = function () {
            this.fun.apply(null, this.array);
          }),
          (n.title = "browser"),
          (n.env = {}),
          (n.argv = []),
          (n.version = ""),
          (n.versions = {}),
          (n.on = p),
          (n.addListener = p),
          (n.once = p),
          (n.off = p),
          (n.removeListener = p),
          (n.removeAllListeners = p),
          (n.emit = p),
          (n.prependListener = p),
          (n.prependOnceListener = p),
          (n.listeners = function (t) {
            return [];
          }),
          (n.binding = function (t) {
            throw new Error("process.binding is not supported");
          }),
          (n.cwd = function () {
            return "/";
          }),
          (n.chdir = function (t) {
            throw new Error("process.chdir is not supported");
          }),
          (n.umask = function () {
            return 0;
          });
      },
      {},
    ],
    XGYN: [
      function (require, module, exports) {
        var process = require("process");
        var t = require("process");
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.WebGL = exports.Graphics = void 0);
        const e = void 0 !== t && t.env && !0;
        function i(t) {
          if (!e && !t) throw new Error("Assertion failed.");
        }
        function r(t, e) {
          -1 === t.indexOf(e) && t.push(e);
        }
        function s(t, e) {
          const i = t.indexOf(e);
          -1 !== i && t.splice(i, 1);
        }
        function n(t, e) {
          return i(e >= 0 && e <= 31), t.TEXTURE0 + e;
        }
        var h, a;
        (exports.Graphics = h),
          (function (t) {
            t.Rect = class {
              constructor(t = 0, e = 0, i = 0, r = 0) {
                (this.x = t), (this.y = e), (this.width = i), (this.height = r);
              }
              set(t, e, i, r) {
                (this.x = t), (this.y = e), (this.width = i), (this.height = r);
              }
              equals(t) {
                return (
                  this.x === t.x &&
                  this.y === t.y &&
                  this.width === t.width &&
                  this.height === t.height
                );
              }
            };
            let e,
              i,
              r,
              s,
              n,
              h = (() => {
                class t {
                  constructor(t, e, i, r) {
                    (this.redF = t),
                      (this.greenF = e),
                      (this.blueF = i),
                      (this.alphaF = r);
                  }
                  equals(t) {
                    return (
                      this.redF === t.redF &&
                      this.greenF === t.greenF &&
                      this.blueF === t.blueF &&
                      this.alphaF === t.alphaF
                    );
                  }
                }
                return (t.TRANSPARENT = new t(0, 0, 0, 0)), t;
              })();
            (t.Color = h),
              (function (t) {
                (t[(t.ZERO = 0)] = "ZERO"),
                  (t[(t.ONE = 1)] = "ONE"),
                  (t[(t.SOURCE_COLOR = 2)] = "SOURCE_COLOR"),
                  (t[(t.TARGET_COLOR = 3)] = "TARGET_COLOR"),
                  (t[(t.INVERSE_SOURCE_COLOR = 4)] = "INVERSE_SOURCE_COLOR"),
                  (t[(t.INVERSE_TARGET_COLOR = 5)] = "INVERSE_TARGET_COLOR"),
                  (t[(t.SOURCE_ALPHA = 6)] = "SOURCE_ALPHA"),
                  (t[(t.TARGET_ALPHA = 7)] = "TARGET_ALPHA"),
                  (t[(t.INVERSE_SOURCE_ALPHA = 8)] = "INVERSE_SOURCE_ALPHA"),
                  (t[(t.INVERSE_TARGET_ALPHA = 9)] = "INVERSE_TARGET_ALPHA"),
                  (t[(t.CONSTANT = 10)] = "CONSTANT"),
                  (t[(t.INVERSE_CONSTANT = 11)] = "INVERSE_CONSTANT");
              })((e = t.BlendOperation || (t.BlendOperation = {}))),
              (function (t) {
                (t[(t.TRIANGLES = 0)] = "TRIANGLES"),
                  (t[(t.TRIANGLE_STRIP = 1)] = "TRIANGLE_STRIP");
              })((i = t.Primitive || (t.Primitive = {})));
            function a(t) {
              return t == r.FLOAT ? 4 : 1;
            }
            (t.Context = class {
              constructor() {
                this.resizeEventHandlers = new Set();
              }
              setCopyBlendState() {
                this.setBlendState(e.ONE, e.ZERO);
              }
              setAddBlendState() {
                this.setBlendState(e.ONE, e.ONE);
              }
              setPremultipliedBlendState() {
                this.setBlendState(e.ONE, e.INVERSE_SOURCE_ALPHA);
              }
              setUnpremultipliedBlendState() {
                this.setBlendState(e.SOURCE_ALPHA, e.INVERSE_SOURCE_ALPHA);
              }
              addAfterResizeEventHandler(t) {
                this.resizeEventHandlers.add(t);
              }
              removeAfterResizeEventHandler(t) {
                this.resizeEventHandlers.delete(t);
              }
            }),
              (function (t) {
                (t[(t.FLOAT = 0)] = "FLOAT"), (t[(t.BYTE = 1)] = "BYTE");
              })((r = t.AttributeType || (t.AttributeType = {}))),
              (t.attributeByteLength = a);
            class _ {
              constructor(t, e, i, r) {
                (this.name = t),
                  (this.type = e),
                  (this.count = i),
                  (this.byteOffset = r);
              }
            }
            t.Attribute = _;
            t.VertexFormat = class {
              constructor() {
                (this._attributes = []), (this._stride = 0);
              }
              get attributes() {
                return this._attributes;
              }
              get stride() {
                return this._stride;
              }
              add(t, e, i) {
                return (
                  this.attributes.push(new _(t, e, i, this.stride)),
                  (this._stride += i * a(e)),
                  this
                );
              }
            };
            (t.VertexBuffer = class {
              uploadFloat32Array(t) {
                this.upload(new Uint8Array(t.buffer), 0);
              }
              uploadFloats(t) {
                this.uploadFloat32Array(new Float32Array(t));
              }
            }),
              (function (t) {
                (t[(t.NEAREST = 0)] = "NEAREST"),
                  (t[(t.LINEAR = 1)] = "LINEAR");
              })((s = t.PixelFilter || (t.PixelFilter = {}))),
              (function (t) {
                (t[(t.REPEAT = 0)] = "REPEAT"), (t[(t.CLAMP = 1)] = "CLAMP");
              })((n = t.PixelWrap || (t.PixelWrap = {})));
            let o = (() => {
              class t {
                constructor(t, e, i) {
                  (this.minFilter = t), (this.magFilter = e), (this.wrap = i);
                }
              }
              return (
                (t.LINEAR_CLAMP = new t(s.LINEAR, s.LINEAR, n.CLAMP)),
                (t.LINEAR_MIN_NEAREST_MAG_CLAMP = new t(
                  s.LINEAR,
                  s.NEAREST,
                  n.CLAMP
                )),
                (t.NEAREST_CLAMP = new t(s.NEAREST, s.NEAREST, n.CLAMP)),
                t
              );
            })();
            t.TextureFormat = o;
          })(h || (exports.Graphics = h = {})),
          (exports.WebGL = a),
          (function (t) {
            let a = (() => {
              class t extends h.Context {
                constructor(t = document.createElement("canvas")) {
                  super(),
                    (this._attributeCount = 0),
                    (this._blendOperations = 0),
                    (this._contextResetHandlers = []),
                    (this._currentClearColor = h.Color.TRANSPARENT),
                    (this._currentRenderTarget = null),
                    (this._defaultViewport = new h.Rect()),
                    (this._forceStateUpdate = !0),
                    (this._generation = 1),
                    (this._height = 0),
                    (this._oldBlendOperations = 0),
                    (this._oldRenderTarget = null),
                    (this._oldViewport = new h.Rect()),
                    (this._width = 0),
                    (this.handleWebglContextRestored = () => {
                      (this._attributeCount = 0),
                        (this._currentClearColor = h.Color.TRANSPARENT),
                        (this._forceStateUpdate = !0),
                        this._generation++;
                      for (let t of this._contextResetHandlers) t();
                    }),
                    (this.ANGLE_instanced_arrays = null),
                    (this.ANGLE_instanced_arrays_generation = -1);
                  let e = t.getContext("webgl", {
                    alpha: !1,
                    antialias: !1,
                    depth: !1,
                    preserveDrawingBuffer: !1,
                    stencil: !1,
                  });
                  if (null == e) throw new Error("Setup failure");
                  this._gl = e;
                  let i = t.style;
                  (t.width = 0),
                    (t.height = 0),
                    (i.width = i.height = "0"),
                    t.addEventListener("webglcontextlost", (t) => {
                      t.preventDefault();
                    }),
                    t.addEventListener(
                      "webglcontextrestored",
                      this.handleWebglContextRestored
                    ),
                    (this._blendOperationMap = {
                      [h.BlendOperation.ZERO]: this._gl.ZERO,
                      [h.BlendOperation.ONE]: this._gl.ONE,
                      [h.BlendOperation.SOURCE_COLOR]: this._gl.SRC_COLOR,
                      [h.BlendOperation.TARGET_COLOR]: this._gl.DST_COLOR,
                      [h.BlendOperation.INVERSE_SOURCE_COLOR]:
                        this._gl.ONE_MINUS_SRC_COLOR,
                      [h.BlendOperation.INVERSE_TARGET_COLOR]:
                        this._gl.ONE_MINUS_DST_COLOR,
                      [h.BlendOperation.SOURCE_ALPHA]: this._gl.SRC_ALPHA,
                      [h.BlendOperation.TARGET_ALPHA]: this._gl.DST_ALPHA,
                      [h.BlendOperation.INVERSE_SOURCE_ALPHA]:
                        this._gl.ONE_MINUS_SRC_ALPHA,
                      [h.BlendOperation.INVERSE_TARGET_ALPHA]:
                        this._gl.ONE_MINUS_DST_ALPHA,
                      [h.BlendOperation.CONSTANT]: this._gl.CONSTANT_COLOR,
                      [h.BlendOperation.INVERSE_CONSTANT]:
                        this._gl.ONE_MINUS_CONSTANT_COLOR,
                    });
                }
                get widthInPixels() {
                  return this._width;
                }
                get heightInPixels() {
                  return this._height;
                }
                testContextLoss() {
                  this.handleWebglContextRestored();
                }
                get gl() {
                  return this._gl;
                }
                get generation() {
                  return this._generation;
                }
                addContextResetHandler(t) {
                  r(this._contextResetHandlers, t);
                }
                removeContextResetHandler(t) {
                  s(this._contextResetHandlers, t);
                }
                get currentRenderTarget() {
                  return this._currentRenderTarget;
                }
                beginFrame() {
                  this.setRenderTarget(null);
                }
                endFrame() {}
                setBlendState(e, i) {
                  this._blendOperations = t._packBlendModes(e, i);
                }
                setViewport(t, e, i, r) {
                  (null != this._currentRenderTarget
                    ? this._currentRenderTarget.viewport
                    : this._defaultViewport
                  ).set(t, e, i, r);
                }
                get viewport() {
                  return null != this._currentRenderTarget
                    ? this._currentRenderTarget.viewport
                    : this._defaultViewport;
                }
                get renderTargetWidthInPixels() {
                  return null != this._currentRenderTarget
                    ? this._currentRenderTarget.viewport.width
                    : this._width;
                }
                get renderTargetHeightInPixels() {
                  return null != this._currentRenderTarget
                    ? this._currentRenderTarget.viewport.height
                    : this._height;
                }
                draw(t, e, i) {
                  this._updateRenderTargetAndViewport(),
                    f.from(e).prepare(),
                    R.from(i).prepare(),
                    this._updateFormat(e.format),
                    this._updateBlendState(),
                    this._gl.drawArrays(
                      t == h.Primitive.TRIANGLES
                        ? this._gl.TRIANGLES
                        : this._gl.TRIANGLE_STRIP,
                      0,
                      Math.floor(i.byteCount / e.format.stride)
                    ),
                    (this._forceStateUpdate = !1);
                }
                resize(t, e, i, r) {
                  let s = this._gl.canvas;
                  const n = s.getBoundingClientRect();
                  if (
                    this._width === t &&
                    this._height === e &&
                    n.width === i &&
                    n.height === r
                  )
                    return;
                  let h = s.style;
                  (s.width = t),
                    (s.height = e),
                    (h.width = `${i}px`),
                    (h.height = `${r}px`),
                    this.setViewport(0, 0, t, e),
                    (this._width = t),
                    (this._height = e),
                    this.resizeEventHandlers.forEach((t) => t());
                }
                clear(t) {
                  this._updateRenderTargetAndViewport(),
                    this._updateBlendState(),
                    t.equals(this._currentClearColor) ||
                      (this._gl.clearColor(t.redF, t.greenF, t.blueF, t.alphaF),
                      (this._currentClearColor = t)),
                    this._gl.clear(this._gl.COLOR_BUFFER_BIT);
                }
                setRenderTarget(t) {
                  this._currentRenderTarget = A.from(t);
                }
                createMaterial(t, e, i) {
                  let r = new f(this, t, e, i);
                  return r.program, r;
                }
                createVertexBuffer(t) {
                  return i(t > 0 && t % 4 == 0), new R(this, t);
                }
                createTexture(t, e, i, r) {
                  return new p(this, t, e, i, r);
                }
                createRenderTarget(t) {
                  return new A(this, p.from(t));
                }
                getANGLE_instanced_arrays() {
                  if (
                    (this.ANGLE_instanced_arrays_generation !==
                      this._generation && (this.ANGLE_instanced_arrays = null),
                    !this.ANGLE_instanced_arrays &&
                      ((this.ANGLE_instanced_arrays = this.gl.getExtension(
                        "ANGLE_instanced_arrays"
                      )),
                      !this.ANGLE_instanced_arrays))
                  )
                    throw new Error(
                      "Failed to get extension ANGLE_instanced_arrays"
                    );
                  return this.ANGLE_instanced_arrays;
                }
                _updateRenderTargetAndViewport() {
                  let t = this._currentRenderTarget,
                    e = null != t ? t.viewport : this._defaultViewport,
                    i = this._gl;
                  (this._forceStateUpdate || this._oldRenderTarget != t) &&
                    (i.bindFramebuffer(i.FRAMEBUFFER, t ? t.framebuffer : null),
                    (this._oldRenderTarget = t)),
                    (!this._forceStateUpdate && this._oldViewport.equals(e)) ||
                      (i.viewport(
                        e.x,
                        this.renderTargetHeightInPixels - e.y - e.height,
                        e.width,
                        e.height
                      ),
                      this._oldViewport.set(e.x, e.y, e.width, e.height));
                }
                _updateBlendState() {
                  if (
                    this._forceStateUpdate ||
                    this._oldBlendOperations != this._blendOperations
                  ) {
                    let e = this._gl,
                      r = this._blendOperations,
                      s = this._oldBlendOperations,
                      n = 15 & r,
                      h = r >> 4;
                    i(n in this._blendOperationMap),
                      i(h in this._blendOperationMap),
                      r == t.COPY_BLEND_OPERATIONS
                        ? e.disable(e.BLEND)
                        : ((this._forceStateUpdate ||
                            s == t.COPY_BLEND_OPERATIONS) &&
                            e.enable(e.BLEND),
                          e.blendFunc(
                            this._blendOperationMap[n],
                            this._blendOperationMap[h]
                          )),
                      (this._oldBlendOperations = r);
                  }
                }
                _updateFormat(t) {
                  let e = this._gl,
                    i = t.attributes,
                    r = i.length;
                  for (let s = 0; s < r; s++) {
                    let r = i[s],
                      n = r.type == h.AttributeType.BYTE;
                    e.vertexAttribPointer(
                      s,
                      r.count,
                      n ? e.UNSIGNED_BYTE : e.FLOAT,
                      n,
                      t.stride,
                      r.byteOffset
                    );
                  }
                  for (; this._attributeCount < r; )
                    e.enableVertexAttribArray(this._attributeCount),
                      this._attributeCount++;
                  for (; this._attributeCount > r; )
                    this._attributeCount--,
                      e.disableVertexAttribArray(this._attributeCount);
                  this._attributeCount = r;
                }
                getWebGLInfo() {
                  const t = this.gl.getExtension("WEBGL_debug_renderer_info");
                  return {
                    renderer: t
                      ? this.gl.getParameter(t.UNMASKED_RENDERER_WEBGL)
                      : null,
                    vendor: t
                      ? this.gl.getParameter(t.UNMASKED_VENDOR_WEBGL)
                      : null,
                    version: this.gl.getParameter(this.gl.VERSION),
                  };
                }
                static from(e) {
                  return i(null == e || e instanceof t), e;
                }
                static _packBlendModes(t, e) {
                  return t | (e << 4);
                }
              }
              return (
                (t.COPY_BLEND_OPERATIONS = t._packBlendModes(
                  h.BlendOperation.ONE,
                  h.BlendOperation.ZERO
                )),
                t
              );
            })();
            t.Context = a;
            class _ {
              constructor(t, e, i = 0, r = null, s = !0) {
                (this._material = t),
                  (this._name = e),
                  (this._generation = i),
                  (this._location = r),
                  (this._isDirty = s);
              }
              get location() {
                let t = a.from(this._material.context);
                if (
                  this._generation != t.generation &&
                  ((this._location = t.gl.getUniformLocation(
                    this._material.program,
                    this._name
                  )),
                  (this._generation = t.generation),
                  !e)
                ) {
                  let e = this._material.program,
                    r = t.gl;
                  for (
                    let t = 0, s = r.getProgramParameter(e, r.ACTIVE_UNIFORMS);
                    t < s;
                    t++
                  ) {
                    let s = r.getActiveUniform(e, t);
                    if (s && s.name == this._name)
                      switch ((i(1 == s.size), s.type)) {
                        case r.FLOAT:
                          i(this instanceof o);
                          break;
                        case r.FLOAT_MAT3:
                          i(this instanceof E);
                          break;
                        case r.FLOAT_VEC2:
                          i(this instanceof u);
                          break;
                        case r.FLOAT_VEC3:
                          i(this instanceof c);
                          break;
                        case r.FLOAT_VEC4:
                          i(this instanceof d);
                          break;
                        case r.INT:
                          i(this instanceof l);
                          break;
                        case r.SAMPLER_2D:
                          i(this instanceof g);
                          break;
                        default:
                          i(!1);
                      }
                  }
                }
                if (!this._location)
                  throw new Error("Failed to get uniform location");
                return this._location;
              }
            }
            class o extends _ {
              constructor() {
                super(...arguments), (this._x = 0);
              }
              set(t) {
                t != this._x && ((this._x = t), (this._isDirty = !0));
              }
              prepare() {
                let t = a.from(this._material.context);
                (this._generation != t.generation || this._isDirty) &&
                  (t.gl.uniform1f(this.location, this._x),
                  (this._isDirty = !1));
              }
            }
            class l extends _ {
              constructor() {
                super(...arguments), (this._x = 0);
              }
              set(t) {
                t != this._x && ((this._x = t), (this._isDirty = !0));
              }
              prepare() {
                let t = a.from(this._material.context);
                (this._generation != t.generation || this._isDirty) &&
                  (t.gl.uniform1i(this.location, this._x),
                  (this._isDirty = !1));
              }
            }
            class u extends _ {
              constructor() {
                super(...arguments), (this._x = 0), (this._y = 0);
              }
              set(t, e) {
                (t == this._x && e == this._y) ||
                  ((this._x = t), (this._y = e), (this._isDirty = !0));
              }
              prepare() {
                let t = a.from(this._material.context);
                (this._generation != t.generation || this._isDirty) &&
                  (t.gl.uniform2f(this.location, this._x, this._y),
                  (this._isDirty = !1));
              }
            }
            class c extends _ {
              constructor() {
                super(...arguments),
                  (this._x = 0),
                  (this._y = 0),
                  (this._z = 0);
              }
              set(t, e, i) {
                (t == this._x && e == this._y && i == this._z) ||
                  ((this._x = t),
                  (this._y = e),
                  (this._z = i),
                  (this._isDirty = !0));
              }
              prepare() {
                let t = a.from(this._material.context);
                (this._generation != t.generation || this._isDirty) &&
                  (t.gl.uniform3f(this.location, this._x, this._y, this._z),
                  (this._isDirty = !1));
              }
            }
            class d extends _ {
              constructor() {
                super(...arguments),
                  (this._x = 0),
                  (this._y = 0),
                  (this._z = 0),
                  (this._w = 0);
              }
              set(t, e, i, r) {
                (t == this._x &&
                  e == this._y &&
                  i == this._z &&
                  r == this._w) ||
                  ((this._x = t),
                  (this._y = e),
                  (this._z = i),
                  (this._w = r),
                  (this._isDirty = !0));
              }
              prepare() {
                let t = a.from(this._material.context);
                (this._generation != t.generation || this._isDirty) &&
                  (t.gl.uniform4f(
                    this.location,
                    this._x,
                    this._y,
                    this._z,
                    this._w
                  ),
                  (this._isDirty = !1));
              }
            }
            let E = (() => {
              class t extends _ {
                constructor() {
                  super(...arguments),
                    (this._values = [1, 0, 0, 0, 1, 0, 0, 0, 1]);
                }
                set(e, i, r, s, n, h, a, _, o) {
                  (t._cachedValues[0] = e),
                    (t._cachedValues[1] = s),
                    (t._cachedValues[2] = a),
                    (t._cachedValues[3] = i),
                    (t._cachedValues[4] = n),
                    (t._cachedValues[5] = _),
                    (t._cachedValues[6] = r),
                    (t._cachedValues[7] = h),
                    (t._cachedValues[8] = o);
                  for (let l = 0; l < 9; l++)
                    if (t._cachedValues[l] != this._values[l]) {
                      let e = this._values;
                      (this._values = t._cachedValues),
                        (t._cachedValues = e),
                        (this._isDirty = !0);
                      break;
                    }
                }
                prepare() {
                  let t = a.from(this._material.context);
                  (this._generation != t.generation || this._isDirty) &&
                    (t.gl.uniformMatrix3fv(this.location, !1, this._values),
                    (this._isDirty = !1));
                }
              }
              return (t._cachedValues = [1, 0, 0, 0, 1, 0, 0, 0, 1]), t;
            })();
            class g extends _ {
              constructor() {
                super(...arguments), (this._texture = null), (this._index = -1);
              }
              set(t, e) {
                (this._texture == t && this._index == e) ||
                  ((this._texture = p.from(t)),
                  (this._index = e),
                  (this._isDirty = !0));
              }
              prepare() {
                let t = a.from(this._material.context),
                  e = t.gl;
                i(
                  null == this._texture ||
                    null == t.currentRenderTarget ||
                    this._texture != t.currentRenderTarget.texture
                ),
                  (this._generation != t.generation || this._isDirty) &&
                    (e.uniform1i(this.location, this._index),
                    (this._isDirty = !1)),
                  e.activeTexture(n(e, this._index)),
                  e.bindTexture(
                    e.TEXTURE_2D,
                    null != this._texture &&
                      this._texture.width > 0 &&
                      this._texture.height > 0
                      ? this._texture.texture
                      : null
                  );
              }
            }
            class f {
              constructor(t, e, i, r, s = {}, n = [], h = 0, a = null) {
                (this._context = t),
                  (this._format = e),
                  (this._vertexSource = i),
                  (this._fragmentSource = r),
                  (this._uniformsMap = s),
                  (this._uniformsList = n),
                  (this._generation = h),
                  (this._program = a);
              }
              get context() {
                return this._context;
              }
              get format() {
                return this._format;
              }
              get vertexSource() {
                return this._vertexSource;
              }
              get fragmentSource() {
                return this._fragmentSource;
              }
              setUniformFloat(t, e) {
                let r = this._uniformsMap[t] || null;
                null == r &&
                  ((r = new o(this, t)),
                  (this._uniformsMap[t] = r),
                  this._uniformsList.push(r)),
                  i(r instanceof o),
                  r.set(e);
              }
              setUniformInt(t, e) {
                let r = this._uniformsMap[t] || null;
                null == r &&
                  ((r = new l(this, t)),
                  (this._uniformsMap[t] = r),
                  this._uniformsList.push(r)),
                  i(r instanceof l),
                  r.set(e);
              }
              setUniformVec2(t, e, r) {
                let s = this._uniformsMap[t] || null;
                null == s &&
                  ((s = new u(this, t)),
                  (this._uniformsMap[t] = s),
                  this._uniformsList.push(s)),
                  i(s instanceof u),
                  s.set(e, r);
              }
              setUniformVec3(t, e, r, s) {
                let n = this._uniformsMap[t] || null;
                null == n &&
                  ((n = new c(this, t)),
                  (this._uniformsMap[t] = n),
                  this._uniformsList.push(n)),
                  i(n instanceof c),
                  n.set(e, r, s);
              }
              setUniformVec4(t, e, r, s, n) {
                let h = this._uniformsMap[t] || null;
                null == h &&
                  ((h = new d(this, t)),
                  (this._uniformsMap[t] = h),
                  this._uniformsList.push(h)),
                  i(h instanceof d),
                  h.set(e, r, s, n);
              }
              setUniformMat3(t, e, r, s, n, h, a, _, o, l) {
                let u = this._uniformsMap[t] || null;
                null == u &&
                  ((u = new E(this, t)),
                  (this._uniformsMap[t] = u),
                  this._uniformsList.push(u)),
                  i(u instanceof E),
                  u.set(e, r, s, n, h, a, _, o, l);
              }
              setUniformSampler(t, e, r) {
                let s = this._uniformsMap[t] || null;
                null == s &&
                  ((s = new g(this, t)),
                  (this._uniformsMap[t] = s),
                  this._uniformsList.push(s)),
                  i(s instanceof g),
                  s.set(e, r);
              }
              get program() {
                let t = this._context.gl;
                if (this._generation != this._context.generation) {
                  (this._program = t.createProgram()),
                    this._compileShader(t, t.VERTEX_SHADER, this.vertexSource),
                    this._compileShader(
                      t,
                      t.FRAGMENT_SHADER,
                      this.fragmentSource
                    );
                  let r = this.format.attributes;
                  for (let e = 0; e < r.length; e++)
                    t.bindAttribLocation(this._program, e, r[e].name);
                  if (
                    (t.linkProgram(this._program),
                    !t.getProgramParameter(this._program, t.LINK_STATUS))
                  )
                    throw new Error(`${t.getProgramInfoLog(this._program)}`);
                  if (((this._generation = this._context.generation), !e))
                    for (let e of r)
                      for (
                        let r = 0,
                          s = t.getProgramParameter(
                            this.program,
                            t.ACTIVE_ATTRIBUTES
                          );
                        r < s;
                        r++
                      ) {
                        let s = t.getActiveAttrib(this.program, r);
                        if (s && s.name == e.name)
                          switch ((i(1 == s.size), e.count)) {
                            case 1:
                              i(s.type == t.FLOAT);
                              break;
                            case 2:
                              i(s.type == t.FLOAT_VEC2);
                              break;
                            case 3:
                              i(s.type == t.FLOAT_VEC3);
                              break;
                            case 4:
                              i(s.type == t.FLOAT_VEC4);
                              break;
                            default:
                              i(!1);
                          }
                      }
                }
                return this._program;
              }
              prepare() {
                this._context.gl.useProgram(this.program);
                for (let t of this._uniformsList) t.prepare();
              }
              _compileShader(t, e, i) {
                let r = t.createShader(e);
                if (!r) throw new Error("Failed to create shader");
                if (
                  (t.shaderSource(r, i),
                  t.compileShader(r),
                  !t.getShaderParameter(r, t.COMPILE_STATUS))
                )
                  throw new Error(`${t.getShaderInfoLog(r)}`);
                if (!this._program)
                  throw new Error(
                    "Tried to attach shader before program was created"
                  );
                t.attachShader(this._program, r);
              }
              static from(t) {
                return i(null == t || t instanceof f), t;
              }
            }
            let R = (() => {
              class t extends h.VertexBuffer {
                constructor(e, i) {
                  super(),
                    (this._generation = 0),
                    (this._buffer = null),
                    (this._bytes = null),
                    (this._isDirty = !0),
                    (this._dirtyMin = t.INT_MAX),
                    (this._dirtyMax = 0),
                    (this._totalMin = t.INT_MAX),
                    (this._totalMax = 0),
                    (this._byteCount = 0),
                    (this._context = e),
                    (this._byteCount = i),
                    (this._bytes = new Uint8Array(i));
                }
                get context() {
                  return this._context;
                }
                get byteCount() {
                  return this._byteCount;
                }
                move(t, e, r) {
                  i(r >= 0),
                    i(0 <= t && t + r <= this._byteCount),
                    i(0 <= e && e + r <= this._byteCount),
                    this._bytes &&
                      t != e &&
                      0 != r &&
                      (this._bytes.set(
                        this._bytes.subarray(t, this._byteCount),
                        e
                      ),
                      this._growDirtyRegion(
                        Math.min(t, e),
                        Math.max(t, e) + r
                      ));
                }
                upload(t, e = 0) {
                  i(0 <= e && e + t.length <= this._byteCount),
                    i(null != this._bytes),
                    this._bytes.set(t, e),
                    this._growDirtyRegion(e, e + t.length);
                }
                free() {
                  this._buffer && this._context.gl.deleteBuffer(this._buffer),
                    (this._generation = 0);
                }
                prepare() {
                  let e = this._context.gl;
                  this._generation !== this._context.generation &&
                    ((this._buffer = e.createBuffer()),
                    (this._generation = this._context.generation),
                    (this._isDirty = !0)),
                    e.bindBuffer(e.ARRAY_BUFFER, this._buffer),
                    this._isDirty &&
                      (e.bufferData(
                        e.ARRAY_BUFFER,
                        this._byteCount,
                        e.DYNAMIC_DRAW
                      ),
                      (this._dirtyMin = this._totalMin),
                      (this._dirtyMax = this._totalMax),
                      (this._isDirty = !1)),
                    this._dirtyMin < this._dirtyMax &&
                      (e.bufferSubData(
                        e.ARRAY_BUFFER,
                        this._dirtyMin,
                        this._bytes.subarray(this._dirtyMin, this._dirtyMax)
                      ),
                      (this._dirtyMin = t.INT_MAX),
                      (this._dirtyMax = 0));
                }
                _growDirtyRegion(t, e) {
                  (this._dirtyMin = Math.min(this._dirtyMin, t)),
                    (this._dirtyMax = Math.max(this._dirtyMax, e)),
                    (this._totalMin = Math.min(this._totalMin, t)),
                    (this._totalMax = Math.max(this._totalMax, e));
                }
                static from(e) {
                  return i(null == e || e instanceof t), e;
                }
              }
              return (t.INT_MAX = 2147483647), t;
            })();
            class p {
              constructor(
                t,
                e,
                i,
                r,
                s = null,
                n = null,
                h = 0,
                a = !0,
                _ = !0
              ) {
                (this._context = t),
                  (this._format = e),
                  (this._width = i),
                  (this._height = r),
                  (this._pixels = s),
                  (this._texture = n),
                  (this._generation = h),
                  (this._isFormatDirty = a),
                  (this._isContentDirty = _);
              }
              get context() {
                return this._context;
              }
              get format() {
                return this._format;
              }
              get width() {
                return this._width;
              }
              get height() {
                return this._height;
              }
              resize(t, e, i = null) {
                (this._width = t),
                  (this._height = e),
                  (this._pixels = i),
                  (this._isContentDirty = !0);
              }
              setFormat(t) {
                this._format != t &&
                  ((this._format = t), (this._isFormatDirty = !0));
              }
              get texture() {
                let t = this._context.gl;
                return (
                  this._generation != this._context.generation &&
                    ((this._texture = t.createTexture()),
                    (this._generation = this._context.generation),
                    (this._isFormatDirty = !0),
                    (this._isContentDirty = !0)),
                  this._isFormatDirty &&
                    (t.bindTexture(t.TEXTURE_2D, this._texture),
                    t.texParameteri(
                      t.TEXTURE_2D,
                      t.TEXTURE_MAG_FILTER,
                      this.format.magFilter == h.PixelFilter.NEAREST
                        ? t.NEAREST
                        : t.LINEAR
                    ),
                    t.texParameteri(
                      t.TEXTURE_2D,
                      t.TEXTURE_MIN_FILTER,
                      this.format.minFilter == h.PixelFilter.NEAREST
                        ? t.NEAREST
                        : t.LINEAR
                    ),
                    t.texParameteri(
                      t.TEXTURE_2D,
                      t.TEXTURE_WRAP_S,
                      this.format.wrap == h.PixelWrap.REPEAT
                        ? t.REPEAT
                        : t.CLAMP_TO_EDGE
                    ),
                    t.texParameteri(
                      t.TEXTURE_2D,
                      t.TEXTURE_WRAP_T,
                      this.format.wrap == h.PixelWrap.REPEAT
                        ? t.REPEAT
                        : t.CLAMP_TO_EDGE
                    ),
                    (this._isFormatDirty = !1)),
                  this._isContentDirty &&
                    (t.bindTexture(t.TEXTURE_2D, this._texture),
                    t.texImage2D(
                      t.TEXTURE_2D,
                      0,
                      t.RGBA,
                      this._width,
                      this._height,
                      0,
                      t.RGBA,
                      t.UNSIGNED_BYTE,
                      this._pixels
                    ),
                    (this._isContentDirty = !1)),
                  this._texture
                );
              }
              free() {
                this.texture &&
                  (this._context.gl.deleteTexture(this.texture),
                  (this._generation = 0));
              }
              static from(t) {
                return i(null == t || t instanceof p), t;
              }
            }
            class A {
              constructor(t, e, i = null, r = 0, s = !0, n = new h.Rect()) {
                (this._context = t),
                  (this._texture = e),
                  (this._framebuffer = i),
                  (this._generation = r),
                  (this._isDirty = s),
                  (this._viewport = n);
              }
              get context() {
                return this._context;
              }
              get texture() {
                return this._texture;
              }
              get viewport() {
                return this._viewport;
              }
              setColor(t) {
                this._texture != t &&
                  ((this._texture = p.from(t)), (this._isDirty = !0));
              }
              get framebuffer() {
                let t = this._context.gl,
                  e = this._texture.texture;
                return (
                  this._generation != this._context.generation &&
                    ((this._framebuffer = t.createFramebuffer()),
                    (this._generation = this._context.generation),
                    (this._isDirty = !0)),
                  this._isDirty &&
                    (t.bindFramebuffer(t.FRAMEBUFFER, this._framebuffer),
                    t.framebufferTexture2D(
                      t.FRAMEBUFFER,
                      t.COLOR_ATTACHMENT0,
                      t.TEXTURE_2D,
                      e,
                      0
                    ),
                    i(
                      t.checkFramebufferStatus(t.FRAMEBUFFER) ==
                        t.FRAMEBUFFER_COMPLETE
                    ),
                    (this._isDirty = !1)),
                  this._framebuffer
                );
              }
              free() {
                this._framebuffer &&
                  (this._context.gl.deleteFramebuffer(this._framebuffer),
                  (this._generation = 0));
              }
              static from(t) {
                return i(null == t || t instanceof A), t;
              }
            }
          })(a || (exports.WebGL = a = {}));
      },
      { process: "pBGv" },
    ],
    MMP6: [
      function (require, module, exports) {
        "use strict";
        function e(e, t, r) {
          let { m00: n, m01: o, m02: s, m10: i, m11: f, m12: m } = r;
          e.setUniformMat3(t, n, o, s, i, f, m, 0, 0, 1);
        }
        function t(e, t, r) {
          e.setUniformVec2(t, r.x, r.y);
        }
        function r(e, t, r) {
          e.setRenderTarget(t),
            e.setViewport(0, 0, t.texture.width, t.texture.height),
            r(),
            e.setRenderTarget(null);
        }
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.setUniformAffineTransform = e),
          (exports.setUniformVec2 = t),
          (exports.renderInto = r);
      },
      {},
    ],
    UGJH: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.RectangleBatchRenderer = exports.RectangleBatch = void 0);
        var e = require("../lib/math"),
          t = require("./graphics"),
          r = require("./utils");
        const i = new t.Graphics.VertexFormat();
        i.add("configSpacePos", t.Graphics.AttributeType.FLOAT, 2),
          i.add("color", t.Graphics.AttributeType.FLOAT, 3);
        const s =
            "\n  uniform mat3 configSpaceToNDC;\n\n  attribute vec2 configSpacePos;\n  attribute vec3 color;\n  varying vec3 vColor;\n\n  void main() {\n    vColor = color;\n    vec2 position = (configSpaceToNDC * vec3(configSpacePos, 1)).xy;\n    gl_Position = vec4(position, 1, 1);\n  }\n",
          n =
            "\n  precision mediump float;\n  varying vec3 vColor;\n\n  void main() {\n    gl_FragColor = vec4(vColor.rgb, 1);\n  }\n";
        class o {
          constructor(e) {
            (this.gl = e),
              (this.rects = []),
              (this.colors = []),
              (this.buffer = null);
          }
          getRectCount() {
            return this.rects.length;
          }
          getBuffer() {
            if (this.buffer) return this.buffer;
            const e = [
                [0, 0],
                [1, 0],
                [0, 1],
                [1, 0],
                [0, 1],
                [1, 1],
              ],
              t = new Uint8Array(i.stride * e.length * this.rects.length),
              r = new Float32Array(t.buffer);
            let s = 0;
            for (let i = 0; i < this.rects.length; i++) {
              const t = this.rects[i],
                n = this.colors[i];
              for (let i of e)
                (r[s++] = t.origin.x + i[0] * t.size.x),
                  (r[s++] = t.origin.y + i[1] * t.size.y),
                  (r[s++] = n.r),
                  (r[s++] = n.g),
                  (r[s++] = n.b);
            }
            if (s !== r.length)
              throw new Error("Buffer expected to be full but wasn't");
            return (
              (this.buffer = this.gl.createVertexBuffer(t.length)),
              this.buffer.upload(t),
              this.buffer
            );
          }
          addRect(e, t) {
            this.rects.push(e),
              this.colors.push(t),
              this.buffer && (this.buffer.free(), (this.buffer = null));
          }
          free() {
            this.buffer && (this.buffer.free(), (this.buffer = null));
          }
        }
        exports.RectangleBatch = o;
        class c {
          constructor(e) {
            (this.gl = e), (this.material = e.createMaterial(i, s, n));
          }
          render(i) {
            (0, r.setUniformAffineTransform)(
              this.material,
              "configSpaceToNDC",
              (() => {
                const t = e.AffineTransform.betweenRects(
                    i.configSpaceSrcRect,
                    i.physicalSpaceDstRect
                  ),
                  r = new e.Vec2(
                    this.gl.viewport.width,
                    this.gl.viewport.height
                  );
                return e.AffineTransform.withTranslation(new e.Vec2(-1, 1))
                  .times(
                    e.AffineTransform.withScale(
                      new e.Vec2(2, -2).dividedByPointwise(r)
                    )
                  )
                  .times(t);
              })()
            ),
              this.gl.setUnpremultipliedBlendState(),
              this.gl.draw(
                t.Graphics.Primitive.TRIANGLES,
                this.material,
                i.batch.getBuffer()
              );
          }
        }
        exports.RectangleBatchRenderer = c;
      },
      { "../lib/math": "tDuZ", "./graphics": "XGYN", "./utils": "MMP6" },
    ],
    cFC1: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.RowAtlas = void 0);
        var e = require("../lib/lru-cache"),
          t = require("./rectangle-batch-renderer"),
          r = require("../lib/math"),
          i = require("../lib/color"),
          c = require("./graphics"),
          h = require("./utils");
        class a {
          constructor(h, a, s) {
            (this.gl = h),
              (this.rectangleBatchRenderer = a),
              (this.textureRenderer = s),
              (this.texture = h.createTexture(
                c.Graphics.TextureFormat.NEAREST_CLAMP,
                4096,
                4096
              )),
              (this.renderTarget = h.createRenderTarget(this.texture)),
              (this.rowCache = new e.LRUCache(this.texture.height)),
              (this.clearLineBatch = new t.RectangleBatch(h)),
              this.clearLineBatch.addRect(r.Rect.unit, new i.Color(0, 0, 0, 0)),
              h.addContextResetHandler(() => {
                this.rowCache.clear();
              });
          }
          has(e) {
            return this.rowCache.has(e);
          }
          getResolution() {
            return this.texture.width;
          }
          getCapacity() {
            return this.texture.height;
          }
          allocateLine(e) {
            if (this.rowCache.getSize() < this.rowCache.getCapacity()) {
              const t = this.rowCache.getSize();
              return this.rowCache.insert(e, t), t;
            }
            {
              const [, t] = this.rowCache.removeLRU();
              return this.rowCache.insert(e, t), t;
            }
          }
          writeToAtlasIfNeeded(e, t) {
            (0, h.renderInto)(this.gl, this.renderTarget, () => {
              for (let i of e) {
                let e = this.rowCache.get(i);
                if (null != e) continue;
                e = this.allocateLine(i);
                const c = new r.Rect(
                  new r.Vec2(0, e),
                  new r.Vec2(this.texture.width, 1)
                );
                this.rectangleBatchRenderer.render({
                  batch: this.clearLineBatch,
                  configSpaceSrcRect: r.Rect.unit,
                  physicalSpaceDstRect: c,
                }),
                  t(c, i);
              }
            });
          }
          renderViaAtlas(e, t) {
            let i = this.rowCache.get(e);
            if (null == i) return !1;
            const c = new r.Rect(
              new r.Vec2(0, i),
              new r.Vec2(this.texture.width, 1)
            );
            return (
              this.textureRenderer.render({
                texture: this.texture,
                srcRect: c,
                dstRect: t,
              }),
              !0
            );
          }
        }
        exports.RowAtlas = a;
      },
      {
        "../lib/lru-cache": "EhY8",
        "./rectangle-batch-renderer": "UGJH",
        "../lib/math": "tDuZ",
        "../lib/color": "x77Y",
        "./graphics": "XGYN",
        "./utils": "MMP6",
      },
    ],
    p3j0: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.TextureRenderer = void 0);
        var e = require("../lib/math"),
          t = require("./graphics"),
          r = require("./utils");
        const n =
            "\n  uniform mat3 uvTransform;\n  uniform mat3 positionTransform;\n\n  attribute vec2 position;\n  attribute vec2 uv;\n  varying vec2 vUv;\n\n  void main() {\n    vUv = (uvTransform * vec3(uv, 1)).xy;\n    gl_Position = vec4((positionTransform * vec3(position, 1)).xy, 0, 1);\n  }\n",
          i =
            "\n  precision mediump float;\n\n  varying vec2 vUv;\n  uniform sampler2D texture;\n\n  void main() {\n   gl_FragColor = texture2D(texture, vUv);\n  }\n";
        class s {
          constructor(e) {
            this.gl = e;
            const r = new t.Graphics.VertexFormat();
            r.add("position", t.Graphics.AttributeType.FLOAT, 2),
              r.add("uv", t.Graphics.AttributeType.FLOAT, 2);
            const s = [
                { pos: [-1, 1], uv: [0, 1] },
                { pos: [1, 1], uv: [1, 1] },
                { pos: [-1, -1], uv: [0, 0] },
                { pos: [1, -1], uv: [1, 0] },
              ],
              o = [];
            for (let t of s)
              o.push(t.pos[0]),
                o.push(t.pos[1]),
                o.push(t.uv[0]),
                o.push(t.uv[1]);
            (this.buffer = e.createVertexBuffer(r.stride * s.length)),
              this.buffer.upload(new Uint8Array(new Float32Array(o).buffer)),
              (this.material = e.createMaterial(r, n, i));
          }
          render(n) {
            this.material.setUniformSampler("texture", n.texture, 0),
              (0, r.setUniformAffineTransform)(
                this.material,
                "uvTransform",
                (() => {
                  const { srcRect: t, texture: r } = n,
                    i = e.AffineTransform.withTranslation(new e.Vec2(0, 1))
                      .times(e.AffineTransform.withScale(new e.Vec2(1, -1)))
                      .times(
                        e.AffineTransform.betweenRects(
                          new e.Rect(
                            e.Vec2.zero,
                            new e.Vec2(r.width, r.height)
                          ),
                          e.Rect.unit
                        )
                      )
                      .transformRect(t);
                  return e.AffineTransform.betweenRects(e.Rect.unit, i);
                })()
              ),
              (0, r.setUniformAffineTransform)(
                this.material,
                "positionTransform",
                (() => {
                  const { dstRect: t } = n,
                    { viewport: r } = this.gl,
                    i = new e.Vec2(r.width, r.height),
                    s = e.AffineTransform.withScale(new e.Vec2(1, -1))
                      .times(
                        e.AffineTransform.betweenRects(
                          new e.Rect(e.Vec2.zero, i),
                          e.Rect.NDC
                        )
                      )
                      .transformRect(t);
                  return e.AffineTransform.betweenRects(e.Rect.NDC, s);
                })()
              ),
              this.gl.setUnpremultipliedBlendState(),
              this.gl.draw(
                t.Graphics.Primitive.TRIANGLE_STRIP,
                this.material,
                this.buffer
              );
          }
        }
        exports.TextureRenderer = s;
      },
      { "../lib/math": "tDuZ", "./graphics": "XGYN", "./utils": "MMP6" },
    ],
    tdKg: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.ViewportRectangleRenderer = void 0);
        var e = require("../lib/color"),
          i = require("./graphics"),
          r = require("./utils");
        const o = new i.Graphics.VertexFormat();
        o.add("position", i.Graphics.AttributeType.FLOAT, 2);
        const n =
            "\n  attribute vec2 position;\n\n  void main() {\n    gl_Position = vec4(position, 0, 1);\n  }\n",
          t = (i) => {
            const { r: r, g: o, b: n } = e.Color.fromCSSHex(i.fgSecondaryColor),
              t = `${r.toFixed(1)}, ${o.toFixed(1)}, ${n.toFixed(1)}`;
            return `\n    precision mediump float;\n\n    uniform mat3 configSpaceToPhysicalViewSpace;\n    uniform vec2 physicalSize;\n    uniform vec2 physicalOrigin;\n    uniform vec2 configSpaceViewportOrigin;\n    uniform vec2 configSpaceViewportSize;\n    uniform float framebufferHeight;\n\n    void main() {\n      vec2 origin = (configSpaceToPhysicalViewSpace * vec3(configSpaceViewportOrigin, 1.0)).xy;\n      vec2 size = (configSpaceToPhysicalViewSpace * vec3(configSpaceViewportSize, 0.0)).xy;\n\n      vec2 halfSize = physicalSize / 2.0;\n\n      float borderWidth = 2.0;\n\n      origin = floor(origin * halfSize) / halfSize + borderWidth * vec2(1.0, 1.0);\n      size = floor(size * halfSize) / halfSize - 2.0 * borderWidth * vec2(1.0, 1.0);\n\n      vec2 coord = gl_FragCoord.xy;\n      coord.x = coord.x - physicalOrigin.x;\n      coord.y = framebufferHeight - coord.y - physicalOrigin.y;\n      vec2 clamped = clamp(coord, origin, origin + size);\n      vec2 gap = clamped - coord;\n      float maxdist = max(abs(gap.x), abs(gap.y));\n\n      // TOOD(jlfwong): Could probably optimize this to use mix somehow.\n      if (maxdist == 0.0) {\n        // Inside viewport rectangle\n        gl_FragColor = vec4(0, 0, 0, 0);\n      } else if (maxdist < borderWidth) {\n        // Inside viewport rectangle at border\n        gl_FragColor = vec4(${t}, 0.8);\n      } else {\n        // Outside viewport rectangle\n        gl_FragColor = vec4(${t}, 0.5);\n      }\n    }\n  `;
          };
        class a {
          constructor(e, i) {
            this.gl = e;
            const r = [
                [-1, 1],
                [1, 1],
                [-1, -1],
                [1, -1],
              ],
              a = [];
            for (let o of r) a.push(o[0]), a.push(o[1]);
            (this.buffer = e.createVertexBuffer(o.stride * r.length)),
              this.buffer.upload(new Uint8Array(new Float32Array(a).buffer)),
              (this.material = e.createMaterial(o, n, t(i)));
          }
          render(e) {
            (0, r.setUniformAffineTransform)(
              this.material,
              "configSpaceToPhysicalViewSpace",
              e.configSpaceToPhysicalViewSpace
            ),
              (0, r.setUniformVec2)(
                this.material,
                "configSpaceViewportOrigin",
                e.configSpaceViewportRect.origin
              ),
              (0, r.setUniformVec2)(
                this.material,
                "configSpaceViewportSize",
                e.configSpaceViewportRect.size
              );
            const o = this.gl.viewport;
            this.material.setUniformVec2("physicalOrigin", o.x, o.y),
              this.material.setUniformVec2("physicalSize", o.width, o.height),
              this.material.setUniformFloat(
                "framebufferHeight",
                this.gl.renderTargetHeightInPixels
              ),
              this.gl.setBlendState(
                i.Graphics.BlendOperation.SOURCE_ALPHA,
                i.Graphics.BlendOperation.INVERSE_SOURCE_ALPHA
              ),
              this.gl.draw(
                i.Graphics.Primitive.TRIANGLE_STRIP,
                this.material,
                this.buffer
              );
          }
        }
        exports.ViewportRectangleRenderer = a;
      },
      { "../lib/color": "x77Y", "./graphics": "XGYN", "./utils": "MMP6" },
    ],
    Q0ad: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.FlamechartColorPassRenderer = void 0);
        var e = require("../lib/math"),
          r = require("./graphics"),
          n = require("./utils");
        const t = new r.Graphics.VertexFormat();
        t.add("position", r.Graphics.AttributeType.FLOAT, 2),
          t.add("uv", r.Graphics.AttributeType.FLOAT, 2);
        const i =
            "\n  uniform mat3 uvTransform;\n  uniform mat3 positionTransform;\n\n  attribute vec2 position;\n  attribute vec2 uv;\n  varying vec2 vUv;\n\n  void main() {\n    vUv = (uvTransform * vec3(uv, 1)).xy;\n    gl_Position = vec4((positionTransform * vec3(position, 1)).xy, 0, 1);\n  }\n",
          o = (e) =>
            `\n  precision mediump float;\n\n  uniform vec2 uvSpacePixelSize;\n  uniform float renderOutlines;\n\n  varying vec2 vUv;\n  uniform sampler2D colorTexture;\n\n  // https://en.wikipedia.org/wiki/HSL_and_HSV#From_luma/chroma/hue\n  vec3 hcl2rgb(float H, float C, float L) {\n    float hPrime = H / 60.0;\n    float X = C * (1.0 - abs(mod(hPrime, 2.0) - 1.0));\n    vec3 RGB =\n      hPrime < 1.0 ? vec3(C, X, 0) :\n      hPrime < 2.0 ? vec3(X, C, 0) :\n      hPrime < 3.0 ? vec3(0, C, X) :\n      hPrime < 4.0 ? vec3(0, X, C) :\n      hPrime < 5.0 ? vec3(X, 0, C) :\n      vec3(C, 0, X);\n\n    float m = L - dot(RGB, vec3(0.30, 0.59, 0.11));\n    return RGB + vec3(m, m, m);\n  }\n\n  float triangle(float x) {\n    return 2.0 * abs(fract(x) - 0.5) - 1.0;\n  }\n\n  ${e}\n\n  void main() {\n    vec4 here = texture2D(colorTexture, vUv);\n\n    if (here.z == 0.0) {\n      // Background color\n      gl_FragColor = vec4(0, 0, 0, 0);\n      return;\n    }\n\n    // Sample the 4 surrounding pixels in the depth texture to determine\n    // if we should draw a boundary here or not.\n    vec4 N = texture2D(colorTexture, vUv + vec2(0, uvSpacePixelSize.y));\n    vec4 E = texture2D(colorTexture, vUv + vec2(uvSpacePixelSize.x, 0));\n    vec4 S = texture2D(colorTexture, vUv + vec2(0, -uvSpacePixelSize.y));\n    vec4 W = texture2D(colorTexture, vUv + vec2(-uvSpacePixelSize.x, 0));\n\n    // NOTE: For outline checks, we intentionally check both the right\n    // and the left to determine if we're an edge. If a rectangle is a single\n    // pixel wide, we don't want to render it as an outline, so this method\n    // of checking ensures that we don't outline single physical-space\n    // pixel width rectangles.\n    if (\n      renderOutlines > 0.0 &&\n      (\n        here.y == N.y && here.y != S.y || // Top edge\n        here.y == S.y && here.y != N.y || // Bottom edge\n        here.x == E.x && here.x != W.x || // Left edge\n        here.x == W.x && here.x != E.x\n      )\n    ) {\n      // We're on an edge! Draw transparent.\n      gl_FragColor = vec4(0, 0, 0, 0);\n    } else {\n      // Not on an edge. Draw the appropriate color.\n      gl_FragColor = vec4(colorForBucket(here.z), here.a);\n    }\n  }\n`;
        class a {
          constructor(e, r) {
            this.gl = e;
            const n = [
                { pos: [-1, 1], uv: [0, 1] },
                { pos: [1, 1], uv: [1, 1] },
                { pos: [-1, -1], uv: [0, 0] },
                { pos: [1, -1], uv: [1, 0] },
              ],
              a = [];
            for (let t of n)
              a.push(t.pos[0]),
                a.push(t.pos[1]),
                a.push(t.uv[0]),
                a.push(t.uv[1]);
            (this.buffer = e.createVertexBuffer(t.stride * n.length)),
              this.buffer.uploadFloats(a),
              (this.material = e.createMaterial(t, i, o(r.colorForBucketGLSL)));
          }
          render(t) {
            const { srcRect: i, rectInfoTexture: o } = t,
              a = e.AffineTransform.withTranslation(new e.Vec2(0, 1))
                .times(e.AffineTransform.withScale(new e.Vec2(1, -1)))
                .times(
                  e.AffineTransform.betweenRects(
                    new e.Rect(e.Vec2.zero, new e.Vec2(o.width, o.height)),
                    e.Rect.unit
                  )
                )
                .transformRect(i),
              s = e.AffineTransform.betweenRects(e.Rect.unit, a),
              { dstRect: c } = t,
              l = new e.Vec2(this.gl.viewport.width, this.gl.viewport.height),
              u = e.AffineTransform.withScale(new e.Vec2(1, -1))
                .times(
                  e.AffineTransform.betweenRects(
                    new e.Rect(e.Vec2.zero, l),
                    e.Rect.NDC
                  )
                )
                .transformRect(c),
              h = e.AffineTransform.betweenRects(e.Rect.NDC, u),
              f = e.Vec2.unit.dividedByPointwise(
                new e.Vec2(t.rectInfoTexture.width, t.rectInfoTexture.height)
              );
            this.material.setUniformSampler(
              "colorTexture",
              t.rectInfoTexture,
              0
            ),
              (0, n.setUniformAffineTransform)(this.material, "uvTransform", s),
              this.material.setUniformFloat(
                "renderOutlines",
                t.renderOutlines ? 1 : 0
              ),
              this.material.setUniformVec2("uvSpacePixelSize", f.x, f.y),
              (0, n.setUniformAffineTransform)(
                this.material,
                "positionTransform",
                h
              ),
              this.gl.setUnpremultipliedBlendState(),
              this.gl.draw(
                r.Graphics.Primitive.TRIANGLE_STRIP,
                this.material,
                this.buffer
              );
          }
        }
        exports.FlamechartColorPassRenderer = a;
      },
      { "../lib/math": "tDuZ", "./graphics": "XGYN", "./utils": "MMP6" },
    ],
    KwET: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.CanvasContext = void 0);
        var e = require("./graphics"),
          r = require("./rectangle-batch-renderer"),
          t = require("./texture-renderer"),
          i = require("../lib/math"),
          n = require("./overlay-rectangle-renderer"),
          s = require("./flamechart-color-pass-renderer"),
          o = require("../lib/color");
        class a {
          constructor(i, a) {
            (this.animationFrameRequest = null),
              (this.beforeFrameHandlers = new Set()),
              (this.onBeforeFrame = () => {
                (this.animationFrameRequest = null),
                  this.gl.setViewport(
                    0,
                    0,
                    this.gl.renderTargetWidthInPixels,
                    this.gl.renderTargetHeightInPixels
                  );
                const r = o.Color.fromCSSHex(this.theme.bgPrimaryColor);
                this.gl.clear(new e.Graphics.Color(r.r, r.g, r.b, r.a));
                for (const e of this.beforeFrameHandlers) e();
              }),
              (this.gl = new e.WebGL.Context(i)),
              (this.rectangleBatchRenderer = new r.RectangleBatchRenderer(
                this.gl
              )),
              (this.textureRenderer = new t.TextureRenderer(this.gl)),
              (this.viewportRectangleRenderer = new n.ViewportRectangleRenderer(
                this.gl,
                a
              )),
              (this.flamechartColorPassRenderer =
                new s.FlamechartColorPassRenderer(this.gl, a)),
              (this.theme = a),
              this.gl.addAfterResizeEventHandler(this.onBeforeFrame);
            const l = this.gl.getWebGLInfo();
            l &&
              console.log(
                `WebGL initialized. renderer: ${l.renderer}, vendor: ${l.vendor}, version: ${l.version}`
              ),
              (window.testContextLoss = () => {
                this.gl.testContextLoss();
              });
          }
          addBeforeFrameHandler(e) {
            this.beforeFrameHandlers.add(e);
          }
          removeBeforeFrameHandler(e) {
            this.beforeFrameHandlers.delete(e);
          }
          requestFrame() {
            this.animationFrameRequest ||
              (this.animationFrameRequest = requestAnimationFrame(
                this.onBeforeFrame
              ));
          }
          setViewport(e, r) {
            const { origin: t, size: i } = e;
            let n = this.gl.viewport;
            this.gl.setViewport(t.x, t.y, i.x, i.y), r();
            let { x: s, y: o, width: a, height: l } = n;
            this.gl.setViewport(s, o, a, l);
          }
          renderBehind(e, r) {
            const t = e.getBoundingClientRect(),
              n = new i.Rect(
                new i.Vec2(
                  t.left * window.devicePixelRatio,
                  t.top * window.devicePixelRatio
                ),
                new i.Vec2(
                  t.width * window.devicePixelRatio,
                  t.height * window.devicePixelRatio
                )
              );
            this.setViewport(n, r);
          }
        }
        exports.CanvasContext = a;
      },
      {
        "./graphics": "XGYN",
        "./rectangle-batch-renderer": "UGJH",
        "./texture-renderer": "p3j0",
        "../lib/math": "tDuZ",
        "./overlay-rectangle-renderer": "tdKg",
        "./flamechart-color-pass-renderer": "Q0ad",
        "../lib/color": "x77Y",
      },
    ],
    hEOZ: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.getFrameToColorBucket =
            exports.getProfileToView =
            exports.getRowAtlas =
            exports.getCanvasContext =
            exports.createGetCSSColorForFrame =
            exports.createGetColorBucketForFrame =
              void 0);
        var e = require("../lib/utils"),
          t = require("../gl/row-atlas"),
          o = require("../gl/canvas-context");
        const r = (0, e.memoizeByReference)((e) => (t) => e.get(t.key) || 0);
        exports.createGetColorBucketForFrame = r;
        const n = (0, e.memoizeByShallowEquality)(
          ({ theme: e, frameToColorBucket: t }) => {
            const o = r(t);
            return (t) => {
              const r = o(t) / 255;
              return e.colorForBucket(r).toCSS();
            };
          }
        );
        exports.createGetCSSColorForFrame = n;
        const a = (0, e.memoizeByShallowEquality)(
          ({ theme: e, canvas: t }) => new o.CanvasContext(t, e)
        );
        exports.getCanvasContext = a;
        const s = (0, e.memoizeByReference)(
          (e) =>
            new t.RowAtlas(e.gl, e.rectangleBatchRenderer, e.textureRenderer)
        );
        exports.getRowAtlas = s;
        const l = (0, e.memoizeByShallowEquality)(
          ({ profile: e, flattenRecursion: t }) =>
            t ? e.getProfileWithRecursionFlattened() : e
        );
        exports.getProfileToView = l;
        const c = (0, e.memoizeByReference)((e) => {
          const t = [];
          function o(e) {
            return (e.file || "") + e.name;
          }
          e.forEachFrame((e) => t.push(e)),
            t.sort(function (e, t) {
              return o(e) > o(t) ? 1 : -1;
            });
          const r = new Map();
          for (let n = 0; n < t.length; n++)
            r.set(t[n].key, Math.floor((255 * n) / t.length));
          return r;
        });
        exports.getFrameToColorBucket = c;
      },
      {
        "../lib/utils": "ucYa",
        "../gl/row-atlas": "cFC1",
        "../gl/canvas-context": "KwET",
      },
    ],
    Erwv: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.Provider = o),
          (exports.useDispatch = s),
          (exports.useActionCreator = u),
          (exports.useSelector = c);
        var e = require("preact"),
          t = require("preact/hooks");
        const r = (0, e.createContext)(null);
        function o(t) {
          return (0, e.h)(r.Provider, { value: t.store, children: t.children });
        }
        function n() {
          const e = (0, t.useContext)(r);
          if (null == e)
            throw new Error("Called useStore when no store exists in context");
          return e;
        }
        function s() {
          return n().dispatch;
        }
        function u(e, r) {
          const o = s(),
            n = (0, t.useCallback)(e, r);
          return (0, t.useCallback)((e) => o(n(e)), [o, n]);
        }
        function c(e, r) {
          const o = n(),
            s = (0, t.useCallback)(e, r),
            u = (0, t.useCallback)(() => s(o.getState()), [o, s]),
            [c, a] = (0, t.useState)(u);
          return (
            (0, t.useLayoutEffect)(
              () => (
                a(u()),
                o.subscribe(() => {
                  a(u());
                })
              ),
              [o, u]
            ),
            c
          );
        }
      },
      { preact: "aSor", "preact/hooks": "MwGB" },
    ],
    AQ6k: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var e = {
          version: !0,
          Children: !0,
          render: !0,
          hydrate: !0,
          unmountComponentAtNode: !0,
          createPortal: !0,
          createFactory: !0,
          cloneElement: !0,
          isValidElement: !0,
          findDOMNode: !0,
          PureComponent: !0,
          memo: !0,
          forwardRef: !0,
          unstable_batchedUpdates: !0,
          Suspense: !0,
          SuspenseList: !0,
          lazy: !0,
          createElement: !0,
          createContext: !0,
          createRef: !0,
          Fragment: !0,
          Component: !0,
        };
        (exports.render = E),
          (exports.hydrate = k),
          (exports.unmountComponentAtNode = j),
          (exports.createPortal = C),
          (exports.createFactory = A),
          (exports.cloneElement = U),
          (exports.isValidElement = S),
          (exports.findDOMNode = F),
          (exports.memo = i),
          (exports.forwardRef = l),
          (exports.Suspense = d),
          (exports.SuspenseList = v),
          (exports.lazy = m),
          Object.defineProperty(exports, "createElement", {
            enumerable: !0,
            get: function () {
              return n.createElement;
            },
          }),
          Object.defineProperty(exports, "createContext", {
            enumerable: !0,
            get: function () {
              return n.createContext;
            },
          }),
          Object.defineProperty(exports, "createRef", {
            enumerable: !0,
            get: function () {
              return n.createRef;
            },
          }),
          Object.defineProperty(exports, "Fragment", {
            enumerable: !0,
            get: function () {
              return n.Fragment;
            },
          }),
          Object.defineProperty(exports, "Component", {
            enumerable: !0,
            get: function () {
              return n.Component;
            },
          }),
          (exports.unstable_batchedUpdates =
            exports.PureComponent =
            exports.Children =
            exports.version =
            exports.default =
              void 0);
        var t = require("preact/hooks");
        Object.keys(t).forEach(function (n) {
          "default" !== n &&
            "__esModule" !== n &&
            (Object.prototype.hasOwnProperty.call(e, n) ||
              Object.defineProperty(exports, n, {
                enumerable: !0,
                get: function () {
                  return t[n];
                },
              }));
        });
        var n = require("preact");
        function r(e, t) {
          for (var n in t) e[n] = t[n];
          return e;
        }
        function o(e, t) {
          for (var n in e) if ("__source" !== n && !(n in t)) return !0;
          for (var r in t) if ("__source" !== r && e[r] !== t[r]) return !0;
          return !1;
        }
        var u = (function (e) {
          var t, n;
          function r(t) {
            var n;
            return ((n = e.call(this, t) || this).isPureReactComponent = !0), n;
          }
          return (
            (n = e),
            ((t = r).prototype = Object.create(n.prototype)),
            (t.prototype.constructor = t),
            (t.__proto__ = n),
            (r.prototype.shouldComponentUpdate = function (e, t) {
              return o(this.props, e) || o(this.state, t);
            }),
            r
          );
        })(n.Component);
        function i(e, t) {
          function u(e) {
            var n = this.props.ref,
              r = n == e.ref;
            return (
              !r && n && (n.call ? n(null) : (n.current = null)),
              t ? !t(this.props, e) || !r : o(this.props, e)
            );
          }
          function i(t) {
            return (
              (this.shouldComponentUpdate = u),
              (0, n.createElement)(e, r({}, t))
            );
          }
          return (
            (i.prototype.isReactComponent = !0),
            (i.displayName = "Memo(" + (e.displayName || e.name) + ")"),
            (i.t = !0),
            i
          );
        }
        exports.PureComponent = u;
        var a = n.options.__b;
        function l(e) {
          function t(t) {
            var n = r({}, t);
            return delete n.ref, e(n, t.ref);
          }
          return (
            (t.prototype.isReactComponent = t.t = !0),
            (t.displayName = "ForwardRef(" + (e.displayName || e.name) + ")"),
            t
          );
        }
        n.options.__b = function (e) {
          e.type &&
            e.type.t &&
            e.ref &&
            ((e.props.ref = e.ref), (e.ref = null)),
            a && a(e);
        };
        var c = function (e, t) {
            return e
              ? (0, n.toChildArray)(e).reduce(function (e, n, r) {
                  return e.concat(t(n, r));
                }, [])
              : null;
          },
          p = {
            map: c,
            forEach: c,
            count: function (e) {
              return e ? (0, n.toChildArray)(e).length : 0;
            },
            only: function (e) {
              if (1 !== (e = (0, n.toChildArray)(e)).length)
                throw new Error("Children.only() expects only one child.");
              return e[0];
            },
            toArray: n.toChildArray,
          },
          s = n.options.__e;
        function f(e) {
          return (
            e && (((e = r({}, e)).__c = null), (e.__k = e.__k && e.__k.map(f))),
            e
          );
        }
        function d() {
          (this.__u = 0), (this.o = null), (this.__b = null);
        }
        function _(e) {
          var t = e.__.__c;
          return t && t.u && t.u(e);
        }
        function m(e) {
          var t, r, o;
          function u(u) {
            if (
              (t ||
                (t = e()).then(
                  function (e) {
                    r = e.default || e;
                  },
                  function (e) {
                    o = e;
                  }
                ),
              o)
            )
              throw o;
            if (!r) throw t;
            return (0, n.createElement)(r, u);
          }
          return (u.displayName = "Lazy"), (u.t = !0), u;
        }
        function v() {
          (this.i = null), (this.l = null);
        }
        (exports.Children = p),
          (n.options.__e = function (e, t, n) {
            if (e.then)
              for (var r, o = t; (o = o.__); )
                if ((r = o.__c) && r.__c) return r.__c(e, t.__c);
            s(e, t, n);
          }),
          ((d.prototype = new n.Component()).__c = function (e, t) {
            var n = this;
            null == n.o && (n.o = []), n.o.push(t);
            var r = _(n.__v),
              o = !1,
              u = function () {
                o || ((o = !0), r ? r(i) : i());
              };
            (t.__c = t.componentWillUnmount),
              (t.componentWillUnmount = function () {
                u(), t.__c && t.__c();
              });
            var i = function () {
              var e;
              if (!--n.__u)
                for (
                  n.__v.__k[0] = n.state.u, n.setState({ u: (n.__b = null) });
                  (e = n.o.pop());

                )
                  e.forceUpdate();
            };
            n.__u++ || n.setState({ u: (n.__b = n.__v.__k[0]) }), e.then(u, u);
          }),
          (d.prototype.render = function (e, t) {
            return (
              this.__b && ((this.__v.__k[0] = f(this.__b)), (this.__b = null)),
              [
                (0, n.createElement)(
                  n.Component,
                  null,
                  t.u ? null : e.children
                ),
                t.u && e.fallback,
              ]
            );
          });
        var h = function (e, t, n) {
          if (
            (++n[1] === n[0] && e.l.delete(t),
            e.props.revealOrder &&
              ("t" !== e.props.revealOrder[0] || !e.l.size))
          )
            for (n = e.i; n; ) {
              for (; n.length > 3; ) n.pop()();
              if (n[1] < n[0]) break;
              e.i = n = n[2];
            }
        };
        ((v.prototype = new n.Component()).u = function (e) {
          var t = this,
            n = _(t.__v),
            r = t.l.get(e);
          return (
            r[0]++,
            function (o) {
              var u = function () {
                t.props.revealOrder ? (r.push(o), h(t, e, r)) : o();
              };
              n ? n(u) : u();
            }
          );
        }),
          (v.prototype.render = function (e) {
            (this.i = null), (this.l = new Map());
            var t = (0, n.toChildArray)(e.children);
            e.revealOrder && "b" === e.revealOrder[0] && t.reverse();
            for (var r = t.length; r--; )
              this.l.set(t[r], (this.i = [1, 0, this.i]));
            return e.children;
          }),
          (v.prototype.componentDidUpdate = v.prototype.componentDidMount =
            function () {
              var e = this;
              e.l.forEach(function (t, n) {
                h(e, n, t);
              });
            });
        var y = (function () {
          function e() {}
          var t = e.prototype;
          return (
            (t.getChildContext = function () {
              return this.props.context;
            }),
            (t.render = function (e) {
              return e.children;
            }),
            e
          );
        })();
        function b(e) {
          var t = this,
            r = e.container,
            o = (0, n.createElement)(y, { context: t.context }, e.vnode);
          return (
            t.s &&
              t.s !== r &&
              (t.v.parentNode && t.s.removeChild(t.v),
              (0, n._unmount)(t.h),
              (t.p = !1)),
            e.vnode
              ? t.p
                ? ((r.__k = t.__k), (0, n.render)(o, r), (t.__k = r.__k))
                : ((t.v = document.createTextNode("")),
                  (0, n.hydrate)("", r),
                  r.appendChild(t.v),
                  (t.p = !0),
                  (t.s = r),
                  (0, n.render)(o, r, t.v),
                  (t.__k = t.v.__k))
              : t.p &&
                (t.v.parentNode && t.s.removeChild(t.v), (0, n._unmount)(t.h)),
            (t.h = o),
            (t.componentWillUnmount = function () {
              t.v.parentNode && t.s.removeChild(t.v), (0, n._unmount)(t.h);
            }),
            null
          );
        }
        function C(e, t) {
          return (0, n.createElement)(b, { vnode: e, container: t });
        }
        var x =
          /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
        n.Component.prototype.isReactComponent = {};
        var g =
          ("undefined" != typeof Symbol &&
            Symbol.for &&
            Symbol.for("react.element")) ||
          60103;
        function E(e, t, r) {
          if (null == t.__k) for (; t.firstChild; ) t.removeChild(t.firstChild);
          return (
            (0, n.render)(e, t), "function" == typeof r && r(), e ? e.__c : null
          );
        }
        function k(e, t, r) {
          return (
            (0, n.hydrate)(e, t),
            "function" == typeof r && r(),
            e ? e.__c : null
          );
        }
        var P = n.options.event;
        function N(e, t) {
          e["UNSAFE_" + t] &&
            !e[t] &&
            Object.defineProperty(e, t, {
              configurable: !1,
              get: function () {
                return this["UNSAFE_" + t];
              },
              set: function (e) {
                this["UNSAFE_" + t] = e;
              },
            });
        }
        n.options.event = function (e) {
          P && (e = P(e)), (e.persist = function () {});
          var t = !1,
            n = !1,
            r = e.stopPropagation;
          e.stopPropagation = function () {
            r.call(e), (t = !0);
          };
          var o = e.preventDefault;
          return (
            (e.preventDefault = function () {
              o.call(e), (n = !0);
            }),
            (e.isPropagationStopped = function () {
              return t;
            }),
            (e.isDefaultPrevented = function () {
              return n;
            }),
            (e.nativeEvent = e)
          );
        };
        var O = {
            configurable: !0,
            get: function () {
              return this.class;
            },
          },
          R = n.options.vnode;
        n.options.vnode = function (e) {
          e.$$typeof = g;
          var t = e.type,
            r = e.props;
          if (t) {
            if (
              (r.class != r.className &&
                ((O.enumerable = "className" in r),
                null != r.className && (r.class = r.className),
                Object.defineProperty(r, "className", O)),
              "function" != typeof t)
            ) {
              var o, u, i;
              for (i in (r.defaultValue &&
                void 0 !== r.value &&
                (r.value || 0 === r.value || (r.value = r.defaultValue),
                delete r.defaultValue),
              Array.isArray(r.value) &&
                r.multiple &&
                "select" === t &&
                ((0, n.toChildArray)(r.children).forEach(function (e) {
                  -1 != r.value.indexOf(e.props.value) &&
                    (e.props.selected = !0);
                }),
                delete r.value),
              r))
                if ((o = x.test(i))) break;
              if (o)
                for (i in ((u = e.props = {}), r))
                  u[
                    x.test(i) ? i.replace(/[A-Z0-9]/, "-$&").toLowerCase() : i
                  ] = r[i];
            }
            !(function (t) {
              var n = e.type,
                r = e.props;
              if (r && "string" == typeof n) {
                var o = {};
                for (var u in r)
                  /^on(Ani|Tra|Tou)/.test(u) &&
                    ((r[u.toLowerCase()] = r[u]), delete r[u]),
                    (o[u.toLowerCase()] = u);
                if (
                  (o.ondoubleclick &&
                    ((r.ondblclick = r[o.ondoubleclick]),
                    delete r[o.ondoubleclick]),
                  o.onbeforeinput &&
                    ((r.onbeforeinput = r[o.onbeforeinput]),
                    delete r[o.onbeforeinput]),
                  o.onchange &&
                    ("textarea" === n ||
                      ("input" === n.toLowerCase() &&
                        !/^fil|che|ra/i.test(r.type))))
                ) {
                  var i = o.oninput || "oninput";
                  r[i] || ((r[i] = r[o.onchange]), delete r[o.onchange]);
                }
              }
            })(),
              "function" == typeof t &&
                !t.m &&
                t.prototype &&
                (N(t.prototype, "componentWillMount"),
                N(t.prototype, "componentWillReceiveProps"),
                N(t.prototype, "componentWillUpdate"),
                (t.m = !0));
          }
          R && R(e);
        };
        var w = "16.8.0";
        function A(e) {
          return n.createElement.bind(null, e);
        }
        function S(e) {
          return !!e && e.$$typeof === g;
        }
        function U(e) {
          return S(e) ? n.cloneElement.apply(null, arguments) : e;
        }
        function j(e) {
          return !!e.__k && ((0, n.render)(null, e), !0);
        }
        function F(e) {
          return (e && (e.base || (1 === e.nodeType && e))) || null;
        }
        exports.version = w;
        var L = function (e, t) {
          return e(t);
        };
        exports.unstable_batchedUpdates = L;
        var M = {
          useState: t.useState,
          useReducer: t.useReducer,
          useEffect: t.useEffect,
          useLayoutEffect: t.useLayoutEffect,
          useRef: t.useRef,
          useImperativeHandle: t.useImperativeHandle,
          useMemo: t.useMemo,
          useCallback: t.useCallback,
          useContext: t.useContext,
          useDebugValue: t.useDebugValue,
          version: "16.8.0",
          Children: p,
          render: E,
          hydrate: E,
          unmountComponentAtNode: j,
          createPortal: C,
          createElement: n.createElement,
          createContext: n.createContext,
          createFactory: A,
          cloneElement: U,
          createRef: n.createRef,
          Fragment: n.Fragment,
          isValidElement: S,
          findDOMNode: F,
          Component: n.Component,
          PureComponent: u,
          memo: i,
          forwardRef: l,
          unstable_batchedUpdates: L,
          Suspense: d,
          SuspenseList: v,
          lazy: m,
        };
        exports.default = M;
      },
      { "preact/hooks": "MwGB", preact: "aSor" },
    ],
    gFMr: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.Flamechart = void 0);
        var t = require("./utils"),
          e = require("./math");
        class i {
          constructor(e) {
            (this.source = e),
              (this.layers = []),
              (this.totalWeight = 0),
              (this.minFrameWidth = 1);
            const i = [];
            this.minFrameWidth = 1 / 0;
            (this.totalWeight = e.getTotalWeight()),
              e.forEachCall(
                (e, r) => {
                  const s = (0, t.lastOf)(i),
                    h = { node: e, parent: s, children: [], start: r, end: r };
                  s && s.children.push(h), i.push(h);
                },
                (t, e) => {
                  console.assert(i.length > 0);
                  const r = i.pop();
                  if (((r.end = e), r.end - r.start == 0)) return;
                  const s = i.length;
                  for (; this.layers.length <= s; ) this.layers.push([]);
                  this.layers[s].push(r),
                    (this.minFrameWidth = Math.min(
                      this.minFrameWidth,
                      r.end - r.start
                    ));
                }
              ),
              isFinite(this.minFrameWidth) || (this.minFrameWidth = 1);
          }
          getTotalWeight() {
            return this.totalWeight;
          }
          getLayers() {
            return this.layers;
          }
          getColorBucketForFrame(t) {
            return this.source.getColorBucketForFrame(t);
          }
          getMinFrameWidth() {
            return this.minFrameWidth;
          }
          formatValue(t) {
            return this.source.formatValue(t);
          }
          getClampedViewportWidth(t) {
            const i = this.getTotalWeight(),
              r = Math.pow(2, 40),
              s = (0, e.clamp)(3 * this.getMinFrameWidth(), i / r, i);
            return (0, e.clamp)(t, s, i);
          }
          getClampedConfigSpaceViewportRect({
            configSpaceViewportRect: t,
            renderInverted: i,
          }) {
            const r = new e.Vec2(
                this.getTotalWeight(),
                this.getLayers().length
              ),
              s = this.getClampedViewportWidth(t.size.x),
              h = t.size.withX(s),
              a = e.Vec2.clamp(
                t.origin,
                new e.Vec2(0, i ? 0 : -1),
                e.Vec2.max(e.Vec2.zero, r.minus(h).plus(new e.Vec2(0, 1)))
              );
            return new e.Rect(a, t.size.withX(s));
          }
        }
        exports.Flamechart = i;
      },
      { "./utils": "ucYa", "./math": "tDuZ" },
    ],
    P80v: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.FlamechartRenderer = exports.FlamechartRowAtlasKey = void 0);
        var e = require("./rectangle-batch-renderer"),
          t = require("../lib/math"),
          r = require("../lib/color"),
          n = require("../lib/utils"),
          s = require("./graphics"),
          o = require("./utils");
        const c = 1e4;
        class i {
          constructor(e, t, r) {
            (this.batch = e),
              (this.bounds = t),
              (this.numPrecedingRectanglesInRow = r),
              (this.children = []);
          }
          getBatch() {
            return this.batch;
          }
          getBounds() {
            return this.bounds;
          }
          getRectCount() {
            return this.batch.getRectCount();
          }
          getChildren() {
            return this.children;
          }
          getParity() {
            return this.numPrecedingRectanglesInRow % 2;
          }
          forEachLeafNodeWithinBounds(e, t) {
            this.bounds.hasIntersectionWith(e) && t(this);
          }
        }
        class h {
          constructor(e) {
            if (((this.children = e), (this.rectCount = 0), 0 === e.length))
              throw new Error("Empty interior node");
            let r = 1 / 0,
              n = -1 / 0,
              s = 1 / 0,
              o = -1 / 0;
            for (let t of e) {
              this.rectCount += t.getRectCount();
              const e = t.getBounds();
              (r = Math.min(r, e.left())),
                (n = Math.max(n, e.right())),
                (s = Math.min(s, e.top())),
                (o = Math.max(o, e.bottom()));
            }
            this.bounds = new t.Rect(
              new t.Vec2(r, s),
              new t.Vec2(n - r, o - s)
            );
          }
          getBounds() {
            return this.bounds;
          }
          getRectCount() {
            return this.rectCount;
          }
          getChildren() {
            return this.children;
          }
          forEachLeafNodeWithinBounds(e, t) {
            if (this.bounds.hasIntersectionWith(e))
              for (let r of this.children) r.forEachLeafNodeWithinBounds(e, t);
          }
        }
        class a {
          constructor(e) {
            (this.stackDepth = e.stackDepth),
              (this.zoomLevel = e.zoomLevel),
              (this.index = e.index);
          }
          get key() {
            return `${this.stackDepth}_${this.index}_${this.zoomLevel}`;
          }
          static getOrInsert(e, t) {
            return e.getOrInsert(new a(t));
          }
        }
        exports.FlamechartRowAtlasKey = a;
        class l {
          constructor(s, o, a, l, g, d = { inverted: !1 }) {
            (this.gl = s),
              (this.rowAtlas = o),
              (this.flamechart = a),
              (this.rectangleBatchRenderer = l),
              (this.colorPassRenderer = g),
              (this.options = d),
              (this.layers = []),
              (this.rectInfoTexture = null),
              (this.rectInfoRenderTarget = null),
              (this.atlasKeys = new n.KeyedSet());
            const f = a.getLayers().length;
            for (let n = 0; n < f; n++) {
              const s = [],
                o = d.inverted ? f - 1 - n : n;
              let l = 1 / 0,
                g = -1 / 0,
                u = new e.RectangleBatch(this.gl),
                R = 0;
              const w = a.getLayers()[n];
              for (let h = 0; h < w.length; h++) {
                const a = w[h];
                u.getRectCount() >= c &&
                  (s.push(
                    new i(
                      u,
                      new t.Rect(new t.Vec2(l, o), new t.Vec2(g - l, 1)),
                      R
                    )
                  ),
                  (l = 1 / 0),
                  (g = -1 / 0),
                  (u = new e.RectangleBatch(this.gl)));
                const d = new t.Rect(
                  new t.Vec2(a.start, o),
                  new t.Vec2(a.end - a.start, 1)
                );
                (l = Math.min(l, d.left())), (g = Math.max(g, d.right()));
                const f = new r.Color(
                  (1 + (h % 255)) / 256,
                  (1 + (n % 255)) / 256,
                  (1 + this.flamechart.getColorBucketForFrame(a.node.frame)) /
                    256
                );
                u.addRect(d, f), R++;
              }
              u.getRectCount() > 0 &&
                s.push(
                  new i(
                    u,
                    new t.Rect(new t.Vec2(l, o), new t.Vec2(g - l, 1)),
                    R
                  )
                ),
                this.layers.push(new h(s));
            }
          }
          getRectInfoTexture(e, t) {
            if (this.rectInfoTexture) {
              const r = this.rectInfoTexture;
              (r.width == e && r.height == t) || r.resize(e, t);
            } else
              this.rectInfoTexture = this.gl.createTexture(
                s.Graphics.TextureFormat.NEAREST_CLAMP,
                e,
                t
              );
            return this.rectInfoTexture;
          }
          getRectInfoRenderTarget(e, t) {
            const r = this.getRectInfoTexture(e, t);
            return (
              this.rectInfoRenderTarget &&
                this.rectInfoRenderTarget.texture != r &&
                (this.rectInfoRenderTarget.texture.free(),
                this.rectInfoRenderTarget.setColor(r)),
              this.rectInfoRenderTarget ||
                (this.rectInfoRenderTarget = this.gl.createRenderTarget(r)),
              this.rectInfoRenderTarget
            );
          }
          free() {
            this.rectInfoRenderTarget && this.rectInfoRenderTarget.free(),
              this.rectInfoTexture && this.rectInfoTexture.free();
          }
          configSpaceBoundsForKey(e) {
            const { stackDepth: r, zoomLevel: n, index: s } = e,
              o = this.flamechart.getTotalWeight() / Math.pow(2, n),
              c = this.flamechart.getLayers().length,
              i = this.options.inverted ? c - 1 - r : r;
            return new t.Rect(new t.Vec2(o * s, i), new t.Vec2(o, 1));
          }
          render(e) {
            const { configSpaceSrcRect: r, physicalSpaceDstRect: n } = e,
              c = [],
              i = t.AffineTransform.betweenRects(r, n);
            if (r.isEmpty()) return;
            let h = 0;
            for (;;) {
              const e = a.getOrInsert(this.atlasKeys, {
                  stackDepth: 0,
                  zoomLevel: h,
                  index: 0,
                }),
                t = this.configSpaceBoundsForKey(e);
              if (i.transformRect(t).width() < this.rowAtlas.getResolution())
                break;
              h++;
            }
            const l = Math.max(0, Math.floor(r.top())),
              g = Math.min(this.layers.length, Math.ceil(r.bottom())),
              d = this.flamechart.getTotalWeight(),
              f = Math.pow(2, h),
              u = Math.floor((f * r.left()) / d),
              R = Math.ceil((f * r.right()) / d),
              w = this.flamechart.getLayers().length;
            for (let t = l; t < g; t++)
              for (let e = u; e <= R; e++) {
                const n = this.options.inverted ? w - 1 - t : t,
                  s = a.getOrInsert(this.atlasKeys, {
                    stackDepth: n,
                    zoomLevel: h,
                    index: e,
                  });
                this.configSpaceBoundsForKey(s).hasIntersectionWith(r) &&
                  c.push(s);
              }
            const p = this.rowAtlas.getCapacity(),
              m = c.slice(0, p),
              I = c.slice(p);
            this.rowAtlas.writeToAtlasIfNeeded(m, (e, t) => {
              const r = this.configSpaceBoundsForKey(t);
              this.layers[t.stackDepth].forEachLeafNodeWithinBounds(r, (t) => {
                this.rectangleBatchRenderer.render({
                  batch: t.getBatch(),
                  configSpaceSrcRect: r,
                  physicalSpaceDstRect: e,
                });
              });
            });
            const T = this.getRectInfoRenderTarget(n.width(), n.height());
            (0, o.renderInto)(this.gl, T, () => {
              this.gl.clear(new s.Graphics.Color(0, 0, 0, 0));
              const e = new t.Rect(
                  t.Vec2.zero,
                  new t.Vec2(this.gl.viewport.width, this.gl.viewport.height)
                ),
                n = t.AffineTransform.betweenRects(r, e);
              for (let t of m) {
                const e = this.configSpaceBoundsForKey(t);
                this.rowAtlas.renderViaAtlas(t, n.transformRect(e));
              }
              for (let t of I) {
                const e = this.configSpaceBoundsForKey(t),
                  r = n.transformRect(e);
                this.layers[t.stackDepth].forEachLeafNodeWithinBounds(
                  e,
                  (t) => {
                    this.rectangleBatchRenderer.render({
                      batch: t.getBatch(),
                      configSpaceSrcRect: e,
                      physicalSpaceDstRect: r,
                    });
                  }
                );
              }
            });
            const x = this.getRectInfoTexture(n.width(), n.height());
            this.colorPassRenderer.render({
              rectInfoTexture: x,
              srcRect: new t.Rect(t.Vec2.zero, new t.Vec2(x.width, x.height)),
              dstRect: n,
              renderOutlines: e.renderOutlines,
            });
          }
        }
        exports.FlamechartRenderer = l;
      },
      {
        "./rectangle-batch-renderer": "UGJH",
        "../lib/math": "tDuZ",
        "../lib/color": "x77Y",
        "../lib/utils": "ucYa",
        "./graphics": "XGYN",
        "./utils": "MMP6",
      },
    ],
    jZ6t: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.getFlamechartStyle = void 0);
        var e = require("aphrodite"),
          o = require("./style"),
          r = require("./themes/theme");
        const t = (0, r.withTheme)((r) =>
          e.StyleSheet.create({
            hoverCount: { color: r.weightColor },
            fill: {
              width: "100%",
              height: "100%",
              position: "absolute",
              left: 0,
              top: 0,
            },
            minimap: {
              height: o.Sizes.MINIMAP_HEIGHT,
              borderBottom: `${o.Sizes.SEPARATOR_HEIGHT}px solid ${r.fgSecondaryColor}`,
            },
            panZoomView: { flex: 1 },
            detailView: {
              display: "grid",
              height: o.Sizes.DETAIL_VIEW_HEIGHT,
              overflow: "hidden",
              gridTemplateColumns: "120px 120px 1fr",
              gridTemplateRows: "repeat(4, 1fr)",
              borderTop: `${o.Sizes.SEPARATOR_HEIGHT}px solid ${r.fgSecondaryColor}`,
              fontSize: o.FontSize.LABEL,
              position: "absolute",
              background: r.bgPrimaryColor,
              width: "100vw",
              bottom: 0,
            },
            stackTraceViewPadding: { padding: 5 },
            stackTraceView: {
              height: o.Sizes.DETAIL_VIEW_HEIGHT,
              lineHeight: `${o.FontSize.LABEL + 2}px`,
              overflow: "auto",
              "::-webkit-scrollbar": { background: r.bgPrimaryColor },
              "::-webkit-scrollbar-thumb": {
                background: r.fgSecondaryColor,
                borderRadius: 20,
                border: `3px solid ${r.bgPrimaryColor}`,
                ":hover": { background: r.fgPrimaryColor },
              },
            },
            stackLine: { whiteSpace: "nowrap" },
            stackFileLine: { color: r.fgSecondaryColor },
            statsTable: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: `repeat(3, ${o.FontSize.LABEL + 10}px)`,
              gridGap: "1px 1px",
              textAlign: "center",
              paddingRight: 1,
            },
            statsTableHeader: { gridColumn: "1 / 3" },
            statsTableCell: {
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
            thisInstanceCell: {
              background: r.selectionPrimaryColor,
              color: r.altFgPrimaryColor,
            },
            allInstancesCell: {
              background: r.selectionSecondaryColor,
              color: r.altFgPrimaryColor,
            },
            barDisplay: {
              position: "absolute",
              top: 0,
              left: 0,
              background: "rgba(0, 0, 0, 0.2)",
              width: "100%",
            },
          })
        );
        exports.getFlamechartStyle = t;
      },
      { aphrodite: "CxN7", "./style": "hvr4", "./themes/theme": "gzKG" },
    ],
    eeWS: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.cachedMeasureTextWidth = i),
          (exports.buildTrimmedText = s),
          (exports.trimTextMid = h),
          (exports.remapRangesToTrimmedText = o),
          (exports.ELLIPSIS = void 0);
        var e = require("./utils");
        const t = "…";
        exports.ELLIPSIS = t;
        const n = new Map();
        let r = -1;
        function i(e, t) {
          return (
            window.devicePixelRatio !== r &&
              (n.clear(), (r = window.devicePixelRatio)),
            n.has(t) || n.set(t, e.measureText(t).width),
            n.get(t)
          );
        }
        function s(e, n) {
          if (e.length <= n)
            return {
              trimmedString: e,
              trimmedLength: e.length,
              prefixLength: e.length,
              suffixLength: 0,
              originalString: e,
              originalLength: e.length,
            };
          let r = Math.floor(n / 2);
          const i = n - r - 1,
            s = e.substr(0, r),
            h = e.substr(e.length - i, i),
            g = s + t + h;
          return {
            trimmedString: g,
            trimmedLength: g.length,
            prefixLength: s.length,
            suffixLength: h.length,
            originalString: e,
            originalLength: e.length,
          };
        }
        function h(t, n, r) {
          if (i(t, n) <= r) return s(n, n.length);
          const [h] = (0, e.findValueBisect)(
            0,
            n.length,
            (e) => i(t, s(n, e).trimmedString),
            r
          );
          return s(n, h);
        }
        var g;
        function a(e, t) {
          return t < e.prefixLength
            ? g.IN_PREFIX
            : t < e.originalLength - e.suffixLength
            ? g.ELIDED
            : g.IN_SUFFIX;
        }
        function o(e, t) {
          const n = [],
            r = e.originalLength - e.trimmedLength;
          let i = !1;
          for (let [s, h] of t) {
            let t = a(e, s),
              o = a(e, h - 1);
            switch (t) {
              case g.IN_PREFIX:
                switch (o) {
                  case g.IN_PREFIX:
                    n.push([s, h]);
                    break;
                  case g.ELIDED:
                    n.push([s, e.prefixLength + 1]), (i = !0);
                    break;
                  case g.IN_SUFFIX:
                    n.push([s, h - r]);
                }
                break;
              case g.ELIDED:
                switch (o) {
                  case g.IN_PREFIX:
                    throw new Error(
                      "Unexpected highlight range starts in elided and ends in prefix"
                    );
                  case g.ELIDED:
                    i ||
                      (n.push([e.prefixLength, e.prefixLength + 1]), (i = !0));
                    break;
                  case g.IN_SUFFIX:
                    i
                      ? n.push([e.trimmedLength - e.suffixLength, h - r])
                      : (n.push([e.prefixLength, h - r]), (i = !0));
                }
                break;
              case g.IN_SUFFIX:
                switch (o) {
                  case g.IN_PREFIX:
                    throw new Error(
                      "Unexpected highlight range starts in suffix and ends in prefix"
                    );
                  case g.ELIDED:
                    throw new Error(
                      "Unexpected highlight range starts in suffix and ends in elided"
                    );
                  case g.IN_SUFFIX:
                    n.push([s - r, h - r]);
                }
            }
          }
          return n;
        }
        !(function (e) {
          (e[(e.IN_PREFIX = 0)] = "IN_PREFIX"),
            (e[(e.IN_SUFFIX = 1)] = "IN_SUFFIX"),
            (e[(e.ELIDED = 2)] = "ELIDED");
        })(g || (g = {}));
      },
      { "./utils": "ucYa" },
    ],
    S7z0: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.FlamechartMinimapView = void 0);
        var e,
          t = require("preact"),
          i = require("aphrodite"),
          o = require("../lib/math"),
          s = require("./flamechart-style"),
          n = require("./style"),
          r = require("../lib/text-utils"),
          a = require("../lib/color");
        !(function (e) {
          (e[(e.DRAW_NEW_VIEWPORT = 0)] = "DRAW_NEW_VIEWPORT"),
            (e[(e.TRANSLATE_VIEWPORT = 1)] = "TRANSLATE_VIEWPORT");
        })(e || (e = {}));
        class c extends t.Component {
          constructor() {
            super(...arguments),
              (this.container = null),
              (this.containerRef = (e) => {
                this.container = e || null;
              }),
              (this.overlayCanvas = null),
              (this.overlayCtx = null),
              (this.onWindowResize = () => {
                this.onBeforeFrame();
              }),
              (this.onBeforeFrame = () => {
                this.maybeClearInteractionLock(),
                  this.resizeOverlayCanvasIfNeeded(),
                  this.renderRects(),
                  this.renderOverlays();
              }),
              (this.renderCanvas = () => {
                this.props.canvasContext.requestFrame();
              }),
              (this.frameHadWheelEvent = !1),
              (this.framesWithoutWheelEvents = 0),
              (this.interactionLock = null),
              (this.maybeClearInteractionLock = () => {
                this.interactionLock &&
                  (this.frameHadWheelEvent ||
                    (this.framesWithoutWheelEvents++,
                    this.framesWithoutWheelEvents >= 2 &&
                      ((this.interactionLock = null),
                      (this.framesWithoutWheelEvents = 0))),
                  this.props.canvasContext.requestFrame()),
                  (this.frameHadWheelEvent = !1);
              }),
              (this.onWheel = (e) => {
                if (
                  (e.preventDefault(),
                  (this.frameHadWheelEvent = !0),
                  (e.metaKey || e.ctrlKey) && "pan" !== this.interactionLock)
                ) {
                  let t = 1 + e.deltaY / 100;
                  e.ctrlKey && (t = 1 + e.deltaY / 40),
                    (t = (0, o.clamp)(t, 0.1, 10)),
                    this.zoom(t);
                } else
                  "zoom" !== this.interactionLock &&
                    this.pan(new o.Vec2(e.deltaX, e.deltaY));
                this.renderCanvas();
              }),
              (this.dragStartConfigSpaceMouse = null),
              (this.dragConfigSpaceViewportOffset = null),
              (this.draggingMode = null),
              (this.onMouseDown = (t) => {
                const i = this.configSpaceMouse(t);
                i &&
                  (this.props.configSpaceViewportRect.contains(i)
                    ? ((this.draggingMode = e.TRANSLATE_VIEWPORT),
                      (this.dragConfigSpaceViewportOffset = i.minus(
                        this.props.configSpaceViewportRect.origin
                      )))
                    : (this.draggingMode = e.DRAW_NEW_VIEWPORT),
                  (this.dragStartConfigSpaceMouse = i),
                  window.addEventListener("mousemove", this.onWindowMouseMove),
                  window.addEventListener("mouseup", this.onWindowMouseUp),
                  this.updateCursor(i));
              }),
              (this.onWindowMouseMove = (t) => {
                if (!this.dragStartConfigSpaceMouse) return;
                let i = this.configSpaceMouse(t);
                if (i)
                  if (
                    (this.updateCursor(i),
                    (i = new o.Rect(
                      new o.Vec2(0, 0),
                      this.configSpaceSize()
                    ).closestPointTo(i)),
                    this.draggingMode === e.DRAW_NEW_VIEWPORT)
                  ) {
                    const e = this.dragStartConfigSpaceMouse;
                    let t = i;
                    if (!e || !t) return;
                    const s = Math.min(e.x, t.x),
                      n = Math.max(e.x, t.x) - s,
                      r = this.props.configSpaceViewportRect.height();
                    this.props.setConfigSpaceViewportRect(
                      new o.Rect(new o.Vec2(s, t.y - r / 2), new o.Vec2(n, r))
                    );
                  } else if (this.draggingMode === e.TRANSLATE_VIEWPORT) {
                    if (!this.dragConfigSpaceViewportOffset) return;
                    const e = i.minus(this.dragConfigSpaceViewportOffset);
                    this.props.setConfigSpaceViewportRect(
                      this.props.configSpaceViewportRect.withOrigin(e)
                    );
                  }
              }),
              (this.updateCursor = (t) => {
                this.draggingMode === e.TRANSLATE_VIEWPORT
                  ? ((document.body.style.cursor = "grabbing"),
                    (document.body.style.cursor = "-webkit-grabbing"))
                  : this.draggingMode === e.DRAW_NEW_VIEWPORT
                  ? (document.body.style.cursor = "col-resize")
                  : this.props.configSpaceViewportRect.contains(t)
                  ? ((document.body.style.cursor = "grab"),
                    (document.body.style.cursor = "-webkit-grab"))
                  : (document.body.style.cursor = "col-resize");
              }),
              (this.onMouseLeave = () => {
                null == this.draggingMode &&
                  (document.body.style.cursor = "default");
              }),
              (this.onMouseMove = (e) => {
                const t = this.configSpaceMouse(e);
                t && this.updateCursor(t);
              }),
              (this.onWindowMouseUp = (e) => {
                (this.draggingMode = null),
                  window.removeEventListener(
                    "mousemove",
                    this.onWindowMouseMove
                  ),
                  window.removeEventListener("mouseup", this.onWindowMouseUp);
                const t = this.configSpaceMouse(e);
                t && this.updateCursor(t);
              }),
              (this.overlayCanvasRef = (e) => {
                e
                  ? ((this.overlayCanvas = e),
                    (this.overlayCtx = this.overlayCanvas.getContext("2d")),
                    this.renderCanvas())
                  : ((this.overlayCanvas = null), (this.overlayCtx = null));
              });
          }
          physicalViewSize() {
            return new o.Vec2(
              this.overlayCanvas ? this.overlayCanvas.width : 0,
              this.overlayCanvas ? this.overlayCanvas.height : 0
            );
          }
          getStyle() {
            return (0, s.getFlamechartStyle)(this.props.theme);
          }
          minimapOrigin() {
            return new o.Vec2(
              0,
              n.Sizes.FRAME_HEIGHT * window.devicePixelRatio
            );
          }
          configSpaceSize() {
            return new o.Vec2(
              this.props.flamechart.getTotalWeight(),
              this.props.flamechart.getLayers().length
            );
          }
          configSpaceToPhysicalViewSpace() {
            const e = this.minimapOrigin();
            return o.AffineTransform.betweenRects(
              new o.Rect(new o.Vec2(0, 0), this.configSpaceSize()),
              new o.Rect(e, this.physicalViewSize().minus(e))
            );
          }
          logicalToPhysicalViewSpace() {
            return o.AffineTransform.withScale(
              new o.Vec2(window.devicePixelRatio, window.devicePixelRatio)
            );
          }
          windowToLogicalViewSpace() {
            if (!this.container) return new o.AffineTransform();
            const e = this.container.getBoundingClientRect();
            return o.AffineTransform.withTranslation(
              new o.Vec2(-e.left, -e.top)
            );
          }
          renderRects() {
            this.container &&
              (this.physicalViewSize().x < 2 ||
                this.props.canvasContext.renderBehind(this.container, () => {
                  this.props.flamechartRenderer.render({
                    configSpaceSrcRect: new o.Rect(
                      new o.Vec2(0, 0),
                      this.configSpaceSize()
                    ),
                    physicalSpaceDstRect: new o.Rect(
                      this.minimapOrigin(),
                      this.physicalViewSize().minus(this.minimapOrigin())
                    ),
                    renderOutlines: !1,
                  }),
                    this.props.canvasContext.viewportRectangleRenderer.render({
                      configSpaceViewportRect:
                        this.props.configSpaceViewportRect,
                      configSpaceToPhysicalViewSpace:
                        this.configSpaceToPhysicalViewSpace(),
                    });
                }));
          }
          renderOverlays() {
            const e = this.overlayCtx;
            if (!e) return;
            const t = this.physicalViewSize();
            e.clearRect(0, 0, t.x, t.y);
            const i = this.configSpaceToPhysicalViewSpace(),
              s = this.configSpaceSize().x,
              c = (
                this.configSpaceToPhysicalViewSpace().inverted() ||
                new o.AffineTransform()
              )
                .times(this.logicalToPhysicalViewSpace())
                .transformVector(new o.Vec2(200, 1)).x,
              h = n.Sizes.FRAME_HEIGHT * window.devicePixelRatio,
              l = n.FontSize.LABEL * window.devicePixelRatio,
              p = (h - l) / 2;
            (e.font = `${l}px/${h}px ${n.FontFamily.MONOSPACE}`),
              (e.textBaseline = "top");
            let d = Math.pow(10, Math.floor(Math.log10(c)));
            c / d > 5 ? (d *= 5) : c / d > 2 && (d *= 2);
            const f = this.props.theme;
            (e.fillStyle = a.Color.fromCSSHex(f.bgPrimaryColor)
              .withAlpha(0.8)
              .toCSS()),
              e.fillRect(0, 0, t.x, h),
              (e.textBaseline = "top");
            for (let n = Math.ceil(0 / d) * d; n < s; n += d) {
              const s = Math.round(i.transformPosition(new o.Vec2(n, 0)).x),
                a = this.props.flamechart.formatValue(n),
                c = Math.ceil((0, r.cachedMeasureTextWidth)(e, a));
              (e.fillStyle = f.fgPrimaryColor),
                e.fillText(a, s - c - p, p),
                (e.fillStyle = f.fgSecondaryColor),
                e.fillRect(s, 0, 1, t.y);
            }
          }
          componentWillReceiveProps(e) {
            this.props.flamechart !== e.flamechart
              ? this.renderCanvas()
              : this.props.configSpaceViewportRect != e.configSpaceViewportRect
              ? this.renderCanvas()
              : this.props.canvasContext !== e.canvasContext &&
                (this.props.canvasContext &&
                  this.props.canvasContext.removeBeforeFrameHandler(
                    this.onBeforeFrame
                  ),
                e.canvasContext &&
                  (e.canvasContext.addBeforeFrameHandler(this.onBeforeFrame),
                  e.canvasContext.requestFrame()));
          }
          componentDidMount() {
            window.addEventListener("resize", this.onWindowResize),
              this.props.canvasContext.addBeforeFrameHandler(
                this.onBeforeFrame
              );
          }
          componentWillUnmount() {
            window.removeEventListener("resize", this.onWindowResize),
              this.props.canvasContext.removeBeforeFrameHandler(
                this.onBeforeFrame
              );
          }
          resizeOverlayCanvasIfNeeded() {
            if (!this.overlayCanvas) return;
            let { width: e, height: t } =
              this.overlayCanvas.getBoundingClientRect();
            if (((e = Math.floor(e)), (t = Math.floor(t)), 0 === e || 0 === t))
              return;
            const i = e * window.devicePixelRatio,
              o = t * window.devicePixelRatio;
            (i === this.overlayCanvas.width &&
              o === this.overlayCanvas.height) ||
              ((this.overlayCanvas.width = i), (this.overlayCanvas.height = o));
          }
          pan(e) {
            this.interactionLock = "pan";
            const t = this.logicalToPhysicalViewSpace().transformVector(e),
              i =
                this.configSpaceToPhysicalViewSpace().inverseTransformVector(t);
            i &&
              this.props.transformViewport(
                o.AffineTransform.withTranslation(i)
              );
          }
          zoom(e) {
            this.interactionLock = "zoom";
            const t = this.props.configSpaceViewportRect,
              i = t.origin.plus(t.size.times(0.5));
            if (!i) return;
            const s = o.AffineTransform.withTranslation(i.times(-1))
              .scaledBy(new o.Vec2(e, 1))
              .translatedBy(i);
            this.props.transformViewport(s);
          }
          configSpaceMouse(e) {
            const t = this.windowToLogicalViewSpace().transformPosition(
                new o.Vec2(e.clientX, e.clientY)
              ),
              i = this.logicalToPhysicalViewSpace().transformPosition(t);
            return this.configSpaceToPhysicalViewSpace().inverseTransformPosition(
              i
            );
          }
          render() {
            const e = this.getStyle();
            return (0, t.h)(
              "div",
              {
                ref: this.containerRef,
                onWheel: this.onWheel,
                onMouseDown: this.onMouseDown,
                onMouseMove: this.onMouseMove,
                onMouseLeave: this.onMouseLeave,
                className: (0, i.css)(e.minimap, n.commonStyle.vbox),
              },
              (0, t.h)("canvas", {
                width: 1,
                height: 1,
                ref: this.overlayCanvasRef,
                className: (0, i.css)(e.fill),
              })
            );
          }
        }
        exports.FlamechartMinimapView = c;
      },
      {
        preact: "aSor",
        aphrodite: "CxN7",
        "../lib/math": "tDuZ",
        "./flamechart-style": "jZ6t",
        "./style": "hvr4",
        "../lib/text-utils": "eeWS",
        "../lib/color": "x77Y",
      },
    ],
    uohB: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.FlamechartDetailView = o);
        var e = require("aphrodite"),
          l = require("preact"),
          t = require("./flamechart-style"),
          s = require("../lib/utils"),
          a = require("./color-chit"),
          c = require("./themes/theme");
        function r(a) {
          const r = (0, t.getFlamechartStyle)((0, c.useTheme)()),
            i = a.formatter(a.selectedTotal),
            o = a.formatter(a.selectedSelf),
            h = (100 * a.selectedTotal) / a.grandTotal,
            n = (100 * a.selectedSelf) / a.grandTotal;
          return (0, l.h)(
            "div",
            { className: (0, e.css)(r.statsTable) },
            (0, l.h)(
              "div",
              {
                className: (0, e.css)(
                  a.cellStyle,
                  r.statsTableCell,
                  r.statsTableHeader
                ),
              },
              a.title
            ),
            (0, l.h)(
              "div",
              { className: (0, e.css)(a.cellStyle, r.statsTableCell) },
              "Total"
            ),
            (0, l.h)(
              "div",
              { className: (0, e.css)(a.cellStyle, r.statsTableCell) },
              "Self"
            ),
            (0, l.h)(
              "div",
              { className: (0, e.css)(a.cellStyle, r.statsTableCell) },
              i
            ),
            (0, l.h)(
              "div",
              { className: (0, e.css)(a.cellStyle, r.statsTableCell) },
              o
            ),
            (0, l.h)(
              "div",
              { className: (0, e.css)(a.cellStyle, r.statsTableCell) },
              (0, s.formatPercent)(h),
              (0, l.h)("div", {
                className: (0, e.css)(r.barDisplay),
                style: { height: `${h}%` },
              })
            ),
            (0, l.h)(
              "div",
              { className: (0, e.css)(a.cellStyle, r.statsTableCell) },
              (0, s.formatPercent)(n),
              (0, l.h)("div", {
                className: (0, e.css)(r.barDisplay),
                style: { height: `${n}%` },
              })
            )
          );
        }
        function i(s) {
          const r = (0, t.getFlamechartStyle)((0, c.useTheme)()),
            i = [];
          let o = s.node;
          for (; o && !o.isRoot(); o = o.parent) {
            const t = [],
              { frame: c } = o;
            if (
              (t.push((0, l.h)(a.ColorChit, { color: s.getFrameColor(c) })),
              i.length &&
                t.push(
                  (0, l.h)(
                    "span",
                    { className: (0, e.css)(r.stackFileLine) },
                    "> "
                  )
                ),
              t.push(c.name),
              c.file)
            ) {
              let s = c.file;
              null != c.line &&
                ((s += `:${c.line}`), null != c.col && (s += `:${c.col}`)),
                t.push(
                  (0, l.h)(
                    "span",
                    { className: (0, e.css)(r.stackFileLine) },
                    " (",
                    s,
                    ")"
                  )
                );
            }
            i.push((0, l.h)("div", { className: (0, e.css)(r.stackLine) }, t));
          }
          return (0, l.h)(
            "div",
            { className: (0, e.css)(r.stackTraceView) },
            (0, l.h)(
              "div",
              { className: (0, e.css)(r.stackTraceViewPadding) },
              i
            )
          );
        }
        function o(s) {
          const a = (0, t.getFlamechartStyle)((0, c.useTheme)()),
            { flamechart: o, selectedNode: h } = s,
            { frame: n } = h;
          return (0, l.h)(
            "div",
            { className: (0, e.css)(a.detailView) },
            (0, l.h)(r, {
              title: "This Instance",
              cellStyle: a.thisInstanceCell,
              grandTotal: o.getTotalWeight(),
              selectedTotal: h.getTotalWeight(),
              selectedSelf: h.getSelfWeight(),
              formatter: o.formatValue.bind(o),
            }),
            (0, l.h)(r, {
              title: "All Instances",
              cellStyle: a.allInstancesCell,
              grandTotal: o.getTotalWeight(),
              selectedTotal: n.getTotalWeight(),
              selectedSelf: n.getSelfWeight(),
              formatter: o.formatValue.bind(o),
            }),
            (0, l.h)(i, { node: h, getFrameColor: s.getCSSColorForFrame })
          );
        }
      },
      {
        aphrodite: "CxN7",
        preact: "aSor",
        "./flamechart-style": "jZ6t",
        "../lib/utils": "ucYa",
        "./color-chit": "Pua8",
        "./themes/theme": "gzKG",
      },
    ],
    e6nh: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.BatchCanvasRectRenderer = exports.BatchCanvasTextRenderer =
            void 0);
        class t {
          constructor() {
            this.argsBatch = [];
          }
          text(t) {
            this.argsBatch.push(t);
          }
          fill(t, e) {
            if (0 !== this.argsBatch.length) {
              t.fillStyle = e;
              for (let e of this.argsBatch) t.fillText(e.text, e.x, e.y);
              this.argsBatch = [];
            }
          }
        }
        exports.BatchCanvasTextRenderer = t;
        class e {
          constructor() {
            this.argsBatch = [];
          }
          rect(t) {
            this.argsBatch.push(t);
          }
          drawPath(t) {
            t.beginPath();
            for (let e of this.argsBatch) t.rect(e.x, e.y, e.w, e.h);
            t.closePath(), (this.argsBatch = []);
          }
          fill(t, e) {
            0 !== this.argsBatch.length &&
              ((t.fillStyle = e), this.drawPath(t), t.fill());
          }
          stroke(t, e, s) {
            0 !== this.argsBatch.length &&
              ((t.strokeStyle = e),
              (t.lineWidth = s),
              this.drawPath(t),
              t.stroke());
          }
        }
        exports.BatchCanvasRectRenderer = e;
      },
      {},
    ],
    e7Fh: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.FlamechartPanZoomView = void 0);
        var e = require("../lib/math"),
          t = require("./style"),
          i = require("../lib/text-utils"),
          o = require("./flamechart-style"),
          s = require("preact"),
          r = require("aphrodite"),
          n = require("../lib/canvas-2d-batch-renderers"),
          a = require("../lib/color");
        class h extends s.Component {
          constructor() {
            super(...arguments),
              (this.container = null),
              (this.containerRef = (e) => {
                this.container = e || null;
              }),
              (this.overlayCanvas = null),
              (this.overlayCtx = null),
              (this.hoveredLabel = null),
              (this.overlayCanvasRef = (e) => {
                e
                  ? ((this.overlayCanvas = e),
                    (this.overlayCtx = this.overlayCanvas.getContext("2d")),
                    this.renderCanvas())
                  : ((this.overlayCanvas = null), (this.overlayCtx = null));
              }),
              (this.LOGICAL_VIEW_SPACE_FRAME_HEIGHT = t.Sizes.FRAME_HEIGHT),
              (this.onWindowResize = () => {
                this.updateConfigSpaceViewport(), this.onBeforeFrame();
              }),
              (this.frameHadWheelEvent = !1),
              (this.framesWithoutWheelEvents = 0),
              (this.interactionLock = null),
              (this.maybeClearInteractionLock = () => {
                this.interactionLock &&
                  (this.frameHadWheelEvent ||
                    (this.framesWithoutWheelEvents++,
                    this.framesWithoutWheelEvents >= 2 &&
                      ((this.interactionLock = null),
                      (this.framesWithoutWheelEvents = 0))),
                  this.props.canvasContext.requestFrame()),
                  (this.frameHadWheelEvent = !1);
              }),
              (this.onBeforeFrame = () => {
                this.resizeOverlayCanvasIfNeeded(),
                  this.renderRects(),
                  this.renderOverlays(),
                  this.maybeClearInteractionLock();
              }),
              (this.renderCanvas = () => {
                this.props.canvasContext.requestFrame();
              }),
              (this.lastDragPos = null),
              (this.mouseDownPos = null),
              (this.onMouseDown = (t) => {
                (this.mouseDownPos = this.lastDragPos =
                  new e.Vec2(t.offsetX, t.offsetY)),
                  this.updateCursor(),
                  window.addEventListener("mouseup", this.onWindowMouseUp);
              }),
              (this.onMouseDrag = (t) => {
                if (!this.lastDragPos) return;
                const i = new e.Vec2(t.offsetX, t.offsetY);
                this.pan(this.lastDragPos.minus(i)),
                  (this.lastDragPos = i),
                  this.hoveredLabel && this.props.onNodeHover(null);
              }),
              (this.onDblClick = (t) => {
                if (this.hoveredLabel) {
                  const t = this.hoveredLabel.configSpaceBounds,
                    i = new e.Rect(
                      t.origin.minus(new e.Vec2(0, 1)),
                      t.size.withY(this.props.configSpaceViewportRect.height())
                    );
                  this.props.setConfigSpaceViewportRect(i);
                }
              }),
              (this.onClick = (t) => {
                const i = new e.Vec2(t.offsetX, t.offsetY),
                  o = this.mouseDownPos;
                (this.mouseDownPos = null),
                  (o && i.minus(o).length() > 5) ||
                    (this.hoveredLabel
                      ? (this.props.onNodeSelect(this.hoveredLabel.node),
                        this.renderCanvas())
                      : this.props.onNodeSelect(null));
              }),
              (this.onWindowMouseUp = (e) => {
                (this.lastDragPos = null),
                  this.updateCursor(),
                  window.removeEventListener("mouseup", this.onWindowMouseUp);
              }),
              (this.onMouseMove = (t) => {
                if ((this.updateCursor(), this.lastDragPos))
                  return t.preventDefault(), void this.onMouseDrag(t);
                this.hoveredLabel = null;
                const i = new e.Vec2(t.offsetX, t.offsetY),
                  o = this.logicalToPhysicalViewSpace().transformPosition(i),
                  s =
                    this.configSpaceToPhysicalViewSpace().inverseTransformPosition(
                      o
                    );
                if (!s) return;
                const r = (t, i = 0) => {
                  const o = t.end - t.start,
                    n = this.props.renderInverted
                      ? this.configSpaceSize().y - 1 - i
                      : i,
                    a = new e.Rect(new e.Vec2(t.start, n), new e.Vec2(o, 1));
                  if (s.x < a.left()) return null;
                  if (s.x > a.right()) return null;
                  a.contains(s) &&
                    (this.hoveredLabel = {
                      configSpaceBounds: a,
                      node: t.node,
                    });
                  for (let e of t.children) r(e, i + 1);
                };
                for (let e of this.props.flamechart.getLayers()[0] || []) r(e);
                this.hoveredLabel
                  ? this.props.onNodeHover({
                      node: this.hoveredLabel.node,
                      event: t,
                    })
                  : this.props.onNodeHover(null),
                  this.renderCanvas();
              }),
              (this.onMouseLeave = (e) => {
                (this.hoveredLabel = null),
                  this.props.onNodeHover(null),
                  this.renderCanvas();
              }),
              (this.onWheel = (t) => {
                t.preventDefault(), (this.frameHadWheelEvent = !0);
                const i = t.metaKey || t.ctrlKey;
                let o = t.deltaY,
                  s = t.deltaX;
                if (
                  (t.deltaMode === t.DOM_DELTA_LINE &&
                    ((o *= this.LOGICAL_VIEW_SPACE_FRAME_HEIGHT),
                    (s *= this.LOGICAL_VIEW_SPACE_FRAME_HEIGHT)),
                  i && "pan" !== this.interactionLock)
                ) {
                  let i = 1 + o / 100;
                  t.ctrlKey && (i = 1 + o / 40),
                    (i = (0, e.clamp)(i, 0.1, 10)),
                    this.zoom(new e.Vec2(t.offsetX, t.offsetY), i);
                } else
                  "zoom" !== this.interactionLock && this.pan(new e.Vec2(s, o));
                this.renderCanvas();
              }),
              (this.onWindowKeyPress = (t) => {
                if (!this.container) return;
                const { width: i, height: o } =
                  this.container.getBoundingClientRect();
                "=" === t.key || "+" === t.key
                  ? (this.zoom(new e.Vec2(i / 2, o / 2), 0.5),
                    t.preventDefault())
                  : ("-" !== t.key && "_" !== t.key) ||
                    (this.zoom(new e.Vec2(i / 2, o / 2), 2),
                    t.preventDefault()),
                  t.ctrlKey ||
                    t.shiftKey ||
                    t.metaKey ||
                    ("0" === t.key
                      ? this.zoom(new e.Vec2(i / 2, o / 2), 1e9)
                      : "ArrowRight" === t.key || "KeyD" === t.code
                      ? this.pan(new e.Vec2(100, 0))
                      : "ArrowLeft" === t.key || "KeyA" === t.code
                      ? this.pan(new e.Vec2(-100, 0))
                      : "ArrowUp" === t.key || "KeyW" === t.code
                      ? this.pan(new e.Vec2(0, -100))
                      : "ArrowDown" === t.key || "KeyS" === t.code
                      ? this.pan(new e.Vec2(0, 100))
                      : "Escape" === t.key &&
                        (this.props.onNodeSelect(null), this.renderCanvas()));
              });
          }
          getStyle() {
            return (0, o.getFlamechartStyle)(this.props.theme);
          }
          setConfigSpaceViewportRect(e) {
            this.props.setConfigSpaceViewportRect(e);
          }
          configSpaceSize() {
            return new e.Vec2(
              this.props.flamechart.getTotalWeight(),
              this.props.flamechart.getLayers().length
            );
          }
          physicalViewSize() {
            return new e.Vec2(
              this.overlayCanvas ? this.overlayCanvas.width : 0,
              this.overlayCanvas ? this.overlayCanvas.height : 0
            );
          }
          physicalBounds() {
            if (this.props.renderInverted) {
              const t = this.physicalViewSize().y,
                i =
                  (this.configSpaceSize().y + 1) *
                  this.LOGICAL_VIEW_SPACE_FRAME_HEIGHT *
                  window.devicePixelRatio;
              if (i < t)
                return new e.Rect(
                  new e.Vec2(0, t - i),
                  this.physicalViewSize()
                );
            }
            return new e.Rect(new e.Vec2(0, 0), this.physicalViewSize());
          }
          configSpaceToPhysicalViewSpace() {
            return e.AffineTransform.betweenRects(
              this.props.configSpaceViewportRect,
              this.physicalBounds()
            );
          }
          logicalToPhysicalViewSpace() {
            return e.AffineTransform.withScale(
              new e.Vec2(window.devicePixelRatio, window.devicePixelRatio)
            );
          }
          resizeOverlayCanvasIfNeeded() {
            if (!this.overlayCanvas) return;
            let { width: e, height: t } =
              this.overlayCanvas.getBoundingClientRect();
            if (((e = Math.floor(e)), (t = Math.floor(t)), 0 === e || 0 === t))
              return;
            const i = e * window.devicePixelRatio,
              o = t * window.devicePixelRatio;
            (i === this.overlayCanvas.width &&
              o === this.overlayCanvas.height) ||
              ((this.overlayCanvas.width = i), (this.overlayCanvas.height = o));
          }
          renderOverlays() {
            const o = this.overlayCtx;
            if (!o) return;
            if (this.props.configSpaceViewportRect.isEmpty()) return;
            const s = this.configSpaceToPhysicalViewSpace(),
              r = t.FontSize.LABEL * window.devicePixelRatio,
              a =
                this.LOGICAL_VIEW_SPACE_FRAME_HEIGHT * window.devicePixelRatio,
              h = this.physicalViewSize();
            o.clearRect(0, 0, h.x, h.y),
              (o.font = `${r}px/${a}px ${t.FontFamily.MONOSPACE}`),
              (o.textBaseline = "alphabetic");
            const c = (0, i.cachedMeasureTextWidth)(o, "M" + i.ELLIPSIS + "M"),
              l = (
                s.inverseTransformVector(new e.Vec2(c, 0)) || new e.Vec2(0, 0)
              ).x,
              p = 5 * window.devicePixelRatio,
              d = new n.BatchCanvasTextRenderer(),
              f = new n.BatchCanvasTextRenderer(),
              w = new n.BatchCanvasRectRenderer(),
              u = new n.BatchCanvasRectRenderer(),
              v = new n.BatchCanvasRectRenderer(),
              m = new n.BatchCanvasRectRenderer(),
              y = (t, n = 0) => {
                var u;
                const v = t.end - t.start,
                  m = this.props.renderInverted
                    ? this.configSpaceSize().y - 1 - n
                    : n,
                  g = new e.Rect(new e.Vec2(t.start, m), new e.Vec2(v, 1));
                if (
                  !(
                    v < l ||
                    g.left() > this.props.configSpaceViewportRect.right() ||
                    g.right() < this.props.configSpaceViewportRect.left()
                  )
                ) {
                  if (this.props.renderInverted) {
                    if (g.bottom() < this.props.configSpaceViewportRect.top())
                      return;
                  } else if (
                    g.top() > this.props.configSpaceViewportRect.bottom()
                  )
                    return;
                  if (
                    g.hasIntersectionWith(this.props.configSpaceViewportRect)
                  ) {
                    let e = s.transformRect(g);
                    if (
                      (e.left() < 0 &&
                        (e = e
                          .withOrigin(e.origin.withX(0))
                          .withSize(e.size.withX(e.size.x + e.left()))),
                      e.right() > h.x &&
                        (e = e.withSize(e.size.withX(h.x - e.left()))),
                      e.width() > c)
                    ) {
                      const s =
                          null === (u = this.props.searchResults) ||
                          void 0 === u
                            ? void 0
                            : u.getMatchForFrame(t.node.frame),
                        n = (0, i.trimTextMid)(
                          o,
                          t.node.frame.name,
                          e.width() - 2 * p
                        );
                      if (s) {
                        const t = (0, i.remapRangesToTrimmedText)(
                          n,
                          s.matchedRanges
                        );
                        let h = 0,
                          c = e.left() + p;
                        const l = (a - r) / 2 - 2;
                        for (let [s, r] of t) {
                          c += (0, i.cachedMeasureTextWidth)(
                            o,
                            n.trimmedString.substring(h, s)
                          );
                          const t = (0, i.cachedMeasureTextWidth)(
                            o,
                            n.trimmedString.substring(s, r)
                          );
                          w.rect({ x: c, y: e.top() + l, w: t, h: a - 2 * l }),
                            (c += t),
                            (h = r);
                        }
                      }
                      (null == this.props.searchResults || s ? d : f).text({
                        text: n.trimmedString,
                        x: e.left() + p,
                        y: Math.round(e.bottom() - (a - r) / 2),
                      });
                    }
                  }
                  for (let e of t.children) y(e, n + 1);
                }
              },
              g = 2 * window.devicePixelRatio;
            o.strokeStyle = this.props.theme.selectionSecondaryColor;
            const S = (
                s.inverseTransformVector(new e.Vec2(1, 0)) || new e.Vec2(0, 0)
              ).x,
              C = (t, i = 0) => {
                var o;
                if (
                  !this.props.selectedNode &&
                  null == this.props.searchResults
                )
                  return;
                const r = t.end - t.start,
                  n = this.props.renderInverted
                    ? this.configSpaceSize().y - 1 - i
                    : i,
                  a = new e.Rect(new e.Vec2(t.start, n), new e.Vec2(r, 1));
                if (
                  !(
                    r < S ||
                    a.left() > this.props.configSpaceViewportRect.right() ||
                    a.right() < this.props.configSpaceViewportRect.left() ||
                    a.top() > this.props.configSpaceViewportRect.bottom()
                  )
                ) {
                  if (
                    a.hasIntersectionWith(this.props.configSpaceViewportRect)
                  ) {
                    if (
                      null === (o = this.props.searchResults) || void 0 === o
                        ? void 0
                        : o.getMatchForFrame(t.node.frame)
                    ) {
                      const e = s.transformRect(a);
                      m.rect({
                        x: Math.round(e.left() + g / 2),
                        y: Math.round(e.top() + g / 2),
                        w: Math.round(Math.max(0, e.width() - g)),
                        h: Math.round(Math.max(0, e.height() - g)),
                      });
                    }
                    if (
                      null != this.props.selectedNode &&
                      t.node.frame === this.props.selectedNode.frame
                    ) {
                      let e = t.node === this.props.selectedNode ? u : v;
                      const i = s.transformRect(a);
                      e.rect({
                        x: Math.round(i.left() + 1 + g / 2),
                        y: Math.round(i.top() + 1 + g / 2),
                        w: Math.round(Math.max(0, i.width() - 2 - g)),
                        h: Math.round(Math.max(0, i.height() - 2 - g)),
                      });
                    }
                  }
                  for (let e of t.children) C(e, i + 1);
                }
              };
            for (let e of this.props.flamechart.getLayers()[0] || []) C(e);
            for (let e of this.props.flamechart.getLayers()[0] || []) y(e);
            const V = this.props.theme;
            if (
              (m.fill(o, V.searchMatchPrimaryColor),
              w.fill(o, V.searchMatchSecondaryColor),
              f.fill(o, V.fgSecondaryColor),
              d.fill(
                o,
                null != this.props.searchResults
                  ? V.searchMatchTextColor
                  : V.fgPrimaryColor
              ),
              v.stroke(o, V.selectionSecondaryColor, g),
              u.stroke(o, V.selectionPrimaryColor, g),
              this.hoveredLabel)
            ) {
              let e = V.fgPrimaryColor;
              this.props.selectedNode === this.hoveredLabel.node &&
                (e = V.selectionPrimaryColor),
                (o.lineWidth = 2 * devicePixelRatio),
                (o.strokeStyle = e);
              const t = s.transformRect(this.hoveredLabel.configSpaceBounds);
              o.strokeRect(
                Math.round(t.left()),
                Math.round(t.top()),
                Math.round(Math.max(0, t.width())),
                Math.round(Math.max(0, t.height()))
              );
            }
            this.renderTimeIndicators();
          }
          renderTimeIndicators() {
            const o = this.overlayCtx;
            if (!o) return;
            const s =
                this.LOGICAL_VIEW_SPACE_FRAME_HEIGHT * window.devicePixelRatio,
              r = this.physicalViewSize(),
              n = this.configSpaceToPhysicalViewSpace(),
              h = (s - t.FontSize.LABEL * window.devicePixelRatio) / 2,
              c = this.props.configSpaceViewportRect.left(),
              l = this.props.configSpaceViewportRect.right(),
              p = (
                this.configSpaceToPhysicalViewSpace().inverted() ||
                new e.AffineTransform()
              )
                .times(this.logicalToPhysicalViewSpace())
                .transformVector(new e.Vec2(200, 1)).x;
            let d = Math.pow(10, Math.floor(Math.log10(p)));
            p / d > 5 ? (d *= 5) : p / d > 2 && (d *= 2);
            const f = this.props.theme;
            {
              const t = this.props.renderInverted ? r.y - s : 0;
              (o.fillStyle = a.Color.fromCSSHex(f.bgPrimaryColor)
                .withAlpha(0.8)
                .toCSS()),
                o.fillRect(0, t, r.x, s),
                (o.textBaseline = "top");
              for (let s = Math.ceil(c / d) * d; s < l; s += d) {
                const a = Math.round(n.transformPosition(new e.Vec2(s, 0)).x),
                  c = this.props.flamechart.formatValue(s),
                  l = (0, i.cachedMeasureTextWidth)(o, c);
                (o.fillStyle = f.fgPrimaryColor),
                  o.fillText(c, a - l - h, t + h),
                  (o.fillStyle = f.fgSecondaryColor),
                  o.fillRect(a, 0, 1, r.y);
              }
            }
          }
          updateConfigSpaceViewport() {
            if (!this.container) return;
            const { logicalSpaceViewportSize: t } = this.props,
              i = this.container.getBoundingClientRect(),
              { width: o, height: s } = i;
            if (o < 2 || s < 2) return;
            if (this.props.configSpaceViewportRect.isEmpty()) {
              const t = s / this.LOGICAL_VIEW_SPACE_FRAME_HEIGHT;
              this.props.renderInverted
                ? this.setConfigSpaceViewportRect(
                    new e.Rect(
                      new e.Vec2(0, this.configSpaceSize().y - t + 1),
                      new e.Vec2(this.configSpaceSize().x, t)
                    )
                  )
                : this.setConfigSpaceViewportRect(
                    new e.Rect(
                      new e.Vec2(0, -1),
                      new e.Vec2(this.configSpaceSize().x, t)
                    )
                  );
            } else
              t.equals(e.Vec2.zero) ||
                (t.x === o && t.y === s) ||
                this.setConfigSpaceViewportRect(
                  this.props.configSpaceViewportRect.withSize(
                    this.props.configSpaceViewportRect.size.timesPointwise(
                      new e.Vec2(o / t.x, s / t.y)
                    )
                  )
                );
            const r = new e.Vec2(o, s);
            r.equals(t) || this.props.setLogicalSpaceViewportSize(r);
          }
          renderRects() {
            this.container &&
              (this.updateConfigSpaceViewport(),
              this.props.configSpaceViewportRect.isEmpty() ||
                this.props.canvasContext.renderBehind(this.container, () => {
                  this.props.flamechartRenderer.render({
                    physicalSpaceDstRect: this.physicalBounds(),
                    configSpaceSrcRect: this.props.configSpaceViewportRect,
                    renderOutlines: !0,
                  });
                }));
          }
          pan(t) {
            this.interactionLock = "pan";
            const i = this.logicalToPhysicalViewSpace().transformVector(t),
              o =
                this.configSpaceToPhysicalViewSpace().inverseTransformVector(i);
            this.hoveredLabel && this.props.onNodeHover(null),
              o &&
                this.props.transformViewport(
                  e.AffineTransform.withTranslation(o)
                );
          }
          zoom(t, i) {
            this.interactionLock = "zoom";
            const o = this.logicalToPhysicalViewSpace().transformPosition(t),
              s =
                this.configSpaceToPhysicalViewSpace().inverseTransformPosition(
                  o
                );
            if (!s) return;
            const r = e.AffineTransform.withTranslation(s.times(-1))
              .scaledBy(new e.Vec2(i, 1))
              .translatedBy(s);
            this.props.transformViewport(r);
          }
          updateCursor() {
            this.lastDragPos
              ? ((document.body.style.cursor = "grabbing"),
                (document.body.style.cursor = "-webkit-grabbing"))
              : (document.body.style.cursor = "default");
          }
          shouldComponentUpdate() {
            return !1;
          }
          componentWillReceiveProps(e) {
            this.props.flamechart !== e.flamechart
              ? ((this.hoveredLabel = null), this.renderCanvas())
              : this.props.searchResults !== e.searchResults
              ? this.renderCanvas()
              : this.props.selectedNode !== e.selectedNode
              ? this.renderCanvas()
              : this.props.configSpaceViewportRect !== e.configSpaceViewportRect
              ? this.renderCanvas()
              : this.props.canvasContext !== e.canvasContext &&
                (this.props.canvasContext &&
                  this.props.canvasContext.removeBeforeFrameHandler(
                    this.onBeforeFrame
                  ),
                e.canvasContext &&
                  (e.canvasContext.addBeforeFrameHandler(this.onBeforeFrame),
                  e.canvasContext.requestFrame()));
          }
          componentDidMount() {
            this.props.canvasContext.addBeforeFrameHandler(this.onBeforeFrame),
              window.addEventListener("resize", this.onWindowResize),
              window.addEventListener("keydown", this.onWindowKeyPress);
          }
          componentWillUnmount() {
            this.props.canvasContext.removeBeforeFrameHandler(
              this.onBeforeFrame
            ),
              window.removeEventListener("resize", this.onWindowResize),
              window.removeEventListener("keydown", this.onWindowKeyPress);
          }
          render() {
            const e = this.getStyle();
            return (0, s.h)(
              "div",
              {
                className: (0, r.css)(e.panZoomView, t.commonStyle.vbox),
                onMouseDown: this.onMouseDown,
                onMouseMove: this.onMouseMove,
                onMouseLeave: this.onMouseLeave,
                onClick: this.onClick,
                onDblClick: this.onDblClick,
                onWheel: this.onWheel,
                ref: this.containerRef,
              },
              (0, s.h)("canvas", {
                width: 1,
                height: 1,
                ref: this.overlayCanvasRef,
                className: (0, r.css)(e.fill),
              })
            );
          }
        }
        exports.FlamechartPanZoomView = h;
      },
      {
        "../lib/math": "tDuZ",
        "./style": "hvr4",
        "../lib/text-utils": "eeWS",
        "./flamechart-style": "jZ6t",
        preact: "aSor",
        aphrodite: "CxN7",
        "../lib/canvas-2d-batch-renderers": "e6nh",
        "../lib/color": "x77Y",
      },
    ],
    PGRN: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.Hovertip = r);
        var e = require("./style"),
          t = require("aphrodite"),
          i = require("preact"),
          o = require("./themes/theme");
        function r(r) {
          const s = n((0, o.useTheme)()),
            { containerSize: a, offset: d } = r,
            p = a.x,
            h = a.y,
            l = {};
          return (
            d.x + 7 + e.Sizes.TOOLTIP_WIDTH_MAX < p
              ? (l.left = d.x + 7)
              : (l.right = p - d.x + 1),
            d.y + 7 + e.Sizes.TOOLTIP_HEIGHT_MAX < h
              ? (l.top = d.y + 7)
              : (l.bottom = h - d.y + 1),
            (0, i.h)(
              "div",
              { className: (0, t.css)(s.hoverTip), style: l },
              (0, i.h)(
                "div",
                { className: (0, t.css)(s.hoverTipRow) },
                r.children
              )
            )
          );
        }
        const s = 2,
          n = (0, o.withTheme)((i) =>
            t.StyleSheet.create({
              hoverTip: {
                position: "absolute",
                background: i.bgPrimaryColor,
                border: "1px solid black",
                maxWidth: e.Sizes.TOOLTIP_WIDTH_MAX,
                paddingTop: 2,
                paddingBottom: 2,
                pointerEvents: "none",
                userSelect: "none",
                fontSize: e.FontSize.LABEL,
                fontFamily: e.FontFamily.MONOSPACE,
                zIndex: e.ZIndex.HOVERTIP,
              },
              hoverTipRow: {
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflowX: "hidden",
                paddingLeft: 2,
                paddingRight: 2,
                maxWidth: e.Sizes.TOOLTIP_WIDTH_MAX,
              },
            })
          );
      },
      {
        "./style": "hvr4",
        aphrodite: "CxN7",
        preact: "aSor",
        "./themes/theme": "gzKG",
      },
    ],
    C6HJ: [
      function (require, module, exports) {
        "use strict";
        function r(r, e) {
          return d(r, e);
        }
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.fuzzyMatchStrings = r);
        const e = "a".charCodeAt(0),
          t = "z".charCodeAt(0),
          n = "A".charCodeAt(0),
          o = "Z".charCodeAt(0),
          c = "0".charCodeAt(0),
          a = "9".charCodeAt(0);
        var h;
        function u(r) {
          const u = r.charCodeAt(0);
          return e <= u && u <= t
            ? h.charLower
            : n <= u && u <= o
            ? h.charUpper
            : c <= u && u <= a
            ? h.charNumber
            : h.charNonWord;
        }
        function l(r, o) {
          if (r === o) return !0;
          const c = o.charCodeAt(0);
          return e <= c && c <= t && r.charCodeAt(0) === c - e + n;
        }
        function d(r, e) {
          if (0 == e.length) return { matchedRanges: [], score: 0 };
          let t = 0,
            n = -1,
            o = -1,
            c = r.length,
            a = e.length;
          for (let h = 0; h < c; h++) {
            if (l(r[h], e[t]) && (n < 0 && (n = h), ++t == a)) {
              o = h + 1;
              break;
            }
          }
          if (-1 == o) return null;
          t--;
          for (let h = o - 1; h >= n; h--) {
            if (l(r[h], e[t]) && --t < 0) return A(r, e, (n = h), o);
          }
          throw new Error(
            "Implementation error. This must be a bug in fzfFuzzyMatchV1"
          );
        }
        !(function (r) {
          (r[(r.charNonWord = 0)] = "charNonWord"),
            (r[(r.charLower = 1)] = "charLower"),
            (r[(r.charUpper = 2)] = "charUpper"),
            (r[(r.charNumber = 3)] = "charNumber");
        })(h || (h = {}));
        const f = 16,
          i = -3,
          s = -1,
          p = f / 2,
          N = f / 2,
          b = p + s,
          g = -(i + s),
          m = 2;
        function w(r, e) {
          return r === h.charNonWord && e !== h.charNonWord
            ? p
            : (r === h.charLower && e == h.charUpper) ||
              (r !== h.charNumber && e == h.charNumber)
            ? b
            : e === h.charNonWord
            ? N
            : 0;
        }
        function A(r, e, t, n) {
          let o = 0,
            c = 0,
            a = !1,
            d = 0,
            N = 0,
            b = new Array(e.length),
            A = h.charNonWord;
          t > 0 && (A = u(r[t - 1]));
          for (let h = t; h < n; h++) {
            let t = r[h],
              n = u(t);
            if (l(t, e[o])) {
              (b[o] = h), (c += f);
              let r = w(A, n);
              0 == d ? (N = r) : (r === p && (N = r), (r = Math.max(r, N, g))),
                (c += 0 === o ? r * m : r),
                (a = !1),
                d++,
                o++;
            } else (c += a ? s : i), (a = !0), (d = 0), (N = 0);
            A = n;
          }
          if (o !== e.length)
            throw new Error(
              "fzfCalculateScore should only be called when pattern is found between sidx and eidx"
            );
          let C = [[b[0], b[0] + 1]];
          for (let h = 1; h < b.length; h++) {
            const r = b[h],
              e = C[C.length - 1];
            e[1] === r ? (e[1] = r + 1) : C.push([r, r + 1]);
          }
          return { score: c, matchedRanges: C };
        }
      },
      {},
    ],
    DHvC: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.FlamechartSearchResults =
            exports.ProfileSearchResults =
            exports.FlamechartType =
              void 0);
        var e,
          t = require("./fuzzy-find"),
          s = require("./math");
        (exports.FlamechartType = e),
          (function (e) {
            (e[(e.CHRONO_FLAME_CHART = 0)] = "CHRONO_FLAME_CHART"),
              (e[(e.LEFT_HEAVY_FLAME_GRAPH = 1)] = "LEFT_HEAVY_FLAME_GRAPH");
          })(e || (exports.FlamechartType = e = {}));
        class r {
          constructor(e, t) {
            (this.profile = e), (this.searchQuery = t), (this.matches = null);
          }
          getMatchForFrame(e) {
            return (
              this.matches ||
                ((this.matches = new Map()),
                this.profile.forEachFrame((e) => {
                  const s = (0, t.fuzzyMatchStrings)(e.name, this.searchQuery);
                  null != s && this.matches.set(e, s);
                })),
              this.matches.get(e) || null
            );
          }
        }
        exports.ProfileSearchResults = r;
        class h {
          constructor(e, t) {
            (this.flamechart = e),
              (this.profileResults = t),
              (this.matches = null);
          }
          getResults() {
            if (null == this.matches) {
              const e = [],
                t = new Map(),
                r = (h, a) => {
                  const { node: c } = h;
                  if (this.profileResults.getMatchForFrame(c.frame)) {
                    const r = new s.Rect(
                      new s.Vec2(h.start, a),
                      new s.Vec2(h.end - h.start, 1)
                    );
                    t.set(c, e.length),
                      e.push({ configSpaceBounds: r, node: c });
                  }
                  h.children.forEach((e) => {
                    r(e, a + 1);
                  });
                },
                h = this.flamechart.getLayers();
              h.length > 0 && h[0].forEach((e) => r(e, 0)),
                (this.matches = { matches: e, indexForNode: t });
            }
            return this.matches;
          }
          count() {
            return this.getResults().matches.length;
          }
          indexOf(e) {
            const t = this.getResults().indexForNode.get(e);
            return void 0 === t ? null : t;
          }
          at(e) {
            const t = this.getResults().matches;
            if (e < 0 || e >= t.length)
              throw new Error(
                `Index ${e} out of bounds in list of ${t.length} matches.`
              );
            return t[e];
          }
        }
        exports.FlamechartSearchResults = h;
      },
      { "./fuzzy-find": "C6HJ", "./math": "tDuZ" },
    ],
    t9CM: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.SearchView =
            exports.ProfileSearchContextProvider =
            exports.ProfileSearchContext =
              void 0);
        var e = require("aphrodite"),
          r = require("preact"),
          t = require("preact/hooks"),
          o = require("preact/compat"),
          n = require("./style"),
          s = require("../lib/profile-search"),
          i = require("../store"),
          l = require("../lib/preact-redux"),
          c = require("../store/actions"),
          a = require("./themes/theme");
        function u(e) {
          e.stopPropagation();
        }
        const h = (0, r.createContext)(null);
        exports.ProfileSearchContext = h;
        const p = ({ children: e }) => {
          const o = (0, i.useActiveProfileState)(),
            n = o ? o.profile : null,
            l = (0, i.useAppSelector)((e) => e.searchIsActive, []),
            c = (0, i.useAppSelector)((e) => e.searchQuery, []),
            a = (0, t.useMemo)(
              () =>
                n && l && 0 !== c.length
                  ? new s.ProfileSearchResults(n, c)
                  : null,
              [l, c, n]
            );
          return (0, r.h)(h.Provider, { value: a }, e);
        };
        exports.ProfileSearchContextProvider = p;
        const { setSearchQuery: d, setSearchIsActive: m } = c.actions,
          y = (0, o.memo)(
            ({
              numResults: o,
              resultIndex: n,
              selectNext: s,
              selectPrev: c,
            }) => {
              const h = (0, a.useTheme)(),
                p = f(h),
                y = (0, i.useAppSelector)((e) => e.searchQuery, []),
                S = (0, i.useAppSelector)((e) => e.searchIsActive, []),
                g = (0, l.useActionCreator)(d, []),
                x = (0, l.useActionCreator)(m, []),
                b = (0, t.useCallback)(
                  (e) => {
                    const r = e.target.value;
                    g(r);
                  },
                  [g]
                ),
                C = (0, t.useRef)(null),
                v = (0, t.useCallback)(() => x(!1), [x]),
                w = (0, t.useCallback)(
                  (e) => {
                    e.shiftKey ? c() : s();
                  },
                  [c, s]
                ),
                k = (0, t.useCallback)(
                  (e) => {
                    e.stopPropagation(),
                      "Escape" === e.key && x(!1),
                      "Enter" === e.key && w(e),
                      "f" == e.key &&
                        (e.metaKey || e.ctrlKey) &&
                        (C.current && C.current.select(), e.preventDefault());
                  },
                  [x, w]
                );
              return (
                (0, t.useEffect)(() => {
                  const e = (e) => {
                    "f" == e.key &&
                      (e.metaKey || e.ctrlKey) &&
                      (e.preventDefault(),
                      C.current
                        ? C.current.select()
                        : (x(!0),
                          requestAnimationFrame(() => {
                            C.current && C.current.select();
                          })));
                  };
                  return (
                    window.addEventListener("keydown", e),
                    () => {
                      window.removeEventListener("keydown", e);
                    }
                  );
                }, [x]),
                S
                  ? (0, r.h)(
                      "div",
                      { className: (0, e.css)(p.searchView) },
                      (0, r.h)("span", { className: (0, e.css)(p.icon) }, "🔍"),
                      (0, r.h)(
                        "span",
                        { className: (0, e.css)(p.inputContainer) },
                        (0, r.h)("input", {
                          className: (0, e.css)(p.input),
                          value: y,
                          onInput: b,
                          onKeyDown: k,
                          onKeyUp: u,
                          onKeyPress: u,
                          ref: C,
                        })
                      ),
                      null != o &&
                        (0, r.h)(
                          r.Fragment,
                          null,
                          (0, r.h)(
                            "span",
                            { className: (0, e.css)(p.resultCount) },
                            null == n ? "?" : n + 1,
                            "/",
                            o
                          ),
                          (0, r.h)(
                            "button",
                            {
                              className: (0, e.css)(p.icon, p.button),
                              onClick: c,
                            },
                            "⬅️"
                          ),
                          (0, r.h)(
                            "button",
                            {
                              className: (0, e.css)(p.icon, p.button),
                              onClick: s,
                            },
                            "➡️"
                          )
                        ),
                      (0, r.h)(
                        "svg",
                        {
                          className: (0, e.css)(p.icon),
                          onClick: v,
                          width: "16",
                          height: "16",
                          viewBox: "0 0 16 16",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg",
                        },
                        (0, r.h)("path", {
                          d: "M4.99999 4.16217L11.6427 10.8048M11.6427 4.16217L4.99999 10.8048",
                          stroke: h.altFgSecondaryColor,
                        })
                      )
                    )
                  : null
              );
            }
          );
        exports.SearchView = y;
        const f = (0, a.withTheme)((r) =>
          e.StyleSheet.create({
            searchView: {
              position: "absolute",
              top: 0,
              right: 10,
              height: n.Sizes.TOOLBAR_HEIGHT,
              width: 208,
              borderWidth: 2,
              borderColor: r.altFgPrimaryColor,
              borderStyle: "solid",
              fontSize: n.FontSize.LABEL,
              boxSizing: "border-box",
              background: r.altBgSecondaryColor,
              color: r.altFgPrimaryColor,
              display: "flex",
              alignItems: "center",
            },
            inputContainer: { flexShrink: 1, flexGrow: 1, display: "flex" },
            input: {
              width: "100%",
              border: "none",
              background: "none",
              fontSize: n.FontSize.LABEL,
              lineHeight: `${n.Sizes.TOOLBAR_HEIGHT}px`,
              color: r.altFgPrimaryColor,
              ":focus": { border: "none", outline: "none" },
              "::selection": {
                color: r.altFgPrimaryColor,
                background: r.selectionPrimaryColor,
              },
            },
            resultCount: { verticalAlign: "middle" },
            icon: {
              flexShrink: 0,
              verticalAlign: "middle",
              height: "100%",
              margin: "0px 2px 0px 2px",
              fontSize: n.FontSize.LABEL,
            },
            button: {
              display: "inline",
              background: "none",
              border: "none",
              padding: 0,
              ":focus": { outline: "none" },
            },
          })
        );
      },
      {
        aphrodite: "CxN7",
        preact: "aSor",
        "preact/hooks": "MwGB",
        "preact/compat": "AQ6k",
        "./style": "hvr4",
        "../lib/profile-search": "DHvC",
        "../store": "LSXo",
        "../lib/preact-redux": "Erwv",
        "../store/actions": "M9Ab",
        "./themes/theme": "gzKG",
      },
    ],
    zsRf: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.FlamechartSearchView =
            exports.FlamechartSearchContextProvider =
            exports.FlamechartSearchContext =
              void 0);
        var e = require("preact/compat"),
          t = require("preact/hooks"),
          l = require("./search-view"),
          r = require("../lib/profile-search"),
          n = require("../lib/math"),
          c = require("preact");
        const o = (0, c.createContext)(null);
        exports.FlamechartSearchContext = o;
        const u = ({
          flamechart: e,
          selectedNode: n,
          setSelectedNode: u,
          configSpaceViewportRect: a,
          setConfigSpaceViewportRect: i,
          children: s,
        }) => {
          const p = (0, t.useContext)(l.ProfileSearchContext),
            h = (0, t.useMemo)(
              () => (null == p ? null : new r.FlamechartSearchResults(e, p)),
              [e, p]
            );
          return (0, c.h)(
            o.Provider,
            {
              value: {
                results: h,
                flamechart: e,
                selectedNode: n,
                setSelectedNode: u,
                configSpaceViewportRect: a,
                setConfigSpaceViewportRect: i,
              },
            },
            s
          );
        };
        exports.FlamechartSearchContextProvider = u;
        const a = (0, e.memo)(() => {
          const e = (0, t.useContext)(o),
            r = null == e ? null : e.results,
            u = null == e ? null : e.selectedNode,
            a = null == e ? null : e.setSelectedNode,
            i = null == e ? null : e.configSpaceViewportRect,
            s = null == e ? null : e.setConfigSpaceViewportRect,
            p = null == e ? null : e.flamechart,
            h = null == r ? null : r.count(),
            d = (0, t.useMemo)(
              () => (null == r ? null : null == u ? null : r.indexOf(u)),
              [r, u]
            ),
            f = (0, t.useCallback)(
              (e) => {
                if (!a) return;
                if (!p) return;
                if (!i) return;
                if (!s) return;
                const t = e.configSpaceBounds,
                  l = new n.Rect(
                    t.origin.minus(new n.Vec2(0, 1)),
                    t.size.withY(i.height())
                  );
                a(e.node),
                  s(
                    p.getClampedConfigSpaceViewportRect({
                      configSpaceViewportRect: l,
                    })
                  );
              },
              [i, s, a, p]
            ),
            { selectPrev: x, selectNext: S } = (0, t.useMemo)(
              () =>
                null == h || 0 === h || null == r
                  ? { selectPrev: () => {}, selectNext: () => {} }
                  : {
                      selectPrev: () => {
                        if (!(null == r ? void 0 : r.at)) return;
                        if (null == h || 0 === h) return;
                        let e = null == d ? h - 1 : d - 1;
                        e < 0 && (e = h - 1);
                        const t = r.at(e);
                        f(t);
                      },
                      selectNext: () => {
                        if (!(null == r ? void 0 : r.at)) return;
                        if (null == h || 0 === h) return;
                        let e = null == d ? 0 : d + 1;
                        e >= h && (e = 0);
                        const t = r.at(e);
                        f(t);
                      },
                    },
              [h, d, r, null == r ? void 0 : r.at, f]
            );
          return (0, c.h)(l.SearchView, {
            resultIndex: d,
            numResults: h,
            selectPrev: x,
            selectNext: S,
          });
        });
        exports.FlamechartSearchView = a;
      },
      {
        "preact/compat": "AQ6k",
        "preact/hooks": "MwGB",
        "./search-view": "t9CM",
        "../lib/profile-search": "DHvC",
        "../lib/math": "tDuZ",
        preact: "aSor",
      },
    ],
    Z2mP: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.FlamechartView = void 0);
        var e = require("preact"),
          t = require("aphrodite"),
          r = require("../lib/math"),
          i = require("../lib/utils"),
          o = require("./flamechart-minimap-view"),
          s = require("./style"),
          a = require("./flamechart-detail-view"),
          c = require("./flamechart-pan-zoom-view"),
          p = require("./hovertip"),
          h = require("../lib/typed-redux"),
          n = require("./search-view"),
          l = require("./flamechart-search-view"),
          m = require("./flamechart-style");
        class f extends h.StatelessComponent {
          constructor() {
            super(...arguments),
              (this.setConfigSpaceViewportRect = (e) => {
                const t = s.Sizes.DETAIL_VIEW_HEIGHT / s.Sizes.FRAME_HEIGHT,
                  i = this.configSpaceSize(),
                  o = this.props.flamechart.getClampedViewportWidth(e.size.x),
                  a = e.size.withX(o),
                  c = r.Vec2.clamp(
                    e.origin,
                    new r.Vec2(0, -1),
                    r.Vec2.max(
                      r.Vec2.zero,
                      i.minus(a).plus(new r.Vec2(0, t + 1))
                    )
                  );
                this.props.setConfigSpaceViewportRect(
                  new r.Rect(c, e.size.withX(o))
                );
              }),
              (this.setLogicalSpaceViewportSize = (e) => {
                this.props.setLogicalSpaceViewportSize(e);
              }),
              (this.transformViewport = (e) => {
                const t = e.transformRect(this.props.configSpaceViewportRect);
                this.setConfigSpaceViewportRect(t);
              }),
              (this.onNodeHover = (e) => {
                this.props.setNodeHover(e);
              }),
              (this.onNodeClick = (e) => {
                this.props.setSelectedNode(e);
              }),
              (this.container = null),
              (this.containerRef = (e) => {
                this.container = e || null;
              });
          }
          getStyle() {
            return (0, m.getFlamechartStyle)(this.props.theme);
          }
          configSpaceSize() {
            return new r.Vec2(
              this.props.flamechart.getTotalWeight(),
              this.props.flamechart.getLayers().length
            );
          }
          formatValue(e) {
            const t = (100 * e) / this.props.flamechart.getTotalWeight(),
              r = (0, i.formatPercent)(t);
            return `${this.props.flamechart.formatValue(e)} (${r})`;
          }
          renderTooltip() {
            if (!this.container) return null;
            const { hover: i } = this.props;
            if (!i) return null;
            const {
                width: o,
                height: s,
                left: a,
                top: c,
              } = this.container.getBoundingClientRect(),
              h = new r.Vec2(i.event.clientX - a, i.event.clientY - c),
              n = this.getStyle();
            return (0, e.h)(
              p.Hovertip,
              { containerSize: new r.Vec2(o, s), offset: h },
              (0, e.h)(
                "span",
                { className: (0, t.css)(n.hoverCount) },
                this.formatValue(i.node.getTotalWeight())
              ),
              " ",
              i.node.frame.name
            );
          }
          render() {
            const r = this.getStyle();
            return (0, e.h)(
              "div",
              {
                className: (0, t.css)(r.fill, s.commonStyle.vbox),
                ref: this.containerRef,
              },
              (0, e.h)(o.FlamechartMinimapView, {
                theme: this.props.theme,
                configSpaceViewportRect: this.props.configSpaceViewportRect,
                transformViewport: this.transformViewport,
                flamechart: this.props.flamechart,
                flamechartRenderer: this.props.flamechartRenderer,
                canvasContext: this.props.canvasContext,
                setConfigSpaceViewportRect: this.setConfigSpaceViewportRect,
              }),
              (0, e.h)(n.ProfileSearchContext.Consumer, null, (t) =>
                (0, e.h)(
                  e.Fragment,
                  null,
                  (0, e.h)(c.FlamechartPanZoomView, {
                    theme: this.props.theme,
                    canvasContext: this.props.canvasContext,
                    flamechart: this.props.flamechart,
                    flamechartRenderer: this.props.flamechartRenderer,
                    renderInverted: !1,
                    onNodeHover: this.onNodeHover,
                    onNodeSelect: this.onNodeClick,
                    selectedNode: this.props.selectedNode,
                    transformViewport: this.transformViewport,
                    configSpaceViewportRect: this.props.configSpaceViewportRect,
                    setConfigSpaceViewportRect: this.setConfigSpaceViewportRect,
                    logicalSpaceViewportSize:
                      this.props.logicalSpaceViewportSize,
                    setLogicalSpaceViewportSize:
                      this.setLogicalSpaceViewportSize,
                    searchResults: t,
                  }),
                  (0, e.h)(l.FlamechartSearchView, null)
                )
              ),
              this.renderTooltip(),
              this.props.selectedNode &&
                (0, e.h)(a.FlamechartDetailView, {
                  flamechart: this.props.flamechart,
                  getCSSColorForFrame: this.props.getCSSColorForFrame,
                  selectedNode: this.props.selectedNode,
                })
            );
          }
        }
        exports.FlamechartView = f;
      },
      {
        preact: "aSor",
        aphrodite: "CxN7",
        "../lib/math": "tDuZ",
        "../lib/utils": "ucYa",
        "./flamechart-minimap-view": "S7z0",
        "./style": "hvr4",
        "./flamechart-detail-view": "uohB",
        "./flamechart-pan-zoom-view": "e7Fh",
        "./hovertip": "PGRN",
        "../lib/typed-redux": "UDzr",
        "./search-view": "t9CM",
        "./flamechart-search-view": "zsRf",
        "./flamechart-style": "jZ6t",
      },
    ],
    PJJu: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.useFlamechartSetters = g),
          (exports.LeftHeavyFlamechartView =
            exports.getLeftHeavyFlamechart =
            exports.ChronoFlamechartView =
            exports.createMemoizedFlamechartRenderer =
            exports.getChronoViewFlamechart =
              void 0);
        var e = require("preact"),
          t = require("../store/flamechart-view-state"),
          r = require("../lib/flamechart"),
          a = require("../gl/flamechart-renderer"),
          o = require("../lib/preact-redux"),
          c = require("../lib/utils"),
          l = require("./flamechart-view"),
          i = require("../store/getters"),
          n = require("../store/actions"),
          s = require("preact/compat"),
          m = require("./flamechart-search-view"),
          h = require("./themes/theme");
        const {
          setHoveredNode: d,
          setLogicalSpaceViewportSize: f,
          setConfigSpaceViewportRect: p,
          setSelectedNode: C,
        } = n.actions.flamechart;
        function g(e, t) {
          return {
            setNodeHover: (0, o.useActionCreator)(
              (r) => d({ profileIndex: t, args: { id: e, hover: r } }),
              [t, e]
            ),
            setLogicalSpaceViewportSize: (0, o.useActionCreator)(
              (r) =>
                f({
                  profileIndex: t,
                  args: { id: e, logicalSpaceViewportSize: r },
                }),
              [t, e]
            ),
            setConfigSpaceViewportRect: (0, o.useActionCreator)(
              (r) =>
                p({
                  profileIndex: t,
                  args: { id: e, configSpaceViewportRect: r },
                }),
              [t, e]
            ),
            setSelectedNode: (0, o.useActionCreator)(
              (r) => C({ profileIndex: t, args: { id: e, selectedNode: r } }),
              [t, e]
            ),
          };
        }
        const u = (0, c.memoizeByShallowEquality)(
          ({ profile: e, getColorBucketForFrame: t }) =>
            new r.Flamechart({
              getTotalWeight: e.getTotalWeight.bind(e),
              forEachCall: e.forEachCall.bind(e),
              formatValue: e.formatValue.bind(e),
              getColorBucketForFrame: t,
            })
        );
        exports.getChronoViewFlamechart = u;
        const F = (e) =>
          (0, c.memoizeByShallowEquality)(
            ({ canvasContext: t, flamechart: r }) =>
              new a.FlamechartRenderer(
                t.gl,
                (0, i.getRowAtlas)(t),
                r,
                t.rectangleBatchRenderer,
                t.flamechartColorPassRenderer,
                e
              )
          );
        exports.createMemoizedFlamechartRenderer = F;
        const S = F(),
          w = (0, s.memo)((r) => {
            const { activeProfileState: a, glCanvas: o } = r,
              { index: c, profile: n, chronoViewState: s } = a,
              d = (0, h.useTheme)(),
              f = (0, i.getCanvasContext)({ theme: d, canvas: o }),
              p = (0, i.getFrameToColorBucket)(n),
              C = (0, i.createGetColorBucketForFrame)(p),
              F = (0, i.createGetCSSColorForFrame)({
                theme: d,
                frameToColorBucket: p,
              }),
              w = u({ profile: n, getColorBucketForFrame: C }),
              v = S({ canvasContext: f, flamechart: w }),
              V = g(t.FlamechartID.CHRONO, c);
            return (0, e.h)(
              m.FlamechartSearchContextProvider,
              {
                flamechart: w,
                selectedNode: s.selectedNode,
                setSelectedNode: V.setSelectedNode,
                configSpaceViewportRect: s.configSpaceViewportRect,
                setConfigSpaceViewportRect: V.setConfigSpaceViewportRect,
              },
              (0, e.h)(
                l.FlamechartView,
                Object.assign(
                  {
                    theme: d,
                    renderInverted: !1,
                    flamechart: w,
                    flamechartRenderer: v,
                    canvasContext: f,
                    getCSSColorForFrame: F,
                  },
                  s,
                  V
                )
              )
            );
          });
        exports.ChronoFlamechartView = w;
        const v = (0, c.memoizeByShallowEquality)(
          ({ profile: e, getColorBucketForFrame: t }) =>
            new r.Flamechart({
              getTotalWeight: e.getTotalNonIdleWeight.bind(e),
              forEachCall: e.forEachCallGrouped.bind(e),
              formatValue: e.formatValue.bind(e),
              getColorBucketForFrame: t,
            })
        );
        exports.getLeftHeavyFlamechart = v;
        const V = F(),
          x = (0, s.memo)((r) => {
            const { activeProfileState: a, glCanvas: o } = r,
              { index: c, profile: n, leftHeavyViewState: s } = a,
              d = (0, h.useTheme)(),
              f = (0, i.getCanvasContext)({ theme: d, canvas: o }),
              p = (0, i.getFrameToColorBucket)(n),
              C = (0, i.createGetColorBucketForFrame)(p),
              u = (0, i.createGetCSSColorForFrame)({
                theme: d,
                frameToColorBucket: p,
              }),
              F = v({ profile: n, getColorBucketForFrame: C }),
              S = V({ canvasContext: f, flamechart: F }),
              w = g(t.FlamechartID.LEFT_HEAVY, c);
            return (0, e.h)(
              m.FlamechartSearchContextProvider,
              {
                flamechart: F,
                selectedNode: s.selectedNode,
                setSelectedNode: w.setSelectedNode,
                configSpaceViewportRect: s.configSpaceViewportRect,
                setConfigSpaceViewportRect: w.setConfigSpaceViewportRect,
              },
              (0, e.h)(
                l.FlamechartView,
                Object.assign(
                  {
                    theme: d,
                    renderInverted: !1,
                    flamechart: F,
                    flamechartRenderer: S,
                    canvasContext: f,
                    getCSSColorForFrame: u,
                  },
                  s,
                  w
                )
              )
            );
          });
        exports.LeftHeavyFlamechartView = x;
      },
      {
        preact: "aSor",
        "../store/flamechart-view-state": "n9w8",
        "../lib/flamechart": "gFMr",
        "../gl/flamechart-renderer": "P80v",
        "../lib/preact-redux": "Erwv",
        "../lib/utils": "ucYa",
        "./flamechart-view": "Z2mP",
        "../store/getters": "hEOZ",
        "../store/actions": "M9Ab",
        "preact/compat": "AQ6k",
        "./flamechart-search-view": "zsRf",
        "./themes/theme": "gzKG",
      },
    ],
    MXNL: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.getStyle = exports.FlamechartWrapper = void 0);
        var e = require("aphrodite"),
          t = require("preact"),
          r = require("./style"),
          o = require("../lib/math"),
          i = require("./flamechart-pan-zoom-view"),
          s = require("../lib/utils"),
          p = require("./hovertip"),
          a = require("../lib/typed-redux"),
          n = require("./themes/theme");
        class c extends a.StatelessComponent {
          constructor() {
            super(...arguments),
              (this.setConfigSpaceViewportRect = (e) => {
                this.props.setConfigSpaceViewportRect(
                  this.clampViewportToFlamegraph(e)
                );
              }),
              (this.setLogicalSpaceViewportSize = (e) => {
                this.props.setLogicalSpaceViewportSize(e);
              }),
              (this.transformViewport = (e) => {
                this.setConfigSpaceViewportRect(
                  e.transformRect(this.props.configSpaceViewportRect)
                );
              }),
              (this.container = null),
              (this.containerRef = (e) => {
                this.container = e || null;
              }),
              (this.setNodeHover = (e) => {
                this.props.setNodeHover(e);
              });
          }
          clampViewportToFlamegraph(e) {
            const { flamechart: t, renderInverted: r } = this.props;
            return t.getClampedConfigSpaceViewportRect({
              configSpaceViewportRect: e,
              renderInverted: r,
            });
          }
          formatValue(e) {
            const t = (100 * e) / this.props.flamechart.getTotalWeight(),
              r = (0, s.formatPercent)(t);
            return `${this.props.flamechart.formatValue(e)} (${r})`;
          }
          renderTooltip() {
            if (!this.container) return null;
            const { hover: r } = this.props;
            if (!r) return null;
            const {
                width: i,
                height: s,
                left: a,
                top: n,
              } = this.container.getBoundingClientRect(),
              c = new o.Vec2(r.event.clientX - a, r.event.clientY - n),
              h = l(this.props.theme);
            return (0, t.h)(
              p.Hovertip,
              { containerSize: new o.Vec2(i, s), offset: c },
              (0, t.h)(
                "span",
                { className: (0, e.css)(h.hoverCount) },
                this.formatValue(r.node.getTotalWeight())
              ),
              " ",
              r.node.frame.name
            );
          }
          render() {
            return (0, t.h)(
              "div",
              {
                className: (0, e.css)(
                  r.commonStyle.fillY,
                  r.commonStyle.fillX,
                  r.commonStyle.vbox
                ),
                ref: this.containerRef,
              },
              (0, t.h)(i.FlamechartPanZoomView, {
                theme: this.props.theme,
                selectedNode: null,
                onNodeHover: this.setNodeHover,
                onNodeSelect: s.noop,
                configSpaceViewportRect: this.props.configSpaceViewportRect,
                setConfigSpaceViewportRect: this.setConfigSpaceViewportRect,
                transformViewport: this.transformViewport,
                flamechart: this.props.flamechart,
                flamechartRenderer: this.props.flamechartRenderer,
                canvasContext: this.props.canvasContext,
                renderInverted: this.props.renderInverted,
                logicalSpaceViewportSize: this.props.logicalSpaceViewportSize,
                setLogicalSpaceViewportSize: this.setLogicalSpaceViewportSize,
                searchResults: null,
              }),
              this.renderTooltip()
            );
          }
        }
        exports.FlamechartWrapper = c;
        const l = (0, n.withTheme)((t) =>
          e.StyleSheet.create({ hoverCount: { color: t.weightColor } })
        );
        exports.getStyle = l;
      },
      {
        aphrodite: "CxN7",
        preact: "aSor",
        "./style": "hvr4",
        "../lib/math": "tDuZ",
        "./flamechart-pan-zoom-view": "e7Fh",
        "../lib/utils": "ucYa",
        "./hovertip": "PGRN",
        "../lib/typed-redux": "UDzr",
        "./themes/theme": "gzKG",
      },
    ],
    Cw7z: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.InvertedCallerFlamegraphView = void 0);
        var e = require("../lib/utils"),
          r = require("../lib/flamechart"),
          t = require("./flamechart-view-container"),
          a = require("../store/getters"),
          l = require("../store/flamechart-view-state"),
          o = require("../store"),
          i = require("./flamechart-wrapper"),
          n = require("preact"),
          c = require("preact/compat"),
          m = require("./themes/theme");
        const s = (0, e.memoizeByShallowEquality)(
            ({ profile: e, frame: r, flattenRecursion: t }) => {
              let a = e.getInvertedProfileForCallersOf(r);
              return t ? a.getProfileWithRecursionFlattened() : a;
            }
          ),
          u = (0, e.memoizeByShallowEquality)(
            ({ invertedCallerProfile: e, getColorBucketForFrame: t }) =>
              new r.Flamechart({
                getTotalWeight: e.getTotalNonIdleWeight.bind(e),
                forEachCall: e.forEachCallGrouped.bind(e),
                formatValue: e.formatValue.bind(e),
                getColorBucketForFrame: t,
              })
          ),
          h = (0, t.createMemoizedFlamechartRenderer)({ inverted: !0 }),
          f = (0, c.memo)((r) => {
            const { activeProfileState: c } = r;
            let { profile: f, sandwichViewState: C, index: d } = c;
            const p = (0, o.useAppSelector)((e) => e.flattenRecursion, []),
              F = (0, o.useAppSelector)((e) => e.glCanvas, []),
              g = (0, m.useTheme)();
            if (!f) throw new Error("profile missing");
            if (!F) throw new Error("glCanvas missing");
            const { callerCallee: v } = C;
            if (!v) throw new Error("callerCallee missing");
            const { selectedFrame: w } = v,
              S = (0, a.getFrameToColorBucket)(f),
              q = (0, a.createGetColorBucketForFrame)(S),
              E = (0, a.createGetCSSColorForFrame)({
                theme: g,
                frameToColorBucket: S,
              }),
              B = (0, a.getCanvasContext)({ theme: g, canvas: F }),
              I = u({
                invertedCallerProfile: s({
                  profile: f,
                  frame: w,
                  flattenRecursion: p,
                }),
                getColorBucketForFrame: q,
              }),
              R = h({ canvasContext: B, flamechart: I });
            return (0, n.h)(
              i.FlamechartWrapper,
              Object.assign(
                {
                  theme: g,
                  renderInverted: !0,
                  flamechart: I,
                  flamechartRenderer: R,
                  canvasContext: B,
                  getCSSColorForFrame: E,
                },
                (0, t.useFlamechartSetters)(
                  l.FlamechartID.SANDWICH_INVERTED_CALLERS,
                  d
                ),
                v.invertedCallerFlamegraph,
                { setSelectedNode: e.noop }
              )
            );
          });
        exports.InvertedCallerFlamegraphView = f;
      },
      {
        "../lib/utils": "ucYa",
        "../lib/flamechart": "gFMr",
        "./flamechart-view-container": "PJJu",
        "../store/getters": "hEOZ",
        "../store/flamechart-view-state": "n9w8",
        "../store": "LSXo",
        "./flamechart-wrapper": "MXNL",
        preact: "aSor",
        "preact/compat": "AQ6k",
        "./themes/theme": "gzKG",
      },
    ],
    KT37: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.CalleeFlamegraphView = void 0);
        var e = require("../lib/utils"),
          r = require("../lib/flamechart"),
          t = require("./flamechart-view-container"),
          a = require("../store/getters"),
          l = require("../store/flamechart-view-state"),
          o = require("./flamechart-wrapper"),
          i = require("../store"),
          c = require("preact"),
          m = require("preact/compat"),
          n = require("./themes/theme");
        const s = (0, e.memoizeByShallowEquality)(
            ({ profile: e, frame: r, flattenRecursion: t }) => {
              let a = e.getProfileForCalleesOf(r);
              return t ? a.getProfileWithRecursionFlattened() : a;
            }
          ),
          u = (0, e.memoizeByShallowEquality)(
            ({ calleeProfile: e, getColorBucketForFrame: t }) =>
              new r.Flamechart({
                getTotalWeight: e.getTotalNonIdleWeight.bind(e),
                forEachCall: e.forEachCallGrouped.bind(e),
                formatValue: e.formatValue.bind(e),
                getColorBucketForFrame: t,
              })
          ),
          h = (0, t.createMemoizedFlamechartRenderer)(),
          f = (0, m.memo)((r) => {
            const { activeProfileState: m } = r,
              { index: f, profile: C, sandwichViewState: p } = m,
              F = (0, i.useAppSelector)((e) => e.flattenRecursion, []),
              g = (0, i.useAppSelector)((e) => e.glCanvas, []),
              d = (0, n.useTheme)();
            if (!C) throw new Error("profile missing");
            if (!g) throw new Error("glCanvas missing");
            const { callerCallee: w } = p;
            if (!w) throw new Error("callerCallee missing");
            const { selectedFrame: S } = w,
              v = (0, a.getFrameToColorBucket)(C),
              q = (0, a.createGetColorBucketForFrame)(v),
              E = (0, a.createGetCSSColorForFrame)({
                theme: d,
                frameToColorBucket: v,
              }),
              B = (0, a.getCanvasContext)({ theme: d, canvas: g }),
              b = u({
                calleeProfile: s({ profile: C, frame: S, flattenRecursion: F }),
                getColorBucketForFrame: q,
              }),
              x = h({ canvasContext: B, flamechart: b });
            return (0, c.h)(
              o.FlamechartWrapper,
              Object.assign(
                {
                  theme: d,
                  renderInverted: !1,
                  flamechart: b,
                  flamechartRenderer: x,
                  canvasContext: B,
                  getCSSColorForFrame: E,
                },
                (0, t.useFlamechartSetters)(l.FlamechartID.SANDWICH_CALLEES, f),
                w.calleeFlamegraph,
                { setSelectedNode: e.noop }
              )
            );
          });
        exports.CalleeFlamegraphView = f;
      },
      {
        "../lib/utils": "ucYa",
        "../lib/flamechart": "gFMr",
        "./flamechart-view-container": "PJJu",
        "../store/getters": "hEOZ",
        "../store/flamechart-view-state": "n9w8",
        "./flamechart-wrapper": "MXNL",
        "../store": "LSXo",
        preact: "aSor",
        "preact/compat": "AQ6k",
        "./themes/theme": "gzKG",
      },
    ],
    cWm7: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.SandwichSearchView = void 0);
        var e = require("preact/compat"),
          l = require("preact/hooks"),
          t = require("./search-view"),
          r = require("preact"),
          s = require("./sandwich-view");
        const c = (0, e.memo)(() => {
          const e = (0, l.useContext)(s.SandwichViewContext),
            c = null != e ? e.rowList : null,
            n =
              null != (null == e ? void 0 : e.selectedFrame)
                ? e.getIndexForFrame(e.selectedFrame)
                : null,
            u = null != c ? c.length : null,
            { selectPrev: i, selectNext: a } = (0, l.useMemo)(
              () =>
                null == c || null == u || 0 === u || null == e
                  ? { selectPrev: () => {}, selectNext: () => {} }
                  : {
                      selectPrev: () => {
                        let l = null == n ? u - 1 : n - 1;
                        l < 0 && (l = u - 1), e.setSelectedFrame(c[l]);
                      },
                      selectNext: () => {
                        let l = null == n ? 0 : n + 1;
                        l >= u && (l = 0), e.setSelectedFrame(c[l]);
                      },
                    },
              [n, c, u, e]
            );
          return (0, r.h)(t.SearchView, {
            resultIndex: n,
            numResults: u,
            selectPrev: i,
            selectNext: a,
          });
        });
        exports.SandwichSearchView = c;
      },
      {
        "preact/compat": "AQ6k",
        "preact/hooks": "MwGB",
        "./search-view": "t9CM",
        preact: "aSor",
        "./sandwich-view": "L8J2",
      },
    ],
    L8J2: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.SandwichViewContainer = exports.SandwichViewContext =
            void 0);
        var e = require("aphrodite"),
          t = require("./profile-table-view"),
          r = require("preact"),
          a = require("preact/compat"),
          l = require("preact/hooks"),
          s = require("./style"),
          o = require("../store/actions"),
          i = require("../lib/typed-redux"),
          n = require("./inverted-caller-flamegraph-view"),
          c = require("./callee-flamegraph-view"),
          h = require("../lib/preact-redux"),
          d = require("./sandwich-search-view"),
          m = require("../store"),
          p = require("../lib/utils"),
          f = require("./search-view"),
          u = require("./themes/theme");
        class S extends i.StatelessComponent {
          constructor() {
            super(...arguments),
              (this.setSelectedFrame = (e) => {
                this.props.setSelectedFrame(e);
              }),
              (this.onWindowKeyPress = (e) => {
                "Escape" === e.key && this.setSelectedFrame(null);
              });
          }
          componentDidMount() {
            window.addEventListener("keydown", this.onWindowKeyPress);
          }
          componentWillUnmount() {
            window.removeEventListener("keydown", this.onWindowKeyPress);
          }
          render() {
            const a = v(this.props.theme),
              { selectedFrame: l } = this.props;
            let o = null;
            return (
              l &&
                (o = (0, r.h)(
                  "div",
                  {
                    className: (0, e.css)(
                      s.commonStyle.fillY,
                      a.callersAndCallees,
                      s.commonStyle.vbox
                    ),
                  },
                  (0, r.h)(
                    "div",
                    {
                      className: (0, e.css)(
                        s.commonStyle.hbox,
                        a.panZoomViewWraper
                      ),
                    },
                    (0, r.h)(
                      "div",
                      { className: (0, e.css)(a.flamechartLabelParent) },
                      (0, r.h)(
                        "div",
                        { className: (0, e.css)(a.flamechartLabel) },
                        "Callers"
                      )
                    ),
                    (0, r.h)(n.InvertedCallerFlamegraphView, {
                      glCanvas: this.props.glCanvas,
                      activeProfileState: this.props.activeProfileState,
                    })
                  ),
                  (0, r.h)("div", { className: (0, e.css)(a.divider) }),
                  (0, r.h)(
                    "div",
                    {
                      className: (0, e.css)(
                        s.commonStyle.hbox,
                        a.panZoomViewWraper
                      ),
                    },
                    (0, r.h)(
                      "div",
                      {
                        className: (0, e.css)(
                          a.flamechartLabelParent,
                          a.flamechartLabelParentBottom
                        ),
                      },
                      (0, r.h)(
                        "div",
                        {
                          className: (0, e.css)(
                            a.flamechartLabel,
                            a.flamechartLabelBottom
                          ),
                        },
                        "Callees"
                      )
                    ),
                    (0, r.h)(c.CalleeFlamegraphView, {
                      glCanvas: this.props.glCanvas,
                      activeProfileState: this.props.activeProfileState,
                    })
                  )
                )),
              (0, r.h)(
                "div",
                {
                  className: (0, e.css)(
                    s.commonStyle.hbox,
                    s.commonStyle.fillY
                  ),
                },
                (0, r.h)(
                  "div",
                  { className: (0, e.css)(a.tableView) },
                  (0, r.h)(t.ProfileTableViewContainer, {
                    activeProfileState: this.props.activeProfileState,
                  }),
                  (0, r.h)(d.SandwichSearchView, null)
                ),
                o
              )
            );
          }
        }
        const v = (0, u.withTheme)((t) =>
            e.StyleSheet.create({
              tableView: { position: "relative", flex: 1 },
              panZoomViewWraper: { flex: 1 },
              flamechartLabelParent: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                fontSize: s.FontSize.TITLE,
                width: 1.2 * s.FontSize.TITLE,
                borderRight: `1px solid ${t.fgSecondaryColor}`,
              },
              flamechartLabelParentBottom: { justifyContent: "flex-start" },
              flamechartLabel: {
                transform: "rotate(-90deg)",
                transformOrigin: "50% 50% 0",
                width: 1.2 * s.FontSize.TITLE,
                flexShrink: 1,
              },
              flamechartLabelBottom: {
                transform: "rotate(-90deg)",
                display: "flex",
                justifyContent: "flex-end",
              },
              callersAndCallees: {
                flex: 1,
                borderLeft: `${s.Sizes.SEPARATOR_HEIGHT}px solid ${t.fgSecondaryColor}`,
              },
              divider: { height: 2, background: t.fgSecondaryColor },
            })
          ),
          w = (0, r.createContext)(null);
        exports.SandwichViewContext = w;
        const x = (0, a.memo)((e) => {
          const { activeProfileState: a, glCanvas: s } = e,
            { sandwichViewState: i, index: n } = a,
            { callerCallee: c } = i,
            d = (0, u.useTheme)(),
            v = (0, h.useDispatch)(),
            x = (0, l.useCallback)(
              (e) => {
                v(
                  o.actions.sandwichView.setSelectedFrame({
                    profileIndex: n,
                    args: e,
                  })
                );
              },
              [v, n]
            ),
            g = a.profile,
            C = (0, m.useAppSelector)((e) => e.tableSortMethod, []),
            b = (0, l.useContext)(f.ProfileSearchContext),
            F = c ? c.selectedFrame : null,
            y = (0, l.useMemo)(() => {
              const e = [];
              switch (
                (g.forEachFrame((t) => {
                  (b && !b.getMatchForFrame(t)) || e.push(t);
                }),
                C.field)
              ) {
                case t.SortField.SYMBOL_NAME:
                  (0, p.sortBy)(e, (e) => e.name.toLowerCase());
                  break;
                case t.SortField.SELF:
                  (0, p.sortBy)(e, (e) => e.getSelfWeight());
                  break;
                case t.SortField.TOTAL:
                  (0, p.sortBy)(e, (e) => e.getTotalWeight());
              }
              return (
                C.direction === t.SortDirection.DESCENDING && e.reverse(), e
              );
            }, [g, b, C]),
            L = (0, l.useMemo)(() => {
              const e = new Map();
              for (let t = 0; t < y.length; t++) e.set(y[t], t);
              return (t) => {
                const r = e.get(t);
                return null == r ? null : r;
              };
            }, [y]),
            P = (0, l.useMemo)(
              () => (e) => null == b ? null : b.getMatchForFrame(e),
              [b]
            ),
            q = {
              rowList: y,
              selectedFrame: F,
              setSelectedFrame: x,
              getIndexForFrame: L,
              getSearchMatchForFrame: P,
            };
          return (0, r.h)(
            w.Provider,
            { value: q },
            (0, r.h)(S, {
              theme: d,
              activeProfileState: a,
              glCanvas: s,
              setSelectedFrame: x,
              selectedFrame: F,
              profileIndex: n,
            })
          );
        });
        exports.SandwichViewContainer = x;
      },
      {
        aphrodite: "CxN7",
        "./profile-table-view": "Ivh5",
        preact: "aSor",
        "preact/compat": "AQ6k",
        "preact/hooks": "MwGB",
        "./style": "hvr4",
        "../store/actions": "M9Ab",
        "../lib/typed-redux": "UDzr",
        "./inverted-caller-flamegraph-view": "Cw7z",
        "./callee-flamegraph-view": "KT37",
        "../lib/preact-redux": "Erwv",
        "./sandwich-search-view": "cWm7",
        "../store": "LSXo",
        "../lib/utils": "ucYa",
        "./search-view": "t9CM",
        "./themes/theme": "gzKG",
      },
    ],
    Ivh5: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.ProfileTableViewContainer =
            exports.ProfileTableView =
            exports.SortDirection =
            exports.SortField =
              void 0);
        var e,
          r,
          t = require("preact"),
          o = require("aphrodite"),
          l = require("../lib/utils"),
          i = require("./style"),
          a = require("./color-chit"),
          s = require("./scrollable-list-view"),
          c = require("../store/actions"),
          n = require("../store/getters"),
          h = require("../lib/preact-redux"),
          d = require("../store"),
          m = require("preact/compat"),
          u = require("preact/hooks"),
          S = require("./sandwich-view"),
          p = require("../lib/color"),
          C = require("./themes/theme");
        function b(e) {
          const r = E((0, C.useTheme)());
          return (0, t.h)(
            "div",
            { className: (0, o.css)(r.hBarDisplay) },
            (0, t.h)("div", {
              className: (0, o.css)(r.hBarDisplayFilled),
              style: { width: `${e.perc}%` },
            })
          );
        }
        function g(e) {
          const l = (0, C.useTheme)(),
            i = E(l),
            { activeDirection: a } = e,
            s = a === r.ASCENDING ? l.fgPrimaryColor : l.fgSecondaryColor,
            c = a === r.DESCENDING ? l.fgPrimaryColor : l.fgSecondaryColor;
          return (0, t.h)(
            "svg",
            {
              width: "8",
              height: "10",
              viewBox: "0 0 8 10",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              className: (0, o.css)(i.sortIcon),
            },
            (0, t.h)("path", { d: "M0 4L4 0L8 4H0Z", fill: s }),
            (0, t.h)("path", {
              d: "M0 4L4 0L8 4H0Z",
              transform: "translate(0 10) scale(1 -1)",
              fill: c,
            })
          );
        }
        function f(e, r, o) {
          const l = [];
          let i = 0;
          for (let a of r)
            l.push(e.slice(i, a[0])),
              l.push((0, t.h)("span", { className: o }, e.slice(a[0], a[1]))),
              (i = a[1]);
          return l.push(e.slice(i)), (0, t.h)("span", null, l);
        }
        (exports.SortField = e),
          (function (e) {
            (e[(e.SYMBOL_NAME = 0)] = "SYMBOL_NAME"),
              (e[(e.SELF = 1)] = "SELF"),
              (e[(e.TOTAL = 2)] = "TOTAL");
          })(e || (exports.SortField = e = {})),
          (exports.SortDirection = r),
          (function (e) {
            (e[(e.ASCENDING = 0)] = "ASCENDING"),
              (e[(e.DESCENDING = 1)] = "DESCENDING");
          })(r || (exports.SortDirection = r = {}));
        const w = ({
            frame: e,
            matchedRanges: r,
            profile: i,
            index: s,
            selectedFrame: c,
            setSelectedFrame: n,
            getCSSColorForFrame: h,
          }) => {
            const d = E((0, C.useTheme)()),
              m = e.getTotalWeight(),
              u = e.getSelfWeight(),
              S = (100 * m) / i.getTotalNonIdleWeight(),
              p = (100 * u) / i.getTotalNonIdleWeight(),
              g = e === c;
            return (0, t.h)(
              "tr",
              {
                key: `${s}`,
                onClick: n.bind(null, e),
                className: (0, o.css)(
                  d.tableRow,
                  s % 2 == 0 && d.tableRowEven,
                  g && d.tableRowSelected
                ),
              },
              (0, t.h)(
                "td",
                { className: (0, o.css)(d.numericCell) },
                i.formatValue(m),
                " (",
                (0, l.formatPercent)(S),
                ")",
                (0, t.h)(b, { perc: S })
              ),
              (0, t.h)(
                "td",
                { className: (0, o.css)(d.numericCell) },
                i.formatValue(u),
                " (",
                (0, l.formatPercent)(p),
                ")",
                (0, t.h)(b, { perc: p })
              ),
              (0, t.h)(
                "td",
                { title: e.file, className: (0, o.css)(d.textCell) },
                (0, t.h)(a.ColorChit, { color: h(e) }),
                r
                  ? f(e.name, r, (0, o.css)(d.matched, g && d.matchedSelected))
                  : e.name
              )
            );
          },
          N = (0, m.memo)(
            ({
              profile: l,
              sortMethod: a,
              setSortMethod: c,
              selectedFrame: n,
              setSelectedFrame: h,
              getCSSColorForFrame: d,
              searchQuery: m,
              searchIsActive: p,
            }) => {
              const b = E((0, C.useTheme)()),
                f = (0, u.useCallback)(
                  (t, o) => {
                    if ((o.preventDefault(), a.field == t))
                      c({
                        field: t,
                        direction:
                          a.direction === r.ASCENDING
                            ? r.DESCENDING
                            : r.ASCENDING,
                      });
                    else
                      switch (t) {
                        case e.SYMBOL_NAME:
                          c({ field: t, direction: r.ASCENDING });
                          break;
                        case e.SELF:
                        case e.TOTAL:
                          c({ field: t, direction: r.DESCENDING });
                      }
                  },
                  [a, c]
                ),
                N = (0, u.useContext)(S.SandwichViewContext),
                F = (0, u.useCallback)(
                  (e, r) => {
                    if (!N) return null;
                    const i = [];
                    for (let t = e; t <= r; t++) {
                      const e = N.rowList[t],
                        r = N.getSearchMatchForFrame(e);
                      i.push(
                        w({
                          frame: e,
                          matchedRanges: null == r ? null : r.matchedRanges,
                          index: t,
                          profile: l,
                          selectedFrame: n,
                          setSelectedFrame: h,
                          getCSSColorForFrame: d,
                        })
                      );
                    }
                    return (
                      0 === i.length &&
                        (p
                          ? i.push(
                              (0, t.h)(
                                "tr",
                                null,
                                (0, t.h)(
                                  "td",
                                  { className: (0, o.css)(b.emptyState) },
                                  'No symbol names match query "',
                                  m,
                                  '".'
                                )
                              )
                            )
                          : i.push(
                              (0, t.h)(
                                "tr",
                                null,
                                (0, t.h)(
                                  "td",
                                  { className: (0, o.css)(b.emptyState) },
                                  "No symbols found."
                                )
                              )
                            )),
                      (0, t.h)(
                        "table",
                        { className: (0, o.css)(b.tableView) },
                        i
                      )
                    );
                  },
                  [N, l, n, h, d, p, m, b.emptyState, b.tableView]
                ),
                y = (0, u.useMemo)(
                  () =>
                    null == N
                      ? []
                      : N.rowList.map((e) => ({ size: i.Sizes.FRAME_HEIGHT })),
                  [N]
                ),
                x = (0, u.useCallback)((r) => f(e.TOTAL, r), [f]),
                A = (0, u.useCallback)((r) => f(e.SELF, r), [f]),
                T = (0, u.useCallback)((r) => f(e.SYMBOL_NAME, r), [f]);
              return (0, t.h)(
                "div",
                {
                  className: (0, o.css)(i.commonStyle.vbox, b.profileTableView),
                },
                (0, t.h)(
                  "table",
                  { className: (0, o.css)(b.tableView) },
                  (0, t.h)(
                    "thead",
                    { className: (0, o.css)(b.tableHeader) },
                    (0, t.h)(
                      "tr",
                      null,
                      (0, t.h)(
                        "th",
                        { className: (0, o.css)(b.numericCell), onClick: x },
                        (0, t.h)(g, {
                          activeDirection:
                            a.field === e.TOTAL ? a.direction : null,
                        }),
                        "Total"
                      ),
                      (0, t.h)(
                        "th",
                        { className: (0, o.css)(b.numericCell), onClick: A },
                        (0, t.h)(g, {
                          activeDirection:
                            a.field === e.SELF ? a.direction : null,
                        }),
                        "Self"
                      ),
                      (0, t.h)(
                        "th",
                        { className: (0, o.css)(b.textCell), onClick: T },
                        (0, t.h)(g, {
                          activeDirection:
                            a.field === e.SYMBOL_NAME ? a.direction : null,
                        }),
                        "Symbol Name"
                      )
                    )
                  )
                ),
                (0, t.h)(s.ScrollableListView, {
                  axis: "y",
                  items: y,
                  className: (0, o.css)(b.scrollView),
                  renderItems: F,
                  initialIndexInView:
                    null == n
                      ? null
                      : null == N
                      ? void 0
                      : N.getIndexForFrame(n),
                })
              );
            }
          );
        exports.ProfileTableView = N;
        const E = (0, C.withTheme)((e) =>
            o.StyleSheet.create({
              profileTableView: {
                background: e.bgPrimaryColor,
                height: "100%",
              },
              scrollView: {
                overflowY: "auto",
                overflowX: "hidden",
                flexGrow: 1,
                "::-webkit-scrollbar": { background: e.bgPrimaryColor },
                "::-webkit-scrollbar-thumb": {
                  background: e.fgSecondaryColor,
                  borderRadius: 20,
                  border: `3px solid ${e.bgPrimaryColor}`,
                  ":hover": { background: e.fgPrimaryColor },
                },
              },
              tableView: {
                width: "100%",
                fontSize: i.FontSize.LABEL,
                background: e.bgPrimaryColor,
              },
              tableHeader: {
                borderBottom: `2px solid ${e.bgSecondaryColor}`,
                textAlign: "left",
                color: e.fgPrimaryColor,
                userSelect: "none",
              },
              sortIcon: {
                position: "relative",
                top: 1,
                marginRight: i.Sizes.FRAME_HEIGHT / 4,
              },
              tableRow: {
                background: e.bgPrimaryColor,
                height: i.Sizes.FRAME_HEIGHT,
              },
              tableRowEven: { background: e.bgSecondaryColor },
              tableRowSelected: {
                background: e.selectionPrimaryColor,
                color: e.altFgPrimaryColor,
              },
              numericCell: {
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                position: "relative",
                textAlign: "right",
                paddingRight: i.Sizes.FRAME_HEIGHT,
                width: 6 * i.Sizes.FRAME_HEIGHT,
                minWidth: 6 * i.Sizes.FRAME_HEIGHT,
              },
              textCell: {
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                width: "100%",
                maxWidth: 0,
              },
              hBarDisplay: {
                position: "absolute",
                background: p.Color.fromCSSHex(e.weightColor)
                  .withAlpha(0.2)
                  .toCSS(),
                bottom: 2,
                height: 2,
                width: `calc(100% - ${2 * i.Sizes.FRAME_HEIGHT}px)`,
                right: i.Sizes.FRAME_HEIGHT,
              },
              hBarDisplayFilled: {
                height: "100%",
                position: "absolute",
                background: e.weightColor,
                right: 0,
              },
              matched: { borderBottom: `2px solid ${e.fgPrimaryColor}` },
              matchedSelected: { borderColor: e.altFgPrimaryColor },
              emptyState: { textAlign: "center", fontWeight: "bold" },
            })
          ),
          { setTableSortMethod: F } = c.actions.sandwichView,
          y = (0, m.memo)((e) => {
            const { activeProfileState: r } = e,
              { profile: o, sandwichViewState: l, index: i } = r;
            if (!o) throw new Error("profile missing");
            const a = (0, d.useAppSelector)((e) => e.tableSortMethod, []),
              s = (0, C.useTheme)(),
              { callerCallee: m } = l,
              u = m ? m.selectedFrame : null,
              S = (0, n.getFrameToColorBucket)(o),
              p = (0, n.createGetCSSColorForFrame)({
                theme: s,
                frameToColorBucket: S,
              }),
              b = (0, h.useActionCreator)(
                (e) =>
                  c.actions.sandwichView.setSelectedFrame({
                    profileIndex: i,
                    args: e,
                  }),
                [i]
              ),
              g = (0, h.useActionCreator)(F, []),
              f = (0, d.useAppSelector)((e) => e.searchIsActive, []),
              w = (0, d.useAppSelector)((e) => e.searchQuery, []);
            return (0, t.h)(N, {
              profile: o,
              selectedFrame: u,
              getCSSColorForFrame: p,
              sortMethod: a,
              setSelectedFrame: b,
              setSortMethod: g,
              searchIsActive: f,
              searchQuery: w,
            });
          });
        exports.ProfileTableViewContainer = y;
      },
      {
        preact: "aSor",
        aphrodite: "CxN7",
        "../lib/utils": "ucYa",
        "./style": "hvr4",
        "./color-chit": "Pua8",
        "./scrollable-list-view": "SGwe",
        "../store/actions": "M9Ab",
        "../store/getters": "hEOZ",
        "../lib/preact-redux": "Erwv",
        "../store": "LSXo",
        "preact/compat": "AQ6k",
        "preact/hooks": "MwGB",
        "./sandwich-view": "L8J2",
        "../lib/color": "x77Y",
        "./themes/theme": "gzKG",
      },
    ],
    LSXo: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.createAppStore = w),
          (exports.useAppSelector = h),
          (exports.useActiveProfileState = A),
          (exports.canUseXHR = exports.ColorScheme = exports.ViewMode = void 0);
        var e,
          t,
          r = require("./actions"),
          o = p(require("redux")),
          s = require("../lib/typed-redux"),
          i = require("../lib/hash-params"),
          n = require("./profiles-state"),
          c = require("../views/profile-table-view"),
          a = require("../lib/preact-redux"),
          l = require("./getters");
        function u() {
          if ("function" != typeof WeakMap) return null;
          var e = new WeakMap();
          return (
            (u = function () {
              return e;
            }),
            e
          );
        }
        function p(e) {
          if (e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var t = u();
          if (t && t.has(e)) return t.get(e);
          var r = {},
            o = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var s in e)
            if (Object.prototype.hasOwnProperty.call(e, s)) {
              var i = o ? Object.getOwnPropertyDescriptor(e, s) : null;
              i && (i.get || i.set)
                ? Object.defineProperty(r, s, i)
                : (r[s] = e[s]);
            }
          return (r.default = e), t && t.set(e, r), r;
        }
        (exports.ViewMode = e),
          (function (e) {
            (e[(e.CHRONO_FLAME_CHART = 0)] = "CHRONO_FLAME_CHART"),
              (e[(e.LEFT_HEAVY_FLAME_GRAPH = 1)] = "LEFT_HEAVY_FLAME_GRAPH"),
              (e[(e.SANDWICH_VIEW = 2)] = "SANDWICH_VIEW");
          })(e || (exports.ViewMode = e = {})),
          (exports.ColorScheme = t),
          (function (e) {
            (e[(e.SYSTEM = 0)] = "SYSTEM"),
              (e[(e.DARK = 1)] = "DARK"),
              (e[(e.LIGHT = 2)] = "LIGHT");
          })(t || (exports.ColorScheme = t = {}));
        const f = window.location.protocol,
          d = "http:" === f || "https:" === f;
        function S(e, o) {
          if (void 0 === e) {
            const e =
              window.localStorage &&
              window.localStorage["speedscope-color-scheme"];
            return "DARK" === e ? t.DARK : "LIGHT" === e ? t.LIGHT : t.SYSTEM;
          }
          if (r.actions.setColorScheme.matches(o)) {
            const e = o.payload;
            switch (e) {
              case t.DARK:
                window.localStorage["speedscope-color-scheme"] = "DARK";
                break;
              case t.LIGHT:
                window.localStorage["speedscope-color-scheme"] = "LIGHT";
                break;
              case t.SYSTEM:
                delete window.localStorage["speedscope-color-scheme"];
                break;
              default:
                return e;
            }
            return e;
          }
          return e;
        }
        function w(t) {
          const a = (0, i.getHashParams)(),
            l = d && null != a.profileURL,
            u = o.combineReducers({
              profileGroup: n.profileGroup,
              hashParams: (0, s.setter)(r.actions.setHashParams, a),
              flattenRecursion: (0, s.setter)(
                r.actions.setFlattenRecursion,
                !1
              ),
              viewMode: (0, s.setter)(
                r.actions.setViewMode,
                e.CHRONO_FLAME_CHART
              ),
              searchQuery: (0, s.setter)(r.actions.setSearchQuery, ""),
              searchIsActive: (0, s.setter)(r.actions.setSearchIsActive, !1),
              glCanvas: (0, s.setter)(r.actions.setGLCanvas, null),
              dragActive: (0, s.setter)(r.actions.setDragActive, !1),
              loading: (0, s.setter)(r.actions.setLoading, l),
              error: (0, s.setter)(r.actions.setError, !1),
              tableSortMethod: (0, s.setter)(
                r.actions.sandwichView.setTableSortMethod,
                {
                  field: c.SortField.SELF,
                  direction: c.SortDirection.DESCENDING,
                }
              ),
              colorScheme: S,
            });
          return o.createStore(u, t);
        }
        function h(e, t) {
          return (0, a.useSelector)(e, t);
        }
        function A() {
          return h((e) => {
            const { profileGroup: t } = e;
            if (!t) return null;
            if (t.indexToView >= t.profiles.length) return null;
            const r = t.indexToView,
              o = t.profiles[r];
            return Object.assign(Object.assign({}, t.profiles[t.indexToView]), {
              profile: (0, l.getProfileToView)({
                profile: o.profile,
                flattenRecursion: e.flattenRecursion,
              }),
              index: t.indexToView,
            });
          }, []);
        }
        exports.canUseXHR = d;
      },
      {
        "./actions": "M9Ab",
        redux: "aVFJ",
        "../lib/typed-redux": "UDzr",
        "../lib/hash-params": "O1pB",
        "./profiles-state": "HCyk",
        "../views/profile-table-view": "Ivh5",
        "../lib/preact-redux": "Erwv",
        "./getters": "hEOZ",
      },
    ],
    FbpF: [
      function (require, module, exports) {
        "use strict";
        function e(e) {
          return e.replace(/\\([a-fA-F0-9]{2})/g, (e, n) => {
            const t = parseInt(n, 16);
            return String.fromCharCode(t);
          });
        }
        function n(n) {
          const t = n.split("\n");
          if (!t.length) return null;
          if (("" === t[t.length - 1] && t.pop(), !t.length)) return null;
          const r = new Map(),
            o = /^(\d+):(.+)$/,
            s = /^([\$\w]+):([\$\w-]+)$/;
          for (const u of t) {
            const n = o.exec(u);
            if (n) {
              r.set(`wasm-function[${n[1]}]`, e(n[2]));
              continue;
            }
            const t = s.exec(u);
            if (!t) return null;
            r.set(t[1], e(t[2]));
          }
          return (e) => (r.has(e.name) ? { name: r.get(e.name) } : null);
        }
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.importEmscriptenSymbolMap = n);
      },
      {},
    ],
    LsM4: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.ByteFormatter =
            exports.TimeFormatter =
            exports.RawValueFormatter =
              void 0);
        var t = require("./utils");
        class e {
          constructor() {
            this.unit = "none";
          }
          format(t) {
            return t.toLocaleString();
          }
        }
        exports.RawValueFormatter = e;
        class r {
          constructor(t) {
            (this.unit = t),
              (this.multiplier =
                "nanoseconds" === t
                  ? 1e-9
                  : "microseconds" === t
                  ? 1e-6
                  : "milliseconds" === t
                  ? 0.001
                  : 1);
          }
          formatUnsigned(e) {
            const r = e * this.multiplier;
            if (r / 60 >= 1) {
              const e = Math.floor(r / 60),
                o = Math.floor(r - 60 * e).toString();
              return `${e}:${(0, t.zeroPad)(o, 2)}`;
            }
            return r / 1 >= 1
              ? `${r.toFixed(2)}s`
              : r / 0.001 >= 1
              ? `${(r / 0.001).toFixed(2)}ms`
              : r / 1e-6 >= 1
              ? `${(r / 1e-6).toFixed(2)}µs`
              : `${(r / 1e-9).toFixed(2)}ns`;
          }
          format(t) {
            return `${t < 0 ? "-" : ""}${this.formatUnsigned(Math.abs(t))}`;
          }
        }
        exports.TimeFormatter = r;
        class o {
          constructor() {
            this.unit = "bytes";
          }
          format(t) {
            return t < 1024
              ? `${t.toFixed(0)} B`
              : (t /= 1024) < 1024
              ? `${t.toFixed(2)} KB`
              : (t /= 1024) < 1024
              ? `${t.toFixed(2)} MB`
              : `${(t /= 1024).toFixed(2)} GB`;
          }
        }
        exports.ByteFormatter = o;
      },
      { "./utils": "ucYa" },
    ],
    FheM: [
      function (require, module, exports) {
        var t = null;
        function e() {
          return t || (t = n()), t;
        }
        function n() {
          try {
            throw new Error();
          } catch (e) {
            var t = ("" + e.stack).match(
              /(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g
            );
            if (t) return r(t[0]);
          }
          return "/";
        }
        function r(t) {
          return (
            ("" + t).replace(
              /^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/,
              "$1"
            ) + "/"
          );
        }
        (exports.getBundleURL = e), (exports.getBaseURL = r);
      },
      {},
    ],
    TUK3: [
      function (require, module, exports) {
        var r = require("./bundle-url").getBundleURL;
        function e(r) {
          Array.isArray(r) || (r = [r]);
          var e = r[r.length - 1];
          try {
            return Promise.resolve(require(e));
          } catch (n) {
            if ("MODULE_NOT_FOUND" === n.code)
              return new s(function (n, i) {
                t(r.slice(0, -1))
                  .then(function () {
                    return require(e);
                  })
                  .then(n, i);
              });
            throw n;
          }
        }
        function t(r) {
          return Promise.all(r.map(u));
        }
        var n = {};
        function i(r, e) {
          n[r] = e;
        }
        (module.exports = exports = e),
          (exports.load = t),
          (exports.register = i);
        var o = {};
        function u(e) {
          var t;
          if ((Array.isArray(e) && ((t = e[1]), (e = e[0])), o[e])) return o[e];
          var i = (
              e.substring(e.lastIndexOf(".") + 1, e.length) || e
            ).toLowerCase(),
            u = n[i];
          return u
            ? (o[e] = u(r() + e)
                .then(function (r) {
                  return r && module.bundle.register(t, r), r;
                })
                .catch(function (r) {
                  throw (delete o[e], r);
                }))
            : void 0;
        }
        function s(r) {
          (this.executor = r), (this.promise = null);
        }
        (s.prototype.then = function (r, e) {
          return (
            null === this.promise &&
              (this.promise = new Promise(this.executor)),
            this.promise.then(r, e)
          );
        }),
          (s.prototype.catch = function (r) {
            return (
              null === this.promise &&
                (this.promise = new Promise(this.executor)),
              this.promise.catch(r)
            );
          });
      },
      { "./bundle-url": "FheM" },
    ],
    YG8z: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.CallTreeProfileBuilder =
            exports.StackListProfileBuilder =
            exports.Profile =
            exports.CallTreeNode =
            exports.Frame =
            exports.HasWeights =
              void 0);
        var e = require("./utils"),
          t = require("./value-formatters"),
          r = function (e, t, r, s) {
            return new (r || (r = Promise))(function (a, i) {
              function l(e) {
                try {
                  n(s.next(e));
                } catch (t) {
                  i(t);
                }
              }
              function o(e) {
                try {
                  n(s.throw(e));
                } catch (t) {
                  i(t);
                }
              }
              function n(e) {
                var t;
                e.done
                  ? a(e.value)
                  : ((t = e.value),
                    t instanceof r
                      ? t
                      : new r(function (e) {
                          e(t);
                        })).then(l, o);
              }
              n((s = s.apply(e, t || [])).next());
            });
          };
        const s = require("_bundle_loader")(require.resolve("./demangle-cpp"));
        class a {
          constructor() {
            (this.selfWeight = 0), (this.totalWeight = 0);
          }
          getSelfWeight() {
            return this.selfWeight;
          }
          getTotalWeight() {
            return this.totalWeight;
          }
          addToTotalWeight(e) {
            this.totalWeight += e;
          }
          addToSelfWeight(e) {
            this.selfWeight += e;
          }
          overwriteWeightWith(e) {
            (this.selfWeight = e.selfWeight),
              (this.totalWeight = e.totalWeight);
          }
        }
        exports.HasWeights = a;
        let i = (() => {
          class e extends a {
            constructor(e) {
              super(),
                (this.key = e.key),
                (this.name = e.name),
                (this.file = e.file),
                (this.line = e.line),
                (this.col = e.col);
            }
            static getOrInsert(t, r) {
              return t.getOrInsert(new e(r));
            }
          }
          return (
            (e.root = new e({
              key: "(speedscope root)",
              name: "(speedscope root)",
            })),
            e
          );
        })();
        exports.Frame = i;
        class l extends a {
          constructor(e, t) {
            super(),
              (this.frame = e),
              (this.parent = t),
              (this.children = []),
              (this.frozen = !1);
          }
          isRoot() {
            return this.frame === i.root;
          }
          isFrozen() {
            return this.frozen;
          }
          freeze() {
            this.frozen = !0;
          }
        }
        exports.CallTreeNode = l;
        class o {
          constructor(r = 0) {
            (this.name = ""),
              (this.frames = new e.KeyedSet()),
              (this.appendOrderCalltreeRoot = new l(i.root, null)),
              (this.groupedCalltreeRoot = new l(i.root, null)),
              (this.samples = []),
              (this.weights = []),
              (this.valueFormatter = new t.RawValueFormatter()),
              (this.totalNonIdleWeight = null),
              (this.totalWeight = r);
          }
          getAppendOrderCalltreeRoot() {
            return this.appendOrderCalltreeRoot;
          }
          getGroupedCalltreeRoot() {
            return this.groupedCalltreeRoot;
          }
          shallowClone() {
            const e = new o(this.totalWeight);
            return Object.assign(e, this), e;
          }
          formatValue(e) {
            return this.valueFormatter.format(e);
          }
          setValueFormatter(e) {
            this.valueFormatter = e;
          }
          getWeightUnit() {
            return this.valueFormatter.unit;
          }
          getName() {
            return this.name;
          }
          setName(e) {
            this.name = e;
          }
          getTotalWeight() {
            return this.totalWeight;
          }
          getTotalNonIdleWeight() {
            return (
              null === this.totalNonIdleWeight &&
                (this.totalNonIdleWeight =
                  this.groupedCalltreeRoot.children.reduce(
                    (e, t) => e + t.getTotalWeight(),
                    0
                  )),
              this.totalNonIdleWeight
            );
          }
          sortGroupedCallTree() {
            !(function e(t) {
              t.children.sort(
                (e, t) => -(e.getTotalWeight() - t.getTotalWeight())
              ),
                t.children.forEach(e);
            })(this.groupedCalltreeRoot);
          }
          forEachCallGrouped(e, t) {
            !(function r(s, a) {
              s.frame !== i.root && e(s, a);
              let l = 0;
              s.children.forEach(function (e) {
                r(e, a + l), (l += e.getTotalWeight());
              }),
                s.frame !== i.root && t(s, a + s.getTotalWeight());
            })(this.groupedCalltreeRoot, 0);
          }
          forEachCall(t, r) {
            let s = [],
              a = 0,
              l = 0;
            for (let o of this.samples) {
              let n = null;
              for (
                n = o;
                n && n.frame != i.root && -1 === s.indexOf(n);
                n = n.parent
              );
              for (; s.length > 0 && (0, e.lastOf)(s) != n; ) {
                r(s.pop(), a);
              }
              const h = [];
              for (let e = o; e && e.frame != i.root && e != n; e = e.parent)
                h.push(e);
              h.reverse();
              for (let e of h) t(e, a);
              (s = s.concat(h)), (a += this.weights[l++]);
            }
            for (let e = s.length - 1; e >= 0; e--) r(s[e], a);
          }
          forEachFrame(e) {
            this.frames.forEach(e);
          }
          getProfileWithRecursionFlattened() {
            const e = new h(),
              t = [],
              r = new Set();
            this.forEachCall(
              function (s, a) {
                r.has(s.frame)
                  ? t.push(null)
                  : (r.add(s.frame), t.push(s), e.enterFrame(s.frame, a));
              },
              function (s, a) {
                const i = t.pop();
                i && (r.delete(i.frame), e.leaveFrame(i.frame, a));
              }
            );
            const s = e.build();
            return (
              (s.name = this.name),
              (s.valueFormatter = this.valueFormatter),
              this.forEachFrame((e) => {
                s.frames.getOrInsert(e).overwriteWeightWith(e);
              }),
              s
            );
          }
          getInvertedProfileForCallersOf(e) {
            const t = i.getOrInsert(this.frames, e),
              r = new n(),
              s = [];
            !(function e(r) {
              if (r.frame === t) s.push(r);
              else for (let t of r.children) e(t);
            })(this.appendOrderCalltreeRoot);
            for (let l of s) {
              const e = [];
              for (let t = l; null != t && t.frame !== i.root; t = t.parent)
                e.push(t.frame);
              r.appendSampleWithWeight(e, l.getTotalWeight());
            }
            const a = r.build();
            return (
              (a.name = this.name), (a.valueFormatter = this.valueFormatter), a
            );
          }
          getProfileForCalleesOf(e) {
            const t = i.getOrInsert(this.frames, e),
              r = new n();
            !(function e(s) {
              if (s.frame === t)
                !(function (e) {
                  const t = [];
                  !(function e(s) {
                    t.push(s.frame),
                      r.appendSampleWithWeight(t, s.getSelfWeight());
                    for (let t of s.children) e(t);
                    t.pop();
                  })(e);
                })(s);
              else for (let t of s.children) e(t);
            })(this.appendOrderCalltreeRoot);
            const s = r.build();
            return (
              (s.name = this.name), (s.valueFormatter = this.valueFormatter), s
            );
          }
          demangle() {
            return r(this, void 0, void 0, function* () {
              let e = null;
              for (let t of this.frames)
                t.name.startsWith("__Z") &&
                  (e || (e = (yield s).demangleCpp), (t.name = e(t.name)));
            });
          }
          remapSymbols(e) {
            for (let t of this.frames) {
              const r = e(t);
              if (null == r) continue;
              const { name: s, file: a, line: i, col: l } = r;
              null != s && (t.name = s),
                null != a && (t.file = a),
                null != i && (t.line = i),
                null != l && (t.col = l);
            }
          }
        }
        exports.Profile = o;
        class n extends o {
          constructor() {
            super(...arguments), (this.pendingSample = null);
          }
          _appendSample(t, r, s) {
            if (isNaN(r)) throw new Error("invalid weight");
            let a = s ? this.appendOrderCalltreeRoot : this.groupedCalltreeRoot,
              o = new Set();
            for (let n of t) {
              const t = i.getOrInsert(this.frames, n),
                h = s
                  ? (0, e.lastOf)(a.children)
                  : a.children.find((e) => e.frame === t);
              if (h && !h.isFrozen() && h.frame == t) a = h;
              else {
                const e = a;
                (a = new l(t, a)), e.children.push(a);
              }
              a.addToTotalWeight(r), o.add(a.frame);
            }
            if ((a.addToSelfWeight(r), s)) for (let e of a.children) e.freeze();
            if (s) {
              a.frame.addToSelfWeight(r);
              for (let e of o) e.addToTotalWeight(r);
              a === (0, e.lastOf)(this.samples)
                ? (this.weights[this.weights.length - 1] += r)
                : (this.samples.push(a), this.weights.push(r));
            }
          }
          appendSampleWithWeight(e, t) {
            if (0 !== t) {
              if (t < 0) throw new Error("Samples must have positive weights");
              this._appendSample(e, t, !0), this._appendSample(e, t, !1);
            }
          }
          appendSampleWithTimestamp(e, t) {
            if (this.pendingSample) {
              if (t < this.pendingSample.centralTimestamp)
                throw new Error("Timestamps received out of order");
              const r = (t + this.pendingSample.centralTimestamp) / 2;
              this.appendSampleWithWeight(
                this.pendingSample.stack,
                r - this.pendingSample.startTimestamp
              ),
                (this.pendingSample = {
                  stack: e,
                  startTimestamp: r,
                  centralTimestamp: t,
                });
            } else
              this.pendingSample = {
                stack: e,
                startTimestamp: t,
                centralTimestamp: t,
              };
          }
          build() {
            return (
              this.pendingSample &&
                (this.samples.length > 0
                  ? this.appendSampleWithWeight(
                      this.pendingSample.stack,
                      this.pendingSample.centralTimestamp -
                        this.pendingSample.startTimestamp
                    )
                  : (this.appendSampleWithWeight(this.pendingSample.stack, 1),
                    this.setValueFormatter(new t.RawValueFormatter()))),
              (this.totalWeight = Math.max(
                this.totalWeight,
                this.weights.reduce((e, t) => e + t, 0)
              )),
              this.sortGroupedCallTree(),
              this
            );
          }
        }
        exports.StackListProfileBuilder = n;
        class h extends o {
          constructor() {
            super(...arguments),
              (this.appendOrderStack = [this.appendOrderCalltreeRoot]),
              (this.groupedOrderStack = [this.groupedCalltreeRoot]),
              (this.framesInStack = new Map()),
              (this.stack = []),
              (this.lastValue = 0);
          }
          addWeightsToFrames(t) {
            const r = t - this.lastValue;
            for (let e of this.framesInStack.keys()) e.addToTotalWeight(r);
            const s = (0, e.lastOf)(this.stack);
            s && s.addToSelfWeight(r);
          }
          addWeightsToNodes(t, r) {
            const s = t - this.lastValue;
            for (let e of r) e.addToTotalWeight(s);
            const a = (0, e.lastOf)(r);
            a && a.addToSelfWeight(s);
          }
          _enterFrame(t, r, s) {
            let a = s ? this.appendOrderStack : this.groupedOrderStack;
            this.addWeightsToNodes(r, a);
            let i = (0, e.lastOf)(a);
            if (i) {
              if (s) {
                const e = r - this.lastValue;
                if (e > 0)
                  this.samples.push(i), this.weights.push(r - this.lastValue);
                else if (e < 0)
                  throw new Error(
                    `Samples must be provided in increasing order of cumulative value. Last sample was ${this.lastValue}, this sample was ${r}`
                  );
              }
              const o = s
                ? (0, e.lastOf)(i.children)
                : i.children.find((e) => e.frame === t);
              let n;
              o && !o.isFrozen() && o.frame == t
                ? (n = o)
                : ((n = new l(t, i)), i.children.push(n)),
                a.push(n);
            }
          }
          enterFrame(e, t) {
            const r = i.getOrInsert(this.frames, e);
            this.addWeightsToFrames(t),
              this._enterFrame(r, t, !0),
              this._enterFrame(r, t, !1),
              this.stack.push(r);
            const s = this.framesInStack.get(r) || 0;
            this.framesInStack.set(r, s + 1),
              (this.lastValue = t),
              (this.totalWeight = Math.max(this.totalWeight, this.lastValue));
          }
          _leaveFrame(e, t, r) {
            let s = r ? this.appendOrderStack : this.groupedOrderStack;
            if ((this.addWeightsToNodes(t, s), r)) {
              const r = this.appendOrderStack.pop();
              if (null == r)
                throw new Error(`Trying to leave ${e.key} when stack is empty`);
              if (null == this.lastValue)
                throw new Error(
                  `Trying to leave a ${e.key} before any have been entered`
                );
              if ((r.freeze(), r.frame.key !== e.key))
                throw new Error(
                  `Tried to leave frame "${e.name}" while frame "${r.frame.name}" was at the top at ${t}`
                );
              const s = t - this.lastValue;
              if (s > 0)
                this.samples.push(r), this.weights.push(t - this.lastValue);
              else if (s < 0)
                throw new Error(
                  `Samples must be provided in increasing order of cumulative value. Last sample was ${this.lastValue}, this sample was ${t}`
                );
            } else this.groupedOrderStack.pop();
          }
          leaveFrame(e, t) {
            const r = i.getOrInsert(this.frames, e);
            this.addWeightsToFrames(t),
              this._leaveFrame(r, t, !0),
              this._leaveFrame(r, t, !1),
              this.stack.pop();
            const s = this.framesInStack.get(r);
            null != s &&
              (1 === s
                ? this.framesInStack.delete(r)
                : this.framesInStack.set(r, s - 1),
              (this.lastValue = t),
              (this.totalWeight = Math.max(this.totalWeight, this.lastValue)));
          }
          build() {
            if (
              this.appendOrderStack.length > 1 ||
              this.groupedOrderStack.length > 1
            )
              throw new Error(
                "Tried to complete profile construction with a non-empty stack"
              );
            return this.sortGroupedCallTree(), this;
          }
        }
        exports.CallTreeProfileBuilder = h;
      },
      {
        "./utils": "ucYa",
        "./value-formatters": "LsM4",
        _bundle_loader: "TUK3",
        "./demangle-cpp": [
          ["demangle-cpp.1768f4cc.js", "bS28"],
          "demangle-cpp.1768f4cc.js.map",
          "bS28",
        ],
      },
    ],
    x8nU: [
      function (require, module, exports) {
        "use strict";
        var e;
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.FileFormat = void 0),
          (exports.FileFormat = e),
          (function (e) {
            let t, o;
            !(function (e) {
              (e.EVENTED = "evented"), (e.SAMPLED = "sampled");
            })((t = e.ProfileType || (e.ProfileType = {}))),
              (function (e) {
                (e.OPEN_FRAME = "O"), (e.CLOSE_FRAME = "C");
              })((o = e.EventType || (e.EventType = {})));
          })(e || (exports.FileFormat = e = {}));
      },
      {},
    ],
    EHrm: [
      function (require, module, exports) {
        module.exports = {
          name: "speedscope",
          version: "1.12.1",
          description: "",
          repository: "jlfwong/speedscope",
          main: "index.js",
          bin: { speedscope: "./bin/cli.js" },
          scripts: {
            deploy: "./scripts/deploy.sh",
            prepack: "./scripts/build-release.sh",
            prettier: "prettier --write 'src/**/*.ts' 'src/**/*.tsx'",
            lint: "eslint 'src/**/*.ts' 'src/**/*.tsx'",
            jest: "./scripts/test-setup.sh && jest --runInBand",
            coverage: "npm run jest -- --coverage",
            typecheck: "tsc --noEmit",
            test: "./scripts/ci.sh",
            serve: "parcel assets/index.html --open --no-autoinstall",
          },
          files: ["bin/cli.js", "dist/release/**", "!*.map"],
          browserslist: ["last 2 Chrome versions", "last 2 Firefox versions"],
          author: "",
          license: "MIT",
          devDependencies: {
            "@types/jest": "22.2.3",
            "@types/jszip": "3.1.4",
            "@types/node": "14.0.1",
            "@types/pako": "1.0.0",
            "@typescript-eslint/eslint-plugin": "2.33.0",
            "@typescript-eslint/parser": "2.33.0",
            acorn: "7.2.0",
            aphrodite: "2.1.0",
            eslint: "6.0.0",
            "eslint-plugin-prettier": "2.6.0",
            "eslint-plugin-react-hooks": "4.0.2",
            jest: "24.3.0",
            jsverify: "0.8.3",
            jszip: "3.1.5",
            pako: "1.0.6",
            "parcel-bundler": "1.12.4",
            preact: "10.4.1",
            prettier: "2.0.4",
            protobufjs: "6.8.8",
            redux: "^4.0.5",
            "source-map": "0.6.1",
            "ts-jest": "24.3.0",
            typescript: "3.9.2",
            "typescript-eslint-parser": "17.0.1",
            "typescript-json-schema": "0.42.0",
            "uglify-es": "3.2.2",
          },
          jest: {
            transform: { "^.+\\.tsx?$": "ts-jest" },
            setupFilesAfterEnv: ["./src/jest-setup.js"],
            testRegex: "\\.test\\.tsx?$",
            collectCoverageFrom: ["**/*.{ts,tsx}", "!**/*.d.{ts,tsx}"],
            moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
          },
          dependencies: { open: "7.2.0" },
        };
      },
      {},
    ],
    Xzb6: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.exportProfileGroup = r),
          (exports.importSpeedscopeProfiles = s),
          (exports.saveToFile = l);
        var e = require("./profile"),
          t = require("./value-formatters"),
          n = require("./file-format-spec");
        function r(e) {
          const t = [],
            n = new Map();
          function r(e) {
            let r = n.get(e);
            if (null == r) {
              const o = { name: e.name };
              null != e.file && (o.file = e.file),
                null != e.line && (o.line = e.line),
                null != e.col && (o.col = e.col),
                (r = t.length),
                n.set(e, r),
                t.push(o);
            }
            return r;
          }
          const a = {
            exporter: `speedscope@${require("../../package.json").version}`,
            name: e.name,
            activeProfileIndex: e.indexToView,
            $schema: "https://www.speedscope.app/file-format-schema.json",
            shared: { frames: t },
            profiles: [],
          };
          for (let s of e.profiles) a.profiles.push(o(s, r));
          return a;
        }
        function o(e, t) {
          const r = {
            type: n.FileFormat.ProfileType.EVENTED,
            name: e.getName(),
            unit: e.getWeightUnit(),
            startValue: 0,
            endValue: e.getTotalWeight(),
            events: [],
          };
          return (
            e.forEachCall(
              (e, o) => {
                r.events.push({
                  type: n.FileFormat.EventType.OPEN_FRAME,
                  frame: t(e.frame),
                  at: o,
                });
              },
              (e, o) => {
                r.events.push({
                  type: n.FileFormat.EventType.CLOSE_FRAME,
                  frame: t(e.frame),
                  at: o,
                });
              }
            ),
            r
          );
        }
        function a(r, o) {
          function a(e) {
            const { name: n, unit: o } = r;
            switch (o) {
              case "nanoseconds":
              case "microseconds":
              case "milliseconds":
              case "seconds":
                e.setValueFormatter(new t.TimeFormatter(o));
                break;
              case "bytes":
                e.setValueFormatter(new t.ByteFormatter());
                break;
              case "none":
                e.setValueFormatter(new t.RawValueFormatter());
            }
            e.setName(n);
          }
          switch (r.type) {
            case n.FileFormat.ProfileType.EVENTED:
              return (function (t) {
                const { startValue: r, endValue: s, events: l } = t,
                  i = new e.CallTreeProfileBuilder(s - r);
                a(i);
                const c = o.map((e, t) => Object.assign({ key: t }, e));
                for (let e of l)
                  switch (e.type) {
                    case n.FileFormat.EventType.OPEN_FRAME:
                      i.enterFrame(c[e.frame], e.at - r);
                      break;
                    case n.FileFormat.EventType.CLOSE_FRAME:
                      i.leaveFrame(c[e.frame], e.at - r);
                  }
                return i.build();
              })(r);
            case n.FileFormat.ProfileType.SAMPLED:
              return (function (t) {
                const {
                    startValue: n,
                    endValue: r,
                    samples: s,
                    weights: l,
                  } = t,
                  i = new e.StackListProfileBuilder(r - n);
                a(i);
                const c = o.map((e, t) => Object.assign({ key: t }, e));
                if (s.length !== l.length)
                  throw new Error(
                    `Expected samples.length (${s.length}) to equal weights.length (${l.length})`
                  );
                for (let e = 0; e < s.length; e++) {
                  const t = s[e],
                    n = l[e];
                  i.appendSampleWithWeight(
                    t.map((e) => c[e]),
                    n
                  );
                }
                return i.build();
              })(r);
          }
        }
        function s(e) {
          return {
            name: e.name || e.profiles[0].name || "profile",
            indexToView: e.activeProfileIndex || 0,
            profiles: e.profiles.map((t) => a(t, e.shared.frames)),
          };
        }
        function l(e) {
          const t = r(e),
            n = new Blob([JSON.stringify(t)], { type: "text/json" }),
            o = `${(t.name ? t.name.split(".")[0] : "profile").replace(
              /\W+/g,
              "_"
            )}.speedscope.json`;
          console.log("Saving", o);
          const a = document.createElement("a");
          (a.download = o),
            (a.href = window.URL.createObjectURL(n)),
            (a.dataset.downloadurl = ["text/json", a.download, a.href].join(
              ":"
            )),
            document.body.appendChild(a),
            a.click(),
            document.body.removeChild(a);
        }
      },
      {
        "./profile": "YG8z",
        "./value-formatters": "LsM4",
        "./file-format-spec": "x8nU",
        "../../package.json": "EHrm",
      },
    ],
    tOar: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.ProfileSelectRow = a),
          (exports.ProfileSelect = u);
        var e = require("preact"),
          o = require("preact/hooks"),
          r = require("aphrodite"),
          l = require("./style"),
          t = require("../lib/fuzzy-find"),
          i = require("../lib/utils"),
          n = require("./themes/theme");
        function s(o, r, l) {
          const t = [];
          let i = 0;
          for (let n of r)
            t.push(o.slice(i, n[0])),
              t.push((0, e.h)("span", { className: l }, o.slice(n[0], n[1]))),
              (i = n[1]);
          return t.push(o.slice(i)), (0, e.h)("span", null, t);
        }
        function a({
          setProfileIndexToView: l,
          setHoveredProfileIndex: t,
          profile: i,
          selected: a,
          hovered: c,
          profileCount: d,
          nodeRef: u,
          closeProfileSelect: p,
          indexInProfileGroup: h,
          matchedRanges: g,
          indexInFilteredListView: m,
        }) {
          const b = f((0, n.useTheme)()),
            x = (0, o.useCallback)(() => {
              p(), l(h);
            }, [p, l, h]),
            I = (0, o.useCallback)(
              (e) => {
                t(h);
              },
              [t, h]
            ),
            P = i.getName(),
            w = 1 + Math.floor(Math.log10(d)),
            y = (0, r.css)(b.highlighted),
            S = (0, o.useMemo)(() => {
              return s(P, g, y);
            }, [P, g, y]);
          return (0, e.h)(
            "div",
            {
              ref: u,
              onMouseUp: x,
              onMouseEnter: I,
              title: P,
              className: (0, r.css)(
                b.profileRow,
                m % 2 == 0 && b.profileRowEven,
                a && b.profileRowSelected,
                c && b.profileRowHovered
              ),
            },
            (0, e.h)(
              "span",
              {
                className: (0, r.css)(
                  b.profileIndex,
                  a && b.profileIndexSelected
                ),
                style: { width: w + "em" },
              },
              h + 1,
              ":"
            ),
            " ",
            S
          );
        }
        function c(e) {
          e.stopPropagation();
        }
        function d(e, o) {
          const r = [];
          for (let l = 0; l < e.length; l++) {
            const i = e[l],
              n = (0, t.fuzzyMatchStrings)(i.getName(), o);
            n &&
              r.push(Object.assign({ indexInProfileGroup: l, profile: i }, n));
          }
          return (0, i.sortBy)(r, (e) => -e.score), r;
        }
        function u({
          profiles: l,
          closeProfileSelect: t,
          indexToView: i,
          visible: s,
          setProfileIndexToView: u,
        }) {
          const p = f((0, n.useTheme)()),
            [h, g] = (0, o.useState)(""),
            m = (0, o.useCallback)(
              (e) => {
                const o = e.target.value;
                g(o);
              },
              [g]
            ),
            b = (0, o.useCallback)(
              (e) => {
                e && (s ? e.select() : e.blur());
              },
              [s]
            ),
            x = (0, o.useMemo)(() => d(l, h), [l, h]),
            [I, P] = (0, o.useState)(0),
            w = (0, o.useRef)(null);
          (0, o.useEffect)(() => {
            s &&
              (P(null),
              null !== w.current &&
                w.current.scrollIntoView({
                  behavior: "auto",
                  block: "nearest",
                  inline: "nearest",
                }));
          }, [s]);
          const y = (0, o.useCallback)(
              (e) => {
                e.stopPropagation();
                let o = null;
                switch (e.key) {
                  case "Enter":
                    null != I && (t(), u(I));
                    break;
                  case "Escape":
                    t();
                    break;
                  case "ArrowDown":
                    if ((e.preventDefault(), (o = 0), null != I)) {
                      const e = x.findIndex((e) => e.indexInProfileGroup === I);
                      -1 !== e && (o = e + 1);
                    }
                    break;
                  case "ArrowUp":
                    if ((e.preventDefault(), (o = x.length - 1), null != I)) {
                      const e = x.findIndex((e) => e.indexInProfileGroup === I);
                      -1 !== e && (o = e - 1);
                    }
                }
                if (null != o && o >= 0 && o < x.length) {
                  const e = x[o].indexInProfileGroup;
                  P(e), v(!0);
                }
              },
              [t, u, I, x]
            ),
            [S, v] = (0, o.useState)(!1);
          (0, o.useEffect)(() => {
            x.length > 0 && (P(x[0].indexInProfileGroup), v(!0));
          }, [P, x]);
          const C = (0, o.useCallback)(
              (e) => {
                S &&
                  e &&
                  (e.scrollIntoView({
                    behavior: "auto",
                    block: "nearest",
                    inline: "nearest",
                  }),
                  v(!1));
              },
              [S, v]
            ),
            k = (0, o.useCallback)(
              (e) => {
                (w.current = e), C(e);
              },
              [w, C]
            );
          return (0, e.h)(
            "div",
            { className: (0, r.css)(p.profileSelectOuter) },
            (0, e.h)("div", { className: (0, r.css)(p.caret) }),
            (0, e.h)(
              "div",
              { className: (0, r.css)(p.profileSelectBox) },
              (0, e.h)(
                "div",
                { className: (0, r.css)(p.filterInputContainer) },
                (0, e.h)("input", {
                  type: "text",
                  className: (0, r.css)(p.filterInput),
                  ref: b,
                  placeholder: "Filter...",
                  value: h,
                  onInput: m,
                  onKeyDown: y,
                  onKeyUp: c,
                  onKeyPress: c,
                })
              ),
              (0, e.h)(
                "div",
                { className: (0, r.css)(p.profileSelectScrolling) },
                x.map(
                  (
                    { profile: o, matchedRanges: r, indexInProfileGroup: n },
                    s
                  ) => {
                    let c = void 0;
                    const d = n === i,
                      p = n === I;
                    return (
                      d && p ? (c = k) : d ? (c = w) : p && (c = C),
                      (0, e.h)(a, {
                        setHoveredProfileIndex: P,
                        indexInProfileGroup: n,
                        indexInFilteredListView: s,
                        hovered: n == I,
                        selected: n === i,
                        profile: o,
                        profileCount: l.length,
                        nodeRef: c,
                        matchedRanges: r,
                        setProfileIndexToView: u,
                        closeProfileSelect: t,
                      })
                    );
                  }
                ),
                0 === x.length
                  ? (0, e.h)(
                      "div",
                      { className: (0, r.css)(p.profileRow) },
                      'No results match filter "',
                      h,
                      '"'
                    )
                  : null
              )
            )
          );
        }
        const p = 10,
          f = (0, n.withTheme)((e) =>
            r.StyleSheet.create({
              filterInputContainer: {
                display: "flex",
                flexDirection: "column",
                padding: 5,
                alignItems: "stretch",
              },
              filterInput: {
                color: e.altFgPrimaryColor,
                background: e.altBgSecondaryColor,
                borderRadius: 5,
                padding: 5,
                ":focus": { border: "none", outline: "none" },
                "::selection": {
                  color: e.altFgPrimaryColor,
                  background: e.selectionPrimaryColor,
                },
              },
              caret: {
                width: 0,
                height: 0,
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderBottom: "5px solid black",
              },
              highlighted: { background: e.selectionSecondaryColor },
              padding: { height: 10, background: e.altBgPrimaryColor },
              profileRow: {
                height: l.Sizes.FRAME_HEIGHT - 2,
                border: "1px solid transparent",
                textAlign: "left",
                paddingLeft: 10,
                paddingRight: 10,
                background: e.altBgPrimaryColor,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                cursor: "pointer",
              },
              profileRowHovered: {
                border: `1px solid ${e.selectionPrimaryColor}`,
              },
              profileRowSelected: { background: e.selectionPrimaryColor },
              profileRowEven: { background: e.altBgSecondaryColor },
              profileSelectScrolling: {
                maxHeight: `min(calc(100vh - ${
                  l.Sizes.TOOLBAR_HEIGHT - 20
                }px), ${20 * l.Sizes.FRAME_HEIGHT}px)`,
                overflow: "auto",
                "::-webkit-scrollbar": { background: e.altBgPrimaryColor },
                "::-webkit-scrollbar-thumb": {
                  background: e.altFgSecondaryColor,
                  borderRadius: 20,
                  border: `3px solid ${e.altBgPrimaryColor}`,
                  ":hover": { background: e.altBgPrimaryColor },
                },
              },
              profileSelectBox: {
                width: "100%",
                paddingBottom: 10,
                background: e.altBgPrimaryColor,
                color: e.altFgPrimaryColor,
              },
              profileSelectOuter: {
                width: "100%",
                maxWidth: 480,
                margin: "0 auto",
                position: "relative",
                zIndex: l.ZIndex.PROFILE_SELECT,
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              },
              profileIndex: {
                textAlign: "right",
                display: "inline-block",
                color: e.altFgSecondaryColor,
              },
              profileIndexSelected: { color: e.altFgPrimaryColor },
            })
          );
      },
      {
        preact: "aSor",
        "preact/hooks": "MwGB",
        aphrodite: "CxN7",
        "./style": "hvr4",
        "../lib/fuzzy-find": "C6HJ",
        "../lib/utils": "ucYa",
        "./themes/theme": "gzKG",
      },
    ],
    BPHY: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.Toolbar = p);
        var e = require("../store"),
          o = require("preact"),
          t = require("preact/hooks"),
          i = require("aphrodite"),
          s = require("./style"),
          l = require("./profile-select"),
          r = require("../lib/utils"),
          a = require("./themes/theme"),
          n = require("../lib/preact-redux"),
          c = require("../store/actions");
        function h(e, o) {
          return (0, t.useCallback)(() => e(o), [e, o]);
        }
        function d(t) {
          const s = g((0, a.useTheme)()),
            l = h(t.setViewMode, e.ViewMode.CHRONO_FLAME_CHART),
            r = h(t.setViewMode, e.ViewMode.LEFT_HEAVY_FLAME_GRAPH),
            n = h(t.setViewMode, e.ViewMode.SANDWICH_VIEW);
          return t.activeProfileState
            ? (0, o.h)(
                "div",
                { className: (0, i.css)(s.toolbarLeft) },
                (0, o.h)(
                  "div",
                  {
                    className: (0, i.css)(
                      s.toolbarTab,
                      t.viewMode === e.ViewMode.CHRONO_FLAME_CHART &&
                        s.toolbarTabActive
                    ),
                    onClick: l,
                  },
                  (0, o.h)("span", { className: (0, i.css)(s.emoji) }, "🕰"),
                  "Time Order"
                ),
                (0, o.h)(
                  "div",
                  {
                    className: (0, i.css)(
                      s.toolbarTab,
                      t.viewMode === e.ViewMode.LEFT_HEAVY_FLAME_GRAPH &&
                        s.toolbarTabActive
                    ),
                    onClick: r,
                  },
                  (0, o.h)("span", { className: (0, i.css)(s.emoji) }, "⬅️"),
                  "Left Heavy"
                ),
                (0, o.h)(
                  "div",
                  {
                    className: (0, i.css)(
                      s.toolbarTab,
                      t.viewMode === e.ViewMode.SANDWICH_VIEW &&
                        s.toolbarTabActive
                    ),
                    onClick: n,
                  },
                  (0, o.h)("span", { className: (0, i.css)(s.emoji) }, "🥪"),
                  "Sandwich"
                )
              )
            : null;
        }
        const m = (() => {
          let e = null;
          return (o) => {
            let t =
              (null == o ? void 0 : o.profiles.map((e) => e.profile)) || null;
            return (
              (null === e ||
                (null != t && !(0, r.objectsHaveShallowEquality)(e, t))) &&
                (e = t),
              e
            );
          };
        })();
        function u(e) {
          const s = g((0, a.useTheme)()),
            { activeProfileState: r, profileGroup: n } = e,
            c = m(n),
            [h, d] = (0, t.useState)(!1),
            u = (0, t.useCallback)(() => {
              d(!0);
            }, [d]),
            b = (0, t.useCallback)(() => {
              d(!1);
            }, [d]);
          return (
            (0, t.useEffect)(() => {
              const e = (e) => {
                "t" === e.key && (e.preventDefault(), d(!0));
              };
              return (
                window.addEventListener("keypress", e),
                () => {
                  window.removeEventListener("keypress", e);
                }
              );
            }, [d]),
            (0, t.useEffect)(() => {
              const e = (e) => {
                "t" === e.key && (e.preventDefault(), d(!0));
              };
              return (
                window.addEventListener("keypress", e),
                () => {
                  window.removeEventListener("keypress", e);
                }
              );
            }, [d]),
            r && n && c
              ? 1 === n.profiles.length
                ? (0, o.h)(o.Fragment, null, r.profile.getName())
                : (0, o.h)(
                    "div",
                    { className: (0, i.css)(s.toolbarCenter), onMouseLeave: b },
                    (0, o.h)(
                      "span",
                      { onMouseOver: u },
                      r.profile.getName(),
                      " ",
                      (0, o.h)(
                        "span",
                        { className: (0, i.css)(s.toolbarProfileIndex) },
                        "(",
                        r.index + 1,
                        "/",
                        n.profiles.length,
                        ")"
                      )
                    ),
                    (0, o.h)(
                      "div",
                      { style: { display: h ? "block" : "none" } },
                      (0, o.h)(l.ProfileSelect, {
                        setProfileIndexToView: e.setProfileIndexToView,
                        indexToView: n.indexToView,
                        profiles: c,
                        closeProfileSelect: b,
                        visible: h,
                      })
                    )
                  )
              : (0, o.h)(o.Fragment, null, "🔬speedscope")
          );
        }
        function b(t) {
          const s = g((0, a.useTheme)()),
            l = (0, e.useAppSelector)((e) => e.colorScheme, []),
            r = (0, o.h)(
              "div",
              { className: (0, i.css)(s.toolbarTab), onClick: t.saveFile },
              (0, o.h)("span", { className: (0, i.css)(s.emoji) }, "⤴️"),
              "Export"
            ),
            h = (0, o.h)(
              "div",
              { className: (0, i.css)(s.toolbarTab), onClick: t.browseForFile },
              (0, o.h)("span", { className: (0, i.css)(s.emoji) }, "⤵️"),
              "Import"
            ),
            d = (0, n.useActionCreator)(
              () => c.actions.setColorScheme((0, a.nextColorScheme)(l)),
              [l]
            ),
            m = (0, o.h)(
              "div",
              { className: (0, i.css)(s.toolbarTab), onClick: d },
              (0, o.h)("span", { className: (0, i.css)(s.emoji) }, "🎨"),
              (0, o.h)(
                "span",
                { className: (0, i.css)(s.toolbarTabColorSchemeToggle) },
                (0, a.colorSchemeToString)(l)
              )
            ),
            u = (0, o.h)(
              "div",
              { className: (0, i.css)(s.toolbarTab) },
              (0, o.h)(
                "a",
                {
                  href: "https://github.com/jlfwong/speedscope#usage",
                  className: (0, i.css)(s.noLinkStyle),
                  target: "_blank",
                },
                (0, o.h)("span", { className: (0, i.css)(s.emoji) }, "❓"),
                "Help"
              )
            );
          return (0, o.h)(
            "div",
            { className: (0, i.css)(s.toolbarRight) },
            t.activeProfileState && r,
            h,
            m,
            u
          );
        }
        function p(e) {
          const t = g((0, a.useTheme)());
          return (0, o.h)(
            "div",
            { className: (0, i.css)(t.toolbar) },
            (0, o.h)(d, Object.assign({}, e)),
            (0, o.h)(u, Object.assign({}, e)),
            (0, o.h)(b, Object.assign({}, e))
          );
        }
        const g = (0, a.withTheme)((e) =>
          i.StyleSheet.create({
            toolbar: {
              height: s.Sizes.TOOLBAR_HEIGHT,
              flexShrink: 0,
              background: e.altBgPrimaryColor,
              color: e.altFgPrimaryColor,
              textAlign: "center",
              fontFamily: s.FontFamily.MONOSPACE,
              fontSize: s.FontSize.TITLE,
              lineHeight: `${s.Sizes.TOOLBAR_TAB_HEIGHT}px`,
              userSelect: "none",
            },
            toolbarLeft: {
              position: "absolute",
              height: s.Sizes.TOOLBAR_HEIGHT,
              overflow: "hidden",
              top: 0,
              left: 0,
              marginRight: 2,
              textAlign: "left",
            },
            toolbarCenter: { paddingTop: 1, height: s.Sizes.TOOLBAR_HEIGHT },
            toolbarRight: {
              height: s.Sizes.TOOLBAR_HEIGHT,
              overflow: "hidden",
              position: "absolute",
              top: 0,
              right: 0,
              marginRight: 2,
              textAlign: "right",
            },
            toolbarProfileIndex: { color: e.altFgSecondaryColor },
            toolbarTab: {
              background: e.altBgSecondaryColor,
              marginTop: s.Sizes.SEPARATOR_HEIGHT,
              height: s.Sizes.TOOLBAR_TAB_HEIGHT,
              lineHeight: `${s.Sizes.TOOLBAR_TAB_HEIGHT}px`,
              paddingLeft: 2,
              paddingRight: 8,
              display: "inline-block",
              marginLeft: 2,
              transition: `all ${s.Duration.HOVER_CHANGE} ease-in`,
              ":hover": { background: e.selectionSecondaryColor },
            },
            toolbarTabActive: {
              background: e.selectionPrimaryColor,
              ":hover": { background: e.selectionPrimaryColor },
            },
            toolbarTabColorSchemeToggle: {
              display: "inline-block",
              textAlign: "center",
              minWidth: "50px",
            },
            emoji: {
              display: "inline-block",
              verticalAlign: "middle",
              paddingTop: "0px",
              marginRight: "0.3em",
            },
            noLinkStyle: { textDecoration: "none", color: "inherit" },
          })
        );
      },
      {
        "../store": "LSXo",
        preact: "aSor",
        "preact/hooks": "MwGB",
        aphrodite: "CxN7",
        "./style": "hvr4",
        "./profile-select": "tOar",
        "../lib/utils": "ucYa",
        "./themes/theme": "gzKG",
        "../lib/preact-redux": "Erwv",
        "../store/actions": "M9Ab",
      },
    ],
    bv0g: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.importJavaScriptSourceMapSymbolRemapper = r);
        var e = require("./utils"),
          n = function (e, n, o, l) {
            return new (o || (o = Promise))(function (r, i) {
              function t(e) {
                try {
                  a(l.next(e));
                } catch (n) {
                  i(n);
                }
              }
              function u(e) {
                try {
                  a(l.throw(e));
                } catch (n) {
                  i(n);
                }
              }
              function a(e) {
                var n;
                e.done
                  ? r(e.value)
                  : ((n = e.value),
                    n instanceof o
                      ? n
                      : new o(function (e) {
                          e(n);
                        })).then(t, u);
              }
              a((l = l.apply(e, n || [])).next());
            });
          };
        const o = require("_bundle_loader")(require.resolve("source-map")),
          l = !1;
        function r(r, i) {
          return n(this, void 0, void 0, function* () {
            const n = yield o;
            let t = null,
              u = null;
            try {
              (u = JSON.parse(r)), (t = new n.SourceMapConsumer(u));
            } catch (s) {
              return null;
            }
            const a = [];
            t.eachMapping(
              function (e) {
                a.push(
                  Object.assign(Object.assign({}, e), {
                    generatedColumn: e.generatedColumn + 1,
                    originalColumn: e.originalColumn + 1,
                  })
                );
              },
              {},
              n.SourceMapConsumer.GENERATED_ORDER
            );
            const c = i.replace(/\.[^/]*$/, "");
            return (n) => {
              var o;
              let r = !1;
              if (
                ((null == u ? void 0 : u.file) &&
                (null == u ? void 0 : u.file) === n.file
                  ? (r = !0)
                  : (
                      "/" +
                      (null === (o = n.file) || void 0 === o
                        ? void 0
                        : o.replace(/\.[^/]*$/, ""))
                    ).endsWith("/" + c) && (r = !0),
                !r)
              )
                return null;
              if (null == n.line || null == n.col) return null;
              let i = (0, e.findIndexBisect)(
                a,
                (e) =>
                  e.generatedLine > n.line ||
                  (!(e.generatedLine < n.line) && e.generatedColumn >= n.col)
              );
              if (-1 === i) i = a.length - 1;
              else {
                if (0 === i) return null;
                i--;
              }
              const s = a[i],
                m = {};
              if (null != s.name) m.name = s.name;
              else if (null != s.source) {
                const e = null == t ? void 0 : t.sourceContentFor(s.source, !0);
                if (e) {
                  const n = e.split("\n")[s.originalLine - 1];
                  if (n) {
                    const e = /\w+/.exec(n.substr(s.originalColumn - 1));
                    e && (m.name = e[0]);
                  }
                }
              }
              switch (m.name) {
                case "constructor":
                  m.name = n.name + " constructor";
                  break;
                case "function":
                  m.name = n.name;
                  break;
                case "const":
                case "export":
                  m.name = n.name;
              }
              return (
                m.name && n.name.includes(m.name) && (m.name = n.name),
                null != s.source &&
                  ((m.file = s.source),
                  (m.line = s.originalLine),
                  (m.col = s.originalColumn)),
                l &&
                  (console.groupCollapsed(
                    `Remapping "${n.name}" -> "${m.name}"`
                  ),
                  console.log("before", Object.assign({}, n)),
                  console.log("item @ index", s),
                  console.log("item @ index + 1", a[i + 1]),
                  console.log("after", m),
                  console.groupEnd()),
                m
              );
            };
          });
        }
      },
      {
        _bundle_loader: "TUK3",
        "source-map": [
          ["source-map.438fa06b.js", "aRf0"],
          "source-map.438fa06b.js.map",
          "aRf0",
        ],
        "./utils": "ucYa",
      },
    ],
    ThNa: [
      function (require, module, exports) {
        module.exports = "perf-vertx-stacks-01-collapsed-all.2681da68.txt";
      },
      {},
    ],
    wCGh: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.Application = exports.GLCanvas = void 0);
        var e = require("preact"),
          t = require("aphrodite"),
          o = require("./style"),
          i = require("../lib/emscripten"),
          r = require("./sandwich-view"),
          s = require("../lib/file-format"),
          n = require("../store"),
          a = require("../lib/typed-redux"),
          l = require("./flamechart-view-container"),
          c = require("./toolbar"),
          p = require("../lib/js-source-map"),
          d = require("./themes/theme"),
          h = function (e, t, o, i) {
            return new (o || (o = Promise))(function (r, s) {
              function n(e) {
                try {
                  l(i.next(e));
                } catch (t) {
                  s(t);
                }
              }
              function a(e) {
                try {
                  l(i.throw(e));
                } catch (t) {
                  s(t);
                }
              }
              function l(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof o
                      ? t
                      : new o(function (e) {
                          e(t);
                        })).then(n, a);
              }
              l((i = i.apply(e, t || [])).next());
            });
          };
        const u = require("_bundle_loader")(require.resolve("../import"));
        function f(e, t) {
          return h(this, void 0, void 0, function* () {
            return (yield u).importProfileGroupFromText(e, t);
          });
        }
        function m(e, t) {
          return h(this, void 0, void 0, function* () {
            return (yield u).importProfileGroupFromBase64(e, t);
          });
        }
        function v(e, t) {
          return h(this, void 0, void 0, function* () {
            return (yield u).importProfilesFromArrayBuffer(e, t);
          });
        }
        function g(e) {
          return h(this, void 0, void 0, function* () {
            return (yield u).importProfilesFromFile(e);
          });
        }
        function w(e) {
          return h(this, void 0, void 0, function* () {
            return (yield u).importFromFileSystemDirectoryEntry(e);
          });
        }
        u.then(() => {}),
          require("_bundle_loader")(
            require.resolve("../lib/demangle-cpp")
          ).then(() => {}),
          require("_bundle_loader")(require.resolve("source-map")).then(
            () => {}
          );
        const y = require("../../sample/profiles/stackcollapse/perf-vertx-stacks-01-collapsed-all.txt");
        class x extends a.StatelessComponent {
          constructor() {
            super(...arguments),
              (this.canvas = null),
              (this.ref = (e) => {
                e instanceof HTMLCanvasElement
                  ? (this.canvas = e)
                  : (this.canvas = null),
                  this.props.setGLCanvas(this.canvas);
              }),
              (this.container = null),
              (this.containerRef = (e) => {
                e instanceof HTMLElement
                  ? (this.container = e)
                  : (this.container = null);
              }),
              (this.maybeResize = () => {
                if (!this.container) return;
                if (!this.props.canvasContext) return;
                let { width: e, height: t } =
                  this.container.getBoundingClientRect();
                const o = e,
                  i = t,
                  r = e * window.devicePixelRatio,
                  s = t * window.devicePixelRatio;
                this.props.canvasContext.gl.resize(r, s, o, i);
              }),
              (this.onWindowResize = () => {
                this.props.canvasContext &&
                  this.props.canvasContext.requestFrame();
              });
          }
          componentWillReceiveProps(e) {
            this.props.canvasContext !== e.canvasContext &&
              (this.props.canvasContext &&
                this.props.canvasContext.removeBeforeFrameHandler(
                  this.maybeResize
                ),
              e.canvasContext &&
                (e.canvasContext.addBeforeFrameHandler(this.maybeResize),
                e.canvasContext.requestFrame()));
          }
          componentDidMount() {
            window.addEventListener("resize", this.onWindowResize);
          }
          componentWillUnmount() {
            this.props.canvasContext &&
              this.props.canvasContext.removeBeforeFrameHandler(
                this.maybeResize
              ),
              window.removeEventListener("resize", this.onWindowResize);
          }
          render() {
            const o = C(this.props.theme);
            return (0, e.h)(
              "div",
              { ref: this.containerRef, className: (0, t.css)(o.glCanvasView) },
              (0, e.h)("canvas", { ref: this.ref, width: 1, height: 1 })
            );
          }
        }
        exports.GLCanvas = x;
        class b extends a.StatelessComponent {
          constructor() {
            super(...arguments),
              (this.loadExample = () => {
                this.loadProfile(() =>
                  h(this, void 0, void 0, function* () {
                    const e = yield fetch(y).then((e) => e.text());
                    return yield f("perf-vertx-stacks-01-collapsed-all.txt", e);
                  })
                );
              }),
              (this.onDrop = (e) => {
                if (
                  (this.props.setDragActive(!1),
                  e.preventDefault(),
                  !e.dataTransfer)
                )
                  return;
                const t = e.dataTransfer.items[0];
                if ("webkitGetAsEntry" in t) {
                  const e = t.webkitGetAsEntry();
                  if (e.isDirectory && e.name.endsWith(".trace"))
                    return (
                      console.log("Importing as Instruments.app .trace file"),
                      void this.loadProfile(() =>
                        h(this, void 0, void 0, function* () {
                          return yield w(e);
                        })
                      )
                    );
                }
                let o = e.dataTransfer.files.item(0);
                o && this.loadFromFile(o);
              }),
              (this.onDragOver = (e) => {
                this.props.setDragActive(!0), e.preventDefault();
              }),
              (this.onDragLeave = (e) => {
                this.props.setDragActive(!1), e.preventDefault();
              }),
              (this.onWindowKeyPress = (e) =>
                h(this, void 0, void 0, function* () {
                  if ("1" === e.key)
                    this.props.setViewMode(n.ViewMode.CHRONO_FLAME_CHART);
                  else if ("2" === e.key)
                    this.props.setViewMode(n.ViewMode.LEFT_HEAVY_FLAME_GRAPH);
                  else if ("3" === e.key)
                    this.props.setViewMode(n.ViewMode.SANDWICH_VIEW);
                  else if ("r" === e.key) {
                    const { flattenRecursion: e } = this.props;
                    this.props.setFlattenRecursion(!e);
                  } else if ("n" === e.key) {
                    const { activeProfileState: e } = this.props;
                    e && this.props.setProfileIndexToView(e.index + 1);
                  } else if ("p" === e.key) {
                    const { activeProfileState: e } = this.props;
                    e && this.props.setProfileIndexToView(e.index - 1);
                  }
                })),
              (this.saveFile = () => {
                if (this.props.profileGroup) {
                  const {
                      name: e,
                      indexToView: t,
                      profiles: o,
                    } = this.props.profileGroup,
                    i = {
                      name: e,
                      indexToView: t,
                      profiles: o.map((e) => e.profile),
                    };
                  (0, s.saveToFile)(i);
                }
              }),
              (this.browseForFile = () => {
                const e = document.createElement("input");
                (e.type = "file"),
                  e.addEventListener("change", this.onFileSelect),
                  e.click();
              }),
              (this.onWindowKeyDown = (e) =>
                h(this, void 0, void 0, function* () {
                  "s" === e.key && (e.ctrlKey || e.metaKey)
                    ? (e.preventDefault(), this.saveFile())
                    : "o" === e.key &&
                      (e.ctrlKey || e.metaKey) &&
                      (e.preventDefault(), this.browseForFile());
                })),
              (this.onDocumentPaste = (e) => {
                e.preventDefault(), e.stopPropagation();
                const t = e.clipboardData;
                if (!t) return;
                const o = t.getData("text");
                this.loadProfile(() =>
                  h(this, void 0, void 0, function* () {
                    return yield f("From Clipboard", o);
                  })
                );
              }),
              (this.onFileSelect = (e) => {
                const t = e.target.files.item(0);
                t && this.loadFromFile(t);
              });
          }
          loadProfile(e) {
            return h(this, void 0, void 0, function* () {
              if (
                (this.props.setLoading(!0),
                yield new Promise((e) => setTimeout(e, 0)),
                !this.props.glCanvas)
              )
                return;
              console.time("import");
              let t = null;
              try {
                t = yield e();
              } catch (o) {
                return (
                  console.log("Failed to load format", o),
                  void this.props.setError(!0)
                );
              }
              if (null == t)
                return (
                  alert(
                    "Unrecognized format! See documentation about supported formats."
                  ),
                  void this.props.setLoading(!1)
                );
              if (0 === t.profiles.length)
                return (
                  alert("Successfully imported profile, but it's empty!"),
                  void this.props.setLoading(!1)
                );
              this.props.hashParams.title &&
                (t = Object.assign(Object.assign({}, t), {
                  name: this.props.hashParams.title,
                })),
                (document.title = `${t.name} - speedscope`);
              for (let e of t.profiles) yield e.demangle();
              for (let e of t.profiles) {
                const t = this.props.hashParams.title || e.getName();
                e.setName(t);
              }
              console.timeEnd("import"),
                this.props.setProfileGroup(t),
                this.props.setLoading(!1);
            });
          }
          getStyle() {
            return C(this.props.theme);
          }
          loadFromFile(e) {
            this.loadProfile(() =>
              h(this, void 0, void 0, function* () {
                const t = yield g(e);
                if (t) {
                  for (let o of t.profiles) o.getName() || o.setName(e.name);
                  return t;
                }
                if (this.props.profileGroup && this.props.activeProfileState) {
                  const t = new FileReader(),
                    o = new Promise((e) => {
                      t.addEventListener("loadend", () => {
                        if ("string" != typeof t.result)
                          throw new Error(
                            "Expected reader.result to be a string"
                          );
                        e(t.result);
                      });
                    });
                  t.readAsText(e);
                  const r = yield o;
                  let s = null;
                  const n = (0, i.importEmscriptenSymbolMap)(r);
                  n &&
                    (console.log("Importing as emscripten symbol map"),
                    (s = n));
                  const a = yield (0,
                  p.importJavaScriptSourceMapSymbolRemapper)(r, e.name);
                  if (
                    (!s &&
                      a &&
                      (console.log("Importing as JavaScript source map"),
                      (s = a)),
                    null != s)
                  )
                    return {
                      name: this.props.profileGroup.name || "profile",
                      indexToView: this.props.profileGroup.indexToView,
                      profiles: this.props.profileGroup.profiles.map((e) => {
                        const t = e.profile.shallowClone();
                        return t.remapSymbols(s), t;
                      }),
                    };
                }
                return null;
              })
            );
          }
          componentDidMount() {
            window.addEventListener("keydown", this.onWindowKeyDown),
              window.addEventListener("keypress", this.onWindowKeyPress),
              document.addEventListener("paste", this.onDocumentPaste),
              this.maybeLoadHashParamProfile();
          }
          componentWillUnmount() {
            window.removeEventListener("keydown", this.onWindowKeyDown),
              window.removeEventListener("keypress", this.onWindowKeyPress),
              document.removeEventListener("paste", this.onDocumentPaste);
          }
          maybeLoadHashParamProfile() {
            return h(this, void 0, void 0, function* () {
              if (this.props.hashParams.profileURL) {
                if (!n.canUseXHR)
                  return void alert(
                    `Cannot load a profile URL when loading from "${window.location.protocol}" URL protocol`
                  );
                this.loadProfile(() =>
                  h(this, void 0, void 0, function* () {
                    const e = yield fetch(this.props.hashParams.profileURL);
                    let t = new URL(this.props.hashParams.profileURL).pathname;
                    return (
                      t.includes("/") && (t = t.slice(t.lastIndexOf("/") + 1)),
                      yield v(t, yield e.arrayBuffer())
                    );
                  })
                );
              } else if (this.props.hashParams.localProfilePath) {
                window.speedscope = {
                  loadFileFromBase64: (e, t) => {
                    this.loadProfile(() => m(e, t));
                  },
                };
                const e = document.createElement("script");
                (e.src = `file:///${this.props.hashParams.localProfilePath}`),
                  document.head.appendChild(e);
              }
            });
          }
          renderLanding() {
            const o = this.getStyle();
            return (0, e.h)(
              "div",
              { className: (0, t.css)(o.landingContainer) },
              (0, e.h)(
                "div",
                { className: (0, t.css)(o.landingMessage) },
                (0, e.h)(
                  "p",
                  { className: (0, t.css)(o.landingP) },
                  "👋 Hi there! Welcome to 🔬speedscope, an interactive",
                  " ",
                  (0, e.h)(
                    "a",
                    {
                      className: (0, t.css)(o.link),
                      href: "http://www.brendangregg.com/FlameGraphs/cpuflamegraphs.html",
                    },
                    "flamegraph"
                  ),
                  " ",
                  "visualizer. Use it to help you make your software faster."
                ),
                n.canUseXHR
                  ? (0, e.h)(
                      "p",
                      { className: (0, t.css)(o.landingP) },
                      "Drag and drop a profile file onto this window to get started, click the big blue button below to browse for a profile to explore, or",
                      " ",
                      (0, e.h)(
                        "a",
                        {
                          tabIndex: 0,
                          className: (0, t.css)(o.link),
                          onClick: this.loadExample,
                        },
                        "click here"
                      ),
                      " ",
                      "to load an example profile."
                    )
                  : (0, e.h)(
                      "p",
                      { className: (0, t.css)(o.landingP) },
                      "Drag and drop a profile file onto this window to get started, or click the big blue button below to browse for a profile to explore."
                    ),
                (0, e.h)(
                  "div",
                  { className: (0, t.css)(o.browseButtonContainer) },
                  (0, e.h)("input", {
                    type: "file",
                    name: "file",
                    id: "file",
                    onChange: this.onFileSelect,
                    className: (0, t.css)(o.hide),
                  }),
                  (0, e.h)(
                    "label",
                    {
                      for: "file",
                      className: (0, t.css)(o.browseButton),
                      tabIndex: 0,
                    },
                    "Browse"
                  )
                ),
                (0, e.h)(
                  "p",
                  { className: (0, t.css)(o.landingP) },
                  "See the",
                  " ",
                  (0, e.h)(
                    "a",
                    {
                      className: (0, t.css)(o.link),
                      href: "https://github.com/jlfwong/speedscope#usage",
                      target: "_blank",
                    },
                    "documentation"
                  ),
                  " ",
                  "for information about supported file formats, keyboard shortcuts, and how to navigate around the profile."
                ),
                (0, e.h)(
                  "p",
                  { className: (0, t.css)(o.landingP) },
                  "speedscope is open source. Please",
                  " ",
                  (0, e.h)(
                    "a",
                    {
                      className: (0, t.css)(o.link),
                      target: "_blank",
                      href: "https://github.com/jlfwong/speedscope/issues",
                    },
                    "report any issues on GitHub"
                  ),
                  "."
                )
              )
            );
          }
          renderError() {
            const o = this.getStyle();
            return (0, e.h)(
              "div",
              { className: (0, t.css)(o.error) },
              (0, e.h)("div", null, "😿 Something went wrong."),
              (0, e.h)("div", null, "Check the JS console for more details.")
            );
          }
          renderLoadingBar() {
            const o = this.getStyle();
            return (0, e.h)("div", { className: (0, t.css)(o.loading) });
          }
          renderContent() {
            const {
              viewMode: t,
              activeProfileState: o,
              error: i,
              loading: s,
              glCanvas: a,
            } = this.props;
            if (i) return this.renderError();
            if (s) return this.renderLoadingBar();
            if (!o || !a) return this.renderLanding();
            switch (t) {
              case n.ViewMode.CHRONO_FLAME_CHART:
                return (0, e.h)(l.ChronoFlamechartView, {
                  activeProfileState: o,
                  glCanvas: a,
                });
              case n.ViewMode.LEFT_HEAVY_FLAME_GRAPH:
                return (0, e.h)(l.LeftHeavyFlamechartView, {
                  activeProfileState: o,
                  glCanvas: a,
                });
              case n.ViewMode.SANDWICH_VIEW:
                return (0, e.h)(r.SandwichViewContainer, {
                  activeProfileState: o,
                  glCanvas: a,
                });
            }
          }
          render() {
            const o = this.getStyle();
            return (0, e.h)(
              "div",
              {
                onDrop: this.onDrop,
                onDragOver: this.onDragOver,
                onDragLeave: this.onDragLeave,
                className: (0, t.css)(
                  o.root,
                  this.props.dragActive && o.dragTargetRoot
                ),
              },
              (0, e.h)(x, {
                setGLCanvas: this.props.setGLCanvas,
                canvasContext: this.props.canvasContext,
                theme: this.props.theme,
              }),
              (0, e.h)(
                c.Toolbar,
                Object.assign(
                  {
                    saveFile: this.saveFile,
                    browseForFile: this.browseForFile,
                  },
                  this.props
                )
              ),
              (0, e.h)(
                "div",
                { className: (0, t.css)(o.contentContainer) },
                this.renderContent()
              ),
              this.props.dragActive &&
                (0, e.h)("div", { className: (0, t.css)(o.dragTarget) })
            );
          }
        }
        exports.Application = b;
        const C = (0, d.withTheme)((e) =>
          t.StyleSheet.create({
            glCanvasView: {
              position: "absolute",
              width: "100vw",
              height: "100vh",
              zIndex: -1,
              pointerEvents: "none",
            },
            error: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            },
            loading: {
              height: 3,
              marginBottom: -3,
              background: e.selectionPrimaryColor,
              transformOrigin: "0% 50%",
              animationName: [
                {
                  from: { transform: "scaleX(0)" },
                  to: { transform: "scaleX(1)" },
                },
              ],
              animationTimingFunction: "cubic-bezier(0, 1, 0, 1)",
              animationDuration: "30s",
            },
            root: {
              width: "100vw",
              height: "100vh",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              fontFamily: o.FontFamily.MONOSPACE,
              lineHeight: "20px",
              color: e.fgPrimaryColor,
            },
            dragTargetRoot: { cursor: "copy" },
            dragTarget: {
              boxSizing: "border-box",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: `5px dashed ${e.selectionPrimaryColor}`,
              pointerEvents: "none",
            },
            contentContainer: {
              position: "relative",
              display: "flex",
              overflow: "hidden",
              flexDirection: "column",
              flex: 1,
            },
            landingContainer: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            },
            landingMessage: { maxWidth: 600 },
            landingP: { marginBottom: 16 },
            hide: { display: "none" },
            browseButtonContainer: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            browseButton: {
              marginBottom: 16,
              height: 72,
              flex: 1,
              maxWidth: 256,
              textAlign: "center",
              fontSize: o.FontSize.BIG_BUTTON,
              lineHeight: "72px",
              background: e.selectionPrimaryColor,
              color: e.altFgPrimaryColor,
              transition: `all ${o.Duration.HOVER_CHANGE} ease-in`,
              ":hover": { background: e.selectionSecondaryColor },
            },
            link: {
              color: e.selectionPrimaryColor,
              cursor: "pointer",
              textDecoration: "none",
              transition: `all ${o.Duration.HOVER_CHANGE} ease-in`,
              ":hover": { color: e.selectionSecondaryColor },
            },
          })
        );
      },
      {
        preact: "aSor",
        aphrodite: "CxN7",
        "./style": "hvr4",
        "../lib/emscripten": "FbpF",
        "./sandwich-view": "L8J2",
        "../lib/file-format": "Xzb6",
        "../store": "LSXo",
        "../lib/typed-redux": "UDzr",
        "./flamechart-view-container": "PJJu",
        "./toolbar": "BPHY",
        "../lib/js-source-map": "bv0g",
        "./themes/theme": "gzKG",
        _bundle_loader: "TUK3",
        "../import": [
          ["import.cf0fa83f.js", "uRa7"],
          "import.cf0fa83f.js.map",
          "uRa7",
        ],
        "../lib/demangle-cpp": [
          ["demangle-cpp.1768f4cc.js", "bS28"],
          "demangle-cpp.1768f4cc.js.map",
          "bS28",
        ],
        "source-map": [
          ["source-map.438fa06b.js", "aRf0"],
          "source-map.438fa06b.js.map",
          "aRf0",
        ],
        "../../sample/profiles/stackcollapse/perf-vertx-stacks-01-collapsed-all.txt":
          "ThNa",
      },
    ],
    A6uO: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.ApplicationContainer = void 0);
        var e = require("preact"),
          t = require("./application"),
          r = require("../store/getters"),
          o = require("../store/actions"),
          i = require("../lib/preact-redux"),
          s = require("preact/compat"),
          a = require("../store"),
          n = require("./search-view"),
          c = require("./themes/theme");
        const {
            setLoading: u,
            setError: l,
            setProfileGroup: p,
            setDragActive: C,
            setViewMode: v,
            setGLCanvas: A,
            setFlattenRecursion: d,
            setProfileIndexToView: g,
          } = o.actions,
          h = (0, s.memo)(() => {
            const o = (0, a.useAppSelector)((e) => e, []),
              s = (0, c.useTheme)(),
              h = (0, a.useAppSelector)(
                (e) =>
                  e.glCanvas
                    ? (0, r.getCanvasContext)({ theme: s, canvas: e.glCanvas })
                    : null,
                [s]
              );
            return (0, e.h)(
              n.ProfileSearchContextProvider,
              null,
              (0, e.h)(
                t.Application,
                Object.assign(
                  {
                    activeProfileState: (0, a.useActiveProfileState)(),
                    canvasContext: h,
                    setGLCanvas: (0, i.useActionCreator)(A, []),
                    setLoading: (0, i.useActionCreator)(u, []),
                    setError: (0, i.useActionCreator)(l, []),
                    setProfileGroup: (0, i.useActionCreator)(p, []),
                    setDragActive: (0, i.useActionCreator)(C, []),
                    setViewMode: (0, i.useActionCreator)(v, []),
                    setFlattenRecursion: (0, i.useActionCreator)(d, []),
                    setProfileIndexToView: (0, i.useActionCreator)(g, []),
                    theme: s,
                  },
                  o
                )
              )
            );
          });
        exports.ApplicationContainer = h;
      },
      {
        preact: "aSor",
        "./application": "wCGh",
        "../store/getters": "hEOZ",
        "../store/actions": "M9Ab",
        "../lib/preact-redux": "Erwv",
        "preact/compat": "AQ6k",
        "../store": "LSXo",
        "./search-view": "t9CM",
        "./themes/theme": "gzKG",
      },
    ],
    K5F6: [
      function (require, module, exports) {
        "use strict";
        var e = require("preact"),
          o = require("./store"),
          r = require("./views/application-container"),
          t = require("./lib/preact-redux"),
          i = require("./views/themes/theme");
        console.log(`speedscope v${require("../package.json").version}`),
          module.hot &&
            (module.hot.dispose(() => {
              (0, e.render)(
                (0, e.h)("div", null),
                document.body,
                document.body.lastElementChild || void 0
              );
            }),
            module.hot.accept());
        const d = window.store,
          n = d ? (0, o.createAppStore)(d.getState()) : (0, o.createAppStore)();
        (window.store = n),
          (0, e.render)(
            (0, e.h)(
              t.Provider,
              { store: n },
              (0, e.h)(
                i.ThemeProvider,
                null,
                (0, e.h)(r.ApplicationContainer, null)
              )
            ),
            document.body,
            document.body.lastElementChild || void 0
          );
      },
      {
        preact: "aSor",
        "./store": "LSXo",
        "./views/application-container": "A6uO",
        "./lib/preact-redux": "Erwv",
        "./views/themes/theme": "gzKG",
        "../package.json": "EHrm",
      },
    ],
    Yi9z: [
      function (require, module, exports) {
        module.exports = function (n) {
          return new Promise(function (e, o) {
            var r = document.createElement("script");
            (r.async = !0),
              (r.type = "text/javascript"),
              (r.charset = "utf-8"),
              (r.src = n),
              (r.onerror = function (n) {
                (r.onerror = r.onload = null), o(n);
              }),
              (r.onload = function () {
                (r.onerror = r.onload = null), e();
              }),
              document.getElementsByTagName("head")[0].appendChild(r);
          });
        };
      },
      {},
    ],
    0: [
      function (require, module, exports) {
        var b = require("TUK3");
        b.register("js", require("Yi9z"));
      },
      {},
    ],
  },
  {},
  [0, "K5F6"],
  null
);
//# sourceMappingURL=speedscope.44364064.js.map
