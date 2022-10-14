<script lang="ts">
// SPDX-FileCopyrightText: © 2019 Oberverwaltungsgericht Rheinland-Pfalz <poststelle@ovg.jm.rlp.de>, Reiner Bamberger <4329883+reinerBa@users.noreply.github.com>
// SPDX-License-Identifier: EUPL-1.2
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
