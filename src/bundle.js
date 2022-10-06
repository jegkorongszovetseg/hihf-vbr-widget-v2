import { defineCustomElement } from "vue";
import Test from "./components/Test.ce.vue";
import Test2 from "./components/Test2.ce.vue";
import "./style.css";

customElements.define("vbr-test-vue", defineCustomElement(Test));
customElements.define("vbr-test2-vue", defineCustomElement(Test2));
