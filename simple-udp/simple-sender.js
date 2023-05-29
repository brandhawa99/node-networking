const dgram = require("dgram");

const sender = dgram.createSocket("udp6");

sender.send("This is a string", 5050, "::1", (err, bytes) => {
  console.log(err);
  console.log(bytes);
})

sender.send("This is a string 2", 5050, "::1", (err, bytes) => {
  console.log(err);
  console.log(bytes);
})