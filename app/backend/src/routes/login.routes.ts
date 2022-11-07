import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import validateBody from '../middlewares/bodyValidation';
import AuthService from '../services/AuthService';
import * as schemas from '../utils/schemas';

const router = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

router.post('/login', validateBody(schemas.loginSchema), authController.login);
router.get('/login/validate', authController.userValidate);
// router.post('/user', validateBody(schemas.createUserSchema), authController.create);

export default router;
