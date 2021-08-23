import dbClient from '../../utilities/database';
import { User } from '.prisma/client';
import { hash } from 'bcrypt';

const create = async (newUser: User) => {
  // get the user input plaintext password
  const userPlainTextPassword = newUser.password;

  // Hashing it using bcrypt - return a promise
  const hashedPassword = await hash(userPlainTextPassword, 10);

  // save the newly hashed password
  const savedUser = await dbClient.user.create({
    data: { ...newUser, password: hashedPassword },
  });

  return savedUser;
};

const user = {
  ...dbClient.user,
  create,
};

export default user;
