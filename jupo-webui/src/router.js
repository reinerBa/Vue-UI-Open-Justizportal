// SPDX-FileCopyrightText: © 2019 Oberverwaltungsgericht Rheinland-Pfalz <poststelle@ovg.jm.rlp.de>, Reiner Bamberger <4329883+reinerBa@users.noreply.github.com>
// SPDX-License-Identifier: EUPL-1.2
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./components/pages/Home.vue"
import Datenschutz from "./components/pages/Datenschutz.vue"
import Contact from "./components/pages/Contact.vue"
import Impressum from "./components/pages/Impressum.vue"
import Akteneinsichten from './components/akteneinsicht/AkteneinsichtList.vue'
import Akteneinsicht from './components/akteneinsicht/AktenAnsicht.vue'
import Statistic from './components/Statistic/Statistic.vue'
import Login from './components/auth/Login.vue'

const history = createWebHashHistory();
const routes = [
//  { path: "/", component: Home, name: 'Home' },
  { path: "/home", component: Home, name: 'Home' },
  { path: "/login", component: Login, name: 'Login' },
  { path: "/akteneinsichten", component: Akteneinsichten, name: 'Akteneinsichten' },
  { path: "/akteneinsicht/:id", component: Akteneinsicht, props: true, name: 'Elektronische Akteneinsicht' },
  { path: "/contact", component: Contact, name: 'Kontakt' },
  { path: "/impressum", component: Impressum, name: 'Impressum' },
  { path: "/datenschutz", component: Datenschutz, name: 'Datenschutz' },
  { path: "/statistik", component: Statistic, name: 'Nutzungsauswertung' },
  { path: '/:pathMatch(.*)', component: Home, name: 'Home' }
]
const router = createRouter({ history, routes })

router.afterEach((to) => {
  document.title = 'Justizportal | ' + to.name
})

export default router