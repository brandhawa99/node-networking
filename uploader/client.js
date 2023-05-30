const net = require("net");
const fs = require("node:fs/promises");
const path = require("path");

const clearLine = (dir) => {
  return new Promise(res => {
    process.stdout.clearLine(dir, () => {
      res();
    })
  })
}
const moveCursor = (dx, dy) => {
  return new Promise(res => {
    process.stdout.moveCursor(dx, dy, () => {
      res();
    })
  })
}

const socket = net.createConnection({ host: "::1", port: 5050 }, async () => {
  const filePath = process.argv[2];
  const fileName = path.basename(filePath);
  const fileHandle = await fs.open(filePath, "r");
  const fileStream = fileHandle.createReadStream();
  const fileSize = (await fileHandle.stat()).size;

  let upPerct = 0;
  let bytesUp = 0;


  socket.write(`filename: ${fileName}------`)
  console.log();

  fileStream.on("data", async (data) => {
    if (!socket.write(data)) {
      fileStream.pause();
    }

    bytesUp += data.length
    let newPerct = Math.floor((bytesUp / fileSize) * 100);
    if (newPerct != upPerct) {
      upPerct = newPerct
      await moveCursor(0, -1);
      await clearLine(0);
      console.log("Uploaded", upPerct, "%");
    }
  })
  socket.on("drain", () => {
    fileStream.resume();
  })


  fileStream.on("end", () => {
    console.log("file was successfully uploaded");
    socket.end();
  })
})

