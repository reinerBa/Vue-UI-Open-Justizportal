<script lang="ts">
import { defineComponent, inject, Ref, ref } from 'vue'
import { AuthStore, AuthStoreKey } from './../../store/authStore'
import { AuthService, AuthServiceKey } from './../../libs/services/AuthService'
import {injectStrict} from './../../libs/tools'
import moment from 'moment'
import { DtoAkteneinsicht, DtOStatistic, ReturnCodes } from './../../libs/models/api'

export default defineComponent({
  inject:{
    "authService": {from: 'AuthServiceKey'}
  },
  data() {
    return {
      password: '',
      isLoading: false,
      errorMessage: ''
    }
  },
  mounted(){
    if(this.isloggedIn) this.redirect()
  },
  methods: {
    redirect(){
      this.$router.push('/akteneinsichten')
    },
    async onLogin(){
      this.isLoading = true
      try{
          let resultCode = await this.authService.Login(this.username, this.password)

          if (resultCode === ReturnCodes.Ok.toUpperCase())
            this.redirect()
          else if (resultCode === ReturnCodes.ErrorUserLocked)
            this.errorMessage = `Der Benutzer ist bis ${moment().add(this.authService.LastErrorInfo(), "seconds").format("LT")} Uhr gesperrt.`
          else if (resultCode === ReturnCodes.ErrorWrongCredentials)
            this.errorMessage = 'Die Anmeldedaten sind leider nicht korrekt.'
          else
            this.errorMessage = 'Fehler bei der Anmeldung.'
        }catch(e){
              console.error(e)
              this.errorMessage = 'Fehler bei der Anmeldung.'
        } finally{
          this.isLoading = false
        }
      }
  }
})
</script> 

<script lang="ts" setup>
  const username: Ref<string> = ref('')
  const hidePW: Ref<boolean> = ref(true)
//  const authService: AuthService = injectStrict('AuthServiceKey')
  const authStore: AuthStore = injectStrict(AuthStoreKey)
  const {isLoggedIn} = authStore.useStore()
</script>


<template> 
<form class="jp-login-form" @submit.prevent="onLogin()">
  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label jp-textfield jp-login-form__textfield">
    <input id="login_name_input" class="mdl-textfield__input" type="text" autocomplete="username" 
      name="reference" v-model="username" required>
    <label v-show="!username" class="mdl-textfield__label" for="login_name_input">Aktenzeichen</label>
    <span class="mdl-textfield__error">Eingabe erforderlich</span>
  </div>

  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label jp-textfield jp-login-form__textfield">
    <input id="login_password_input" class="mdl-textfield__input" :type="hidePW ? 'password' : 'text'" name="password" 
      v-model="password" autocomplete="current-password" required>
    <label v-show="!password" class="mdl-textfield__label" for="login_password_input">Passwort</label>
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
      <div v-if="!isLoading" class="jp-login-form__button-text">Anmelden</div>
      <rotationg-refresh v-else/>
    </button>

    <span class="msg-error" v-if="errorMessage">
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