<script lang="ts">
import { defineComponent } from 'vue'

export default  defineComponent({
  mounted(){
    // count down the countdown time
  },
  methods:{
    refreshToken(){

    },
    logout(){

    }
  }
})
</script> 

<script lang="ts" setup>
const countdown = "00:00" 
const isLoggedIn = false
const isRefreshing = true
const authInfo = {}
</script>

<template>
<div class="mdl-navigation jp-navigation jp-usercontrol">
  <div class="jp-login-info__info-text" v-if="true"> <!-- todo auth.authInfo$ | async as authInfo-->
    <div>
    <span>Angemeldet als:&nbsp;</span>
    <strong id="reference-info">{{ authInfo.username }}</strong><br />
    <span>Abmeldung in: 
      <span id="countdown-time">{{countdown}}</span>
    </span>       
<br/>
    <div class="jp-login-info__buttons">
        <button id="refresh_token_button" :disabled="isRefreshing" class="mdl-button mdl-js-button mdl-button--raised jp-login-info__refresh-button jp-changeable-button" 
        @click="refreshToken">
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
  <div class="jp-login-info__info-text" v-if="isLoggedIn"> <!-- prüfen mit authStore -->
    <div>Sie sind nicht angemeldet.</div>
    <div>
      <router-link to="login" id="login_link">zur Anmeldung</router-link>
    </div>
  </div>
</div>
</template>

<style lang="stylus" scoped>
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
