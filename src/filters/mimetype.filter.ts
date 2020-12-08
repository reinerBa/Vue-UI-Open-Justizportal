
export function mimetypeFilter (value: any) : string {
  if (typeof (value)) {
    var result = FILETYPES.filter(ft => {
      return ft.mime === value;
    });

    if(result.length > 0) {
      return result[0].name;
    }
  }
  return UNKNOWN_FILE;;
}


type filetype = {
  mime: string;
  name: string;
};

const FILETYPES: filetype[] = [
  {
    mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    name: 'Word-Dokument'
  }, {
    mime: 'application/pdf',
    name: 'Pdf-Dokument'
  }, {
    mime: 'application/msword',
    name: 'Word-Dokument'
  }, {
    mime: 'application/x-zip-compressed',
    name: 'Zip-Datei'
  }
];
const UNKNOWN_FILE = "Dokument";

