<script lang="ts">
import { defineComponent } from 'vue'
import { config } from './store/configStore'
import { AppOperator } from './libs/models/app-operator'
import { AppConfig } from './libs/models/app-config'
import ConfigService from './libs/services/ConfigService'

export default defineComponent({
  async created () {
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

  var title = 'jupo!'
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
