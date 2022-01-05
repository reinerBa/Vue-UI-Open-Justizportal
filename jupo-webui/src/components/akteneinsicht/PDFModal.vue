<script lang="ts">
import { defineComponent, inject, PropType } from "@vue/runtime-core"
import { injectStrict } from './../../libs/tools'
import { Preview } from "../../libs/models/preview"
import { DownloadService, DownloadServiceKey } from "../../libs/services/DownloadService"

export default defineComponent({
  emits: ['close-preview'],
  inject: {downloadService: {from: DownloadServiceKey as symbol}},
  props: {
      downloadRestricted: {type: Boolean, required: true},
      PDF2display: {type: Object as PropType<Preview>}
  },
  data() {
    return {
      openPDFSrc: '',
      openUrl: '',
      pdfJsFolder: 'plugins/pdfjs'
    }
  },
  mounted(){
    if (this.hasPDFsToDisplay) {
      this.openUrl = this.downloadService.preview(this.PDF2display.datei, this.downloadRestricted)
      this.openPDFSrc = this.openUrl // this.sanitizer.bypassSecurityTrustResourceUrl(this.openUrl)
    } else {
      this.openUrl =  ''
      this.openPDFSrc = null
    }
  },
  computed: {
    openPdfId (): string {
        if (this.hasPDFsToDisplay)
          return this.PDF2display.id
        return ''
    },
    hasPDFsToDisplay(): boolean {
        return Boolean(this.PDF2display)
    },
    openPDFName(): string {
        if(!this.hasPDFsToDisplay) return ''
        return this.PDF2display.datei.dateiname
    }
  },
  methods:{
    closeModal() {
      this.$emit('close-preview')
    }
  }
})
</script>

<template>
    <dialog v-if="hasPDFsToDisplay" open class="mdl-dialog">
        <div class="mdl-dialog__actions">
            <button id="close_modal_button" @click="closeModal" type="button" class="mdl-button close">
                <i class="material-icons">close</i>
            </button>
        </div>

        <h4 id="pdfname_header" class="mdl-dialog__title">{{openPDFName}}</h4>

        <embed id="pdf_reader" v-if="!downloadRestricted" class="mdl-dialog__content" :src="openPDFSrc" type="application/pdf" width="100%" height="100%">
        <div v-if="downloadRestricted">
          <!--  <ng2-pdfjs-viewer v-if="downloadRestricted" id="readonly_reader" 
                :viewerFolder="pdfJsFolder" :pdfSrc="openUrl" 
                :download="false" :print="false" :openFile="false">
            </ng2-pdfjs-viewer>-->
        </div>

    </dialog>    
</template>

<style lang="stylus" scoped>
dialog.mdl-dialog
  width 96%
  position absolute
  top 0
  left 0
  max-height calc(100vh - 7em)
  min-height 15em

.jp-pdf-preview-tray
  display flex
  flex-direction row-reverse
  margin-left 1em
  position absolute
  right 1em
  bottom 1em

.pdf-preview-minimized
  border 1px green
  background-color cornflowerblue
  padding .5em
  color white
  font-weight bold
  cursor default
  margin-right 1em

  i
    margin-left .1em

embed.mdl-dialog__content
  padding 0
  max-height calc(89% - 3em)
  min-height calc(82vh - 3em)

ng2-pdfjs-viewer
  height calc(100vh - 9em)
  display block

  ::ng-deep iframe
    max-height calc(100vh - 10.5em)
	  
.mdl-dialog__title
  font-size: 2em;
  padding-top: 0.25em;

.mdl-dialog__actions
    float right

</style>