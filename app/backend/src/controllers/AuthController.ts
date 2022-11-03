import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/AuthService';

export default class AuthController {
  private service: AuthService;

  constructor(service: AuthService) {
    this.service = service;
    this.login = this.login.bind(this);
    this.userValidate = this.userValidate.bind(this);
    this.create = this.create.bind(this);
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const token = await this.service.login(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      return next(error);
    }
  };

  public userValidate = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      const user = this.service.userValidate(authorization);
      return res.status(200).json({ role: user.data.role });
    } catch (error) {
      return next(error);
    }
  };

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password, role } = req.body;
      const token = await this.service.create({
        username, email, password, role,
      });

      return res.status(201).json({ token });
    } catch (error) {
      return next(error);
    }
  }
}
