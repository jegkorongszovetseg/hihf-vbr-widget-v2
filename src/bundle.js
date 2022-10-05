import { defineCustomElement } from "vue";
import Test from "./components/Test.ce.vue";
import "./style.css";

customElements.define("vbr-test-vue", defineCustomElement(Test));
