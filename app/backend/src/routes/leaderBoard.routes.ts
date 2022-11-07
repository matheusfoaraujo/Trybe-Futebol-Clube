import { Router } from 'express';
import LeaderBController from '../controllers/LeaderBController';
import LeaderBService from '../services/LeaderBService';

const router = Router();
const leaderBService = new LeaderBService();
const leaderBController = new LeaderBController(leaderBService);

router.get('/leaderboard/home', leaderBController.homeLeaderBoard);
router.get('/leaderboard/away', leaderBController.awayLeaderBoard);
router.get('/leaderboard', leaderBController.leaderBoard);
export default router;
