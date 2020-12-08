<template>
<div class="jp-tray-preview-tray"> <!-- window list -->
    <table v-for="(pdfWindow, idx) in trayObjects" :key="'trayscroll'+idx" class="jp-tray-minimized">
        <tr>
            <td :title="pdfWindow.datei.dateiname">{{pdfWindow.datei.dateiname}}</td>
            <td @click="$emit('maximize-pdf', pdfWindow)"><i class="material-icons">launch</i></td>
            <td @click="$emit('remove-preview', pdfWindow.id)"><i class="material-icons">cancel</i></td>
        </tr>
    </table>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { Preview } from "../../ressources/model"

//  @Output() removePreview = new EventEmitter<string>()
//  @Output() maximizePdf = new EventEmitter<Preview>()
export default defineComponent({
  name: 'TrayScroll',
  props: {
    trayObjects: {
      type: Preview,
      required: true
    }
  },
  emits: ['maximize-pdf', 'remove-preview'],
  data () {
    return {
      leftHidden: [],
      rightHidden: []
    }
  },
  computed: {
    hasLeftHidden (): boolean {
      return this.leftHidden.length > 0
    },
    hasRightHidden (): boolean {
      return this.rightHidden.length > 0
    }
  }
})
</script>

<style lang="stylus">
.jp-tray-preview-tray
    display flex
    flex-direction row-reverse
    margin-left 1em
    position absolute
    right 1em
    bottom 1em


.jp-tray-minimized
    border 1px green
    background-color cornflowerblue
    padding .5em
    color white
    font-weight bold
    cursor default
    margin-right 1em

    i
        margin-left .1em
</style>