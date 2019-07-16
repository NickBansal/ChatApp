// eslint-disable-next-line no-undef
const socket = io();

socket.on('messageReceived', (message) => {
  console.log(message);
});

document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('response', e.target[0].value);
  e.target[0].value = '';
});
