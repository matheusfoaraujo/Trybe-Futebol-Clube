import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  private service: MatchService;

  constructor(service: MatchService) {
    this.service = service;
    this.list = this.list.bind(this);
    this.create = this.create.bind(this);
    this.updateGoals = this.updateGoals.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
  }

  public list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { inProgress } = req.query;
      console.log(inProgress);
      if (inProgress) {
        const searchedMatches = await this.service.searchedList(inProgress as string);
        return res.status(200).json(searchedMatches);
      }
      const matches = await this.service.list();
      return res.status(200).json(matches);
    } catch (error) {
      return next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newMatchBody = {
        homeTeam: req.body.homeTeam,
        awayTeam: req.body.awayTeam,
        homeTeamGoals: req.body.homeTeamGoals,
        awayTeamGoals: req.body.awayTeamGoals,
      };
      const newMatch = await this.service.create(newMatchBody);

      return res.status(201).json(newMatch);
    } catch (error) {
      return next(error);
    }
  };

  public updateProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.service.updateProgress(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      return next(error);
    }
  };

  public updateGoals = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      await this.service.updateGoals(Number(id), homeTeamGoals, awayTeamGoals);
      return res.status(200).json({ message: 'Winner Updated' });
    } catch (error) {
      return next(error);
    }
  };
}
