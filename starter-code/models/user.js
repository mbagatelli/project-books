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
      //unique: true,
      trim: true
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dldcaigqm/image/upload/v1576773787/project-books/book-book-pages-bookcase-browse-415071_n04pbv.jpg"
    },
    location: {
      type: String
    },
    address: {
      type: String,
      required: true
    },
    rating: {
      type: Array
    },
    coins: Number,
    booksOnSale: Number,
    booksSold: Number,
    passwordHash: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
