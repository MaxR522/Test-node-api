import { Router } from 'express';

// Controllers
import Register from '../controllers/user_controller/auth/register';
import Login from '../controllers/user_controller/auth/login';
import Deconnexion from '../controllers/user_controller/auth/deconnexion';

// Middlewares
import userValidationFor from '../middlewares/validators/user_field_validator';
import checkValidationResult from '../middlewares/validators/check_field_validation';
import CheckUserDuplication from '../middlewares/user/check_user_duplication';
import checkLoginValidationResult from '../middlewares/validators/check_login_field_validation';
import verifyJWT from '../middlewares/authorization/verify_jwt';
import checkBlacklistToken from '../middlewares/authorization/check_blacklisted_token';

const routes = Router();

routes.post(
  '/register',
  userValidationFor('register'),
  checkValidationResult,
  CheckUserDuplication,
  Register,
);

routes.post(
  '/login',
  userValidationFor('login'),
  checkLoginValidationResult,
  Login,
);

routes.delete('/user/:token', verifyJWT, checkBlacklistToken, Deconnexion);

export default routes;
