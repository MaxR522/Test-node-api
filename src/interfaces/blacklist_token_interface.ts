import { Document } from 'mongoose';

interface IBlacklistToken extends Document {
  token: string;

  // Timestamps
  createdAt: Date;
}

export default IBlacklistToken;
