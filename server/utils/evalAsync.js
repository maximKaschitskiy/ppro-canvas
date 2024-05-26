const { evalScript } = require("../utils/cep");

const evalAsync = (script) => {
  return new Promise((resolve, reject) => {
    evalScript(script, (data) => {
      resolve(data);
    });
  });
};

module.exports = {
  evalAsync
}