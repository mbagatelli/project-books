"use strict";

const mongoose = require("mongoose");

const bookQuestionSchema = new mongoose.Schema(
  {
    question: [
      {
        text: String,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookQuestion", bookQuestionSchema);
