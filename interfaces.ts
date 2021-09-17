export interface IUser {
  username: string;
  email: string;
  avatar: string;
  role: string;
  password: string
}

export interface IUserCreateService {
  username: string;
  email: string;
  avatar: Buffer;
  role: string;
}
