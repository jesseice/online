import { createApp } from "vue";
import App from "./App.vue";
import "tdesign-vue-next/es/style/index.css";
import "./style.css";
import router from "./route/index";

import "./demos/ipc";
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

createApp(App)
  .use(router)
  .mount("#app")
  .$nextTick(() => {
    postMessage({ payload: "removeLoading" }, "*");
  });
