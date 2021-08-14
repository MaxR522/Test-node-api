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

const routes = Router();

routes.get('/user/:token', verifyJWT, GetOne);

routes.put(
  '/user/:token',
  verifyJWT,
  userValidationFor('update'),
  checkValidationResult,
  UpdateUser,
);

routes.put(
  '/user/password/:token',
  verifyJWT,
  userValidationFor('pwd_change'),
  checkValidationResult,
  UpdatePassword,
);

routes.get('/users/:token', verifyJWT, GetAllUsers);

export default routes;
