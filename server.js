const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = 3000;

server.listen(PORT);
console.log(`Listening on port ${PORT}...`);

let readyPlayerCount = 0;

io.on('connection', (socket) => {
  console.log('User connected as ', socket.id);

  //notify when a player found
  socket.on('ready', () => {
    console.log('A player with id# ', socket.id,' is ready to play');

    readyPlayerCount++;

    if(readyPlayerCount === 2) {
      //broadcast 'start game event' to everyone with the referree id
      io.emit('startGame', socket.id)

    }
  })
});
