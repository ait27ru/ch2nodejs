const express = require("express");
const fs = require("fs");
const app = express();

if (!process.env.PORT) {
  console.error(
    "VideoStreaming: Environment variable PORT doesn't exist. Create it before launching the microservice."
  );
  return;
}
const port = process.env.PORT;

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
  console.log(`Listening on http://localhost:${port}/video`);
});
