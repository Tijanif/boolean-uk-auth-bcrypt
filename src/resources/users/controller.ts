import { Request, Response } from 'express';
import user from './services';

export const getAllUsers = async (req: Request, res: Response) => {
  const allUsers = await user.findMany();

  res.json({ data: allUsers });
};

export const createAUser = async (req: Request, res: Response) => {
  const newUser = req.body;

  // New user created with a hashed password
  const createdUser = await user.create(newUser);

  res.json({ data: createdUser });
};
