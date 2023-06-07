import { openBlock as o, createElementBlock as t, createElementVNode as e } from "vue";
const n = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, r = /* @__PURE__ */ e("rect", {
  x: "2",
  y: "3",
  width: "20",
  height: "14",
  rx: "2",
  ry: "2"
}, null, -1), s = /* @__PURE__ */ e("line", {
  x1: "8",
  y1: "21",
  x2: "16",
  y2: "21"
}, null, -1), c = /* @__PURE__ */ e("line", {
  x1: "12",
  y1: "17",
  x2: "12",
  y2: "21"
}, null, -1), l = [
  r,
  s,
  c
];
function i(d, _) {
  return o(), t("svg", n, l);
}
const x = { render: i };
export {
  x as default,
  i as render
};
