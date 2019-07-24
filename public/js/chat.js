// eslint-disable-next-line no-undef
const socket = io();

const $form = document.querySelector('#form');
const $locationButton = document.querySelector('#location');
const $formButton = document.querySelector('#submit');
const $input = document.querySelector('#input');

socket.on('message', (message) => {
  console.log(message);
});

$form.addEventListener('submit', (e) => {
  e.preventDefault();

  $formButton.setAttribute('disabled', 'disabled');

  socket.emit('sendMessage', e.target[0].value, (message) => {
    console.log(message);
    e.target[0].value = '';
    $formButton.removeAttribute('disabled');
    $input.focus();
  });
});


$locationButton.addEventListener('click', () => {
  $locationButton.setAttribute('disabled', 'disabled');
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude, position.coords.longitude);
    socket.emit('sendLocation', {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    }, (message) => {
      console.log(message);
      $locationButton.removeAttribute('disabled');
    });
  });
});
