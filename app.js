const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
mongoose.Promise = global.Promise;
const http = require('http');
const async = require('async');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const auth = require('./auth/passport');
const User = require('./models/user');

const users = require('./routes/users');
const routes = require('./routes/index');

const app = express();

// Data base connection
mongoose.connect('mongodb://localhost/store', err => { err ? console.log('could not connect server') : app.listen('3000', () => { console.log('SERVER UP')})
});

// configurations..

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));

app.use(session({
  secret: "ilovemystore",
  resave: false,
  saveUninitialized: false,
  name: 'user_cook',
  cookie: {
    httpOnly: false,
    maxAge: 1000 * 60 * 5
  },
  store: new MongoStore({
    url: "mongodb://localhost:27017/store"
  })
}));
passport.use(new LocalStrategy(auth.login));
passport.serializeUser(auth.serializeUser);
passport.deserializeUser(auth.deserializeUser);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);






