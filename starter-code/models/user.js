"use strict";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    /*   firstName: {
    type: String,
    trim: true
  }, */
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User"
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    username: {
      type: String,
      //required: true,
      unique: true,
      trim: true
    },
    image: {
      type: String
    },
    location: {
      type: String
    },
    rating: {
      type: Array
    },
    booksOnSale: Number,
    booksSold: Number,
    passwordHash: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
