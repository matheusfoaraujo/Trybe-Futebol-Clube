import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import tokenValidator from '../middlewares/tokenValidation';
import MatchService from '../services/MatchService';

const router = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

router.get('/matches', matchController.list);
router.post('/matches', tokenValidator, matchController.create);
router.patch('/matches/:id/finish', matchController.updateProgress);
router.patch('/matches/:id', matchController.updateGoals);

export default router;
