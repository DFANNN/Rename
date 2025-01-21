import "./assets/main.css";
import "element-plus/dist/index.css";
import { createApp } from "vue";
import router from "@renderer/routers/index";
import { createPinia } from "pinia";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.mount("#app");
