import { observable, action, makeObservable } from 'mobx';
import { type DiaryType } from '../types';
import { type Diary } from '../mockServer/entities';

export class DiaryStore {
  constructor () {
    makeObservable(this, {
      diary: observable,
      diaries: observable,
      setDiaries: action,
      setDiary: action,
      appendDiary: action,
      deleteDiary: action,
      updateDiary: action
    });
  }

  diary: DiaryType | null = null;

  diaries: DiaryType[] = [];

  setDiaries = (diaries: DiaryType[]): void => {
    this.diaries = diaries;
  };

  setDiary = (diary: DiaryType | null): void => {
    this.diary = diary;
  };

  appendDiary = (diary: DiaryType): void => {
    this.diaries.push(diary);
  };

  deleteDiary = (diaryId: string): void => {
    this.diaries = this.diaries.filter(d => d.id !== diaryId);
  };

  updateDiary = (diary: Diary): void => {
    this.diary = diary;
  };
}

const diaryStore = new DiaryStore();
export default diaryStore;
