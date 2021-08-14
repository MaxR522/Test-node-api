import * as mongoose from 'mongoose';
import config from '../config';
import Logger from './winston';

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
