import { Request, Response } from 'express';
import User from '../../models/user';
import genericError from '../../utils/generic_error_handler';
import IUser from '../../interfaces/user_interface';
import * as bcrypt from 'bcrypt';

const UpdatePassword = (req: Request, res: Response) => {
  // req.userData store the decoded data (payload) from VerifyJWT method
  const userId = req.userData.sub;

  const { currentPassword, newPassword } = req.body;

  User.findOne({ _id: userId }, (error: any, user: IUser) => {
    if (error) {
      return genericError(res, error);
    }

    // If user not found
    if (!user) {
      return res.status(404).json({
        error: true,
        message: `Utilisateur avec ID: ${userId} n'existe pas`,
      });
    }

    // Check if current password is valid before setting new password
    if (user) {
      bcrypt.compare(
        currentPassword,
        user.password,
        (error: any, isMatch: boolean) => {
          if (error) {
            return genericError(res, error);
          }

          if (!isMatch) {
            return res.status(401).json({
              error: true,
              message: 'votre password est incorrecte',
            });
          }

          // If current password valid, set the user password into the new password provided
          if (isMatch) {
            user.password = newPassword;

            user.save((error: any) => {
              return res.status(200).json({
                error: false,
                message: 'Votre password a ete modifiee succes',
              });
            });
          }
        },
      );
    }
  });
};

export default UpdatePassword;
