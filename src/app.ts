import express from 'express';

const cookieParser = require('cookie-parser');
const logger = require('morgan');

// App initialisation
const app = express();

// App MiddleWare
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

// Routes

app.all('*', (req, res) => {
  res.json({ msg: 'I am up and runnig!' });
});

module.exports = app;
