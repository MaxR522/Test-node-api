import { Request, Response } from 'express';
import User from '../../../models/user';
import Logger from '../../../loaders/winston';
import genericError from '../../../utils/generic_error_handler';
import * as jwt from 'jsonwebtoken';
import config from '../../../config';
import generateRefreshToken from '../../../utils/generate_refresh_token';
import * as bcrypt from 'bcrypt';
import IUser from '../../../interfaces/user_interface';

const Login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Search inside database the user by his email
  User.findOne({ email }, (error: any, user: IUser) => {
    if (error) {
      return genericError(res, error);
    }

    // Throw an error if user not found
    if (!user) {
      return res.status(404).json({
        error: true,
        message: `Utilisateur avec email: ${email} n'existe pas`,
      });
    }

    // Check the validity of the password
    if (user) {
      bcrypt.compare(
        password,
        user.password,
        async (error: any, isMatch: boolean) => {
          if (error) {
            return genericError(res, error);
          }

          if (!isMatch) {
            return res.status(401).json({
              error: true,
              message: 'votre email ou password est errone',
            });
          }

          // If password valid, generate Tokens and throw display it to the user
          // payload = user's info store inside JWT

          if (isMatch) {
            const payload = {
              sub: user._id,
              email: user.email,
            };
            try {
              const accessToken = await jwt.sign(
                payload,
                config.accessTokenSecret,
                {
                  expiresIn: config.accessTokenExpiry,
                },
              );

              const refreshToken = await generateRefreshToken(
                user._id,
                payload,
                config.refreshTokenSecret,
                config.refreshTokenExpiry,
              );

              Logger.info(`Tokens generated on Register`);

              return res.status(200).json({
                error: false,
                message: "L'utilisateur a ete authentifie succes",
                tokens: {
                  token: accessToken,
                  'refresh-token': refreshToken,
                  createdAt: new Date(Date.now()),
                },
              });
            } catch (error) {
              return genericError(res, error);
            }
          }
        },
      );
    }
  });
};

export default Login;
