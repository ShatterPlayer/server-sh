const express = require('express');
const path = require('path');
const routes = require('./routing');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.set('port', process.env.PORT || 8080);

http.listen(app.get('port'), (req, res) =>{
    console.log(`Server listening on ${app.get('port')}`);
});

io.on('connect', (socket) =>{
    console.log(socket.id + ' connected');

    socket.on('message', (msg) =>{
        console.log(socket.id + ': '+ msg);
        io.emit('message server', msg, socket.id);
    });

    socket.on('setName', (name) =>{
        socket.id = name;
    });

    socket.on('disconnect', () =>{
        console.log(socket.id + ' disconnected');
    });
});