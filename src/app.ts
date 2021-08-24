import express from 'express';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import usersRouter from './resources/users/router';
import authRouter from './auth/router';
const cookieParser = require('cookie-parser');
const logger = require('morgan');
import loginAuth from './middlewares/loginAuth';

declare global {
  namespace Express {
    interface Request {
      currentUser: string | JwtPayload;
    }
  }
}

const cors = require('cors');

// App initialisation
const app = express();

// App MiddleWare
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));

// Routes

// login
app.use(authRouter);

app.use(loginAuth);

app.use('/users', usersRouter);

app.all('*', (req: Request, res: Response) => {
  res.json({ msg: 'I am up and runnig!' });
});

module.exports = app;
