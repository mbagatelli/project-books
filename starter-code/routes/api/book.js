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

//GET -- get book by ID
router.get("/:id", (req, res, next) => {
  console.dir(req.params.id);
  // res.json({ "id": req.params.id });
 Book.findById(req.params.id)
  .then(doc => console.log(doc, "GREAT SUCCESS"))
  .catch(err => console.log(err, "OH FUCK!"));
});

module.exports = router;
