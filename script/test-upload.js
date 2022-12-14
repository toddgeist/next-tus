/* eslint-disable no-console */

"use strict";

const fs = require("fs");
const tus = require("tus-js-client");

const path = `${__dirname}/test.png`;
const file = fs.createReadStream(path);

const options = {
  endpoint: "http://localhost:3000/api/upload",
  retryDelays: [0, 3000, 5000, 10000, 20000],

  metadata: {
    filename: "test.png",
    filetype: "image/png",
    other: "ok"
  },
  onError(error) {
    console.error("An error occurred:");
    console.error(error);
    process.exitCode = 1;
  },
  onProgress(bytesUploaded, bytesTotal) {
    const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
    console.log(bytesUploaded, bytesTotal, `${percentage}%`);
  },
  onSuccess(data) {
    console.log("Upload finished", data);
  }
};

const upload = new tus.Upload(file, options);
upload.start();
