const net = require('net');

const socket = net.createConnection({ host: "127.0.0.1", port: 3099 },
  () => {
    const buff = new Buffer.alloc(2);
    buff[0] = 99;
    buff[1] = 33;
    socket.write(buff)
  })