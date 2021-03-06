const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const oauthApi = require('./api/oauth');

const app = express();

app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({
  extended: false,
}));

app.use(cookieParser());

app.all('/', function(req, res, next) {
  res.send('Hello World!')
});

app.use(cors());

app.use('/api/auth', oauthApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
