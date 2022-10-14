<script lang="ts">
// SPDX-FileCopyrightText: © 2019 Oberverwaltungsgericht Rheinland-Pfalz <poststelle@ovg.jm.rlp.de>, Reiner Bamberger <4329883+reinerBa@users.noreply.github.com>
// SPDX-License-Identifier: EUPL-1.2
import { defineComponent, inject } from 'vue'
import { AktenService, AktenServiceKey } from './../../libs/services/AktenService'
import { AxiosResponse } from 'axios'
import moment from 'moment'
import { Preview } from '../../libs/models/preview'
import { AuthStore, AuthStoreKey } from '../../store/authStore'
import { DtoAkteneinsicht, DtoDatei } from './../../libs/models/api'
import { injectStrict } from './../../libs/tools'
import FileInfo from './FileInfo.vue'
import DocumentsTable from './DocumentsTable.vue'
import PDFModal from './PDFModal.vue'

export default defineComponent({
  setup(){
    const aktenService: AktenService = injectStrict<AktenService>(AktenServiceKey)
    const authStore: AuthStore = injectStrict<AuthStore>(AuthStoreKey)
    return {aktenService, authStore}
  },
  components: {PDFModal, DocumentsTable, FileInfo},
  props: {
      id: {type: String, required: true}
  },
  data() {
    return {
      isReady: false as boolean,
      akteneinsicht: null as DtoAkteneinsicht,
      singlePreview: null as Preview,
      aktenzeichenForPreview: '' as string
    }
  },
  beforeRouteEnter(to, from, next){
    if(!AuthStore.IsLoggedIn())
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
    openPreview(pdf: DtoDatei) {
      this.singlePreview = new Preview(pdf)
    },
    closePreview(id: string) {
      this.singlePreview = null
    },
    async getFullAkteneinsicht() {
      try{
        let response: AxiosResponse<DtoAkteneinsicht> = await this.aktenService.GetAkteneinsicht(this.id)
        this.akteneinsicht = response.data

        this.isReady = true
      } catch(error) {
        alert(`Ihre Akteneinsicht [] konnte auf Grund eines Fehlers beim Datenabruf nicht geladen werden. 
Bitte probieren Sie es später noch einmal. 

Danke für Ihr Verständnis`)
        this.$router.push("/home")
      }
    }

  }
})
</script>

<template>
  <h2>Aktendaten <span v-if="!akteneinsicht">zu Akte [{{aktenzeichenForPreview}}] werden geladen</span></h2> 

  <loading-bar v-if="!isReady" />
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

  <PDFModal v-if="singlePreview" :PDF2display="singlePreview" 
    :downloadRestricted="akteneinsicht && !!akteneinsicht.nurVorschau" 
    @close-preview="singlePreview = null" />

  <!-- for test cases only -->
  <i v-if="isReady" id="akteneinsichtRequestDone" style="display:none;"></i>
</template>

