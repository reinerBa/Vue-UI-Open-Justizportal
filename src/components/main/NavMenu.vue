<template>
  <nav class="mdl-navigation jp-navigation">
  <a class="mdl-navigation__link jp-navigation__link" routerLink="home" routerLinkActive="jp-navigation__link--activated">Home</a>
  <a class="mdl-navigation__link jp-navigation__link" routerLink="akteneinsichten" routerLinkActive="jp-navigation__link--activated">Elektronische Akteneinsicht</a>
  <a class="mdl-navigation__link jp-navigation__link" routerLink="kontakt" routerLinkActive="jp-navigation__link--activated">Kontakt</a>
  <a class="mdl-navigation__link jp-navigation__link" routerLink="impressum" routerLinkActive="jp-navigation__link--activated">Impressum</a>
  <a class="mdl-navigation__link jp-navigation__link" routerLink="datenschutz" routerLinkActive="jp-navigation__link--activated">Datenschutz</a>
</nav> 
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'NavMenu'
})
</script>