const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
var options = {
  allowUpgrades: true,
  transports: ["polling", "websocket"],
  pingTimeout: 9000,
  pingInterval: 3000,
  httpCompression: true,
  origins: "*:*",
};
const io = new Server(server, options, true   );
var channel = "ciao"
const PORT = process.env.PORT || 3000                                                   


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
        socket.on("message", function (data) {
            socket.broadcast.emit("message", {
                message: data.message
            });
            console.log("received");
        });
});

server.listen(PORT, () => {
  console.log('listening on *:'+PORT);
});