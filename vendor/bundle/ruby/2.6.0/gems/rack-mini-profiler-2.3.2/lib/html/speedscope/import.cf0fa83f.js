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
    y1V0: [
      function (require, module, exports) {
        "use strict";
        function e(e) {
          const t = [];
          return (
            (function e(r) {
              t.push({
                id: r.id,
                callFrame: {
                  columnNumber: 0,
                  functionName: r.functionName,
                  lineNumber: r.lineNumber,
                  scriptId: r.scriptId,
                  url: r.url,
                },
                hitCount: r.hitCount,
                children: r.children.map((e) => e.id),
              }),
                r.children.forEach(e);
            })(e),
            t
          );
        }
        function t(e, t) {
          return e.map((r, n) => {
            return r - (0 === n ? 1e6 * t : e[n - 1]);
          });
        }
        function r(r) {
          return {
            samples: r.samples,
            startTime: 1e6 * r.startTime,
            endTime: 1e6 * r.endTime,
            nodes: e(r.head),
            timeDeltas: t(r.timestamps, r.startTime),
          };
        }
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.chromeTreeToNodes = r);
      },
      {},
    ],
    kWV1: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.isChromeTimeline = i),
          (exports.importFromChromeTimeline = l),
          (exports.importFromChromeCPUProfile = u),
          (exports.importFromOldV8CPUProfile = f);
        var e = require("../lib/profile"),
          t = require("../lib/utils"),
          r = require("../lib/value-formatters"),
          n = require("./v8cpuFormatter");
        function i(e) {
          if (!Array.isArray(e)) return !1;
          if (e.length < 1) return !1;
          const t = e[0];
          return (
            "pid" in t &&
            "tid" in t &&
            "ph" in t &&
            "cat" in t &&
            !!e.find(
              (e) =>
                "CpuProfile" === e.name ||
                "Profile" === e.name ||
                "ProfileChunk" === e.name
            )
          );
        }
        function l(e, r) {
          const n = new Map(),
            i = new Map(),
            l = new Map();
          (0, t.sortBy)(e, (e) => e.ts);
          for (let t of e) {
            if ("CpuProfile" === t.name) {
              const e = `${t.pid}:${t.tid}`,
                r = t.id || e;
              n.set(r, t.args.data.cpuProfile), i.set(r, e);
            }
            if ("Profile" === t.name) {
              const e = `${t.pid}:${t.tid}`;
              n.set(
                t.id || e,
                Object.assign(
                  {
                    startTime: 0,
                    endTime: 0,
                    nodes: [],
                    samples: [],
                    timeDeltas: [],
                  },
                  t.args.data
                )
              ),
                t.id && i.set(t.id, `${t.pid}:${t.tid}`);
            }
            if (
              ("thread_name" === t.name &&
                l.set(`${t.pid}:${t.tid}`, t.args.name),
              "ProfileChunk" === t.name)
            ) {
              const e = `${t.pid}:${t.tid}`,
                r = n.get(t.id || e);
              if (r) {
                const e = t.args.data;
                e.cpuProfile &&
                  (e.cpuProfile.nodes &&
                    (r.nodes = r.nodes.concat(e.cpuProfile.nodes)),
                  e.cpuProfile.samples &&
                    (r.samples = r.samples.concat(e.cpuProfile.samples))),
                  e.timeDeltas &&
                    (r.timeDeltas = r.timeDeltas.concat(e.timeDeltas)),
                  null != e.startTime && (r.startTime = e.startTime),
                  null != e.endTime && (r.endTime = e.endTime);
              } else
                console.warn(
                  `Ignoring ProfileChunk for undeclared Profile with id ${
                    t.id || e
                  }`
                );
            }
          }
          if (n.size > 0) {
            const e = [];
            let o = 0;
            return (
              (0, t.itForEach)(n.keys(), (t) => {
                let s = null,
                  a = i.get(t);
                a && (s = l.get(a) || null);
                const m = u(n.get(t));
                s && n.size > 1
                  ? (m.setName(`${r} - ${s}`),
                    "CrRendererMain" === s && (o = e.length))
                  : m.setName(`${r}`),
                  e.push(m);
              }),
              { name: r, indexToView: o, profiles: e }
            );
          }
          throw new Error("Could not find CPU profile in Timeline");
        }
        const o = new Map();
        function s(e) {
          return (0, t.getOrInsert)(o, e, (e) => {
            const t = e.functionName || "(anonymous)",
              r = e.url;
            let n = e.lineNumber;
            null != n && n++;
            let i = e.columnNumber;
            return (
              null != i && i++,
              { key: `${t}:${r}:${n}:${i}`, name: t, file: r, line: n, col: i }
            );
          });
        }
        function a(e) {
          const { functionName: t, url: r } = e;
          return "native dummy.js" === r || "(root)" === t || "(idle)" === t;
        }
        function m(e) {
          return "(garbage collector)" === e || "(program)" === e;
        }
        function u(n) {
          const i = new e.CallTreeProfileBuilder(n.endTime - n.startTime),
            l = new Map();
          for (let e of n.nodes) l.set(e.id, e);
          for (let e of n.nodes)
            if (
              ("number" == typeof e.parent && (e.parent = l.get(e.parent)),
              e.children)
            )
              for (let t of e.children) {
                const r = l.get(t);
                r && (r.parent = e);
              }
          const o = [],
            u = [];
          let f = n.timeDeltas[0],
            c = f,
            p = NaN;
          for (let e = 0; e < n.samples.length; e++) {
            const t = n.samples[e];
            if (
              (t != p && (o.push(t), f < c ? u.push(c) : (u.push(f), (c = f))),
              e === n.samples.length - 1)
            )
              isNaN(p) || (o.push(p), f < c ? u.push(c) : (u.push(f), (c = f)));
            else {
              (f += n.timeDeltas[e + 1]), (p = t);
            }
          }
          let d = [];
          for (let e = 0; e < o.length; e++) {
            const r = u[e],
              n = o[e];
            let f = l.get(n);
            if (!f) continue;
            let c = null;
            for (
              c = f;
              c && -1 === d.indexOf(c);
              c = m(c.callFrame.functionName)
                ? (0, t.lastOf)(d)
                : c.parent || null
            );
            for (; d.length > 0 && (0, t.lastOf)(d) != c; ) {
              const e = s(d.pop().callFrame);
              i.leaveFrame(e, r);
            }
            const p = [];
            for (
              let e = f;
              e && e != c && !a(e.callFrame);
              e = m(e.callFrame.functionName)
                ? (0, t.lastOf)(d)
                : e.parent || null
            )
              p.push(e);
            p.reverse();
            for (let e of p) i.enterFrame(s(e.callFrame), r);
            d = d.concat(p);
          }
          for (let e = d.length - 1; e >= 0; e--)
            i.leaveFrame(s(d[e].callFrame), (0, t.lastOf)(u));
          return (
            i.setValueFormatter(new r.TimeFormatter("microseconds")), i.build()
          );
        }
        function f(e) {
          return u((0, n.chromeTreeToNodes)(e));
        }
      },
      {
        "../lib/profile": "YG8z",
        "../lib/utils": "ucYa",
        "../lib/value-formatters": "LsM4",
        "./v8cpuFormatter": "y1V0",
      },
    ],
    I37H: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.importFromStackprof = r);
        var e = require("../lib/profile"),
          t = require("../lib/value-formatters");
        function r(r) {
          const o = r.raw_timestamp_deltas.reduce((e, t) => e + t, 0),
            a = new e.StackListProfileBuilder(o),
            { frames: l, raw: s, raw_timestamp_deltas: i } = r;
          let n = 0,
            c = [];
          for (let e = 0; e < s.length; ) {
            const t = s[e++];
            let r = [];
            for (let a = 0; a < t; a++) {
              const t = s[e++];
              r.push(Object.assign({ key: t }, l[t]));
            }
            1 === r.length &&
              "(garbage collection)" === r[0].name &&
              (r = c.concat(r));
            const o = s[e++];
            let m = 0;
            for (let e = 0; e < o; e++) m += i[n++];
            a.appendSampleWithWeight(r, m), (c = r);
          }
          return (
            a.setValueFormatter(new t.TimeFormatter("microseconds")), a.build()
          );
        }
      },
      { "../lib/profile": "YG8z", "../lib/value-formatters": "LsM4" },
    ],
    tbG5: [
      function (require, module, exports) {
        "use strict";
        var r =
          "undefined" != typeof Uint8Array &&
          "undefined" != typeof Uint16Array &&
          "undefined" != typeof Int32Array;
        function t(r, t) {
          return Object.prototype.hasOwnProperty.call(r, t);
        }
        (exports.assign = function (r) {
          for (var e = Array.prototype.slice.call(arguments, 1); e.length; ) {
            var n = e.shift();
            if (n) {
              if ("object" != typeof n)
                throw new TypeError(n + "must be non-object");
              for (var a in n) t(n, a) && (r[a] = n[a]);
            }
          }
          return r;
        }),
          (exports.shrinkBuf = function (r, t) {
            return r.length === t
              ? r
              : r.subarray
              ? r.subarray(0, t)
              : ((r.length = t), r);
          });
        var e = {
            arraySet: function (r, t, e, n, a) {
              if (t.subarray && r.subarray) r.set(t.subarray(e, e + n), a);
              else for (var o = 0; o < n; o++) r[a + o] = t[e + o];
            },
            flattenChunks: function (r) {
              var t, e, n, a, o, s;
              for (n = 0, t = 0, e = r.length; t < e; t++) n += r[t].length;
              for (
                s = new Uint8Array(n), a = 0, t = 0, e = r.length;
                t < e;
                t++
              )
                (o = r[t]), s.set(o, a), (a += o.length);
              return s;
            },
          },
          n = {
            arraySet: function (r, t, e, n, a) {
              for (var o = 0; o < n; o++) r[a + o] = t[e + o];
            },
            flattenChunks: function (r) {
              return [].concat.apply([], r);
            },
          };
        (exports.setTyped = function (r) {
          r
            ? ((exports.Buf8 = Uint8Array),
              (exports.Buf16 = Uint16Array),
              (exports.Buf32 = Int32Array),
              exports.assign(exports, e))
            : ((exports.Buf8 = Array),
              (exports.Buf16 = Array),
              (exports.Buf32 = Array),
              exports.assign(exports, n));
        }),
          exports.setTyped(r);
      },
      {},
    ],
    sRJQ: [
      function (require, module, exports) {
        "use strict";
        var e = require("../utils/common"),
          t = 4,
          n = 0,
          _ = 1,
          r = 2;
        function a(e) {
          for (var t = e.length; --t >= 0; ) e[t] = 0;
        }
        var i = 0,
          l = 1,
          d = 2,
          f = 3,
          o = 258,
          b = 29,
          s = 256,
          u = s + 1 + b,
          c = 30,
          p = 19,
          h = 2 * u + 1,
          v = 15,
          y = 16,
          x = 7,
          g = 256,
          m = 16,
          w = 17,
          A = 18,
          k = [
            0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4,
            4, 5, 5, 5, 5, 0,
          ],
          q = [
            0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9,
            10, 10, 11, 11, 12, 12, 13, 13,
          ],
          z = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
          S = [
            16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
          ],
          j = 512,
          B = new Array(2 * (u + 2));
        a(B);
        var C = new Array(2 * c);
        a(C);
        var D = new Array(j);
        a(D);
        var E = new Array(o - f + 1);
        a(E);
        var F = new Array(b);
        a(F);
        var G,
          H,
          I,
          J = new Array(c);
        function K(e, t, n, _, r) {
          (this.static_tree = e),
            (this.extra_bits = t),
            (this.extra_base = n),
            (this.elems = _),
            (this.max_length = r),
            (this.has_stree = e && e.length);
        }
        function L(e, t) {
          (this.dyn_tree = e), (this.max_code = 0), (this.stat_desc = t);
        }
        function M(e) {
          return e < 256 ? D[e] : D[256 + (e >>> 7)];
        }
        function N(e, t) {
          (e.pending_buf[e.pending++] = 255 & t),
            (e.pending_buf[e.pending++] = (t >>> 8) & 255);
        }
        function O(e, t, n) {
          e.bi_valid > y - n
            ? ((e.bi_buf |= (t << e.bi_valid) & 65535),
              N(e, e.bi_buf),
              (e.bi_buf = t >> (y - e.bi_valid)),
              (e.bi_valid += n - y))
            : ((e.bi_buf |= (t << e.bi_valid) & 65535), (e.bi_valid += n));
        }
        function P(e, t, n) {
          O(e, n[2 * t], n[2 * t + 1]);
        }
        function Q(e, t) {
          var n = 0;
          do {
            (n |= 1 & e), (e >>>= 1), (n <<= 1);
          } while (--t > 0);
          return n >>> 1;
        }
        function R(e) {
          16 === e.bi_valid
            ? (N(e, e.bi_buf), (e.bi_buf = 0), (e.bi_valid = 0))
            : e.bi_valid >= 8 &&
              ((e.pending_buf[e.pending++] = 255 & e.bi_buf),
              (e.bi_buf >>= 8),
              (e.bi_valid -= 8));
        }
        function T(e, t) {
          var n,
            _,
            r,
            a,
            i,
            l,
            d = t.dyn_tree,
            f = t.max_code,
            o = t.stat_desc.static_tree,
            b = t.stat_desc.has_stree,
            s = t.stat_desc.extra_bits,
            u = t.stat_desc.extra_base,
            c = t.stat_desc.max_length,
            p = 0;
          for (a = 0; a <= v; a++) e.bl_count[a] = 0;
          for (
            d[2 * e.heap[e.heap_max] + 1] = 0, n = e.heap_max + 1;
            n < h;
            n++
          )
            (a = d[2 * d[2 * (_ = e.heap[n]) + 1] + 1] + 1) > c &&
              ((a = c), p++),
              (d[2 * _ + 1] = a),
              _ > f ||
                (e.bl_count[a]++,
                (i = 0),
                _ >= u && (i = s[_ - u]),
                (l = d[2 * _]),
                (e.opt_len += l * (a + i)),
                b && (e.static_len += l * (o[2 * _ + 1] + i)));
          if (0 !== p) {
            do {
              for (a = c - 1; 0 === e.bl_count[a]; ) a--;
              e.bl_count[a]--,
                (e.bl_count[a + 1] += 2),
                e.bl_count[c]--,
                (p -= 2);
            } while (p > 0);
            for (a = c; 0 !== a; a--)
              for (_ = e.bl_count[a]; 0 !== _; )
                (r = e.heap[--n]) > f ||
                  (d[2 * r + 1] !== a &&
                    ((e.opt_len += (a - d[2 * r + 1]) * d[2 * r]),
                    (d[2 * r + 1] = a)),
                  _--);
          }
        }
        function U(e, t, n) {
          var _,
            r,
            a = new Array(v + 1),
            i = 0;
          for (_ = 1; _ <= v; _++) a[_] = i = (i + n[_ - 1]) << 1;
          for (r = 0; r <= t; r++) {
            var l = e[2 * r + 1];
            0 !== l && (e[2 * r] = Q(a[l]++, l));
          }
        }
        function V() {
          var e,
            t,
            n,
            _,
            r,
            a = new Array(v + 1);
          for (n = 0, _ = 0; _ < b - 1; _++)
            for (F[_] = n, e = 0; e < 1 << k[_]; e++) E[n++] = _;
          for (E[n - 1] = _, r = 0, _ = 0; _ < 16; _++)
            for (J[_] = r, e = 0; e < 1 << q[_]; e++) D[r++] = _;
          for (r >>= 7; _ < c; _++)
            for (J[_] = r << 7, e = 0; e < 1 << (q[_] - 7); e++)
              D[256 + r++] = _;
          for (t = 0; t <= v; t++) a[t] = 0;
          for (e = 0; e <= 143; ) (B[2 * e + 1] = 8), e++, a[8]++;
          for (; e <= 255; ) (B[2 * e + 1] = 9), e++, a[9]++;
          for (; e <= 279; ) (B[2 * e + 1] = 7), e++, a[7]++;
          for (; e <= 287; ) (B[2 * e + 1] = 8), e++, a[8]++;
          for (U(B, u + 1, a), e = 0; e < c; e++)
            (C[2 * e + 1] = 5), (C[2 * e] = Q(e, 5));
          (G = new K(B, k, s + 1, u, v)),
            (H = new K(C, q, 0, c, v)),
            (I = new K(new Array(0), z, 0, p, x));
        }
        function W(e) {
          var t;
          for (t = 0; t < u; t++) e.dyn_ltree[2 * t] = 0;
          for (t = 0; t < c; t++) e.dyn_dtree[2 * t] = 0;
          for (t = 0; t < p; t++) e.bl_tree[2 * t] = 0;
          (e.dyn_ltree[2 * g] = 1),
            (e.opt_len = e.static_len = 0),
            (e.last_lit = e.matches = 0);
        }
        function X(e) {
          e.bi_valid > 8
            ? N(e, e.bi_buf)
            : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf),
            (e.bi_buf = 0),
            (e.bi_valid = 0);
        }
        function Y(t, n, _, r) {
          X(t),
            r && (N(t, _), N(t, ~_)),
            e.arraySet(t.pending_buf, t.window, n, _, t.pending),
            (t.pending += _);
        }
        function Z(e, t, n, _) {
          var r = 2 * t,
            a = 2 * n;
          return e[r] < e[a] || (e[r] === e[a] && _[t] <= _[n]);
        }
        function $(e, t, n) {
          for (
            var _ = e.heap[n], r = n << 1;
            r <= e.heap_len &&
            (r < e.heap_len && Z(t, e.heap[r + 1], e.heap[r], e.depth) && r++,
            !Z(t, _, e.heap[r], e.depth));

          )
            (e.heap[n] = e.heap[r]), (n = r), (r <<= 1);
          e.heap[n] = _;
        }
        function ee(e, t, n) {
          var _,
            r,
            a,
            i,
            l = 0;
          if (0 !== e.last_lit)
            do {
              (_ =
                (e.pending_buf[e.d_buf + 2 * l] << 8) |
                e.pending_buf[e.d_buf + 2 * l + 1]),
                (r = e.pending_buf[e.l_buf + l]),
                l++,
                0 === _
                  ? P(e, r, t)
                  : (P(e, (a = E[r]) + s + 1, t),
                    0 !== (i = k[a]) && O(e, (r -= F[a]), i),
                    P(e, (a = M(--_)), n),
                    0 !== (i = q[a]) && O(e, (_ -= J[a]), i));
            } while (l < e.last_lit);
          P(e, g, t);
        }
        function te(e, t) {
          var n,
            _,
            r,
            a = t.dyn_tree,
            i = t.stat_desc.static_tree,
            l = t.stat_desc.has_stree,
            d = t.stat_desc.elems,
            f = -1;
          for (e.heap_len = 0, e.heap_max = h, n = 0; n < d; n++)
            0 !== a[2 * n]
              ? ((e.heap[++e.heap_len] = f = n), (e.depth[n] = 0))
              : (a[2 * n + 1] = 0);
          for (; e.heap_len < 2; )
            (a[2 * (r = e.heap[++e.heap_len] = f < 2 ? ++f : 0)] = 1),
              (e.depth[r] = 0),
              e.opt_len--,
              l && (e.static_len -= i[2 * r + 1]);
          for (t.max_code = f, n = e.heap_len >> 1; n >= 1; n--) $(e, a, n);
          r = d;
          do {
            (n = e.heap[1]),
              (e.heap[1] = e.heap[e.heap_len--]),
              $(e, a, 1),
              (_ = e.heap[1]),
              (e.heap[--e.heap_max] = n),
              (e.heap[--e.heap_max] = _),
              (a[2 * r] = a[2 * n] + a[2 * _]),
              (e.depth[r] =
                (e.depth[n] >= e.depth[_] ? e.depth[n] : e.depth[_]) + 1),
              (a[2 * n + 1] = a[2 * _ + 1] = r),
              (e.heap[1] = r++),
              $(e, a, 1);
          } while (e.heap_len >= 2);
          (e.heap[--e.heap_max] = e.heap[1]), T(e, t), U(a, f, e.bl_count);
        }
        function ne(e, t, n) {
          var _,
            r,
            a = -1,
            i = t[1],
            l = 0,
            d = 7,
            f = 4;
          for (
            0 === i && ((d = 138), (f = 3)), t[2 * (n + 1) + 1] = 65535, _ = 0;
            _ <= n;
            _++
          )
            (r = i),
              (i = t[2 * (_ + 1) + 1]),
              (++l < d && r === i) ||
                (l < f
                  ? (e.bl_tree[2 * r] += l)
                  : 0 !== r
                  ? (r !== a && e.bl_tree[2 * r]++, e.bl_tree[2 * m]++)
                  : l <= 10
                  ? e.bl_tree[2 * w]++
                  : e.bl_tree[2 * A]++,
                (l = 0),
                (a = r),
                0 === i
                  ? ((d = 138), (f = 3))
                  : r === i
                  ? ((d = 6), (f = 3))
                  : ((d = 7), (f = 4)));
        }
        function _e(e, t, n) {
          var _,
            r,
            a = -1,
            i = t[1],
            l = 0,
            d = 7,
            f = 4;
          for (0 === i && ((d = 138), (f = 3)), _ = 0; _ <= n; _++)
            if (((r = i), (i = t[2 * (_ + 1) + 1]), !(++l < d && r === i))) {
              if (l < f)
                do {
                  P(e, r, e.bl_tree);
                } while (0 != --l);
              else
                0 !== r
                  ? (r !== a && (P(e, r, e.bl_tree), l--),
                    P(e, m, e.bl_tree),
                    O(e, l - 3, 2))
                  : l <= 10
                  ? (P(e, w, e.bl_tree), O(e, l - 3, 3))
                  : (P(e, A, e.bl_tree), O(e, l - 11, 7));
              (l = 0),
                (a = r),
                0 === i
                  ? ((d = 138), (f = 3))
                  : r === i
                  ? ((d = 6), (f = 3))
                  : ((d = 7), (f = 4));
            }
        }
        function re(e) {
          var t;
          for (
            ne(e, e.dyn_ltree, e.l_desc.max_code),
              ne(e, e.dyn_dtree, e.d_desc.max_code),
              te(e, e.bl_desc),
              t = p - 1;
            t >= 3 && 0 === e.bl_tree[2 * S[t] + 1];
            t--
          );
          return (e.opt_len += 3 * (t + 1) + 5 + 5 + 4), t;
        }
        function ae(e, t, n, _) {
          var r;
          for (
            O(e, t - 257, 5), O(e, n - 1, 5), O(e, _ - 4, 4), r = 0;
            r < _;
            r++
          )
            O(e, e.bl_tree[2 * S[r] + 1], 3);
          _e(e, e.dyn_ltree, t - 1), _e(e, e.dyn_dtree, n - 1);
        }
        function ie(e) {
          var t,
            r = 4093624447;
          for (t = 0; t <= 31; t++, r >>>= 1)
            if (1 & r && 0 !== e.dyn_ltree[2 * t]) return n;
          if (
            0 !== e.dyn_ltree[18] ||
            0 !== e.dyn_ltree[20] ||
            0 !== e.dyn_ltree[26]
          )
            return _;
          for (t = 32; t < s; t++) if (0 !== e.dyn_ltree[2 * t]) return _;
          return n;
        }
        a(J);
        var le = !1;
        function de(e) {
          le || (V(), (le = !0)),
            (e.l_desc = new L(e.dyn_ltree, G)),
            (e.d_desc = new L(e.dyn_dtree, H)),
            (e.bl_desc = new L(e.bl_tree, I)),
            (e.bi_buf = 0),
            (e.bi_valid = 0),
            W(e);
        }
        function fe(e, t, n, _) {
          O(e, (i << 1) + (_ ? 1 : 0), 3), Y(e, t, n, !0);
        }
        function oe(e) {
          O(e, l << 1, 3), P(e, g, B), R(e);
        }
        function be(e, n, _, a) {
          var i,
            f,
            o = 0;
          e.level > 0
            ? (e.strm.data_type === r && (e.strm.data_type = ie(e)),
              te(e, e.l_desc),
              te(e, e.d_desc),
              (o = re(e)),
              (i = (e.opt_len + 3 + 7) >>> 3),
              (f = (e.static_len + 3 + 7) >>> 3) <= i && (i = f))
            : (i = f = _ + 5),
            _ + 4 <= i && -1 !== n
              ? fe(e, n, _, a)
              : e.strategy === t || f === i
              ? (O(e, (l << 1) + (a ? 1 : 0), 3), ee(e, B, C))
              : (O(e, (d << 1) + (a ? 1 : 0), 3),
                ae(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, o + 1),
                ee(e, e.dyn_ltree, e.dyn_dtree)),
            W(e),
            a && X(e);
        }
        function se(e, t, n) {
          return (
            (e.pending_buf[e.d_buf + 2 * e.last_lit] = (t >>> 8) & 255),
            (e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t),
            (e.pending_buf[e.l_buf + e.last_lit] = 255 & n),
            e.last_lit++,
            0 === t
              ? e.dyn_ltree[2 * n]++
              : (e.matches++,
                t--,
                e.dyn_ltree[2 * (E[n] + s + 1)]++,
                e.dyn_dtree[2 * M(t)]++),
            e.last_lit === e.lit_bufsize - 1
          );
        }
        (exports._tr_init = de),
          (exports._tr_stored_block = fe),
          (exports._tr_flush_block = be),
          (exports._tr_tally = se),
          (exports._tr_align = oe);
      },
      { "../utils/common": "tbG5" },
    ],
    uxo6: [
      function (require, module, exports) {
        "use strict";
        function e(e, r, o, t) {
          for (
            var u = (65535 & e) | 0, i = ((e >>> 16) & 65535) | 0, n = 0;
            0 !== o;

          ) {
            o -= n = o > 2e3 ? 2e3 : o;
            do {
              i = (i + (u = (u + r[t++]) | 0)) | 0;
            } while (--n);
            (u %= 65521), (i %= 65521);
          }
          return u | (i << 16) | 0;
        }
        module.exports = e;
      },
      {},
    ],
    X4kj: [
      function (require, module, exports) {
        "use strict";
        function r() {
          for (var r, o = [], t = 0; t < 256; t++) {
            r = t;
            for (var n = 0; n < 8; n++)
              r = 1 & r ? 3988292384 ^ (r >>> 1) : r >>> 1;
            o[t] = r;
          }
          return o;
        }
        var o = r();
        function t(r, t, n, u) {
          var a = o,
            e = u + n;
          r ^= -1;
          for (var f = u; f < e; f++) r = (r >>> 8) ^ a[255 & (r ^ t[f])];
          return -1 ^ r;
        }
        module.exports = t;
      },
      {},
    ],
    gMAY: [
      function (require, module, exports) {
        "use strict";
        module.exports = {
          2: "need dictionary",
          1: "stream end",
          0: "",
          "-1": "file error",
          "-2": "stream error",
          "-3": "data error",
          "-4": "insufficient memory",
          "-5": "buffer error",
          "-6": "incompatible version",
        };
      },
      {},
    ],
    BLBk: [
      function (require, module, exports) {
        "use strict";
        var t,
          a = require("../utils/common"),
          e = require("./trees"),
          s = require("./adler32"),
          i = require("./crc32"),
          r = require("./messages"),
          n = 0,
          h = 1,
          l = 3,
          _ = 4,
          d = 5,
          o = 0,
          u = 1,
          g = -2,
          f = -3,
          c = -5,
          p = -1,
          m = 1,
          w = 2,
          v = 3,
          k = 4,
          z = 0,
          b = 2,
          x = 8,
          y = 9,
          B = 15,
          S = 8,
          q = 29,
          I = 256,
          A = I + 1 + q,
          C = 30,
          R = 19,
          j = 2 * A + 1,
          D = 15,
          E = 3,
          H = 258,
          K = H + E + 1,
          N = 32,
          F = 42,
          G = 69,
          J = 73,
          L = 91,
          M = 103,
          O = 113,
          P = 666,
          Q = 1,
          T = 2,
          U = 3,
          V = 4,
          W = 3;
        function X(t, a) {
          return (t.msg = r[a]), a;
        }
        function Y(t) {
          return (t << 1) - (t > 4 ? 9 : 0);
        }
        function Z(t) {
          for (var a = t.length; --a >= 0; ) t[a] = 0;
        }
        function $(t) {
          var e = t.state,
            s = e.pending;
          s > t.avail_out && (s = t.avail_out),
            0 !== s &&
              (a.arraySet(
                t.output,
                e.pending_buf,
                e.pending_out,
                s,
                t.next_out
              ),
              (t.next_out += s),
              (e.pending_out += s),
              (t.total_out += s),
              (t.avail_out -= s),
              (e.pending -= s),
              0 === e.pending && (e.pending_out = 0));
        }
        function tt(t, a) {
          e._tr_flush_block(
            t,
            t.block_start >= 0 ? t.block_start : -1,
            t.strstart - t.block_start,
            a
          ),
            (t.block_start = t.strstart),
            $(t.strm);
        }
        function at(t, a) {
          t.pending_buf[t.pending++] = a;
        }
        function et(t, a) {
          (t.pending_buf[t.pending++] = (a >>> 8) & 255),
            (t.pending_buf[t.pending++] = 255 & a);
        }
        function st(t, e, r, n) {
          var h = t.avail_in;
          return (
            h > n && (h = n),
            0 === h
              ? 0
              : ((t.avail_in -= h),
                a.arraySet(e, t.input, t.next_in, h, r),
                1 === t.state.wrap
                  ? (t.adler = s(t.adler, e, h, r))
                  : 2 === t.state.wrap && (t.adler = i(t.adler, e, h, r)),
                (t.next_in += h),
                (t.total_in += h),
                h)
          );
        }
        function it(t, a) {
          var e,
            s,
            i = t.max_chain_length,
            r = t.strstart,
            n = t.prev_length,
            h = t.nice_match,
            l = t.strstart > t.w_size - K ? t.strstart - (t.w_size - K) : 0,
            _ = t.window,
            d = t.w_mask,
            o = t.prev,
            u = t.strstart + H,
            g = _[r + n - 1],
            f = _[r + n];
          t.prev_length >= t.good_match && (i >>= 2),
            h > t.lookahead && (h = t.lookahead);
          do {
            if (
              _[(e = a) + n] === f &&
              _[e + n - 1] === g &&
              _[e] === _[r] &&
              _[++e] === _[r + 1]
            ) {
              (r += 2), e++;
              do {} while (
                _[++r] === _[++e] &&
                _[++r] === _[++e] &&
                _[++r] === _[++e] &&
                _[++r] === _[++e] &&
                _[++r] === _[++e] &&
                _[++r] === _[++e] &&
                _[++r] === _[++e] &&
                _[++r] === _[++e] &&
                r < u
              );
              if (((s = H - (u - r)), (r = u - H), s > n)) {
                if (((t.match_start = a), (n = s), s >= h)) break;
                (g = _[r + n - 1]), (f = _[r + n]);
              }
            }
          } while ((a = o[a & d]) > l && 0 != --i);
          return n <= t.lookahead ? n : t.lookahead;
        }
        function rt(t) {
          var e,
            s,
            i,
            r,
            n,
            h = t.w_size;
          do {
            if (
              ((r = t.window_size - t.lookahead - t.strstart),
              t.strstart >= h + (h - K))
            ) {
              a.arraySet(t.window, t.window, h, h, 0),
                (t.match_start -= h),
                (t.strstart -= h),
                (t.block_start -= h),
                (e = s = t.hash_size);
              do {
                (i = t.head[--e]), (t.head[e] = i >= h ? i - h : 0);
              } while (--s);
              e = s = h;
              do {
                (i = t.prev[--e]), (t.prev[e] = i >= h ? i - h : 0);
              } while (--s);
              r += h;
            }
            if (0 === t.strm.avail_in) break;
            if (
              ((s = st(t.strm, t.window, t.strstart + t.lookahead, r)),
              (t.lookahead += s),
              t.lookahead + t.insert >= E)
            )
              for (
                n = t.strstart - t.insert,
                  t.ins_h = t.window[n],
                  t.ins_h =
                    ((t.ins_h << t.hash_shift) ^ t.window[n + 1]) & t.hash_mask;
                t.insert &&
                ((t.ins_h =
                  ((t.ins_h << t.hash_shift) ^ t.window[n + E - 1]) &
                  t.hash_mask),
                (t.prev[n & t.w_mask] = t.head[t.ins_h]),
                (t.head[t.ins_h] = n),
                n++,
                t.insert--,
                !(t.lookahead + t.insert < E));

              );
          } while (t.lookahead < K && 0 !== t.strm.avail_in);
        }
        function nt(t, a) {
          var e = 65535;
          for (e > t.pending_buf_size - 5 && (e = t.pending_buf_size - 5); ; ) {
            if (t.lookahead <= 1) {
              if ((rt(t), 0 === t.lookahead && a === n)) return Q;
              if (0 === t.lookahead) break;
            }
            (t.strstart += t.lookahead), (t.lookahead = 0);
            var s = t.block_start + e;
            if (
              (0 === t.strstart || t.strstart >= s) &&
              ((t.lookahead = t.strstart - s),
              (t.strstart = s),
              tt(t, !1),
              0 === t.strm.avail_out)
            )
              return Q;
            if (
              t.strstart - t.block_start >= t.w_size - K &&
              (tt(t, !1), 0 === t.strm.avail_out)
            )
              return Q;
          }
          return (
            (t.insert = 0),
            a === _
              ? (tt(t, !0), 0 === t.strm.avail_out ? U : V)
              : (t.strstart > t.block_start && (tt(t, !1), t.strm.avail_out), Q)
          );
        }
        function ht(t, a) {
          for (var s, i; ; ) {
            if (t.lookahead < K) {
              if ((rt(t), t.lookahead < K && a === n)) return Q;
              if (0 === t.lookahead) break;
            }
            if (
              ((s = 0),
              t.lookahead >= E &&
                ((t.ins_h =
                  ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + E - 1]) &
                  t.hash_mask),
                (s = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                (t.head[t.ins_h] = t.strstart)),
              0 !== s &&
                t.strstart - s <= t.w_size - K &&
                (t.match_length = it(t, s)),
              t.match_length >= E)
            )
              if (
                ((i = e._tr_tally(
                  t,
                  t.strstart - t.match_start,
                  t.match_length - E
                )),
                (t.lookahead -= t.match_length),
                t.match_length <= t.max_lazy_match && t.lookahead >= E)
              ) {
                t.match_length--;
                do {
                  t.strstart++,
                    (t.ins_h =
                      ((t.ins_h << t.hash_shift) ^
                        t.window[t.strstart + E - 1]) &
                      t.hash_mask),
                    (s = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                    (t.head[t.ins_h] = t.strstart);
                } while (0 != --t.match_length);
                t.strstart++;
              } else
                (t.strstart += t.match_length),
                  (t.match_length = 0),
                  (t.ins_h = t.window[t.strstart]),
                  (t.ins_h =
                    ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + 1]) &
                    t.hash_mask);
            else
              (i = e._tr_tally(t, 0, t.window[t.strstart])),
                t.lookahead--,
                t.strstart++;
            if (i && (tt(t, !1), 0 === t.strm.avail_out)) return Q;
          }
          return (
            (t.insert = t.strstart < E - 1 ? t.strstart : E - 1),
            a === _
              ? (tt(t, !0), 0 === t.strm.avail_out ? U : V)
              : t.last_lit && (tt(t, !1), 0 === t.strm.avail_out)
              ? Q
              : T
          );
        }
        function lt(t, a) {
          for (var s, i, r; ; ) {
            if (t.lookahead < K) {
              if ((rt(t), t.lookahead < K && a === n)) return Q;
              if (0 === t.lookahead) break;
            }
            if (
              ((s = 0),
              t.lookahead >= E &&
                ((t.ins_h =
                  ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + E - 1]) &
                  t.hash_mask),
                (s = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                (t.head[t.ins_h] = t.strstart)),
              (t.prev_length = t.match_length),
              (t.prev_match = t.match_start),
              (t.match_length = E - 1),
              0 !== s &&
                t.prev_length < t.max_lazy_match &&
                t.strstart - s <= t.w_size - K &&
                ((t.match_length = it(t, s)),
                t.match_length <= 5 &&
                  (t.strategy === m ||
                    (t.match_length === E &&
                      t.strstart - t.match_start > 4096)) &&
                  (t.match_length = E - 1)),
              t.prev_length >= E && t.match_length <= t.prev_length)
            ) {
              (r = t.strstart + t.lookahead - E),
                (i = e._tr_tally(
                  t,
                  t.strstart - 1 - t.prev_match,
                  t.prev_length - E
                )),
                (t.lookahead -= t.prev_length - 1),
                (t.prev_length -= 2);
              do {
                ++t.strstart <= r &&
                  ((t.ins_h =
                    ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + E - 1]) &
                    t.hash_mask),
                  (s = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                  (t.head[t.ins_h] = t.strstart));
              } while (0 != --t.prev_length);
              if (
                ((t.match_available = 0),
                (t.match_length = E - 1),
                t.strstart++,
                i && (tt(t, !1), 0 === t.strm.avail_out))
              )
                return Q;
            } else if (t.match_available) {
              if (
                ((i = e._tr_tally(t, 0, t.window[t.strstart - 1])) && tt(t, !1),
                t.strstart++,
                t.lookahead--,
                0 === t.strm.avail_out)
              )
                return Q;
            } else (t.match_available = 1), t.strstart++, t.lookahead--;
          }
          return (
            t.match_available &&
              ((i = e._tr_tally(t, 0, t.window[t.strstart - 1])),
              (t.match_available = 0)),
            (t.insert = t.strstart < E - 1 ? t.strstart : E - 1),
            a === _
              ? (tt(t, !0), 0 === t.strm.avail_out ? U : V)
              : t.last_lit && (tt(t, !1), 0 === t.strm.avail_out)
              ? Q
              : T
          );
        }
        function _t(t, a) {
          for (var s, i, r, h, l = t.window; ; ) {
            if (t.lookahead <= H) {
              if ((rt(t), t.lookahead <= H && a === n)) return Q;
              if (0 === t.lookahead) break;
            }
            if (
              ((t.match_length = 0),
              t.lookahead >= E &&
                t.strstart > 0 &&
                (i = l[(r = t.strstart - 1)]) === l[++r] &&
                i === l[++r] &&
                i === l[++r])
            ) {
              h = t.strstart + H;
              do {} while (
                i === l[++r] &&
                i === l[++r] &&
                i === l[++r] &&
                i === l[++r] &&
                i === l[++r] &&
                i === l[++r] &&
                i === l[++r] &&
                i === l[++r] &&
                r < h
              );
              (t.match_length = H - (h - r)),
                t.match_length > t.lookahead && (t.match_length = t.lookahead);
            }
            if (
              (t.match_length >= E
                ? ((s = e._tr_tally(t, 1, t.match_length - E)),
                  (t.lookahead -= t.match_length),
                  (t.strstart += t.match_length),
                  (t.match_length = 0))
                : ((s = e._tr_tally(t, 0, t.window[t.strstart])),
                  t.lookahead--,
                  t.strstart++),
              s && (tt(t, !1), 0 === t.strm.avail_out))
            )
              return Q;
          }
          return (
            (t.insert = 0),
            a === _
              ? (tt(t, !0), 0 === t.strm.avail_out ? U : V)
              : t.last_lit && (tt(t, !1), 0 === t.strm.avail_out)
              ? Q
              : T
          );
        }
        function dt(t, a) {
          for (var s; ; ) {
            if (0 === t.lookahead && (rt(t), 0 === t.lookahead)) {
              if (a === n) return Q;
              break;
            }
            if (
              ((t.match_length = 0),
              (s = e._tr_tally(t, 0, t.window[t.strstart])),
              t.lookahead--,
              t.strstart++,
              s && (tt(t, !1), 0 === t.strm.avail_out))
            )
              return Q;
          }
          return (
            (t.insert = 0),
            a === _
              ? (tt(t, !0), 0 === t.strm.avail_out ? U : V)
              : t.last_lit && (tt(t, !1), 0 === t.strm.avail_out)
              ? Q
              : T
          );
        }
        function ot(t, a, e, s, i) {
          (this.good_length = t),
            (this.max_lazy = a),
            (this.nice_length = e),
            (this.max_chain = s),
            (this.func = i);
        }
        function ut(a) {
          (a.window_size = 2 * a.w_size),
            Z(a.head),
            (a.max_lazy_match = t[a.level].max_lazy),
            (a.good_match = t[a.level].good_length),
            (a.nice_match = t[a.level].nice_length),
            (a.max_chain_length = t[a.level].max_chain),
            (a.strstart = 0),
            (a.block_start = 0),
            (a.lookahead = 0),
            (a.insert = 0),
            (a.match_length = a.prev_length = E - 1),
            (a.match_available = 0),
            (a.ins_h = 0);
        }
        function gt() {
          (this.strm = null),
            (this.status = 0),
            (this.pending_buf = null),
            (this.pending_buf_size = 0),
            (this.pending_out = 0),
            (this.pending = 0),
            (this.wrap = 0),
            (this.gzhead = null),
            (this.gzindex = 0),
            (this.method = x),
            (this.last_flush = -1),
            (this.w_size = 0),
            (this.w_bits = 0),
            (this.w_mask = 0),
            (this.window = null),
            (this.window_size = 0),
            (this.prev = null),
            (this.head = null),
            (this.ins_h = 0),
            (this.hash_size = 0),
            (this.hash_bits = 0),
            (this.hash_mask = 0),
            (this.hash_shift = 0),
            (this.block_start = 0),
            (this.match_length = 0),
            (this.prev_match = 0),
            (this.match_available = 0),
            (this.strstart = 0),
            (this.match_start = 0),
            (this.lookahead = 0),
            (this.prev_length = 0),
            (this.max_chain_length = 0),
            (this.max_lazy_match = 0),
            (this.level = 0),
            (this.strategy = 0),
            (this.good_match = 0),
            (this.nice_match = 0),
            (this.dyn_ltree = new a.Buf16(2 * j)),
            (this.dyn_dtree = new a.Buf16(2 * (2 * C + 1))),
            (this.bl_tree = new a.Buf16(2 * (2 * R + 1))),
            Z(this.dyn_ltree),
            Z(this.dyn_dtree),
            Z(this.bl_tree),
            (this.l_desc = null),
            (this.d_desc = null),
            (this.bl_desc = null),
            (this.bl_count = new a.Buf16(D + 1)),
            (this.heap = new a.Buf16(2 * A + 1)),
            Z(this.heap),
            (this.heap_len = 0),
            (this.heap_max = 0),
            (this.depth = new a.Buf16(2 * A + 1)),
            Z(this.depth),
            (this.l_buf = 0),
            (this.lit_bufsize = 0),
            (this.last_lit = 0),
            (this.d_buf = 0),
            (this.opt_len = 0),
            (this.static_len = 0),
            (this.matches = 0),
            (this.insert = 0),
            (this.bi_buf = 0),
            (this.bi_valid = 0);
        }
        function ft(t) {
          var a;
          return t && t.state
            ? ((t.total_in = t.total_out = 0),
              (t.data_type = b),
              ((a = t.state).pending = 0),
              (a.pending_out = 0),
              a.wrap < 0 && (a.wrap = -a.wrap),
              (a.status = a.wrap ? F : O),
              (t.adler = 2 === a.wrap ? 0 : 1),
              (a.last_flush = n),
              e._tr_init(a),
              o)
            : X(t, g);
        }
        function ct(t) {
          var a = ft(t);
          return a === o && ut(t.state), a;
        }
        function pt(t, a) {
          return t && t.state
            ? 2 !== t.state.wrap
              ? g
              : ((t.state.gzhead = a), o)
            : g;
        }
        function mt(t, e, s, i, r, n) {
          if (!t) return g;
          var h = 1;
          if (
            (e === p && (e = 6),
            i < 0 ? ((h = 0), (i = -i)) : i > 15 && ((h = 2), (i -= 16)),
            r < 1 ||
              r > y ||
              s !== x ||
              i < 8 ||
              i > 15 ||
              e < 0 ||
              e > 9 ||
              n < 0 ||
              n > k)
          )
            return X(t, g);
          8 === i && (i = 9);
          var l = new gt();
          return (
            (t.state = l),
            (l.strm = t),
            (l.wrap = h),
            (l.gzhead = null),
            (l.w_bits = i),
            (l.w_size = 1 << l.w_bits),
            (l.w_mask = l.w_size - 1),
            (l.hash_bits = r + 7),
            (l.hash_size = 1 << l.hash_bits),
            (l.hash_mask = l.hash_size - 1),
            (l.hash_shift = ~~((l.hash_bits + E - 1) / E)),
            (l.window = new a.Buf8(2 * l.w_size)),
            (l.head = new a.Buf16(l.hash_size)),
            (l.prev = new a.Buf16(l.w_size)),
            (l.lit_bufsize = 1 << (r + 6)),
            (l.pending_buf_size = 4 * l.lit_bufsize),
            (l.pending_buf = new a.Buf8(l.pending_buf_size)),
            (l.d_buf = 1 * l.lit_bufsize),
            (l.l_buf = 3 * l.lit_bufsize),
            (l.level = e),
            (l.strategy = n),
            (l.method = s),
            ct(t)
          );
        }
        function wt(t, a) {
          return mt(t, a, x, B, S, z);
        }
        function vt(a, s) {
          var r, f, p, m;
          if (!a || !a.state || s > d || s < 0) return a ? X(a, g) : g;
          if (
            ((f = a.state),
            !a.output ||
              (!a.input && 0 !== a.avail_in) ||
              (f.status === P && s !== _))
          )
            return X(a, 0 === a.avail_out ? c : g);
          if (
            ((f.strm = a),
            (r = f.last_flush),
            (f.last_flush = s),
            f.status === F)
          )
            if (2 === f.wrap)
              (a.adler = 0),
                at(f, 31),
                at(f, 139),
                at(f, 8),
                f.gzhead
                  ? (at(
                      f,
                      (f.gzhead.text ? 1 : 0) +
                        (f.gzhead.hcrc ? 2 : 0) +
                        (f.gzhead.extra ? 4 : 0) +
                        (f.gzhead.name ? 8 : 0) +
                        (f.gzhead.comment ? 16 : 0)
                    ),
                    at(f, 255 & f.gzhead.time),
                    at(f, (f.gzhead.time >> 8) & 255),
                    at(f, (f.gzhead.time >> 16) & 255),
                    at(f, (f.gzhead.time >> 24) & 255),
                    at(
                      f,
                      9 === f.level ? 2 : f.strategy >= w || f.level < 2 ? 4 : 0
                    ),
                    at(f, 255 & f.gzhead.os),
                    f.gzhead.extra &&
                      f.gzhead.extra.length &&
                      (at(f, 255 & f.gzhead.extra.length),
                      at(f, (f.gzhead.extra.length >> 8) & 255)),
                    f.gzhead.hcrc &&
                      (a.adler = i(a.adler, f.pending_buf, f.pending, 0)),
                    (f.gzindex = 0),
                    (f.status = G))
                  : (at(f, 0),
                    at(f, 0),
                    at(f, 0),
                    at(f, 0),
                    at(f, 0),
                    at(
                      f,
                      9 === f.level ? 2 : f.strategy >= w || f.level < 2 ? 4 : 0
                    ),
                    at(f, W),
                    (f.status = O));
            else {
              var k = (x + ((f.w_bits - 8) << 4)) << 8;
              (k |=
                (f.strategy >= w || f.level < 2
                  ? 0
                  : f.level < 6
                  ? 1
                  : 6 === f.level
                  ? 2
                  : 3) << 6),
                0 !== f.strstart && (k |= N),
                (k += 31 - (k % 31)),
                (f.status = O),
                et(f, k),
                0 !== f.strstart &&
                  (et(f, a.adler >>> 16), et(f, 65535 & a.adler)),
                (a.adler = 1);
            }
          if (f.status === G)
            if (f.gzhead.extra) {
              for (
                p = f.pending;
                f.gzindex < (65535 & f.gzhead.extra.length) &&
                (f.pending !== f.pending_buf_size ||
                  (f.gzhead.hcrc &&
                    f.pending > p &&
                    (a.adler = i(a.adler, f.pending_buf, f.pending - p, p)),
                  $(a),
                  (p = f.pending),
                  f.pending !== f.pending_buf_size));

              )
                at(f, 255 & f.gzhead.extra[f.gzindex]), f.gzindex++;
              f.gzhead.hcrc &&
                f.pending > p &&
                (a.adler = i(a.adler, f.pending_buf, f.pending - p, p)),
                f.gzindex === f.gzhead.extra.length &&
                  ((f.gzindex = 0), (f.status = J));
            } else f.status = J;
          if (f.status === J)
            if (f.gzhead.name) {
              p = f.pending;
              do {
                if (
                  f.pending === f.pending_buf_size &&
                  (f.gzhead.hcrc &&
                    f.pending > p &&
                    (a.adler = i(a.adler, f.pending_buf, f.pending - p, p)),
                  $(a),
                  (p = f.pending),
                  f.pending === f.pending_buf_size)
                ) {
                  m = 1;
                  break;
                }
                (m =
                  f.gzindex < f.gzhead.name.length
                    ? 255 & f.gzhead.name.charCodeAt(f.gzindex++)
                    : 0),
                  at(f, m);
              } while (0 !== m);
              f.gzhead.hcrc &&
                f.pending > p &&
                (a.adler = i(a.adler, f.pending_buf, f.pending - p, p)),
                0 === m && ((f.gzindex = 0), (f.status = L));
            } else f.status = L;
          if (f.status === L)
            if (f.gzhead.comment) {
              p = f.pending;
              do {
                if (
                  f.pending === f.pending_buf_size &&
                  (f.gzhead.hcrc &&
                    f.pending > p &&
                    (a.adler = i(a.adler, f.pending_buf, f.pending - p, p)),
                  $(a),
                  (p = f.pending),
                  f.pending === f.pending_buf_size)
                ) {
                  m = 1;
                  break;
                }
                (m =
                  f.gzindex < f.gzhead.comment.length
                    ? 255 & f.gzhead.comment.charCodeAt(f.gzindex++)
                    : 0),
                  at(f, m);
              } while (0 !== m);
              f.gzhead.hcrc &&
                f.pending > p &&
                (a.adler = i(a.adler, f.pending_buf, f.pending - p, p)),
                0 === m && (f.status = M);
            } else f.status = M;
          if (
            (f.status === M &&
              (f.gzhead.hcrc
                ? (f.pending + 2 > f.pending_buf_size && $(a),
                  f.pending + 2 <= f.pending_buf_size &&
                    (at(f, 255 & a.adler),
                    at(f, (a.adler >> 8) & 255),
                    (a.adler = 0),
                    (f.status = O)))
                : (f.status = O)),
            0 !== f.pending)
          ) {
            if (($(a), 0 === a.avail_out)) return (f.last_flush = -1), o;
          } else if (0 === a.avail_in && Y(s) <= Y(r) && s !== _)
            return X(a, c);
          if (f.status === P && 0 !== a.avail_in) return X(a, c);
          if (
            0 !== a.avail_in ||
            0 !== f.lookahead ||
            (s !== n && f.status !== P)
          ) {
            var z =
              f.strategy === w
                ? dt(f, s)
                : f.strategy === v
                ? _t(f, s)
                : t[f.level].func(f, s);
            if (((z !== U && z !== V) || (f.status = P), z === Q || z === U))
              return 0 === a.avail_out && (f.last_flush = -1), o;
            if (
              z === T &&
              (s === h
                ? e._tr_align(f)
                : s !== d &&
                  (e._tr_stored_block(f, 0, 0, !1),
                  s === l &&
                    (Z(f.head),
                    0 === f.lookahead &&
                      ((f.strstart = 0), (f.block_start = 0), (f.insert = 0)))),
              $(a),
              0 === a.avail_out)
            )
              return (f.last_flush = -1), o;
          }
          return s !== _
            ? o
            : f.wrap <= 0
            ? u
            : (2 === f.wrap
                ? (at(f, 255 & a.adler),
                  at(f, (a.adler >> 8) & 255),
                  at(f, (a.adler >> 16) & 255),
                  at(f, (a.adler >> 24) & 255),
                  at(f, 255 & a.total_in),
                  at(f, (a.total_in >> 8) & 255),
                  at(f, (a.total_in >> 16) & 255),
                  at(f, (a.total_in >> 24) & 255))
                : (et(f, a.adler >>> 16), et(f, 65535 & a.adler)),
              $(a),
              f.wrap > 0 && (f.wrap = -f.wrap),
              0 !== f.pending ? o : u);
        }
        function kt(t) {
          var a;
          return t && t.state
            ? (a = t.state.status) !== F &&
              a !== G &&
              a !== J &&
              a !== L &&
              a !== M &&
              a !== O &&
              a !== P
              ? X(t, g)
              : ((t.state = null), a === O ? X(t, f) : o)
            : g;
        }
        function zt(t, e) {
          var i,
            r,
            n,
            h,
            l,
            _,
            d,
            u,
            f = e.length;
          if (!t || !t.state) return g;
          if (
            2 === (h = (i = t.state).wrap) ||
            (1 === h && i.status !== F) ||
            i.lookahead
          )
            return g;
          for (
            1 === h && (t.adler = s(t.adler, e, f, 0)),
              i.wrap = 0,
              f >= i.w_size &&
                (0 === h &&
                  (Z(i.head),
                  (i.strstart = 0),
                  (i.block_start = 0),
                  (i.insert = 0)),
                (u = new a.Buf8(i.w_size)),
                a.arraySet(u, e, f - i.w_size, i.w_size, 0),
                (e = u),
                (f = i.w_size)),
              l = t.avail_in,
              _ = t.next_in,
              d = t.input,
              t.avail_in = f,
              t.next_in = 0,
              t.input = e,
              rt(i);
            i.lookahead >= E;

          ) {
            (r = i.strstart), (n = i.lookahead - (E - 1));
            do {
              (i.ins_h =
                ((i.ins_h << i.hash_shift) ^ i.window[r + E - 1]) &
                i.hash_mask),
                (i.prev[r & i.w_mask] = i.head[i.ins_h]),
                (i.head[i.ins_h] = r),
                r++;
            } while (--n);
            (i.strstart = r), (i.lookahead = E - 1), rt(i);
          }
          return (
            (i.strstart += i.lookahead),
            (i.block_start = i.strstart),
            (i.insert = i.lookahead),
            (i.lookahead = 0),
            (i.match_length = i.prev_length = E - 1),
            (i.match_available = 0),
            (t.next_in = _),
            (t.input = d),
            (t.avail_in = l),
            (i.wrap = h),
            o
          );
        }
        (t = [
          new ot(0, 0, 0, 0, nt),
          new ot(4, 4, 8, 4, ht),
          new ot(4, 5, 16, 8, ht),
          new ot(4, 6, 32, 32, ht),
          new ot(4, 4, 16, 16, lt),
          new ot(8, 16, 32, 32, lt),
          new ot(8, 16, 128, 128, lt),
          new ot(8, 32, 128, 256, lt),
          new ot(32, 128, 258, 1024, lt),
          new ot(32, 258, 258, 4096, lt),
        ]),
          (exports.deflateInit = wt),
          (exports.deflateInit2 = mt),
          (exports.deflateReset = ct),
          (exports.deflateResetKeep = ft),
          (exports.deflateSetHeader = pt),
          (exports.deflate = vt),
          (exports.deflateEnd = kt),
          (exports.deflateSetDictionary = zt),
          (exports.deflateInfo = "pako deflate (from Nodeca project)");
      },
      {
        "../utils/common": "tbG5",
        "./trees": "sRJQ",
        "./adler32": "uxo6",
        "./crc32": "X4kj",
        "./messages": "gMAY",
      },
    ],
    Q3ZD: [
      function (require, module, exports) {
        "use strict";
        var r = require("./common"),
          n = !0,
          t = !0;
        try {
          String.fromCharCode.apply(null, [0]);
        } catch (u) {
          n = !1;
        }
        try {
          String.fromCharCode.apply(null, new Uint8Array(1));
        } catch (u) {
          t = !1;
        }
        for (var e = new r.Buf8(256), o = 0; o < 256; o++)
          e[o] =
            o >= 252
              ? 6
              : o >= 248
              ? 5
              : o >= 240
              ? 4
              : o >= 224
              ? 3
              : o >= 192
              ? 2
              : 1;
        function f(e, o) {
          if (o < 65537 && ((e.subarray && t) || (!e.subarray && n)))
            return String.fromCharCode.apply(null, r.shrinkBuf(e, o));
          for (var f = "", u = 0; u < o; u++) f += String.fromCharCode(e[u]);
          return f;
        }
        (e[254] = e[254] = 1),
          (exports.string2buf = function (n) {
            var t,
              e,
              o,
              f,
              u,
              a = n.length,
              i = 0;
            for (f = 0; f < a; f++)
              55296 == (64512 & (e = n.charCodeAt(f))) &&
                f + 1 < a &&
                56320 == (64512 & (o = n.charCodeAt(f + 1))) &&
                ((e = 65536 + ((e - 55296) << 10) + (o - 56320)), f++),
                (i += e < 128 ? 1 : e < 2048 ? 2 : e < 65536 ? 3 : 4);
            for (t = new r.Buf8(i), u = 0, f = 0; u < i; f++)
              55296 == (64512 & (e = n.charCodeAt(f))) &&
                f + 1 < a &&
                56320 == (64512 & (o = n.charCodeAt(f + 1))) &&
                ((e = 65536 + ((e - 55296) << 10) + (o - 56320)), f++),
                e < 128
                  ? (t[u++] = e)
                  : e < 2048
                  ? ((t[u++] = 192 | (e >>> 6)), (t[u++] = 128 | (63 & e)))
                  : e < 65536
                  ? ((t[u++] = 224 | (e >>> 12)),
                    (t[u++] = 128 | ((e >>> 6) & 63)),
                    (t[u++] = 128 | (63 & e)))
                  : ((t[u++] = 240 | (e >>> 18)),
                    (t[u++] = 128 | ((e >>> 12) & 63)),
                    (t[u++] = 128 | ((e >>> 6) & 63)),
                    (t[u++] = 128 | (63 & e)));
            return t;
          }),
          (exports.buf2binstring = function (r) {
            return f(r, r.length);
          }),
          (exports.binstring2buf = function (n) {
            for (var t = new r.Buf8(n.length), e = 0, o = t.length; e < o; e++)
              t[e] = n.charCodeAt(e);
            return t;
          }),
          (exports.buf2string = function (r, n) {
            var t,
              o,
              u,
              a,
              i = n || r.length,
              h = new Array(2 * i);
            for (o = 0, t = 0; t < i; )
              if ((u = r[t++]) < 128) h[o++] = u;
              else if ((a = e[u]) > 4) (h[o++] = 65533), (t += a - 1);
              else {
                for (u &= 2 === a ? 31 : 3 === a ? 15 : 7; a > 1 && t < i; )
                  (u = (u << 6) | (63 & r[t++])), a--;
                a > 1
                  ? (h[o++] = 65533)
                  : u < 65536
                  ? (h[o++] = u)
                  : ((u -= 65536),
                    (h[o++] = 55296 | ((u >> 10) & 1023)),
                    (h[o++] = 56320 | (1023 & u)));
              }
            return f(h, o);
          }),
          (exports.utf8border = function (r, n) {
            var t;
            for (
              (n = n || r.length) > r.length && (n = r.length), t = n - 1;
              t >= 0 && 128 == (192 & r[t]);

            )
              t--;
            return t < 0 ? n : 0 === t ? n : t + e[r[t]] > n ? t : n;
          });
      },
      { "./common": "tbG5" },
    ],
    bdtv: [
      function (require, module, exports) {
        "use strict";
        function t() {
          (this.input = null),
            (this.next_in = 0),
            (this.avail_in = 0),
            (this.total_in = 0),
            (this.output = null),
            (this.next_out = 0),
            (this.avail_out = 0),
            (this.total_out = 0),
            (this.msg = ""),
            (this.state = null),
            (this.data_type = 2),
            (this.adler = 0);
        }
        module.exports = t;
      },
      {},
    ],
    nFS2: [
      function (require, module, exports) {
        "use strict";
        var t = require("./zlib/deflate"),
          i = require("./utils/common"),
          e = require("./utils/strings"),
          n = require("./zlib/messages"),
          r = require("./zlib/zstream"),
          s = Object.prototype.toString,
          o = 0,
          a = 4,
          u = 0,
          h = 1,
          d = 2,
          l = -1,
          f = 0,
          p = 8;
        function w(o) {
          if (!(this instanceof w)) return new w(o);
          this.options = i.assign(
            {
              level: l,
              method: p,
              chunkSize: 16384,
              windowBits: 15,
              memLevel: 8,
              strategy: f,
              to: "",
            },
            o || {}
          );
          var a = this.options;
          a.raw && a.windowBits > 0
            ? (a.windowBits = -a.windowBits)
            : a.gzip &&
              a.windowBits > 0 &&
              a.windowBits < 16 &&
              (a.windowBits += 16),
            (this.err = 0),
            (this.msg = ""),
            (this.ended = !1),
            (this.chunks = []),
            (this.strm = new r()),
            (this.strm.avail_out = 0);
          var h = t.deflateInit2(
            this.strm,
            a.level,
            a.method,
            a.windowBits,
            a.memLevel,
            a.strategy
          );
          if (h !== u) throw new Error(n[h]);
          if (
            (a.header && t.deflateSetHeader(this.strm, a.header), a.dictionary)
          ) {
            var d;
            if (
              ((d =
                "string" == typeof a.dictionary
                  ? e.string2buf(a.dictionary)
                  : "[object ArrayBuffer]" === s.call(a.dictionary)
                  ? new Uint8Array(a.dictionary)
                  : a.dictionary),
              (h = t.deflateSetDictionary(this.strm, d)) !== u)
            )
              throw new Error(n[h]);
            this._dict_set = !0;
          }
        }
        function c(t, i) {
          var e = new w(i);
          if ((e.push(t, !0), e.err)) throw e.msg || n[e.err];
          return e.result;
        }
        function m(t, i) {
          return ((i = i || {}).raw = !0), c(t, i);
        }
        function g(t, i) {
          return ((i = i || {}).gzip = !0), c(t, i);
        }
        (w.prototype.push = function (n, r) {
          var l,
            f,
            p = this.strm,
            w = this.options.chunkSize;
          if (this.ended) return !1;
          (f = r === ~~r ? r : !0 === r ? a : o),
            "string" == typeof n
              ? (p.input = e.string2buf(n))
              : "[object ArrayBuffer]" === s.call(n)
              ? (p.input = new Uint8Array(n))
              : (p.input = n),
            (p.next_in = 0),
            (p.avail_in = p.input.length);
          do {
            if (
              (0 === p.avail_out &&
                ((p.output = new i.Buf8(w)),
                (p.next_out = 0),
                (p.avail_out = w)),
              (l = t.deflate(p, f)) !== h && l !== u)
            )
              return this.onEnd(l), (this.ended = !0), !1;
            (0 !== p.avail_out && (0 !== p.avail_in || (f !== a && f !== d))) ||
              ("string" === this.options.to
                ? this.onData(
                    e.buf2binstring(i.shrinkBuf(p.output, p.next_out))
                  )
                : this.onData(i.shrinkBuf(p.output, p.next_out)));
          } while ((p.avail_in > 0 || 0 === p.avail_out) && l !== h);
          return f === a
            ? ((l = t.deflateEnd(this.strm)),
              this.onEnd(l),
              (this.ended = !0),
              l === u)
            : f !== d || (this.onEnd(u), (p.avail_out = 0), !0);
        }),
          (w.prototype.onData = function (t) {
            this.chunks.push(t);
          }),
          (w.prototype.onEnd = function (t) {
            t === u &&
              ("string" === this.options.to
                ? (this.result = this.chunks.join(""))
                : (this.result = i.flattenChunks(this.chunks))),
              (this.chunks = []),
              (this.err = t),
              (this.msg = this.strm.msg);
          }),
          (exports.Deflate = w),
          (exports.deflate = c),
          (exports.deflateRaw = m),
          (exports.gzip = g);
      },
      {
        "./zlib/deflate": "BLBk",
        "./utils/common": "tbG5",
        "./utils/strings": "Q3ZD",
        "./zlib/messages": "gMAY",
        "./zlib/zstream": "bdtv",
      },
    ],
    LP5M: [
      function (require, module, exports) {
        "use strict";
        var i = 30,
          e = 12;
        module.exports = function (o, a) {
          var t,
            d,
            n,
            l,
            s,
            f,
            r,
            b,
            c,
            u,
            v,
            m,
            w,
            h,
            k,
            _,
            x,
            g,
            p,
            z,
            j,
            q,
            y,
            A,
            B;
          (t = o.state),
            (d = o.next_in),
            (A = o.input),
            (n = d + (o.avail_in - 5)),
            (l = o.next_out),
            (B = o.output),
            (s = l - (a - o.avail_out)),
            (f = l + (o.avail_out - 257)),
            (r = t.dmax),
            (b = t.wsize),
            (c = t.whave),
            (u = t.wnext),
            (v = t.window),
            (m = t.hold),
            (w = t.bits),
            (h = t.lencode),
            (k = t.distcode),
            (_ = (1 << t.lenbits) - 1),
            (x = (1 << t.distbits) - 1);
          i: do {
            w < 15 &&
              ((m += A[d++] << w), (w += 8), (m += A[d++] << w), (w += 8)),
              (g = h[m & _]);
            e: for (;;) {
              if (
                ((m >>>= p = g >>> 24), (w -= p), 0 === (p = (g >>> 16) & 255))
              )
                B[l++] = 65535 & g;
              else {
                if (!(16 & p)) {
                  if (0 == (64 & p)) {
                    g = h[(65535 & g) + (m & ((1 << p) - 1))];
                    continue e;
                  }
                  if (32 & p) {
                    t.mode = e;
                    break i;
                  }
                  (o.msg = "invalid literal/length code"), (t.mode = i);
                  break i;
                }
                (z = 65535 & g),
                  (p &= 15) &&
                    (w < p && ((m += A[d++] << w), (w += 8)),
                    (z += m & ((1 << p) - 1)),
                    (m >>>= p),
                    (w -= p)),
                  w < 15 &&
                    ((m += A[d++] << w),
                    (w += 8),
                    (m += A[d++] << w),
                    (w += 8)),
                  (g = k[m & x]);
                o: for (;;) {
                  if (
                    ((m >>>= p = g >>> 24),
                    (w -= p),
                    !(16 & (p = (g >>> 16) & 255)))
                  ) {
                    if (0 == (64 & p)) {
                      g = k[(65535 & g) + (m & ((1 << p) - 1))];
                      continue o;
                    }
                    (o.msg = "invalid distance code"), (t.mode = i);
                    break i;
                  }
                  if (
                    ((j = 65535 & g),
                    w < (p &= 15) &&
                      ((m += A[d++] << w),
                      (w += 8) < p && ((m += A[d++] << w), (w += 8))),
                    (j += m & ((1 << p) - 1)) > r)
                  ) {
                    (o.msg = "invalid distance too far back"), (t.mode = i);
                    break i;
                  }
                  if (((m >>>= p), (w -= p), j > (p = l - s))) {
                    if ((p = j - p) > c && t.sane) {
                      (o.msg = "invalid distance too far back"), (t.mode = i);
                      break i;
                    }
                    if (((q = 0), (y = v), 0 === u)) {
                      if (((q += b - p), p < z)) {
                        z -= p;
                        do {
                          B[l++] = v[q++];
                        } while (--p);
                        (q = l - j), (y = B);
                      }
                    } else if (u < p) {
                      if (((q += b + u - p), (p -= u) < z)) {
                        z -= p;
                        do {
                          B[l++] = v[q++];
                        } while (--p);
                        if (((q = 0), u < z)) {
                          z -= p = u;
                          do {
                            B[l++] = v[q++];
                          } while (--p);
                          (q = l - j), (y = B);
                        }
                      }
                    } else if (((q += u - p), p < z)) {
                      z -= p;
                      do {
                        B[l++] = v[q++];
                      } while (--p);
                      (q = l - j), (y = B);
                    }
                    for (; z > 2; )
                      (B[l++] = y[q++]),
                        (B[l++] = y[q++]),
                        (B[l++] = y[q++]),
                        (z -= 3);
                    z && ((B[l++] = y[q++]), z > 1 && (B[l++] = y[q++]));
                  } else {
                    q = l - j;
                    do {
                      (B[l++] = B[q++]),
                        (B[l++] = B[q++]),
                        (B[l++] = B[q++]),
                        (z -= 3);
                    } while (z > 2);
                    z && ((B[l++] = B[q++]), z > 1 && (B[l++] = B[q++]));
                  }
                  break;
                }
              }
              break;
            }
          } while (d < n && l < f);
          (d -= z = w >> 3),
            (m &= (1 << (w -= z << 3)) - 1),
            (o.next_in = d),
            (o.next_out = l),
            (o.avail_in = d < n ? n - d + 5 : 5 - (d - n)),
            (o.avail_out = l < f ? f - l + 257 : 257 - (l - f)),
            (t.hold = m),
            (t.bits = w);
        };
      },
      {},
    ],
    uNlq: [
      function (require, module, exports) {
        "use strict";
        var r = require("../utils/common"),
          f = 15,
          i = 852,
          o = 592,
          e = 0,
          u = 1,
          t = 2,
          n = [
            3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51,
            59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0,
          ],
          l = [
            16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19,
            19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78,
          ],
          s = [
            1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385,
            513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385,
            24577, 0, 0,
          ],
          b = [
            16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23,
            23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64,
          ];
        module.exports = function (a, c, m, w, d, v, B, h) {
          var k,
            p,
            q,
            x,
            g,
            j,
            y,
            z,
            A,
            C = h.bits,
            D = 0,
            E = 0,
            F = 0,
            G = 0,
            H = 0,
            I = 0,
            J = 0,
            K = 0,
            L = 0,
            M = 0,
            N = null,
            O = 0,
            P = new r.Buf16(f + 1),
            Q = new r.Buf16(f + 1),
            R = null,
            S = 0;
          for (D = 0; D <= f; D++) P[D] = 0;
          for (E = 0; E < w; E++) P[c[m + E]]++;
          for (H = C, G = f; G >= 1 && 0 === P[G]; G--);
          if ((H > G && (H = G), 0 === G))
            return (d[v++] = 20971520), (d[v++] = 20971520), (h.bits = 1), 0;
          for (F = 1; F < G && 0 === P[F]; F++);
          for (H < F && (H = F), K = 1, D = 1; D <= f; D++)
            if (((K <<= 1), (K -= P[D]) < 0)) return -1;
          if (K > 0 && (a === e || 1 !== G)) return -1;
          for (Q[1] = 0, D = 1; D < f; D++) Q[D + 1] = Q[D] + P[D];
          for (E = 0; E < w; E++) 0 !== c[m + E] && (B[Q[c[m + E]]++] = E);
          if (
            (a === e
              ? ((N = R = B), (j = 19))
              : a === u
              ? ((N = n), (O -= 257), (R = l), (S -= 257), (j = 256))
              : ((N = s), (R = b), (j = -1)),
            (M = 0),
            (E = 0),
            (D = F),
            (g = v),
            (I = H),
            (J = 0),
            (q = -1),
            (x = (L = 1 << H) - 1),
            (a === u && L > i) || (a === t && L > o))
          )
            return 1;
          for (;;) {
            (y = D - J),
              B[E] < j
                ? ((z = 0), (A = B[E]))
                : B[E] > j
                ? ((z = R[S + B[E]]), (A = N[O + B[E]]))
                : ((z = 96), (A = 0)),
              (k = 1 << (D - J)),
              (F = p = 1 << I);
            do {
              d[g + (M >> J) + (p -= k)] = (y << 24) | (z << 16) | A | 0;
            } while (0 !== p);
            for (k = 1 << (D - 1); M & k; ) k >>= 1;
            if (
              (0 !== k ? ((M &= k - 1), (M += k)) : (M = 0), E++, 0 == --P[D])
            ) {
              if (D === G) break;
              D = c[m + B[E]];
            }
            if (D > H && (M & x) !== q) {
              for (
                0 === J && (J = H), g += F, K = 1 << (I = D - J);
                I + J < G && !((K -= P[I + J]) <= 0);

              )
                I++, (K <<= 1);
              if (((L += 1 << I), (a === u && L > i) || (a === t && L > o)))
                return 1;
              d[(q = M & x)] = (H << 24) | (I << 16) | (g - v) | 0;
            }
          }
          return (
            0 !== M && (d[g + M] = ((D - J) << 24) | (64 << 16) | 0),
            (h.bits = H),
            0
          );
        };
      },
      { "../utils/common": "tbG5" },
    ],
    GIDK: [
      function (require, module, exports) {
        "use strict";
        var e = require("../utils/common"),
          a = require("./adler32"),
          t = require("./crc32"),
          i = require("./inffast"),
          s = require("./inftrees"),
          n = 0,
          r = 1,
          o = 2,
          d = 4,
          l = 5,
          f = 6,
          c = 0,
          h = 1,
          k = 2,
          b = -2,
          m = -3,
          w = -4,
          u = -5,
          g = 8,
          v = 1,
          x = 2,
          p = 3,
          _ = 4,
          y = 5,
          z = 6,
          B = 7,
          S = 8,
          q = 9,
          C = 10,
          I = 11,
          R = 12,
          j = 13,
          A = 14,
          D = 15,
          E = 16,
          G = 17,
          H = 18,
          K = 19,
          N = 20,
          F = 21,
          J = 22,
          L = 23,
          M = 24,
          O = 25,
          P = 26,
          Q = 27,
          T = 28,
          U = 29,
          V = 30,
          W = 31,
          X = 32,
          Y = 852,
          Z = 592,
          $ = 15,
          ee = $;
        function ae(e) {
          return (
            ((e >>> 24) & 255) +
            ((e >>> 8) & 65280) +
            ((65280 & e) << 8) +
            ((255 & e) << 24)
          );
        }
        function te() {
          (this.mode = 0),
            (this.last = !1),
            (this.wrap = 0),
            (this.havedict = !1),
            (this.flags = 0),
            (this.dmax = 0),
            (this.check = 0),
            (this.total = 0),
            (this.head = null),
            (this.wbits = 0),
            (this.wsize = 0),
            (this.whave = 0),
            (this.wnext = 0),
            (this.window = null),
            (this.hold = 0),
            (this.bits = 0),
            (this.length = 0),
            (this.offset = 0),
            (this.extra = 0),
            (this.lencode = null),
            (this.distcode = null),
            (this.lenbits = 0),
            (this.distbits = 0),
            (this.ncode = 0),
            (this.nlen = 0),
            (this.ndist = 0),
            (this.have = 0),
            (this.next = null),
            (this.lens = new e.Buf16(320)),
            (this.work = new e.Buf16(288)),
            (this.lendyn = null),
            (this.distdyn = null),
            (this.sane = 0),
            (this.back = 0),
            (this.was = 0);
        }
        function ie(a) {
          var t;
          return a && a.state
            ? ((t = a.state),
              (a.total_in = a.total_out = t.total = 0),
              (a.msg = ""),
              t.wrap && (a.adler = 1 & t.wrap),
              (t.mode = v),
              (t.last = 0),
              (t.havedict = 0),
              (t.dmax = 32768),
              (t.head = null),
              (t.hold = 0),
              (t.bits = 0),
              (t.lencode = t.lendyn = new e.Buf32(Y)),
              (t.distcode = t.distdyn = new e.Buf32(Z)),
              (t.sane = 1),
              (t.back = -1),
              c)
            : b;
        }
        function se(e) {
          var a;
          return e && e.state
            ? (((a = e.state).wsize = 0), (a.whave = 0), (a.wnext = 0), ie(e))
            : b;
        }
        function ne(e, a) {
          var t, i;
          return e && e.state
            ? ((i = e.state),
              a < 0
                ? ((t = 0), (a = -a))
                : ((t = 1 + (a >> 4)), a < 48 && (a &= 15)),
              a && (a < 8 || a > 15)
                ? b
                : (null !== i.window && i.wbits !== a && (i.window = null),
                  (i.wrap = t),
                  (i.wbits = a),
                  se(e)))
            : b;
        }
        function re(e, a) {
          var t, i;
          return e
            ? ((i = new te()),
              (e.state = i),
              (i.window = null),
              (t = ne(e, a)) !== c && (e.state = null),
              t)
            : b;
        }
        function oe(e) {
          return re(e, ee);
        }
        var de,
          le,
          fe = !0;
        function ce(a) {
          if (fe) {
            var t;
            for (de = new e.Buf32(512), le = new e.Buf32(32), t = 0; t < 144; )
              a.lens[t++] = 8;
            for (; t < 256; ) a.lens[t++] = 9;
            for (; t < 280; ) a.lens[t++] = 7;
            for (; t < 288; ) a.lens[t++] = 8;
            for (
              s(r, a.lens, 0, 288, de, 0, a.work, { bits: 9 }), t = 0;
              t < 32;

            )
              a.lens[t++] = 5;
            s(o, a.lens, 0, 32, le, 0, a.work, { bits: 5 }), (fe = !1);
          }
          (a.lencode = de),
            (a.lenbits = 9),
            (a.distcode = le),
            (a.distbits = 5);
        }
        function he(a, t, i, s) {
          var n,
            r = a.state;
          return (
            null === r.window &&
              ((r.wsize = 1 << r.wbits),
              (r.wnext = 0),
              (r.whave = 0),
              (r.window = new e.Buf8(r.wsize))),
            s >= r.wsize
              ? (e.arraySet(r.window, t, i - r.wsize, r.wsize, 0),
                (r.wnext = 0),
                (r.whave = r.wsize))
              : ((n = r.wsize - r.wnext) > s && (n = s),
                e.arraySet(r.window, t, i - s, n, r.wnext),
                (s -= n)
                  ? (e.arraySet(r.window, t, i - s, s, 0),
                    (r.wnext = s),
                    (r.whave = r.wsize))
                  : ((r.wnext += n),
                    r.wnext === r.wsize && (r.wnext = 0),
                    r.whave < r.wsize && (r.whave += n))),
            0
          );
        }
        function ke(Y, Z) {
          var $,
            ee,
            te,
            ie,
            se,
            ne,
            re,
            oe,
            de,
            le,
            fe,
            ke,
            be,
            me,
            we,
            ue,
            ge,
            ve,
            xe,
            pe,
            _e,
            ye,
            ze,
            Be,
            Se = 0,
            qe = new e.Buf8(4),
            Ce = [
              16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
            ];
          if (!Y || !Y.state || !Y.output || (!Y.input && 0 !== Y.avail_in))
            return b;
          ($ = Y.state).mode === R && ($.mode = j),
            (se = Y.next_out),
            (te = Y.output),
            (re = Y.avail_out),
            (ie = Y.next_in),
            (ee = Y.input),
            (ne = Y.avail_in),
            (oe = $.hold),
            (de = $.bits),
            (le = ne),
            (fe = re),
            (ye = c);
          e: for (;;)
            switch ($.mode) {
              case v:
                if (0 === $.wrap) {
                  $.mode = j;
                  break;
                }
                for (; de < 16; ) {
                  if (0 === ne) break e;
                  ne--, (oe += ee[ie++] << de), (de += 8);
                }
                if (2 & $.wrap && 35615 === oe) {
                  ($.check = 0),
                    (qe[0] = 255 & oe),
                    (qe[1] = (oe >>> 8) & 255),
                    ($.check = t($.check, qe, 2, 0)),
                    (oe = 0),
                    (de = 0),
                    ($.mode = x);
                  break;
                }
                if (
                  (($.flags = 0),
                  $.head && ($.head.done = !1),
                  !(1 & $.wrap) || (((255 & oe) << 8) + (oe >> 8)) % 31)
                ) {
                  (Y.msg = "incorrect header check"), ($.mode = V);
                  break;
                }
                if ((15 & oe) !== g) {
                  (Y.msg = "unknown compression method"), ($.mode = V);
                  break;
                }
                if (((de -= 4), (_e = 8 + (15 & (oe >>>= 4))), 0 === $.wbits))
                  $.wbits = _e;
                else if (_e > $.wbits) {
                  (Y.msg = "invalid window size"), ($.mode = V);
                  break;
                }
                ($.dmax = 1 << _e),
                  (Y.adler = $.check = 1),
                  ($.mode = 512 & oe ? C : R),
                  (oe = 0),
                  (de = 0);
                break;
              case x:
                for (; de < 16; ) {
                  if (0 === ne) break e;
                  ne--, (oe += ee[ie++] << de), (de += 8);
                }
                if ((($.flags = oe), (255 & $.flags) !== g)) {
                  (Y.msg = "unknown compression method"), ($.mode = V);
                  break;
                }
                if (57344 & $.flags) {
                  (Y.msg = "unknown header flags set"), ($.mode = V);
                  break;
                }
                $.head && ($.head.text = (oe >> 8) & 1),
                  512 & $.flags &&
                    ((qe[0] = 255 & oe),
                    (qe[1] = (oe >>> 8) & 255),
                    ($.check = t($.check, qe, 2, 0))),
                  (oe = 0),
                  (de = 0),
                  ($.mode = p);
              case p:
                for (; de < 32; ) {
                  if (0 === ne) break e;
                  ne--, (oe += ee[ie++] << de), (de += 8);
                }
                $.head && ($.head.time = oe),
                  512 & $.flags &&
                    ((qe[0] = 255 & oe),
                    (qe[1] = (oe >>> 8) & 255),
                    (qe[2] = (oe >>> 16) & 255),
                    (qe[3] = (oe >>> 24) & 255),
                    ($.check = t($.check, qe, 4, 0))),
                  (oe = 0),
                  (de = 0),
                  ($.mode = _);
              case _:
                for (; de < 16; ) {
                  if (0 === ne) break e;
                  ne--, (oe += ee[ie++] << de), (de += 8);
                }
                $.head && (($.head.xflags = 255 & oe), ($.head.os = oe >> 8)),
                  512 & $.flags &&
                    ((qe[0] = 255 & oe),
                    (qe[1] = (oe >>> 8) & 255),
                    ($.check = t($.check, qe, 2, 0))),
                  (oe = 0),
                  (de = 0),
                  ($.mode = y);
              case y:
                if (1024 & $.flags) {
                  for (; de < 16; ) {
                    if (0 === ne) break e;
                    ne--, (oe += ee[ie++] << de), (de += 8);
                  }
                  ($.length = oe),
                    $.head && ($.head.extra_len = oe),
                    512 & $.flags &&
                      ((qe[0] = 255 & oe),
                      (qe[1] = (oe >>> 8) & 255),
                      ($.check = t($.check, qe, 2, 0))),
                    (oe = 0),
                    (de = 0);
                } else $.head && ($.head.extra = null);
                $.mode = z;
              case z:
                if (
                  1024 & $.flags &&
                  ((ke = $.length) > ne && (ke = ne),
                  ke &&
                    ($.head &&
                      ((_e = $.head.extra_len - $.length),
                      $.head.extra ||
                        ($.head.extra = new Array($.head.extra_len)),
                      e.arraySet($.head.extra, ee, ie, ke, _e)),
                    512 & $.flags && ($.check = t($.check, ee, ke, ie)),
                    (ne -= ke),
                    (ie += ke),
                    ($.length -= ke)),
                  $.length)
                )
                  break e;
                ($.length = 0), ($.mode = B);
              case B:
                if (2048 & $.flags) {
                  if (0 === ne) break e;
                  ke = 0;
                  do {
                    (_e = ee[ie + ke++]),
                      $.head &&
                        _e &&
                        $.length < 65536 &&
                        ($.head.name += String.fromCharCode(_e));
                  } while (_e && ke < ne);
                  if (
                    (512 & $.flags && ($.check = t($.check, ee, ke, ie)),
                    (ne -= ke),
                    (ie += ke),
                    _e)
                  )
                    break e;
                } else $.head && ($.head.name = null);
                ($.length = 0), ($.mode = S);
              case S:
                if (4096 & $.flags) {
                  if (0 === ne) break e;
                  ke = 0;
                  do {
                    (_e = ee[ie + ke++]),
                      $.head &&
                        _e &&
                        $.length < 65536 &&
                        ($.head.comment += String.fromCharCode(_e));
                  } while (_e && ke < ne);
                  if (
                    (512 & $.flags && ($.check = t($.check, ee, ke, ie)),
                    (ne -= ke),
                    (ie += ke),
                    _e)
                  )
                    break e;
                } else $.head && ($.head.comment = null);
                $.mode = q;
              case q:
                if (512 & $.flags) {
                  for (; de < 16; ) {
                    if (0 === ne) break e;
                    ne--, (oe += ee[ie++] << de), (de += 8);
                  }
                  if (oe !== (65535 & $.check)) {
                    (Y.msg = "header crc mismatch"), ($.mode = V);
                    break;
                  }
                  (oe = 0), (de = 0);
                }
                $.head &&
                  (($.head.hcrc = ($.flags >> 9) & 1), ($.head.done = !0)),
                  (Y.adler = $.check = 0),
                  ($.mode = R);
                break;
              case C:
                for (; de < 32; ) {
                  if (0 === ne) break e;
                  ne--, (oe += ee[ie++] << de), (de += 8);
                }
                (Y.adler = $.check = ae(oe)), (oe = 0), (de = 0), ($.mode = I);
              case I:
                if (0 === $.havedict)
                  return (
                    (Y.next_out = se),
                    (Y.avail_out = re),
                    (Y.next_in = ie),
                    (Y.avail_in = ne),
                    ($.hold = oe),
                    ($.bits = de),
                    k
                  );
                (Y.adler = $.check = 1), ($.mode = R);
              case R:
                if (Z === l || Z === f) break e;
              case j:
                if ($.last) {
                  (oe >>>= 7 & de), (de -= 7 & de), ($.mode = Q);
                  break;
                }
                for (; de < 3; ) {
                  if (0 === ne) break e;
                  ne--, (oe += ee[ie++] << de), (de += 8);
                }
                switch ((($.last = 1 & oe), (de -= 1), 3 & (oe >>>= 1))) {
                  case 0:
                    $.mode = A;
                    break;
                  case 1:
                    if ((ce($), ($.mode = N), Z === f)) {
                      (oe >>>= 2), (de -= 2);
                      break e;
                    }
                    break;
                  case 2:
                    $.mode = G;
                    break;
                  case 3:
                    (Y.msg = "invalid block type"), ($.mode = V);
                }
                (oe >>>= 2), (de -= 2);
                break;
              case A:
                for (oe >>>= 7 & de, de -= 7 & de; de < 32; ) {
                  if (0 === ne) break e;
                  ne--, (oe += ee[ie++] << de), (de += 8);
                }
                if ((65535 & oe) != ((oe >>> 16) ^ 65535)) {
                  (Y.msg = "invalid stored block lengths"), ($.mode = V);
                  break;
                }
                if (
                  (($.length = 65535 & oe),
                  (oe = 0),
                  (de = 0),
                  ($.mode = D),
                  Z === f)
                )
                  break e;
              case D:
                $.mode = E;
              case E:
                if ((ke = $.length)) {
                  if ((ke > ne && (ke = ne), ke > re && (ke = re), 0 === ke))
                    break e;
                  e.arraySet(te, ee, ie, ke, se),
                    (ne -= ke),
                    (ie += ke),
                    (re -= ke),
                    (se += ke),
                    ($.length -= ke);
                  break;
                }
                $.mode = R;
                break;
              case G:
                for (; de < 14; ) {
                  if (0 === ne) break e;
                  ne--, (oe += ee[ie++] << de), (de += 8);
                }
                if (
                  (($.nlen = 257 + (31 & oe)),
                  (oe >>>= 5),
                  (de -= 5),
                  ($.ndist = 1 + (31 & oe)),
                  (oe >>>= 5),
                  (de -= 5),
                  ($.ncode = 4 + (15 & oe)),
                  (oe >>>= 4),
                  (de -= 4),
                  $.nlen > 286 || $.ndist > 30)
                ) {
                  (Y.msg = "too many length or distance symbols"), ($.mode = V);
                  break;
                }
                ($.have = 0), ($.mode = H);
              case H:
                for (; $.have < $.ncode; ) {
                  for (; de < 3; ) {
                    if (0 === ne) break e;
                    ne--, (oe += ee[ie++] << de), (de += 8);
                  }
                  ($.lens[Ce[$.have++]] = 7 & oe), (oe >>>= 3), (de -= 3);
                }
                for (; $.have < 19; ) $.lens[Ce[$.have++]] = 0;
                if (
                  (($.lencode = $.lendyn),
                  ($.lenbits = 7),
                  (ze = { bits: $.lenbits }),
                  (ye = s(n, $.lens, 0, 19, $.lencode, 0, $.work, ze)),
                  ($.lenbits = ze.bits),
                  ye)
                ) {
                  (Y.msg = "invalid code lengths set"), ($.mode = V);
                  break;
                }
                ($.have = 0), ($.mode = K);
              case K:
                for (; $.have < $.nlen + $.ndist; ) {
                  for (
                    ;
                    (ue =
                      ((Se = $.lencode[oe & ((1 << $.lenbits) - 1)]) >>> 16) &
                      255),
                      (ge = 65535 & Se),
                      !((we = Se >>> 24) <= de);

                  ) {
                    if (0 === ne) break e;
                    ne--, (oe += ee[ie++] << de), (de += 8);
                  }
                  if (ge < 16)
                    (oe >>>= we), (de -= we), ($.lens[$.have++] = ge);
                  else {
                    if (16 === ge) {
                      for (Be = we + 2; de < Be; ) {
                        if (0 === ne) break e;
                        ne--, (oe += ee[ie++] << de), (de += 8);
                      }
                      if (((oe >>>= we), (de -= we), 0 === $.have)) {
                        (Y.msg = "invalid bit length repeat"), ($.mode = V);
                        break;
                      }
                      (_e = $.lens[$.have - 1]),
                        (ke = 3 + (3 & oe)),
                        (oe >>>= 2),
                        (de -= 2);
                    } else if (17 === ge) {
                      for (Be = we + 3; de < Be; ) {
                        if (0 === ne) break e;
                        ne--, (oe += ee[ie++] << de), (de += 8);
                      }
                      (de -= we),
                        (_e = 0),
                        (ke = 3 + (7 & (oe >>>= we))),
                        (oe >>>= 3),
                        (de -= 3);
                    } else {
                      for (Be = we + 7; de < Be; ) {
                        if (0 === ne) break e;
                        ne--, (oe += ee[ie++] << de), (de += 8);
                      }
                      (de -= we),
                        (_e = 0),
                        (ke = 11 + (127 & (oe >>>= we))),
                        (oe >>>= 7),
                        (de -= 7);
                    }
                    if ($.have + ke > $.nlen + $.ndist) {
                      (Y.msg = "invalid bit length repeat"), ($.mode = V);
                      break;
                    }
                    for (; ke--; ) $.lens[$.have++] = _e;
                  }
                }
                if ($.mode === V) break;
                if (0 === $.lens[256]) {
                  (Y.msg = "invalid code -- missing end-of-block"),
                    ($.mode = V);
                  break;
                }
                if (
                  (($.lenbits = 9),
                  (ze = { bits: $.lenbits }),
                  (ye = s(r, $.lens, 0, $.nlen, $.lencode, 0, $.work, ze)),
                  ($.lenbits = ze.bits),
                  ye)
                ) {
                  (Y.msg = "invalid literal/lengths set"), ($.mode = V);
                  break;
                }
                if (
                  (($.distbits = 6),
                  ($.distcode = $.distdyn),
                  (ze = { bits: $.distbits }),
                  (ye = s(
                    o,
                    $.lens,
                    $.nlen,
                    $.ndist,
                    $.distcode,
                    0,
                    $.work,
                    ze
                  )),
                  ($.distbits = ze.bits),
                  ye)
                ) {
                  (Y.msg = "invalid distances set"), ($.mode = V);
                  break;
                }
                if ((($.mode = N), Z === f)) break e;
              case N:
                $.mode = F;
              case F:
                if (ne >= 6 && re >= 258) {
                  (Y.next_out = se),
                    (Y.avail_out = re),
                    (Y.next_in = ie),
                    (Y.avail_in = ne),
                    ($.hold = oe),
                    ($.bits = de),
                    i(Y, fe),
                    (se = Y.next_out),
                    (te = Y.output),
                    (re = Y.avail_out),
                    (ie = Y.next_in),
                    (ee = Y.input),
                    (ne = Y.avail_in),
                    (oe = $.hold),
                    (de = $.bits),
                    $.mode === R && ($.back = -1);
                  break;
                }
                for (
                  $.back = 0;
                  (ue =
                    ((Se = $.lencode[oe & ((1 << $.lenbits) - 1)]) >>> 16) &
                    255),
                    (ge = 65535 & Se),
                    !((we = Se >>> 24) <= de);

                ) {
                  if (0 === ne) break e;
                  ne--, (oe += ee[ie++] << de), (de += 8);
                }
                if (ue && 0 == (240 & ue)) {
                  for (
                    ve = we, xe = ue, pe = ge;
                    (ue =
                      ((Se =
                        $.lencode[
                          pe + ((oe & ((1 << (ve + xe)) - 1)) >> ve)
                        ]) >>>
                        16) &
                      255),
                      (ge = 65535 & Se),
                      !(ve + (we = Se >>> 24) <= de);

                  ) {
                    if (0 === ne) break e;
                    ne--, (oe += ee[ie++] << de), (de += 8);
                  }
                  (oe >>>= ve), (de -= ve), ($.back += ve);
                }
                if (
                  ((oe >>>= we),
                  (de -= we),
                  ($.back += we),
                  ($.length = ge),
                  0 === ue)
                ) {
                  $.mode = P;
                  break;
                }
                if (32 & ue) {
                  ($.back = -1), ($.mode = R);
                  break;
                }
                if (64 & ue) {
                  (Y.msg = "invalid literal/length code"), ($.mode = V);
                  break;
                }
                ($.extra = 15 & ue), ($.mode = J);
              case J:
                if ($.extra) {
                  for (Be = $.extra; de < Be; ) {
                    if (0 === ne) break e;
                    ne--, (oe += ee[ie++] << de), (de += 8);
                  }
                  ($.length += oe & ((1 << $.extra) - 1)),
                    (oe >>>= $.extra),
                    (de -= $.extra),
                    ($.back += $.extra);
                }
                ($.was = $.length), ($.mode = L);
              case L:
                for (
                  ;
                  (ue =
                    ((Se = $.distcode[oe & ((1 << $.distbits) - 1)]) >>> 16) &
                    255),
                    (ge = 65535 & Se),
                    !((we = Se >>> 24) <= de);

                ) {
                  if (0 === ne) break e;
                  ne--, (oe += ee[ie++] << de), (de += 8);
                }
                if (0 == (240 & ue)) {
                  for (
                    ve = we, xe = ue, pe = ge;
                    (ue =
                      ((Se =
                        $.distcode[
                          pe + ((oe & ((1 << (ve + xe)) - 1)) >> ve)
                        ]) >>>
                        16) &
                      255),
                      (ge = 65535 & Se),
                      !(ve + (we = Se >>> 24) <= de);

                  ) {
                    if (0 === ne) break e;
                    ne--, (oe += ee[ie++] << de), (de += 8);
                  }
                  (oe >>>= ve), (de -= ve), ($.back += ve);
                }
                if (((oe >>>= we), (de -= we), ($.back += we), 64 & ue)) {
                  (Y.msg = "invalid distance code"), ($.mode = V);
                  break;
                }
                ($.offset = ge), ($.extra = 15 & ue), ($.mode = M);
              case M:
                if ($.extra) {
                  for (Be = $.extra; de < Be; ) {
                    if (0 === ne) break e;
                    ne--, (oe += ee[ie++] << de), (de += 8);
                  }
                  ($.offset += oe & ((1 << $.extra) - 1)),
                    (oe >>>= $.extra),
                    (de -= $.extra),
                    ($.back += $.extra);
                }
                if ($.offset > $.dmax) {
                  (Y.msg = "invalid distance too far back"), ($.mode = V);
                  break;
                }
                $.mode = O;
              case O:
                if (0 === re) break e;
                if (((ke = fe - re), $.offset > ke)) {
                  if ((ke = $.offset - ke) > $.whave && $.sane) {
                    (Y.msg = "invalid distance too far back"), ($.mode = V);
                    break;
                  }
                  ke > $.wnext
                    ? ((ke -= $.wnext), (be = $.wsize - ke))
                    : (be = $.wnext - ke),
                    ke > $.length && (ke = $.length),
                    (me = $.window);
                } else (me = te), (be = se - $.offset), (ke = $.length);
                ke > re && (ke = re), (re -= ke), ($.length -= ke);
                do {
                  te[se++] = me[be++];
                } while (--ke);
                0 === $.length && ($.mode = F);
                break;
              case P:
                if (0 === re) break e;
                (te[se++] = $.length), re--, ($.mode = F);
                break;
              case Q:
                if ($.wrap) {
                  for (; de < 32; ) {
                    if (0 === ne) break e;
                    ne--, (oe |= ee[ie++] << de), (de += 8);
                  }
                  if (
                    ((fe -= re),
                    (Y.total_out += fe),
                    ($.total += fe),
                    fe &&
                      (Y.adler = $.check =
                        $.flags
                          ? t($.check, te, fe, se - fe)
                          : a($.check, te, fe, se - fe)),
                    (fe = re),
                    ($.flags ? oe : ae(oe)) !== $.check)
                  ) {
                    (Y.msg = "incorrect data check"), ($.mode = V);
                    break;
                  }
                  (oe = 0), (de = 0);
                }
                $.mode = T;
              case T:
                if ($.wrap && $.flags) {
                  for (; de < 32; ) {
                    if (0 === ne) break e;
                    ne--, (oe += ee[ie++] << de), (de += 8);
                  }
                  if (oe !== (4294967295 & $.total)) {
                    (Y.msg = "incorrect length check"), ($.mode = V);
                    break;
                  }
                  (oe = 0), (de = 0);
                }
                $.mode = U;
              case U:
                ye = h;
                break e;
              case V:
                ye = m;
                break e;
              case W:
                return w;
              case X:
              default:
                return b;
            }
          return (
            (Y.next_out = se),
            (Y.avail_out = re),
            (Y.next_in = ie),
            (Y.avail_in = ne),
            ($.hold = oe),
            ($.bits = de),
            ($.wsize ||
              (fe !== Y.avail_out && $.mode < V && ($.mode < Q || Z !== d))) &&
            he(Y, Y.output, Y.next_out, fe - Y.avail_out)
              ? (($.mode = W), w)
              : ((le -= Y.avail_in),
                (fe -= Y.avail_out),
                (Y.total_in += le),
                (Y.total_out += fe),
                ($.total += fe),
                $.wrap &&
                  fe &&
                  (Y.adler = $.check =
                    $.flags
                      ? t($.check, te, fe, Y.next_out - fe)
                      : a($.check, te, fe, Y.next_out - fe)),
                (Y.data_type =
                  $.bits +
                  ($.last ? 64 : 0) +
                  ($.mode === R ? 128 : 0) +
                  ($.mode === N || $.mode === D ? 256 : 0)),
                ((0 === le && 0 === fe) || Z === d) && ye === c && (ye = u),
                ye)
          );
        }
        function be(e) {
          if (!e || !e.state) return b;
          var a = e.state;
          return a.window && (a.window = null), (e.state = null), c;
        }
        function me(e, a) {
          var t;
          return e && e.state
            ? 0 == (2 & (t = e.state).wrap)
              ? b
              : ((t.head = a), (a.done = !1), c)
            : b;
        }
        function we(e, t) {
          var i,
            s = t.length;
          return e && e.state
            ? 0 !== (i = e.state).wrap && i.mode !== I
              ? b
              : i.mode === I && a(1, t, s, 0) !== i.check
              ? m
              : he(e, t, s, s)
              ? ((i.mode = W), w)
              : ((i.havedict = 1), c)
            : b;
        }
        (exports.inflateReset = se),
          (exports.inflateReset2 = ne),
          (exports.inflateResetKeep = ie),
          (exports.inflateInit = oe),
          (exports.inflateInit2 = re),
          (exports.inflate = ke),
          (exports.inflateEnd = be),
          (exports.inflateGetHeader = me),
          (exports.inflateSetDictionary = we),
          (exports.inflateInfo = "pako inflate (from Nodeca project)");
      },
      {
        "../utils/common": "tbG5",
        "./adler32": "uxo6",
        "./crc32": "X4kj",
        "./inffast": "LP5M",
        "./inftrees": "uNlq",
      },
    ],
    xUUw: [
      function (require, module, exports) {
        "use strict";
        module.exports = {
          Z_NO_FLUSH: 0,
          Z_PARTIAL_FLUSH: 1,
          Z_SYNC_FLUSH: 2,
          Z_FULL_FLUSH: 3,
          Z_FINISH: 4,
          Z_BLOCK: 5,
          Z_TREES: 6,
          Z_OK: 0,
          Z_STREAM_END: 1,
          Z_NEED_DICT: 2,
          Z_ERRNO: -1,
          Z_STREAM_ERROR: -2,
          Z_DATA_ERROR: -3,
          Z_BUF_ERROR: -5,
          Z_NO_COMPRESSION: 0,
          Z_BEST_SPEED: 1,
          Z_BEST_COMPRESSION: 9,
          Z_DEFAULT_COMPRESSION: -1,
          Z_FILTERED: 1,
          Z_HUFFMAN_ONLY: 2,
          Z_RLE: 3,
          Z_FIXED: 4,
          Z_DEFAULT_STRATEGY: 0,
          Z_BINARY: 0,
          Z_TEXT: 1,
          Z_UNKNOWN: 2,
          Z_DEFLATED: 8,
        };
      },
      {},
    ],
    WIli: [
      function (require, module, exports) {
        "use strict";
        function t() {
          (this.text = 0),
            (this.time = 0),
            (this.xflags = 0),
            (this.os = 0),
            (this.extra = null),
            (this.extra_len = 0),
            (this.name = ""),
            (this.comment = ""),
            (this.hcrc = 0),
            (this.done = !1);
        }
        module.exports = t;
      },
      {},
    ],
    faQk: [
      function (require, module, exports) {
        "use strict";
        var t = require("./zlib/inflate"),
          i = require("./utils/common"),
          n = require("./utils/strings"),
          s = require("./zlib/constants"),
          r = require("./zlib/messages"),
          e = require("./zlib/zstream"),
          o = require("./zlib/gzheader"),
          u = Object.prototype.toString;
        function a(n) {
          if (!(this instanceof a)) return new a(n);
          this.options = i.assign(
            { chunkSize: 16384, windowBits: 0, to: "" },
            n || {}
          );
          var u = this.options;
          u.raw &&
            u.windowBits >= 0 &&
            u.windowBits < 16 &&
            ((u.windowBits = -u.windowBits),
            0 === u.windowBits && (u.windowBits = -15)),
            !(u.windowBits >= 0 && u.windowBits < 16) ||
              (n && n.windowBits) ||
              (u.windowBits += 32),
            u.windowBits > 15 &&
              u.windowBits < 48 &&
              0 == (15 & u.windowBits) &&
              (u.windowBits |= 15),
            (this.err = 0),
            (this.msg = ""),
            (this.ended = !1),
            (this.chunks = []),
            (this.strm = new e()),
            (this.strm.avail_out = 0);
          var h = t.inflateInit2(this.strm, u.windowBits);
          if (h !== s.Z_OK) throw new Error(r[h]);
          (this.header = new o()), t.inflateGetHeader(this.strm, this.header);
        }
        function h(t, i) {
          var n = new a(i);
          if ((n.push(t, !0), n.err)) throw n.msg || r[n.err];
          return n.result;
        }
        function _(t, i) {
          return ((i = i || {}).raw = !0), h(t, i);
        }
        (a.prototype.push = function (r, e) {
          var o,
            a,
            h,
            _,
            w,
            l,
            d = this.strm,
            f = this.options.chunkSize,
            p = this.options.dictionary,
            c = !1;
          if (this.ended) return !1;
          (a = e === ~~e ? e : !0 === e ? s.Z_FINISH : s.Z_NO_FLUSH),
            "string" == typeof r
              ? (d.input = n.binstring2buf(r))
              : "[object ArrayBuffer]" === u.call(r)
              ? (d.input = new Uint8Array(r))
              : (d.input = r),
            (d.next_in = 0),
            (d.avail_in = d.input.length);
          do {
            if (
              (0 === d.avail_out &&
                ((d.output = new i.Buf8(f)),
                (d.next_out = 0),
                (d.avail_out = f)),
              (o = t.inflate(d, s.Z_NO_FLUSH)) === s.Z_NEED_DICT &&
                p &&
                ((l =
                  "string" == typeof p
                    ? n.string2buf(p)
                    : "[object ArrayBuffer]" === u.call(p)
                    ? new Uint8Array(p)
                    : p),
                (o = t.inflateSetDictionary(this.strm, l))),
              o === s.Z_BUF_ERROR && !0 === c && ((o = s.Z_OK), (c = !1)),
              o !== s.Z_STREAM_END && o !== s.Z_OK)
            )
              return this.onEnd(o), (this.ended = !0), !1;
            d.next_out &&
              ((0 !== d.avail_out &&
                o !== s.Z_STREAM_END &&
                (0 !== d.avail_in ||
                  (a !== s.Z_FINISH && a !== s.Z_SYNC_FLUSH))) ||
                ("string" === this.options.to
                  ? ((h = n.utf8border(d.output, d.next_out)),
                    (_ = d.next_out - h),
                    (w = n.buf2string(d.output, h)),
                    (d.next_out = _),
                    (d.avail_out = f - _),
                    _ && i.arraySet(d.output, d.output, h, _, 0),
                    this.onData(w))
                  : this.onData(i.shrinkBuf(d.output, d.next_out)))),
              0 === d.avail_in && 0 === d.avail_out && (c = !0);
          } while (
            (d.avail_in > 0 || 0 === d.avail_out) &&
            o !== s.Z_STREAM_END
          );
          return (
            o === s.Z_STREAM_END && (a = s.Z_FINISH),
            a === s.Z_FINISH
              ? ((o = t.inflateEnd(this.strm)),
                this.onEnd(o),
                (this.ended = !0),
                o === s.Z_OK)
              : a !== s.Z_SYNC_FLUSH ||
                (this.onEnd(s.Z_OK), (d.avail_out = 0), !0)
          );
        }),
          (a.prototype.onData = function (t) {
            this.chunks.push(t);
          }),
          (a.prototype.onEnd = function (t) {
            t === s.Z_OK &&
              ("string" === this.options.to
                ? (this.result = this.chunks.join(""))
                : (this.result = i.flattenChunks(this.chunks))),
              (this.chunks = []),
              (this.err = t),
              (this.msg = this.strm.msg);
          }),
          (exports.Inflate = a),
          (exports.inflate = h),
          (exports.inflateRaw = _),
          (exports.ungzip = h);
      },
      {
        "./zlib/inflate": "GIDK",
        "./utils/common": "tbG5",
        "./utils/strings": "Q3ZD",
        "./zlib/constants": "xUUw",
        "./zlib/messages": "gMAY",
        "./zlib/zstream": "bdtv",
        "./zlib/gzheader": "WIli",
      },
    ],
    f4vO: [
      function (require, module, exports) {
        "use strict";
        var e = require("./lib/utils/common").assign,
          i = require("./lib/deflate"),
          r = require("./lib/inflate"),
          l = require("./lib/zlib/constants"),
          s = {};
        e(s, i, r, l), (module.exports = s);
      },
      {
        "./lib/utils/common": "tbG5",
        "./lib/deflate": "nFS2",
        "./lib/inflate": "faQk",
        "./lib/zlib/constants": "xUUw",
      },
    ],
    QTYz: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.MaybeCompressedDataReader = exports.TextProfileDataSource =
            void 0);
        var e = t(require("pako"));
        function r() {
          if ("function" != typeof WeakMap) return null;
          var e = new WeakMap();
          return (
            (r = function () {
              return e;
            }),
            e
          );
        }
        function t(e) {
          if (e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var t = r();
          if (t && t.has(e)) return t.get(e);
          var n = {},
            o = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i in e)
            if (Object.prototype.hasOwnProperty.call(e, i)) {
              var s = o ? Object.getOwnPropertyDescriptor(e, i) : null;
              s && (s.get || s.set)
                ? Object.defineProperty(n, i, s)
                : (n[i] = e[i]);
            }
          return (n.default = e), t && t.set(e, n), n;
        }
        var n = function (e, r, t, n) {
          return new (t || (t = Promise))(function (o, i) {
            function s(e) {
              try {
                u(n.next(e));
              } catch (r) {
                i(r);
              }
            }
            function a(e) {
              try {
                u(n.throw(e));
              } catch (r) {
                i(r);
              }
            }
            function u(e) {
              var r;
              e.done
                ? o(e.value)
                : ((r = e.value),
                  r instanceof t
                    ? r
                    : new t(function (e) {
                        e(r);
                      })).then(s, a);
            }
            u((n = n.apply(e, r || [])).next());
          });
        };
        class o {
          constructor(e, r) {
            (this.fileName = e), (this.contents = r);
          }
          name() {
            return n(this, void 0, void 0, function* () {
              return this.fileName;
            });
          }
          readAsArrayBuffer() {
            return n(this, void 0, void 0, function* () {
              return new ArrayBuffer(0);
            });
          }
          readAsText() {
            return n(this, void 0, void 0, function* () {
              return this.contents;
            });
          }
        }
        exports.TextProfileDataSource = o;
        class i {
          constructor(r, t) {
            (this.namePromise = r),
              (this.uncompressedData = t.then((r) =>
                n(this, void 0, void 0, function* () {
                  try {
                    return e.inflate(new Uint8Array(r)).buffer;
                  } catch (t) {
                    return r;
                  }
                })
              ));
          }
          name() {
            return n(this, void 0, void 0, function* () {
              return yield this.namePromise;
            });
          }
          readAsArrayBuffer() {
            return n(this, void 0, void 0, function* () {
              return yield this.uncompressedData;
            });
          }
          readAsText() {
            return n(this, void 0, void 0, function* () {
              const e = yield this.readAsArrayBuffer();
              let r = "utf-8";
              const t = new Uint8Array(e);
              if (
                (t.length > 2 &&
                  (255 === t[0] && 254 === t[1]
                    ? (r = "utf-16le")
                    : 254 === t[0] && 255 === t[1] && (r = "utf-16be")),
                "undefined" != typeof TextDecoder)
              ) {
                return new TextDecoder(r).decode(e);
              }
              {
                console.warn(
                  "This browser does not support TextDecoder. Decoding text as ASCII."
                );
                let e = "";
                for (let r = 0; r < t.length; r++)
                  e += String.fromCharCode(t[r]);
                return e;
              }
            });
          }
          static fromFile(e) {
            const r = new Promise((r) => {
              const t = new FileReader();
              t.addEventListener("loadend", () => {
                if (!(t.result instanceof ArrayBuffer))
                  throw new Error(
                    "Expected reader.result to be an instance of ArrayBuffer"
                  );
                r(t.result);
              }),
                t.readAsArrayBuffer(e);
            });
            return new i(Promise.resolve(e.name), r);
          }
          static fromArrayBuffer(e, r) {
            return new i(Promise.resolve(e), Promise.resolve(r));
          }
        }
        exports.MaybeCompressedDataReader = i;
      },
      { pako: "f4vO" },
    ],
    G28U: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.importFromInstrumentsDeepCopy = a),
          (exports.importFromInstrumentsTrace = w),
          (exports.importRunFromInstrumentsTrace = g),
          (exports.importThreadFromInstrumentsTrace = b),
          (exports.readInstrumentsKeyedArchive = y),
          (exports.decodeUTF8 = v),
          (exports.UID = void 0);
        var e = require("../lib/profile"),
          t = require("../lib/utils"),
          r = require("../lib/value-formatters"),
          n = require("./utils"),
          s = function (e, t, r, n) {
            return new (r || (r = Promise))(function (s, i) {
              function o(e) {
                try {
                  l(n.next(e));
                } catch (t) {
                  i(t);
                }
              }
              function a(e) {
                try {
                  l(n.throw(e));
                } catch (t) {
                  i(t);
                }
              }
              function l(e) {
                var t;
                e.done
                  ? s(e.value)
                  : ((t = e.value),
                    t instanceof r
                      ? t
                      : new r(function (e) {
                          e(t);
                        })).then(o, a);
              }
              l((n = n.apply(e, t || [])).next());
            });
          };
        function i(e) {
          const t = e.split("\n").map((e) => e.split("\t")),
            r = t.shift();
          if (!r) return [];
          const n = new Map();
          for (let i = 0; i < r.length; i++) n.set(i, r[i]);
          const s = [];
          for (let i of t) {
            const e = {};
            for (let t = 0; t < i.length; t++) e[n.get(t)] = i[t];
            s.push(e);
          }
          return s;
        }
        function o(e) {
          if ("Bytes Used" in e) {
            const t = e["Bytes Used"],
              r = /\s*(\d+(?:[.]\d+)?) (\w+)\s+(?:\d+(?:[.]\d+))%/.exec(t);
            if (!r) return 0;
            const n = parseInt(r[1], 10),
              s = r[2];
            switch (s) {
              case "Bytes":
                return n;
              case "KB":
                return 1024 * n;
              case "MB":
                return 1048576 * n;
              case "GB":
                return 1073741824 * n;
            }
            throw new Error(`Unrecognized units ${s}`);
          }
          if ("Weight" in e || "Running Time" in e) {
            const t = e.Weight || e["Running Time"],
              r = /\s*(\d+(?:[.]\d+)?) ?(\w+)\s+(?:\d+(?:[.]\d+))%/.exec(t);
            if (!r) return 0;
            const n = parseInt(r[1], 10),
              s = r[2];
            switch (s) {
              case "ms":
                return n;
              case "s":
              case "min":
                return 1e3 * n;
            }
            throw new Error(`Unrecognized units ${s}`);
          }
          return -1;
        }
        function a(t) {
          const n = new e.CallTreeProfileBuilder(),
            s = i(t),
            a = [];
          let l = 0;
          for (let e of s) {
            const t = e["Symbol Name"];
            if (!t) continue;
            const r = t.trim();
            let s = t.length - r.length;
            if (a.length - s < 0) throw new Error("Invalid format");
            let i = [];
            for (; s < a.length; ) {
              const e = a.pop();
              i.push(e);
            }
            for (let e of i) (l = Math.max(l, e.endValue)), n.leaveFrame(e, l);
            const c = {
              key: `${e["Source Path"] || ""}:${r}`,
              name: r,
              file: e["Source Path"],
              endValue: l + o(e),
            };
            n.enterFrame(c, l), a.push(c);
          }
          for (; a.length > 0; ) {
            const e = a.pop();
            (l = Math.max(l, e.endValue)), n.leaveFrame(e, l);
          }
          return (
            "Bytes Used" in s[0]
              ? n.setValueFormatter(new r.ByteFormatter())
              : ("Weight" in s[0] || "Running Time" in s[0]) &&
                n.setValueFormatter(new r.TimeFormatter("milliseconds")),
            n.build()
          );
        }
        function l(e) {
          return s(this, void 0, void 0, function* () {
            const t = {
                name: e.name,
                files: new Map(),
                subdirectories: new Map(),
              },
              r = yield new Promise((t, r) => {
                e.createReader().readEntries((e) => {
                  t(e);
                }, r);
              });
            for (let e of r)
              if (e.isDirectory) {
                const r = yield l(e);
                t.subdirectories.set(r.name, r);
              } else {
                const r = yield new Promise((t, r) => {
                  e.file(t, r);
                });
                t.files.set(r.name, r);
              }
            return t;
          });
        }
        function c(e) {
          return n.MaybeCompressedDataReader.fromFile(e).readAsArrayBuffer();
        }
        function u(e) {
          return n.MaybeCompressedDataReader.fromFile(e).readAsText();
        }
        function f(e, r) {
          const n = (0, t.getOrThrow)(e.subdirectories, "corespace"),
            s = (0, t.getOrThrow)(n.subdirectories, `run${r}`);
          return (0, t.getOrThrow)(s.subdirectories, "core");
        }
        class h {
          constructor(e) {
            (this.bytePos = 0), (this.view = new DataView(e));
          }
          seek(e) {
            this.bytePos = e;
          }
          skip(e) {
            this.bytePos += e;
          }
          hasMore() {
            return this.bytePos < this.view.byteLength;
          }
          bytesLeft() {
            return this.view.byteLength - this.bytePos;
          }
          readUint8() {
            return (
              this.bytePos++,
              this.bytePos > this.view.byteLength
                ? 0
                : this.view.getUint8(this.bytePos - 1)
            );
          }
          readUint32() {
            return (
              (this.bytePos += 4),
              this.bytePos > this.view.byteLength
                ? 0
                : this.view.getUint32(this.bytePos - 4, !0)
            );
          }
          readUint48() {
            return (
              (this.bytePos += 6),
              this.bytePos > this.view.byteLength
                ? 0
                : this.view.getUint32(this.bytePos - 6, !0) +
                  this.view.getUint16(this.bytePos - 2, !0) * Math.pow(2, 32)
            );
          }
          readUint64() {
            return (
              (this.bytePos += 8),
              this.bytePos > this.view.byteLength
                ? 0
                : this.view.getUint32(this.bytePos - 8, !0) +
                  this.view.getUint32(this.bytePos - 4, !0) * Math.pow(2, 32)
            );
          }
        }
        function p(e) {
          return s(this, void 0, void 0, function* () {
            const r = (0, t.getOrThrow)(e.subdirectories, "stores");
            for (let e of r.subdirectories.values()) {
              const r = e.files.get("schema.xml");
              if (!r) continue;
              const n = yield u(r);
              if (!/name="time-profile"/.exec(n)) continue;
              const s = new h(yield c((0, t.getOrThrow)(e.files, "bulkstore")));
              s.readUint32(), s.readUint32(), s.readUint32();
              const i = s.readUint32(),
                o = s.readUint32();
              s.seek(i);
              const a = [];
              for (;;) {
                const e = s.readUint48();
                if (0 === e) break;
                const t = s.readUint32();
                s.skip(o - 6 - 4 - 4);
                const r = s.readUint32();
                a.push({ timestamp: e, threadID: t, backtraceID: r });
              }
              return a;
            }
            throw new Error("Could not find sample list");
          });
        }
        function d(e, r) {
          return s(this, void 0, void 0, function* () {
            const e = (0, t.getOrThrow)(r.subdirectories, "uniquing"),
              n = (0, t.getOrThrow)(e.subdirectories, "arrayUniquer"),
              s = (0, t.getOrThrow)(n.files, "integeruniquer.index"),
              i = (0, t.getOrThrow)(n.files, "integeruniquer.data"),
              o = new h(yield c(s)),
              a = new h(yield c(i));
            o.seek(32);
            let l = [];
            for (; o.hasMore(); ) {
              const e = o.readUint32() + 1048576 * o.readUint32();
              if (0 === e) continue;
              a.seek(e);
              let t = a.readUint32(),
                r = [];
              for (; t--; ) r.push(a.readUint64());
              l.push(r);
            }
            return l;
          });
        }
        function m(e) {
          return s(this, void 0, void 0, function* () {
            const r = (0, t.getOrThrow)(e.files, "form.template"),
              n = y(yield c(r)),
              s = n["com.apple.xray.owner.template.version"];
            let i = 1;
            "com.apple.xray.owner.template" in n &&
              (i =
                n["com.apple.xray.owner.template"].get("_selectedRunNumber"));
            let o = n.$1;
            "stubInfoByUUID" in n &&
              (o = Array.from(n.stubInfoByUUID.keys())[0]);
            const a = n["com.apple.xray.run.data"],
              l = [];
            for (let e of a.runNumbers) {
              const r = (0, t.getOrThrow)(a.runData, e),
                n = (0, t.getOrThrow)(r, "symbolsByPid"),
                s = new Map();
              for (let i of n.values()) {
                for (let e of i.symbols) {
                  if (!e) continue;
                  const { sourcePath: r, symbolName: n, addressToLine: i } = e;
                  for (let e of i.keys())
                    (0, t.getOrInsert)(s, e, () => {
                      const s = n || `0x${(0, t.zeroPad)(e.toString(16), 16)}`,
                        i = { key: `${r}:${s}`, name: s };
                      return r && (i.file = r), i;
                    });
                }
                l.push({ number: e, addressToFrameMap: s });
              }
            }
            return { version: s, instrument: o, selectedRunNumber: i, runs: l };
          });
        }
        function w(e) {
          return s(this, void 0, void 0, function* () {
            const t = yield l(e),
              {
                version: r,
                runs: n,
                instrument: s,
                selectedRunNumber: i,
              } = yield m(t);
            if ("com.apple.xray.instrument-type.coresampler2" !== s)
              throw new Error(
                `The only supported instrument from .trace import is "com.apple.xray.instrument-type.coresampler2". Got ${s}`
              );
            console.log("version: ", r), console.log("Importing time profile");
            const o = [];
            let a = 0;
            for (let l of n) {
              const { addressToFrameMap: r, number: n } = l,
                s = yield g({
                  fileName: e.name,
                  tree: t,
                  addressToFrameMap: r,
                  runNumber: n,
                });
              l.number === i && (a = o.length + s.indexToView),
                o.push(...s.profiles);
            }
            return { name: e.name, indexToView: a, profiles: o };
          });
        }
        function g(e) {
          return s(this, void 0, void 0, function* () {
            const {
                fileName: r,
                tree: n,
                addressToFrameMap: s,
                runNumber: i,
              } = e,
              o = f(n, i);
            let a = yield p(o);
            const l = yield d(a, o),
              c = new Map();
            for (let e of a)
              c.set(e.threadID, (0, t.getOrElse)(c, e.threadID, () => 0) + 1);
            const u = Array.from(c.entries());
            (0, t.sortBy)(u, (e) => -e[1]);
            const h = u.map((e) => e[0]);
            return {
              name: r,
              indexToView: 0,
              profiles: h.map((e) =>
                b({
                  threadID: e,
                  fileName: r,
                  arrays: l,
                  addressToFrameMap: s,
                  samples: a,
                })
              ),
            };
          });
        }
        function b(n) {
          let {
            fileName: s,
            addressToFrameMap: i,
            arrays: o,
            threadID: a,
            samples: l,
          } = n;
          const c = new Map();
          l = l.filter((e) => e.threadID === a);
          const u = new e.StackListProfileBuilder((0, t.lastOf)(l).timestamp);
          function f(e, r) {
            const n = i.get(e);
            if (n) r.push(n);
            else if (e in o) for (let t of o[e]) f(t, r);
            else {
              const n = {
                key: e,
                name: `0x${(0, t.zeroPad)(e.toString(16), 16)}`,
              };
              i.set(e, n), r.push(n);
            }
          }
          u.setName(`${s} - thread ${a}`);
          let h = null;
          for (let e of l) {
            const r = (0, t.getOrInsert)(c, e.backtraceID, (e) => {
              const t = [];
              return f(e, t), t.reverse(), t;
            });
            if (
              (null === h &&
                (u.appendSampleWithWeight([], e.timestamp), (h = e.timestamp)),
              e.timestamp < h)
            )
              throw new Error("Timestamps out of order!");
            u.appendSampleWithWeight(r, e.timestamp - h), (h = e.timestamp);
          }
          return (
            u.setValueFormatter(new r.TimeFormatter("nanoseconds")), u.build()
          );
        }
        function y(e) {
          return T(I(new Uint8Array(e)), (e, t) => {
            switch (e) {
              case "NSTextStorage":
              case "NSParagraphStyle":
              case "NSFont":
                return null;
              case "PFTSymbolData": {
                const e = Object.create(null);
                (e.symbolName = t.$0),
                  (e.sourcePath = t.$1),
                  (e.addressToLine = new Map());
                for (let r = 3; ; r += 2) {
                  const n = t["$" + r],
                    s = t["$" + (r + 1)];
                  if (null == n || null == s) break;
                  e.addressToLine.set(n, s);
                }
                return e;
              }
              case "PFTOwnerData": {
                const e = Object.create(null);
                return (e.ownerName = t.$0), (e.ownerPath = t.$1), e;
              }
              case "PFTPersistentSymbols": {
                const e = Object.create(null),
                  r = t.$4;
                (e.threadNames = t.$3), (e.symbols = []);
                for (let n = 1; n < r; n++) e.symbols.push(t["$" + (4 + n)]);
                return e;
              }
              case "XRRunListData": {
                const e = Object.create(null);
                return (e.runNumbers = t.$0), (e.runData = t.$1), e;
              }
              case "XRIntKeyedDictionary": {
                const e = new Map(),
                  r = t.$0;
                for (let n = 0; n < r; n++) {
                  const r = t["$" + (1 + 2 * n)],
                    s = t["$" + (2 * n + 1 + 1)];
                  e.set(r, s);
                }
                return e;
              }
              case "XRCore": {
                const e = Object.create(null);
                return (e.number = t.$0), (e.name = t.$1), e;
              }
            }
            return t;
          });
        }
        function v(e) {
          let t = String.fromCharCode.apply(String, Array.from(e));
          return (
            "\0" === t.slice(-1) && (t = t.slice(0, -1)),
            decodeURIComponent(escape(t))
          );
        }
        function U(e) {
          return e instanceof Array;
        }
        function S(e) {
          return (
            null !== e &&
            "object" == typeof e &&
            null === Object.getPrototypeOf(e)
          );
        }
        function N(e, t) {
          return t instanceof x ? e[t.index] : t;
        }
        function T(e, t = (e) => e) {
          if (
            1e5 !== e.$version ||
            "NSKeyedArchiver" !== e.$archiver ||
            !S(e.$top) ||
            !U(e.$objects)
          )
            throw new Error("Invalid keyed archive");
          "$null" === e.$objects[0] && (e.$objects[0] = null);
          for (let n = 0; n < e.$objects.length; n++)
            e.$objects[n] = $(e.$objects, e.$objects[n], t);
          let r = (t) => {
            if (t instanceof x) return e.$objects[t.index];
            if (U(t)) for (let e = 0; e < t.length; e++) t[e] = r(t[e]);
            else if (S(t)) for (let e in t) t[e] = r(t[e]);
            else if (t instanceof Map) {
              const e = new Map(t);
              t.clear();
              for (let [n, s] of e.entries()) t.set(r(n), r(s));
            }
            return t;
          };
          for (let n = 0; n < e.$objects.length; n++) r(e.$objects[n]);
          return r(e.$top);
        }
        function $(e, t, r = (e) => e) {
          if (S(t) && t.$class) {
            let n = N(e, t.$class).$classname;
            switch (n) {
              case "NSDecimalNumberPlaceholder": {
                let e = t["NS.length"],
                  r = t["NS.exponent"],
                  n = t["NS.mantissa.bo"],
                  s = t["NS.negative"],
                  i = new Uint16Array(new Uint8Array(t["NS.mantissa"]).buffer),
                  o = 0;
                for (let t = 0; t < e; t++) {
                  let e = i[t];
                  1 !== n && (e = ((65280 & e) >> 8) | ((255 & e) << 8)),
                    (o += e * Math.pow(65536, t));
                }
                return (o *= Math.pow(10, r)), s ? -o : o;
              }
              case "NSData":
              case "NSMutableData":
                return t["NS.bytes"] || t["NS.data"];
              case "NSString":
              case "NSMutableString":
                return t["NS.string"]
                  ? t["NS.string"]
                  : t["NS.bytes"]
                  ? v(t["NS.bytes"])
                  : (console.warn(`Unexpected ${n} format: `, t), null);
              case "NSArray":
              case "NSMutableArray":
                if ("NS.objects" in t) return t["NS.objects"];
                let e = [];
                for (;;) {
                  let r = "NS.object." + e.length;
                  if (!(r in t)) break;
                  e.push(t[r]);
                }
                return e;
              case "_NSKeyedCoderOldStyleArray": {
                const e = t["NS.count"];
                let r = [];
                for (let n = 0; n < e; n++) {
                  const e = t["$" + n];
                  r.push(e);
                }
                return r;
              }
              case "NSDictionary":
              case "NSMutableDictionary":
                let s = new Map();
                if ("NS.keys" in t && "NS.objects" in t)
                  for (let r = 0; r < t["NS.keys"].length; r++)
                    s.set(t["NS.keys"][r], t["NS.objects"][r]);
                else
                  for (;;) {
                    let e = "NS.key." + s.size,
                      r = "NS.object." + s.size;
                    if (!(e in t && r in t)) break;
                    s.set(t[e], t[r]);
                  }
                return s;
              default:
                const i = r(n, t);
                if (i !== t) return i;
            }
          }
          return t;
        }
        class x {
          constructor(e) {
            this.index = e;
          }
        }
        function I(e) {
          for (let t = 0; t < 8; t++)
            if (e[t] !== "bplist00".charCodeAt(t))
              throw new Error("File is not a binary plist");
          return new P(
            new DataView(e.buffer, e.byteOffset, e.byteLength)
          ).parseRoot();
        }
        exports.UID = x;
        class P {
          constructor(e) {
            (this.view = e),
              (this.referenceSize = 0),
              (this.objects = []),
              (this.offsetTable = []);
          }
          parseRoot() {
            let e = this.view.byteLength - 32,
              t = this.view.getUint8(e + 6);
            this.referenceSize = this.view.getUint8(e + 7);
            let r = this.view.getUint32(e + 12, !1),
              n = this.view.getUint32(e + 20, !1),
              s = this.view.getUint32(e + 28, !1);
            for (let i = 0; i < r; i++)
              this.offsetTable.push(this.parseInteger(s, t)), (s += t);
            return this.parseObject(this.offsetTable[n]);
          }
          parseLengthAndOffset(e, t) {
            if (15 !== t) return { length: t, offset: 0 };
            let r = this.view.getUint8(e++);
            if (16 != (240 & r))
              throw new Error("Unexpected non-integer length at offset " + e);
            let n = 1 << (15 & r);
            return { length: this.parseInteger(e, n), offset: n + 1 };
          }
          parseSingleton(e, t) {
            if (0 === t) return null;
            if (8 === t) return !1;
            if (9 === t) return !0;
            throw new Error("Unexpected extra value " + t + " at offset " + e);
          }
          parseInteger(e, t) {
            if (1 === t) return this.view.getUint8(e);
            if (2 === t) return this.view.getUint16(e, !1);
            if (4 === t) return this.view.getUint32(e, !1);
            if (8 === t)
              return (
                Math.pow(2, 32) * this.view.getUint32(e + 0, !1) +
                Math.pow(2, 0) * this.view.getUint32(e + 4, !1)
              );
            if (16 === t)
              return (
                Math.pow(2, 96) * this.view.getUint32(e + 0, !1) +
                Math.pow(2, 64) * this.view.getUint32(e + 4, !1) +
                Math.pow(2, 32) * this.view.getUint32(e + 8, !1) +
                Math.pow(2, 0) * this.view.getUint32(e + 12, !1)
              );
            throw new Error(
              "Unexpected integer of size " + t + " at offset " + e
            );
          }
          parseFloat(e, t) {
            if (4 === t) return this.view.getFloat32(e, !1);
            if (8 === t) return this.view.getFloat64(e, !1);
            throw new Error(
              "Unexpected float of size " + t + " at offset " + e
            );
          }
          parseDate(e, t) {
            if (8 !== t)
              throw new Error(
                "Unexpected date of size " + t + " at offset " + e
              );
            let r = this.view.getFloat64(e, !1);
            return new Date(9783072e5 + 1e3 * r);
          }
          parseData(e, t) {
            let r = this.parseLengthAndOffset(e, t);
            return new Uint8Array(this.view.buffer, e + r.offset, r.length);
          }
          parseStringASCII(e, t) {
            let r = this.parseLengthAndOffset(e, t),
              n = "";
            e += r.offset;
            for (let s = 0; s < r.length; s++)
              n += String.fromCharCode(this.view.getUint8(e++));
            return n;
          }
          parseStringUTF16(e, t) {
            let r = this.parseLengthAndOffset(e, t),
              n = "";
            e += r.offset;
            for (let s = 0; s < r.length; s++)
              (n += String.fromCharCode(this.view.getUint16(e, !1))), (e += 2);
            return n;
          }
          parseUID(e, t) {
            return new x(this.parseInteger(e, t));
          }
          parseArray(e, t) {
            let r = this.parseLengthAndOffset(e, t),
              n = [],
              s = this.referenceSize;
            e += r.offset;
            for (let i = 0; i < r.length; i++)
              n.push(
                this.parseObject(this.offsetTable[this.parseInteger(e, s)])
              ),
                (e += s);
            return n;
          }
          parseDictionary(e, t) {
            let r = this.parseLengthAndOffset(e, t),
              n = Object.create(null),
              s = this.referenceSize,
              i = e + r.offset,
              o = i + r.length * s;
            for (let a = 0; a < r.length; a++) {
              let e = this.parseObject(
                  this.offsetTable[this.parseInteger(i, s)]
                ),
                t = this.parseObject(this.offsetTable[this.parseInteger(o, s)]);
              if ("string" != typeof e)
                throw new Error("Unexpected non-string key at offset " + i);
              (n[e] = t), (i += s), (o += s);
            }
            return n;
          }
          parseObject(e) {
            let t = this.view.getUint8(e++),
              r = 15 & t;
            switch (t >> 4) {
              case 0:
                return this.parseSingleton(e, r);
              case 1:
                return this.parseInteger(e, 1 << r);
              case 2:
                return this.parseFloat(e, 1 << r);
              case 3:
                return this.parseDate(e, 1 << r);
              case 4:
                return this.parseData(e, r);
              case 5:
                return this.parseStringASCII(e, r);
              case 6:
                return this.parseStringUTF16(e, r);
              case 8:
                return this.parseUID(e, r + 1);
              case 10:
                return this.parseArray(e, r);
              case 13:
                return this.parseDictionary(e, r);
            }
            throw new Error("Unexpected marker " + t + " at offset " + --e);
          }
        }
      },
      {
        "../lib/profile": "YG8z",
        "../lib/utils": "ucYa",
        "../lib/value-formatters": "LsM4",
        "./utils": "QTYz",
      },
    ],
    flbo: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.importFromBGFlameGraph = t);
        var e = require("../lib/profile");
        function r(e) {
          const r = [];
          return (
            e.replace(
              /^(.*) (\d+)$/gm,
              (e, t, i) => (
                r.push({
                  stack: t.split(";").map((e) => ({ key: e, name: e })),
                  duration: parseInt(i, 10),
                }),
                e
              )
            ),
            r
          );
        }
        function t(t) {
          const i = r(t),
            n = i.reduce((e, r) => e + r.duration, 0),
            o = new e.StackListProfileBuilder(n);
          if (0 === i.length) return null;
          for (let e of i) o.appendSampleWithWeight(e.stack, e.duration);
          return o.build();
        }
      },
      { "../lib/profile": "YG8z" },
    ],
    uNW1: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.importFromFirefox = l);
        var e = require("../lib/profile"),
          t = require("../lib/utils"),
          r = require("../lib/value-formatters");
        function l(l) {
          const n = l.profile,
            s =
              1 === n.threads.length
                ? n.threads[0]
                : n.threads.filter((e) => "GeckoMain" === e.name)[0],
            a = new Map();
          function o(e) {
            let r = e[0];
            const l = [];
            for (; null != r; ) {
              const e = s.stackTable.data[r],
                [t, n] = e;
              l.push(n), (r = t);
            }
            return (
              l.reverse(),
              l
                .map((e) => {
                  const r = s.frameTable.data[e],
                    l = s.stringTable[r[0]],
                    n = /(.*)\s+\((.*?)(?::(\d+))?(?::(\d+))?\)$/.exec(l);
                  return n
                    ? n[2].startsWith("resource:") ||
                      "self-hosted" === n[2] ||
                      n[2].startsWith("self-hosted:")
                      ? null
                      : (0, t.getOrInsert)(a, l, () => ({
                          key: l,
                          name: n[1],
                          file: n[2],
                          line: n[3] ? parseInt(n[3]) : void 0,
                          col: n[4] ? parseInt(n[4]) + 1 : void 0,
                        }))
                    : null;
                })
                .filter((e) => null != e)
            );
          }
          const i = new e.CallTreeProfileBuilder(l.duration);
          let u = [];
          for (let e of s.samples.data) {
            const t = o(e),
              r = e[1];
            let l = -1;
            for (
              let e = 0;
              e < Math.min(t.length, u.length) && u[e] === t[e];
              e++
            )
              l = e;
            for (let e = u.length - 1; e > l; e--) i.leaveFrame(u[e], r);
            for (let e = l + 1; e < t.length; e++) i.enterFrame(t[e], r);
            u = t;
          }
          return (
            i.setValueFormatter(new r.TimeFormatter("milliseconds")), i.build()
          );
        }
      },
      {
        "../lib/profile": "YG8z",
        "../lib/utils": "ucYa",
        "../lib/value-formatters": "LsM4",
      },
    ],
    QV03: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.importFromV8ProfLog = n);
        var e = require("../lib/profile"),
          t = require("../lib/utils"),
          r = require("../lib/value-formatters");
        function a(e, t) {
          if (!e || !e.type)
            return { key: "(unknown type)", name: "(unknown type)" };
          let r = e.name;
          switch (e.type) {
            case "CPP": {
              const e = r.match(/[tT] ([^(<]*)/);
              e && (r = `(c++) ${e[1]}`);
              break;
            }
            case "SHARED_LIB":
              r = "(LIB) " + r;
              break;
            case "JS": {
              const e = r.match(
                /([a-zA-Z0-9\._\-$]*) ([a-zA-Z0-9\.\-_\/$]*):(\d+):(\d+)/
              );
              if (e)
                return {
                  key: r,
                  name: e[1].length > 0 ? e[1] : "(anonymous)",
                  file: e[2].length > 0 ? e[2] : "(unknown file)",
                  line: parseInt(e[3], 10),
                  col: parseInt(e[4], 10),
                };
              break;
            }
            case "CODE":
              switch (e.kind) {
                case "LoadIC":
                case "StoreIC":
                case "KeyedStoreIC":
                case "KeyedLoadIC":
                case "LoadGlobalIC":
                case "Handler":
                  r = "(IC) " + r;
                  break;
                case "BytecodeHandler":
                  r = "(bytecode) ~" + r;
                  break;
                case "Stub":
                  r = "(stub) " + r;
                  break;
                case "Builtin":
                  r = "(builtin) " + r;
                  break;
                case "RegExp":
                  r = "(regexp) " + r;
              }
              break;
            default:
              r = `(${e.type}) ${r}`;
          }
          return { key: r, name: r };
        }
        function n(n) {
          const s = new e.StackListProfileBuilder(),
            o = new Map();
          let c = 0;
          (0, t.sortBy)(n.ticks, (e) => e.tm);
          for (let e of n.ticks) {
            const r = [];
            for (let s = e.s.length - 2; s >= 0; s -= 2) {
              const c = e.s[s];
              -1 !== c &&
                (c > n.code.length
                  ? r.push({ key: c, name: `0x${c.toString(16)}` })
                  : r.push(
                      ((i = c),
                      (0, t.getOrInsert)(o, i, (e) => a(n.code[e], n)))
                    ));
            }
            s.appendSampleWithWeight(r, e.tm - c), (c = e.tm);
          }
          var i;
          return (
            s.setValueFormatter(new r.TimeFormatter("microseconds")), s.build()
          );
        }
      },
      {
        "../lib/profile": "YG8z",
        "../lib/utils": "ucYa",
        "../lib/value-formatters": "LsM4",
      },
    ],
    f2sa: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.importFromLinuxPerf = r);
        var e = require("../lib/profile"),
          t = require("../lib/utils"),
          n = require("../lib/value-formatters");
        function s(e) {
          const t = e.split("\n").filter((e) => !/^\s*#/.exec(e)),
            n = {
              command: null,
              processID: null,
              threadID: null,
              time: null,
              eventType: "",
              stack: [],
            },
            s = t.shift();
          if (!s) return null;
          const r = /^(\S.+?)\s+(\d+)(?:\/?(\d+))?\s+/.exec(s);
          if (!r) return null;
          (n.command = r[1]),
            r[3]
              ? ((n.processID = parseInt(r[2], 10)),
                (n.threadID = parseInt(r[3], 10)))
              : (n.threadID = parseInt(r[2], 10));
          const l = /\s+(\d+\.\d+):\s+/.exec(s);
          l && (n.time = parseFloat(l[1]));
          const i = /(\S+):\s*$/.exec(s);
          i && (n.eventType = i[1]);
          for (let o of t) {
            const e = /^\s*(\w+)\s*(.+) \((\S*)\)/.exec(o);
            if (!e) continue;
            let [, t, s, r] = e;
            (s = s.replace(/\+0x[\da-f]+$/, "")),
              n.stack.push({ address: `0x${t}`, symbolName: s, file: r });
          }
          return n.stack.reverse(), n;
        }
        function r(r) {
          const l = new Map();
          let i = null;
          const o = r.split("\n\n").map(s);
          for (let s of o) {
            if (null == s) continue;
            if (null != i && i != s.eventType) continue;
            if (null == s.time) continue;
            i = s.eventType;
            let r = [];
            s.command && r.push(s.command),
              s.processID && r.push(`pid: ${s.processID}`),
              s.threadID && r.push(`tid: ${s.threadID}`);
            const o = r.join(" ");
            (0, t.getOrInsert)(l, o, () => {
              const t = new e.StackListProfileBuilder();
              return (
                t.setName(o),
                t.setValueFormatter(new n.TimeFormatter("seconds")),
                t
              );
            }).appendSampleWithTimestamp(
              s.stack.map(({ symbolName: e, file: t }) => ({
                key: `${e} (${t})`,
                name: "[unknown]" === e ? `??? (${t})` : e,
                file: t,
              })),
              s.time
            );
          }
          return 0 === l.size
            ? null
            : {
                name: 1 === l.size ? Array.from(l.keys())[0] : "",
                indexToView: 0,
                profiles: Array.from(
                  (0, t.itMap)(l.values(), (e) => e.build())
                ),
              };
        }
      },
      {
        "../lib/profile": "YG8z",
        "../lib/utils": "ucYa",
        "../lib/value-formatters": "LsM4",
      },
    ],
    jm73: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.importFromHaskell = l);
        var e = require("../lib/profile"),
          r = require("../lib/value-formatters");
        function t(e, r, l, o, i) {
          if (
            0 === e.ticks &&
            0 === e.entries &&
            0 === e.alloc &&
            0 === e.children.length
          )
            return r;
          let a = r,
            s = o.get(e.id);
          l.enterFrame(s, a);
          for (let n of e.children) a = t(n, a, l, o, i);
          return (a += i(e)), l.leaveFrame(s, a), a;
        }
        function l(l) {
          const o = new Map();
          for (let e of l.cost_centres) {
            const r = { key: e.id, name: `${e.module}.${e.label}` };
            e.src_loc.startsWith("<") || (r.file = e.src_loc), o.set(e.id, r);
          }
          const i = new e.CallTreeProfileBuilder(l.total_ticks);
          t(l.profile, 0, i, o, (e) => e.ticks),
            i.setValueFormatter(new r.TimeFormatter("milliseconds")),
            i.setName(`${l.program} time`);
          const a = new e.CallTreeProfileBuilder(l.total_ticks);
          return (
            t(l.profile, 0, a, o, (e) => e.alloc),
            a.setValueFormatter(new r.ByteFormatter()),
            a.setName(`${l.program} allocation`),
            {
              name: l.program,
              indexToView: 0,
              profiles: [i.build(), a.build()],
            }
          );
        }
      },
      { "../lib/profile": "YG8z", "../lib/value-formatters": "LsM4" },
    ],
    jP3w: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.importFromSafari = i);
        var e = require("../lib/profile"),
          r = require("../lib/value-formatters");
        function t(e) {
          return e
            .map(({ name: e, url: r, line: t, column: i }) => ({
              key: `${e}:${r}:${t}:${i}`,
              file: r,
              line: t,
              col: i,
              name: e || "(anonymous)",
            }))
            .reverse();
        }
        function i(i) {
          1 !== i.version &&
            console.warn(
              `Unknown Safari profile version ${i.version}... Might be incompatible.`
            );
          const { recording: n } = i,
            { sampleStackTraces: a, sampleDurations: o } = n,
            s = a.length;
          if (s < 1) return console.warn("Empty profile"), null;
          const l = a[s - 1].timestamp - a[0].timestamp + o[0],
            m = new e.StackListProfileBuilder(l);
          let p = Number.MAX_VALUE;
          return (
            a.forEach((e, r) => {
              const i = e.timestamp,
                n = o[r],
                a = i - n - p;
              a > 0.002 && m.appendSampleWithWeight([], a),
                m.appendSampleWithWeight(t(e.stackFrames), n),
                (p = i);
            }),
            m.setValueFormatter(new r.TimeFormatter("seconds")),
            m.setName(n.displayName),
            m.build()
          );
        }
      },
      { "../lib/profile": "YG8z", "../lib/value-formatters": "LsM4" },
    ],
    oU4k: [
      function (require, module, exports) {
        "use strict";
        function n(n, e) {
          for (
            var r = new Array(arguments.length - 1), t = 0, l = 2, o = !0;
            l < arguments.length;

          )
            r[t++] = arguments[l++];
          return new Promise(function (l, u) {
            r[t] = function (n) {
              if (o)
                if (((o = !1), n)) u(n);
                else {
                  for (
                    var e = new Array(arguments.length - 1), r = 0;
                    r < e.length;

                  )
                    e[r++] = arguments[r];
                  l.apply(null, e);
                }
            };
            try {
              n.apply(e || null, r);
            } catch (a) {
              o && ((o = !1), u(a));
            }
          });
        }
        module.exports = n;
      },
      {},
    ],
    SASd: [
      function (require, module, exports) {
        "use strict";
        var r = exports;
        r.length = function (r) {
          var e = r.length;
          if (!e) return 0;
          for (var a = 0; --e % 4 > 1 && "=" === r.charAt(e); ) ++a;
          return Math.ceil(3 * r.length) / 4 - a;
        };
        for (var e = new Array(64), a = new Array(123), t = 0; t < 64; )
          a[
            (e[t] =
              t < 26
                ? t + 65
                : t < 52
                ? t + 71
                : t < 62
                ? t - 4
                : (t - 59) | 43)
          ] = t++;
        r.encode = function (r, a, t) {
          for (var n, i = null, o = [], c = 0, s = 0; a < t; ) {
            var h = r[a++];
            switch (s) {
              case 0:
                (o[c++] = e[h >> 2]), (n = (3 & h) << 4), (s = 1);
                break;
              case 1:
                (o[c++] = e[n | (h >> 4)]), (n = (15 & h) << 2), (s = 2);
                break;
              case 2:
                (o[c++] = e[n | (h >> 6)]), (o[c++] = e[63 & h]), (s = 0);
            }
            c > 8191 &&
              ((i || (i = [])).push(String.fromCharCode.apply(String, o)),
              (c = 0));
          }
          return (
            s && ((o[c++] = e[n]), (o[c++] = 61), 1 === s && (o[c++] = 61)),
            i
              ? (c && i.push(String.fromCharCode.apply(String, o.slice(0, c))),
                i.join(""))
              : String.fromCharCode.apply(String, o.slice(0, c))
          );
        };
        var n = "invalid encoding";
        (r.decode = function (r, e, t) {
          for (var i, o = t, c = 0, s = 0; s < r.length; ) {
            var h = r.charCodeAt(s++);
            if (61 === h && c > 1) break;
            if (void 0 === (h = a[h])) throw Error(n);
            switch (c) {
              case 0:
                (i = h), (c = 1);
                break;
              case 1:
                (e[t++] = (i << 2) | ((48 & h) >> 4)), (i = h), (c = 2);
                break;
              case 2:
                (e[t++] = ((15 & i) << 4) | ((60 & h) >> 2)), (i = h), (c = 3);
                break;
              case 3:
                (e[t++] = ((3 & i) << 6) | h), (c = 0);
            }
          }
          if (1 === c) throw Error(n);
          return t - o;
        }),
          (r.test = function (r) {
            return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
              r
            );
          });
      },
      {},
    ],
    wJQW: [
      function (require, module, exports) {
        "use strict";
        function t() {
          this._listeners = {};
        }
        (module.exports = t),
          (t.prototype.on = function (t, s, e) {
            return (
              (this._listeners[t] || (this._listeners[t] = [])).push({
                fn: s,
                ctx: e || this,
              }),
              this
            );
          }),
          (t.prototype.off = function (t, s) {
            if (void 0 === t) this._listeners = {};
            else if (void 0 === s) this._listeners[t] = [];
            else
              for (var e = this._listeners[t], i = 0; i < e.length; )
                e[i].fn === s ? e.splice(i, 1) : ++i;
            return this;
          }),
          (t.prototype.emit = function (t) {
            var s = this._listeners[t];
            if (s) {
              for (var e = [], i = 1; i < arguments.length; )
                e.push(arguments[i++]);
              for (i = 0; i < s.length; ) s[i].fn.apply(s[i++].ctx, e);
            }
            return this;
          });
      },
      {},
    ],
    SGHJ: [
      function (require, module, exports) {
        "use strict";
        function n(n) {
          return (
            "undefined" != typeof Float32Array
              ? (function () {
                  var e = new Float32Array([-0]),
                    t = new Uint8Array(e.buffer),
                    r = 128 === t[3];
                  function o(n, r, o) {
                    (e[0] = n),
                      (r[o] = t[0]),
                      (r[o + 1] = t[1]),
                      (r[o + 2] = t[2]),
                      (r[o + 3] = t[3]);
                  }
                  function u(n, r, o) {
                    (e[0] = n),
                      (r[o] = t[3]),
                      (r[o + 1] = t[2]),
                      (r[o + 2] = t[1]),
                      (r[o + 3] = t[0]);
                  }
                  function i(n, r) {
                    return (
                      (t[0] = n[r]),
                      (t[1] = n[r + 1]),
                      (t[2] = n[r + 2]),
                      (t[3] = n[r + 3]),
                      e[0]
                    );
                  }
                  function a(n, r) {
                    return (
                      (t[3] = n[r]),
                      (t[2] = n[r + 1]),
                      (t[1] = n[r + 2]),
                      (t[0] = n[r + 3]),
                      e[0]
                    );
                  }
                  (n.writeFloatLE = r ? o : u),
                    (n.writeFloatBE = r ? u : o),
                    (n.readFloatLE = r ? i : a),
                    (n.readFloatBE = r ? a : i);
                })()
              : (function () {
                  function u(n, e, t, r) {
                    var o = e < 0 ? 1 : 0;
                    if ((o && (e = -e), 0 === e))
                      n(1 / e > 0 ? 0 : 2147483648, t, r);
                    else if (isNaN(e)) n(2143289344, t, r);
                    else if (e > 3.4028234663852886e38)
                      n(((o << 31) | 2139095040) >>> 0, t, r);
                    else if (e < 1.1754943508222875e-38)
                      n(
                        ((o << 31) | Math.round(e / 1.401298464324817e-45)) >>>
                          0,
                        t,
                        r
                      );
                    else {
                      var u = Math.floor(Math.log(e) / Math.LN2);
                      n(
                        ((o << 31) |
                          ((u + 127) << 23) |
                          (8388607 &
                            Math.round(e * Math.pow(2, -u) * 8388608))) >>>
                          0,
                        t,
                        r
                      );
                    }
                  }
                  function i(n, e, t) {
                    var r = n(e, t),
                      o = 2 * (r >> 31) + 1,
                      u = (r >>> 23) & 255,
                      i = 8388607 & r;
                    return 255 === u
                      ? i
                        ? NaN
                        : o * (1 / 0)
                      : 0 === u
                      ? 1.401298464324817e-45 * o * i
                      : o * Math.pow(2, u - 150) * (i + 8388608);
                  }
                  (n.writeFloatLE = u.bind(null, e)),
                    (n.writeFloatBE = u.bind(null, t)),
                    (n.readFloatLE = i.bind(null, r)),
                    (n.readFloatBE = i.bind(null, o));
                })(),
            "undefined" != typeof Float64Array
              ? (function () {
                  var e = new Float64Array([-0]),
                    t = new Uint8Array(e.buffer),
                    r = 128 === t[7];
                  function o(n, r, o) {
                    (e[0] = n),
                      (r[o] = t[0]),
                      (r[o + 1] = t[1]),
                      (r[o + 2] = t[2]),
                      (r[o + 3] = t[3]),
                      (r[o + 4] = t[4]),
                      (r[o + 5] = t[5]),
                      (r[o + 6] = t[6]),
                      (r[o + 7] = t[7]);
                  }
                  function u(n, r, o) {
                    (e[0] = n),
                      (r[o] = t[7]),
                      (r[o + 1] = t[6]),
                      (r[o + 2] = t[5]),
                      (r[o + 3] = t[4]),
                      (r[o + 4] = t[3]),
                      (r[o + 5] = t[2]),
                      (r[o + 6] = t[1]),
                      (r[o + 7] = t[0]);
                  }
                  function i(n, r) {
                    return (
                      (t[0] = n[r]),
                      (t[1] = n[r + 1]),
                      (t[2] = n[r + 2]),
                      (t[3] = n[r + 3]),
                      (t[4] = n[r + 4]),
                      (t[5] = n[r + 5]),
                      (t[6] = n[r + 6]),
                      (t[7] = n[r + 7]),
                      e[0]
                    );
                  }
                  function a(n, r) {
                    return (
                      (t[7] = n[r]),
                      (t[6] = n[r + 1]),
                      (t[5] = n[r + 2]),
                      (t[4] = n[r + 3]),
                      (t[3] = n[r + 4]),
                      (t[2] = n[r + 5]),
                      (t[1] = n[r + 6]),
                      (t[0] = n[r + 7]),
                      e[0]
                    );
                  }
                  (n.writeDoubleLE = r ? o : u),
                    (n.writeDoubleBE = r ? u : o),
                    (n.readDoubleLE = r ? i : a),
                    (n.readDoubleBE = r ? a : i);
                })()
              : (function () {
                  function u(n, e, t, r, o, u) {
                    var i = r < 0 ? 1 : 0;
                    if ((i && (r = -r), 0 === r))
                      n(0, o, u + e), n(1 / r > 0 ? 0 : 2147483648, o, u + t);
                    else if (isNaN(r)) n(0, o, u + e), n(2146959360, o, u + t);
                    else if (r > 1.7976931348623157e308)
                      n(0, o, u + e),
                        n(((i << 31) | 2146435072) >>> 0, o, u + t);
                    else {
                      var a;
                      if (r < 2.2250738585072014e-308)
                        n((a = r / 5e-324) >>> 0, o, u + e),
                          n(((i << 31) | (a / 4294967296)) >>> 0, o, u + t);
                      else {
                        var l = Math.floor(Math.log(r) / Math.LN2);
                        1024 === l && (l = 1023),
                          n(
                            (4503599627370496 * (a = r * Math.pow(2, -l))) >>>
                              0,
                            o,
                            u + e
                          ),
                          n(
                            ((i << 31) |
                              ((l + 1023) << 20) |
                              ((1048576 * a) & 1048575)) >>>
                              0,
                            o,
                            u + t
                          );
                      }
                    }
                  }
                  function i(n, e, t, r, o) {
                    var u = n(r, o + e),
                      i = n(r, o + t),
                      a = 2 * (i >> 31) + 1,
                      l = (i >>> 20) & 2047,
                      f = 4294967296 * (1048575 & i) + u;
                    return 2047 === l
                      ? f
                        ? NaN
                        : a * (1 / 0)
                      : 0 === l
                      ? 5e-324 * a * f
                      : a * Math.pow(2, l - 1075) * (f + 4503599627370496);
                  }
                  (n.writeDoubleLE = u.bind(null, e, 0, 4)),
                    (n.writeDoubleBE = u.bind(null, t, 4, 0)),
                    (n.readDoubleLE = i.bind(null, r, 0, 4)),
                    (n.readDoubleBE = i.bind(null, o, 4, 0));
                })(),
            n
          );
        }
        function e(n, e, t) {
          (e[t] = 255 & n),
            (e[t + 1] = (n >>> 8) & 255),
            (e[t + 2] = (n >>> 16) & 255),
            (e[t + 3] = n >>> 24);
        }
        function t(n, e, t) {
          (e[t] = n >>> 24),
            (e[t + 1] = (n >>> 16) & 255),
            (e[t + 2] = (n >>> 8) & 255),
            (e[t + 3] = 255 & n);
        }
        function r(n, e) {
          return (
            (n[e] | (n[e + 1] << 8) | (n[e + 2] << 16) | (n[e + 3] << 24)) >>> 0
          );
        }
        function o(n, e) {
          return (
            ((n[e] << 24) | (n[e + 1] << 16) | (n[e + 2] << 8) | n[e + 3]) >>> 0
          );
        }
        module.exports = n(n);
      },
      {},
    ],
    XRF3: [
      function (require, module, exports) {
        "use strict";
        function inquire(moduleName) {
          try {
            var mod = eval("quire".replace(/^/, "re"))(moduleName);
            if (mod && (mod.length || Object.keys(mod).length)) return mod;
          } catch (e) {}
          return null;
        }
        module.exports = inquire;
      },
      {},
    ],
    nie5: [
      function (require, module, exports) {
        "use strict";
        var r = exports;
        (r.length = function (r) {
          for (var t = 0, n = 0, e = 0; e < r.length; ++e)
            (n = r.charCodeAt(e)) < 128
              ? (t += 1)
              : n < 2048
              ? (t += 2)
              : 55296 == (64512 & n) && 56320 == (64512 & r.charCodeAt(e + 1))
              ? (++e, (t += 4))
              : (t += 3);
          return t;
        }),
          (r.read = function (r, t, n) {
            if (n - t < 1) return "";
            for (var e, o = null, a = [], i = 0; t < n; )
              (e = r[t++]) < 128
                ? (a[i++] = e)
                : e > 191 && e < 224
                ? (a[i++] = ((31 & e) << 6) | (63 & r[t++]))
                : e > 239 && e < 365
                ? ((e =
                    (((7 & e) << 18) |
                      ((63 & r[t++]) << 12) |
                      ((63 & r[t++]) << 6) |
                      (63 & r[t++])) -
                    65536),
                  (a[i++] = 55296 + (e >> 10)),
                  (a[i++] = 56320 + (1023 & e)))
                : (a[i++] =
                    ((15 & e) << 12) | ((63 & r[t++]) << 6) | (63 & r[t++])),
                i > 8191 &&
                  ((o || (o = [])).push(String.fromCharCode.apply(String, a)),
                  (i = 0));
            return o
              ? (i && o.push(String.fromCharCode.apply(String, a.slice(0, i))),
                o.join(""))
              : String.fromCharCode.apply(String, a.slice(0, i));
          }),
          (r.write = function (r, t, n) {
            for (var e, o, a = n, i = 0; i < r.length; ++i)
              (e = r.charCodeAt(i)) < 128
                ? (t[n++] = e)
                : e < 2048
                ? ((t[n++] = (e >> 6) | 192), (t[n++] = (63 & e) | 128))
                : 55296 == (64512 & e) &&
                  56320 == (64512 & (o = r.charCodeAt(i + 1)))
                ? ((e = 65536 + ((1023 & e) << 10) + (1023 & o)),
                  ++i,
                  (t[n++] = (e >> 18) | 240),
                  (t[n++] = ((e >> 12) & 63) | 128),
                  (t[n++] = ((e >> 6) & 63) | 128),
                  (t[n++] = (63 & e) | 128))
                : ((t[n++] = (e >> 12) | 224),
                  (t[n++] = ((e >> 6) & 63) | 128),
                  (t[n++] = (63 & e) | 128));
            return n - a;
          });
      },
      {},
    ],
    YX4y: [
      function (require, module, exports) {
        "use strict";
        function r(r, n, t) {
          var u = t || 8192,
            e = u >>> 1,
            l = null,
            c = u;
          return function (t) {
            if (t < 1 || t > e) return r(t);
            c + t > u && ((l = r(u)), (c = 0));
            var i = n.call(l, c, (c += t));
            return 7 & c && (c = 1 + (7 | c)), i;
          };
        }
        module.exports = r;
      },
      {},
    ],
    Ty7D: [
      function (require, module, exports) {
        "use strict";
        module.exports = i;
        var t = require("../util/minimal");
        function i(t, i) {
          (this.lo = t >>> 0), (this.hi = i >>> 0);
        }
        var o = (i.zero = new i(0, 0));
        (o.toNumber = function () {
          return 0;
        }),
          (o.zzEncode = o.zzDecode =
            function () {
              return this;
            }),
          (o.length = function () {
            return 1;
          });
        var r = (i.zeroHash = "\0\0\0\0\0\0\0\0");
        (i.fromNumber = function (t) {
          if (0 === t) return o;
          var r = t < 0;
          r && (t = -t);
          var h = t >>> 0,
            n = ((t - h) / 4294967296) >>> 0;
          return (
            r &&
              ((n = ~n >>> 0),
              (h = ~h >>> 0),
              ++h > 4294967295 && ((h = 0), ++n > 4294967295 && (n = 0))),
            new i(h, n)
          );
        }),
          (i.from = function (r) {
            if ("number" == typeof r) return i.fromNumber(r);
            if (t.isString(r)) {
              if (!t.Long) return i.fromNumber(parseInt(r, 10));
              r = t.Long.fromString(r);
            }
            return r.low || r.high ? new i(r.low >>> 0, r.high >>> 0) : o;
          }),
          (i.prototype.toNumber = function (t) {
            if (!t && this.hi >>> 31) {
              var i = (1 + ~this.lo) >>> 0,
                o = ~this.hi >>> 0;
              return i || (o = (o + 1) >>> 0), -(i + 4294967296 * o);
            }
            return this.lo + 4294967296 * this.hi;
          }),
          (i.prototype.toLong = function (i) {
            return t.Long
              ? new t.Long(0 | this.lo, 0 | this.hi, Boolean(i))
              : { low: 0 | this.lo, high: 0 | this.hi, unsigned: Boolean(i) };
          });
        var h = String.prototype.charCodeAt;
        (i.fromHash = function (t) {
          return t === r
            ? o
            : new i(
                (h.call(t, 0) |
                  (h.call(t, 1) << 8) |
                  (h.call(t, 2) << 16) |
                  (h.call(t, 3) << 24)) >>>
                  0,
                (h.call(t, 4) |
                  (h.call(t, 5) << 8) |
                  (h.call(t, 6) << 16) |
                  (h.call(t, 7) << 24)) >>>
                  0
              );
        }),
          (i.prototype.toHash = function () {
            return String.fromCharCode(
              255 & this.lo,
              (this.lo >>> 8) & 255,
              (this.lo >>> 16) & 255,
              this.lo >>> 24,
              255 & this.hi,
              (this.hi >>> 8) & 255,
              (this.hi >>> 16) & 255,
              this.hi >>> 24
            );
          }),
          (i.prototype.zzEncode = function () {
            var t = this.hi >> 31;
            return (
              (this.hi = (((this.hi << 1) | (this.lo >>> 31)) ^ t) >>> 0),
              (this.lo = ((this.lo << 1) ^ t) >>> 0),
              this
            );
          }),
          (i.prototype.zzDecode = function () {
            var t = -(1 & this.lo);
            return (
              (this.lo = (((this.lo >>> 1) | (this.hi << 31)) ^ t) >>> 0),
              (this.hi = ((this.hi >>> 1) ^ t) >>> 0),
              this
            );
          }),
          (i.prototype.length = function () {
            var t = this.lo,
              i = ((this.lo >>> 28) | (this.hi << 4)) >>> 0,
              o = this.hi >>> 24;
            return 0 === o
              ? 0 === i
                ? t < 16384
                  ? t < 128
                    ? 1
                    : 2
                  : t < 2097152
                  ? 3
                  : 4
                : i < 16384
                ? i < 128
                  ? 5
                  : 6
                : i < 2097152
                ? 7
                : 8
              : o < 128
              ? 9
              : 10;
          });
      },
      { "../util/minimal": "KgKa" },
    ],
    yh9p: [
      function (require, module, exports) {
        "use strict";
        (exports.byteLength = u),
          (exports.toByteArray = i),
          (exports.fromByteArray = d);
        for (
          var r = [],
            t = [],
            e = "undefined" != typeof Uint8Array ? Uint8Array : Array,
            n =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            o = 0,
            a = n.length;
          o < a;
          ++o
        )
          (r[o] = n[o]), (t[n.charCodeAt(o)] = o);
        function h(r) {
          var t = r.length;
          if (t % 4 > 0)
            throw new Error("Invalid string. Length must be a multiple of 4");
          var e = r.indexOf("=");
          return -1 === e && (e = t), [e, e === t ? 0 : 4 - (e % 4)];
        }
        function u(r) {
          var t = h(r),
            e = t[0],
            n = t[1];
          return (3 * (e + n)) / 4 - n;
        }
        function c(r, t, e) {
          return (3 * (t + e)) / 4 - e;
        }
        function i(r) {
          var n,
            o,
            a = h(r),
            u = a[0],
            i = a[1],
            f = new e(c(r, u, i)),
            A = 0,
            d = i > 0 ? u - 4 : u;
          for (o = 0; o < d; o += 4)
            (n =
              (t[r.charCodeAt(o)] << 18) |
              (t[r.charCodeAt(o + 1)] << 12) |
              (t[r.charCodeAt(o + 2)] << 6) |
              t[r.charCodeAt(o + 3)]),
              (f[A++] = (n >> 16) & 255),
              (f[A++] = (n >> 8) & 255),
              (f[A++] = 255 & n);
          return (
            2 === i &&
              ((n = (t[r.charCodeAt(o)] << 2) | (t[r.charCodeAt(o + 1)] >> 4)),
              (f[A++] = 255 & n)),
            1 === i &&
              ((n =
                (t[r.charCodeAt(o)] << 10) |
                (t[r.charCodeAt(o + 1)] << 4) |
                (t[r.charCodeAt(o + 2)] >> 2)),
              (f[A++] = (n >> 8) & 255),
              (f[A++] = 255 & n)),
            f
          );
        }
        function f(t) {
          return (
            r[(t >> 18) & 63] + r[(t >> 12) & 63] + r[(t >> 6) & 63] + r[63 & t]
          );
        }
        function A(r, t, e) {
          for (var n, o = [], a = t; a < e; a += 3)
            (n =
              ((r[a] << 16) & 16711680) +
              ((r[a + 1] << 8) & 65280) +
              (255 & r[a + 2])),
              o.push(f(n));
          return o.join("");
        }
        function d(t) {
          for (
            var e, n = t.length, o = n % 3, a = [], h = 0, u = n - o;
            h < u;
            h += 16383
          )
            a.push(A(t, h, h + 16383 > u ? u : h + 16383));
          return (
            1 === o
              ? ((e = t[n - 1]), a.push(r[e >> 2] + r[(e << 4) & 63] + "=="))
              : 2 === o &&
                ((e = (t[n - 2] << 8) + t[n - 1]),
                a.push(r[e >> 10] + r[(e >> 4) & 63] + r[(e << 2) & 63] + "=")),
            a.join("")
          );
        }
        (t["-".charCodeAt(0)] = 62), (t["_".charCodeAt(0)] = 63);
      },
      {},
    ],
    JgNJ: [
      function (require, module, exports) {
        (exports.read = function (a, o, t, r, h) {
          var M,
            p,
            w = 8 * h - r - 1,
            f = (1 << w) - 1,
            e = f >> 1,
            i = -7,
            N = t ? h - 1 : 0,
            n = t ? -1 : 1,
            s = a[o + N];
          for (
            N += n, M = s & ((1 << -i) - 1), s >>= -i, i += w;
            i > 0;
            M = 256 * M + a[o + N], N += n, i -= 8
          );
          for (
            p = M & ((1 << -i) - 1), M >>= -i, i += r;
            i > 0;
            p = 256 * p + a[o + N], N += n, i -= 8
          );
          if (0 === M) M = 1 - e;
          else {
            if (M === f) return p ? NaN : (1 / 0) * (s ? -1 : 1);
            (p += Math.pow(2, r)), (M -= e);
          }
          return (s ? -1 : 1) * p * Math.pow(2, M - r);
        }),
          (exports.write = function (a, o, t, r, h, M) {
            var p,
              w,
              f,
              e = 8 * M - h - 1,
              i = (1 << e) - 1,
              N = i >> 1,
              n = 23 === h ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
              s = r ? 0 : M - 1,
              u = r ? 1 : -1,
              l = o < 0 || (0 === o && 1 / o < 0) ? 1 : 0;
            for (
              o = Math.abs(o),
                isNaN(o) || o === 1 / 0
                  ? ((w = isNaN(o) ? 1 : 0), (p = i))
                  : ((p = Math.floor(Math.log(o) / Math.LN2)),
                    o * (f = Math.pow(2, -p)) < 1 && (p--, (f *= 2)),
                    (o += p + N >= 1 ? n / f : n * Math.pow(2, 1 - N)) * f >=
                      2 && (p++, (f /= 2)),
                    p + N >= i
                      ? ((w = 0), (p = i))
                      : p + N >= 1
                      ? ((w = (o * f - 1) * Math.pow(2, h)), (p += N))
                      : ((w = o * Math.pow(2, N - 1) * Math.pow(2, h)),
                        (p = 0)));
              h >= 8;
              a[t + s] = 255 & w, s += u, w /= 256, h -= 8
            );
            for (
              p = (p << h) | w, e += h;
              e > 0;
              a[t + s] = 255 & p, s += u, p /= 256, e -= 8
            );
            a[t + s - u] |= 128 * l;
          });
      },
      {},
    ],
    REa7: [
      function (require, module, exports) {
        var r = {}.toString;
        module.exports =
          Array.isArray ||
          function (t) {
            return "[object Array]" == r.call(t);
          };
      },
      {},
    ],
    dskh: [
      function (require, module, exports) {
        var global = arguments[3];
        var t = arguments[3],
          r = require("base64-js"),
          e = require("ieee754"),
          n = require("isarray");
        function i() {
          try {
            var t = new Uint8Array(1);
            return (
              (t.__proto__ = {
                __proto__: Uint8Array.prototype,
                foo: function () {
                  return 42;
                },
              }),
              42 === t.foo() &&
                "function" == typeof t.subarray &&
                0 === t.subarray(1, 1).byteLength
            );
          } catch (r) {
            return !1;
          }
        }
        function o() {
          return f.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        }
        function u(t, r) {
          if (o() < r) throw new RangeError("Invalid typed array length");
          return (
            f.TYPED_ARRAY_SUPPORT
              ? ((t = new Uint8Array(r)).__proto__ = f.prototype)
              : (null === t && (t = new f(r)), (t.length = r)),
            t
          );
        }
        function f(t, r, e) {
          if (!(f.TYPED_ARRAY_SUPPORT || this instanceof f))
            return new f(t, r, e);
          if ("number" == typeof t) {
            if ("string" == typeof r)
              throw new Error(
                "If encoding is specified then the first argument must be a string"
              );
            return c(this, t);
          }
          return s(this, t, r, e);
        }
        function s(t, r, e, n) {
          if ("number" == typeof r)
            throw new TypeError('"value" argument must not be a number');
          return "undefined" != typeof ArrayBuffer && r instanceof ArrayBuffer
            ? g(t, r, e, n)
            : "string" == typeof r
            ? l(t, r, e)
            : y(t, r);
        }
        function h(t) {
          if ("number" != typeof t)
            throw new TypeError('"size" argument must be a number');
          if (t < 0)
            throw new RangeError('"size" argument must not be negative');
        }
        function a(t, r, e, n) {
          return (
            h(r),
            r <= 0
              ? u(t, r)
              : void 0 !== e
              ? "string" == typeof n
                ? u(t, r).fill(e, n)
                : u(t, r).fill(e)
              : u(t, r)
          );
        }
        function c(t, r) {
          if ((h(r), (t = u(t, r < 0 ? 0 : 0 | w(r))), !f.TYPED_ARRAY_SUPPORT))
            for (var e = 0; e < r; ++e) t[e] = 0;
          return t;
        }
        function l(t, r, e) {
          if (
            (("string" == typeof e && "" !== e) || (e = "utf8"),
            !f.isEncoding(e))
          )
            throw new TypeError('"encoding" must be a valid string encoding');
          var n = 0 | v(r, e),
            i = (t = u(t, n)).write(r, e);
          return i !== n && (t = t.slice(0, i)), t;
        }
        function p(t, r) {
          var e = r.length < 0 ? 0 : 0 | w(r.length);
          t = u(t, e);
          for (var n = 0; n < e; n += 1) t[n] = 255 & r[n];
          return t;
        }
        function g(t, r, e, n) {
          if ((r.byteLength, e < 0 || r.byteLength < e))
            throw new RangeError("'offset' is out of bounds");
          if (r.byteLength < e + (n || 0))
            throw new RangeError("'length' is out of bounds");
          return (
            (r =
              void 0 === e && void 0 === n
                ? new Uint8Array(r)
                : void 0 === n
                ? new Uint8Array(r, e)
                : new Uint8Array(r, e, n)),
            f.TYPED_ARRAY_SUPPORT
              ? ((t = r).__proto__ = f.prototype)
              : (t = p(t, r)),
            t
          );
        }
        function y(t, r) {
          if (f.isBuffer(r)) {
            var e = 0 | w(r.length);
            return 0 === (t = u(t, e)).length ? t : (r.copy(t, 0, 0, e), t);
          }
          if (r) {
            if (
              ("undefined" != typeof ArrayBuffer &&
                r.buffer instanceof ArrayBuffer) ||
              "length" in r
            )
              return "number" != typeof r.length || W(r.length)
                ? u(t, 0)
                : p(t, r);
            if ("Buffer" === r.type && n(r.data)) return p(t, r.data);
          }
          throw new TypeError(
            "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
          );
        }
        function w(t) {
          if (t >= o())
            throw new RangeError(
              "Attempt to allocate Buffer larger than maximum size: 0x" +
                o().toString(16) +
                " bytes"
            );
          return 0 | t;
        }
        function d(t) {
          return +t != t && (t = 0), f.alloc(+t);
        }
        function v(t, r) {
          if (f.isBuffer(t)) return t.length;
          if (
            "undefined" != typeof ArrayBuffer &&
            "function" == typeof ArrayBuffer.isView &&
            (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
          )
            return t.byteLength;
          "string" != typeof t && (t = "" + t);
          var e = t.length;
          if (0 === e) return 0;
          for (var n = !1; ; )
            switch (r) {
              case "ascii":
              case "latin1":
              case "binary":
                return e;
              case "utf8":
              case "utf-8":
              case void 0:
                return $(t).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return 2 * e;
              case "hex":
                return e >>> 1;
              case "base64":
                return K(t).length;
              default:
                if (n) return $(t).length;
                (r = ("" + r).toLowerCase()), (n = !0);
            }
        }
        function E(t, r, e) {
          var n = !1;
          if (((void 0 === r || r < 0) && (r = 0), r > this.length)) return "";
          if (((void 0 === e || e > this.length) && (e = this.length), e <= 0))
            return "";
          if ((e >>>= 0) <= (r >>>= 0)) return "";
          for (t || (t = "utf8"); ; )
            switch (t) {
              case "hex":
                return x(this, r, e);
              case "utf8":
              case "utf-8":
                return Y(this, r, e);
              case "ascii":
                return L(this, r, e);
              case "latin1":
              case "binary":
                return D(this, r, e);
              case "base64":
                return S(this, r, e);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return C(this, r, e);
              default:
                if (n) throw new TypeError("Unknown encoding: " + t);
                (t = (t + "").toLowerCase()), (n = !0);
            }
        }
        function b(t, r, e) {
          var n = t[r];
          (t[r] = t[e]), (t[e] = n);
        }
        function R(t, r, e, n, i) {
          if (0 === t.length) return -1;
          if (
            ("string" == typeof e
              ? ((n = e), (e = 0))
              : e > 2147483647
              ? (e = 2147483647)
              : e < -2147483648 && (e = -2147483648),
            (e = +e),
            isNaN(e) && (e = i ? 0 : t.length - 1),
            e < 0 && (e = t.length + e),
            e >= t.length)
          ) {
            if (i) return -1;
            e = t.length - 1;
          } else if (e < 0) {
            if (!i) return -1;
            e = 0;
          }
          if (("string" == typeof r && (r = f.from(r, n)), f.isBuffer(r)))
            return 0 === r.length ? -1 : _(t, r, e, n, i);
          if ("number" == typeof r)
            return (
              (r &= 255),
              f.TYPED_ARRAY_SUPPORT &&
              "function" == typeof Uint8Array.prototype.indexOf
                ? i
                  ? Uint8Array.prototype.indexOf.call(t, r, e)
                  : Uint8Array.prototype.lastIndexOf.call(t, r, e)
                : _(t, [r], e, n, i)
            );
          throw new TypeError("val must be string, number or Buffer");
        }
        function _(t, r, e, n, i) {
          var o,
            u = 1,
            f = t.length,
            s = r.length;
          if (
            void 0 !== n &&
            ("ucs2" === (n = String(n).toLowerCase()) ||
              "ucs-2" === n ||
              "utf16le" === n ||
              "utf-16le" === n)
          ) {
            if (t.length < 2 || r.length < 2) return -1;
            (u = 2), (f /= 2), (s /= 2), (e /= 2);
          }
          function h(t, r) {
            return 1 === u ? t[r] : t.readUInt16BE(r * u);
          }
          if (i) {
            var a = -1;
            for (o = e; o < f; o++)
              if (h(t, o) === h(r, -1 === a ? 0 : o - a)) {
                if ((-1 === a && (a = o), o - a + 1 === s)) return a * u;
              } else -1 !== a && (o -= o - a), (a = -1);
          } else
            for (e + s > f && (e = f - s), o = e; o >= 0; o--) {
              for (var c = !0, l = 0; l < s; l++)
                if (h(t, o + l) !== h(r, l)) {
                  c = !1;
                  break;
                }
              if (c) return o;
            }
          return -1;
        }
        function A(t, r, e, n) {
          e = Number(e) || 0;
          var i = t.length - e;
          n ? (n = Number(n)) > i && (n = i) : (n = i);
          var o = r.length;
          if (o % 2 != 0) throw new TypeError("Invalid hex string");
          n > o / 2 && (n = o / 2);
          for (var u = 0; u < n; ++u) {
            var f = parseInt(r.substr(2 * u, 2), 16);
            if (isNaN(f)) return u;
            t[e + u] = f;
          }
          return u;
        }
        function m(t, r, e, n) {
          return Q($(r, t.length - e), t, e, n);
        }
        function P(t, r, e, n) {
          return Q(G(r), t, e, n);
        }
        function T(t, r, e, n) {
          return P(t, r, e, n);
        }
        function B(t, r, e, n) {
          return Q(K(r), t, e, n);
        }
        function U(t, r, e, n) {
          return Q(H(r, t.length - e), t, e, n);
        }
        function S(t, e, n) {
          return 0 === e && n === t.length
            ? r.fromByteArray(t)
            : r.fromByteArray(t.slice(e, n));
        }
        function Y(t, r, e) {
          e = Math.min(t.length, e);
          for (var n = [], i = r; i < e; ) {
            var o,
              u,
              f,
              s,
              h = t[i],
              a = null,
              c = h > 239 ? 4 : h > 223 ? 3 : h > 191 ? 2 : 1;
            if (i + c <= e)
              switch (c) {
                case 1:
                  h < 128 && (a = h);
                  break;
                case 2:
                  128 == (192 & (o = t[i + 1])) &&
                    (s = ((31 & h) << 6) | (63 & o)) > 127 &&
                    (a = s);
                  break;
                case 3:
                  (o = t[i + 1]),
                    (u = t[i + 2]),
                    128 == (192 & o) &&
                      128 == (192 & u) &&
                      (s = ((15 & h) << 12) | ((63 & o) << 6) | (63 & u)) >
                        2047 &&
                      (s < 55296 || s > 57343) &&
                      (a = s);
                  break;
                case 4:
                  (o = t[i + 1]),
                    (u = t[i + 2]),
                    (f = t[i + 3]),
                    128 == (192 & o) &&
                      128 == (192 & u) &&
                      128 == (192 & f) &&
                      (s =
                        ((15 & h) << 18) |
                        ((63 & o) << 12) |
                        ((63 & u) << 6) |
                        (63 & f)) > 65535 &&
                      s < 1114112 &&
                      (a = s);
              }
            null === a
              ? ((a = 65533), (c = 1))
              : a > 65535 &&
                ((a -= 65536),
                n.push(((a >>> 10) & 1023) | 55296),
                (a = 56320 | (1023 & a))),
              n.push(a),
              (i += c);
          }
          return O(n);
        }
        (exports.Buffer = f),
          (exports.SlowBuffer = d),
          (exports.INSPECT_MAX_BYTES = 50),
          (f.TYPED_ARRAY_SUPPORT =
            void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : i()),
          (exports.kMaxLength = o()),
          (f.poolSize = 8192),
          (f._augment = function (t) {
            return (t.__proto__ = f.prototype), t;
          }),
          (f.from = function (t, r, e) {
            return s(null, t, r, e);
          }),
          f.TYPED_ARRAY_SUPPORT &&
            ((f.prototype.__proto__ = Uint8Array.prototype),
            (f.__proto__ = Uint8Array),
            "undefined" != typeof Symbol &&
              Symbol.species &&
              f[Symbol.species] === f &&
              Object.defineProperty(f, Symbol.species, {
                value: null,
                configurable: !0,
              })),
          (f.alloc = function (t, r, e) {
            return a(null, t, r, e);
          }),
          (f.allocUnsafe = function (t) {
            return c(null, t);
          }),
          (f.allocUnsafeSlow = function (t) {
            return c(null, t);
          }),
          (f.isBuffer = function (t) {
            return !(null == t || !t._isBuffer);
          }),
          (f.compare = function (t, r) {
            if (!f.isBuffer(t) || !f.isBuffer(r))
              throw new TypeError("Arguments must be Buffers");
            if (t === r) return 0;
            for (
              var e = t.length, n = r.length, i = 0, o = Math.min(e, n);
              i < o;
              ++i
            )
              if (t[i] !== r[i]) {
                (e = t[i]), (n = r[i]);
                break;
              }
            return e < n ? -1 : n < e ? 1 : 0;
          }),
          (f.isEncoding = function (t) {
            switch (String(t).toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "latin1":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return !0;
              default:
                return !1;
            }
          }),
          (f.concat = function (t, r) {
            if (!n(t))
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            if (0 === t.length) return f.alloc(0);
            var e;
            if (void 0 === r)
              for (r = 0, e = 0; e < t.length; ++e) r += t[e].length;
            var i = f.allocUnsafe(r),
              o = 0;
            for (e = 0; e < t.length; ++e) {
              var u = t[e];
              if (!f.isBuffer(u))
                throw new TypeError(
                  '"list" argument must be an Array of Buffers'
                );
              u.copy(i, o), (o += u.length);
            }
            return i;
          }),
          (f.byteLength = v),
          (f.prototype._isBuffer = !0),
          (f.prototype.swap16 = function () {
            var t = this.length;
            if (t % 2 != 0)
              throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var r = 0; r < t; r += 2) b(this, r, r + 1);
            return this;
          }),
          (f.prototype.swap32 = function () {
            var t = this.length;
            if (t % 4 != 0)
              throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var r = 0; r < t; r += 4)
              b(this, r, r + 3), b(this, r + 1, r + 2);
            return this;
          }),
          (f.prototype.swap64 = function () {
            var t = this.length;
            if (t % 8 != 0)
              throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var r = 0; r < t; r += 8)
              b(this, r, r + 7),
                b(this, r + 1, r + 6),
                b(this, r + 2, r + 5),
                b(this, r + 3, r + 4);
            return this;
          }),
          (f.prototype.toString = function () {
            var t = 0 | this.length;
            return 0 === t
              ? ""
              : 0 === arguments.length
              ? Y(this, 0, t)
              : E.apply(this, arguments);
          }),
          (f.prototype.equals = function (t) {
            if (!f.isBuffer(t))
              throw new TypeError("Argument must be a Buffer");
            return this === t || 0 === f.compare(this, t);
          }),
          (f.prototype.inspect = function () {
            var t = "",
              r = exports.INSPECT_MAX_BYTES;
            return (
              this.length > 0 &&
                ((t = this.toString("hex", 0, r).match(/.{2}/g).join(" ")),
                this.length > r && (t += " ... ")),
              "<Buffer " + t + ">"
            );
          }),
          (f.prototype.compare = function (t, r, e, n, i) {
            if (!f.isBuffer(t))
              throw new TypeError("Argument must be a Buffer");
            if (
              (void 0 === r && (r = 0),
              void 0 === e && (e = t ? t.length : 0),
              void 0 === n && (n = 0),
              void 0 === i && (i = this.length),
              r < 0 || e > t.length || n < 0 || i > this.length)
            )
              throw new RangeError("out of range index");
            if (n >= i && r >= e) return 0;
            if (n >= i) return -1;
            if (r >= e) return 1;
            if (this === t) return 0;
            for (
              var o = (i >>>= 0) - (n >>>= 0),
                u = (e >>>= 0) - (r >>>= 0),
                s = Math.min(o, u),
                h = this.slice(n, i),
                a = t.slice(r, e),
                c = 0;
              c < s;
              ++c
            )
              if (h[c] !== a[c]) {
                (o = h[c]), (u = a[c]);
                break;
              }
            return o < u ? -1 : u < o ? 1 : 0;
          }),
          (f.prototype.includes = function (t, r, e) {
            return -1 !== this.indexOf(t, r, e);
          }),
          (f.prototype.indexOf = function (t, r, e) {
            return R(this, t, r, e, !0);
          }),
          (f.prototype.lastIndexOf = function (t, r, e) {
            return R(this, t, r, e, !1);
          }),
          (f.prototype.write = function (t, r, e, n) {
            if (void 0 === r) (n = "utf8"), (e = this.length), (r = 0);
            else if (void 0 === e && "string" == typeof r)
              (n = r), (e = this.length), (r = 0);
            else {
              if (!isFinite(r))
                throw new Error(
                  "Buffer.write(string, encoding, offset[, length]) is no longer supported"
                );
              (r |= 0),
                isFinite(e)
                  ? ((e |= 0), void 0 === n && (n = "utf8"))
                  : ((n = e), (e = void 0));
            }
            var i = this.length - r;
            if (
              ((void 0 === e || e > i) && (e = i),
              (t.length > 0 && (e < 0 || r < 0)) || r > this.length)
            )
              throw new RangeError("Attempt to write outside buffer bounds");
            n || (n = "utf8");
            for (var o = !1; ; )
              switch (n) {
                case "hex":
                  return A(this, t, r, e);
                case "utf8":
                case "utf-8":
                  return m(this, t, r, e);
                case "ascii":
                  return P(this, t, r, e);
                case "latin1":
                case "binary":
                  return T(this, t, r, e);
                case "base64":
                  return B(this, t, r, e);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return U(this, t, r, e);
                default:
                  if (o) throw new TypeError("Unknown encoding: " + n);
                  (n = ("" + n).toLowerCase()), (o = !0);
              }
          }),
          (f.prototype.toJSON = function () {
            return {
              type: "Buffer",
              data: Array.prototype.slice.call(this._arr || this, 0),
            };
          });
        var I = 4096;
        function O(t) {
          var r = t.length;
          if (r <= I) return String.fromCharCode.apply(String, t);
          for (var e = "", n = 0; n < r; )
            e += String.fromCharCode.apply(String, t.slice(n, (n += I)));
          return e;
        }
        function L(t, r, e) {
          var n = "";
          e = Math.min(t.length, e);
          for (var i = r; i < e; ++i) n += String.fromCharCode(127 & t[i]);
          return n;
        }
        function D(t, r, e) {
          var n = "";
          e = Math.min(t.length, e);
          for (var i = r; i < e; ++i) n += String.fromCharCode(t[i]);
          return n;
        }
        function x(t, r, e) {
          var n = t.length;
          (!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);
          for (var i = "", o = r; o < e; ++o) i += Z(t[o]);
          return i;
        }
        function C(t, r, e) {
          for (var n = t.slice(r, e), i = "", o = 0; o < n.length; o += 2)
            i += String.fromCharCode(n[o] + 256 * n[o + 1]);
          return i;
        }
        function M(t, r, e) {
          if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
          if (t + r > e)
            throw new RangeError("Trying to access beyond buffer length");
        }
        function k(t, r, e, n, i, o) {
          if (!f.isBuffer(t))
            throw new TypeError('"buffer" argument must be a Buffer instance');
          if (r > i || r < o)
            throw new RangeError('"value" argument is out of bounds');
          if (e + n > t.length) throw new RangeError("Index out of range");
        }
        function N(t, r, e, n) {
          r < 0 && (r = 65535 + r + 1);
          for (var i = 0, o = Math.min(t.length - e, 2); i < o; ++i)
            t[e + i] =
              (r & (255 << (8 * (n ? i : 1 - i)))) >>> (8 * (n ? i : 1 - i));
        }
        function z(t, r, e, n) {
          r < 0 && (r = 4294967295 + r + 1);
          for (var i = 0, o = Math.min(t.length - e, 4); i < o; ++i)
            t[e + i] = (r >>> (8 * (n ? i : 3 - i))) & 255;
        }
        function F(t, r, e, n, i, o) {
          if (e + n > t.length) throw new RangeError("Index out of range");
          if (e < 0) throw new RangeError("Index out of range");
        }
        function j(t, r, n, i, o) {
          return (
            o || F(t, r, n, 4, 3.4028234663852886e38, -3.4028234663852886e38),
            e.write(t, r, n, i, 23, 4),
            n + 4
          );
        }
        function q(t, r, n, i, o) {
          return (
            o || F(t, r, n, 8, 1.7976931348623157e308, -1.7976931348623157e308),
            e.write(t, r, n, i, 52, 8),
            n + 8
          );
        }
        (f.prototype.slice = function (t, r) {
          var e,
            n = this.length;
          if (
            ((t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
            (r = void 0 === r ? n : ~~r) < 0
              ? (r += n) < 0 && (r = 0)
              : r > n && (r = n),
            r < t && (r = t),
            f.TYPED_ARRAY_SUPPORT)
          )
            (e = this.subarray(t, r)).__proto__ = f.prototype;
          else {
            var i = r - t;
            e = new f(i, void 0);
            for (var o = 0; o < i; ++o) e[o] = this[o + t];
          }
          return e;
        }),
          (f.prototype.readUIntLE = function (t, r, e) {
            (t |= 0), (r |= 0), e || M(t, r, this.length);
            for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256); )
              n += this[t + o] * i;
            return n;
          }),
          (f.prototype.readUIntBE = function (t, r, e) {
            (t |= 0), (r |= 0), e || M(t, r, this.length);
            for (var n = this[t + --r], i = 1; r > 0 && (i *= 256); )
              n += this[t + --r] * i;
            return n;
          }),
          (f.prototype.readUInt8 = function (t, r) {
            return r || M(t, 1, this.length), this[t];
          }),
          (f.prototype.readUInt16LE = function (t, r) {
            return r || M(t, 2, this.length), this[t] | (this[t + 1] << 8);
          }),
          (f.prototype.readUInt16BE = function (t, r) {
            return r || M(t, 2, this.length), (this[t] << 8) | this[t + 1];
          }),
          (f.prototype.readUInt32LE = function (t, r) {
            return (
              r || M(t, 4, this.length),
              (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
                16777216 * this[t + 3]
            );
          }),
          (f.prototype.readUInt32BE = function (t, r) {
            return (
              r || M(t, 4, this.length),
              16777216 * this[t] +
                ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
            );
          }),
          (f.prototype.readIntLE = function (t, r, e) {
            (t |= 0), (r |= 0), e || M(t, r, this.length);
            for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256); )
              n += this[t + o] * i;
            return n >= (i *= 128) && (n -= Math.pow(2, 8 * r)), n;
          }),
          (f.prototype.readIntBE = function (t, r, e) {
            (t |= 0), (r |= 0), e || M(t, r, this.length);
            for (var n = r, i = 1, o = this[t + --n]; n > 0 && (i *= 256); )
              o += this[t + --n] * i;
            return o >= (i *= 128) && (o -= Math.pow(2, 8 * r)), o;
          }),
          (f.prototype.readInt8 = function (t, r) {
            return (
              r || M(t, 1, this.length),
              128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
            );
          }),
          (f.prototype.readInt16LE = function (t, r) {
            r || M(t, 2, this.length);
            var e = this[t] | (this[t + 1] << 8);
            return 32768 & e ? 4294901760 | e : e;
          }),
          (f.prototype.readInt16BE = function (t, r) {
            r || M(t, 2, this.length);
            var e = this[t + 1] | (this[t] << 8);
            return 32768 & e ? 4294901760 | e : e;
          }),
          (f.prototype.readInt32LE = function (t, r) {
            return (
              r || M(t, 4, this.length),
              this[t] |
                (this[t + 1] << 8) |
                (this[t + 2] << 16) |
                (this[t + 3] << 24)
            );
          }),
          (f.prototype.readInt32BE = function (t, r) {
            return (
              r || M(t, 4, this.length),
              (this[t] << 24) |
                (this[t + 1] << 16) |
                (this[t + 2] << 8) |
                this[t + 3]
            );
          }),
          (f.prototype.readFloatLE = function (t, r) {
            return r || M(t, 4, this.length), e.read(this, t, !0, 23, 4);
          }),
          (f.prototype.readFloatBE = function (t, r) {
            return r || M(t, 4, this.length), e.read(this, t, !1, 23, 4);
          }),
          (f.prototype.readDoubleLE = function (t, r) {
            return r || M(t, 8, this.length), e.read(this, t, !0, 52, 8);
          }),
          (f.prototype.readDoubleBE = function (t, r) {
            return r || M(t, 8, this.length), e.read(this, t, !1, 52, 8);
          }),
          (f.prototype.writeUIntLE = function (t, r, e, n) {
            ((t = +t), (r |= 0), (e |= 0), n) ||
              k(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
            var i = 1,
              o = 0;
            for (this[r] = 255 & t; ++o < e && (i *= 256); )
              this[r + o] = (t / i) & 255;
            return r + e;
          }),
          (f.prototype.writeUIntBE = function (t, r, e, n) {
            ((t = +t), (r |= 0), (e |= 0), n) ||
              k(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
            var i = e - 1,
              o = 1;
            for (this[r + i] = 255 & t; --i >= 0 && (o *= 256); )
              this[r + i] = (t / o) & 255;
            return r + e;
          }),
          (f.prototype.writeUInt8 = function (t, r, e) {
            return (
              (t = +t),
              (r |= 0),
              e || k(this, t, r, 1, 255, 0),
              f.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
              (this[r] = 255 & t),
              r + 1
            );
          }),
          (f.prototype.writeUInt16LE = function (t, r, e) {
            return (
              (t = +t),
              (r |= 0),
              e || k(this, t, r, 2, 65535, 0),
              f.TYPED_ARRAY_SUPPORT
                ? ((this[r] = 255 & t), (this[r + 1] = t >>> 8))
                : N(this, t, r, !0),
              r + 2
            );
          }),
          (f.prototype.writeUInt16BE = function (t, r, e) {
            return (
              (t = +t),
              (r |= 0),
              e || k(this, t, r, 2, 65535, 0),
              f.TYPED_ARRAY_SUPPORT
                ? ((this[r] = t >>> 8), (this[r + 1] = 255 & t))
                : N(this, t, r, !1),
              r + 2
            );
          }),
          (f.prototype.writeUInt32LE = function (t, r, e) {
            return (
              (t = +t),
              (r |= 0),
              e || k(this, t, r, 4, 4294967295, 0),
              f.TYPED_ARRAY_SUPPORT
                ? ((this[r + 3] = t >>> 24),
                  (this[r + 2] = t >>> 16),
                  (this[r + 1] = t >>> 8),
                  (this[r] = 255 & t))
                : z(this, t, r, !0),
              r + 4
            );
          }),
          (f.prototype.writeUInt32BE = function (t, r, e) {
            return (
              (t = +t),
              (r |= 0),
              e || k(this, t, r, 4, 4294967295, 0),
              f.TYPED_ARRAY_SUPPORT
                ? ((this[r] = t >>> 24),
                  (this[r + 1] = t >>> 16),
                  (this[r + 2] = t >>> 8),
                  (this[r + 3] = 255 & t))
                : z(this, t, r, !1),
              r + 4
            );
          }),
          (f.prototype.writeIntLE = function (t, r, e, n) {
            if (((t = +t), (r |= 0), !n)) {
              var i = Math.pow(2, 8 * e - 1);
              k(this, t, r, e, i - 1, -i);
            }
            var o = 0,
              u = 1,
              f = 0;
            for (this[r] = 255 & t; ++o < e && (u *= 256); )
              t < 0 && 0 === f && 0 !== this[r + o - 1] && (f = 1),
                (this[r + o] = (((t / u) >> 0) - f) & 255);
            return r + e;
          }),
          (f.prototype.writeIntBE = function (t, r, e, n) {
            if (((t = +t), (r |= 0), !n)) {
              var i = Math.pow(2, 8 * e - 1);
              k(this, t, r, e, i - 1, -i);
            }
            var o = e - 1,
              u = 1,
              f = 0;
            for (this[r + o] = 255 & t; --o >= 0 && (u *= 256); )
              t < 0 && 0 === f && 0 !== this[r + o + 1] && (f = 1),
                (this[r + o] = (((t / u) >> 0) - f) & 255);
            return r + e;
          }),
          (f.prototype.writeInt8 = function (t, r, e) {
            return (
              (t = +t),
              (r |= 0),
              e || k(this, t, r, 1, 127, -128),
              f.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
              t < 0 && (t = 255 + t + 1),
              (this[r] = 255 & t),
              r + 1
            );
          }),
          (f.prototype.writeInt16LE = function (t, r, e) {
            return (
              (t = +t),
              (r |= 0),
              e || k(this, t, r, 2, 32767, -32768),
              f.TYPED_ARRAY_SUPPORT
                ? ((this[r] = 255 & t), (this[r + 1] = t >>> 8))
                : N(this, t, r, !0),
              r + 2
            );
          }),
          (f.prototype.writeInt16BE = function (t, r, e) {
            return (
              (t = +t),
              (r |= 0),
              e || k(this, t, r, 2, 32767, -32768),
              f.TYPED_ARRAY_SUPPORT
                ? ((this[r] = t >>> 8), (this[r + 1] = 255 & t))
                : N(this, t, r, !1),
              r + 2
            );
          }),
          (f.prototype.writeInt32LE = function (t, r, e) {
            return (
              (t = +t),
              (r |= 0),
              e || k(this, t, r, 4, 2147483647, -2147483648),
              f.TYPED_ARRAY_SUPPORT
                ? ((this[r] = 255 & t),
                  (this[r + 1] = t >>> 8),
                  (this[r + 2] = t >>> 16),
                  (this[r + 3] = t >>> 24))
                : z(this, t, r, !0),
              r + 4
            );
          }),
          (f.prototype.writeInt32BE = function (t, r, e) {
            return (
              (t = +t),
              (r |= 0),
              e || k(this, t, r, 4, 2147483647, -2147483648),
              t < 0 && (t = 4294967295 + t + 1),
              f.TYPED_ARRAY_SUPPORT
                ? ((this[r] = t >>> 24),
                  (this[r + 1] = t >>> 16),
                  (this[r + 2] = t >>> 8),
                  (this[r + 3] = 255 & t))
                : z(this, t, r, !1),
              r + 4
            );
          }),
          (f.prototype.writeFloatLE = function (t, r, e) {
            return j(this, t, r, !0, e);
          }),
          (f.prototype.writeFloatBE = function (t, r, e) {
            return j(this, t, r, !1, e);
          }),
          (f.prototype.writeDoubleLE = function (t, r, e) {
            return q(this, t, r, !0, e);
          }),
          (f.prototype.writeDoubleBE = function (t, r, e) {
            return q(this, t, r, !1, e);
          }),
          (f.prototype.copy = function (t, r, e, n) {
            if (
              (e || (e = 0),
              n || 0 === n || (n = this.length),
              r >= t.length && (r = t.length),
              r || (r = 0),
              n > 0 && n < e && (n = e),
              n === e)
            )
              return 0;
            if (0 === t.length || 0 === this.length) return 0;
            if (r < 0) throw new RangeError("targetStart out of bounds");
            if (e < 0 || e >= this.length)
              throw new RangeError("sourceStart out of bounds");
            if (n < 0) throw new RangeError("sourceEnd out of bounds");
            n > this.length && (n = this.length),
              t.length - r < n - e && (n = t.length - r + e);
            var i,
              o = n - e;
            if (this === t && e < r && r < n)
              for (i = o - 1; i >= 0; --i) t[i + r] = this[i + e];
            else if (o < 1e3 || !f.TYPED_ARRAY_SUPPORT)
              for (i = 0; i < o; ++i) t[i + r] = this[i + e];
            else Uint8Array.prototype.set.call(t, this.subarray(e, e + o), r);
            return o;
          }),
          (f.prototype.fill = function (t, r, e, n) {
            if ("string" == typeof t) {
              if (
                ("string" == typeof r
                  ? ((n = r), (r = 0), (e = this.length))
                  : "string" == typeof e && ((n = e), (e = this.length)),
                1 === t.length)
              ) {
                var i = t.charCodeAt(0);
                i < 256 && (t = i);
              }
              if (void 0 !== n && "string" != typeof n)
                throw new TypeError("encoding must be a string");
              if ("string" == typeof n && !f.isEncoding(n))
                throw new TypeError("Unknown encoding: " + n);
            } else "number" == typeof t && (t &= 255);
            if (r < 0 || this.length < r || this.length < e)
              throw new RangeError("Out of range index");
            if (e <= r) return this;
            var o;
            if (
              ((r >>>= 0),
              (e = void 0 === e ? this.length : e >>> 0),
              t || (t = 0),
              "number" == typeof t)
            )
              for (o = r; o < e; ++o) this[o] = t;
            else {
              var u = f.isBuffer(t) ? t : $(new f(t, n).toString()),
                s = u.length;
              for (o = 0; o < e - r; ++o) this[o + r] = u[o % s];
            }
            return this;
          });
        var V = /[^+\/0-9A-Za-z-_]/g;
        function X(t) {
          if ((t = J(t).replace(V, "")).length < 2) return "";
          for (; t.length % 4 != 0; ) t += "=";
          return t;
        }
        function J(t) {
          return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
        }
        function Z(t) {
          return t < 16 ? "0" + t.toString(16) : t.toString(16);
        }
        function $(t, r) {
          var e;
          r = r || 1 / 0;
          for (var n = t.length, i = null, o = [], u = 0; u < n; ++u) {
            if ((e = t.charCodeAt(u)) > 55295 && e < 57344) {
              if (!i) {
                if (e > 56319) {
                  (r -= 3) > -1 && o.push(239, 191, 189);
                  continue;
                }
                if (u + 1 === n) {
                  (r -= 3) > -1 && o.push(239, 191, 189);
                  continue;
                }
                i = e;
                continue;
              }
              if (e < 56320) {
                (r -= 3) > -1 && o.push(239, 191, 189), (i = e);
                continue;
              }
              e = 65536 + (((i - 55296) << 10) | (e - 56320));
            } else i && (r -= 3) > -1 && o.push(239, 191, 189);
            if (((i = null), e < 128)) {
              if ((r -= 1) < 0) break;
              o.push(e);
            } else if (e < 2048) {
              if ((r -= 2) < 0) break;
              o.push((e >> 6) | 192, (63 & e) | 128);
            } else if (e < 65536) {
              if ((r -= 3) < 0) break;
              o.push((e >> 12) | 224, ((e >> 6) & 63) | 128, (63 & e) | 128);
            } else {
              if (!(e < 1114112)) throw new Error("Invalid code point");
              if ((r -= 4) < 0) break;
              o.push(
                (e >> 18) | 240,
                ((e >> 12) & 63) | 128,
                ((e >> 6) & 63) | 128,
                (63 & e) | 128
              );
            }
          }
          return o;
        }
        function G(t) {
          for (var r = [], e = 0; e < t.length; ++e)
            r.push(255 & t.charCodeAt(e));
          return r;
        }
        function H(t, r) {
          for (var e, n, i, o = [], u = 0; u < t.length && !((r -= 2) < 0); ++u)
            (n = (e = t.charCodeAt(u)) >> 8),
              (i = e % 256),
              o.push(i),
              o.push(n);
          return o;
        }
        function K(t) {
          return r.toByteArray(X(t));
        }
        function Q(t, r, e, n) {
          for (var i = 0; i < n && !(i + e >= r.length || i >= t.length); ++i)
            r[i + e] = t[i];
          return i;
        }
        function W(t) {
          return t != t;
        }
      },
      { "base64-js": "yh9p", ieee754: "JgNJ", isarray: "REa7", buffer: "dskh" },
    ],
    KgKa: [
      function (require, module, exports) {
        var global = arguments[3];
        var Buffer = require("buffer").Buffer;
        var e = arguments[3],
          r = require("buffer").Buffer,
          t = exports;
        function n(e, r, t) {
          for (var n = Object.keys(r), o = 0; o < n.length; ++o)
            (void 0 !== e[n[o]] && t) || (e[n[o]] = r[n[o]]);
          return e;
        }
        function o(e) {
          function r(e, t) {
            if (!(this instanceof r)) return new r(e, t);
            Object.defineProperty(this, "message", {
              get: function () {
                return e;
              },
            }),
              Error.captureStackTrace
                ? Error.captureStackTrace(this, r)
                : Object.defineProperty(this, "stack", {
                    value: new Error().stack || "",
                  }),
              t && n(this, t);
          }
          return (
            ((r.prototype = Object.create(Error.prototype)).constructor = r),
            Object.defineProperty(r.prototype, "name", {
              get: function () {
                return e;
              },
            }),
            (r.prototype.toString = function () {
              return this.name + ": " + this.message;
            }),
            r
          );
        }
        (t.asPromise = require("@protobufjs/aspromise")),
          (t.base64 = require("@protobufjs/base64")),
          (t.EventEmitter = require("@protobufjs/eventemitter")),
          (t.float = require("@protobufjs/float")),
          (t.inquire = require("@protobufjs/inquire")),
          (t.utf8 = require("@protobufjs/utf8")),
          (t.pool = require("@protobufjs/pool")),
          (t.LongBits = require("./longbits")),
          (t.global =
            ("undefined" != typeof window && window) ||
            (void 0 !== e && e) ||
            ("undefined" != typeof self && self) ||
            this),
          (t.emptyArray = Object.freeze ? Object.freeze([]) : []),
          (t.emptyObject = Object.freeze ? Object.freeze({}) : {}),
          (t.isNode = Boolean(
            t.global.process &&
              t.global.process.versions &&
              t.global.process.versions.node
          )),
          (t.isInteger =
            Number.isInteger ||
            function (e) {
              return "number" == typeof e && isFinite(e) && Math.floor(e) === e;
            }),
          (t.isString = function (e) {
            return "string" == typeof e || e instanceof String;
          }),
          (t.isObject = function (e) {
            return e && "object" == typeof e;
          }),
          (t.isset = t.isSet =
            function (e, r) {
              var t = e[r];
              return (
                !(null == t || !e.hasOwnProperty(r)) &&
                ("object" != typeof t ||
                  (Array.isArray(t) ? t.length : Object.keys(t).length) > 0)
              );
            }),
          (t.Buffer = (function () {
            try {
              var e = t.inquire("buffer").Buffer;
              return e.prototype.utf8Write ? e : null;
            } catch (r) {
              return null;
            }
          })()),
          (t._Buffer_from = null),
          (t._Buffer_allocUnsafe = null),
          (t.newBuffer = function (e) {
            return "number" == typeof e
              ? t.Buffer
                ? t._Buffer_allocUnsafe(e)
                : new t.Array(e)
              : t.Buffer
              ? t._Buffer_from(e)
              : "undefined" == typeof Uint8Array
              ? e
              : new Uint8Array(e);
          }),
          (t.Array = "undefined" != typeof Uint8Array ? Uint8Array : Array),
          (t.Long =
            (t.global.dcodeIO && t.global.dcodeIO.Long) ||
            t.global.Long ||
            t.inquire("long")),
          (t.key2Re = /^true|false|0|1$/),
          (t.key32Re = /^-?(?:0|[1-9][0-9]*)$/),
          (t.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/),
          (t.longToHash = function (e) {
            return e ? t.LongBits.from(e).toHash() : t.LongBits.zeroHash;
          }),
          (t.longFromHash = function (e, r) {
            var n = t.LongBits.fromHash(e);
            return t.Long
              ? t.Long.fromBits(n.lo, n.hi, r)
              : n.toNumber(Boolean(r));
          }),
          (t.merge = n),
          (t.lcFirst = function (e) {
            return e.charAt(0).toLowerCase() + e.substring(1);
          }),
          (t.newError = o),
          (t.ProtocolError = o("ProtocolError")),
          (t.oneOfGetter = function (e) {
            for (var r = {}, t = 0; t < e.length; ++t) r[e[t]] = 1;
            return function () {
              for (var e = Object.keys(this), t = e.length - 1; t > -1; --t)
                if (
                  1 === r[e[t]] &&
                  void 0 !== this[e[t]] &&
                  null !== this[e[t]]
                )
                  return e[t];
            };
          }),
          (t.oneOfSetter = function (e) {
            return function (r) {
              for (var t = 0; t < e.length; ++t)
                e[t] !== r && delete this[e[t]];
            };
          }),
          (t.toJSONOptions = {
            longs: String,
            enums: String,
            bytes: String,
            json: !0,
          }),
          (t._configure = function () {
            var e = t.Buffer;
            e
              ? ((t._Buffer_from =
                  (e.from !== Uint8Array.from && e.from) ||
                  function (r, t) {
                    return new e(r, t);
                  }),
                (t._Buffer_allocUnsafe =
                  e.allocUnsafe ||
                  function (r) {
                    return new e(r);
                  }))
              : (t._Buffer_from = t._Buffer_allocUnsafe = null);
          });
      },
      {
        "@protobufjs/aspromise": "oU4k",
        "@protobufjs/base64": "SASd",
        "@protobufjs/eventemitter": "wJQW",
        "@protobufjs/float": "SGHJ",
        "@protobufjs/inquire": "XRF3",
        "@protobufjs/utf8": "nie5",
        "@protobufjs/pool": "YX4y",
        "./longbits": "Ty7D",
        buffer: "dskh",
      },
    ],
    DEsF: [
      function (require, module, exports) {
        "use strict";
        module.exports = u;
        var t,
          i = require("./util/minimal"),
          n = i.LongBits,
          e = i.base64,
          o = i.utf8;
        function r(t, i, n) {
          (this.fn = t), (this.len = i), (this.next = void 0), (this.val = n);
        }
        function s() {}
        function h(t) {
          (this.head = t.head),
            (this.tail = t.tail),
            (this.len = t.len),
            (this.next = t.states);
        }
        function u() {
          (this.len = 0),
            (this.head = new r(s, 0, 0)),
            (this.tail = this.head),
            (this.states = null);
        }
        function l(t, i, n) {
          i[n] = 255 & t;
        }
        function p(t, i, n) {
          for (; t > 127; ) (i[n++] = (127 & t) | 128), (t >>>= 7);
          i[n] = t;
        }
        function a(t, i) {
          (this.len = t), (this.next = void 0), (this.val = i);
        }
        function f(t, i, n) {
          for (; t.hi; )
            (i[n++] = (127 & t.lo) | 128),
              (t.lo = ((t.lo >>> 7) | (t.hi << 25)) >>> 0),
              (t.hi >>>= 7);
          for (; t.lo > 127; )
            (i[n++] = (127 & t.lo) | 128), (t.lo = t.lo >>> 7);
          i[n++] = t.lo;
        }
        function c(t, i, n) {
          (i[n] = 255 & t),
            (i[n + 1] = (t >>> 8) & 255),
            (i[n + 2] = (t >>> 16) & 255),
            (i[n + 3] = t >>> 24);
        }
        (u.create = i.Buffer
          ? function () {
              return (u.create = function () {
                return new t();
              })();
            }
          : function () {
              return new u();
            }),
          (u.alloc = function (t) {
            return new i.Array(t);
          }),
          i.Array !== Array &&
            (u.alloc = i.pool(u.alloc, i.Array.prototype.subarray)),
          (u.prototype._push = function (t, i, n) {
            return (
              (this.tail = this.tail.next = new r(t, i, n)),
              (this.len += i),
              this
            );
          }),
          (a.prototype = Object.create(r.prototype)),
          (a.prototype.fn = p),
          (u.prototype.uint32 = function (t) {
            return (
              (this.len += (this.tail = this.tail.next =
                new a(
                  (t >>>= 0) < 128
                    ? 1
                    : t < 16384
                    ? 2
                    : t < 2097152
                    ? 3
                    : t < 268435456
                    ? 4
                    : 5,
                  t
                )).len),
              this
            );
          }),
          (u.prototype.int32 = function (t) {
            return t < 0 ? this._push(f, 10, n.fromNumber(t)) : this.uint32(t);
          }),
          (u.prototype.sint32 = function (t) {
            return this.uint32(((t << 1) ^ (t >> 31)) >>> 0);
          }),
          (u.prototype.uint64 = function (t) {
            var i = n.from(t);
            return this._push(f, i.length(), i);
          }),
          (u.prototype.int64 = u.prototype.uint64),
          (u.prototype.sint64 = function (t) {
            var i = n.from(t).zzEncode();
            return this._push(f, i.length(), i);
          }),
          (u.prototype.bool = function (t) {
            return this._push(l, 1, t ? 1 : 0);
          }),
          (u.prototype.fixed32 = function (t) {
            return this._push(c, 4, t >>> 0);
          }),
          (u.prototype.sfixed32 = u.prototype.fixed32),
          (u.prototype.fixed64 = function (t) {
            var i = n.from(t);
            return this._push(c, 4, i.lo)._push(c, 4, i.hi);
          }),
          (u.prototype.sfixed64 = u.prototype.fixed64),
          (u.prototype.float = function (t) {
            return this._push(i.float.writeFloatLE, 4, t);
          }),
          (u.prototype.double = function (t) {
            return this._push(i.float.writeDoubleLE, 8, t);
          });
        var y = i.Array.prototype.set
          ? function (t, i, n) {
              i.set(t, n);
            }
          : function (t, i, n) {
              for (var e = 0; e < t.length; ++e) i[n + e] = t[e];
            };
        (u.prototype.bytes = function (t) {
          var n = t.length >>> 0;
          if (!n) return this._push(l, 1, 0);
          if (i.isString(t)) {
            var o = u.alloc((n = e.length(t)));
            e.decode(t, o, 0), (t = o);
          }
          return this.uint32(n)._push(y, n, t);
        }),
          (u.prototype.string = function (t) {
            var i = o.length(t);
            return i
              ? this.uint32(i)._push(o.write, i, t)
              : this._push(l, 1, 0);
          }),
          (u.prototype.fork = function () {
            return (
              (this.states = new h(this)),
              (this.head = this.tail = new r(s, 0, 0)),
              (this.len = 0),
              this
            );
          }),
          (u.prototype.reset = function () {
            return (
              this.states
                ? ((this.head = this.states.head),
                  (this.tail = this.states.tail),
                  (this.len = this.states.len),
                  (this.states = this.states.next))
                : ((this.head = this.tail = new r(s, 0, 0)), (this.len = 0)),
              this
            );
          }),
          (u.prototype.ldelim = function () {
            var t = this.head,
              i = this.tail,
              n = this.len;
            return (
              this.reset().uint32(n),
              n &&
                ((this.tail.next = t.next), (this.tail = i), (this.len += n)),
              this
            );
          }),
          (u.prototype.finish = function () {
            for (
              var t = this.head.next,
                i = this.constructor.alloc(this.len),
                n = 0;
              t;

            )
              t.fn(t.val, i, n), (n += t.len), (t = t.next);
            return i;
          }),
          (u._configure = function (i) {
            t = i;
          });
      },
      { "./util/minimal": "KgKa" },
    ],
    BjCp: [
      function (require, module, exports) {
        "use strict";
        module.exports = n;
        var t = require("./writer");
        (n.prototype = Object.create(t.prototype)).constructor = n;
        var e = require("./util/minimal"),
          r = e.Buffer;
        function n() {
          t.call(this);
        }
        n.alloc = function (t) {
          return (n.alloc = e._Buffer_allocUnsafe)(t);
        };
        var i =
          r &&
          r.prototype instanceof Uint8Array &&
          "set" === r.prototype.set.name
            ? function (t, e, r) {
                e.set(t, r);
              }
            : function (t, e, r) {
                if (t.copy) t.copy(e, r, 0, t.length);
                else for (var n = 0; n < t.length; ) e[r++] = t[n++];
              };
        function o(t, r, n) {
          t.length < 40 ? e.utf8.write(t, r, n) : r.utf8Write(t, n);
        }
        (n.prototype.bytes = function (t) {
          e.isString(t) && (t = e._Buffer_from(t, "base64"));
          var r = t.length >>> 0;
          return this.uint32(r), r && this._push(i, r, t), this;
        }),
          (n.prototype.string = function (t) {
            var e = r.byteLength(t);
            return this.uint32(e), e && this._push(o, e, t), this;
          });
      },
      { "./writer": "DEsF", "./util/minimal": "KgKa" },
    ],
    z4LV: [
      function (require, module, exports) {
        "use strict";
        module.exports = h;
        var t,
          i = require("./util/minimal"),
          s = i.LongBits,
          r = i.utf8;
        function o(t, i) {
          return RangeError(
            "index out of range: " + t.pos + " + " + (i || 1) + " > " + t.len
          );
        }
        function h(t) {
          (this.buf = t), (this.pos = 0), (this.len = t.length);
        }
        var n =
          "undefined" != typeof Uint8Array
            ? function (t) {
                if (t instanceof Uint8Array || Array.isArray(t))
                  return new h(t);
                throw Error("illegal buffer");
              }
            : function (t) {
                if (Array.isArray(t)) return new h(t);
                throw Error("illegal buffer");
              };
        function e() {
          var t = new s(0, 0),
            i = 0;
          if (!(this.len - this.pos > 4)) {
            for (; i < 3; ++i) {
              if (this.pos >= this.len) throw o(this);
              if (
                ((t.lo =
                  (t.lo | ((127 & this.buf[this.pos]) << (7 * i))) >>> 0),
                this.buf[this.pos++] < 128)
              )
                return t;
            }
            return (
              (t.lo = (t.lo | ((127 & this.buf[this.pos++]) << (7 * i))) >>> 0),
              t
            );
          }
          for (; i < 4; ++i)
            if (
              ((t.lo = (t.lo | ((127 & this.buf[this.pos]) << (7 * i))) >>> 0),
              this.buf[this.pos++] < 128)
            )
              return t;
          if (
            ((t.lo = (t.lo | ((127 & this.buf[this.pos]) << 28)) >>> 0),
            (t.hi = (t.hi | ((127 & this.buf[this.pos]) >> 4)) >>> 0),
            this.buf[this.pos++] < 128)
          )
            return t;
          if (((i = 0), this.len - this.pos > 4)) {
            for (; i < 5; ++i)
              if (
                ((t.hi =
                  (t.hi | ((127 & this.buf[this.pos]) << (7 * i + 3))) >>> 0),
                this.buf[this.pos++] < 128)
              )
                return t;
          } else
            for (; i < 5; ++i) {
              if (this.pos >= this.len) throw o(this);
              if (
                ((t.hi =
                  (t.hi | ((127 & this.buf[this.pos]) << (7 * i + 3))) >>> 0),
                this.buf[this.pos++] < 128)
              )
                return t;
            }
          throw Error("invalid varint encoding");
        }
        function u(t, i) {
          return (
            (t[i - 4] |
              (t[i - 3] << 8) |
              (t[i - 2] << 16) |
              (t[i - 1] << 24)) >>>
            0
          );
        }
        function f() {
          if (this.pos + 8 > this.len) throw o(this, 8);
          return new s(
            u(this.buf, (this.pos += 4)),
            u(this.buf, (this.pos += 4))
          );
        }
        (h.create = i.Buffer
          ? function (s) {
              return (h.create = function (s) {
                return i.Buffer.isBuffer(s) ? new t(s) : n(s);
              })(s);
            }
          : n),
          (h.prototype._slice =
            i.Array.prototype.subarray || i.Array.prototype.slice),
          (h.prototype.uint32 = (function () {
            var t = 4294967295;
            return function () {
              if (
                ((t = (127 & this.buf[this.pos]) >>> 0),
                this.buf[this.pos++] < 128)
              )
                return t;
              if (
                ((t = (t | ((127 & this.buf[this.pos]) << 7)) >>> 0),
                this.buf[this.pos++] < 128)
              )
                return t;
              if (
                ((t = (t | ((127 & this.buf[this.pos]) << 14)) >>> 0),
                this.buf[this.pos++] < 128)
              )
                return t;
              if (
                ((t = (t | ((127 & this.buf[this.pos]) << 21)) >>> 0),
                this.buf[this.pos++] < 128)
              )
                return t;
              if (
                ((t = (t | ((15 & this.buf[this.pos]) << 28)) >>> 0),
                this.buf[this.pos++] < 128)
              )
                return t;
              if ((this.pos += 5) > this.len)
                throw ((this.pos = this.len), o(this, 10));
              return t;
            };
          })()),
          (h.prototype.int32 = function () {
            return 0 | this.uint32();
          }),
          (h.prototype.sint32 = function () {
            var t = this.uint32();
            return ((t >>> 1) ^ -(1 & t)) | 0;
          }),
          (h.prototype.bool = function () {
            return 0 !== this.uint32();
          }),
          (h.prototype.fixed32 = function () {
            if (this.pos + 4 > this.len) throw o(this, 4);
            return u(this.buf, (this.pos += 4));
          }),
          (h.prototype.sfixed32 = function () {
            if (this.pos + 4 > this.len) throw o(this, 4);
            return 0 | u(this.buf, (this.pos += 4));
          }),
          (h.prototype.float = function () {
            if (this.pos + 4 > this.len) throw o(this, 4);
            var t = i.float.readFloatLE(this.buf, this.pos);
            return (this.pos += 4), t;
          }),
          (h.prototype.double = function () {
            if (this.pos + 8 > this.len) throw o(this, 4);
            var t = i.float.readDoubleLE(this.buf, this.pos);
            return (this.pos += 8), t;
          }),
          (h.prototype.bytes = function () {
            var t = this.uint32(),
              i = this.pos,
              s = this.pos + t;
            if (s > this.len) throw o(this, t);
            return (
              (this.pos += t),
              Array.isArray(this.buf)
                ? this.buf.slice(i, s)
                : i === s
                ? new this.buf.constructor(0)
                : this._slice.call(this.buf, i, s)
            );
          }),
          (h.prototype.string = function () {
            var t = this.bytes();
            return r.read(t, 0, t.length);
          }),
          (h.prototype.skip = function (t) {
            if ("number" == typeof t) {
              if (this.pos + t > this.len) throw o(this, t);
              this.pos += t;
            } else
              do {
                if (this.pos >= this.len) throw o(this);
              } while (128 & this.buf[this.pos++]);
            return this;
          }),
          (h.prototype.skipType = function (t) {
            switch (t) {
              case 0:
                this.skip();
                break;
              case 1:
                this.skip(8);
                break;
              case 2:
                this.skip(this.uint32());
                break;
              case 3:
                for (; 4 != (t = 7 & this.uint32()); ) this.skipType(t);
                break;
              case 5:
                this.skip(4);
                break;
              default:
                throw Error(
                  "invalid wire type " + t + " at offset " + this.pos
                );
            }
            return this;
          }),
          (h._configure = function (s) {
            t = s;
            var r = i.Long ? "toLong" : "toNumber";
            i.merge(h.prototype, {
              int64: function () {
                return e.call(this)[r](!1);
              },
              uint64: function () {
                return e.call(this)[r](!0);
              },
              sint64: function () {
                return e.call(this).zzDecode()[r](!1);
              },
              fixed64: function () {
                return f.call(this)[r](!0);
              },
              sfixed64: function () {
                return f.call(this)[r](!1);
              },
            });
          });
      },
      { "./util/minimal": "KgKa" },
    ],
    Rkr2: [
      function (require, module, exports) {
        "use strict";
        module.exports = r;
        var t = require("./reader");
        (r.prototype = Object.create(t.prototype)).constructor = r;
        var e = require("./util/minimal");
        function r(e) {
          t.call(this, e);
        }
        e.Buffer && (r.prototype._slice = e.Buffer.prototype.slice),
          (r.prototype.string = function () {
            var t = this.uint32();
            return this.buf.utf8Slice(
              this.pos,
              (this.pos = Math.min(this.pos + t, this.len))
            );
          });
      },
      { "./reader": "z4LV", "./util/minimal": "KgKa" },
    ],
    eoks: [
      function (require, module, exports) {
        "use strict";
        module.exports = t;
        var e = require("../util/minimal");
        function t(t, r, i) {
          if ("function" != typeof t)
            throw TypeError("rpcImpl must be a function");
          e.EventEmitter.call(this),
            (this.rpcImpl = t),
            (this.requestDelimited = Boolean(r)),
            (this.responseDelimited = Boolean(i));
        }
        ((t.prototype = Object.create(e.EventEmitter.prototype)).constructor =
          t),
          (t.prototype.rpcCall = function t(r, i, n, o, l) {
            if (!o) throw TypeError("request must be specified");
            var u = this;
            if (!l) return e.asPromise(t, u, r, i, n, o);
            if (u.rpcImpl)
              try {
                return u.rpcImpl(
                  r,
                  i[u.requestDelimited ? "encodeDelimited" : "encode"](
                    o
                  ).finish(),
                  function (e, t) {
                    if (e) return u.emit("error", e, r), l(e);
                    if (null !== t) {
                      if (!(t instanceof n))
                        try {
                          t =
                            n[
                              u.responseDelimited ? "decodeDelimited" : "decode"
                            ](t);
                        } catch (e) {
                          return u.emit("error", e, r), l(e);
                        }
                      return u.emit("data", t, r), l(null, t);
                    }
                    u.end(!0);
                  }
                );
              } catch (c) {
                return (
                  u.emit("error", c, r),
                  void setTimeout(function () {
                    l(c);
                  }, 0)
                );
              }
            else
              setTimeout(function () {
                l(Error("already ended"));
              }, 0);
          }),
          (t.prototype.end = function (e) {
            return (
              this.rpcImpl &&
                (e || this.rpcImpl(null, null, null),
                (this.rpcImpl = null),
                this.emit("end").off()),
              this
            );
          });
      },
      { "../util/minimal": "KgKa" },
    ],
    ay75: [
      function (require, module, exports) {
        "use strict";
        var e = exports;
        e.Service = require("./rpc/service");
      },
      { "./rpc/service": "eoks" },
    ],
    Nr0F: [
      function (require, module, exports) {
        "use strict";
        module.exports = {};
      },
      {},
    ],
    qETn: [
      function (require, module, exports) {
        "use strict";
        var r = exports;
        function e() {
          r.Reader._configure(r.BufferReader), r.util._configure();
        }
        (r.build = "minimal"),
          (r.Writer = require("./writer")),
          (r.BufferWriter = require("./writer_buffer")),
          (r.Reader = require("./reader")),
          (r.BufferReader = require("./reader_buffer")),
          (r.util = require("./util/minimal")),
          (r.rpc = require("./rpc")),
          (r.roots = require("./roots")),
          (r.configure = e),
          r.Writer._configure(r.BufferWriter),
          e();
      },
      {
        "./writer": "DEsF",
        "./writer_buffer": "BjCp",
        "./reader": "z4LV",
        "./reader_buffer": "Rkr2",
        "./util/minimal": "KgKa",
        "./rpc": "ay75",
        "./roots": "Nr0F",
      },
    ],
    Myh2: [
      function (require, module, exports) {
        "use strict";
        module.exports = require("./src/index-minimal");
      },
      { "./src/index-minimal": "qETn" },
    ],
    YdJi: [
      function (require, module, exports) {
        "use strict";
        var e = require("protobufjs/minimal"),
          n = e.Reader,
          t = e.Writer,
          o = e.util,
          r = e.roots.default || (e.roots.default = {});
        (r.perftools = (function () {
          var i,
            l = {};
          return (
            (l.profiles =
              (((i = {}).Profile = (function () {
                function i(e) {
                  if (
                    ((this.sampleType = []),
                    (this.sample = []),
                    (this.mapping = []),
                    (this.location = []),
                    (this.function = []),
                    (this.stringTable = []),
                    (this.comment = []),
                    e)
                  )
                    for (var n = Object.keys(e), t = 0; t < n.length; ++t)
                      null != e[n[t]] && (this[n[t]] = e[n[t]]);
                }
                return (
                  (i.prototype.sampleType = o.emptyArray),
                  (i.prototype.sample = o.emptyArray),
                  (i.prototype.mapping = o.emptyArray),
                  (i.prototype.location = o.emptyArray),
                  (i.prototype.function = o.emptyArray),
                  (i.prototype.stringTable = o.emptyArray),
                  (i.prototype.dropFrames = o.Long
                    ? o.Long.fromBits(0, 0, !1)
                    : 0),
                  (i.prototype.keepFrames = o.Long
                    ? o.Long.fromBits(0, 0, !1)
                    : 0),
                  (i.prototype.timeNanos = o.Long
                    ? o.Long.fromBits(0, 0, !1)
                    : 0),
                  (i.prototype.durationNanos = o.Long
                    ? o.Long.fromBits(0, 0, !1)
                    : 0),
                  (i.prototype.periodType = null),
                  (i.prototype.period = o.Long ? o.Long.fromBits(0, 0, !1) : 0),
                  (i.prototype.comment = o.emptyArray),
                  (i.prototype.defaultSampleType = o.Long
                    ? o.Long.fromBits(0, 0, !1)
                    : 0),
                  (i.create = function (e) {
                    return new i(e);
                  }),
                  (i.encode = function (e, n) {
                    if (
                      (n || (n = t.create()),
                      null != e.sampleType && e.sampleType.length)
                    )
                      for (var o = 0; o < e.sampleType.length; ++o)
                        r.perftools.profiles.ValueType.encode(
                          e.sampleType[o],
                          n.uint32(10).fork()
                        ).ldelim();
                    if (null != e.sample && e.sample.length)
                      for (o = 0; o < e.sample.length; ++o)
                        r.perftools.profiles.Sample.encode(
                          e.sample[o],
                          n.uint32(18).fork()
                        ).ldelim();
                    if (null != e.mapping && e.mapping.length)
                      for (o = 0; o < e.mapping.length; ++o)
                        r.perftools.profiles.Mapping.encode(
                          e.mapping[o],
                          n.uint32(26).fork()
                        ).ldelim();
                    if (null != e.location && e.location.length)
                      for (o = 0; o < e.location.length; ++o)
                        r.perftools.profiles.Location.encode(
                          e.location[o],
                          n.uint32(34).fork()
                        ).ldelim();
                    if (null != e.function && e.function.length)
                      for (o = 0; o < e.function.length; ++o)
                        r.perftools.profiles.Function.encode(
                          e.function[o],
                          n.uint32(42).fork()
                        ).ldelim();
                    if (null != e.stringTable && e.stringTable.length)
                      for (o = 0; o < e.stringTable.length; ++o)
                        n.uint32(50).string(e.stringTable[o]);
                    if (
                      (null != e.dropFrames &&
                        e.hasOwnProperty("dropFrames") &&
                        n.uint32(56).int64(e.dropFrames),
                      null != e.keepFrames &&
                        e.hasOwnProperty("keepFrames") &&
                        n.uint32(64).int64(e.keepFrames),
                      null != e.timeNanos &&
                        e.hasOwnProperty("timeNanos") &&
                        n.uint32(72).int64(e.timeNanos),
                      null != e.durationNanos &&
                        e.hasOwnProperty("durationNanos") &&
                        n.uint32(80).int64(e.durationNanos),
                      null != e.periodType &&
                        e.hasOwnProperty("periodType") &&
                        r.perftools.profiles.ValueType.encode(
                          e.periodType,
                          n.uint32(90).fork()
                        ).ldelim(),
                      null != e.period &&
                        e.hasOwnProperty("period") &&
                        n.uint32(96).int64(e.period),
                      null != e.comment && e.comment.length)
                    ) {
                      for (
                        n.uint32(106).fork(), o = 0;
                        o < e.comment.length;
                        ++o
                      )
                        n.int64(e.comment[o]);
                      n.ldelim();
                    }
                    return (
                      null != e.defaultSampleType &&
                        e.hasOwnProperty("defaultSampleType") &&
                        n.uint32(112).int64(e.defaultSampleType),
                      n
                    );
                  }),
                  (i.encodeDelimited = function (e, n) {
                    return this.encode(e, n).ldelim();
                  }),
                  (i.decode = function (e, t) {
                    e instanceof n || (e = n.create(e));
                    for (
                      var o = void 0 === t ? e.len : e.pos + t,
                        i = new r.perftools.profiles.Profile();
                      e.pos < o;

                    ) {
                      var l = e.uint32();
                      switch (l >>> 3) {
                        case 1:
                          (i.sampleType && i.sampleType.length) ||
                            (i.sampleType = []),
                            i.sampleType.push(
                              r.perftools.profiles.ValueType.decode(
                                e,
                                e.uint32()
                              )
                            );
                          break;
                        case 2:
                          (i.sample && i.sample.length) || (i.sample = []),
                            i.sample.push(
                              r.perftools.profiles.Sample.decode(e, e.uint32())
                            );
                          break;
                        case 3:
                          (i.mapping && i.mapping.length) || (i.mapping = []),
                            i.mapping.push(
                              r.perftools.profiles.Mapping.decode(e, e.uint32())
                            );
                          break;
                        case 4:
                          (i.location && i.location.length) ||
                            (i.location = []),
                            i.location.push(
                              r.perftools.profiles.Location.decode(
                                e,
                                e.uint32()
                              )
                            );
                          break;
                        case 5:
                          (i.function && i.function.length) ||
                            (i.function = []),
                            i.function.push(
                              r.perftools.profiles.Function.decode(
                                e,
                                e.uint32()
                              )
                            );
                          break;
                        case 6:
                          (i.stringTable && i.stringTable.length) ||
                            (i.stringTable = []),
                            i.stringTable.push(e.string());
                          break;
                        case 7:
                          i.dropFrames = e.int64();
                          break;
                        case 8:
                          i.keepFrames = e.int64();
                          break;
                        case 9:
                          i.timeNanos = e.int64();
                          break;
                        case 10:
                          i.durationNanos = e.int64();
                          break;
                        case 11:
                          i.periodType = r.perftools.profiles.ValueType.decode(
                            e,
                            e.uint32()
                          );
                          break;
                        case 12:
                          i.period = e.int64();
                          break;
                        case 13:
                          if (
                            ((i.comment && i.comment.length) ||
                              (i.comment = []),
                            2 == (7 & l))
                          )
                            for (var s = e.uint32() + e.pos; e.pos < s; )
                              i.comment.push(e.int64());
                          else i.comment.push(e.int64());
                          break;
                        case 14:
                          i.defaultSampleType = e.int64();
                          break;
                        default:
                          e.skipType(7 & l);
                      }
                    }
                    return i;
                  }),
                  (i.decodeDelimited = function (e) {
                    return (
                      e instanceof n || (e = new n(e)),
                      this.decode(e, e.uint32())
                    );
                  }),
                  (i.verify = function (e) {
                    if ("object" != typeof e || null === e)
                      return "object expected";
                    if (
                      null != e.sampleType &&
                      e.hasOwnProperty("sampleType")
                    ) {
                      if (!Array.isArray(e.sampleType))
                        return "sampleType: array expected";
                      for (var n = 0; n < e.sampleType.length; ++n)
                        if (
                          (t = r.perftools.profiles.ValueType.verify(
                            e.sampleType[n]
                          ))
                        )
                          return "sampleType." + t;
                    }
                    if (null != e.sample && e.hasOwnProperty("sample")) {
                      if (!Array.isArray(e.sample))
                        return "sample: array expected";
                      for (n = 0; n < e.sample.length; ++n)
                        if (
                          (t = r.perftools.profiles.Sample.verify(e.sample[n]))
                        )
                          return "sample." + t;
                    }
                    if (null != e.mapping && e.hasOwnProperty("mapping")) {
                      if (!Array.isArray(e.mapping))
                        return "mapping: array expected";
                      for (n = 0; n < e.mapping.length; ++n)
                        if (
                          (t = r.perftools.profiles.Mapping.verify(
                            e.mapping[n]
                          ))
                        )
                          return "mapping." + t;
                    }
                    if (null != e.location && e.hasOwnProperty("location")) {
                      if (!Array.isArray(e.location))
                        return "location: array expected";
                      for (n = 0; n < e.location.length; ++n)
                        if (
                          (t = r.perftools.profiles.Location.verify(
                            e.location[n]
                          ))
                        )
                          return "location." + t;
                    }
                    if (null != e.function && e.hasOwnProperty("function")) {
                      if (!Array.isArray(e.function))
                        return "function: array expected";
                      for (n = 0; n < e.function.length; ++n)
                        if (
                          (t = r.perftools.profiles.Function.verify(
                            e.function[n]
                          ))
                        )
                          return "function." + t;
                    }
                    if (
                      null != e.stringTable &&
                      e.hasOwnProperty("stringTable")
                    ) {
                      if (!Array.isArray(e.stringTable))
                        return "stringTable: array expected";
                      for (n = 0; n < e.stringTable.length; ++n)
                        if (!o.isString(e.stringTable[n]))
                          return "stringTable: string[] expected";
                    }
                    if (
                      null != e.dropFrames &&
                      e.hasOwnProperty("dropFrames") &&
                      !(
                        o.isInteger(e.dropFrames) ||
                        (e.dropFrames &&
                          o.isInteger(e.dropFrames.low) &&
                          o.isInteger(e.dropFrames.high))
                      )
                    )
                      return "dropFrames: integer|Long expected";
                    if (
                      null != e.keepFrames &&
                      e.hasOwnProperty("keepFrames") &&
                      !(
                        o.isInteger(e.keepFrames) ||
                        (e.keepFrames &&
                          o.isInteger(e.keepFrames.low) &&
                          o.isInteger(e.keepFrames.high))
                      )
                    )
                      return "keepFrames: integer|Long expected";
                    if (
                      null != e.timeNanos &&
                      e.hasOwnProperty("timeNanos") &&
                      !(
                        o.isInteger(e.timeNanos) ||
                        (e.timeNanos &&
                          o.isInteger(e.timeNanos.low) &&
                          o.isInteger(e.timeNanos.high))
                      )
                    )
                      return "timeNanos: integer|Long expected";
                    if (
                      null != e.durationNanos &&
                      e.hasOwnProperty("durationNanos") &&
                      !(
                        o.isInteger(e.durationNanos) ||
                        (e.durationNanos &&
                          o.isInteger(e.durationNanos.low) &&
                          o.isInteger(e.durationNanos.high))
                      )
                    )
                      return "durationNanos: integer|Long expected";
                    var t;
                    if (
                      null != e.periodType &&
                      e.hasOwnProperty("periodType") &&
                      (t = r.perftools.profiles.ValueType.verify(e.periodType))
                    )
                      return "periodType." + t;
                    if (
                      null != e.period &&
                      e.hasOwnProperty("period") &&
                      !(
                        o.isInteger(e.period) ||
                        (e.period &&
                          o.isInteger(e.period.low) &&
                          o.isInteger(e.period.high))
                      )
                    )
                      return "period: integer|Long expected";
                    if (null != e.comment && e.hasOwnProperty("comment")) {
                      if (!Array.isArray(e.comment))
                        return "comment: array expected";
                      for (n = 0; n < e.comment.length; ++n)
                        if (
                          !(
                            o.isInteger(e.comment[n]) ||
                            (e.comment[n] &&
                              o.isInteger(e.comment[n].low) &&
                              o.isInteger(e.comment[n].high))
                          )
                        )
                          return "comment: integer|Long[] expected";
                    }
                    return null != e.defaultSampleType &&
                      e.hasOwnProperty("defaultSampleType") &&
                      !(
                        o.isInteger(e.defaultSampleType) ||
                        (e.defaultSampleType &&
                          o.isInteger(e.defaultSampleType.low) &&
                          o.isInteger(e.defaultSampleType.high))
                      )
                      ? "defaultSampleType: integer|Long expected"
                      : null;
                  }),
                  (i.fromObject = function (e) {
                    if (e instanceof r.perftools.profiles.Profile) return e;
                    var n = new r.perftools.profiles.Profile();
                    if (e.sampleType) {
                      if (!Array.isArray(e.sampleType))
                        throw TypeError(
                          ".perftools.profiles.Profile.sampleType: array expected"
                        );
                      n.sampleType = [];
                      for (var t = 0; t < e.sampleType.length; ++t) {
                        if ("object" != typeof e.sampleType[t])
                          throw TypeError(
                            ".perftools.profiles.Profile.sampleType: object expected"
                          );
                        n.sampleType[t] =
                          r.perftools.profiles.ValueType.fromObject(
                            e.sampleType[t]
                          );
                      }
                    }
                    if (e.sample) {
                      if (!Array.isArray(e.sample))
                        throw TypeError(
                          ".perftools.profiles.Profile.sample: array expected"
                        );
                      for (n.sample = [], t = 0; t < e.sample.length; ++t) {
                        if ("object" != typeof e.sample[t])
                          throw TypeError(
                            ".perftools.profiles.Profile.sample: object expected"
                          );
                        n.sample[t] = r.perftools.profiles.Sample.fromObject(
                          e.sample[t]
                        );
                      }
                    }
                    if (e.mapping) {
                      if (!Array.isArray(e.mapping))
                        throw TypeError(
                          ".perftools.profiles.Profile.mapping: array expected"
                        );
                      for (n.mapping = [], t = 0; t < e.mapping.length; ++t) {
                        if ("object" != typeof e.mapping[t])
                          throw TypeError(
                            ".perftools.profiles.Profile.mapping: object expected"
                          );
                        n.mapping[t] = r.perftools.profiles.Mapping.fromObject(
                          e.mapping[t]
                        );
                      }
                    }
                    if (e.location) {
                      if (!Array.isArray(e.location))
                        throw TypeError(
                          ".perftools.profiles.Profile.location: array expected"
                        );
                      for (n.location = [], t = 0; t < e.location.length; ++t) {
                        if ("object" != typeof e.location[t])
                          throw TypeError(
                            ".perftools.profiles.Profile.location: object expected"
                          );
                        n.location[t] =
                          r.perftools.profiles.Location.fromObject(
                            e.location[t]
                          );
                      }
                    }
                    if (e.function) {
                      if (!Array.isArray(e.function))
                        throw TypeError(
                          ".perftools.profiles.Profile.function: array expected"
                        );
                      for (n.function = [], t = 0; t < e.function.length; ++t) {
                        if ("object" != typeof e.function[t])
                          throw TypeError(
                            ".perftools.profiles.Profile.function: object expected"
                          );
                        n.function[t] =
                          r.perftools.profiles.Function.fromObject(
                            e.function[t]
                          );
                      }
                    }
                    if (e.stringTable) {
                      if (!Array.isArray(e.stringTable))
                        throw TypeError(
                          ".perftools.profiles.Profile.stringTable: array expected"
                        );
                      for (
                        n.stringTable = [], t = 0;
                        t < e.stringTable.length;
                        ++t
                      )
                        n.stringTable[t] = String(e.stringTable[t]);
                    }
                    if (
                      (null != e.dropFrames &&
                        (o.Long
                          ? ((n.dropFrames = o.Long.fromValue(
                              e.dropFrames
                            )).unsigned = !1)
                          : "string" == typeof e.dropFrames
                          ? (n.dropFrames = parseInt(e.dropFrames, 10))
                          : "number" == typeof e.dropFrames
                          ? (n.dropFrames = e.dropFrames)
                          : "object" == typeof e.dropFrames &&
                            (n.dropFrames = new o.LongBits(
                              e.dropFrames.low >>> 0,
                              e.dropFrames.high >>> 0
                            ).toNumber())),
                      null != e.keepFrames &&
                        (o.Long
                          ? ((n.keepFrames = o.Long.fromValue(
                              e.keepFrames
                            )).unsigned = !1)
                          : "string" == typeof e.keepFrames
                          ? (n.keepFrames = parseInt(e.keepFrames, 10))
                          : "number" == typeof e.keepFrames
                          ? (n.keepFrames = e.keepFrames)
                          : "object" == typeof e.keepFrames &&
                            (n.keepFrames = new o.LongBits(
                              e.keepFrames.low >>> 0,
                              e.keepFrames.high >>> 0
                            ).toNumber())),
                      null != e.timeNanos &&
                        (o.Long
                          ? ((n.timeNanos = o.Long.fromValue(
                              e.timeNanos
                            )).unsigned = !1)
                          : "string" == typeof e.timeNanos
                          ? (n.timeNanos = parseInt(e.timeNanos, 10))
                          : "number" == typeof e.timeNanos
                          ? (n.timeNanos = e.timeNanos)
                          : "object" == typeof e.timeNanos &&
                            (n.timeNanos = new o.LongBits(
                              e.timeNanos.low >>> 0,
                              e.timeNanos.high >>> 0
                            ).toNumber())),
                      null != e.durationNanos &&
                        (o.Long
                          ? ((n.durationNanos = o.Long.fromValue(
                              e.durationNanos
                            )).unsigned = !1)
                          : "string" == typeof e.durationNanos
                          ? (n.durationNanos = parseInt(e.durationNanos, 10))
                          : "number" == typeof e.durationNanos
                          ? (n.durationNanos = e.durationNanos)
                          : "object" == typeof e.durationNanos &&
                            (n.durationNanos = new o.LongBits(
                              e.durationNanos.low >>> 0,
                              e.durationNanos.high >>> 0
                            ).toNumber())),
                      null != e.periodType)
                    ) {
                      if ("object" != typeof e.periodType)
                        throw TypeError(
                          ".perftools.profiles.Profile.periodType: object expected"
                        );
                      n.periodType = r.perftools.profiles.ValueType.fromObject(
                        e.periodType
                      );
                    }
                    if (
                      (null != e.period &&
                        (o.Long
                          ? ((n.period = o.Long.fromValue(e.period)).unsigned =
                              !1)
                          : "string" == typeof e.period
                          ? (n.period = parseInt(e.period, 10))
                          : "number" == typeof e.period
                          ? (n.period = e.period)
                          : "object" == typeof e.period &&
                            (n.period = new o.LongBits(
                              e.period.low >>> 0,
                              e.period.high >>> 0
                            ).toNumber())),
                      e.comment)
                    ) {
                      if (!Array.isArray(e.comment))
                        throw TypeError(
                          ".perftools.profiles.Profile.comment: array expected"
                        );
                      for (n.comment = [], t = 0; t < e.comment.length; ++t)
                        o.Long
                          ? ((n.comment[t] = o.Long.fromValue(
                              e.comment[t]
                            )).unsigned = !1)
                          : "string" == typeof e.comment[t]
                          ? (n.comment[t] = parseInt(e.comment[t], 10))
                          : "number" == typeof e.comment[t]
                          ? (n.comment[t] = e.comment[t])
                          : "object" == typeof e.comment[t] &&
                            (n.comment[t] = new o.LongBits(
                              e.comment[t].low >>> 0,
                              e.comment[t].high >>> 0
                            ).toNumber());
                    }
                    return (
                      null != e.defaultSampleType &&
                        (o.Long
                          ? ((n.defaultSampleType = o.Long.fromValue(
                              e.defaultSampleType
                            )).unsigned = !1)
                          : "string" == typeof e.defaultSampleType
                          ? (n.defaultSampleType = parseInt(
                              e.defaultSampleType,
                              10
                            ))
                          : "number" == typeof e.defaultSampleType
                          ? (n.defaultSampleType = e.defaultSampleType)
                          : "object" == typeof e.defaultSampleType &&
                            (n.defaultSampleType = new o.LongBits(
                              e.defaultSampleType.low >>> 0,
                              e.defaultSampleType.high >>> 0
                            ).toNumber())),
                      n
                    );
                  }),
                  (i.toObject = function (e, n) {
                    n || (n = {});
                    var t = {};
                    if (
                      ((n.arrays || n.defaults) &&
                        ((t.sampleType = []),
                        (t.sample = []),
                        (t.mapping = []),
                        (t.location = []),
                        (t.function = []),
                        (t.stringTable = []),
                        (t.comment = [])),
                      n.defaults)
                    ) {
                      if (o.Long) {
                        var i = new o.Long(0, 0, !1);
                        t.dropFrames =
                          n.longs === String
                            ? i.toString()
                            : n.longs === Number
                            ? i.toNumber()
                            : i;
                      } else t.dropFrames = n.longs === String ? "0" : 0;
                      o.Long
                        ? ((i = new o.Long(0, 0, !1)),
                          (t.keepFrames =
                            n.longs === String
                              ? i.toString()
                              : n.longs === Number
                              ? i.toNumber()
                              : i))
                        : (t.keepFrames = n.longs === String ? "0" : 0),
                        o.Long
                          ? ((i = new o.Long(0, 0, !1)),
                            (t.timeNanos =
                              n.longs === String
                                ? i.toString()
                                : n.longs === Number
                                ? i.toNumber()
                                : i))
                          : (t.timeNanos = n.longs === String ? "0" : 0),
                        o.Long
                          ? ((i = new o.Long(0, 0, !1)),
                            (t.durationNanos =
                              n.longs === String
                                ? i.toString()
                                : n.longs === Number
                                ? i.toNumber()
                                : i))
                          : (t.durationNanos = n.longs === String ? "0" : 0),
                        (t.periodType = null),
                        o.Long
                          ? ((i = new o.Long(0, 0, !1)),
                            (t.period =
                              n.longs === String
                                ? i.toString()
                                : n.longs === Number
                                ? i.toNumber()
                                : i))
                          : (t.period = n.longs === String ? "0" : 0),
                        o.Long
                          ? ((i = new o.Long(0, 0, !1)),
                            (t.defaultSampleType =
                              n.longs === String
                                ? i.toString()
                                : n.longs === Number
                                ? i.toNumber()
                                : i))
                          : (t.defaultSampleType =
                              n.longs === String ? "0" : 0);
                    }
                    if (e.sampleType && e.sampleType.length) {
                      t.sampleType = [];
                      for (var l = 0; l < e.sampleType.length; ++l)
                        t.sampleType[l] =
                          r.perftools.profiles.ValueType.toObject(
                            e.sampleType[l],
                            n
                          );
                    }
                    if (e.sample && e.sample.length)
                      for (t.sample = [], l = 0; l < e.sample.length; ++l)
                        t.sample[l] = r.perftools.profiles.Sample.toObject(
                          e.sample[l],
                          n
                        );
                    if (e.mapping && e.mapping.length)
                      for (t.mapping = [], l = 0; l < e.mapping.length; ++l)
                        t.mapping[l] = r.perftools.profiles.Mapping.toObject(
                          e.mapping[l],
                          n
                        );
                    if (e.location && e.location.length)
                      for (t.location = [], l = 0; l < e.location.length; ++l)
                        t.location[l] = r.perftools.profiles.Location.toObject(
                          e.location[l],
                          n
                        );
                    if (e.function && e.function.length)
                      for (t.function = [], l = 0; l < e.function.length; ++l)
                        t.function[l] = r.perftools.profiles.Function.toObject(
                          e.function[l],
                          n
                        );
                    if (e.stringTable && e.stringTable.length)
                      for (
                        t.stringTable = [], l = 0;
                        l < e.stringTable.length;
                        ++l
                      )
                        t.stringTable[l] = e.stringTable[l];
                    if (
                      (null != e.dropFrames &&
                        e.hasOwnProperty("dropFrames") &&
                        ("number" == typeof e.dropFrames
                          ? (t.dropFrames =
                              n.longs === String
                                ? String(e.dropFrames)
                                : e.dropFrames)
                          : (t.dropFrames =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.dropFrames)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.dropFrames.low >>> 0,
                                    e.dropFrames.high >>> 0
                                  ).toNumber()
                                : e.dropFrames)),
                      null != e.keepFrames &&
                        e.hasOwnProperty("keepFrames") &&
                        ("number" == typeof e.keepFrames
                          ? (t.keepFrames =
                              n.longs === String
                                ? String(e.keepFrames)
                                : e.keepFrames)
                          : (t.keepFrames =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.keepFrames)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.keepFrames.low >>> 0,
                                    e.keepFrames.high >>> 0
                                  ).toNumber()
                                : e.keepFrames)),
                      null != e.timeNanos &&
                        e.hasOwnProperty("timeNanos") &&
                        ("number" == typeof e.timeNanos
                          ? (t.timeNanos =
                              n.longs === String
                                ? String(e.timeNanos)
                                : e.timeNanos)
                          : (t.timeNanos =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.timeNanos)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.timeNanos.low >>> 0,
                                    e.timeNanos.high >>> 0
                                  ).toNumber()
                                : e.timeNanos)),
                      null != e.durationNanos &&
                        e.hasOwnProperty("durationNanos") &&
                        ("number" == typeof e.durationNanos
                          ? (t.durationNanos =
                              n.longs === String
                                ? String(e.durationNanos)
                                : e.durationNanos)
                          : (t.durationNanos =
                              n.longs === String
                                ? o.Long.prototype.toString.call(
                                    e.durationNanos
                                  )
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.durationNanos.low >>> 0,
                                    e.durationNanos.high >>> 0
                                  ).toNumber()
                                : e.durationNanos)),
                      null != e.periodType &&
                        e.hasOwnProperty("periodType") &&
                        (t.periodType = r.perftools.profiles.ValueType.toObject(
                          e.periodType,
                          n
                        )),
                      null != e.period &&
                        e.hasOwnProperty("period") &&
                        ("number" == typeof e.period
                          ? (t.period =
                              n.longs === String ? String(e.period) : e.period)
                          : (t.period =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.period)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.period.low >>> 0,
                                    e.period.high >>> 0
                                  ).toNumber()
                                : e.period)),
                      e.comment && e.comment.length)
                    )
                      for (t.comment = [], l = 0; l < e.comment.length; ++l)
                        "number" == typeof e.comment[l]
                          ? (t.comment[l] =
                              n.longs === String
                                ? String(e.comment[l])
                                : e.comment[l])
                          : (t.comment[l] =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.comment[l])
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.comment[l].low >>> 0,
                                    e.comment[l].high >>> 0
                                  ).toNumber()
                                : e.comment[l]);
                    return (
                      null != e.defaultSampleType &&
                        e.hasOwnProperty("defaultSampleType") &&
                        ("number" == typeof e.defaultSampleType
                          ? (t.defaultSampleType =
                              n.longs === String
                                ? String(e.defaultSampleType)
                                : e.defaultSampleType)
                          : (t.defaultSampleType =
                              n.longs === String
                                ? o.Long.prototype.toString.call(
                                    e.defaultSampleType
                                  )
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.defaultSampleType.low >>> 0,
                                    e.defaultSampleType.high >>> 0
                                  ).toNumber()
                                : e.defaultSampleType)),
                      t
                    );
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(
                      this,
                      e.util.toJSONOptions
                    );
                  }),
                  i
                );
              })()),
              (i.ValueType = (function () {
                function i(e) {
                  if (e)
                    for (var n = Object.keys(e), t = 0; t < n.length; ++t)
                      null != e[n[t]] && (this[n[t]] = e[n[t]]);
                }
                return (
                  (i.prototype.type = o.Long ? o.Long.fromBits(0, 0, !1) : 0),
                  (i.prototype.unit = o.Long ? o.Long.fromBits(0, 0, !1) : 0),
                  (i.create = function (e) {
                    return new i(e);
                  }),
                  (i.encode = function (e, n) {
                    return (
                      n || (n = t.create()),
                      null != e.type &&
                        e.hasOwnProperty("type") &&
                        n.uint32(8).int64(e.type),
                      null != e.unit &&
                        e.hasOwnProperty("unit") &&
                        n.uint32(16).int64(e.unit),
                      n
                    );
                  }),
                  (i.encodeDelimited = function (e, n) {
                    return this.encode(e, n).ldelim();
                  }),
                  (i.decode = function (e, t) {
                    e instanceof n || (e = n.create(e));
                    for (
                      var o = void 0 === t ? e.len : e.pos + t,
                        i = new r.perftools.profiles.ValueType();
                      e.pos < o;

                    ) {
                      var l = e.uint32();
                      switch (l >>> 3) {
                        case 1:
                          i.type = e.int64();
                          break;
                        case 2:
                          i.unit = e.int64();
                          break;
                        default:
                          e.skipType(7 & l);
                      }
                    }
                    return i;
                  }),
                  (i.decodeDelimited = function (e) {
                    return (
                      e instanceof n || (e = new n(e)),
                      this.decode(e, e.uint32())
                    );
                  }),
                  (i.verify = function (e) {
                    return "object" != typeof e || null === e
                      ? "object expected"
                      : null != e.type &&
                        e.hasOwnProperty("type") &&
                        !(
                          o.isInteger(e.type) ||
                          (e.type &&
                            o.isInteger(e.type.low) &&
                            o.isInteger(e.type.high))
                        )
                      ? "type: integer|Long expected"
                      : null != e.unit &&
                        e.hasOwnProperty("unit") &&
                        !(
                          o.isInteger(e.unit) ||
                          (e.unit &&
                            o.isInteger(e.unit.low) &&
                            o.isInteger(e.unit.high))
                        )
                      ? "unit: integer|Long expected"
                      : null;
                  }),
                  (i.fromObject = function (e) {
                    if (e instanceof r.perftools.profiles.ValueType) return e;
                    var n = new r.perftools.profiles.ValueType();
                    return (
                      null != e.type &&
                        (o.Long
                          ? ((n.type = o.Long.fromValue(e.type)).unsigned = !1)
                          : "string" == typeof e.type
                          ? (n.type = parseInt(e.type, 10))
                          : "number" == typeof e.type
                          ? (n.type = e.type)
                          : "object" == typeof e.type &&
                            (n.type = new o.LongBits(
                              e.type.low >>> 0,
                              e.type.high >>> 0
                            ).toNumber())),
                      null != e.unit &&
                        (o.Long
                          ? ((n.unit = o.Long.fromValue(e.unit)).unsigned = !1)
                          : "string" == typeof e.unit
                          ? (n.unit = parseInt(e.unit, 10))
                          : "number" == typeof e.unit
                          ? (n.unit = e.unit)
                          : "object" == typeof e.unit &&
                            (n.unit = new o.LongBits(
                              e.unit.low >>> 0,
                              e.unit.high >>> 0
                            ).toNumber())),
                      n
                    );
                  }),
                  (i.toObject = function (e, n) {
                    n || (n = {});
                    var t = {};
                    if (n.defaults) {
                      if (o.Long) {
                        var r = new o.Long(0, 0, !1);
                        t.type =
                          n.longs === String
                            ? r.toString()
                            : n.longs === Number
                            ? r.toNumber()
                            : r;
                      } else t.type = n.longs === String ? "0" : 0;
                      o.Long
                        ? ((r = new o.Long(0, 0, !1)),
                          (t.unit =
                            n.longs === String
                              ? r.toString()
                              : n.longs === Number
                              ? r.toNumber()
                              : r))
                        : (t.unit = n.longs === String ? "0" : 0);
                    }
                    return (
                      null != e.type &&
                        e.hasOwnProperty("type") &&
                        ("number" == typeof e.type
                          ? (t.type =
                              n.longs === String ? String(e.type) : e.type)
                          : (t.type =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.type)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.type.low >>> 0,
                                    e.type.high >>> 0
                                  ).toNumber()
                                : e.type)),
                      null != e.unit &&
                        e.hasOwnProperty("unit") &&
                        ("number" == typeof e.unit
                          ? (t.unit =
                              n.longs === String ? String(e.unit) : e.unit)
                          : (t.unit =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.unit)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.unit.low >>> 0,
                                    e.unit.high >>> 0
                                  ).toNumber()
                                : e.unit)),
                      t
                    );
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(
                      this,
                      e.util.toJSONOptions
                    );
                  }),
                  i
                );
              })()),
              (i.Sample = (function () {
                function i(e) {
                  if (
                    ((this.locationId = []),
                    (this.value = []),
                    (this.label = []),
                    e)
                  )
                    for (var n = Object.keys(e), t = 0; t < n.length; ++t)
                      null != e[n[t]] && (this[n[t]] = e[n[t]]);
                }
                return (
                  (i.prototype.locationId = o.emptyArray),
                  (i.prototype.value = o.emptyArray),
                  (i.prototype.label = o.emptyArray),
                  (i.create = function (e) {
                    return new i(e);
                  }),
                  (i.encode = function (e, n) {
                    if (
                      (n || (n = t.create()),
                      null != e.locationId && e.locationId.length)
                    ) {
                      n.uint32(10).fork();
                      for (var o = 0; o < e.locationId.length; ++o)
                        n.uint64(e.locationId[o]);
                      n.ldelim();
                    }
                    if (null != e.value && e.value.length) {
                      for (n.uint32(18).fork(), o = 0; o < e.value.length; ++o)
                        n.int64(e.value[o]);
                      n.ldelim();
                    }
                    if (null != e.label && e.label.length)
                      for (o = 0; o < e.label.length; ++o)
                        r.perftools.profiles.Label.encode(
                          e.label[o],
                          n.uint32(26).fork()
                        ).ldelim();
                    return n;
                  }),
                  (i.encodeDelimited = function (e, n) {
                    return this.encode(e, n).ldelim();
                  }),
                  (i.decode = function (e, t) {
                    e instanceof n || (e = n.create(e));
                    for (
                      var o = void 0 === t ? e.len : e.pos + t,
                        i = new r.perftools.profiles.Sample();
                      e.pos < o;

                    ) {
                      var l = e.uint32();
                      switch (l >>> 3) {
                        case 1:
                          if (
                            ((i.locationId && i.locationId.length) ||
                              (i.locationId = []),
                            2 == (7 & l))
                          )
                            for (var s = e.uint32() + e.pos; e.pos < s; )
                              i.locationId.push(e.uint64());
                          else i.locationId.push(e.uint64());
                          break;
                        case 2:
                          if (
                            ((i.value && i.value.length) || (i.value = []),
                            2 == (7 & l))
                          )
                            for (s = e.uint32() + e.pos; e.pos < s; )
                              i.value.push(e.int64());
                          else i.value.push(e.int64());
                          break;
                        case 3:
                          (i.label && i.label.length) || (i.label = []),
                            i.label.push(
                              r.perftools.profiles.Label.decode(e, e.uint32())
                            );
                          break;
                        default:
                          e.skipType(7 & l);
                      }
                    }
                    return i;
                  }),
                  (i.decodeDelimited = function (e) {
                    return (
                      e instanceof n || (e = new n(e)),
                      this.decode(e, e.uint32())
                    );
                  }),
                  (i.verify = function (e) {
                    if ("object" != typeof e || null === e)
                      return "object expected";
                    if (
                      null != e.locationId &&
                      e.hasOwnProperty("locationId")
                    ) {
                      if (!Array.isArray(e.locationId))
                        return "locationId: array expected";
                      for (var n = 0; n < e.locationId.length; ++n)
                        if (
                          !(
                            o.isInteger(e.locationId[n]) ||
                            (e.locationId[n] &&
                              o.isInteger(e.locationId[n].low) &&
                              o.isInteger(e.locationId[n].high))
                          )
                        )
                          return "locationId: integer|Long[] expected";
                    }
                    if (null != e.value && e.hasOwnProperty("value")) {
                      if (!Array.isArray(e.value))
                        return "value: array expected";
                      for (n = 0; n < e.value.length; ++n)
                        if (
                          !(
                            o.isInteger(e.value[n]) ||
                            (e.value[n] &&
                              o.isInteger(e.value[n].low) &&
                              o.isInteger(e.value[n].high))
                          )
                        )
                          return "value: integer|Long[] expected";
                    }
                    if (null != e.label && e.hasOwnProperty("label")) {
                      if (!Array.isArray(e.label))
                        return "label: array expected";
                      for (n = 0; n < e.label.length; ++n) {
                        var t = r.perftools.profiles.Label.verify(e.label[n]);
                        if (t) return "label." + t;
                      }
                    }
                    return null;
                  }),
                  (i.fromObject = function (e) {
                    if (e instanceof r.perftools.profiles.Sample) return e;
                    var n = new r.perftools.profiles.Sample();
                    if (e.locationId) {
                      if (!Array.isArray(e.locationId))
                        throw TypeError(
                          ".perftools.profiles.Sample.locationId: array expected"
                        );
                      n.locationId = [];
                      for (var t = 0; t < e.locationId.length; ++t)
                        o.Long
                          ? ((n.locationId[t] = o.Long.fromValue(
                              e.locationId[t]
                            )).unsigned = !0)
                          : "string" == typeof e.locationId[t]
                          ? (n.locationId[t] = parseInt(e.locationId[t], 10))
                          : "number" == typeof e.locationId[t]
                          ? (n.locationId[t] = e.locationId[t])
                          : "object" == typeof e.locationId[t] &&
                            (n.locationId[t] = new o.LongBits(
                              e.locationId[t].low >>> 0,
                              e.locationId[t].high >>> 0
                            ).toNumber(!0));
                    }
                    if (e.value) {
                      if (!Array.isArray(e.value))
                        throw TypeError(
                          ".perftools.profiles.Sample.value: array expected"
                        );
                      for (n.value = [], t = 0; t < e.value.length; ++t)
                        o.Long
                          ? ((n.value[t] = o.Long.fromValue(
                              e.value[t]
                            )).unsigned = !1)
                          : "string" == typeof e.value[t]
                          ? (n.value[t] = parseInt(e.value[t], 10))
                          : "number" == typeof e.value[t]
                          ? (n.value[t] = e.value[t])
                          : "object" == typeof e.value[t] &&
                            (n.value[t] = new o.LongBits(
                              e.value[t].low >>> 0,
                              e.value[t].high >>> 0
                            ).toNumber());
                    }
                    if (e.label) {
                      if (!Array.isArray(e.label))
                        throw TypeError(
                          ".perftools.profiles.Sample.label: array expected"
                        );
                      for (n.label = [], t = 0; t < e.label.length; ++t) {
                        if ("object" != typeof e.label[t])
                          throw TypeError(
                            ".perftools.profiles.Sample.label: object expected"
                          );
                        n.label[t] = r.perftools.profiles.Label.fromObject(
                          e.label[t]
                        );
                      }
                    }
                    return n;
                  }),
                  (i.toObject = function (e, n) {
                    n || (n = {});
                    var t = {};
                    if (
                      ((n.arrays || n.defaults) &&
                        ((t.locationId = []), (t.value = []), (t.label = [])),
                      e.locationId && e.locationId.length)
                    ) {
                      t.locationId = [];
                      for (var i = 0; i < e.locationId.length; ++i)
                        "number" == typeof e.locationId[i]
                          ? (t.locationId[i] =
                              n.longs === String
                                ? String(e.locationId[i])
                                : e.locationId[i])
                          : (t.locationId[i] =
                              n.longs === String
                                ? o.Long.prototype.toString.call(
                                    e.locationId[i]
                                  )
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.locationId[i].low >>> 0,
                                    e.locationId[i].high >>> 0
                                  ).toNumber(!0)
                                : e.locationId[i]);
                    }
                    if (e.value && e.value.length)
                      for (t.value = [], i = 0; i < e.value.length; ++i)
                        "number" == typeof e.value[i]
                          ? (t.value[i] =
                              n.longs === String
                                ? String(e.value[i])
                                : e.value[i])
                          : (t.value[i] =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.value[i])
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.value[i].low >>> 0,
                                    e.value[i].high >>> 0
                                  ).toNumber()
                                : e.value[i]);
                    if (e.label && e.label.length)
                      for (t.label = [], i = 0; i < e.label.length; ++i)
                        t.label[i] = r.perftools.profiles.Label.toObject(
                          e.label[i],
                          n
                        );
                    return t;
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(
                      this,
                      e.util.toJSONOptions
                    );
                  }),
                  i
                );
              })()),
              (i.Label = (function () {
                function i(e) {
                  if (e)
                    for (var n = Object.keys(e), t = 0; t < n.length; ++t)
                      null != e[n[t]] && (this[n[t]] = e[n[t]]);
                }
                return (
                  (i.prototype.key = o.Long ? o.Long.fromBits(0, 0, !1) : 0),
                  (i.prototype.str = o.Long ? o.Long.fromBits(0, 0, !1) : 0),
                  (i.prototype.num = o.Long ? o.Long.fromBits(0, 0, !1) : 0),
                  (i.prototype.numUnit = o.Long
                    ? o.Long.fromBits(0, 0, !1)
                    : 0),
                  (i.create = function (e) {
                    return new i(e);
                  }),
                  (i.encode = function (e, n) {
                    return (
                      n || (n = t.create()),
                      null != e.key &&
                        e.hasOwnProperty("key") &&
                        n.uint32(8).int64(e.key),
                      null != e.str &&
                        e.hasOwnProperty("str") &&
                        n.uint32(16).int64(e.str),
                      null != e.num &&
                        e.hasOwnProperty("num") &&
                        n.uint32(24).int64(e.num),
                      null != e.numUnit &&
                        e.hasOwnProperty("numUnit") &&
                        n.uint32(32).int64(e.numUnit),
                      n
                    );
                  }),
                  (i.encodeDelimited = function (e, n) {
                    return this.encode(e, n).ldelim();
                  }),
                  (i.decode = function (e, t) {
                    e instanceof n || (e = n.create(e));
                    for (
                      var o = void 0 === t ? e.len : e.pos + t,
                        i = new r.perftools.profiles.Label();
                      e.pos < o;

                    ) {
                      var l = e.uint32();
                      switch (l >>> 3) {
                        case 1:
                          i.key = e.int64();
                          break;
                        case 2:
                          i.str = e.int64();
                          break;
                        case 3:
                          i.num = e.int64();
                          break;
                        case 4:
                          i.numUnit = e.int64();
                          break;
                        default:
                          e.skipType(7 & l);
                      }
                    }
                    return i;
                  }),
                  (i.decodeDelimited = function (e) {
                    return (
                      e instanceof n || (e = new n(e)),
                      this.decode(e, e.uint32())
                    );
                  }),
                  (i.verify = function (e) {
                    return "object" != typeof e || null === e
                      ? "object expected"
                      : null != e.key &&
                        e.hasOwnProperty("key") &&
                        !(
                          o.isInteger(e.key) ||
                          (e.key &&
                            o.isInteger(e.key.low) &&
                            o.isInteger(e.key.high))
                        )
                      ? "key: integer|Long expected"
                      : null != e.str &&
                        e.hasOwnProperty("str") &&
                        !(
                          o.isInteger(e.str) ||
                          (e.str &&
                            o.isInteger(e.str.low) &&
                            o.isInteger(e.str.high))
                        )
                      ? "str: integer|Long expected"
                      : null != e.num &&
                        e.hasOwnProperty("num") &&
                        !(
                          o.isInteger(e.num) ||
                          (e.num &&
                            o.isInteger(e.num.low) &&
                            o.isInteger(e.num.high))
                        )
                      ? "num: integer|Long expected"
                      : null != e.numUnit &&
                        e.hasOwnProperty("numUnit") &&
                        !(
                          o.isInteger(e.numUnit) ||
                          (e.numUnit &&
                            o.isInteger(e.numUnit.low) &&
                            o.isInteger(e.numUnit.high))
                        )
                      ? "numUnit: integer|Long expected"
                      : null;
                  }),
                  (i.fromObject = function (e) {
                    if (e instanceof r.perftools.profiles.Label) return e;
                    var n = new r.perftools.profiles.Label();
                    return (
                      null != e.key &&
                        (o.Long
                          ? ((n.key = o.Long.fromValue(e.key)).unsigned = !1)
                          : "string" == typeof e.key
                          ? (n.key = parseInt(e.key, 10))
                          : "number" == typeof e.key
                          ? (n.key = e.key)
                          : "object" == typeof e.key &&
                            (n.key = new o.LongBits(
                              e.key.low >>> 0,
                              e.key.high >>> 0
                            ).toNumber())),
                      null != e.str &&
                        (o.Long
                          ? ((n.str = o.Long.fromValue(e.str)).unsigned = !1)
                          : "string" == typeof e.str
                          ? (n.str = parseInt(e.str, 10))
                          : "number" == typeof e.str
                          ? (n.str = e.str)
                          : "object" == typeof e.str &&
                            (n.str = new o.LongBits(
                              e.str.low >>> 0,
                              e.str.high >>> 0
                            ).toNumber())),
                      null != e.num &&
                        (o.Long
                          ? ((n.num = o.Long.fromValue(e.num)).unsigned = !1)
                          : "string" == typeof e.num
                          ? (n.num = parseInt(e.num, 10))
                          : "number" == typeof e.num
                          ? (n.num = e.num)
                          : "object" == typeof e.num &&
                            (n.num = new o.LongBits(
                              e.num.low >>> 0,
                              e.num.high >>> 0
                            ).toNumber())),
                      null != e.numUnit &&
                        (o.Long
                          ? ((n.numUnit = o.Long.fromValue(
                              e.numUnit
                            )).unsigned = !1)
                          : "string" == typeof e.numUnit
                          ? (n.numUnit = parseInt(e.numUnit, 10))
                          : "number" == typeof e.numUnit
                          ? (n.numUnit = e.numUnit)
                          : "object" == typeof e.numUnit &&
                            (n.numUnit = new o.LongBits(
                              e.numUnit.low >>> 0,
                              e.numUnit.high >>> 0
                            ).toNumber())),
                      n
                    );
                  }),
                  (i.toObject = function (e, n) {
                    n || (n = {});
                    var t = {};
                    if (n.defaults) {
                      if (o.Long) {
                        var r = new o.Long(0, 0, !1);
                        t.key =
                          n.longs === String
                            ? r.toString()
                            : n.longs === Number
                            ? r.toNumber()
                            : r;
                      } else t.key = n.longs === String ? "0" : 0;
                      o.Long
                        ? ((r = new o.Long(0, 0, !1)),
                          (t.str =
                            n.longs === String
                              ? r.toString()
                              : n.longs === Number
                              ? r.toNumber()
                              : r))
                        : (t.str = n.longs === String ? "0" : 0),
                        o.Long
                          ? ((r = new o.Long(0, 0, !1)),
                            (t.num =
                              n.longs === String
                                ? r.toString()
                                : n.longs === Number
                                ? r.toNumber()
                                : r))
                          : (t.num = n.longs === String ? "0" : 0),
                        o.Long
                          ? ((r = new o.Long(0, 0, !1)),
                            (t.numUnit =
                              n.longs === String
                                ? r.toString()
                                : n.longs === Number
                                ? r.toNumber()
                                : r))
                          : (t.numUnit = n.longs === String ? "0" : 0);
                    }
                    return (
                      null != e.key &&
                        e.hasOwnProperty("key") &&
                        ("number" == typeof e.key
                          ? (t.key = n.longs === String ? String(e.key) : e.key)
                          : (t.key =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.key)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.key.low >>> 0,
                                    e.key.high >>> 0
                                  ).toNumber()
                                : e.key)),
                      null != e.str &&
                        e.hasOwnProperty("str") &&
                        ("number" == typeof e.str
                          ? (t.str = n.longs === String ? String(e.str) : e.str)
                          : (t.str =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.str)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.str.low >>> 0,
                                    e.str.high >>> 0
                                  ).toNumber()
                                : e.str)),
                      null != e.num &&
                        e.hasOwnProperty("num") &&
                        ("number" == typeof e.num
                          ? (t.num = n.longs === String ? String(e.num) : e.num)
                          : (t.num =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.num)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.num.low >>> 0,
                                    e.num.high >>> 0
                                  ).toNumber()
                                : e.num)),
                      null != e.numUnit &&
                        e.hasOwnProperty("numUnit") &&
                        ("number" == typeof e.numUnit
                          ? (t.numUnit =
                              n.longs === String
                                ? String(e.numUnit)
                                : e.numUnit)
                          : (t.numUnit =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.numUnit)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.numUnit.low >>> 0,
                                    e.numUnit.high >>> 0
                                  ).toNumber()
                                : e.numUnit)),
                      t
                    );
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(
                      this,
                      e.util.toJSONOptions
                    );
                  }),
                  i
                );
              })()),
              (i.Mapping = (function () {
                function i(e) {
                  if (e)
                    for (var n = Object.keys(e), t = 0; t < n.length; ++t)
                      null != e[n[t]] && (this[n[t]] = e[n[t]]);
                }
                return (
                  (i.prototype.id = o.Long ? o.Long.fromBits(0, 0, !0) : 0),
                  (i.prototype.memoryStart = o.Long
                    ? o.Long.fromBits(0, 0, !0)
                    : 0),
                  (i.prototype.memoryLimit = o.Long
                    ? o.Long.fromBits(0, 0, !0)
                    : 0),
                  (i.prototype.fileOffset = o.Long
                    ? o.Long.fromBits(0, 0, !0)
                    : 0),
                  (i.prototype.filename = o.Long
                    ? o.Long.fromBits(0, 0, !1)
                    : 0),
                  (i.prototype.buildId = o.Long
                    ? o.Long.fromBits(0, 0, !1)
                    : 0),
                  (i.prototype.hasFunctions = !1),
                  (i.prototype.hasFilenames = !1),
                  (i.prototype.hasLineNumbers = !1),
                  (i.prototype.hasInlineFrames = !1),
                  (i.create = function (e) {
                    return new i(e);
                  }),
                  (i.encode = function (e, n) {
                    return (
                      n || (n = t.create()),
                      null != e.id &&
                        e.hasOwnProperty("id") &&
                        n.uint32(8).uint64(e.id),
                      null != e.memoryStart &&
                        e.hasOwnProperty("memoryStart") &&
                        n.uint32(16).uint64(e.memoryStart),
                      null != e.memoryLimit &&
                        e.hasOwnProperty("memoryLimit") &&
                        n.uint32(24).uint64(e.memoryLimit),
                      null != e.fileOffset &&
                        e.hasOwnProperty("fileOffset") &&
                        n.uint32(32).uint64(e.fileOffset),
                      null != e.filename &&
                        e.hasOwnProperty("filename") &&
                        n.uint32(40).int64(e.filename),
                      null != e.buildId &&
                        e.hasOwnProperty("buildId") &&
                        n.uint32(48).int64(e.buildId),
                      null != e.hasFunctions &&
                        e.hasOwnProperty("hasFunctions") &&
                        n.uint32(56).bool(e.hasFunctions),
                      null != e.hasFilenames &&
                        e.hasOwnProperty("hasFilenames") &&
                        n.uint32(64).bool(e.hasFilenames),
                      null != e.hasLineNumbers &&
                        e.hasOwnProperty("hasLineNumbers") &&
                        n.uint32(72).bool(e.hasLineNumbers),
                      null != e.hasInlineFrames &&
                        e.hasOwnProperty("hasInlineFrames") &&
                        n.uint32(80).bool(e.hasInlineFrames),
                      n
                    );
                  }),
                  (i.encodeDelimited = function (e, n) {
                    return this.encode(e, n).ldelim();
                  }),
                  (i.decode = function (e, t) {
                    e instanceof n || (e = n.create(e));
                    for (
                      var o = void 0 === t ? e.len : e.pos + t,
                        i = new r.perftools.profiles.Mapping();
                      e.pos < o;

                    ) {
                      var l = e.uint32();
                      switch (l >>> 3) {
                        case 1:
                          i.id = e.uint64();
                          break;
                        case 2:
                          i.memoryStart = e.uint64();
                          break;
                        case 3:
                          i.memoryLimit = e.uint64();
                          break;
                        case 4:
                          i.fileOffset = e.uint64();
                          break;
                        case 5:
                          i.filename = e.int64();
                          break;
                        case 6:
                          i.buildId = e.int64();
                          break;
                        case 7:
                          i.hasFunctions = e.bool();
                          break;
                        case 8:
                          i.hasFilenames = e.bool();
                          break;
                        case 9:
                          i.hasLineNumbers = e.bool();
                          break;
                        case 10:
                          i.hasInlineFrames = e.bool();
                          break;
                        default:
                          e.skipType(7 & l);
                      }
                    }
                    return i;
                  }),
                  (i.decodeDelimited = function (e) {
                    return (
                      e instanceof n || (e = new n(e)),
                      this.decode(e, e.uint32())
                    );
                  }),
                  (i.verify = function (e) {
                    return "object" != typeof e || null === e
                      ? "object expected"
                      : null != e.id &&
                        e.hasOwnProperty("id") &&
                        !(
                          o.isInteger(e.id) ||
                          (e.id &&
                            o.isInteger(e.id.low) &&
                            o.isInteger(e.id.high))
                        )
                      ? "id: integer|Long expected"
                      : null != e.memoryStart &&
                        e.hasOwnProperty("memoryStart") &&
                        !(
                          o.isInteger(e.memoryStart) ||
                          (e.memoryStart &&
                            o.isInteger(e.memoryStart.low) &&
                            o.isInteger(e.memoryStart.high))
                        )
                      ? "memoryStart: integer|Long expected"
                      : null != e.memoryLimit &&
                        e.hasOwnProperty("memoryLimit") &&
                        !(
                          o.isInteger(e.memoryLimit) ||
                          (e.memoryLimit &&
                            o.isInteger(e.memoryLimit.low) &&
                            o.isInteger(e.memoryLimit.high))
                        )
                      ? "memoryLimit: integer|Long expected"
                      : null != e.fileOffset &&
                        e.hasOwnProperty("fileOffset") &&
                        !(
                          o.isInteger(e.fileOffset) ||
                          (e.fileOffset &&
                            o.isInteger(e.fileOffset.low) &&
                            o.isInteger(e.fileOffset.high))
                        )
                      ? "fileOffset: integer|Long expected"
                      : null != e.filename &&
                        e.hasOwnProperty("filename") &&
                        !(
                          o.isInteger(e.filename) ||
                          (e.filename &&
                            o.isInteger(e.filename.low) &&
                            o.isInteger(e.filename.high))
                        )
                      ? "filename: integer|Long expected"
                      : null != e.buildId &&
                        e.hasOwnProperty("buildId") &&
                        !(
                          o.isInteger(e.buildId) ||
                          (e.buildId &&
                            o.isInteger(e.buildId.low) &&
                            o.isInteger(e.buildId.high))
                        )
                      ? "buildId: integer|Long expected"
                      : null != e.hasFunctions &&
                        e.hasOwnProperty("hasFunctions") &&
                        "boolean" != typeof e.hasFunctions
                      ? "hasFunctions: boolean expected"
                      : null != e.hasFilenames &&
                        e.hasOwnProperty("hasFilenames") &&
                        "boolean" != typeof e.hasFilenames
                      ? "hasFilenames: boolean expected"
                      : null != e.hasLineNumbers &&
                        e.hasOwnProperty("hasLineNumbers") &&
                        "boolean" != typeof e.hasLineNumbers
                      ? "hasLineNumbers: boolean expected"
                      : null != e.hasInlineFrames &&
                        e.hasOwnProperty("hasInlineFrames") &&
                        "boolean" != typeof e.hasInlineFrames
                      ? "hasInlineFrames: boolean expected"
                      : null;
                  }),
                  (i.fromObject = function (e) {
                    if (e instanceof r.perftools.profiles.Mapping) return e;
                    var n = new r.perftools.profiles.Mapping();
                    return (
                      null != e.id &&
                        (o.Long
                          ? ((n.id = o.Long.fromValue(e.id)).unsigned = !0)
                          : "string" == typeof e.id
                          ? (n.id = parseInt(e.id, 10))
                          : "number" == typeof e.id
                          ? (n.id = e.id)
                          : "object" == typeof e.id &&
                            (n.id = new o.LongBits(
                              e.id.low >>> 0,
                              e.id.high >>> 0
                            ).toNumber(!0))),
                      null != e.memoryStart &&
                        (o.Long
                          ? ((n.memoryStart = o.Long.fromValue(
                              e.memoryStart
                            )).unsigned = !0)
                          : "string" == typeof e.memoryStart
                          ? (n.memoryStart = parseInt(e.memoryStart, 10))
                          : "number" == typeof e.memoryStart
                          ? (n.memoryStart = e.memoryStart)
                          : "object" == typeof e.memoryStart &&
                            (n.memoryStart = new o.LongBits(
                              e.memoryStart.low >>> 0,
                              e.memoryStart.high >>> 0
                            ).toNumber(!0))),
                      null != e.memoryLimit &&
                        (o.Long
                          ? ((n.memoryLimit = o.Long.fromValue(
                              e.memoryLimit
                            )).unsigned = !0)
                          : "string" == typeof e.memoryLimit
                          ? (n.memoryLimit = parseInt(e.memoryLimit, 10))
                          : "number" == typeof e.memoryLimit
                          ? (n.memoryLimit = e.memoryLimit)
                          : "object" == typeof e.memoryLimit &&
                            (n.memoryLimit = new o.LongBits(
                              e.memoryLimit.low >>> 0,
                              e.memoryLimit.high >>> 0
                            ).toNumber(!0))),
                      null != e.fileOffset &&
                        (o.Long
                          ? ((n.fileOffset = o.Long.fromValue(
                              e.fileOffset
                            )).unsigned = !0)
                          : "string" == typeof e.fileOffset
                          ? (n.fileOffset = parseInt(e.fileOffset, 10))
                          : "number" == typeof e.fileOffset
                          ? (n.fileOffset = e.fileOffset)
                          : "object" == typeof e.fileOffset &&
                            (n.fileOffset = new o.LongBits(
                              e.fileOffset.low >>> 0,
                              e.fileOffset.high >>> 0
                            ).toNumber(!0))),
                      null != e.filename &&
                        (o.Long
                          ? ((n.filename = o.Long.fromValue(
                              e.filename
                            )).unsigned = !1)
                          : "string" == typeof e.filename
                          ? (n.filename = parseInt(e.filename, 10))
                          : "number" == typeof e.filename
                          ? (n.filename = e.filename)
                          : "object" == typeof e.filename &&
                            (n.filename = new o.LongBits(
                              e.filename.low >>> 0,
                              e.filename.high >>> 0
                            ).toNumber())),
                      null != e.buildId &&
                        (o.Long
                          ? ((n.buildId = o.Long.fromValue(
                              e.buildId
                            )).unsigned = !1)
                          : "string" == typeof e.buildId
                          ? (n.buildId = parseInt(e.buildId, 10))
                          : "number" == typeof e.buildId
                          ? (n.buildId = e.buildId)
                          : "object" == typeof e.buildId &&
                            (n.buildId = new o.LongBits(
                              e.buildId.low >>> 0,
                              e.buildId.high >>> 0
                            ).toNumber())),
                      null != e.hasFunctions &&
                        (n.hasFunctions = Boolean(e.hasFunctions)),
                      null != e.hasFilenames &&
                        (n.hasFilenames = Boolean(e.hasFilenames)),
                      null != e.hasLineNumbers &&
                        (n.hasLineNumbers = Boolean(e.hasLineNumbers)),
                      null != e.hasInlineFrames &&
                        (n.hasInlineFrames = Boolean(e.hasInlineFrames)),
                      n
                    );
                  }),
                  (i.toObject = function (e, n) {
                    n || (n = {});
                    var t = {};
                    if (n.defaults) {
                      if (o.Long) {
                        var r = new o.Long(0, 0, !0);
                        t.id =
                          n.longs === String
                            ? r.toString()
                            : n.longs === Number
                            ? r.toNumber()
                            : r;
                      } else t.id = n.longs === String ? "0" : 0;
                      o.Long
                        ? ((r = new o.Long(0, 0, !0)),
                          (t.memoryStart =
                            n.longs === String
                              ? r.toString()
                              : n.longs === Number
                              ? r.toNumber()
                              : r))
                        : (t.memoryStart = n.longs === String ? "0" : 0),
                        o.Long
                          ? ((r = new o.Long(0, 0, !0)),
                            (t.memoryLimit =
                              n.longs === String
                                ? r.toString()
                                : n.longs === Number
                                ? r.toNumber()
                                : r))
                          : (t.memoryLimit = n.longs === String ? "0" : 0),
                        o.Long
                          ? ((r = new o.Long(0, 0, !0)),
                            (t.fileOffset =
                              n.longs === String
                                ? r.toString()
                                : n.longs === Number
                                ? r.toNumber()
                                : r))
                          : (t.fileOffset = n.longs === String ? "0" : 0),
                        o.Long
                          ? ((r = new o.Long(0, 0, !1)),
                            (t.filename =
                              n.longs === String
                                ? r.toString()
                                : n.longs === Number
                                ? r.toNumber()
                                : r))
                          : (t.filename = n.longs === String ? "0" : 0),
                        o.Long
                          ? ((r = new o.Long(0, 0, !1)),
                            (t.buildId =
                              n.longs === String
                                ? r.toString()
                                : n.longs === Number
                                ? r.toNumber()
                                : r))
                          : (t.buildId = n.longs === String ? "0" : 0),
                        (t.hasFunctions = !1),
                        (t.hasFilenames = !1),
                        (t.hasLineNumbers = !1),
                        (t.hasInlineFrames = !1);
                    }
                    return (
                      null != e.id &&
                        e.hasOwnProperty("id") &&
                        ("number" == typeof e.id
                          ? (t.id = n.longs === String ? String(e.id) : e.id)
                          : (t.id =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.id)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.id.low >>> 0,
                                    e.id.high >>> 0
                                  ).toNumber(!0)
                                : e.id)),
                      null != e.memoryStart &&
                        e.hasOwnProperty("memoryStart") &&
                        ("number" == typeof e.memoryStart
                          ? (t.memoryStart =
                              n.longs === String
                                ? String(e.memoryStart)
                                : e.memoryStart)
                          : (t.memoryStart =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.memoryStart)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.memoryStart.low >>> 0,
                                    e.memoryStart.high >>> 0
                                  ).toNumber(!0)
                                : e.memoryStart)),
                      null != e.memoryLimit &&
                        e.hasOwnProperty("memoryLimit") &&
                        ("number" == typeof e.memoryLimit
                          ? (t.memoryLimit =
                              n.longs === String
                                ? String(e.memoryLimit)
                                : e.memoryLimit)
                          : (t.memoryLimit =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.memoryLimit)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.memoryLimit.low >>> 0,
                                    e.memoryLimit.high >>> 0
                                  ).toNumber(!0)
                                : e.memoryLimit)),
                      null != e.fileOffset &&
                        e.hasOwnProperty("fileOffset") &&
                        ("number" == typeof e.fileOffset
                          ? (t.fileOffset =
                              n.longs === String
                                ? String(e.fileOffset)
                                : e.fileOffset)
                          : (t.fileOffset =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.fileOffset)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.fileOffset.low >>> 0,
                                    e.fileOffset.high >>> 0
                                  ).toNumber(!0)
                                : e.fileOffset)),
                      null != e.filename &&
                        e.hasOwnProperty("filename") &&
                        ("number" == typeof e.filename
                          ? (t.filename =
                              n.longs === String
                                ? String(e.filename)
                                : e.filename)
                          : (t.filename =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.filename)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.filename.low >>> 0,
                                    e.filename.high >>> 0
                                  ).toNumber()
                                : e.filename)),
                      null != e.buildId &&
                        e.hasOwnProperty("buildId") &&
                        ("number" == typeof e.buildId
                          ? (t.buildId =
                              n.longs === String
                                ? String(e.buildId)
                                : e.buildId)
                          : (t.buildId =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.buildId)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.buildId.low >>> 0,
                                    e.buildId.high >>> 0
                                  ).toNumber()
                                : e.buildId)),
                      null != e.hasFunctions &&
                        e.hasOwnProperty("hasFunctions") &&
                        (t.hasFunctions = e.hasFunctions),
                      null != e.hasFilenames &&
                        e.hasOwnProperty("hasFilenames") &&
                        (t.hasFilenames = e.hasFilenames),
                      null != e.hasLineNumbers &&
                        e.hasOwnProperty("hasLineNumbers") &&
                        (t.hasLineNumbers = e.hasLineNumbers),
                      null != e.hasInlineFrames &&
                        e.hasOwnProperty("hasInlineFrames") &&
                        (t.hasInlineFrames = e.hasInlineFrames),
                      t
                    );
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(
                      this,
                      e.util.toJSONOptions
                    );
                  }),
                  i
                );
              })()),
              (i.Location = (function () {
                function i(e) {
                  if (((this.line = []), e))
                    for (var n = Object.keys(e), t = 0; t < n.length; ++t)
                      null != e[n[t]] && (this[n[t]] = e[n[t]]);
                }
                return (
                  (i.prototype.id = o.Long ? o.Long.fromBits(0, 0, !0) : 0),
                  (i.prototype.mappingId = o.Long
                    ? o.Long.fromBits(0, 0, !0)
                    : 0),
                  (i.prototype.address = o.Long
                    ? o.Long.fromBits(0, 0, !0)
                    : 0),
                  (i.prototype.line = o.emptyArray),
                  (i.prototype.isFolded = !1),
                  (i.create = function (e) {
                    return new i(e);
                  }),
                  (i.encode = function (e, n) {
                    if (
                      (n || (n = t.create()),
                      null != e.id &&
                        e.hasOwnProperty("id") &&
                        n.uint32(8).uint64(e.id),
                      null != e.mappingId &&
                        e.hasOwnProperty("mappingId") &&
                        n.uint32(16).uint64(e.mappingId),
                      null != e.address &&
                        e.hasOwnProperty("address") &&
                        n.uint32(24).uint64(e.address),
                      null != e.line && e.line.length)
                    )
                      for (var o = 0; o < e.line.length; ++o)
                        r.perftools.profiles.Line.encode(
                          e.line[o],
                          n.uint32(34).fork()
                        ).ldelim();
                    return (
                      null != e.isFolded &&
                        e.hasOwnProperty("isFolded") &&
                        n.uint32(40).bool(e.isFolded),
                      n
                    );
                  }),
                  (i.encodeDelimited = function (e, n) {
                    return this.encode(e, n).ldelim();
                  }),
                  (i.decode = function (e, t) {
                    e instanceof n || (e = n.create(e));
                    for (
                      var o = void 0 === t ? e.len : e.pos + t,
                        i = new r.perftools.profiles.Location();
                      e.pos < o;

                    ) {
                      var l = e.uint32();
                      switch (l >>> 3) {
                        case 1:
                          i.id = e.uint64();
                          break;
                        case 2:
                          i.mappingId = e.uint64();
                          break;
                        case 3:
                          i.address = e.uint64();
                          break;
                        case 4:
                          (i.line && i.line.length) || (i.line = []),
                            i.line.push(
                              r.perftools.profiles.Line.decode(e, e.uint32())
                            );
                          break;
                        case 5:
                          i.isFolded = e.bool();
                          break;
                        default:
                          e.skipType(7 & l);
                      }
                    }
                    return i;
                  }),
                  (i.decodeDelimited = function (e) {
                    return (
                      e instanceof n || (e = new n(e)),
                      this.decode(e, e.uint32())
                    );
                  }),
                  (i.verify = function (e) {
                    if ("object" != typeof e || null === e)
                      return "object expected";
                    if (
                      null != e.id &&
                      e.hasOwnProperty("id") &&
                      !(
                        o.isInteger(e.id) ||
                        (e.id &&
                          o.isInteger(e.id.low) &&
                          o.isInteger(e.id.high))
                      )
                    )
                      return "id: integer|Long expected";
                    if (
                      null != e.mappingId &&
                      e.hasOwnProperty("mappingId") &&
                      !(
                        o.isInteger(e.mappingId) ||
                        (e.mappingId &&
                          o.isInteger(e.mappingId.low) &&
                          o.isInteger(e.mappingId.high))
                      )
                    )
                      return "mappingId: integer|Long expected";
                    if (
                      null != e.address &&
                      e.hasOwnProperty("address") &&
                      !(
                        o.isInteger(e.address) ||
                        (e.address &&
                          o.isInteger(e.address.low) &&
                          o.isInteger(e.address.high))
                      )
                    )
                      return "address: integer|Long expected";
                    if (null != e.line && e.hasOwnProperty("line")) {
                      if (!Array.isArray(e.line)) return "line: array expected";
                      for (var n = 0; n < e.line.length; ++n) {
                        var t = r.perftools.profiles.Line.verify(e.line[n]);
                        if (t) return "line." + t;
                      }
                    }
                    return null != e.isFolded &&
                      e.hasOwnProperty("isFolded") &&
                      "boolean" != typeof e.isFolded
                      ? "isFolded: boolean expected"
                      : null;
                  }),
                  (i.fromObject = function (e) {
                    if (e instanceof r.perftools.profiles.Location) return e;
                    var n = new r.perftools.profiles.Location();
                    if (
                      (null != e.id &&
                        (o.Long
                          ? ((n.id = o.Long.fromValue(e.id)).unsigned = !0)
                          : "string" == typeof e.id
                          ? (n.id = parseInt(e.id, 10))
                          : "number" == typeof e.id
                          ? (n.id = e.id)
                          : "object" == typeof e.id &&
                            (n.id = new o.LongBits(
                              e.id.low >>> 0,
                              e.id.high >>> 0
                            ).toNumber(!0))),
                      null != e.mappingId &&
                        (o.Long
                          ? ((n.mappingId = o.Long.fromValue(
                              e.mappingId
                            )).unsigned = !0)
                          : "string" == typeof e.mappingId
                          ? (n.mappingId = parseInt(e.mappingId, 10))
                          : "number" == typeof e.mappingId
                          ? (n.mappingId = e.mappingId)
                          : "object" == typeof e.mappingId &&
                            (n.mappingId = new o.LongBits(
                              e.mappingId.low >>> 0,
                              e.mappingId.high >>> 0
                            ).toNumber(!0))),
                      null != e.address &&
                        (o.Long
                          ? ((n.address = o.Long.fromValue(
                              e.address
                            )).unsigned = !0)
                          : "string" == typeof e.address
                          ? (n.address = parseInt(e.address, 10))
                          : "number" == typeof e.address
                          ? (n.address = e.address)
                          : "object" == typeof e.address &&
                            (n.address = new o.LongBits(
                              e.address.low >>> 0,
                              e.address.high >>> 0
                            ).toNumber(!0))),
                      e.line)
                    ) {
                      if (!Array.isArray(e.line))
                        throw TypeError(
                          ".perftools.profiles.Location.line: array expected"
                        );
                      n.line = [];
                      for (var t = 0; t < e.line.length; ++t) {
                        if ("object" != typeof e.line[t])
                          throw TypeError(
                            ".perftools.profiles.Location.line: object expected"
                          );
                        n.line[t] = r.perftools.profiles.Line.fromObject(
                          e.line[t]
                        );
                      }
                    }
                    return (
                      null != e.isFolded && (n.isFolded = Boolean(e.isFolded)),
                      n
                    );
                  }),
                  (i.toObject = function (e, n) {
                    n || (n = {});
                    var t = {};
                    if (
                      ((n.arrays || n.defaults) && (t.line = []), n.defaults)
                    ) {
                      if (o.Long) {
                        var i = new o.Long(0, 0, !0);
                        t.id =
                          n.longs === String
                            ? i.toString()
                            : n.longs === Number
                            ? i.toNumber()
                            : i;
                      } else t.id = n.longs === String ? "0" : 0;
                      o.Long
                        ? ((i = new o.Long(0, 0, !0)),
                          (t.mappingId =
                            n.longs === String
                              ? i.toString()
                              : n.longs === Number
                              ? i.toNumber()
                              : i))
                        : (t.mappingId = n.longs === String ? "0" : 0),
                        o.Long
                          ? ((i = new o.Long(0, 0, !0)),
                            (t.address =
                              n.longs === String
                                ? i.toString()
                                : n.longs === Number
                                ? i.toNumber()
                                : i))
                          : (t.address = n.longs === String ? "0" : 0),
                        (t.isFolded = !1);
                    }
                    if (
                      (null != e.id &&
                        e.hasOwnProperty("id") &&
                        ("number" == typeof e.id
                          ? (t.id = n.longs === String ? String(e.id) : e.id)
                          : (t.id =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.id)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.id.low >>> 0,
                                    e.id.high >>> 0
                                  ).toNumber(!0)
                                : e.id)),
                      null != e.mappingId &&
                        e.hasOwnProperty("mappingId") &&
                        ("number" == typeof e.mappingId
                          ? (t.mappingId =
                              n.longs === String
                                ? String(e.mappingId)
                                : e.mappingId)
                          : (t.mappingId =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.mappingId)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.mappingId.low >>> 0,
                                    e.mappingId.high >>> 0
                                  ).toNumber(!0)
                                : e.mappingId)),
                      null != e.address &&
                        e.hasOwnProperty("address") &&
                        ("number" == typeof e.address
                          ? (t.address =
                              n.longs === String
                                ? String(e.address)
                                : e.address)
                          : (t.address =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.address)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.address.low >>> 0,
                                    e.address.high >>> 0
                                  ).toNumber(!0)
                                : e.address)),
                      e.line && e.line.length)
                    ) {
                      t.line = [];
                      for (var l = 0; l < e.line.length; ++l)
                        t.line[l] = r.perftools.profiles.Line.toObject(
                          e.line[l],
                          n
                        );
                    }
                    return (
                      null != e.isFolded &&
                        e.hasOwnProperty("isFolded") &&
                        (t.isFolded = e.isFolded),
                      t
                    );
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(
                      this,
                      e.util.toJSONOptions
                    );
                  }),
                  i
                );
              })()),
              (i.Line = (function () {
                function i(e) {
                  if (e)
                    for (var n = Object.keys(e), t = 0; t < n.length; ++t)
                      null != e[n[t]] && (this[n[t]] = e[n[t]]);
                }
                return (
                  (i.prototype.functionId = o.Long
                    ? o.Long.fromBits(0, 0, !0)
                    : 0),
                  (i.prototype.line = o.Long ? o.Long.fromBits(0, 0, !1) : 0),
                  (i.create = function (e) {
                    return new i(e);
                  }),
                  (i.encode = function (e, n) {
                    return (
                      n || (n = t.create()),
                      null != e.functionId &&
                        e.hasOwnProperty("functionId") &&
                        n.uint32(8).uint64(e.functionId),
                      null != e.line &&
                        e.hasOwnProperty("line") &&
                        n.uint32(16).int64(e.line),
                      n
                    );
                  }),
                  (i.encodeDelimited = function (e, n) {
                    return this.encode(e, n).ldelim();
                  }),
                  (i.decode = function (e, t) {
                    e instanceof n || (e = n.create(e));
                    for (
                      var o = void 0 === t ? e.len : e.pos + t,
                        i = new r.perftools.profiles.Line();
                      e.pos < o;

                    ) {
                      var l = e.uint32();
                      switch (l >>> 3) {
                        case 1:
                          i.functionId = e.uint64();
                          break;
                        case 2:
                          i.line = e.int64();
                          break;
                        default:
                          e.skipType(7 & l);
                      }
                    }
                    return i;
                  }),
                  (i.decodeDelimited = function (e) {
                    return (
                      e instanceof n || (e = new n(e)),
                      this.decode(e, e.uint32())
                    );
                  }),
                  (i.verify = function (e) {
                    return "object" != typeof e || null === e
                      ? "object expected"
                      : null != e.functionId &&
                        e.hasOwnProperty("functionId") &&
                        !(
                          o.isInteger(e.functionId) ||
                          (e.functionId &&
                            o.isInteger(e.functionId.low) &&
                            o.isInteger(e.functionId.high))
                        )
                      ? "functionId: integer|Long expected"
                      : null != e.line &&
                        e.hasOwnProperty("line") &&
                        !(
                          o.isInteger(e.line) ||
                          (e.line &&
                            o.isInteger(e.line.low) &&
                            o.isInteger(e.line.high))
                        )
                      ? "line: integer|Long expected"
                      : null;
                  }),
                  (i.fromObject = function (e) {
                    if (e instanceof r.perftools.profiles.Line) return e;
                    var n = new r.perftools.profiles.Line();
                    return (
                      null != e.functionId &&
                        (o.Long
                          ? ((n.functionId = o.Long.fromValue(
                              e.functionId
                            )).unsigned = !0)
                          : "string" == typeof e.functionId
                          ? (n.functionId = parseInt(e.functionId, 10))
                          : "number" == typeof e.functionId
                          ? (n.functionId = e.functionId)
                          : "object" == typeof e.functionId &&
                            (n.functionId = new o.LongBits(
                              e.functionId.low >>> 0,
                              e.functionId.high >>> 0
                            ).toNumber(!0))),
                      null != e.line &&
                        (o.Long
                          ? ((n.line = o.Long.fromValue(e.line)).unsigned = !1)
                          : "string" == typeof e.line
                          ? (n.line = parseInt(e.line, 10))
                          : "number" == typeof e.line
                          ? (n.line = e.line)
                          : "object" == typeof e.line &&
                            (n.line = new o.LongBits(
                              e.line.low >>> 0,
                              e.line.high >>> 0
                            ).toNumber())),
                      n
                    );
                  }),
                  (i.toObject = function (e, n) {
                    n || (n = {});
                    var t = {};
                    if (n.defaults) {
                      if (o.Long) {
                        var r = new o.Long(0, 0, !0);
                        t.functionId =
                          n.longs === String
                            ? r.toString()
                            : n.longs === Number
                            ? r.toNumber()
                            : r;
                      } else t.functionId = n.longs === String ? "0" : 0;
                      o.Long
                        ? ((r = new o.Long(0, 0, !1)),
                          (t.line =
                            n.longs === String
                              ? r.toString()
                              : n.longs === Number
                              ? r.toNumber()
                              : r))
                        : (t.line = n.longs === String ? "0" : 0);
                    }
                    return (
                      null != e.functionId &&
                        e.hasOwnProperty("functionId") &&
                        ("number" == typeof e.functionId
                          ? (t.functionId =
                              n.longs === String
                                ? String(e.functionId)
                                : e.functionId)
                          : (t.functionId =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.functionId)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.functionId.low >>> 0,
                                    e.functionId.high >>> 0
                                  ).toNumber(!0)
                                : e.functionId)),
                      null != e.line &&
                        e.hasOwnProperty("line") &&
                        ("number" == typeof e.line
                          ? (t.line =
                              n.longs === String ? String(e.line) : e.line)
                          : (t.line =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.line)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.line.low >>> 0,
                                    e.line.high >>> 0
                                  ).toNumber()
                                : e.line)),
                      t
                    );
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(
                      this,
                      e.util.toJSONOptions
                    );
                  }),
                  i
                );
              })()),
              (i.Function = (function () {
                function i(e) {
                  if (e)
                    for (var n = Object.keys(e), t = 0; t < n.length; ++t)
                      null != e[n[t]] && (this[n[t]] = e[n[t]]);
                }
                return (
                  (i.prototype.id = o.Long ? o.Long.fromBits(0, 0, !0) : 0),
                  (i.prototype.name = o.Long ? o.Long.fromBits(0, 0, !1) : 0),
                  (i.prototype.systemName = o.Long
                    ? o.Long.fromBits(0, 0, !1)
                    : 0),
                  (i.prototype.filename = o.Long
                    ? o.Long.fromBits(0, 0, !1)
                    : 0),
                  (i.prototype.startLine = o.Long
                    ? o.Long.fromBits(0, 0, !1)
                    : 0),
                  (i.create = function (e) {
                    return new i(e);
                  }),
                  (i.encode = function (e, n) {
                    return (
                      n || (n = t.create()),
                      null != e.id &&
                        e.hasOwnProperty("id") &&
                        n.uint32(8).uint64(e.id),
                      null != e.name &&
                        e.hasOwnProperty("name") &&
                        n.uint32(16).int64(e.name),
                      null != e.systemName &&
                        e.hasOwnProperty("systemName") &&
                        n.uint32(24).int64(e.systemName),
                      null != e.filename &&
                        e.hasOwnProperty("filename") &&
                        n.uint32(32).int64(e.filename),
                      null != e.startLine &&
                        e.hasOwnProperty("startLine") &&
                        n.uint32(40).int64(e.startLine),
                      n
                    );
                  }),
                  (i.encodeDelimited = function (e, n) {
                    return this.encode(e, n).ldelim();
                  }),
                  (i.decode = function (e, t) {
                    e instanceof n || (e = n.create(e));
                    for (
                      var o = void 0 === t ? e.len : e.pos + t,
                        i = new r.perftools.profiles.Function();
                      e.pos < o;

                    ) {
                      var l = e.uint32();
                      switch (l >>> 3) {
                        case 1:
                          i.id = e.uint64();
                          break;
                        case 2:
                          i.name = e.int64();
                          break;
                        case 3:
                          i.systemName = e.int64();
                          break;
                        case 4:
                          i.filename = e.int64();
                          break;
                        case 5:
                          i.startLine = e.int64();
                          break;
                        default:
                          e.skipType(7 & l);
                      }
                    }
                    return i;
                  }),
                  (i.decodeDelimited = function (e) {
                    return (
                      e instanceof n || (e = new n(e)),
                      this.decode(e, e.uint32())
                    );
                  }),
                  (i.verify = function (e) {
                    return "object" != typeof e || null === e
                      ? "object expected"
                      : null != e.id &&
                        e.hasOwnProperty("id") &&
                        !(
                          o.isInteger(e.id) ||
                          (e.id &&
                            o.isInteger(e.id.low) &&
                            o.isInteger(e.id.high))
                        )
                      ? "id: integer|Long expected"
                      : null != e.name &&
                        e.hasOwnProperty("name") &&
                        !(
                          o.isInteger(e.name) ||
                          (e.name &&
                            o.isInteger(e.name.low) &&
                            o.isInteger(e.name.high))
                        )
                      ? "name: integer|Long expected"
                      : null != e.systemName &&
                        e.hasOwnProperty("systemName") &&
                        !(
                          o.isInteger(e.systemName) ||
                          (e.systemName &&
                            o.isInteger(e.systemName.low) &&
                            o.isInteger(e.systemName.high))
                        )
                      ? "systemName: integer|Long expected"
                      : null != e.filename &&
                        e.hasOwnProperty("filename") &&
                        !(
                          o.isInteger(e.filename) ||
                          (e.filename &&
                            o.isInteger(e.filename.low) &&
                            o.isInteger(e.filename.high))
                        )
                      ? "filename: integer|Long expected"
                      : null != e.startLine &&
                        e.hasOwnProperty("startLine") &&
                        !(
                          o.isInteger(e.startLine) ||
                          (e.startLine &&
                            o.isInteger(e.startLine.low) &&
                            o.isInteger(e.startLine.high))
                        )
                      ? "startLine: integer|Long expected"
                      : null;
                  }),
                  (i.fromObject = function (e) {
                    if (e instanceof r.perftools.profiles.Function) return e;
                    var n = new r.perftools.profiles.Function();
                    return (
                      null != e.id &&
                        (o.Long
                          ? ((n.id = o.Long.fromValue(e.id)).unsigned = !0)
                          : "string" == typeof e.id
                          ? (n.id = parseInt(e.id, 10))
                          : "number" == typeof e.id
                          ? (n.id = e.id)
                          : "object" == typeof e.id &&
                            (n.id = new o.LongBits(
                              e.id.low >>> 0,
                              e.id.high >>> 0
                            ).toNumber(!0))),
                      null != e.name &&
                        (o.Long
                          ? ((n.name = o.Long.fromValue(e.name)).unsigned = !1)
                          : "string" == typeof e.name
                          ? (n.name = parseInt(e.name, 10))
                          : "number" == typeof e.name
                          ? (n.name = e.name)
                          : "object" == typeof e.name &&
                            (n.name = new o.LongBits(
                              e.name.low >>> 0,
                              e.name.high >>> 0
                            ).toNumber())),
                      null != e.systemName &&
                        (o.Long
                          ? ((n.systemName = o.Long.fromValue(
                              e.systemName
                            )).unsigned = !1)
                          : "string" == typeof e.systemName
                          ? (n.systemName = parseInt(e.systemName, 10))
                          : "number" == typeof e.systemName
                          ? (n.systemName = e.systemName)
                          : "object" == typeof e.systemName &&
                            (n.systemName = new o.LongBits(
                              e.systemName.low >>> 0,
                              e.systemName.high >>> 0
                            ).toNumber())),
                      null != e.filename &&
                        (o.Long
                          ? ((n.filename = o.Long.fromValue(
                              e.filename
                            )).unsigned = !1)
                          : "string" == typeof e.filename
                          ? (n.filename = parseInt(e.filename, 10))
                          : "number" == typeof e.filename
                          ? (n.filename = e.filename)
                          : "object" == typeof e.filename &&
                            (n.filename = new o.LongBits(
                              e.filename.low >>> 0,
                              e.filename.high >>> 0
                            ).toNumber())),
                      null != e.startLine &&
                        (o.Long
                          ? ((n.startLine = o.Long.fromValue(
                              e.startLine
                            )).unsigned = !1)
                          : "string" == typeof e.startLine
                          ? (n.startLine = parseInt(e.startLine, 10))
                          : "number" == typeof e.startLine
                          ? (n.startLine = e.startLine)
                          : "object" == typeof e.startLine &&
                            (n.startLine = new o.LongBits(
                              e.startLine.low >>> 0,
                              e.startLine.high >>> 0
                            ).toNumber())),
                      n
                    );
                  }),
                  (i.toObject = function (e, n) {
                    n || (n = {});
                    var t = {};
                    if (n.defaults) {
                      if (o.Long) {
                        var r = new o.Long(0, 0, !0);
                        t.id =
                          n.longs === String
                            ? r.toString()
                            : n.longs === Number
                            ? r.toNumber()
                            : r;
                      } else t.id = n.longs === String ? "0" : 0;
                      o.Long
                        ? ((r = new o.Long(0, 0, !1)),
                          (t.name =
                            n.longs === String
                              ? r.toString()
                              : n.longs === Number
                              ? r.toNumber()
                              : r))
                        : (t.name = n.longs === String ? "0" : 0),
                        o.Long
                          ? ((r = new o.Long(0, 0, !1)),
                            (t.systemName =
                              n.longs === String
                                ? r.toString()
                                : n.longs === Number
                                ? r.toNumber()
                                : r))
                          : (t.systemName = n.longs === String ? "0" : 0),
                        o.Long
                          ? ((r = new o.Long(0, 0, !1)),
                            (t.filename =
                              n.longs === String
                                ? r.toString()
                                : n.longs === Number
                                ? r.toNumber()
                                : r))
                          : (t.filename = n.longs === String ? "0" : 0),
                        o.Long
                          ? ((r = new o.Long(0, 0, !1)),
                            (t.startLine =
                              n.longs === String
                                ? r.toString()
                                : n.longs === Number
                                ? r.toNumber()
                                : r))
                          : (t.startLine = n.longs === String ? "0" : 0);
                    }
                    return (
                      null != e.id &&
                        e.hasOwnProperty("id") &&
                        ("number" == typeof e.id
                          ? (t.id = n.longs === String ? String(e.id) : e.id)
                          : (t.id =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.id)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.id.low >>> 0,
                                    e.id.high >>> 0
                                  ).toNumber(!0)
                                : e.id)),
                      null != e.name &&
                        e.hasOwnProperty("name") &&
                        ("number" == typeof e.name
                          ? (t.name =
                              n.longs === String ? String(e.name) : e.name)
                          : (t.name =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.name)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.name.low >>> 0,
                                    e.name.high >>> 0
                                  ).toNumber()
                                : e.name)),
                      null != e.systemName &&
                        e.hasOwnProperty("systemName") &&
                        ("number" == typeof e.systemName
                          ? (t.systemName =
                              n.longs === String
                                ? String(e.systemName)
                                : e.systemName)
                          : (t.systemName =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.systemName)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.systemName.low >>> 0,
                                    e.systemName.high >>> 0
                                  ).toNumber()
                                : e.systemName)),
                      null != e.filename &&
                        e.hasOwnProperty("filename") &&
                        ("number" == typeof e.filename
                          ? (t.filename =
                              n.longs === String
                                ? String(e.filename)
                                : e.filename)
                          : (t.filename =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.filename)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.filename.low >>> 0,
                                    e.filename.high >>> 0
                                  ).toNumber()
                                : e.filename)),
                      null != e.startLine &&
                        e.hasOwnProperty("startLine") &&
                        ("number" == typeof e.startLine
                          ? (t.startLine =
                              n.longs === String
                                ? String(e.startLine)
                                : e.startLine)
                          : (t.startLine =
                              n.longs === String
                                ? o.Long.prototype.toString.call(e.startLine)
                                : n.longs === Number
                                ? new o.LongBits(
                                    e.startLine.low >>> 0,
                                    e.startLine.high >>> 0
                                  ).toNumber()
                                : e.startLine)),
                      t
                    );
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(
                      this,
                      e.util.toJSONOptions
                    );
                  }),
                  i
                );
              })()),
              i)),
            l
          );
        })()),
          (module.exports = r);
      },
      { "protobufjs/minimal": "Myh2" },
    ],
    VmHy: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.importAsPprofProfile = r);
        var e = require("./profile.proto.js"),
          n = require("../lib/profile"),
          t = require("../lib/utils"),
          l = require("../lib/value-formatters");
        function r(r) {
          if (0 === r.byteLength) return null;
          let o;
          try {
            o = e.perftools.profiles.Profile.decode(new Uint8Array(r));
          } catch (b) {
            return null;
          }
          function i(e) {
            return "number" == typeof e ? e : e.low;
          }
          function u(e) {
            return o.stringTable[i(e)] || null;
          }
          const s = new Map();
          function a(e) {
            const { name: n, filename: t, startLine: l } = e,
              r = (null != n && u(n)) || "(unknown)",
              o = null != t ? u(t) : null,
              i = null != l ? +l : null,
              s = { key: `${r}:${o}:${i}`, name: r };
            return null != o && (s.file = o), null != i && (s.line = i), s;
          }
          for (let e of o.function)
            if (e.id) {
              const n = a(e);
              null != n && s.set(i(e.id), n);
            }
          function c(e) {
            const { line: n } = e;
            if (null == n) return null;
            const l = (0, t.lastOf)(n);
            return null == l
              ? null
              : (l.functionId && s.get(i(l.functionId))) || null;
          }
          const f = new Map();
          for (let e of o.location)
            if (null != e.id) {
              const n = c(e);
              n && f.set(i(e.id), n);
            }
          const p = o.sampleType.map((e) => ({
              type: (e.type && u(e.type)) || "samples",
              unit: (e.unit && u(e.unit)) || "count",
            })),
            d = o.defaultSampleType ? +o.defaultSampleType : p.length - 1,
            m = p[d],
            y = new n.StackListProfileBuilder();
          switch (m.unit) {
            case "nanoseconds":
            case "microseconds":
            case "milliseconds":
            case "seconds":
              y.setValueFormatter(new l.TimeFormatter(m.unit));
              break;
            case "bytes":
              y.setValueFormatter(new l.ByteFormatter());
          }
          for (let e of o.sample) {
            const n = e.locationId ? e.locationId.map((e) => f.get(i(e))) : [];
            n.reverse();
            const t = e.value[d];
            y.appendSampleWithWeight(
              n.filter((e) => null != e),
              +t
            );
          }
          return y.build();
        }
      },
      {
        "./profile.proto.js": "YdJi",
        "../lib/profile": "YG8z",
        "../lib/utils": "ucYa",
        "../lib/value-formatters": "LsM4",
      },
    ],
    bNW7: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.importFromChromeHeapProfile = o);
        var e = require("../lib/profile"),
          r = require("../lib/utils"),
          t = require("../lib/value-formatters");
        const n = new Map();
        function i(e) {
          return (0, r.getOrInsert)(n, e, (e) => {
            const r = e.functionName || "(anonymous)",
              t = e.url,
              n = e.lineNumber,
              i = e.columnNumber;
            return {
              key: `${r}:${t}:${n}:${i}`,
              name: r,
              file: t,
              line: n,
              col: i,
            };
          });
        }
        function o(r) {
          const n = new Map();
          let o = 0;
          const l = (e, r) => {
            (e.id = o++),
              n.set(e.id, e),
              r && (e.parent = r.id),
              e.children.forEach((r) => l(r, e));
          };
          l(r.head);
          const u = (e) => {
              if (0 === e.children.length) return e.selfSize || 0;
              const r = e.children.reduce((e, r) => (e += u(r)), e.selfSize);
              return (e.totalSize = r), r;
            },
            a = u(r.head),
            s = [];
          for (let e of n.values()) {
            let r = [];
            for (r.push(e); void 0 !== e.parent; ) {
              const t = n.get(e.parent);
              if (void 0 === t) break;
              r.unshift(t), (e = t);
            }
            s.push(r);
          }
          const c = new e.StackListProfileBuilder(a);
          for (let e of s) {
            const r = e[e.length - 1];
            c.appendSampleWithWeight(
              e.map((e) => i(e.callFrame)),
              r.selfSize
            );
          }
          return c.setValueFormatter(new t.ByteFormatter()), c.build();
        }
      },
      {
        "../lib/profile": "YG8z",
        "../lib/utils": "ucYa",
        "../lib/value-formatters": "LsM4",
      },
    ],
    KFvE: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.isTraceEventFormatted = m),
          (exports.importTraceEvents = g);
        var e = require("../lib/utils"),
          t = require("../lib/profile"),
          n = require("../lib/value-formatters");
        function r(t, n) {
          return `${(0, e.zeroPad)("" + t, 10)}:${(0, e.zeroPad)("" + n, 10)}`;
        }
        function s(t) {
          const n = new Map();
          for (let s of t) {
            (0, e.getOrInsert)(n, r(s.pid, s.tid), () => []).push(s);
          }
          return n;
        }
        function o(e, t) {
          if (0 === e.length && 0 === t.length)
            throw new Error(
              "This method should not be given both queues empty"
            );
          if (0 === t.length) return "B";
          if (0 === e.length) return "E";
          const n = e[0],
            r = t[0],
            s = n.ts,
            o = r.ts;
          return s < o ? "B" : o < s ? "E" : n.name === r.name ? "B" : "E";
        }
        function a(e) {
          const t = [],
            n = [];
          if (e.length > 0) {
            let t = Number.MAX_SAFE_INTEGER;
            for (let n of e) t = Math.min(t, n.ts);
            for (let n of e) n.ts -= t;
          }
          const r = [];
          for (let a of e)
            switch (a.ph) {
              case "B":
                t.push(a);
                break;
              case "E":
                n.push(a);
                break;
              case "X":
                r.push(a);
                break;
              default:
                return a;
            }
          function s(e) {
            var t, n;
            return null !==
              (n = null !== (t = e.dur) && void 0 !== t ? t : e.tdur) &&
              void 0 !== n
              ? n
              : 0;
          }
          r.sort((e, t) => {
            if (e.ts < t.ts) return -1;
            if (e.ts > t.ts) return 1;
            const n = s(e),
              r = s(t);
            return n > r ? -1 : n < r ? 1 : 0;
          });
          for (let a of r) {
            const e = s(a);
            t.push(Object.assign(Object.assign({}, a), { ph: "B" })),
              n.push(
                Object.assign(Object.assign({}, a), { ph: "E", ts: a.ts + e })
              );
          }
          function o(e, t) {
            return e.ts < t.ts ? -1 : e.ts > t.ts ? 1 : 0;
          }
          return t.sort(o), n.sort(o), [t, n];
        }
        function i(e) {
          const t = [];
          for (let n of e)
            switch (n.ph) {
              case "B":
              case "E":
              case "X":
                t.push(n);
            }
          return t;
        }
        function u(e) {
          const t = new Map();
          for (let n of e)
            "M" === n.ph &&
              "process_name" === n.name &&
              n.args &&
              n.args.name &&
              t.set(n.pid, n.args.name);
          return t;
        }
        function c(e) {
          const t = new Map();
          for (let n of e)
            "M" === n.ph &&
              "thread_name" === n.name &&
              n.args &&
              n.args.name &&
              t.set(r(n.pid, n.tid), n.args.name);
          return t;
        }
        function f(e) {
          let t = `${e.name || "(unnamed)"}`;
          return e.args && (t += ` ${JSON.stringify(e.args)}`), t;
        }
        function l(e) {
          const t = f(e);
          return { name: t, key: t };
        }
        function h(f) {
          const h = s(i(f)),
            d = u(f),
            p = c(f),
            m = [];
          return (
            h.forEach((s) => {
              if (0 === s.length) return;
              const { pid: i, tid: u } = s[0],
                c = new t.CallTreeProfileBuilder();
              c.setValueFormatter(new n.TimeFormatter("microseconds"));
              const f = d.get(i),
                h = p.get(r(i, u));
              null != f && null != h
                ? c.setName(`${f} (pid ${i}), ${h} (tid ${u})`)
                : null != f
                ? c.setName(`${f} (pid ${i}, tid ${u})`)
                : null != h
                ? c.setName(`${h} (pid ${i}, tid ${u})`)
                : c.setName(`pid ${i}, tid ${u}`);
              const [g, $] = a(s),
                k = [],
                b = (e) => {
                  k.push(e), c.enterFrame(l(e), e.ts);
                },
                w = (t) => {
                  const n = (0, e.lastOf)(k);
                  if (null == n)
                    return void console.warn(
                      `Tried to end frame "${
                        l(t).key
                      }", but the stack was empty. Doing nothing instead.`
                    );
                  const r = l(t),
                    s = l(n);
                  t.name === n.name
                    ? (r.key !== s.key &&
                        console.warn(
                          `ts=${t.ts}: Tried to end "${r.key}" when "${s.key}" was on the top of the stack. Ending ${s.key} instead.`
                        ),
                      k.pop(),
                      c.leaveFrame(s, t.ts))
                    : console.warn(
                        `ts=${t.ts}: Tried to end "${r.key}" when "${s.key}" was on the top of the stack. Doing nothing instead.`
                      );
                };
              for (; g.length > 0 || $.length > 0; ) {
                const t = o(g, $);
                switch (t) {
                  case "B":
                    b(g.shift());
                    break;
                  case "E": {
                    const t = (0, e.lastOf)(k);
                    if (null != t) {
                      const e = l(t);
                      let n = !1;
                      for (let t = 1; t < $.length; t++) {
                        const r = $[t];
                        if (r.ts > $[0].ts) break;
                        const s = l(r);
                        if (e.key === s.key) {
                          const e = $[0];
                          ($[0] = $[t]), ($[t] = e), (n = !0);
                          break;
                        }
                      }
                      if (!n)
                        for (let r = 1; r < $.length; r++) {
                          const e = $[r];
                          if (e.ts > $[0].ts) break;
                          if (e.name === t.name) {
                            const e = $[0];
                            ($[0] = $[r]), ($[r] = e), (n = !0);
                            break;
                          }
                        }
                    }
                    w($.shift());
                    break;
                  }
                  default:
                    return t;
                }
              }
              for (let e = k.length - 1; e >= 0; e--) {
                const t = l(k[e]);
                console.warn(
                  `Frame "${t.key}" was still open at end of profile. Closing automatically.`
                ),
                  c.leaveFrame(t, c.getTotalWeight());
              }
              m.push([r(i, u), c.build()]);
            }),
            (0, e.sortBy)(m, (e) => e[0]),
            { name: "", indexToView: 0, profiles: m.map((e) => e[1]) }
          );
        }
        function d(e) {
          if (!Array.isArray(e)) return !1;
          if (0 === e.length) return !1;
          for (let t of e) {
            if (!("ph" in t)) return !1;
            switch (t.ph) {
              case "B":
              case "E":
              case "X":
                if (!("ts" in t)) return !1;
            }
          }
          return !0;
        }
        function p(e) {
          return "traceEvents" in e && d(e.traceEvents);
        }
        function m(e) {
          return p(e) || d(e);
        }
        function g(e) {
          if (p(e)) return h(e.traceEvents);
          if (d(e)) return h(e);
          return e;
        }
      },
      {
        "../lib/utils": "ucYa",
        "../lib/profile": "YG8z",
        "../lib/value-formatters": "LsM4",
      },
    ],
    uRa7: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.importProfileGroupFromText = h),
          (exports.importProfileGroupFromBase64 = F),
          (exports.importProfilesFromFile = y),
          (exports.importProfilesFromArrayBuffer = I),
          (exports.importFromFileSystemDirectoryEntry = C);
        var e = require("./chrome"),
          r = require("./stackprof"),
          o = require("./instruments"),
          i = require("./bg-flamegraph"),
          t = require("./firefox"),
          n = require("../lib/file-format"),
          s = require("./v8proflog"),
          p = require("./linux-tools-perf"),
          l = require("./haskell"),
          m = require("./safari"),
          a = require("./utils"),
          f = require("./pprof"),
          u = require("../lib/utils"),
          c = require("./v8heapalloc"),
          d = require("./trace-event"),
          g = function (e, r, o, i) {
            return new (o || (o = Promise))(function (t, n) {
              function s(e) {
                try {
                  l(i.next(e));
                } catch (r) {
                  n(r);
                }
              }
              function p(e) {
                try {
                  l(i.throw(e));
                } catch (r) {
                  n(r);
                }
              }
              function l(e) {
                var r;
                e.done
                  ? t(e.value)
                  : ((r = e.value),
                    r instanceof o
                      ? r
                      : new o(function (e) {
                          e(r);
                        })).then(s, p);
              }
              l((i = i.apply(e, r || [])).next());
            });
          };
        function h(e, r) {
          return g(this, void 0, void 0, function* () {
            return yield P(new a.TextProfileDataSource(e, r));
          });
        }
        function F(e, r) {
          return g(this, void 0, void 0, function* () {
            return yield P(
              a.MaybeCompressedDataReader.fromArrayBuffer(
                e,
                (0, u.decodeBase64)(r).buffer
              )
            );
          });
        }
        function y(e) {
          return g(this, void 0, void 0, function* () {
            return P(a.MaybeCompressedDataReader.fromFile(e));
          });
        }
        function I(e, r) {
          return g(this, void 0, void 0, function* () {
            return P(a.MaybeCompressedDataReader.fromArrayBuffer(e, r));
          });
        }
        function P(e) {
          return g(this, void 0, void 0, function* () {
            const r = yield e.name(),
              o = yield S(e);
            if (o) {
              o.name || (o.name = r);
              for (let e of o.profiles) e && !e.getName() && e.setName(r);
              return o;
            }
            return null;
          });
        }
        function v(e) {
          return e
            ? { name: e.getName(), indexToView: 0, profiles: [e] }
            : null;
        }
        function x(e) {
          return (
            "[" === (e = e.trim())[0] &&
              "]" !== (e = e.replace(/,\s*$/, ""))[e.length - 1] &&
              (e += "]"),
            e
          );
        }
        function S(a) {
          return g(this, void 0, void 0, function* () {
            const u = yield a.name(),
              g = yield a.readAsArrayBuffer();
            {
              const e = (0, f.importAsPprofProfile)(g);
              if (e)
                return (
                  console.log("Importing as protobuf encoded pprof file"), v(e)
                );
            }
            const h = yield a.readAsText();
            if (u.endsWith(".speedscope.json"))
              return (
                console.log("Importing as speedscope json file"),
                (0, n.importSpeedscopeProfiles)(JSON.parse(h))
              );
            if (u.endsWith(".chrome.json") || /Profile-\d{8}T\d{6}/.exec(u))
              return (
                console.log("Importing as Chrome Timeline"),
                (0, e.importFromChromeTimeline)(JSON.parse(h), u)
              );
            if (u.endsWith(".stackprof.json"))
              return (
                console.log("Importing as stackprof profile"),
                v((0, r.importFromStackprof)(JSON.parse(h)))
              );
            if (u.endsWith(".instruments.txt"))
              return (
                console.log("Importing as Instruments.app deep copy"),
                v((0, o.importFromInstrumentsDeepCopy)(h))
              );
            if (u.endsWith(".linux-perf.txt"))
              return (
                console.log("Importing as output of linux perf script"),
                (0, p.importFromLinuxPerf)(h)
              );
            if (u.endsWith(".collapsedstack.txt"))
              return (
                console.log("Importing as collapsed stack format"),
                v((0, i.importFromBGFlameGraph)(h))
              );
            if (u.endsWith(".v8log.json"))
              return (
                console.log("Importing as --prof-process v8 log"),
                v((0, s.importFromV8ProfLog)(JSON.parse(h)))
              );
            if (u.endsWith(".heapprofile"))
              return (
                console.log("Importing as Chrome Heap Profile"),
                v((0, c.importFromChromeHeapProfile)(JSON.parse(h)))
              );
            if (u.endsWith("-recording.json"))
              return (
                console.log("Importing as Safari profile"),
                v((0, m.importFromSafari)(JSON.parse(h)))
              );
            let F;
            try {
              F = JSON.parse(x(h));
            } catch (y) {}
            if (F) {
              if (
                "https://www.speedscope.app/file-format-schema.json" ===
                F.$schema
              )
                return (
                  console.log("Importing as speedscope json file"),
                  (0, n.importSpeedscopeProfiles)(JSON.parse(h))
                );
              if (F.systemHost && "Firefox" == F.systemHost.name)
                return (
                  console.log("Importing as Firefox profile"),
                  v((0, t.importFromFirefox)(F))
                );
              if ((0, e.isChromeTimeline)(F))
                return (
                  console.log("Importing as Chrome Timeline"),
                  (0, e.importFromChromeTimeline)(F, u)
                );
              if ("nodes" in F && "samples" in F && "timeDeltas" in F)
                return (
                  console.log("Importing as Chrome CPU Profile"),
                  v((0, e.importFromChromeCPUProfile)(F))
                );
              if ((0, d.isTraceEventFormatted)(F))
                return (
                  console.log("Importing as Trace Event Format profile"),
                  (0, d.importTraceEvents)(F)
                );
              if ("head" in F && "samples" in F && "timestamps" in F)
                return (
                  console.log("Importing as Chrome CPU Profile (old format)"),
                  v((0, e.importFromOldV8CPUProfile)(F))
                );
              if ("mode" in F && "frames" in F && "raw_timestamp_deltas" in F)
                return (
                  console.log("Importing as stackprof profile"),
                  v((0, r.importFromStackprof)(F))
                );
              if ("code" in F && "functions" in F && "ticks" in F)
                return (
                  console.log("Importing as --prof-process v8 log"),
                  v((0, s.importFromV8ProfLog)(F))
                );
              if ("head" in F && "selfSize" in F.head)
                return (
                  console.log("Importing as Chrome Heap Profile"),
                  v((0, c.importFromChromeHeapProfile)(JSON.parse(h)))
                );
              if ("rts_arguments" in F && "initial_capabilities" in F)
                return (
                  console.log("Importing as Haskell GHC JSON Profile"),
                  (0, l.importFromHaskell)(F)
                );
              if ("recording" in F && "sampleStackTraces" in F.recording)
                return (
                  console.log("Importing as Safari profile"),
                  v((0, m.importFromSafari)(JSON.parse(h)))
                );
            } else {
              if (/^[\w \t\(\)]*\tSymbol Name/.exec(h))
                return (
                  console.log("Importing as Instruments.app deep copy"),
                  v((0, o.importFromInstrumentsDeepCopy)(h))
                );
              const e = h.split(/\n/).length;
              if (e >= 1 && e === h.split(/ \d+\r?\n/).length)
                return (
                  console.log("Importing as collapsed stack format"),
                  v((0, i.importFromBGFlameGraph)(h))
                );
              const r = (0, p.importFromLinuxPerf)(h);
              if (r)
                return (
                  console.log("Importing from linux perf script output"), r
                );
            }
            return null;
          });
        }
        function C(e) {
          return g(this, void 0, void 0, function* () {
            return (0, o.importFromInstrumentsTrace)(e);
          });
        }
      },
      {
        "./chrome": "kWV1",
        "./stackprof": "I37H",
        "./instruments": "G28U",
        "./bg-flamegraph": "flbo",
        "./firefox": "uNW1",
        "../lib/file-format": "Xzb6",
        "./v8proflog": "QV03",
        "./linux-tools-perf": "f2sa",
        "./haskell": "jm73",
        "./safari": "jP3w",
        "./utils": "QTYz",
        "./pprof": "VmHy",
        "../lib/utils": "ucYa",
        "./v8heapalloc": "bNW7",
        "./trace-event": "KFvE",
      },
    ],
  },
  {},
  [],
  null
);
//# sourceMappingURL=import.cf0fa83f.js.map
