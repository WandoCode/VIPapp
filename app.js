var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");

// Use dotenv package to get info from .env file
require("dotenv").config({ path: "./config/.env" });

// Start express
var app = express();

/*=================================================*/
/*              Start general middleware           */
/*-------------------------------------------------*/
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SECRET_WORD,
    resave: false,
    saveUninitialized: true,
  })
);
/***************************************************/

/*=================================================*/
/*              Start mongoDB connection           */
/*-------------------------------------------------*/
const mongoDb = process.env.MONGODB_LINK;

mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
/***************************************************/

/*=================================================*/
/*         Configure passport authentication       */
/*-------------------------------------------------*/
require("./config/passport")(passport);

app.use(passport.initialize());
app.use(passport.session());

// Set up locals variables for views
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});
/***************************************************/

/*=================================================*/
/*                 Configure Routes                */
/*-------------------------------------------------*/
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

app.use("/", indexRouter);
app.use("/users", usersRouter);

/***************************************************/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
