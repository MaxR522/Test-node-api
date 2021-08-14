import { Router } from 'express';

// Controllers
import Register from '../controllers/user_controller/auth/register';

// Middlewares
import userValidationFor from '../middlewares/validators/user_field_validator';
import checkValidationResult from '../middlewares/validators/check_field_validation';
import CheckUserDuplication from '../middlewares/user/check_user_duplication';

const routes = Router();

routes.post(
  '/register',
  userValidationFor('register'),
  checkValidationResult,
  CheckUserDuplication,
  Register,
);

routes.post('/login');

export default routes;
