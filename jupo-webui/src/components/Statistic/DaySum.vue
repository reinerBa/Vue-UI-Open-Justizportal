<script lang="ts">
// SPDX-FileCopyrightText: © 2019 Oberverwaltungsgericht Rheinland-Pfalz <poststelle@ovg.jm.rlp.de>, Reiner Bamberger <4329883+reinerBa@users.noreply.github.com>
// SPDX-License-Identifier: EUPL-1.2
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
    props:['usageDays']
})
</script>

<template>
<div>
  <h5>Tagessummen</h5>
  <table v-for="(dayStat, idx) in usageDays" :key="'dayStat' + idx">
    <tbody>
      <tr><td>{{dayStat}}</td></tr>
    </tbody>
  </table>
</div>
</template>