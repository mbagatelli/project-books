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
      required: true,
      maxlength: 13
    },
    synopsis: {
      type: String,
      default: "",
      maxlength: 280
    },
    type: {
      type: String,
      enum: ["fiction", "non-fiction"]
    },
    genre: Array,
    language: {
      type: String,
      enum: [
        "English",
        "Português",
        "Français",
        "Deutsch",
        "Esperanto",
        "Polski",
        "Español",
        "Italiano",
        "русский язык",
        "普通話",
        "日本語",
        "Other language"
      ]
    },
    pushlished_year: {
      year: Number
    },
    price: {
      type: Number,
      default: 0
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
      enum: ["very good", "good", "okay"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
