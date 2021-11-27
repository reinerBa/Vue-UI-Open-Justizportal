import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/pages/Home.vue"
import Datenschutz from "./components/pages/Datenschutz.vue"
import Contact from "./components/pages/Contact.vue"
import Impressum from "./components/pages/Impressum.vue"
import Akteneinsichten from './components/akteneinsicht/AkteneinsichtList.vue'
import Statistic from './components/pages/Statistic.vue'
import Login from './components/auth/Login.vue'

const history = createWebHistory();
const routes = [
  { path: "/", component: Home },
  { path: "/home", component: Home },
  { path: "/login", component: Login },
  { path: "/akteneinsichten", component: Akteneinsichten },
  { path: "/contact", component: Contact },
  { path: "/impressum", component: Impressum },
  { path: "/datenschutz", component: Datenschutz },
  { path: "/statistik", component: Statistic }
];
const router = createRouter({ history, routes });
export default router