<template>
<div class="mdl-navigation jp-navigation jp-usercontrol">
  <div class="jp-login-info__info-text" v-if="'auth.authInfo$ | async as authInfo'"><!--todo-->
    <div>
    <span>Angemeldet als:&nbsp;</span>
    <strong>{{ authInfo.username }}</strong><br />
    <span>Abmeldung in: <jp-countdown :expiresAt="authInfo.expiresAt"></jp-countdown></span>       
<br/>
    <div class="jp-login-info__buttons">
        <button class="mdl-button mdl-js-button mdl-button--raised jp-login-info__refresh-button jp-changeable-button" @click="refresh()">
            <i class="material-icons jp-changeable-button--hide">refresh</i>
            <span class="jp-changeable-button--show">
              Anmeldung erneuern
            </span>
          </button>

      <button class="mdl-button mdl-js-button mdl-button--raised jp-login-info__logout-button" @click="logout()">
        Abmelden
      </button>
    </div>
  </div>
  </div>
  <div class="jp-login-info__info-text" v-if="!(auth.authInfo$ | async)">
    <div>Sie sind nicht angemeldet.</div>
    <div>
      <router-link to="/login">zur Anmeldung</router-link>
    </div>
  </div>
</div>

</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'AuthInfo',
  data () {
    return {
      updateTimer: null,
      updateTimerSub: ''
    }
  },
  mounted () {
    this.auth.getAuthInfo()
  },
  unmounted () {
    this.updateTimerSub.unsubscribe()
    this.updateTimer = null
  },
  methods: {
    logout() {
      this.authService.logout()
    },
    async refresh() {
      await this.authService.refresh()
    }
  }
})
</script>

<style>
.jp-usercontrol{
  padding-right: 20px;
  padding-left: 20px;
}
.jp-login-info__buttons button{
  width: 100%;
  margin: 8px 0;
}
.jp-login-info__buttons button::first-of-type{
  margin-top: 16px
}
</style>