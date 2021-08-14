import { Document } from 'mongoose';

interface IUser extends Document {
  firtname: string;
  lastname: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  gender: string;

  // Password reset
  passwordResetToken: string;
  allowPasswordReset: boolean;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export default IUser;
