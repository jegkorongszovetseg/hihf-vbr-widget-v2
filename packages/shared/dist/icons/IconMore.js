import { openBlock as o, createElementBlock as c, createElementVNode as e } from "vue";
const t = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, r = /* @__PURE__ */ e("circle", {
  cx: "12",
  cy: "12",
  r: "1"
}, null, -1), n = /* @__PURE__ */ e("circle", {
  cx: "12",
  cy: "5",
  r: "1"
}, null, -1), l = /* @__PURE__ */ e("circle", {
  cx: "12",
  cy: "19",
  r: "1"
}, null, -1), s = [
  r,
  n,
  l
];
function i(d, _) {
  return o(), c("svg", t, s);
}
const h = { render: i };
export {
  h as default,
  i as render
};
