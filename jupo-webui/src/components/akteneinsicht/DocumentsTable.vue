<script lang="ts">
import { defineComponent, ref } from 'vue'
import { inject, PropType } from '@vue/runtime-core'
import { AktenService, AktenServiceKey } from './../../libs/services/AktenService'
import { AxiosResponse } from 'axios'
import moment from 'moment'

function sortDetails(d1: WebApi.DtoDetail, d2: WebApi.DtoDetail): number {
  if(d1.nummer < d2.nummer) {
    return -1
  } else {
    return 1
  }
}

export default defineComponent({
  props: {
    akteneinsicht: {type: Object as PropType<WebApi.DtoAkteneinsicht>, required: true},
    singlePreview: {type: Boolean, required: true}
  },
  emits: ['preview'],
  data() {
    return {
      details: [] as Array<WebApi.DtoDetail>,
      isReady: false
    }
  },
  async mounted() {
      await this.getDetails()
  },
  methods: {
    transformDate(date: string): string {
      return moment(date).format('DD.MM.yyyy') 
    },
    async getDetails( ) {
        try { 
          let response: AxiosResponse<Array<WebApi.DtoDetail>> = await this.aktenService.GetDetails(this.akteneinsicht)
            let details = response.data
            this.details.push(...details.sort(sortDetails))
            this.isReady = true
        } catch(error) {
          alert(`Die einzelnen Datien zu Ihrer Akteneinsicht [${this.aktenzeichenForPreview}] konnten auf Grund eines Fehlers beim Datenabruf nicht geladen werden. 
Bitte laden Sie die gesamte Akte herunter oder probieren Sie es später noch einmal. 
        
Danke für Ihr Verständnis`)      
      }
    }
  }
})
</script>

<script lang="ts" setup>
  import FileInfo from './FileInfo.vue'
  const aktenService: AktenService = inject(AktenServiceKey) as AktenService
</script>

<template>
    <h2>Dokumente</h2>
    <loading-bar v-if="!isReady" />
    <table v-else v-show="!singlePreview" class="mdl-data-table mdl-js-data-table jp-table-dokumente">
        <thead>
        <tr>
            <th>Nr.</th>
            <th>Datum</th>
            <th>Art</th>
            <th>Beschreibung</th>
            <th></th>
        </tr>
        </thead>
        <tbody v-for="(detail, idx) in details" :key="'records' + idx">
        <tr class="record-file-row" :class="{'preview-record-file-row' : detail.datei.mimeType == 'application/pdf'}">
            <td class="record-file-enumeration">{{ detail.nummer }}</td>
            <td class="record-file-date">{{ transformDate( detail.datum ) }}</td>
            <td class="record-file-type">{{ detail.art }}</td>
            <td class="record-file-description">{{ detail.beschreibung }}</td>
            <td>
            <FileInfo
                @preview="$emit('preview', detail.datei)"
                :datei="detail.datei"
                :downloadRestricted="akteneinsicht.nurVorschau"/>
            </td>
        </tr>
        </tbody>
    </table>

    <!-- for test cases only -->
    <i v-if="details.length" id="detailsRequestDone" style="display:none;"></i>
</template>

<style lang="stylus" scoped>
.jp-table-dokumente
    margin-bottom 3em
</style>