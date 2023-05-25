const net = require('net');

const server = net.createServer();
const clients = [];

server.on("connection", (socket) => {
  console.log("A new connection to the server");

  socket.on("data", (data) => {
    socket.write(data);
    clients.forEach((c) => {
      c.write(data);
    })
  })
  clients.push(socket);
})



server.listen(3008, "127.0.0.1", () => {
  console.log("Open server on", server.address());
})

