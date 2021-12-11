
const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
const thresh = 1000

export function GetFileSize(bytes: number): string {
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B'
    }

    let u = -1;
    do {
      bytes /= thresh;
      ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1)
    return bytes.toFixed(1) + ' ' + units[u]
}
