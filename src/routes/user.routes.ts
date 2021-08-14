import { Router } from 'express';

// Controllers
import GetOne from '../controllers/user_controller/get_one';

// Middlewares
import verifyJWT from '../middlewares/authorization/verify_jwt';

const routes = Router();

routes.get('/user/:token', verifyJWT, GetOne);

export default routes;
