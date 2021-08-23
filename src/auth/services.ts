import dbClient from '../utilities/database';

import { User } from '@prisma/client';

import { compare } from 'bcrypt';

export const foundUserWithValidation = async (userData: User) => {
  // looking for user in the database
  const foundUser = await dbClient.user.findUnique({
    where: { username: userData.username },
  });

  // Throw an error if uer not found
  if (!foundUser) throw new Error('Username/Password incorrect');

  // If user found chack compare the two passwords
  const isThePasswordvalid = await compare(
    userData.password,
    foundUser.password
  );

  // If passwords not the same throw error
  if (!isThePasswordvalid) throw new Error('Username/Password incorrect');

  return foundUser;
};
