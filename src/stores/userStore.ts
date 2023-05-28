import { observable, action, makeObservable } from 'mobx';
import { getUserInfoFromLocalStorage, setUserInfoToLocalStorage } from '../utils';
import { type UserInfoType } from '../types';

export class UserStore {
  constructor () {
    makeObservable(this, {
      userInfo: observable,
      setUserInfo: action,
      clearUserInfo: action
    });
  }

  userInfo: UserInfoType | null = getUserInfoFromLocalStorage();

  setUserInfo = (userInfo: UserInfoType): void => {
    this.userInfo = userInfo;
    setUserInfoToLocalStorage(userInfo);
  };

  clearUserInfo = (): void => {
    this.userInfo = null;
    setUserInfoToLocalStorage(null);
  };
}

const userStore = new UserStore();
export default userStore;
