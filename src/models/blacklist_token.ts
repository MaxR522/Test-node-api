import * as mongoose from 'mongoose';
import IBlacklistToken from '../interfaces/blacklist_token_interface';

// To store revoked token

const BlacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const BlacklistToken = mongoose.model<IBlacklistToken>(
  'BlacklistToken',
  BlacklistTokenSchema,
);
export default BlacklistToken;
