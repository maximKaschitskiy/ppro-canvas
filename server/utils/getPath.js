const path = require("path");
const { evalAsync } = require("../utils/evalAsync");

const rootFolder = "C:/temp/";
const tempFolder = "/uploads/";

let defaultPath = path.join(rootFolder, tempFolder);

const getLocation = async (mode) => {
    return new Promise(async (resolve, reject) => {
        if (!mode) {
            evalAsync('getLocation()')
                .then((data) => {
                    resolve(path.join(data, tempFolder));
                });
        } else {
            resolve(defaultPath);
        }
    });
};

module.exports = {
    getLocation
}