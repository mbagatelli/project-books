"use strict";

const { Router } = require("express");
const router = new Router();
const routeGuard = require("../../middleware/route-guard");
const Book = require("./../../models/book");
const uploadCloud = require("../../middleware/cloudinary");
const defaultPhoto =
  "https://res.cloudinary.com/dldcaigqm/image/upload/v1576515474/project-books/so8prbzxwsoxmqukzyd9.jpg";
//ENDPOINT /api/book
//POST
router.post("/create", uploadCloud.single("image"), async (req, res, next) => {
  try {
    const data = {
      title: req.body.title,
      author: req.body.author,
      synopsis: req.body.synopsis,
      isbn: req.body.isbn,
      type: req.body.type,
      genre: req.body.genre,
      seller: req.body.seller,
      language: req.body.language,
      publishedYear: req.body.publishedYear,
      condition: req.body.condition,
      description: req.body.description,
      price: req.body.price,
      image: req.file ? req.file.secure_url : req.body.image || defaultPhoto
    };
    console.log("body", req.body);
    const book = await Book.create(data);
    res.json({ book });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
});

//GET -- list all books
router.get("/list", async (req, res, next) => {
  // console.dir(req.params.id);
  const books = await Book.find().exec();
  try {
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
      res.json({ message: "Update successful", book });
      //console.log(book);
    })
    .catch(err => {
      console.log(err, "Not found");
      next(err);
    });
});

module.exports = router;
