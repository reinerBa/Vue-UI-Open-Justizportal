<script lang="ts" setup></script>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    props: [],
    mounted(){

    }
})
// https://github.com/intbot/ng2-pdfjs-viewer/blob/master/src/ng2-pdfjs-viewer.component.ts
</script>
<template>
    <iframe title="pdfjs-viewer" :hidden="externalWindow || (!externalWindow && !pdfSrc)" ref=iframe width="100%" height="100%"></iframe>
</template>