import Koa from 'koa'
import Serve from 'koa-static'
import { Server, Socket } from 'socket.io'
import Room from './room'
import { InputMessage } from './message_objects';

const constants = require('./constants');


const app = new Koa()
app.use(Serve(__dirname + '/../../client/build'))

const server = app.listen(3001)

const room = new Room() 

const io = new Server(server);

io.on('connection', socket => {
  console.log('Player connected!', socket.id);
  socket.on(constants.NETWORK_MESSAGES.JOIN, userJoined);
  socket.on(constants.NETWORK_MESSAGES.USER_INPUT, inputRecieved);
  socket.on('disconnect', userDisconnected);
});

function userDisconnected() {

}

function inputRecieved(input:InputMessage) {
  console.log(input.move, input.angle);
}

function userJoined(this:Socket, username:string) {
  room.addPlayer(this, username);
  console.log('User joined!', username);
}