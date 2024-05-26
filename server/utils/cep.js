const evalScript = (script, callback) => {
    if (callback === null || callback === undefined) {
      callback = function(result){};
    }
    window.__adobe_cep__.evalScript(script, callback);
};

module.exports = {
    evalScript
}