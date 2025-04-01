import { IUser } from './user';

export interface IBook {
  user: IUser;
  userId: string;
  title: string;
  summary: string;
  tags: string;
  commentRestriction: string;
  ageRestriction: string;
  agreement: boolean;
  isFavorite?: boolean;
  createdAt: Date;
}

export type BookCreate = Omit<IBook, "user" | "createdAt">;
export type BookUpdate = Omit<BookCreate, "agreement" | "createdAt">;

export type DBBook = IBook & {
  _id: string;
};
