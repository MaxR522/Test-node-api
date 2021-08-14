import { Request, Response, NextFunction } from 'express';
import genericError from '../../utils/generic_error_handler';
import * as jwt from 'jsonwebtoken';
import config from '../../config';

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.params.token;

  jwt.verify(token, config.accessTokenSecret, (error: any, decoded: any) => {
    if (error) {
      return genericError(res, error);
    }

    if (decoded) {
      req.userData = decoded;
      next();
    }
  });
};

export default verifyJWT;
