import { NextFunction, Request, Response } from 'express';
import LeaderBService from '../services/LeaderBService';

export default class LeaderBController {
  private service: LeaderBService;

  constructor(service: LeaderBService) {
    this.service = service;
    this.homeLeaderBoard = this.homeLeaderBoard.bind(this);
    this.awayLeaderBoard = this.awayLeaderBoard.bind(this);
    this.leaderBoard = this.leaderBoard.bind(this);
  }

  public homeLeaderBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.homeLeaderBoard();
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };

  public awayLeaderBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.awayLeaderBoard();
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };

  public leaderBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.leaderBoard();
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };
}
