import { isNil } from 'lodash';
import { type UserInfoType } from './types';

export function getUserInfoFromLocalStorage (): UserInfoType | null {
  const userInfo = localStorage.getItem('userInfo');

  if (!isNil(userInfo)) {
    return JSON.parse(userInfo);
  }

  return null;
}

export function setUserInfoToLocalStorage (userInfo: UserInfoType | null): void {
  if (isNil(userInfo)) {
    localStorage.removeItem('userInfo');

    return;
  }

  localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

export function isValidEmail (value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(value);
}
