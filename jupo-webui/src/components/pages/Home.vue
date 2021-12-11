<script lang="ts" setup>
  import { ComputedRef } from '@vue/reactivity'
  import {useStore, countdown } from './../../store/authStore'
  const isLoggedIn: ComputedRef<boolean> = useStore().isLoggedIn
  var homeWelcomeText: String = "hwt"

</script>

<template>
<h2>
  Herzlich willkommen
  {{homeWelcomeText}}
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
