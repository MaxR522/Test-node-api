import { Request, Response } from 'express';
import User from '../../models/user';
import genericError from '../../utils/generic_error_handler';

const GetAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).select('firstname lastname email gender');

    return res.status(200).json({
      error: false,
      users,
    });
  } catch (error) {
    genericError(res, error);
  }
};

export default GetAllUsers;
