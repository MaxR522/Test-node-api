import { Router } from 'express';

// Controllers
import GetOne from '../controllers/user_controller/get_one';
import UpdateUser from '../controllers/user_controller/update_user';

// Middlewares
import verifyJWT from '../middlewares/authorization/verify_jwt';

const routes = Router();

routes.get('/user/:token', verifyJWT, GetOne);

routes.put('/user/:token', verifyJWT, UpdateUser);

export default routes;
