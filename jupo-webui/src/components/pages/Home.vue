<script setup>
var IsLoggedIn = false
function homeWelcomeText() {
    return "hwt";
}
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

<p v-if="IsLoggedIn">
  <a routerLink="/akteneinsichten" routerLinkActive="jp-navigation__link--activated">Zur elektronischen Akteneinsicht</a>
</p>
</template>

<style scoped>
</style>
