//Import third-party packages
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');

//Import local Packages and Models 
require('./config/config');
require('./models/Users');
require('./config/passport');
const {mongoose} = require('./db/mongoose');

//Instantiate routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//Initiate our app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'PLEASE-CHANGE-THIS-KEY', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));   // PLEASE MAKE SECRET MORE SECURE HERE

if(!isProduction) {
  app.use(errorHandler());
}

//Configure routs
app.use('/', indexRouter);
app.use('/users', usersRouter);

//Error handlers & middlewares
if(!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

app.listen(8000, () => console.log('Server running on http://localhost:8000/'));