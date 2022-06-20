const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const GPS = require("gps");
const port = new SerialPort({ path: "COM6", baudRate: 9600 });
const express = require("express");
const app = express();
const PORT = 3000;

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
