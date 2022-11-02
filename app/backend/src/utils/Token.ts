import jwt, { SignOptions } from 'jsonwebtoken';
import IUserFull from '../interfaces/index';
import ErrorGenerate from './ErrorGenerate';

export type UserType = Omit<IUserFull, 'password'>;

class Token {
  private static options: SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  public static encode(data: UserType) {
    return jwt.sign({ data }, 'jwt_secret', Token.options);
  }

  public static decode(token: string) {
    try {
      const data = jwt.verify(token, 'jwt_secret');
      return data;
    } catch {
      throw new ErrorGenerate('Incorrect email or password', 401);
    }
  }
}

export default Token;
