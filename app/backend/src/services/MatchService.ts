import MatchModel from '../database/models/match';
import TeamModel from '../database/models/team';
import { IMatch, IReqMatch } from '../interfaces/matchInterfaces';
import ErrorGenerate from '../utils/ErrorGenerate';

export default class MatchService {
  public list = async (): Promise<IMatch[]> => {
    const matches = await MatchModel.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  };

  public searchedList = async (query: string) => {
    const inProgress = query === 'true' ? 1 : 0;
    const searchedMatches = await MatchModel.findAll({
      where: { inProgress },
      include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return searchedMatches;
  };

  public create = async (newMatch: IReqMatch): Promise<IMatch> => {
    if (newMatch.awayTeam === newMatch.homeTeam) {
      throw new ErrorGenerate('It is not possible to create a match with two equal teams', 422);
    }
    await this.findTeamById(newMatch.awayTeam);
    await this.findTeamById(newMatch.homeTeam);
    const result = await MatchModel.create({ ...newMatch, inProgress: 1 });
    return result;
  };

  public updateProgress = async (id: number): Promise<void> => {
    await this.findMatchById(id);
    const inProgress = 0;
    await MatchModel.update({ inProgress }, {
      where: {
        id,
      },
    });
  };

  public updateGoals = async (id: number, hTGoals: number, aTGoals: number): Promise<void> => {
    await this.findMatchById(id);
    await MatchModel.update({ homeTeamGoals: hTGoals, awayTeamGoals: aTGoals }, {
      where: {
        id,
      },
    });
  };

  public findMatchById = async (id: number): Promise<IMatch> => {
    const foundMatch = await MatchModel.findOne({ where: { id } });
    if (!foundMatch) throw new ErrorGenerate('Not Found', 404);
    return foundMatch;
  };

  public findTeamById = async (id: number): Promise<void> => {
    const teamExists = await TeamModel.findOne({ where: { id } });
    if (!teamExists) throw new ErrorGenerate('There is no team with such id!', 404);
  };
}
