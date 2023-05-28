export interface RegisterCredentialsType {
  name: string;
  email: string;
  password: string
}

export interface LoginCredentialsType {
  email: string;
  password: string
}

export interface NewDiaryType {
  title: string;
  description: string
}

export interface DiaryType extends NewDiaryType {
  id: string;
  owner: string;
  created_date: string;
  updated_date: string
}

export interface UserInfoType {
  id: string;
  email: string;
  name: string;
  password?: string;
  created_date: string;
  updated_date: string
}

export type ButtonColorType = 'success' | 'error' | 'info' | 'warning';

export type TypographyVariantType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p1' | 'p2' | 'p3';

export type TypographyTextAlignType = 'center' | 'left' | 'right';
