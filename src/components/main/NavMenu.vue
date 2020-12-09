<template>
  <nav class="mdl-navigation jp-navigation">
    <router-link class="mdl-navigation__link jp-navigation__link" active-class="jp-navigation__link--activated" 
      to="/home">Home</router-link>
    <router-link class="mdl-navigation__link jp-navigation__link" active-class="jp-navigation__link--activated" 
      to="/akteneinsichten">Elektronische Akteneinsicht</router-link>
    <router-link class="mdl-navigation__link jp-navigation__link" active-class="jp-navigation__link--activated" 
      to="/kontakt">Kontakt</router-link>
    <router-link class="mdl-navigation__link jp-navigation__link" active-class="jp-navigation__link--activated" 
      to="/impressum">Impressum</router-link>
    <router-link class="mdl-navigation__link jp-navigation__link" active-class="jp-navigation__link--activated" 
      to="/datenschutz">Datenschutz</router-link>
  </nav> 
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'NavMenu'
})
</script>