/* import MatchModel from '../database/models/match';
import TeamModel from '../database/models/team';
import { IMatchResults } from '../interfaces/leaderBInterfaces';
import { IMatch, IReqMatch } from '../interfaces/matchInterfaces';
import ErrorGenerate from '../utils/ErrorGenerate';

export default class LeaderBService {
  public filterResults = async (): Promise<IMatchResults> => {
    const result = await this.searchedList();
    const homeWinners: Array<string | undefined> = [];
    const awayWinners: Array<string | undefined> = [];
    const awayDraws: Array<string | undefined> = [];
    const homeDraws: Array<string | undefined> = [];

    result.forEach((el) => {
      if (el.homeTeamGoals > el.awayTeamGoals) {
        homeWinners.push(el.teamHome?.teamName);
      }
      if (el.homeTeamGoals < el.awayTeamGoals) {
        homeWinners.push(el.teamAway?.teamName);
      }
      if (el.homeTeamGoals === el.awayTeamGoals) {
        homeDraws.push(el.teamAway?.teamName, el.teamHome?.teamName);
        awayDraws.push(el.teamAway?.teamName, el.teamHome?.teamName);
      }
    });
    return { homeWinners, awayWinners, awayDraws, homeDraws };
  };

  public searchedList = async (): Promise<IMatch[]> => {
    const inProgress = 1;
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

  private findMatchById = async (id: number): Promise<IMatch> => {
    const foundMatch = await MatchModel.findOne({ where: { id } });
    if (!foundMatch) throw new ErrorGenerate('Not Found', 404);
    return foundMatch;
  };

  private findTeamById = async (id: number): Promise<void> => {
    const teamExists = await TeamModel.findOne({ where: { id } });
    if (!teamExists) throw new ErrorGenerate('There is no team with such id!', 404);
  };
}
 */
