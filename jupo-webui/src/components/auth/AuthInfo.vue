<script lang="ts">
import { ref } from '@vue/reactivity'
import { AuthStore, AuthStoreKey } from './../../store/authStore'
import { defineComponent, inject } from '@vue/runtime-core'
import { AuthService, AuthServiceKey } from '../../libs/services/AuthService'
import { injectStrict } from './../../libs/tools'
import router from '../../router'
import Countdown from './Countdown.vue'

export default defineComponent({
  setup(){
    const authService: AuthService = injectStrict(AuthServiceKey)
    const isRefreshing = ref(false)
    const authStore: AuthStore = injectStrict<AuthStore>(AuthStoreKey)
    const {expiresAt, username, isLoggedIn } = authStore.useStore()
    return {authService, authStore, isRefreshing, expiresAt, username, isLoggedIn}
  },
  components: {Countdown},
  methods: {
    async logout() {
      await this.authService.Logout()
      router.push('/login')
    },
    async refresh() {
      let result
      try{
        result = await this.authService.Refresh()
      }catch(e){}
      if (result !== 'OK') 
        alert('Ihre Anmeldung konnte nicht verlängert werden')
    }
  }
})
</script>

<template>
<div class="mdl-navigation jp-navigation jp-usercontrol">
  <div class="jp-login-info__info-text" v-if="isLoggedIn">
    <div>
    <span>Angemeldet als:&nbsp;</span>
    <strong id="reference-info">{{ username }}</strong><br />
    <span>Abmeldung in: <Countdown :expiresAt="expiresAt"/> </span>
    <br/>
    <div class="jp-login-info__buttons">
        <button id="refresh_token_button" :disabled="isRefreshing" 
          class="mdl-button mdl-js-button mdl-button--raised jp-login-info__refresh-button jp-changeable-button" @click="refresh()">
            <i class="material-icons jp-changeable-button--hide">refresh</i>
            <span class="jp-changeable-button--show">
              Anmeldung erneuern
            </span>
          </button>

      <button id="logout_button" class="mdl-button mdl-js-button mdl-button--raised jp-login-info__logout-button" @click="logout()">
        Abmelden
      </button>
    </div>
  </div>
  </div>
  <div class="jp-login-info__info-text" v-if="!isLoggedIn">
    <div>Sie sind nicht angemeldet.</div>
    <div>
      <router-link :to="'/login'" id="login_link">zur Anmeldung</router-link>
    </div>
  </div>
</div>

</template>

<style lang="stylus" scoped>
.jp-usercontrol
  padding-right 20px
  padding-left 20px

.jp-login-info__buttons button
  width 100%
  margin 8px 0

.jp-login-info__buttons button::first-of-type
  margin-top 16px

</style>