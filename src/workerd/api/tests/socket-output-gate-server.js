// Simple TCP echo server for socket-output-gate test.
const net = require('node:net');

const server = net.createServer((socket) => {
  socket.on('data', (chunk) => socket.write(chunk));
  socket.on('error', () => {});
});

server.listen(process.env.ECHO_SERVER_PORT, () => {
  console.info(`Echo server on port ${server.address().port}`);
});
