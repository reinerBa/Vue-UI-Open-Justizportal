<script lang="ts">
import { defineComponent, provide, InjectionKey, computed } from 'vue'
import { config, operatorConfig } from './store/configStore'
import ConfigService from './libs/services/ConfigService'
import {useRoute} from 'vue-router'

export default defineComponent({
  async beforeCreate () {
    document.head.innerHTML += '<link rel="stylesheet" href="./assets/css/color-scheme.css">'
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

  const route= useRoute()
  const title = computed(() =>route.name)

  provide('operatorConfig', operatorConfig)
  provide('config', config)
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
