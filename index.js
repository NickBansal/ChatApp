const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static('public'), bodyParser.json());

app.get('/', (req, res) => res.render('index.html'));

let count = 0;

io.on('connection', (socket) => {
  console.log('New Websocket connection');
  socket.emit('countUpdated', count);

  socket.on('increment', () => {
    count += 1;
    // socket.emit('countUpdated', count);
    io.emit('countUpdated', count);
  });
});

module.exports = server;
