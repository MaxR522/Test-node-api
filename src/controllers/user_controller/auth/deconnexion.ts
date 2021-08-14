import { Request, Response } from 'express';
import Logger from '../../../loaders/winston';
import genericError from '../../../utils/generic_error_handler';
import BlacklistToken from '../../../models/blacklist_token';

/**
 * Deconnexion flow:
 * Revoke access-token by adding it inside BlacklistToken
 *
 * When performing action, check if the access-token is already revoked
 */

const Deconnexion = (req: Request, res: Response) => {
  const token = req.token;

  const addBlacklistToken = new BlacklistToken({
    token,
  });

  addBlacklistToken.save((error: any) => {
    if (error) {
      return genericError(res, error);
    }

    Logger.info('Access-token blacklisted');

    return res.status(200).json({
      error: false,
      message: "L'utilisateur a ete deconnectee succes",
    });
  });
};

export default Deconnexion;
