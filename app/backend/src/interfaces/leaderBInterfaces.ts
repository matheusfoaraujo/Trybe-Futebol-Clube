export interface IMatchResults {
  homeWinners: Array<string | undefined>;
  awayWinners: Array<string | undefined>;
  awayDraws: Array<string | undefined>;
  homeDraws: Array<string | undefined>;
}

export interface ILeaderBoard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string
}
