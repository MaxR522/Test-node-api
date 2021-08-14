import { body, cookie, header } from 'express-validator';
// import Logger from '../config/winston';

const userValidationFor = (route: string) => {
  switch (route) {
    case 'register':
      return [
        body('firstname', 'firstname cannot be blank').isString(),
        body('firstname', 'firstname cannot be blank').notEmpty(),
        body('lastname', 'lastname cannot be blank').isString(),
        body('lastname', 'lastname cannot be blank').notEmpty(),
        body('email', 'email cannot be blank').notEmpty(),
        body('email', 'Invalid email').isEmail(),
        body('password', 'password cannot be blank').isString().notEmpty(),
        body('password', 'password is too short, at least 6 chars')
          .isString()
          .isLength({
            min: 6,
          }),
        body(
          'password',
          'password must contain digit, lower case and upper case letter',
        ).custom((value: string) => {
          const passwordRgxp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/;
          return passwordRgxp.test(value);
        }),
        body('dateOfBirth', 'dateOfBirth cannot be blank').notEmpty(),
        // Date in format YYYY-MM-DD
        body('dateOfBirth', 'Wrong format of date in DateOfBirth').isISO8601(),
        body('gender', 'gender cannot be blank').notEmpty(),
        body('gender', 'gender need to be male or female')
          .isString()
          .isIn(['male', 'female']),
      ];

    case 'login':
      return [
        body('email', 'email cannot be blank').notEmpty(),
        body('password', 'password cannot be blank').notEmpty(),
      ];

    default:
      return [];
  }
};

export default userValidationFor;
