import * as mongoose from 'mongoose';
import IUser from '../interfaces/user_interface';
import * as bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema(
  {
    // User information
    firstname: {
      type: String,
      required: true,
      max: 255,
    },
    lastname: {
      type: String,
      required: true,
      max: 255,
    },
    email: {
      trim: true,
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },

    // Attempt on login (10 attempt max)
    attemptLogin: {
      type: Number,
      default: 0,
    },

    // Password reset
    passwordResetToken: {
      type: String,
      default: '',
    },
    allowPasswordReset: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Hash user's password before save
UserSchema.pre<IUser>('save', function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
