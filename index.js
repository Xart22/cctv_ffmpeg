const app = require("express")();
const Stream = require("node-rtsp-stream");

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const stream_configs = [
  {
    key: "CCTVSTREAM",
    port: 9090,
    url: "rtsp://admin:adm12345@192.168.2.100/Streaming/Channels/101",
  },
];

const startStream = (name, streamUrl, wsPort) => {
  const stream = new Stream({
    name,
    streamUrl,
    wsPort,
    ffmpegOptions: {
      "-stats": "",
      "-rtsp_transport": tcp,
      "-r": 30,
    },
  });
};

app.get("/start", (req, res) => {
  const { url, port, key = "CCTVSTREAM" } = req.query;
  if (!url && !port) {
    return res.json({
      message: "Wrong Input",
    });
  }
  if (streams[port]) {
    return res.json({
      message: "Port Used",
    });
  }

  startStream(url, port, key);

  res.json({
    message: "Stream ON",
  });
});

app.listen(8080, () => {
  console.log("Server Running 8080");
  stream_configs.forEach((config) => {
    startStream(config.key, config.url, config.port);
  });
});
