"use strict";

const mongoose = require("mongoose");
// const User = require("./user");
// const BookQuestion = require("./bookQuestion");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 140
    },
    author: {
      type: String,
      required: true,
      maxlength: 140
    },
    isbn: {
      type: Number,
      maxlength: 13
    },
    synopsis: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      enum: ["fiction", "non-fiction"]
    },
    genre: Array,
    language: {
      type: String,
      enum: [
        "en",
        "pt",
        "fr",
        "de",
        "eo",
        "pl",
        "es",
        "it",
        "ru",
        "zh",
        "ja",
        "Other language"
      ]
    },
    publishedYear: String,
    price: {
      type: Number,
      default: 0
    },
    seller: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
    sold: {
      type: Boolean,
      default: false,
      required: true
    },
    // seller: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User"
    // },
    // buyer: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   default: ""
    // },
    // questions: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "BookQuestion",
    //   default: "",
    //   required: true
    // },
    image: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      maxlength: 280
    },
    condition: {
      type: String,
      enum: ["Very good", "Good", "Okay"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
