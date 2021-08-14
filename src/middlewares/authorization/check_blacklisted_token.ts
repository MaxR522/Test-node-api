import { Request, Response, NextFunction } from 'express';
import BlacklistToken from '../../models/blacklist_token';
import IBlacklistToken from '../../interfaces/blacklist_token_interface';
import genericError from '../../utils/generic_error_handler';

const checkBlacklistToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.token;

  BlacklistToken.findOne({ token }, (error: any, token: IBlacklistToken) => {
    if (error) {
      return genericError(res, error);
    }

    if (token) {
      return res.status(401).json({
        error: true,
        message: "Votre token n'est plus valide, veillez le reinitialisez",
      });
    }

    if (!token) {
      next();
    }
  });
};

export default checkBlacklistToken;
