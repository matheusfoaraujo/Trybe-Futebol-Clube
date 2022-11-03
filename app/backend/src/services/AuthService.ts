import * as bcryptjs from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import UserModel from '../database/models/user';
import IUserFull from '../interfaces/userInterfaces';
import ErrorGenerate from '../utils/ErrorGenerate';
import Token from '../utils/Token';

export default class AuthService {
  public login = async (bodyEmail: string, bodyPassword: string): Promise<string> => {
    const user = await UserModel.findOne({ where: { email: bodyEmail } });
    if (!user) {
      throw new ErrorGenerate('Incorrect email or password', 401);
    }

    const checkPassword = await bcryptjs.compare(bodyPassword, user.password);

    if (!checkPassword) {
      throw new ErrorGenerate('Incorrect email or password', 401);
    }

    const { id, username, email, role } = user;
    const payload = { id, username, email, role };
    return Token.encode(payload);
  };

  public userValidate = (token: string | undefined) => {
    if (!token) {
      throw new ErrorGenerate('A token is required', 401);
    }
    const payload = Token.decode(token);
    return payload as JwtPayload;
  };

  public create = async (user: Omit<IUserFull, 'id'>) => {
    const userExist = await UserModel.findOne({ where: { email: user.email } });

    if (userExist) throw new ErrorGenerate('User already registered', 409);

    const newUser = await UserModel.create(user);

    const { id, username, email, role } = newUser;
    const payload = { id, username, email, role };
    return Token.encode(payload);
  };
}
