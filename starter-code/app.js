"use strict";

const { join } = require("path");
const express = require("express");
const createError = require("http-errors");
const connectMongo = require("connect-mongo");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const logger = require("morgan");
const mongoose = require("mongoose");
// const serveFavicon = require("serve-favicon");
// const basicAuthenticationDeserializer = require("./middleware/basic-authentication-deserializer.js");
// const bindUserToViewLocals = require("./middleware/bind-user-to-view-locals.js");
// const indexRouter = require("./routes/api/index");
const authRouter = require("./routes/api/authentication");
const bookRouter = require("./routes/api/book");
const stripeRouter = require("./routes/api/checkout");
const sellRouter = require("./routes/api/sell");

const app = express();

// app.use(serveFavicon(join(__dirname, "client/build", "favicon.ico")));
app.use(express.static(join(__dirname, "client/build")));

app.use(logger("dev"));
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 15 * 100,
      sameSite: "lax",
      httpOnly: true
      /* secure: process.env.NODE_ENV === "production" */
    },
    store: new (connectMongo(expressSession))({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24
    })
  })
);

// Passport configuration
require("./config/passport");
const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());

// app.use(basicAuthenticationDeserializer);
// app.use(bindUserToViewLocals);

// app.use("/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/book", bookRouter);
app.use("/api/checkout", stripeRouter);
// app.use("/api/sell", sellRouter);

// Catch missing routes and forward to error handler

app.get("*", (req, res, next) => {
  res.sendFile(join(__dirname, "client/build/index.html"));
});

app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};

  res.status(error.status || 500);
  res.json({ type: "error", error: { message: error.message } });
});

module.exports = app;
