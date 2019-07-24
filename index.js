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
  socket.emit('message', 'Welcome!');
  socket.broadcast.emit('message', 'A new user has joined...');

  socket.on('sendMessage', (response, callback) => {
    io.emit('message', response);
    callback('Message Delivered!!');
  });

  socket.on('sendLocation', (coords, callback) => {
    io.emit('message', `My location - https://google.com/maps?q=${coords.lat},${coords.long}`);
    callback('Location shared');
  });

  socket.on('disconnect', () => {
    io.emit('message', 'User has left');
  });
});

module.exports = server;
