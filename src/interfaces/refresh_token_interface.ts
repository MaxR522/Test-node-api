import { Document } from 'mongoose';

interface IRefreshToken extends Document {
  userId: string;
  token: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export default IRefreshToken;
