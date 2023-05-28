const dgram = require("dgram");

const rec = dgram.createSocket("udp6");

rec.on("message", (msg, remoteInfo) => {
  console.log(`Server got: ${msg} form: ${remoteInfo.address}: ${remoteInfo.port}`);
})

rec.bind({ address: "::1", port: 5050 });

rec.on("listening", () => {
  console.log("Server listening", rec.address());
})
