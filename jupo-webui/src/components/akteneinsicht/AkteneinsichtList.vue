<script lang="ts">
import { defineComponent, ref } from 'vue'

const Component = defineComponent({
  setup() { }
})
</script>

<script lang="ts" setup>
  import { Akteneinsicht } from '../../../../src/ressources/model'

  var akteneinsichten: Array<Akteneinsicht> = []
  var loadingDone: Boolean = false
</script>

<template>
  <div>
    <h2 class="list-of-records-title">Ihre Akteneinsichten
        <span v-if="loadingDone">:</span>
        <span v-else> werden geladen</span>
    </h2>

    <div v-if="!loadingDone" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>

    <ul>
    <li v-for="(akteneinsicht, idx) in akteneinsichten" :key="'akteneinsichten'+ idx">
        <router-link :to="'/akteneinsichten/' + akteneinsicht.id">
            {{ akteneinsicht.aktenzeichen }}
        </router-link>
    </li>  
    </ul>

  </div>    
</template>
