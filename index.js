const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');

app.use(express.static('public'), bodyParser.json());

app.get('/', (req, res) => res.render('index.html'));

io.on('connection', () => console.log('New Websocket connection'));

module.exports = server;
