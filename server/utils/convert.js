const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const nanoid = require("shortid");
const { Readable } = require('stream');

function processFile(file, pathLocation) {
  return new Promise((resolve, reject) => {

    const filename = nanoid();

    const filePath = `${pathLocation}${filename}`;

    const format = '.mp4';

    const inputStream = Readable.from(file.buffer);

    ffmpeg(inputStream)
      .output(`${filePath}${format}`)
      .size('640x480')
      .videoBitrate('1024k')
      .fps(25)
      .on('end', () => {
        resolve(`${filePath}${format}`);
      })
      .on('error', (err) => {
        console.log(err.message);
        reject(err.message);
      })
      .run();
  });
}

module.exports = {
  processFile,
}
