/**
 * DRY all 400 generic error
 */

import { Response } from 'express';
import Logger from '../loaders/winston';

/**
 *
 * @param res Express Response
 * @param error Error Object
 */

const genericError = (res: Response, error: any = {}) => {
  Logger.error(error);
  return res.status(400).json({
    error: true,
    message: 'Something went wrong !',
    errors: error,
  });
};

export default genericError;
