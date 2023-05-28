import moment from 'moment';

export function getCurrentDate (): string {
  return moment(new Date()).format('DD/MM/YYYY HH:mm');
}
