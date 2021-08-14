import { Request, Response } from 'express';
import User from '../../models/user';
import genericError from '../../utils/generic_error_handler';
import IUser from '../../interfaces/user_interface';

const GetOneUser = (req: Request, res: Response) => {
  const userData = req.userData;

  User.findOne({ _id: userData.sub }, (error: any, user: IUser) => {
    if (error) {
      return genericError(res, error);
    }

    if (!user) {
      return res.status(404).json({
        error: true,
        message: `user ID: ${userData.sub} n'existe pas`,
      });
    }

    if (user) {
      const userInfo = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        date_naissance: user.dateOfBirth,
        sexe: user.gender,
        createdAt: user.createdAt,
      };
      return res.status(200).json({
        error: false,
        user: userInfo,
      });
    }
  });
};

export default GetOneUser;
