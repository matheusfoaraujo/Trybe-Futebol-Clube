export interface IUser {
  email: string,
  password: string
}

interface IUserFull extends IUser {
  id: number,
  username: string,
  role?: string,
}

export default IUserFull;
