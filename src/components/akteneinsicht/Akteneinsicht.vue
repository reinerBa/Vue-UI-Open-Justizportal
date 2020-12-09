<template>
<h2>Aktendaten</h2>
<div v-if="akteneinsicht">
  <table>
    <tr>
      <td>Aktenzeichen:</td>
      <td>{{ akteneinsicht.aktenzeichen }}</td>
    </tr>
    <tr>
      <td>Kurzrubrum:</td>
      <td>{{ akteneinsicht.kurzrubrum }}</td>
    </tr>
    <tr>
      <td>Ablauf der Bereitstellung:</td>
      <td>{{ dateFilter(akteneinsicht.ablauf) }}</td>
    </tr>
    <tr v-if="akteneinsicht.datei && !akteneinsicht.nurVorschau" >
      <td>Gesamtakte:</td>
      <td>
        <jp-datei-info @download="download(akteneinsicht.datei)" :datei="akteneinsicht.datei"/>
      </td>
    </tr>
  </table>
</div>

<h2>Dokumente</h2>
<table :hidden="hasFullscreen" class="mdl-data-table mdl-js-data-table jp-table-dokumente">
  <thead>
    <tr>
      <th>Nr.</th>
      <th>Datum</th>
      <th>Art</th>
      <th>Beschreibung</th>
      <th></th>
    </tr>
  </thead>
  <tbody v-for="(detail, idx) of details" :key="'dokumente' + idx">
    <tr>
      <td>{{ detail.nummer }}</td>
      <td>{{ dateFilter(detail.datum) }}</td>
      <td>{{ detail.art }}</td>
      <td>{{ detail.beschreibung }}</td>
      <td>
        <jp-datei-info
          @download="download(detail.datei)"
          @showPdfSource="openPreview(detail.datei)"
          v-if="detail.datei"
          :datei="detail.datei"
          :downloadRestricted = "akteneinsicht.nurVorschau"
        />
      </td>
    </tr>
  </tbody>
</table>

<jp-pdf-modal :singlePdf="singlePreview" 
  :downloadRestricted="akteneinsicht && akteneinsicht.nurVorschau"
  @closePdfId="closePreview($event)"
/>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { Akteneinsicht, AppConfig, Datei, Detail, Preview } from "../../ressources/model"
import { dateFilter } from '../../filters'
import { AbstractAkteneinsichtService } from "../../services/Contracts"
import { AkteneinsichtService } from "../../services"

export default defineComponent({
  name: 'Akteneinsicht',
  beforeRouteEnter (to, from, next) {
    if (true) { // todo: wenn authInfo korrekt und nicht expired
      next()
    } else {
      next({path: '/login'})
    }
  },
  props :{
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      akteneinsicht: null as Akteneinsicht,
      details: new Array<Detail>(),         
      openPreviews: new Array<Preview>(),   
      singlePreview: null as Preview,
      akteneinsichtService: null as AbstractAkteneinsichtService
    }
  },
  computed: {
    hasFullscreen(){
      return Boolean(this.singlePreview)
      // Nur notwendig wenn pdf Liste sichtbar sein soll
      // const openPdf = this.openPreviews.filter(e => e.open).pop()
      // return !!openPdf
    }
  },
  methods: {
    dateFilter (date: string) {
      return dateFilter(date)
    },
    download(datei: Datei) {
      if(!this.akteneinsicht.nurVorschau)
        this.downloadService.download(datei);
    },

    openPreview(pdf: Datei) {
      const includedPdf = this.openPreviews.find((element: Preview) => element.id === pdf.id)
      this.singlePreview = new Preview(pdf)
    
    // Nur notwendig wenn pdf Liste sichtbar sein soll
    /* this.openPreviews.forEach(e => e.open = false)
      if(!!includedPdf){
        includedPdf.open = true
      }else{
        const newInclude = new Preview(pdf)
        this.openPreviews.push(newInclude)
      } */
    },

    closePreview(id: string) {
      this.singlePreview = null
      // Nur notwendig wenn pdf Liste sichtbar sein soll
      const idx = this.openPreviews.findIndex((element: Preview) => element.id === id)
      this.openPreviews.splice(idx, 1)
    }
  },
  async mounted(){
    this.akteneinsichtService = new AkteneinsichtService(null as AppConfig, this.$http)
    let result = await this.akteneinsichtService.getAkteneinsicht(this.id)
    
    this.akteneinsicht = result
    //todo: change state  title: this.akteneinsicht.aktenzeichen

    let detailResult = await this.akteneinsichtService.getDetails(this.akteneinsicht)
    this.details.push(...detailResult)
    this.details.sort((d1: Detail, d2: Detail) => (d1.nummer < d2.nummer) ? -1 : 1)
  }
})
</script>

<style lang="stylus">
.jp-table-dokumente
    margin-bottom 3em

</style>