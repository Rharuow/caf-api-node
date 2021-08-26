export interface IUser {
  username: string;
  email: string;
  avatar: string;
  role: string;
}

export interface IUserCreateService {
  username: string;
  email: string;
  avatar: Buffer;
  role: string;
}
