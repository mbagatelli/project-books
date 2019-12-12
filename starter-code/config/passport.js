const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcryptjs = require("bcryptjs");
//const nodemailer = require("./mailer");
const fs = require("fs");
//const handlebars = require("handlebars");
const User = require("../models/user");

//attach the plugin to the nodemailer transporter

// GENERATE RANDOM TOKEN
const generateId = length => {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  return token;
};

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => {
      callback(null, user);
    })
    .catch(error => {
      callback(error);
    });
});

const renderTemplate = (path, data) => {
  const source = fs.readFileSync(path, "utf8");
  //const template = handlebars.compile(source);
  const result = template(data);
  return result;
};

passport.use(
  "local-sign-up",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true
    },
    (req, email, password, callback) => {
      const { username, location } = req.body;
      bcryptjs
        .hash(password, 10)
        .then(hash => {
          return User.create({
            username,
            location,
            email,
            passwordHash: hash
          });
        })
        .then(user => {
          callback(null, user);
        })
        .catch(error => {
          callback(error);
        });
    }
  )
);

passport.use(
  "local-sign-in",
  new LocalStrategy({ usernameField: "email" }, (email, password, callback) => {
    let user;
    User.findOne({
      email
    })
      .then(document => {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      })
      .then(passwordMatchesHash => {
        if (passwordMatchesHash) {
          callback(null, user);
        } else {
          callback(new Error("WRONG_PASSWORD"));
        }
      })
      .catch(error => {
        callback(error);
      });
  })
);

/* passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      const user = await User.findOne({ email });
      const token = generateId(32);
      if (user) {
        try {
          const passMatch = await bcryptjs.compare(
            password,
            user.passwordHash.passHash
          );
          if (passMatch && user.passwordHash.verified) {
            done(null, user);
          } else if (passMatch && !user.passwordHash.verified) {
            done(new Error("Please Verify your account."));
          } else {
            done(new Error("Password doesn't match"));
          }
        } catch (error) {
          done(error);
        }
      } else {
        try {
          const hash = await bcryptjs.hash(password, 10);
          const photoToken = email.split(".")[0];
          const newUser = await User.create({
            email,
            image: `https://api.adorable.io/avatars/285/${photoToken}.png`,
            passwordHash: {
              method: "local",
              passHash: hash,
              verified: false,
              verificationToken: token
            }
          });
          done(null, newUser);
        } catch (err) {
          done(err);
        }
      }
    }
  )
); */

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/sign-in/google/redirect"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          done(null, user);
        } else {
          const newUser = await User.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
            password: {
              method: "google",
              uid: profile.id
            }
          });
          done(null, newUser);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);
