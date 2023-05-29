import moment from 'moment';

export function getCurrentDate (): string {
  return moment(new Date()).format('DD/MM/YYYY HH:mm');
}

export function findSearchTerm (searchTerm: string, textToSearch: string): boolean {
  const regex = new RegExp(searchTerm, 'i');
  return regex.test(textToSearch);
}
