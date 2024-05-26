const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { pipeline } = require("stream");
const { URL } = require("url");
const app = express();
const PORT = 3059;
const { corsMiddleware } = require("./middlewares/cors");
const { getData } = require("./middlewares/multer");
const { getFileName, createFolderIfNotExist } = require("./utils/fsHelpers");
const { processFile } = require("./utils/convert");
const { evalAsync } = require("./utils/evalAsync");
const { getLocation } = require("./utils/getPath");
const { devmode } = require("./utils/mode");

process.env.FFMPEG_PATH = path.join(__dirname, '..', 'ffmpeg', 'bin', 'ffmpeg.exe');
process.env.FFPROBE_PATH = path.join(__dirname, '..', 'ffmpeg', 'bin', 'ffprobe.exe');

let tempPath;

app.listen(PORT, async () => {
    if (!devmode) {
        await evalAsync(`dispatchEventCEP('serverRun', '')`);
    }
    getLocation(devmode)
        .then((data) => {
            tempPath = data;
            createFolderIfNotExist([data]);
        });
});

app.use(corsMiddleware);

app.post(
    "/file",
    getData,
    (req, res) => {
        if (JSON.stringify(req.fileBins) !== "{}") {
            req.files.files.forEach((file) => {
                processFile(file, tempPath)
                    .then(async (filePath) => {
                        if (!devmode) {
                            const formattedFilePath = path.normalize(filePath).replace(/\\/g, '/');
                            evalAsync('importFile("' + formattedFilePath + '")')
                                .then(async () => {
                                    await evalAsync('insertItem()');
                                })
                        }
                    })
                    .catch(err => console.log(err));
            });
        };
        return res.end();
    }
);

app.use((err, req, res, next) => {
    if (err) {
        res.status(500).json({ message: "Server error" });
    }
});