let readyPlayerCount = 0;

function listen(io) {
  const pongNamespace = io.of('/pong');

  pongNamespace.on('connection', (socket) => {
    let room;

    console.log('User connected as ', socket.id);

    //notify when a player found
    socket.on('ready', () => {
      //group the players into pairs to join a room
      let room = 'room' + Math.floor(readyPlayerCount / 2);
      socket.join(room);
      console.log('A player with id# ', socket.id,' is ready to play');

      readyPlayerCount++;

      //check if there is even amount of players
      if(readyPlayerCount % 2 === 0) {
        //broadcast 'start game event' to everyone in a room with the referee id
        pongNamespace.in(room).emit('startGame', socket.id)
      }
  });

  //listener to the paddle position
  socket.on('paddleMove', (paddleData) => {
    //broadcast the paddle position to another player
    socket.to(room).emit('paddleMove', paddleData);
  });

  //broadcast the bal position to non referee player
  socket.on('ballMove', (ballData) => {
    socket.to(room).emit('ballMove', ballData);
  })
  });

  //update the paddle state at the index of the opponent
socket.on('paddleMove', (paddleData) => {
  const opponentPaddleIndex = 1 - paddleIndex; //toggle 1 into 0 and 0 into 1 (top/bottom)
  paddleX[opponentPaddleIndex] = paddleData.xPosition;
});

//listen to ball movement
socket.on('ballMove', (ballData) => {
  ({ ballX, ballY, score } = ballData);          
});

//disconnection listener
socket.on('disconnect', (reason) => {
  console.log(`Player with id# ${socket.id} was disconnected due to ${reason}.`);
  socket.leave(room);
});
}

module.exports = {
  listen,
};