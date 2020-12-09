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

<script>
import RefreshInfo from './components/auth/RefreshInfo'
import MenuHeader from './components/main/NavMenuHeader'
import AuthInfo from './components/auth/AuthInfo'
import NavMenu from './components/main/NavMenu'

export default {
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
  mounted () {
    //      this.title = state.title;
    //  this.titleService.setTitle('Justizportal | ' + this.title);
    console.log("Justizportal v." + version);
  }
}
</script>
