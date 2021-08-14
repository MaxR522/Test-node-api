import { Request, Response } from 'express';
import User from '../../../models/user';
import Logger from '../../../loaders/winston';
import genericError from '../../../utils/generic_error_handler';
import * as jwt from 'jsonwebtoken';
import config from '../../../config';
import generateRefreshToken from '../../../utils/generate_refresh_token';

const Register = (req: Request, res: Response) => {
  const { firstname, lastname, email, password, date_naissance, sexe } =
    req.body;

  const newUser = new User({
    firstname,
    lastname,
    email,
    password,
    dateOfBirth: date_naissance,
    gender: sexe,
  });

  newUser.save(async (error: any) => {
    if (error) {
      genericError(res, error);
    }

    // If there is no error, generate Tokens (access and refresh tokens)
    // payload = user's info store inside JWT
    const payload = {
      sub: newUser._id,
      email: newUser.email,
    };

    try {
      const accessToken = await jwt.sign(payload, config.accessTokenSecret, {
        expiresIn: config.accessTokenExpiry,
      });

      const refreshToken = await generateRefreshToken(
        newUser._id,
        payload,
        config.refreshTokenSecret,
        config.refreshTokenExpiry,
      );

      Logger.info(`Tokens generated on Register`);

      return res.status(201).json({
        error: false,
        message: "L'utilisateur a bien ete cree avec succes",
        tokens: {
          token: accessToken,
          'refresh-token': refreshToken,
          createdAt: new Date(Date.now()),
        },
      });
    } catch (error) {
      genericError(res, error);
    }
  });
};

export default Register;
