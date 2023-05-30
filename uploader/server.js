const net = require("net");
const fs = require("node:fs/promises");

const server = net.createServer(() => { });


server.on("connection", (socket) => {
  console.log("New Connection");
  let fileHandle, fileStream


  socket.on("data", async (data) => {
    if (!fileHandle) {
      socket.pause();  // pause receiving data from client

      const _idxOfDiv = data.indexOf("------");
      const fileName = data.subarray(10, _idxOfDiv).toString("utf-8");


      fileHandle = await fs.open(`storage/${fileName}`, "w");
      socket.resume();
      fileStream = fileHandle.createWriteStream();

      //writing to our destination file
      fileStream.write(data.subarray(_idxOfDiv + 6));

      socket.resume();
      fileStream.on("drain", () => {
        socket.resume();
      })
    } else {
      if (!fileStream.write(data)) {
        socket.pause();
      }
    }

  });

  // runs when client closes connection
  socket.on("end", () => {
    fileHandle.close();
    fileHandle = undefined;
    fileStream = undefined;
    console.log("Connection Ended");

  })
});



server.listen(5050, "::1", () => {
  console.log("Uploader server opened on", server.address());
})
