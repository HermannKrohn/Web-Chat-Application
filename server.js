var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/clientJS.js', function(req, res){
    res.sendFile(__dirname + '/clientJS.js');
});

app.get('/chatStyle.css', function(req, res){
    res.sendFile(__dirname + '/chatStyle.css');
});

io.on('connection', function(socket){
  console.log('User Connected: ' + socket.id);

  socket.on('send message', function(data){
    io.sockets.emit('new message', data);
  });

  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
  });

  socket.on('disconnect', function(){
    console.log('User disconnected: ' + socket.id);
   });
});



http.listen(3000, function(){
  console.log("listening to port 3000");
});
