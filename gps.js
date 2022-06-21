const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const GPS = require("gps");
const port = new SerialPort({ path: "COM6", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

const gps = new GPS();

const getData = () => {
  parser.on("data", function (data) {
    gps.update(data);
  });
  return gps.state;
};

module.exports = getData;
