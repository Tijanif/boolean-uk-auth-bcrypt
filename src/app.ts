import express from 'express';

import usersRouter from './resources/users/router';

const cookieParser = require('cookie-parser');
const logger = require('morgan');

// App initialisation
const app = express();

// App MiddleWare
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

// Routes

app.use('/users', usersRouter);

app.all('*', (req, res) => {
  res.json({ msg: 'I am up and runnig!' });
});

module.exports = app;
