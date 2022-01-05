<script lang="ts">
import { defineComponent } from 'vue'
import { inject, PropType } from '@vue/runtime-core'
import { GetMimetypeName } from '../../libs/services/MimetypeService'
import { GetFileSize } from '../../libs/services/FilesizeService'
import { DownloadService, DownloadServiceKey } from '../../libs/services/DownloadService'
import { injectStrict } from './../../libs/tools'
import { DtoAkteneinsicht, DtOStatistic, DtoDatei } from './../../libs/models/api'

export default defineComponent({
  inject: {
    downloadService: {from: (DownloadServiceKey as symbol)},
  },
  props:{
      datei: {type: Object as PropType<DtoDatei>, required: true},
      downloadRestricted: {type: Boolean, required: false, default: false}
  },
  emits: { 
      preview: (datei: DtoDatei) => {
        if (!datei?.id) {
            console.warn('Invalid preview event payload!')
            return false
        }
        return true
    }
  },
  computed: {
    isPDF(): boolean {
      return this.datei.mimeType == 'application/pdf'
    }
  },
  methods:{
    showPreview(): void {
        this.$emit('preview', this.datei)
    },
    downloadFile(): void {
      if(!this.downloadRestricted)
        this.downloadService.download(this.datei)
    },
    getMimeType(): string {
      return GetMimetypeName(this.datei.mimeType)
    },
    getSize(): string {
      return GetFileSize(this.datei.size)
    }
  }
})
</script>

<template>
    <div class="jp-dateiinfo">
    <button v-if="isPDF" @click="showPreview" 
        class="prewiew_file_button mdl-button jp-dateiinfo__button preview-button">
        <i class="material-icons">visibility_alt</i>
    </button>
    <button v-if="!downloadRestricted" @click="downloadFile" 
        class="download-button download_file_button mdl-button jp-dateiinfo__button">
        <i class="material-icons">save_alt</i>
    </button>
    <span class="file_info jp-dateiinfo__typesize">({{ getMimeType() }}, {{ getSize() }})</span>
    </div>    
</template>
