"use strict";

const { Router } = require("express");
const router = new Router();
const User = require("./../../models/user");
// const routeGuard = require("../../middleware/route-guard");
const Book = require("./../../models/book");

// ENDPOINT /api/sell

router.post('/seller', async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body);
    res.json(body);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
})