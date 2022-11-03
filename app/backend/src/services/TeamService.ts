import TeamModel from '../database/models/team';
import { ITeam } from '../interfaces/teamInterfaces';
import ErrorGenerate from '../utils/ErrorGenerate';

export default class AuthService {
  public list = async (): Promise<ITeam[]> => {
    const allTeams = await TeamModel.findAll();
    return allTeams;
  };

  public findById = async (bodyId: number): Promise<ITeam> => {
    const result = await TeamModel.findOne({ where: { id: bodyId } });
    if (!result) throw new ErrorGenerate('Not Found', 404);
    return result;
  };
}
