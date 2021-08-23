import express from 'express';
import { Request, Response } from 'express';
import usersRouter from './resources/users/router';
import authRouter from './auth/router';
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// App initialisation
const app = express();

// App MiddleWare
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

// Routes

// login
app.use(authRouter);
app.use('/users', usersRouter);

app.all('*', (req: Request, res: Response) => {
  res.json({ msg: 'I am up and runnig!' });
});

module.exports = app;
