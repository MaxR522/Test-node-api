import * as jwt from 'jsonwebtoken';
import RefreshToken from '../models/refresh_token';
import IRefreshToken from '../interfaces/refresh_token_interface';

/**
 *
 * @param _userId ID of the user who generate the refresh token
 * @param payload User's info stored inside the token
 * @param secret Secret Key for generate & validate the JWT token
 * @param timeLimit Expiry time of the token
 */

// Create the refresh token and store it inside the DB to keep a trace of it
const generateRefreshToken = (
  _userId: string,
  payload: any,
  secret: string,
  timeLimit: string,
) => {
  RefreshToken.findOne(
    { userId: _userId },
    (error: any, refreshToken: IRefreshToken) => {
      if (error) {
        throw new error('Erreur lors de la creation du refresh token');
      }

      // Generate JWT token
      const _token = jwt.sign(payload, secret, { expiresIn: timeLimit });

      // If there is no JWT stored for this user, create a new one
      if (!refreshToken) {
        const newRefreshToken = new RefreshToken({
          userId: _userId,
          token: _token,
        });

        newRefreshToken.save((error: any) => {
          if (error) {
            throw new error('Erreur lors de la creation du refresh token');
          }
        });
      }

      // If there is a JWT stored for this user, update it
      if (refreshToken) {
        refreshToken.token = _token;

        refreshToken.save((error: any) => {
          if (error) {
            throw new error('Erreur lors de la creation du refresh token');
          }
        });
      }

      return _token;
    },
  );
};

export default generateRefreshToken;
