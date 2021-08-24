import { Request, Response } from 'express';
import { User } from '@prisma/client';
import { foundUserWithValidation } from './services';
import { createToken } from '../utilities/authgenerator';

export const loginUser = async (req: Request, res: Response) => {
  // user details
  const userDetails: User = req.body;

  try {
    // Check if credentials are valid
    const loggedUser = await foundUserWithValidation(userDetails);

    // Create user passport/token
    const token = createToken({
      id: loggedUser.id,
      username: loggedUser.username,
    });
    res.cookie('token', token, { httpOnly: true });
    // result
    res.json({
      user: {
        msg: `Hello ${loggedUser.username}! You are now logged in`,
        username: loggedUser.username,
      },
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export async function logOutUser(req: Request, res: Response) {
  res.clearCookie('token');
  res.json({ msg: `Sad to see you go! You have now logged out.`, data: null });
}
