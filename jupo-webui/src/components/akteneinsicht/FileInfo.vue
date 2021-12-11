<script lang="ts">
import { defineComponent, ref } from 'vue'
import { PropType } from '@vue/runtime-core'
import { Datei } from '../../../../src/ressources/model'
import { GetMimetypeName } from '../../libs/services/MimetypeService'
import { GetFileSize } from '../../libs/services/FilesizeService'

export default defineComponent({
  props:{
      datei: {type: Object as PropType<Datei>, required: true},
      downloadRestricted: {type: Boolean, required: false, default: false}
  },
  emits: { 
      preview: (datei: Datei) => {
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
      if(!this.downloadRestricted) {
          // todo // downloadService.download(this.datei)
      }
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
