<script lang="ts">
import { defineComponent, inject, reactive, ref } from 'vue'
import { AktenService, AktenServiceKey } from './../../libs/services/AktenService'
import { AuthStore, AuthStoreKey } from '../../store/authStore'
import { injectStrict } from './../../libs/tools'
import { DtoAkteneinsicht } from './../../libs/models/api'

export default  defineComponent({
  setup(){
    const isReady = ref(false)
    const akteneinsichten: Array<DtoAkteneinsicht> = reactive([])
    const aktenService: AktenService = injectStrict(AktenServiceKey)
    const authStore: AuthStore = injectStrict<AuthStore>(AuthStoreKey)
    return {isReady, authStore, aktenService, akteneinsichten}
  },
  beforeRouteEnter(to, from, next){
    if(!AuthStore.IsLoggedIn())
      next('/login')
    else 
      next()
  },
  mounted(){
    this.aktenService.GetAkteneinsichten().then(response => {
      this.akteneinsichten.push(...response.data)
      if (this.akteneinsichten.length === 1) {
        this.$router.push('/akteneinsicht/'+ this.akteneinsichten[0].id)
        this.isReady = true
        sessionStorage.setItem('aktenzeichenForPreview', this.akteneinsichten[0].aktenzeichen)
      }
    }).catch((error) => {
      alert(`Ihre Akteneinsicht konnte auf Grund eines Fehlers beim Datenabruf nicht geladen werden. 
Bitte probieren Sie es später noch einmal. 

Danke für Ihr Verständnis`)
      this.$router.push('/home')
    })
  }
})
</script>

<template>
  <div>
    <h2 class="list-of-records-title">Ihre Akteneinsichten
        <span v-if="isReady">:</span>
        <span v-else> werden geladen</span>
    </h2>

    <loading-bar v-if="!isReady" />

    <ul>
    <li v-for="(akteneinsicht, idx) in akteneinsichten" :key="'akteneinsichten'+ idx">
        <router-link :to="'/akteneinsicht/' + akteneinsicht.id">
            {{ akteneinsicht.aktenzeichen }}
        </router-link>
    </li>  
    </ul>

  </div>    
</template>
