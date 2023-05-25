const net = require("net");
const readline = require('readline/promises');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((res, rej) => {
    process.stdout.clearLine(dir, () => {
      res();
    })
  })
}

const moveCursor = (dx, dy) => {
  return new Promise((res, rej) => {
    process.stdout.moveCursor(dx, dy, () => {
      res();
    })
  })
}

let id;

const client = net.createConnection({ port: 3008, host: "127.0.0.1" },
  async () => {
    console.log("connected to server")

    const ask = async () => {
      const msg = await rl.question("Enter a message > ");
      // clear the current line the cursor is in
      await moveCursor(0, -1);
      await clearLine(0)
      client.write(`${id}-message-${msg}`);
    }

    ask();
    client.on("data", async (data) => {
      console.log();
      await moveCursor(0, -1)
      await clearLine();

      if (data.toString("utf-8").substring(0, 2) === "id") {
        id = data.toString("utf-8").substring(3);
        console.log(`Your id is ${id}! \n`)

      } else {
        console.log(data.toString("utf-8"));
      }
      ask();
    })


  })

client.on("close", () => {

})




client.on("end", () => {

  console.log("Connection was ended");
})