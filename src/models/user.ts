export interface IUser {
  name: string;
  email: string;
}

export interface UserUpdate extends IUser {
  password?: string;
}

export interface DBUser extends IUser {
  _id: string;
}
