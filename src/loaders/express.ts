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

app.use('/', express.static('public'));

// load router
app.use(router);

/*****************************************************
 *
 *  Error handlers
 *
 *****************************************************/

// Return 404 when not found endpoint
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({
    error: true,
    message: `ressource ${req.originalUrl} n'existe pas`,
  });
});

// Handle syntax error on request
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (err instanceof SyntaxError) {
      return res.status(400).json({
        error: true,
        message: "Le body de la requete n'est pas une JSON valide",
      });
    }
  },
);

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
