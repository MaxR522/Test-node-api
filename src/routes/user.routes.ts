import { Router } from 'express';

// Controllers
import GetOne from '../controllers/user_controller/get_one';
import UpdateUser from '../controllers/user_controller/update_user';
import UpdatePassword from '../controllers/user_controller/update_password';
import GetAllUsers from '../controllers/user_controller/get_all';

// Middlewares
import verifyJWT from '../middlewares/authorization/verify_jwt';
import userValidationFor from '../middlewares/validators/user_field_validator';
import checkValidationResult from '../middlewares/validators/check_field_validation';
import checkBlacklistToken from '../middlewares/authorization/check_blacklisted_token';

const routes = Router();

routes.get('/user/:token', verifyJWT, checkBlacklistToken, GetOne);

routes.put(
  '/user/:token',
  verifyJWT,
  checkBlacklistToken,
  userValidationFor('update'),
  checkValidationResult,
  UpdateUser,
);

routes.put(
  '/user/password/:token',
  verifyJWT,
  checkBlacklistToken,
  userValidationFor('pwd_change'),
  checkValidationResult,
  UpdatePassword,
);

routes.get('/users/:token', verifyJWT, checkBlacklistToken, GetAllUsers);

export default routes;
