<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from './../../store/authStore'
import { config } from './../../store/configStore'
import { Login } from './../../libs/services/AuthService'
import { AuthErrorCodes } from '../../libs/models/auth-error-codes'
import router from '../../router'

export default defineComponent({
  data() {
    return {
      password: '',
      isLoading: false,
      errorMessage: ''
    }
  },
  methods: {
    async onLogin(){
      let resultCode = await Login(this.username, this.password)
      if (resultCode === AuthErrorCodes.Ok){
        router.push('/akteneinsichten')
      }
    }
  }
})
</script> 

<script lang="ts" setup>
const username: String = ''
const hidePW: Boolean = true
</script>


<template>
<form class="jp-login-form" @submit.prevent="onLogin()">
  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label jp-textfield jp-login-form__textfield">
    <input id="login_name_input" class="mdl-textfield__input" type="text" autocomplete="username" 
      name="reference" v-model="username" required>
    <label class="mdl-textfield__label" for="login_name_input">Aktenzeichen</label>
    <span class="mdl-textfield__error">Eingabe erforderlich</span>
  </div>

  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label jp-textfield jp-login-form__textfield">
    <input id="login_password_input" class="mdl-textfield__input" :type="hidePW ? 'password' : 'text'" name="password" 
      v-model="password" autocomplete="current-password" required>
    <label class="mdl-textfield__label" for="login_password_input">Passwort</label>
    <span class="mdl-textfield__error">Eingabe erforderlich</span>
    <i class="material-icons mdl-textfield__label__icon" 
      @mouseleave="hidePW = true"
      @mouseup="hidePW = true"
      @mousedown="hidePW = false"
    >{{hidePW ? 'visibility_off' : 'visibility'}}</i>
  </div>

  <div class="jp-login-form__textfield jp-login-button">
    <button id="submit_login_button" :disabled="isLoading || username === '' || password === ''" 
      class="mdl-button mdl-js-button mdl-button--raised jp-login-form__button" type="submit">
      <div class="jp-login-form__button-text" v-if="!isLoading">Anmelden</div>
      <div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner jp-login-form__button-spinner" 
        :class="{'is-active' : isLoading}"></div>
    </button>

    <span class="msg-error" v-if="errorMessage != ''">
      {{ errorMessage }}
    </span>
  </div>
</form>

</template>

<style lang="stylus" scoped>
.msg-error
  color darkred
  padding-left 2em

.jp-login-form .mdl-textfield
  width 345px

.jp-login-button
  padding-top 20px
  padding-bottom 20px

.mdl-textfield__label__icon
  position absolute
  right 0
  top 20px
  cursor pointer

</style>