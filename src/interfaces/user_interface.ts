import { Document } from 'mongoose';

interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  gender: string;

  // login attempt limit
  attemptLogin: number;

  // Password reset
  passwordResetToken: string;
  allowPasswordReset: boolean;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export default IUser;
