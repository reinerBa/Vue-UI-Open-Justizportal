<script lang="ts" setup></script>
<script lang="ts">
// SPDX-FileCopyrightText: © 2019 Oberverwaltungsgericht Rheinland-Pfalz <poststelle@ovg.jm.rlp.de>, Reiner Bamberger <4329883+reinerBa@users.noreply.github.com>
// SPDX-License-Identifier: EUPL-1.2
import { defineComponent } from "@vue/runtime-core";


export default defineComponent({
    props: ['url']
})
// https://github.com/intbot/ng2-pdfjs-viewer/blob/master/src/ng2-pdfjs-viewer.component.ts
</script>
<template>
    <iframe title="pdfjs-viewer" :src="'pdfViewer/simpleviewer.html#'+url" ref=iframe width="100%" height="100%"></iframe>
</template>