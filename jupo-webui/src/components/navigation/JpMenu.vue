<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
export default defineComponent({})
</script>

<template>
<nav class="mdl-navigation jp-navigation">
  <router-link to="/home" class="mdl-navigation__link jp-navigation__link">Home</router-link>
  <router-link to="/akteneinsichten" class="mdl-navigation__link jp-navigation__link">Elektronische Akteneinsicht</router-link>
  <router-link to="/contact" class="mdl-navigation__link jp-navigation__link">Kontakt</router-link>
  <router-link to="/impressum" class="mdl-navigation__link jp-navigation__link">Impressum</router-link>
  <router-link to="/datenschutz" class="mdl-navigation__link jp-navigation__link">Datenschutz</router-link>
</nav>
</template>
