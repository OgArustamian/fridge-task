const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const hbs = require('hbs');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const { checkSession } = require('./middleWares/middleWare');

hbs.registerHelper('checkAdmin', (role) => (role === 1));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const PORT = process.env.PORT ?? 3000;
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'sID',
  store: new FileStore({}),
  secret: process.env.SESSION,
  resave: true,
  saveUninitialized: false,
}));

app.use(checkSession);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => {
  console.log('server has started on port', PORT);
});

module.exports = app;
