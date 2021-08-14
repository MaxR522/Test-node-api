import * as express from 'express';
import * as cors from 'cors';
import config from '../config';
import * as helmet from 'helmet';
import morganMiddleware from './morgan';

const app = express();

/*****************************************************
 *
 *  Middlewares
 *
 *****************************************************/

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cross-origin
app.use(cors(config.corsOption));

// middleware for log http request
app.use(morganMiddleware);

// security
app.use(helmet());

export default app;
