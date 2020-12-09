import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
// import Datenschutz from './components/main/Datenschutz.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', redirect: './home' },
      { path: '/home', component: require('./components/main/Home.vue') },
      { path: '/login', component: require('./components/auth/LoginForm.vue')},
      { path: '/akteneinsichten', component: require('./components/akteneinsicht/Akteneinsichten.vue')}, 
      { path: '/akteneinsichten/:id', props: true, component: require('./components/akteneinsicht/Akteneinsicht.vue')},
      { path: '/kontakt', component: require('./components/main/Kontakt.vue') },
      { path: '/impressum', component: require('./components/main/Impressum.vue') },
      { path: '/datenschutz', component: require('./components/main/Datenschutz.vue') },
    ]
  })
