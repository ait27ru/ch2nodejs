const express = require("express");
const fs = require("fs");
const app = express();

const defaultPort = 3000;

if (!process.env.PORT) {
  console.log(
    `Using the default port ${defaultPort}. To override it, create an environment variable PORT.`
  );
}
const port = process.env.PORT || defaultPort;

app.get("/video", (reg, res) => {
  const path = "videos/SampleVideo_1280x720_1mb.mp4";
  fs.stat(path, (err, stats) => {
    if (err) {
      console.error("An error occured");
      res.sendStatus(500);
      return;
    }
    res.writeHead(200, {
      "Content-Length": stats.size,
      "Content-Type": "video/mp4",
    });
    fs.createReadStream(path).pipe(res);
  });
});

app.listen(port, () => {
  console.log(`XXListening on http://localhost:${port}/video`);
});
