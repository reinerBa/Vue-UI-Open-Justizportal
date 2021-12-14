<script lang="ts">
import { defineComponent, provide, InjectionKey } from 'vue'
import { config } from './store/configStore'
import ConfigService from './libs/services/ConfigService'

export default defineComponent({
  async beforeCreate () {
    await ConfigService()
  },
  computed:{
    hasConfig (): boolean {
      return Boolean(config.akteneinsichtenUrl)
    }
  }
})
</script> 

<script lang="ts" setup>
  import JpMenu from './components/navigation/JpMenu.vue'
  import JpMenuHeader from './components/navigation/JpMenuHeader.vue'
  import RefreshInfo from './components/auth/RefreshInfo.vue'
  import AuthInfo from './components/auth/AuthInfo.vue'
  import { AuthService, AuthServiceKey } from './libs/services/AuthService'
  import { AktenService, AktenServiceKey } from './libs/services/AktenService'
  import { DownloadService, DownloadServiceKey } from './libs/services/DownloadService'
import { AuthStore, AuthStoreKey } from './store/authStore'
import { StatisticService, StatisticServiceKey } from './libs/services/StatisticService'

  var title = 'jupo!'
  const authStore = new AuthStore()
  provide(AuthStoreKey, authStore)

  const authService = new AuthService(authStore, ()=> config)
  const aktenService = new AktenService(authStore, ()=> config)
  const downloadService = new DownloadService(authStore, ()=> config)
  const statisticService = new StatisticService(authStore, ()=> config)
  provide(AuthServiceKey, authService) 
  provide(AktenServiceKey, aktenService)
  provide(DownloadServiceKey, downloadService)
  provide(StatisticServiceKey, statisticService)
  // typed DI is explained here https://logaretm.com/blog/type-safe-provide-inject/
</script>

<template>
  <div class="jp-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">

  <header class="mdl-layout__header jp-header">
    <div class="mdl-layout__header-row">
      <span class="mdl-layout-title jp-header__title">{{ title }}</span>
      <div class="mdl-layout-spacer"></div>
    </div>
  </header>

  <div class="mdl-layout__drawer jp-drawer">
    <JpMenuHeader />
    <div class="jp-divider"></div>
    <AuthInfo />
    <div class="jp-divider"></div>
    <JpMenu />
  </div>
  <main class="mdl-layout__content">
    <div v-if="hasConfig" class="jp-main-content">
        <router-view />
    </div>
  </main>
</div>

<RefreshInfo />
</template>

<style lang="styl">
@import './styles.styl'
</style>
