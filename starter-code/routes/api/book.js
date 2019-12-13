"use strict";

const { Router } = require("express");
const router = new Router();
const routeGuard = require("../../middleware/route-guard");
const Book = require("./../../models/book");

//ENDPOINT /api/book
//POST
router.post("/", (req, res, next) => {
  const {
    title,
    author,
    synopsis,
    type,
    genre,
    language,
    pushlished_year,
    price,
    image
  } = req.body;
  // const body = req.body;
  //Create new book
  Book.create({
    title,
    author,
    synopsis,
    type,
    genre,
    language,
    pushlished_year,
    price,
    image
  }, (err, book) => {
    if (err) return console.log(err);
  });
  // res.json({ title, author, synopsis, type, genre, language, pushlished_year, price, image });
  res.json({ "message": "OK" });
});

//GET -- list all books
router.get("/", async (req, res, next) => {
  // console.dir(req.params.id);
  const books = await Book.find({});
  try {
    console.log(books);
    res.json({ books });
  } catch (err) {
    console.log(err);
  }
});

//TODO: How to handle async / await errors correctly?
//GET -- get book by ID
router.get("/:id", (req, res, next) => {
  console.dir(req.params.id);
  Book.findById(req.params.id)
    .then(book => {
      res.json({ book });
    })
    .catch(err => {
      console.log(err, "Not found");
      next(err);
  });
});

// ENDPOINT /api/books/:id
// router.get("/:id", async (req, res, next) => {
//   console.dir(req.params.id);
//   const foundBook = await Book.findById(req.params.id).exec();
//   try {
//     console.log(foundBook);
//     res.json({ foundBook });
//   } catch (err) {
//     // throw new Error(err);
//     // console.log(err);
//     next(err);
//   }
// });

//DELETE
router.delete("/:id", (req, res, next) => {
  console.dir(req.params.id);
  Book.findByIdAndDelete(req.params.id)
    .then(book => {
      res.json({ book });
    })
    .catch(err => {
      console.log(err, "Not found");
      next(err);
  });
});

//PATCH
router.patch("/:id", (req, res, next) => {
  // console.dir(req.params.id);
  const update = req.body;
  console.log(update);
  Book.findByIdAndUpdate(req.params.id, update)
  //   if (err) {
  //     console.log(err, "Not found");
  //   } else {
  //     doc.
  //     res.json({ "message": "Update successful", doc });
  //     console.log(doc);
  //   }
  // });
    .then(book => {
      res.json({ "message": "Update successful", book });
      console.log(book);
    })
    .catch(err => {
      console.log(err, "Not found");
      next(err);
  });
});

module.exports = router;
