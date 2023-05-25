const net = require("net");
const readline = require('readline/promises');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = net.createConnection({ port: 3008, host: "127.0.0.1" },
  async () => {
    console.log("connected to server")

    const msg = await rl.question("Enter a message > ");
    client.write(msg);

  })


client.on("data", (data) => {
  console.log(data.toString());
})


client.on("end", () => {
  console.log("Connection was ended");
})