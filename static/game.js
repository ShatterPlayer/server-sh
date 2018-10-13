var socket = io();

$(document).ready(function () {

    var move = {
        up: false,
        down: false,
        left: false,
        right: false
    }

    socket.emit('new');

    $(document).keydown(function(e){
        if(e.key === 'w')
            move.up = true;
        if(e.key === 's')
            move.down = true;
        if(e.key === 'a')
            move.left = true;
        if(e.key === 'd')
            move.right = true;
    });

    $(document).keyup(function(e){
        if(e.key === 'w')
            move.up = false;
        if(e.key === 's')
            move.down = false;
        if(e.key === 'a')
            move.left = false;
        if(e.key === 'd')
            move.right = false;
    });

    var canvas = document.getElementById('canvas');
    canvas.width = 800;
    canvas.height = 600;

    var context = canvas.getContext('2d');

    socket.on('server', (players) =>{
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'green';

        for (var id in players)
        {
            var player = players[id];

            context.beginPath();
            context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
            context.fill();
        }
    });

    setInterval(function(){
        socket.emit('move', move);
    }, 1000/60);
});