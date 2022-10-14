<template>
  <div id="viewerContainer" ref="container">
    <div id="viewer" class="pdfViewer"></div>
  </div>
</template>

<script>
// SPDX-FileCopyrightText: © 2019 Oberverwaltungsgericht Rheinland-Pfalz <poststelle@ovg.jm.rlp.de>, Reiner Bamberger <4329883+reinerBa@users.noreply.github.com>
// SPDX-License-Identifier: EUPL-1.2
import 'pdfjs-dist/web/pdf_viewer.css'
import { defineComponent } from "@vue/runtime-core";


/* (async function () {
  const pdfDocument = await loadingTask.promise;
  // Document loaded, specifying document for the viewer and
  // the (optional) linkService.
  pdfViewer.setDocument(pdfDocument);

  pdfLinkService.setDocument(pdfDocument, null);
})(); */

export default defineComponent({
    props:['pdfsource'],
    async mounted(){

if (!pdfjsLib.getDocument || !pdfjsViewer.PDFViewer) {
  // eslint-disable-next-line no-alert
  alert("Please build the pdfjs-dist library using\n  `gulp dist-install`");
}

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc =  "/build/pdf.worker.min.js";

// Some PDFs need external cmaps.
const CMAP_URL = "/cmaps/";
const CMAP_PACKED = true;

const DEFAULT_URL = "/web/compressed.tracemonkey-pldi-09.pdf";
// To test the AcroForm and/or scripting functionality, try e.g. this file:
// "../../test/pdfs/160F-2019.pdf"

const ENABLE_XFA = true;
const SEARCH_FOR = ""; // try "Mozilla";
const SANDBOX_BUNDLE_SRC = "/build/pdf.sandbox.js";
var container = this.$refs.container;
//onst container = document.getElementById("viewerContainer");
const eventBus = new pdfjsViewer.EventBus();

// (Optionally) enable hyperlinks within PDF files.
const pdfLinkService = new pdfjsViewer.PDFLinkService({
  eventBus,
});

// (Optionally) enable find controller.
const pdfFindController = new pdfjsViewer.PDFFindController({
  eventBus,
  linkService: pdfLinkService,
});

// (Optionally) enable scripting support.
const pdfScriptingManager = new pdfjsViewer.PDFScriptingManager({
  eventBus,
  sandboxBundleSrc: SANDBOX_BUNDLE_SRC,
});

const pdfViewer = new pdfjsViewer.PDFViewer({
  container,
  eventBus,
  linkService: pdfLinkService,
  findController: pdfFindController,
  scriptingManager: pdfScriptingManager,
  enableScripting: true, // Only necessary in PDF.js version 2.10.377 and below.
});
pdfLinkService.setViewer(pdfViewer);
pdfScriptingManager.setViewer(pdfViewer);

eventBus.on("pagesinit", function () {
  // We can use pdfViewer now, e.g. let's change default scale.
  pdfViewer.currentScaleValue = "page-width";

  // We can try searching for things.
  if (SEARCH_FOR) {
    if (!pdfFindController._onFind) {
      pdfFindController.executeCommand("find", { query: SEARCH_FOR });
    } else {
      eventBus.dispatch("find", { type: "", query: SEARCH_FOR });
    }
  }
});

// Loading document.
const loadingTask = pdfjsLib.getDocument({
  url: DEFAULT_URL,
  cMapUrl: CMAP_URL,
  cMapPacked: CMAP_PACKED,
  enableXfa: ENABLE_XFA,
});
  const pdfDocument = await loadingTask.promise;
  // Document loaded, specifying document for the viewer and
  // the (optional) linkService.
  pdfViewer.setDocument(pdfDocument);

  pdfLinkService.setDocument(pdfDocument, null);
    }
})

</script>

  <style>
    body {
      background-color: #808080;
      margin: 0;
      padding: 0;
    }
    #viewerContainer {
      overflow: auto;
      position: absolute;
      width: 100%;
      height: 100%;
    }
  </style>