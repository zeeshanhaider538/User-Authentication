const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./database");
const User = connection.models.User;
const customField = {
  usernameFiedl: "uname",
  passwordField: "pw",
};

const verfiyCallback = (username, password, done) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      // Function Define at the bottom of application.js
      const isValid = validPassword(password, user.hash, user.salt);
      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
};
const strategy = new LocalStrategy(customField, verfiyCallback);

passport.use(strategy);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  user
    .findByID(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
