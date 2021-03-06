import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../../config';

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.params.token;

  jwt.verify(token, config.accessTokenSecret, (error: any, decoded: any) => {
    if (error) {
      return res.status(401).json({
        error: true,
        message: "le token envoye n'est pas conforme",
        errors: error,
      });
    }

    if (decoded) {
      req.userData = decoded;
      req.token = token;
      next();
    }
  });
};

export default verifyJWT;
