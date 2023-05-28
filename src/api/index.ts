import MockServer from '../mockServer';
import { type DiaryType, type LoginCredentialsType, type NewDiaryType, type RegisterCredentialsType } from '../types';

export default class Api {
  private readonly mockApi: MockServer;
  constructor () {
    this.mockApi = new MockServer();
  }

  async register (credentials: RegisterCredentialsType): Promise<unknown> {
    return await this.mockApi.register(credentials);
  };

  async logIn (credentials: LoginCredentialsType): Promise<unknown> {
    return await this.mockApi.logIn(credentials);
  };

  async logOut (): Promise<unknown> {
    return await this.mockApi.logOut();
  };

  async createDiary (data: NewDiaryType): Promise<DiaryType> {
    return await this.mockApi.createDiary(data);
  };

  async updateDiary (data: DiaryType): Promise<DiaryType> {
    return await this.mockApi.updateDiary(data);
  };

  async deleteDiary (diaryId: string): Promise<{ status: boolean }> {
    return await this.mockApi.deleteDiary(diaryId);
  };

  async getDiaries (search?: string): Promise<DiaryType[]> {
    return await this.mockApi.getUserDiaries(search);
  };

  async getDiaryById (diaryId: string): Promise<DiaryType> {
    return await this.mockApi.getDiaryById(diaryId);
  };
}
