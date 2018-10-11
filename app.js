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

//Configure process.env variables
var isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000

//Initiate our app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'PLEASE-CHANGE-THIS-KEY', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));   // PLEASE MAKE SECRET MORE SECURE HERE 2

if(!isProduction) {
  app.use(errorHandler());
}

//Configure routers
// MUST BE SET AFTER BODY-PARSER
app.use(require('./routes'));

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

app.listen(port, () => console.log(`Server running on port ${port}/`));