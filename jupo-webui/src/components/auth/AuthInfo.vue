<script setup>
    import Countdown from './Countdown.vue'
    var isRefreshing = false
    const isLoggedIn = () => true   //todo
    const authInfo = {}
</script>

<template>
<div class="mdl-navigation jp-navigation jp-usercontrol">
  <div class="jp-login-info__info-text" v-if="isLoggedIn">
    <div>
    <span>Angemeldet als:&nbsp;</span>
    <strong id="reference-info">{{ authInfo.username }}</strong><br />
    <span>Abmeldung in: <Countdown :expiresAt="authInfo.expiresAt" id="countdown-time"/></span>       
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
      <a routerLink="login" id="login_link">zur Anmeldung</a>
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