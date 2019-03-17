const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();
const {
  isAuthenticated,
  isNotAuthenticated,
} = require('./middlewares');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const oauth2Router = require('./routes/oauth2');
const oauthApi = require('./api/oauth');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    secure: false,
    maxAge: 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: true,
}));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true,
}));
app.use(express.static(path.join(__dirname, 'public')));

app.all('/', isAuthenticated, indexRouter);
app.use('/login', isNotAuthenticated, loginRouter);
app.use('/logout', isAuthenticated, logoutRouter);
app.use('/auth', isNotAuthenticated, oauth2Router);

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