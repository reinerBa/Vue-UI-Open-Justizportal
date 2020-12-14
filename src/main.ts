import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {router} from './Router'
import { JSONConfigService } from './services/JSONConfig.service'
import { AbstractJSONConfigService } from './services/Contracts'
import { ProvideConfigs, ProvideServices } from './services/Service.container'

const app = createApp(App)
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')

/*
InitApp(app)

async function InitApp(app: App<Element>){
    const jsonService: AbstractJSONConfigService = new JSONConfigService(axios)
    const appConfig = await jsonService.getAppConfig(configURL)
    const appOperatorConfig = await jsonService.getAppOperatorConfig(operatorConfigUrl)

    ProvideServices(app, appConfig, axios)
    ProvideConfigs(app, appConfig, appOperatorConfig)

    app.mount('#app')
}
*/
