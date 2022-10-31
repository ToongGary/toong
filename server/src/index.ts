import Koa from 'koa'
import Serve from 'koa-static'
import { Server } from 'socket.io'

const constants = require('./constants');


const app = new Koa()
app.use(Serve(__dirname + '/../../client/build'))

const server = app.listen(3001)

const io = new Server(server);

io.on('connection', socket => {
  console.log('Player connected!', socket.id);
  socket.on(constants.NETWORK_MESSAGES.JOIN, userJoined);
  socket.on(constants.NETWORK_MESSAGES.USER_INPUT, inputRecieved);
  socket.on('disconnect', userDisconnected);
});

function userDisconnected() {

}

function inputRecieved(input:any) {

}

function userJoined(username:string) {
  console.log('User joined!', username);
}