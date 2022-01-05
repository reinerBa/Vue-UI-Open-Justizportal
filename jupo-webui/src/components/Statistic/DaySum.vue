<script lang="ts">
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