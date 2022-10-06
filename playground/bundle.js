import { openBlock, createElementBlock, createTextVNode, createVNode, createElementVNode, defineCustomElement } from "vue";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$2 = {};
const _hoisted_1$2 = { class: "child" };
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$2, "CHILD");
}
const Child = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render]]);
const _style_0 = ":host {\n  --text-color: red;\n  --bg-color: white;\n}\n.text {\n  width: 100%;\n  text-align: center;\n  color: var(--text-color);\n}\n.child {\n  width: 100%;\n  text-align: center;\n  font-weight: 700;\n  background-color: var(--bg-color);\n}\n";
const _hoisted_1$1 = { class: "text" };
const _sfc_main$1 = {
  __name: "Test.ce",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createTextVNode(" TEST "),
        createVNode(Child)
      ]);
    };
  }
};
const Test = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0]]]);
const _style_1 = ".table {\n  background-color: beige;\n}\n";
const _hoisted_1 = { class: "text" };
const _hoisted_2 = /* @__PURE__ */ createElementVNode("div", { class: "table" }, "Table", -1);
const _sfc_main = {
  __name: "Test2.ce",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createTextVNode(" TEST2 "),
        createVNode(Child),
        _hoisted_2
      ]);
    };
  }
};
const Test2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["styles", [_style_0, _style_1]]]);
customElements.define("vbr-test-vue", defineCustomElement(Test));
customElements.define("vbr-test2-vue", defineCustomElement(Test2));
