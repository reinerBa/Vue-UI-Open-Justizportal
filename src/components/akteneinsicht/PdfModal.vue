<template>
<dialog v-if="hasPdfsToDisplay" open class="mdl-dialog">
    <div class="mdl-dialog__actions">
        <button @click="closeModal()" type="button" class="mdl-button close">
          <i class="material-icons">close</i>
        </button>
    </div>

    <h4 class="mdl-dialog__title">{{openPdfName}}</h4>

    <embed v-if="!downloadRestricted" class="mdl-dialog__content" :src="openPdfSrc" type="application/pdf" width="100%" height="100%">
    <div v-if="downloadRestricted">
      <pdf-viewer :config="pdfViewerConfig" :pdf="openUrl"></pdf-viewer>
    </div>

</dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import PdfViewer from "vue-pdf-app"
import { Preview } from "../../ressources/model"

export default defineComponent({
  name: 'PdfModal',
  props: {
    singlePdf: Preview,
    downloadRestricted: Boolean
  },
  emits: ['closePdfId'],
  setup () {
    return {
      pdfViewerConfig: computed(() => pdfViewerConfig)
    }
  },
  components: {
    PdfViewer
  },
  data () {
    return {
      openPdfSrc: '',
      openUrl : ''
    }
  },
  computed: {
    openPdfId (): Number {
      if (this.hasPdfsToDisplay)
        return this.singlePdf.id
      return 0
    },
    hasPdfsToDisplay (): Boolean {
      return Boolean(this.singlePdf)
    },
    openPdfName (): String {
      if(!this.hasPdfsToDisplay) return ''
      return this.singlePdf.datei.dateiname
    }
  },
  methods: {
    removePreview (id: string) {
      this.$emit('closePdfId', id)
    },
    closeModal(){
      this.singlePdf.open = false
      this.$emit('closePdfId', this.openPdfId)
    }
  },
  watch: {
    singlePdf: {
      deep: true,
      handler(newValue) {
        if (this.hasPdfsToDisplay) {
          this.openUrl = this.downloadService.preview(this.singlePdf.datei, this.downloadRestricted /*authInfo obj*/)
          this.openPdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.openUrl)
        } else {
          this.openUrl =  ''
          this.openPdfSrc = ''
        }
      }
    },
  }
})

const pdfViewerConfig = {
  sidebar: {
    viewThumbnail: true,
    viewOutline: true,
    viewAttachments: true,
  },
  findbar: true,
  secondaryToolbar: {
    secondaryPresentationMode: true,
    secondaryOpenFile: false,
    secondaryPrint: false,
    secondaryDownload: false,
    secondaryViewBookmark: false,
    firstPage: true,
    lastPage: true,
    pageRotateCw: true,
    pageRotateCcw: true,
    cursorSelectTool: true,
    cursorHandTool: true,
    scrollVertical: true,
    scrollHorizontal: true,
    scrollWrapped: true,
    spreadNone: true,
    spreadOdd: true,
    spreadEven: true,
    documentProperties: true,
  },
  toolbar: {
    toolbarViewerLeft: {
      previous: true,
      next: true,
      pageNumber: true,
    },
    toolbarViewerRight: {
      presentationMode: true,
      openFile: false,
      print: false,
      download: false,
      viewBookmark: false,
      secondaryToolbarToggle: true,
    },
    toolbarViewerMiddle: {
      zoomOut: true,
      zoomIn: true,
      scaleSelectContatiner: true,
    },
  },
  viewerContextMenu: true,
  errorWrapper: true,
}
</script>

<style lang="stylus">
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