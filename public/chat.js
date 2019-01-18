//Make connection
const socket = io.connect('http://localhost:3600');

//DOM Elements
const output = document.querySelector('#output');
//Inputs
const handle = document.querySelector('#handle');
const message = document.querySelector('#message');

const feedback = document.querySelector('#feedback');
//Btn
const btn = document.querySelector('.sendBtn');

//Emit Events on click to the backend
btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = '';
});

// Broadcast "User typing..." Message
message.addEventListener('keypress', () => {
    io.broadcast.emit('typing', handle.value);
})

// Update DOM from backend EMIT
socket.on('chat', (data) => {
    output.innerHTML += `<p style="font-family: 'Raleway'; font-size: 1.8rem;"><strong style="color: #8a5cea;">${data.handle}: </strong>${data.message}</p>`;
})

//Update DOM from Backend BROADCAST
socket.on('typing', (data) => {
    feedback.innerHTML = `<p><em>${data} is typing...</em></p>`;
})