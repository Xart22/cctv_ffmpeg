const { exec } = require("child_process");

const PORT = 4000;

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
