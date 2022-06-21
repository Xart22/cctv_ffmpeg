const { excuteComand } = require("./cctv.js");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

//excuteComand();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log("a user connected " + socket.id);
  socket.on("message", (msg) => {
    console.log(msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
