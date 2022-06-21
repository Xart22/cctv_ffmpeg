const { io } = require("socket.io-client");
const getData = require("./gps");

const socket = io("http://localhost:3000");

socket.on("connect", function () {
  console.log("WebSocket Client Connected");

  socket.on("message", function (msg) {
    console.log(msg);
    if (msg === "gps") {
      const data = getData();
      socket.emit("message", data);
    }
  });
});
