/**
 * Load middlewares & Routes & DB connexion
 */

import * as mongoose from 'mongoose';
import * as express from 'express';
import * as cors from 'cors';
import config from '../config';
import * as helmet from 'helmet';
import morganMiddleware from './morgan';
import router from '../routes';
import Logger from './winston';

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

/*****************************************************
 *
 *  Routes
 *
 *****************************************************/

// load router
app.use(router);

/*****************************************************
 *
 *  DB connexion
 *
 *****************************************************/

// connection to mongoDB
mongoose.connect(
  config.mongoDBURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (error) => {
    if (error) {
      Logger.error(`${error} ❌`);
      throw error;
    } else {
      Logger.info(`Database :: mongodb connection @: ${config.mongoDBURI} ✅`);
    }
  },
);

export default app;
