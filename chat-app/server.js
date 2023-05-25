const net = require('net');

const server = net.createServer();
const clients = [];

server.on("connection", (socket) => {
  console.log("A new connection to the server");
  const clientId = clients.length + 1;

  clients.map(c => {
    c.socket.write(`User ${clientId} joined !`)
  })

  socket.write(`id-${clientId}`)


  socket.on("data", (data) => {
    clients.forEach((s) => {

      s.socket.write(data);
    })
  })

  socket.on("end", () => {
    clients.map(c => {
      c.socket.write(`User ${clientId} left :(`)
    })
  })

  clients.push({ id: clientId, socket })

})




server.listen(3008, "127.0.0.1", () => {
  console.log("Open server on", server.address());
})

