const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';
const express = require('express')
const http = require('http');;


const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
  const io = http.createServer(server);

  io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
  });


  setInterval(() => io.emit('time', new Date().toTimeString()), 1000);


