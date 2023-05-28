import _ from 'lodash';
import { type DiaryType, type UserInfoType } from '../types';

export default class StorageApi {
  getMany (key: string): DiaryType[] | UserInfoType[] {
    const item = localStorage.getItem(key);

    if (_.isNull(item)) {
      return [];
    }

    return JSON.parse(item);
  };

  setMany (key: string, data: DiaryType[] | UserInfoType[] = []): void {
    const jsonString = JSON.stringify(data);
    localStorage.setItem(key, jsonString);
  };

  getSingle (key: string): string | null {
    return localStorage.getItem(key);
  };

  setSingle (key: string, value: string): void {
    localStorage.setItem(key, value);
  };

  delete (key: string): void {
    localStorage.removeItem(key);
  };
}
