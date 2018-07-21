const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

//Init the express app
const app = express();
const port = 3000;

//Setup http server and bind it to socket.io
const httpServer = http.createServer(app);
const io = socketIO.listen(httpServer);

//Defining endpoints

//Set home endpoint
app.get('/', (req, res) => {
    //Send HTML file as homepage
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    //Handle new Chat Message
    socket.on('chat message', (msg) => {
        console.log('new message : ' + msg);
    });

    //Handle disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
});

//Open up the server
httpServer.listen(port, () => {
    console.log("App is listening on port: " + port);
})