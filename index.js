var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/externals', express.static(path.join(__dirname, 'node_modules')));
app.use('/styles', express.static(path.join(__dirname, 'src/styles')));
app.use('/js', express.static(path.join(__dirname, 'src/app')));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

io.on("connection", function(socket) {
    console.log("User Connected");

    socket.on('disconnect', function() {
        console.log("User Dis-Connected");
    })

    socket.on('chat-message', function(msg) {
        console.log("MSG: ", msg);
        io.emit('chat-message', msg, {for: 'everyone'});
    });
});

http.listen(3003, function() {
    console.log("Listening Socket Connections on Port: 3003");
});