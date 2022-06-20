const { exec } = require("child_process");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const GPS = require("gps");
const port = new SerialPort({ path: "COM6", baudRate: 9600 });
const express = require("express");
const app = express();
const PORT = 3000;

exec(
  `ffmpeg -i rtsp://admin:hik12345@118.96.244.84:554/Streaming/Channels/101/ -fflags flush_packets -max_delay 5 -flags -global_header -hls_time 5 -hls_list_size 3 scale=320:-1 -vcodec copy -y 'file location'`,
  (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  }
);

const findRemoveSync = require("find-remove");
setInterval(() => {
  //'file location'
  var result = findRemoveSync("file", {
    age: { seconds: 30 },
    extensions: ".ts",
  });
  console.log(result);
}, 5000);

const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

const gps = new GPS();

gps.on("data", function (data) {
  console.log(data);
});

parser.on("data", function (data) {
  gps.update(data);
});

app.get("/location", (req, res) => {
  res.send(gps.state);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
