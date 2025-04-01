import { IUser } from './user';

export interface IComment {
  user: IUser;
  userId: string;
  bookId: string;
  content: string;
  likes: number;
}

export type CommentCreate = Omit<IComment, "user">;

export interface DBComment extends IComment {
  _id: string;
}
