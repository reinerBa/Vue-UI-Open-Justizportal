import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/pages/Home.vue"
import Datenschutz from "./components/pages/Datenschutz.vue"
import Contact from "./components/pages/Contact.vue"
import Impressum from "./components/pages/Impressum.vue"
import HelloWorld from './components/HelloWorld.vue'

const history = createWebHistory();
const routes = [
  { path: "/", component: HelloWorld },
  { path: "/home", component: Home },
  { path: "/contact", component: Contact },
  { path: "/impressum", component: Impressum },
  { path: "/datenschutz", component: Datenschutz },
];
const router = createRouter({ history, routes });
export default router