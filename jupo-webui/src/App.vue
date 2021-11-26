<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
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
    <JpMenu/>
    <jp-menu-header></jp-menu-header>
    <div class="jp-divider"></div>
    <jp-auth-info></jp-auth-info>
    <div class="jp-divider"></div>
    <jp-menu></jp-menu>
  </div>
  <main class="mdl-layout__content">
    <div class="jp-main-content">
        <router-view />
    </div>
  </main>
</div>

<RefreshInfo/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
