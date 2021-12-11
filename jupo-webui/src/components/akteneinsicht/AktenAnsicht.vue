<script lang="ts">
import { defineComponent } from 'vue'
import { GetAkteneinsicht } from './../../libs/services/AktenService'
import router from '../../router'
import {Akteneinsicht} from '../../libs/models/akteneinsicht'
import { AxiosResponse } from 'axios'
import moment from 'moment'
import { Datei } from '../../libs/models/datei'
import { Preview } from '../../libs/models/preview'

export default defineComponent({
  props: {
      id: {type: String, required: true}
  },
  data() {
    return {
      isReady: false as boolean,
      akteneinsicht: null as Akteneinsicht,
      singlePreview: null as Preview,
      aktenzeichenForPreview: '' as string
    }
  },
  beforeRouteEnter(to, from, next){
    if(!useStore().isLoggedIn.value)
      next('/login')
    else 
      next()
  },
  async mounted(){
    this.aktenzeichenForPreview = sessionStorage.getItem('aktenzeichenForPreview')
    await this.getFullAkteneinsicht()
  },
  methods: {
    transformDate(date: string): string {
      return moment(date).format('DD.MM.yyyy') 
    },
    openPreview(pdf: Datei) {
      this.singlePreview = new Preview(pdf)
    },
    closePreview(id: string) {
      this.singlePreview = null
    },
    async getFullAkteneinsicht() {
      try{
        let response: AxiosResponse<Akteneinsicht> = await GetAkteneinsicht(this.id)
        this.akteneinsicht = response.data

        this.isReady = true
      } catch(error) {
        alert(`Ihre Akteneinsicht [] konnte auf Grund eines Fehlers beim Datenabruf nicht geladen werden. 
Bitte probieren Sie es später noch einmal. 

Danke für Ihr Verständnis`)
        router.push("/home")
      }
    },

  }
})
</script>

<script lang="ts" setup>
  import FileInfo from './FileInfo.vue'
  import DocumentsTable from './DocumentsTable.vue'
import { useStore } from '../../store/authStore'
</script>

<template>
    <h2>Aktendaten <span v-if="!akteneinsicht">zu Akte [{{aktenzeichenForPreview}}] werden geladen</span></h2> 
    <div v-if="!isReady" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>

    <div v-else id="gesamtakte_wrapper">
    <table>
        <tr>
        <td>Aktenzeichen:</td>
        <td id="record-view-reference">{{ akteneinsicht.aktenzeichen }}</td>
        </tr>
        <tr>
        <td>Kurzrubrum:</td>
        <td id="kurzrubrum-content">{{ akteneinsicht.kurzrubrum }}</td>
        </tr>
        <tr>
        <td>Ablauf der Bereitstellung:</td>
        <td id="record-end-of-view">{{ transformDate( akteneinsicht.ablauf ) }}</td>
        </tr>
        <tr v-if="akteneinsicht.datei && !akteneinsicht.nurVorschau" id="all-record-download-option">
        <td>Gesamtakte:</td>
        <td>
          <FileInfo @preview="openPreview" 
            :datei="akteneinsicht.datei" :downloadRestricted="akteneinsicht.nurVorschau"/>
        </td>
        </tr>
    </table>
    </div>

    <DocumentsTable v-if="isReady" @preview="openPreview" 
      :akteneinsicht="akteneinsicht" :singlePreview="!!singlePreview" />

  <!--  <jp-pdf-modal :singlePdf="singlePreview" :downloadRestricted="akteneinsicht && akteneinsicht.nurVorschau" @closePdfId="closePreview($event)"></jp-pdf-modal>
-->
    <!-- for test cases only -->
    <i v-if="isReady != null" id="akteneinsichtRequestDone" style="display:none;"></i>
</template>

