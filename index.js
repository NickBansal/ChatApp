const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static('public'), bodyParser.json());

app.get('/', (req, res) => res.render('index.html'));

io.on('connection', (socket) => {
  console.log('New Websocket connection');
  socket.emit('messageReceived', 'Welcome!');

  socket.broadcast.emit('messageReceived', 'A new user has joined...');

  socket.on('response', (response) => {
    io.emit('messageReceived', response);
  });

  socket.on('disconnect', () => {
    io.emit('messageReceived', 'User has left');
  });
});

module.exports = server;
