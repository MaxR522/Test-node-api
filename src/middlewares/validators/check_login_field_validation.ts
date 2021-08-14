import { validationResult } from 'express-validator';
import { Request, Response } from 'express';
import Logger from '../../loaders/winston';

const checkLoginValidationResult = (req: Request, res: Response, next: any) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    Logger.error('Wrong or missing params');

    return res.status(401).json({
      success: false,
      message: 'email/password est manquant',
      errors: errors.array(),
    });
  }

  return next();
};

export default checkLoginValidationResult;
