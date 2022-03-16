const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/user");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }

        bcrypt.compare(password, user.password, function (err, result) {
          if (err) return done(err);

          // Passwords match
          if (result) {
            return done(null, user);
          }
          // Passwords does NOT match
          if (!result) {
            return done(null, false, { message: "Incorrect password" });
          }
        });
      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
