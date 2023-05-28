import { v4 as uuidv4 } from 'uuid';
import { getCurrentDate } from './utils';
import { type RegisterCredentialsType, type NewDiaryType } from '../types';
import StorageApi from './storageApi';

class Entity {
  public id: string;
  public created_date: string;
  public updated_date: string;
  constructor () {
    this.id = uuidv4();
    const currentDate = getCurrentDate();
    this.created_date = currentDate;
    this.updated_date = currentDate;
  }
}

export class User extends Entity {
  public name: string;
  public email: string;
  public password: string;
  constructor (data: RegisterCredentialsType) {
    super();

    const { name, email, password } = data;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export class Diary extends Entity {
  public title: string;
  public description: string;
  public owner: string;
  constructor (data: NewDiaryType) {
    super();

    const { title, description } = data;
    this.title = title;
    this.description = description;
    const storageApi = new StorageApi();
    this.owner = storageApi.getSingle('API_CURRENT_USER_ID') ?? '';
  }
}
