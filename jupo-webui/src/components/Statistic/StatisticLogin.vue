<script lang="ts">
// SPDX-FileCopyrightText: © 2019 Oberverwaltungsgericht Rheinland-Pfalz <poststelle@ovg.jm.rlp.de>, Reiner Bamberger <4329883+reinerBa@users.noreply.github.com>
// SPDX-License-Identifier: EUPL-1.2
export default defineComponent({
  emits:['access-password'],
  inject: {authService: {from: AuthServiceKey as symbol}},
  data() {
    return {
      password: '',
      isLoading: false,
      errorMessage: ''
    }
  },
  methods: {
    async onLogin(){
      this.isLoading = true
      try{
          let resultCode: boolean = await this.authService.verifyStatisticPassword(this.password)
          
          if(resultCode) {
              this.$emit('access-password', this.password)
              return
          }
          this.errorMessage = 'Die Anmeldedaten sind leider nicht korrekt.'
        }catch(e) {
          console.error(e)
          this.errorMessage = 'Fehler bei der Authentisierung.'
        } finally {
          this.isLoading = false
        }
      }
  }
})
</script> 

<script lang="ts" setup>
  import { defineComponent, inject } from "@vue/runtime-core"
  import { injectStrict } from './../../libs/tools'
  import { AuthService, AuthServiceKey } from "../../libs/services/AuthService"
</script>

<template>
<form class="jp-login-form" @submit.prevent="onLogin()">
  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label jp-textfield jp-login-form__textfield">
    <input type="text" hidden autocomplete="username" />
    <input class="mdl-textfield__input" type="password" name="password" id="statistic-password" v-model="password" required autocomplete="current-password">
    <label class="mdl-textfield__label" for="password">Passwort</label>
    <span class="mdl-textfield__error">Eingabe erforderlich</span>
  </div>
  <div class="jp-login-form__textfield jp-login-button">
    <button id="submit_statistic_button" :disabled="isLoading || password === ''" class="mdl-button mdl-js-button mdl-button--raised jp-login-form__button" type="submit">
      <div v-if="!isLoading" class="jp-login-form__button-text">Anmelden</div>
      <rotationg-refresh v-else/>
    </button>

    <span class="msg-error" v-if="errorMessage != ''">
      {{ errorMessage }}
    </span>
  </div>
</form>
</template>

<style lang="styl" scoped>

</style>
