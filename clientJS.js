

  var socket = io.connect('http://localhost:3000');


  var message = document.getElementById('messageBox');
  var userName = document.getElementById('username');
  var output = document.getElementById('chat_space');
  var typer = document.getElementById('typer_space');
  var btn = document.getElementById('sendButton');


  btn.addEventListener('click', function(){
    socket.emit('send message', {
      message: message.value,
      userName: userName.value
    });
    message.value='';
  });


  message.addEventListener('keypress', function(){
    socket.emit('typing', userName.value);
  });


  socket.on('new message', function(data){
    typer.innerHTML='';//test this line when pressing button
    output.innerHTML += '<p><strong>' + data.userName + ': </strong>' + data.message + '</p>';
  });


  socket.on('typing', function(data){
    typer.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
  });
