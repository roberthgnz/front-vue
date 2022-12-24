import { createApp } from 'vue'
import VueApexCharts from "vue3-apexcharts";

import './style.css'

import App from './App.vue'

const app = createApp(App);
app.use(VueApexCharts).mount('#app')
