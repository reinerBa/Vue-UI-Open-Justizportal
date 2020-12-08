<template>
<form class="jp-login-form" @submit="onLogin()">

  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label jp-textfield jp-login-form__textfield">
    <input class="mdl-textfield__input" type="text" name="reference" id="reference" v-model="username" required>
    <label class="mdl-textfield__label" for="reference">Aktenzeichen</label>
    <span class="mdl-textfield__error">Eingabe erforderlich</span>
  </div>

  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label jp-textfield jp-login-form__textfield">
    <input class="mdl-textfield__input" :type="hidePW ? 'password' : 'text'" name="password" id="password" v-model="password" required>
    <label class="mdl-textfield__label" for="password">Passwort</label>
    <span class="mdl-textfield__error">Eingabe erforderlich</span>
    <i class="material-icons mdl-textfield__label__icon" 
      @mouseleave="hidePW = true"
      @mouseup="hidePW = true"
      @mousedown="hidePW = false"
    >{{hidePW ? 'visibility_off' : 'visibility'}}</i>
  </div>

  <div class="jp-login-form__textfield jp-login-button">
    <button class="mdl-button mdl-js-button mdl-button--raised jp-login-form__button" type="submit">
      <div class="jp-login-form__button-text" v-if="!isLoading">Anmelden</div>
      <div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner jp-login-form__button-spinner" :class="{'is-active' : isLoading}"></div>
    </button>

    <span class="msg-error" v-if="errorMessage">
      {{ errorMessage }}
    </span>
  </div>
</form>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import moment from 'moment'
import { AuthErrorCodes, AuthResponse } from '../../ressources/model'

export default defineComponent({
  name: 'LoginForm',
  data () {
    return {
      username: '',
      password: '',
      hidePW: true,
      isLoading: false,
      errorMessage: ''
    }
  },
  mounted () {
    this.hidePW = true
  },
  methods: {
    async onLogin () {
      this.isLoading = true

      try {
        let res = await this.authService.login(this.username, this.password)
        if(res.returnCode == AuthErrorCodes.Ok) {
          this.router.navigateByUrl('/akteneinsichten')
        } else {
          this.errorMessage = this.getMessageFromAuthResponse(res);
        }

        this.isLoading = false;      
      } catch (err) {
          this.errorMessage = "Fehler bei der Anmeldung.";
          this.isLoading = false;
      }
    }
  } 
})

function getMessageFromAuthResponse(response: AuthResponse) : string {
  if(response.returnCode == AuthErrorCodes.Ok) {
    return "Anmeldung erfolgreich";
  } else if (response.returnCode == AuthErrorCodes.ErrorUserLocked) {
    return "Der Benutzer ist bis " + moment().add(response.errorInfo.unlockedIn, "seconds").format("LT") + " Uhr gesperrt.";
  } else if (response.returnCode == AuthErrorCodes.ErrorWrongCredentials) {
    return "Die Anmeldedaten sind leider nicht korrekt.";
  } else {
    return "Fehler bei der Anmeldung.";
  }
}
</script>

<style>
.msg-error{
  color: darkred;
  padding-left: 2em;
}

.jp-login-form .mdl-textfield{
  width: 345px;
}

.jp-login-button{
  padding-top: 20px;
  padding-bottom: 20px;
}

.mdl-textfield__label__icon {
  position: absolute;
  right: 0;
  top: 20px;
  cursor: pointer;
}
</style>