const multer = require("multer");
const path = require("path");
const fs = require("fs");
const nanoid = require("nanoid");
const {
  createFolderIfNotExist
} = require("../utils/fsHelpers");
const { defaultPath, rootFolder, tempFolder } = require("../utils/getPath");

const getData = (req, res, next) => {
  multer().fields([{ name: "files" }])(req, res, (err) => {
    if (err) {
      console.log(err);
    }
    next();
  });
};

module.exports = {
  getData
}
