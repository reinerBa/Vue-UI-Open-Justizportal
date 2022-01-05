<script lang="ts">
import { defineComponent, inject } from "@vue/runtime-core"
import { AuthStoreKey, AuthStore } from './../../store/authStore'
import { injectStrict } from './../../libs/tools'

export default defineComponent({
    setup() {
      const authStore: AuthStore = injectStrict<AuthStore>(AuthStoreKey)
      const operator = inject('operatorConfig')
      const {isLoggedIn } = authStore.useStore()

      return {isLoggedIn, operator, authStore}
    }
})
</script>

<template>
<h2>
  Herzlich willkommen
  {{operator.homeWelcomeText}}
</h2>
<p>
  Hier können Sie Akteneinsicht nehmen. Die Akteneinsicht muss vorher bei Gericht beantragt werden. Wird die Einsicht
  gewährt, erhalten Sie ein Kennwort, das Ihnen den Zugang zur gewünschten Akte eröffnet.
</p>

<p v-if="isLoggedIn">
    <router-link to="/akteneinsichten">Zur elektronischen Akteneinsicht</router-link>
  <!--<a routerLink="/akteneinsichten" routerLinkActive="jp-navigation__link--activated">Zur elektronischen Akteneinsicht</a>-->
</p>
</template>

<style scoped>
</style>
