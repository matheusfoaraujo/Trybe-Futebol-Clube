import { ILeaderBoard } from '../interfaces/leaderBInterfaces';
import { IMatch } from '../interfaces/matchInterfaces';
import { ITeam } from '../interfaces/teamInterfaces';
import MatchService from './MatchService';
import TeamService from './TeamService';

const teamService = new TeamService();
const matchService = new MatchService();
export default class LeaderBService {
  private state: ILeaderBoard = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '',
  };

  public homeLeaderBoard = async () => {
    const teams = await teamService.list();
    const matches = await matchService.searchedList('false');
    const result = teams.map((team) => this.homeInput(team, matches));
    return this.sort(result);
  };

  private homeInput = (team: ITeam, matches: IMatch[]) => {
    const score = this.state;
    matches.forEach((match) => {
      if (match.homeTeam === team.id) {
        score.name = match.teamHome?.teamName as string;
        score.totalGames += 1;
        if (match.homeTeamGoals > match.awayTeamGoals) score.totalVictories += 1;
        if (match.homeTeamGoals === match.awayTeamGoals) score.totalDraws += 1;
        score.totalPoints = (score.totalVictories * 3) + score.totalDraws;
        if (match.homeTeamGoals < match.awayTeamGoals) score.totalLosses += 1;
        score.goalsFavor += match.homeTeamGoals;
        score.goalsOwn += match.awayTeamGoals;
        score.goalsBalance = score.goalsFavor - score.goalsOwn;
        score.efficiency = ((score.totalPoints / (score.totalGames * 3)) * 100).toFixed(2);
      }
      this.clearState();
    });
    return score;
  };

  public awayLeaderBoard = async () => {
    const teams = await teamService.list();
    const matches = await matchService.searchedList('false');
    const result = teams.map((team) => this.awayInput(team, matches));
    return this.sort(result);
  };

  private awayInput = (team: ITeam, matches: IMatch[]) => {
    const score = this.state;
    matches.forEach((match) => {
      if (match.awayTeam === team.id) {
        score.name = match.teamAway?.teamName as string;
        score.totalGames += 1;
        if (match.homeTeamGoals < match.awayTeamGoals) score.totalVictories += 1;
        if (match.homeTeamGoals === match.awayTeamGoals) score.totalDraws += 1;
        score.totalPoints = (score.totalVictories * 3) + score.totalDraws;
        if (match.homeTeamGoals > match.awayTeamGoals) score.totalLosses += 1;
        score.goalsFavor += match.awayTeamGoals;
        score.goalsOwn += match.homeTeamGoals;
        score.goalsBalance = score.goalsFavor - score.goalsOwn;
        score.efficiency = ((score.totalPoints / (score.totalGames * 3)) * 100).toFixed(2);
      }
      this.clearState();
    });
    return score;
  };

  public leaderBoard = async () => {
    const homelb = await this.homeLeaderBoard();
    const awaylb = await this.awayLeaderBoard();
    const merged = awaylb.map((lb) => this.lbInput(lb, homelb));
    return this.sort(merged);
  };

  private lbInput = (lb: ILeaderBoard, homelb: ILeaderBoard[]) => {
    const score = this.state;
    homelb.forEach((el) => {
      if (el.name === lb.name) {
        score.name = el.name;
        score.totalPoints = el.totalPoints + lb.totalPoints;
        score.totalGames = el.totalGames + lb.totalGames;
        score.totalVictories = el.totalVictories + lb.totalVictories;
        score.totalDraws = el.totalDraws + lb.totalDraws;
        score.totalLosses = el.totalLosses + lb.totalLosses;
        score.goalsFavor = el.goalsFavor + lb.goalsFavor;
        score.goalsOwn = el.goalsOwn + lb.goalsOwn;
        score.goalsBalance = score.goalsFavor - score.goalsOwn;
        score.efficiency = ((score.totalPoints / (score.totalGames * 3)) * 100).toFixed(2);
      }
      this.clearState();
    });
    return score;
  };

  private clearState = () => {
    this.state = {
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: '',
    };
  };

  private sort = (array: ILeaderBoard[]) => {
    array.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return array;
  };
}
