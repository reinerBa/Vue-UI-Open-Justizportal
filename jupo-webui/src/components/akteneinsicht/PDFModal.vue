<script lang="ts" setup>
    var hasPdfsToDisplay: Boolean = false
    var downloadRestricted: Boolean = false
</script>

<template>
    <dialog v-if="hasPdfsToDisplay" open class="mdl-dialog">
        <div class="mdl-dialog__actions">
            <button id="close_modal_button" @click="closeModal()" type="button" class="mdl-button close">
                <i class="material-icons">close</i>
            </button>
        </div>

        <h4 id="pdfname_header" class="mdl-dialog__title">{{openPdfName}}</h4>

        <embed id="pdf_reader" v-if="!downloadRestricted" class="mdl-dialog__content" :src="openPdfSrc" type="application/pdf" width="100%" height="100%">
        <div v-if="downloadRestricted">
            <ng2-pdfjs-viewer v-if="downloadRestricted" id="readonly_reader" 
                :viewerFolder="pdfJsFolder" :pdfSrc="openUrl" 
                :download="false" :print="false" :openFile="false">
            </ng2-pdfjs-viewer>
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