// eslint-disable-next-line no-undef
const socket = io();

socket.on('message', (message) => {
  console.log(message);
});

document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('sendMessage', e.target[0].value, (message) => {
    console.log(message);
  });
  e.target[0].value = '';
});

document.querySelector('#location').addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude, position.coords.longitude);
    socket.emit('sendLocation', {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    }, message => console.log(message));
  });
});
