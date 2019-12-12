"use strict";

const mongoose = require("mongoose");
const User = require("./user");
const BookQuestion = require("./bookQuestion");

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
    synopsis: {
      type: String,
      default: "",
      maxlength: 280
    },
    type: {
      enum: ["fiction", "non-fiction"]
    },
    genre: {
      type: String,
      enum: [
        "Action and adventure",
        "Art",
        "Alternate history",
        "Autobiography",
        "Anthology",
        "Biography",
        "Chick lit",
        "Book review",
        "Children's",
        "Cookbook",
        "Comic book",
        "Diary",
        "Coming-of-age",
        "Dictionary",
        "Crime",
        "Encyclopedia",
        "Drama",
        "Guide",
        "Fairytale",
        "Health",
        "Fantasy",
        "History",
        "Graphic novel",
        "Journal",
        "Historical fiction",
        "Math",
        "Horror",
        "Memoir",
        "Mystery",
        "Prayer",
        "Paranormal",
        "Religion, spirituality, and new age",
        "Picture book",
        "Textbook",
        "Poetry",
        "Review",
        "Political",
        "Science",
        "Romance",
        "Self help",
        "Satire",
        "Travel",
        "Science fiction",
        "True crime",
        "Short story",
        "Suspense",
        "Thriller",
        "Young adult"
      ]
    },
    language: {
      type: String,
      enum: [
        "English",
        "Português",
        "Français",
        "Deutsch",
        "Esperanto",
        "Polski",
        "Español"
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
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
