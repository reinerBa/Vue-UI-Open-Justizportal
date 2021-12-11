<script lang="ts">
import { defineComponent, ref } from 'vue'
import { GetAkteneinsichten } from './../../libs/services/AktenService'

export default  defineComponent({
  data(){
    return {
    }
  },
  mounted(){
    GetAkteneinsichten().then(response => {
      this.akteneinsichten.push(...response.data)
      if (this.akteneinsichten.length === 1) {
        router.push('/akteneinsicht/'+ this.akteneinsichten[0].id)
        sessionStorage.setItem('aktenzeichenForPreview', this.akteneinsichten[0].aktenzeichen)
      }
    }).catch((error) => {
      alert(`Ihre Akteneinsicht konnte auf Grund eines Fehlers beim Datenabruf nicht geladen werden. 
Bitte probieren Sie es später noch einmal. 

Danke für Ihr Verständnis`)
      router.push('/home')
    })
  }
})
</script>

<script lang="ts" setup>
  import { Akteneinsicht } from '../../../../src/ressources/model'
  import router from '../../router'

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
