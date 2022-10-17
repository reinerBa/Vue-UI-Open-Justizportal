// SPDX-FileCopyrightText: © 2019 Oberverwaltungsgericht Rheinland-Pfalz <poststelle@ovg.jm.rlp.de>, Reiner Bamberger <4329883+reinerBa@users.noreply.github.com>
// SPDX-License-Identifier: EUPL-1.2
import { createApp, h } from 'vue'
// @ts-expect-error
import App from './App.vue'
import router from './router'
import 'material-design-lite/material.css'
import 'material-design-lite/material.js'
import { AuthStore, AuthStoreKey } from './store/authStore'
import { config, operatorConfig } from './store/configStore'
import { AuthService, AuthServiceKey } from './libs/services/AuthService'
import { AktenService, AktenServiceKey } from './libs/services/AktenService'
import { DownloadService, DownloadServiceKey } from './libs/services/DownloadService'
import { StatisticService, StatisticServiceKey } from './libs/services/StatisticService'

const app = createApp(App)
app.use(router)
app.component('loading-bar', { render () { return h('div', { class: 'jp-progress-line' }) } })
app.component('rotationg-refresh', { render () { return h('i', { class: 'material-icons jp-rotating' }, 'refresh') } })

const authStore = new AuthStore()
const authService = new AuthService(authStore, () => config)
app.provide(AuthStoreKey, authStore)
app.provide(AuthServiceKey, authService)
app.provide('AuthServiceKey', authService)

const aktenService = new AktenService(authStore, () => config)
const downloadService = new DownloadService(authStore, () => config)
const statisticService = new StatisticService(authStore, () => config)

app.provide(AktenServiceKey, aktenService)
app.provide(DownloadServiceKey, downloadService)
app.provide(StatisticServiceKey, statisticService)

app.mount('#app')
