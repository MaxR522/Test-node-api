import * as mongoose from 'mongoose';
import IRefreshToken from '../interfaces/refresh_token_interface';

const RefreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
      unique: true,
    },
    token: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

const RefreshToken = mongoose.model<IRefreshToken>(
  'RefreshToken',
  RefreshTokenSchema,
);

export default RefreshToken;
