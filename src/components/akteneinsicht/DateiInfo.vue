<template>
<div class="jp-dateiinfo">
  <button v-if="datei.mimeType == 'application/pdf'" @click="showPreview()" class="mdl-button jp-dateiinfo__button">
    <i class="material-icons">visibility_alt</i>
  </button>
  <button v-if="!downloadRestricted" @click="doDownload()" class="mdl-button jp-dateiinfo__button">
    <i class="material-icons">save_alt</i>
  </button>
  <span class="jp-dateiinfo__typesize">({{ dateiMimeType }}, {{ dateiSize }})</span>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { Datei } from '../../ressources/model'
import {filesizeFilter, mimetypeFilter} from '../../filters'

export default defineComponent({
  name: 'DateiInfo',
  props: {
      datei: Datei,
      downloadRestricted: Boolean
  },
  emits: ['download', 'showPdfSource'],
  computed: {
      dateiMimeType (): string {
        return mimetypeFilter(this.datei.mimeType)
      },
      dateiSize (): string {
        return filesizeFilter(this.datei.size)
      }
  },
  methods: {
      showPreview(){
          this.$emit('show-pdf-source', this.datei)
      },
      doDownload(){
          if (!this.downloadRestricted) this.$emit('download')
      }
  }
})
</script>