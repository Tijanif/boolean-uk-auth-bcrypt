const express = require('express');
const path = require('path');
const logger = require('morgan');

// App initialisation
const app = express();

// App MiddleWare
app.use(logger('dev'));
app.use(express.json());

// Routes

app.all('*', () => console.log('I am up and runnig!'));

module.exports = app;
