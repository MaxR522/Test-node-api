import { Request, Response } from 'express';
import User from '../../models/user';
import genericError from '../../utils/generic_error_handler';
import IUser from '../../interfaces/user_interface';

const UpdateUser = (req: Request, res: Response) => {
  // req.userData store the decoded data (payload) from VerifyJWT method
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

  // Find the User that need update
  User.findOne({ _id: userData.sub }, (error: any, user: IUser) => {
    if (error) {
      return genericError(res, error);
    }

    // If user not found, throw an error
    if (!user) {
      return res.status(404).json({
        error: true,
        message: `Utilisateur avec ID: ${userData.sub} n'existe pas`,
      });
    }

    if (user) {
      // Update the user property value if the data is provided in the body and keep the old value if data not provided
      user.firstname = firstname ? firstname : user.firstname;
      user.lastname = lastname ? lastname : user.lastname;
      user.dateOfBirth = date_naissance ? date_naissance : user.dateOfBirth;
      user.gender = sexe ? sexe : user.gender;

      user.save((error: any) => {
        if (error) {
          return genericError(res, error);
        }

        // If everything OK, return success
        return res.status(200).json({
          error: false,
          message: "L'utilisateur a ete modifies succes",
        });
      });
    }
  });
};

export default UpdateUser;
