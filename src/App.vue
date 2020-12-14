<template>
  <div class="jp-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">

    <header class="mdl-layout__header jp-header">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title jp-header__title">{{ title }}</span>
        <div class="mdl-layout-spacer"></div>
      </div>
    </header>

    <div class="mdl-layout__drawer jp-drawer">
      <jp-menu-header />
      <div class="jp-divider"></div>
      <jp-auth-info />
      <div class="jp-divider"></div>
      <jp-menu />
    </div>
    <main class="mdl-layout__content">
      <div class="jp-main-content">
        <router-view />
      </div>
    </main>
  </div>

  <jp-refresh-info />
</template>

<script lang="ts">
import RefreshInfo from './components/auth/RefreshInfo.vue'
import MenuHeader from './components/main/NavMenuHeader.vue'
import AuthInfo from './components/auth/AuthInfo.vue'
import NavMenu from './components/main/NavMenu.vue'
import { App, defineComponent } from 'vue'
import packageSettings from '../package.json'
import { ProvideConfigs, ProvideServices } from './services/Service.container'
import { AbstractJSONConfigService, JSONConfigService } from './services'
import buildSettings from '../build-settings.json'

export default defineComponent({
  name: 'App',
  components: {
   'jp-menu-header': MenuHeader,
   'jp-auth-info': AuthInfo,
   'jp-menu': NavMenu,
   'jp-refresh-info': RefreshInfo
  },
  data () {
    return {
      title: 'Justizportal'
    }
  },
  async created () {
    const jsonService: AbstractJSONConfigService = new JSONConfigService(this.$http)
    const appConfig = await jsonService.getAppConfig(buildSettings.configURL)
    const appOperatorConfig = await jsonService.getAppOperatorConfig(buildSettings.operatorConfigUrl)

    ProvideServices(this, appConfig, this.$http)
    ProvideConfigs(this, appConfig, appOperatorConfig)
    // todo: save settings to vuex state
  },
  mounted () {
    //      this.title = state.title;
    //  this.titleService.setTitle('Justizportal | ' + this.title);
    console.log("Justizportal v." + packageSettings.version);
  }
})
</script>
