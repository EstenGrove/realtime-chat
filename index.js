//Initialize Express
const express = require('express');
//Initialize Socket.io
const socket = require('socket.io');
//Create express app
const app = express();
const port = 3600;

const server = app.listen(port, () => {
    console.log('Listening on port ' + port);

})

//Static files
app.use(express.static('public'));

//Socket server
const io = socket(server);

// Socket connection
io.on('connection', (socket) => {
    let sessID = socket.handshake.headers.cookie;
    console.log('Made socket connection', sessID);

    //Receive message from FrontEnd and emit from backend
    socket.on('chat', (data) => {
        io.emit('chat', data);
    })
    // Listen for 'typing' event
    socket.on('typing', (data) => {
        io.broadcast.emit('typing', data);
    })
});