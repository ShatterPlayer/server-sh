const express = require('express');
const app = express();
const path = require('path');

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('port', process.env.PORT || 8080);
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

var players = {};

io.on('connection', (socket) =>{
    players[socket.id] = {
        x: 30,
        y: 30
    };

    socket.on('move', (move) =>{
        var player = players[socket.id];
        if(move.up && player.y>=15)
            player.y -= 5;
        if(move.down && player.y<=585)
            player.y += 5;
        if(move.left && player.x>=15)
            player.x -= 5;
        if(move.right && player.x<=785)
            player.x += 5;
    });

    socket.on('disconnect', () =>{
        delete players[socket.id];
    });

    setInterval(function(){
        io.emit('server', players);
    }, 1000/60);
});
 

http.listen(app.get('port'), () =>{
    console.log(`Server listening on ${app.get('port')}`);
});