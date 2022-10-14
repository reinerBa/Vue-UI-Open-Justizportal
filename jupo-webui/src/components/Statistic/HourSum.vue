<script lang="ts">
// SPDX-FileCopyrightText: © 2019 Oberverwaltungsgericht Rheinland-Pfalz <poststelle@ovg.jm.rlp.de>, Reiner Bamberger <4329883+reinerBa@users.noreply.github.com>
// SPDX-License-Identifier: EUPL-1.2
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
    props:['usagesTable']
})
</script>

<template>
<div>
  <h5>Stundensummen</h5>

  <div v-for="(value, key) in usagesTable" :key="'stundensummen' + key">
    <table class="jp-stat-table">
      <thead><th></th></thead>
      <thead><th>{{key}}</th></thead>
      <thead><th></th>        
        <th v-for="hour in [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]" :key="'hour1' + hour">{{hour}}</th>
      </thead>
      <tbody v-for="(value2, key2) in value" :key="'stdDetail'+ key2">
        <tr>
          <td>{{key2}}</td>
          <td v-for="hour in [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]" :key="'hour' + hour">
              {{value2[hour]}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>