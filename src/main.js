import { createApp } from "vue";
import VueApexCharts from "vue3-apexcharts";

import "./style.css";
import App from "./App.vue";

import { router } from "./routes";

const app = createApp(App);
app.use(router).use(VueApexCharts).mount("#app");
