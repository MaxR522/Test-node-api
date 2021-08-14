import { Request, Response } from 'express';
import User from '../../models/user';
import genericError from '../../utils/generic_error_handler';
import IUser from '../../interfaces/user_interface';

const UpdateUser = (req: Request, res: Response) => {
  const userData = req.userData;

  const { firstname, lastname, date_naissance, sexe } = req.body;

  // Check if the user didn't send any data
  const isBodyEmpty = Object.keys(req.body).length === 0;
  if (isBodyEmpty) {
    return res.status(401).json({
      error: true,
      message: "aucune donnee n'a ete envoyee",
    });
  }

  User.findOne({ _id: userData.sub }, (error: any, user: IUser) => {
    if (error) {
      return genericError(res, error);
    }

    if (!user) {
      return res.status(404).json({
        error: true,
        message: `Utilisateur avec ID: ${userData.sub} n'existe pas`,
      });
    }

    if (user) {
      user.firstname = firstname ? firstname : user.firstname;
      user.lastname = lastname ? lastname : user.lastname;
      user.dateOfBirth = date_naissance ? date_naissance : user.dateOfBirth;
      user.gender = sexe ? sexe : user.gender;

      user.save((error: any) => {
        if (error) {
          return genericError(res, error);
        }

        return res.status(200).json({
          error: false,
          message: "L'utilisateur a ete modifies succes",
        });
      });
    }
  });
};

export default UpdateUser;
