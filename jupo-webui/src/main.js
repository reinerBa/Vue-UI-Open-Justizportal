import { createApp, h } from 'vue'
import App from './App.vue'
import router from "./router"
import "material-design-lite/material.css"
import "material-design-lite/material.js"
import './libs/models/api.d.ts'

const app = createApp(App)
app.use(router).mount("#app")
app.component('loading-bar', {render() { return h('div', { class: 'jp-progress-line'})}})
app.component('rotationg-refresh', {render() { return h('i', { class: 'material-icons jp-rotating'}, 'refresh')}})