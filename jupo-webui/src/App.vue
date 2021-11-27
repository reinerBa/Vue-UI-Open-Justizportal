<script setup>
import JpMenu from './components/navigation/JpMenu.vue'
import JpMenuHeader from './components/navigation/JpMenuHeader.vue'
import JpAuthInfo from './components/navigation/JpAuthInfo.vue'
import RefreshInfo from './components/auth/RefreshInfo.vue'

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
    <JpAuthInfo />
    <div class="jp-divider"></div>
    <JpMenu/>
  </div>
  <main class="mdl-layout__content">
    <div class="jp-main-content">
        <router-view />
    </div>
  </main>
</div>

<RefreshInfo/>
</template>
