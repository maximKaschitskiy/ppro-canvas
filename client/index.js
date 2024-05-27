document.addEventListener("DOMContentLoaded", async () => {

  let serverOn = false;

  const csInterface = new CSInterface();

  const evalAsync = (script) => {
    return new Promise((resolve, reject) => {
      csInterface.evalScript(script, (data) => resolve(data));
    });
  };

  csInterface.addEventListener('serverRun', async () => {
    serverOn = true;
  });

  csInterface.requestOpenExtension("dos-server", "");

  const dosbox = new Dosbox({
    id: "dosbox",
    onload: async (dosbox) => {
      dosbox.run("https://js-dos.com/cdn/upload/DOOM-@evilution.zip", "./DOOM");
      if (serverOn) {
        await startRecordingLoop();
      };
    }
  });

  const sendData = data =>
    fetch(`http://localhost:3059/file`, {
      method: "POST",
      body: data
    }).then((res) => {
      if (res.ok) {
        return res;
      };
      return Promise.reject(`Error: ${res.status}`);
    });

  const getData = data => {
    const formData = new FormData();
    formData.append("files", data);
    return formData;
  };

  const setupMediaRecorder = () => {
    const canvas = document.querySelector(".dosbox-canvas");
    const stream = canvas.captureStream();
    return new MediaRecorder(stream);
  };

  const recording = async (mediaRecorder, cb) => {
    let chunks = [];

    mediaRecorder.ondataavailable = event => {
      chunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks);
      cb(blob);
      chunks = [];
    };

    mediaRecorder.start();

    await new Promise(resolve => setTimeout(resolve, 5000));

    mediaRecorder.stop();

    return;
  };

  const startRecordingLoop = async () => {
    const mediaRecorder = await setupMediaRecorder();
    await recording(mediaRecorder, (data) => {
      const file = new File([data], "video");
      sendData(getData(file));
    });
    await startRecordingLoop();
  };

});