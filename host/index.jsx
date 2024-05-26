function dispatchEventCEP(_type, _payload) {
    try {
        var xLib = new ExternalObject("lib:\PlugPlugExternalObject");
    } catch (e) {
        alert(e);
    }
    if (xLib) {
        var eventObj = new CSXSEvent();
        eventObj.type = _type;
        eventObj.data = _payload;
        eventObj.dispatch();
    } else {
        alert("PlugPlugExternalObject not loaded.", true);
    }
};

function getLocation() {
    if (app) {
        if (app.project) {
            var folder = new Folder(app.project.path).parent;
            return folder.fsName;
        }
    }
};

function importFile(fileName) {
    var file = File(fileName).fsName;
    app.project.importFiles(file);
    return item;
};

function returnLastFromBin() {
    return app.project.rootItem.children[app.project.rootItem.children.numItems - 1];
};

function insertItem() {
    var item = returnLastFromBin();
    var activeSequence = app.project.activeSequence;
    if (activeSequence) {
        var sequenceDuration = (app.project.activeSequence.end - app.project.activeSequence.zeroPoint) / 254016000000;
        app.project.activeSequence.videoTracks[0].insertClip(item, sequenceDuration);
        return true;
    }
    return false;
};