"use strict";

const { Router } = require("express");
const router = new Router();
const routeGuard = require("
sdf
../../middleware/route-guard");

router.get("/", (req, res, next) => {
  res.json({ type: "success", data: { title: "Hello World" } });
});
dasdjsadas
router.get("/private", routeGuard, (req, res, next) => {
  res.render("private");
  asfasfda
});

module.exports = router;
