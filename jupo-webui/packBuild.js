let {version, name, license} = require( './package.json')
const JSZip = require('jszip')


console.log(`Version ${version}, licensed under ${license}`)
const jszip = new JSZip()

// https://github.com/ffflorian/jszip-cli/blob/main/src/BuildService.ts

jszip.file(zipPath, fileData, {
      createFolders: true,
      date: fileStat.mtime,
      // See https://github.com/Stuk/jszip/issues/550
      // dosPermissions: fileStat.mode,
      unixPermissions: fileStat.mode,
    })
	
	
zip.generateAsync({type:"blob"}).then(function(content) {
    // see FileSaver.js
    saveAs(content, "example.zip");
});

jszip.generateAsync(
      {
        compression: 'STORE',
        type: 'nodebuffer',
      },
      ({percent}) => {
        const diff = Math.floor(percent) - Math.floor(lastPercent);
        if (diff && !this.options.quiet) {
          this.progressBar.tick(diff);
          lastPercent = Math.floor(percent);
        }
      }
    ).then(function(content){
		fs.writeFile(`portal.${version}.zip`, content)
	})
