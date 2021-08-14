import { Request, Response, NextFunction } from 'express';
import User from '../../models/user';
import IUser from '../../interfaces/user_interface';
import genericError from '../../utils/generic_error_handler';

/**
 * Verification if the address email is already used
 */

const CheckUserDuplication = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const _email = req.body.email;

  User.findOne({ email: _email }, (error: any, user: IUser) => {
    if (error) {
      return genericError(res, error);
    }

    if (user) {
      return res.status(409).json({
        error: true,
        message: `Une compte ayant email: ${_email} existe deja`,
      });
    }

    if (!user) {
      next();
    }
  });
};

export default CheckUserDuplication;
