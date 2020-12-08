import moment from 'moment'

export function dateFilter (value: any) : string {
  moment.locale('de');
  return moment(value).format('DD.MM.YYYY')
}
