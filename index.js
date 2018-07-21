const express = require('express');
const http = require('http');

//Init the express app
const app = express();
const port = 3000;

//Setup http server
const httpServer = http.Server(app);

//Defining endpoints

//Set home endpoint
app.get('/', (req, res) => {
    //Send HTML file as homepage
    res.sendFile(__dirname + '/views/index.html');
});

//Open up the server
app.listen(port, () => {
    console.log("App is listening on port: " + port);
})