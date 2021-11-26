import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import "material-design-lite/material.css";
import "material-design-lite/material.js";

createApp(App).use(router).mount("#app")