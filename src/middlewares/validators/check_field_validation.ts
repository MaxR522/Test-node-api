import { validationResult } from 'express-validator';
import { Request, Response } from 'express';
import Logger from '../../loaders/winston';

const checkValidationResult = (req: Request, res: Response, next: any) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // To check if some params is blank
    const isBlank = errors
      .array()
      .some(
        (element: any) =>
          element.msg.split(' ')[element.msg.split(' ').length - 1] === 'blank',
      );

    Logger.error('Wrong or missing params');
    if (isBlank) {
      return res.status(401).json({
        error: true,
        message: "L'un ou plusieur donnees obligatoire sont manquantes",
        errors: errors.array(),
      });
    }
    return res.status(401).json({
      error: true,
      message: "L'un ou plusieur donnees obligatoire ne sont pas conformes",
      errors: errors.array(),
    });
  }

  return next();
};

export default checkValidationResult;
