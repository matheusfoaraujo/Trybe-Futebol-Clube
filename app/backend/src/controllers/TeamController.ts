import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class AuthController {
  private service: TeamService;

  constructor(service: TeamService) {
    this.service = service;
    this.list = this.list.bind(this);
    this.findById = this.findById.bind(this);
  }

  public list = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await this.service.list();
      return res.status(200).json(teams);
    } catch (error) {
      return next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.service.findById(Number(id));

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };
}
