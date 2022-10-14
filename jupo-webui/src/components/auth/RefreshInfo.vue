<script lang="ts">
// SPDX-FileCopyrightText: © 2019 Oberverwaltungsgericht Rheinland-Pfalz <poststelle@ovg.jm.rlp.de>, Reiner Bamberger <4329883+reinerBa@users.noreply.github.com>
// SPDX-License-Identifier: EUPL-1.2
import { Ref, ref } from "@vue/reactivity"
import { defineComponent, inject } from "@vue/runtime-core"
import { useIntervalFn, useNow } from "@vueuse/core"
import { injectStrict } from './../../libs/tools'
import { AuthService, AuthServiceKey } from "../../libs/services/AuthService"
import { AuthStore, AuthStoreKey } from "../../store/authStore"
const SECONDS = 60e3

export default defineComponent({
  setup(){
    const showSnackbar = ref(false)
    const authService: AuthService= injectStrict<AuthService>(AuthServiceKey)
    const authStore: AuthStore = injectStrict<AuthStore>(AuthStoreKey)
    const {expiresAt, isLoggedIn} = authStore.useStore()
  
    useIntervalFn(() => {
      let diff = expiresAt.value - Date.now()
      showSnackbar.value = isLoggedIn.value && diff < SECONDS
    }, 100)
    
    return {showSnackbar, authService, authStore, expiresAt, isLoggedIn, useIntervalFn}
  },
  methods: {
    async refresh(){
      this.showSnackbar = false
      await this.authService.Refresh()
    }
  }
})
</script>

<template>
  <div v-if="showSnackbar" class="mdl-snackbar" :class="{'mdl-snackbar--active': showSnackbar }">
    <div class="mdl-snackbar__text">
      Achtung, Ihre Sitzung läuft bald ab!
    </div>
    <div class="mdl-snackbar__button">
      <button id="refresh_token_alert_button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" @click="refresh()">
          <i class="material-icons">refresh</i>
      </button>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.mdl-snackbar 
  background-color: rgb(135,29,51);

.mdl-snackbar__text
  font-size: 26px;
  line-height: normal;
  align-self:center;

.material-icons
  font-size: 40px;
  height: unset !important;
  width: unset !important;

.mdl-button
  background: whitesmoke;
  height: 50px;

.mdl-snackbar__button
  align-self:center;
  padding:14px 24px 14px 12px;
</style>
