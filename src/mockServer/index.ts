import _ from 'lodash';
import { Diary, User } from './entities';
import { getCurrentDate } from './utils';
import { foundSearchTerm } from '../utils';
import { type DiaryType, type LoginCredentialsType, type NewDiaryType, type RegisterCredentialsType, type UserInfoType } from '../types';
import StorageApi from './storageApi';

export default class MockServer {
  private readonly storageApi: StorageApi;
  constructor () {
    this.storageApi = new StorageApi();
  }

  private getCurrentUserId (): string | null {
    return this.storageApi.getSingle('API_CURRENT_USER_ID');
  };

  private getDiaries (): DiaryType[] {
    return this.storageApi.getMany('API_DIARIES') as DiaryType[];
  };

  private saveDiaries (diaries: DiaryType[]): void {
    this.storageApi.setMany('API_DIARIES', diaries);
  };

  private getUsers (): UserInfoType[] {
    return this.storageApi.getMany('API_USERS') as UserInfoType[];
  };

  private saveUsers (users: UserInfoType[]): void {
    this.storageApi.setMany('API_USERS', users);
  };

  async logIn (credentials: LoginCredentialsType): Promise<UserInfoType | any> {
    const users = this.getUsers();
    const existingUser = users.find(u => u.email === credentials.email && u.password === credentials.password);

    if (_.isNil(existingUser)) {
      return await Promise.reject(new Error('Invalid email or password'));
    }

    this.storageApi.setSingle('API_CURRENT_USER_ID', existingUser.id);

    return await Promise.resolve(_.omit(existingUser, ['password']));
  };

  async logOut (): Promise<{ success: boolean }> {
    this.storageApi.delete('API_CURRENT_USER_ID');

    return await Promise.resolve({ success: true });
  };

  async register (credentials: RegisterCredentialsType): Promise<{ success: boolean } | any> {
    const users = this.getUsers();
    const existingUser = users.find(u => u.email === credentials.email);

    if (!_.isNil(existingUser)) {
      return await Promise.reject(new Error(`User with email ${credentials.email} already exists.`));
    }

    const newUser = new User(credentials);
    users.push(newUser);
    this.saveUsers(users);

    return await Promise.resolve({ success: true });
  };

  async createDiary (data: NewDiaryType): Promise<NewDiaryType | any> {
    const newDiary = new Diary(data);
    const diaries = this.getDiaries();
    diaries.push(newDiary);
    this.saveDiaries(diaries);

    return await Promise.resolve(newDiary);
  };

  async updateDiary (data: DiaryType): Promise<NewDiaryType | any> {
    const diaries = this.getDiaries();
    const userId = this.getCurrentUserId();
    const foundIndex = diaries.findIndex(d => d.id === data.id && d.owner === userId);

    if (foundIndex === -1) {
      return await Promise.reject(new Error(`Diary with id ${data.id} not found.`));
    }

    diaries[foundIndex] = {
      ...diaries[foundIndex],
      ...data,
      updated_date: getCurrentDate()
    };
    this.saveDiaries(diaries);

    return await Promise.resolve(data);
  };

  async deleteDiary (diaryId: string): Promise<{ success: boolean } | any> {
    const diaries = this.getDiaries();
    const userId = this.getCurrentUserId();
    const foundIndex = diaries.findIndex(d => d.id === diaryId && d.owner === userId);

    if (foundIndex === -1) {
      return await Promise.reject(new Error(`Diary with id ${diaryId} not found.`));
    }

    diaries.splice(foundIndex, 1);
    this.saveDiaries(diaries);

    return await Promise.resolve({ success: true });
  };

  async getDiaryById (diaryId: string): Promise<DiaryType | any> {
    const diaries = this.getDiaries();
    const userId = this.getCurrentUserId();
    const foundDiary = diaries.find(d => d.id === diaryId && d.owner === userId);

    if (_.isNil(foundDiary)) {
      return await Promise.reject(new Error(`Diary with id ${diaryId} not found.`));
    }

    return await Promise.resolve(foundDiary);
  };

  async getUserDiaries (search: string = ''): Promise<DiaryType[]> {
    const diaries = this.getDiaries();
    const userId = this.getCurrentUserId();
    let ownDiaries = diaries.filter(d => d.owner === userId);

    if (!_.isEmpty(search)) {
      ownDiaries = ownDiaries.filter(d => foundSearchTerm(search, d.title) || foundSearchTerm(search, d.description));
    }

    return await Promise.resolve(ownDiaries);
  };
}
