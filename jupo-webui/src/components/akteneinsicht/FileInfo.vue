<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Datei } from '../../../../src/ressources/model';

const Component = defineComponent({
  emits: {

  },
  methods:{
    showPreview(): void {
        this.showPdfSource.emit(this.datei)
    },
    doDownload(): void {
        if(!this.downloadRestricted)
        this.download.emit();
    }
  }
})
</script>

<script lang="ts" setup>
    var datei: Datei = ref(null)
    function filter(obj: String, key: any) {return obj[key]};
</script>

<template>
    <div class="jp-dateiinfo">
    <button v-if="datei.mimeType == 'application/pdf'" @click="showPreview()" 
        class="prewiew_file_button mdl-button jp-dateiinfo__button preview-button">
        <i class="material-icons">visibility_alt</i>
    </button>
    <button v-if="!downloadRestricted" @click="doDownload()" class="download-button download_file_button mdl-button jp-dateiinfo__button">
        <i class="material-icons">save_alt</i>
    </button>
    <span class="file_info jp-dateiinfo__typesize">({{ filter(datei.mimeType) }}, {{ filter(datei.size) }})</span>
    </div>    
</template>
