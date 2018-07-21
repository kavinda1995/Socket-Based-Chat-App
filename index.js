const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

//Init the express app
const app = express();
const port = process.env.PORT;
// const port = 3000;

//Setup http server and bind it to socket.io
const httpServer = http.createServer(app);
const io = socketIO.listen(httpServer);

//Set public paths
// app.use("/styles", express.static(path.join(__dirname,'styles')));
app.use(express.static(__dirname + '/public'));

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
        console.log(msg.username);
        console.log('new message : ' + msg.message);
        socket.broadcast.emit('chat message', msg);
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