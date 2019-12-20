"use strict";

const nodemailer = require("nodemailer");
const { Router } = require("express");
const router = new Router();
const User = require("../../models/user");
// const routeGuard = require("../../middleware/route-guard");
const Book = require("../../models/book");


// This probably should go somewhere else but we don't have enough time...
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAIL, // generated ethereal user
    pass: process.env.MAIL_PW // generated ethereal password
  }
});

function sendSoldMail(addresseeName, address, bookTitle, sellerEmail) {
  transporter.sendMail({
    from: `The Books Celler <MAIL>`,
    to: `${sellerEmail}`,
    subject: "Congratulations! Someone wants to exchange a book!",

    html: `
    <h1>Congratulations someone would like to exchange ${bookTitle}</h1>

    Please send it to:<br />
    ${addresseeName}<br />
    ${addresseeName}<br />

    Once you've popped it in the mail. Clich <a href="#">here</a> to let them know it's on the way.

    Thanks for being part of our community and bringing a little bit of joy into the world.

    Happy reading,

    The Book Cellar team
    ` // html body
  });
  return { "message": "Email notification sent."};
}

// ENDPOINT /api/notifications

router.post('/:bookId', async (req, res, next) => {
  try {
    const { fullName, address} = await req.body;
    const bookId = await req.params.bookId;
    // console.log(bookId.bookId);
    const book = await Book.findById(bookId).exec();
    const seller = await User.findById(book.seller).exec();
    const response = await sendSoldMail(fullName, address, book.title, seller.email);
    res.json(response);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
});

module.exports = router;
