import { Request, Response } from 'express';
import { User } from '@prisma/client';
import { foundUserWithValidation } from './services';

export const loginUser = async (req: Request, res: Response) => {
  // user details
  const userDetails: User = req.body;

  try {
    // Check if credentials are valid
    const loggedUser = await foundUserWithValidation(userDetails);

    // result
    res.json({ user: { id: loggedUser.id, username: loggedUser.username } });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
