<script lang="ts">
import { defineComponent, ref } from 'vue'

const Component = defineComponent({
  emits: {},
  methods:{
    download(datei: Datei) {
        if(!this.akteneinsicht.nurVorschau)
        this.downloadService.download(datei);
    },
    openPreview(pdf: Datei) {
            this.singlePreview = new Preview(pdf)
    },
    closePreview(id: string) {
        this.singlePreview = null
        // Nur notwendig wenn pdf Liste sichtbar sein soll
        const idx = this.openPreviews.findIndex((element: Preview) => element.id === id)
        this.openPreviews.splice(idx, 1)
    },
    transformDate(date: String): String {
        return date; // todo
    }
  },
  computed: {
    hasFullscreen(): Boolean {
        return Boolean(this.singlePreview)
    }
  }
})
</script>

<script lang="ts" setup>
import { Akteneinsicht, Datei, Detail, Preview } from "../../../../src/ressources/model"

  var akteneinsicht: Akteneinsicht = null
  var aktenzeichenForPreview: String = ''
  var details: Detail[] = []
  var openPreviews: Preview[] =[]
  var singlePreview: Preview
</script>

<template>
    <h2>Aktendaten <span v-if="!akteneinsicht">zu Akte [{{aktenzeichenForPreview}}] werden geladen</span></h2> 
    <div v-if="!akteneinsicht" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>

    <div v-if="akteneinsicht" id="gesamtakte_wrapper">
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
            <jp-datei-info @download="download(akteneinsicht.datei)" :datei="akteneinsicht.datei"></jp-datei-info>
        </td>
        </tr>
    </table>
    </div>

    <div v-if="akteneinsicht">
    <h2>Dokumente</h2>
    <table v-if="akteneinsicht" :hidden="hasFullscreen" class="mdl-data-table mdl-js-data-table jp-table-dokumente">
        <thead>
        <tr>
            <th>Nr.</th>
            <th>Datum</th>
            <th>Art</th>
            <th>Beschreibung</th>
            <th></th>
        </tr>
        </thead>
        <tbody v-if="(detail, idx) in details" :key="'records' + idx">
        <tr class="record-file-row" :class="{'preview-record-file-row' : detail.datei.mimeType == 'application/pdf'}">
            <td class="record-file-enumeration">{{ detail.nummer }}</td>
            <td class="record-file-date">{{ transformDate( detail.datum ) }}</td>
            <td class="record-file-type">{{ detail.art }}</td>
            <td class="record-file-description">{{ detail.beschreibung }}</td>
            <td>
            <jp-datei-info
                @download="download(detail.datei)"
                @showPdfSource="openPreview(detail.datei)"
                v-if="detail.datei"
                :datei="detail.datei"
                :downloadRestricted="akteneinsicht.nurVorschau"></jp-datei-info>
            </td>
        </tr>
        </tbody>
    </table>
    </div>

    <jp-pdf-modal :singlePdf="singlePreview" :downloadRestricted="akteneinsicht && akteneinsicht.nurVorschau" @closePdfId="closePreview($event)"></jp-pdf-modal>

    <!-- for test cases only -->
    <i v-if="details.length" id="detailsRequestDone" style="display:none;"></i>
    <i v-if="akteneinsicht != null" id="akteneinsichtRequestDone" style="display:none;"></i>
</template>

<style lang="stylus" scoped>
.jp-table-dokumente
    margin-bottom 3em
</style>