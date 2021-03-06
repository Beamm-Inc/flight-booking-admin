import "@babel/polyfill";
import Vue from "vue";
import VModal from "vue-js-modal";

import sharedComponents from "@/components/shared";
import shared from "@/shared";

// third party
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import Print from "vue-print-nb";
import VeeValidate from "vee-validate";
import VuetifyConfirm from "vuetify-confirm";
import Notify from "vue-notifyjs";
import "vue-notifyjs/themes/default.css";
import "material-design-icons/iconfont/material-icons.css";

import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

Vue.use(VueQuillEditor);
Vue.use(Notify, {
  horizontalAlign: "center",
  verticalAlign: "top"
});
Vue.use(Print);
Vue.use(VeeValidate);
Vue.use(VuetifyConfirm);
Vue.use(VModal, { dynamic: true });

Vue.use(sharedComponents);
Vue.use(shared);

Vue.config.productionTip = false;

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
