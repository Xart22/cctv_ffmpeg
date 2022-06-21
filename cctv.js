const { exec } = require("child_process");
const findRemoveSync = require("find-remove");
const link = process.env.LINK || "http://localhost:3000";
const pathConvert = process.env.PATH_CONVERT || "/home/app/cctv/file/";

const excuteComand = (callback) => {
  exec(
    `ffmpeg -i ${link}/Streaming/Channels/101/ -c:a aac -b:a 160000 -ac 2 -s 854x480 -c:v libx264 -b:v 800000 -hls_time 10 -hls_list_size 10 ${pathConvert}/index.m3u8`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      callback(stdout);
    }
  );
  setInterval(() => {
    var result = findRemoveSync(pathConvert, {
      age: { seconds: 60 },
      extensions: ".ts",
    });
    console.log(result);
  }, 30000);
};

module.exports = { excuteComand };
