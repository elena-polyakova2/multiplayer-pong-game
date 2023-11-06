let readyPlayerCount = 0;

function listen(io) {
  const pongNamespace = io.of('/pong');

  pongNamespace.on('connection', (socket) => {
    console.log('User connected as ', socket.id);

    //notify when a player found
    socket.on('ready', () => {
      console.log('A player with id# ', socket.id,' is ready to play');

      readyPlayerCount++;
      //check if there is even amount of players
      if(readyPlayerCount % 2 === 0) {
        //broadcast 'start game event' to everyone with the referee id
        pongNamespace.emit('startGame', socket.id)
      }
  });

  //listener to the paddle position
  socket.on('paddleMove', (paddleData) => {
    //broadcast the paddle position to another player
    socket.broadcast.emit('paddleMove', paddleData);
  });

  //broadcast the bal position to non referee player
  socket.on('ballMove', (ballData) => {
    socket.broadcast.emit('ballMove', ballData);
  })
  });
}

module.exports = {
  listen,
};