
**Short Description:**

This project serves as a proof of concept demonstrating the collaborative potential between Adobe Premiere Pro and JavaScript Canvas API for capturing and managing media. Primarily for Windows usage, this endeavor showcases how Premiere Pro can seamlessly integrate with custom JavaScript functionalities for media manipulation within its interface.

**Functionality:**

-   Users can immerse themselves in the classic game DOOM directly within the Adobe Premiere Pro interface.
-   Upon activating the extension, if a project has an active sequence, video files capturing the gameplay screen are automatically added to the timeline.
-   The location for storing video chunks is the '/uploads' folder within the project directory.

[Include a screenshot or video demonstration]

**How to Run:**

1.  Ensure Adobe Premiere Pro is installed on your system.
2.  Clone the repository to your local machine.
3.  Download the ffmpeg binary release from [ffmpeg.org](https://ffmpeg.org/download.html) and place it inside the 'ffmpeg' folder of the repository.
4.  Locate the Adobe extensions folder typically found at:    
    `C:\Program Files (x86)\Common Files\Adobe\CEP\extensions` 
    and add the repository folder to it.
5.  Confirm that port '3059' is enabled using the 'netstat -ano' command in either Command Prompt or PowerShell.
6.  Launch Premiere Pro and navigate to the 'Extensions' section under the 'Window' tab. If 'DOS' appears, click on it to run the extension.

**How It Works:**

Adobe Premiere Pro utilizes the Chrome Embedded Framework (CEF) to execute two primary operations:

-   Rendering the HTML page (CEP panel).
-   Running a Node.js script to access file data.

On the HTML side, the code orchestrates DosBox's core within a JavaScript library and initiates the download and execution of the DOOM executable. Once the game is running, it employs the MediaRecorder API to capture the canvas element's content and sends the video data chunks to the Node.js server via HTTP fetch.

The Node.js server receives these chunks, converts them to compatible formats using FFMPEG, and subsequently invokes ExtendScript functions to import each chunk into the Premiere Pro bin and insert them onto the timeline.

**Technologies Used:**

-   HTML, JavaScript, CSS, js-dos-api, CSInterface
-   Node.js, Express.js, fluent-ffmpeg, multer, shortid
-   ExtendScript

**Disclaimer and Copyright:**

Adobe, Premiere, DOOM, and DOS are trademarks, and the rights of DosBox and js-dos-api belong to their respective owners.п
