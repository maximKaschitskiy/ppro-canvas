
## Description

This project is a proof of concept that demonstrates how Adobe Premiere Pro can work in conjunction with the JavaScript Canvas API to capture and handle media. It showcases the integration of a DOSBox emulator within the Premiere Pro interface, allowing users to play the classic game DOOM and automatically import recorded gameplay footage into the active project timeline.

https://github.com/maximKaschitskiy/ppro-canvas/assets/67905360/390384dc-2890-46c0-8ebf-5ff371ed2d34

## Key Features

1.  **DOSBox Emulator Integration**: The application embeds the DOSBox emulator within the Premiere Pro interface, enabling users to run and play DOOM directly within the application.
2.  **Gameplay Recording**: Users can record their DOOM gameplay sessions using the MediaRecorder API, which captures the canvas element displaying the DOSBox emulator.
3.  **Automatic Video Import**: If an active sequence is present in the Premiere Pro project, the recorded gameplay video chunks are automatically imported and added to the timeline.
4.  **Video Storage**: The recorded video chunks are stored in the `/uploads` folder located within the project directory.

## Prerequisites

-   Windows operating system (macOS is not supported)
-   Adobe Premiere Pro installed

## Setup and Installation

1.  Clone the repository to your local machine.
2.  Download the FFmpeg binary release from [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html) and place it inside the `ffmpeg` folder.
3.  Locate the Adobe Extensions folder, typically located at `C:\Program Files (x86)\Common Files\Adobe\CEP\extensions`, and add the cloned repository to this folder.
4.  Ensure that the application is using port `3059`, which should be available. You can check for available ports using the `netstat -ano` command in the command prompt or PowerShell.
5.  Launch Adobe Premiere Pro, and in the "Window" tab, find the "Extensions" section. If the "DOS" entry is present, run it.

## How It Works

Adobe Premiere Pro utilizes the Chromium Embedded Framework (CEF) to perform two main operations:

1.  **Render HTML Page (CEP Panel)**: The HTML page is rendered within the CEP panel, which includes the code to run the DOSBox core using the `js-dos-api` library and a script to download and run the DOOM distribution.
2.  **Run Node.js Script for File Data Access**: After the game is launched, the MediaRecorder API is used to capture the canvas element displaying the DOSBox emulator. The recorded video data chunks are sent to the Node.js server via HTTP fetch requests.

The Node.js server receives the video data chunks and converts them to a compatible format using FFmpeg. Subsequently, the server calls ExtendScript functions to import each video chunk into the Premiere Pro bin and insert it onto the active timeline.

## Technologies Used

-   **Front-end**: HTML, JavaScript, CSS, `js-dos-api`, `CSInterface`
-   **Back-end**: Node.js, Express.js, `fluent-ffmpeg`, `multer`, `shortid`
-   **Adobe Integration**: ExtendScript

## Disclaimer and Copyright

Adobe, Premiere, DOOM, and DOS are trademarks owned by their respective companies. The rights to DOSBox and `js-dos-api` belong to their respective authors.
