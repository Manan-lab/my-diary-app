import userStore, { type UserStore } from './userStore';
import diaryStore, { type DiaryStore } from './diaryStore';

export interface RootStore {
  userStore: UserStore;
  diaryStore: DiaryStore
}

const rootStore: RootStore = {
  userStore,
  diaryStore
};

export default rootStore;
