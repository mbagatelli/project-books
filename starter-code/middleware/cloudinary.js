// config/ cloudinary.js

const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "the-news", // The name of the folder in cloudinary
  allowedFormats: ["jpg", "png"]
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;
