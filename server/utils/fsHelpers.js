const path = require("path");
const os = require("os");
const fs = require("fs");
const { URL } = require('url');

const createFolderIfNotExist = (paths) => {
  paths.forEach((item) => {
    if (!fs.existsSync(item)) {
      fs.mkdirSync(item, { recursive: true });
    };
  });
};

module.exports = {
  createFolderIfNotExist,
};
