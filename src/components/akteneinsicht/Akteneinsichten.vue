<template>
  <div>
    <h2>Ihre Akteneinsichten:</h2>
  <ul>
    <li v-for="(akteneinsicht, idx) of akteneinsichten" :key="'akteneinsichten' + idx">
      <router-link to="'/akteneinsichten/' + akteneinsicht.id">
        {{ akteneinsicht.aktenzeichen }}
      </router-link>
    </li>  
  </ul>
  </div>
</template>

<script lang="ts">
import { AxiosInstance } from "axios"
import { defineComponent } from "vue"
import { Akteneinsicht, AppConfig } from "../../ressources/model"
import { AkteneinsichtService, AbstractAkteneinsichtService } from "../../services"

export default defineComponent({
  name: 'Elektronische Akteneinsicht',
  beforeRouteEnter (to, from, next) {
    if (true) { // todo: wenn authInfo korrekt und nicht expired
      next()
    } else {
      next({path: '/login'})
    }
  },
  data () {
    return {
      akteneinsichten: new Array<Akteneinsicht>(),
      aktenEinsichtService: null as AbstractAkteneinsichtService
    }
  },
  async mounted() {
    // todo: insert config
    this.aktenEinsichtService = new AkteneinsichtService(null as AppConfig, this.$http)    
    let result = await this.aktenEinsichtService.getAkteneinsichten()
    this.akteneinsichten.push(...result)

      //redirect if its just one
      if(this.akteneinsichten.length === 1) 
        this.router.navigate(['akteneinsichten//'+this.akteneinsichten[0].id])
  }
})
</script>