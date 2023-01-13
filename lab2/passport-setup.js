const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook");
const InstagramStrategy = require("passport-instagram").Strategy;
const YandexStrategy = require("passport-yandex").Strategy;
const DiscordStrategy = require("passport-discord");
const GihubStrategy = require("passport-github2").Strategy;
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "185543948440-2hnkf9pr298kr8esmga0fijmnn1hvkgr.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.use(
  new GihubStrategy(
    {
      clientID: "839bbd2f8def3595abeb",
      clientSecret: "39019b65282cbce2b33fca8e22a2715eb6c217da",
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    // = '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'
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      return done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: "1789140621460606",
      clientSecret: "c1b7236d5970f45e8c4202c30f62ce7a",
      callbackURL: "http://localhost:3000/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      return done(null, profile);
    }
  )
);
// "keys": {
//     "id": "айди",
//     "secret": "пароль"
// },
// "scope": "login:birthday login:email login:info"
