import Koa from 'koa'
import Serve from 'koa-static'
import { Server } from 'socket.io'

const app = new Koa()
app.use(Serve(__dirname + '/../../client/build'))

const server = app.listen(3001)

const io = new Server(server);

io.on('connection', socket => {
  console.log('Player connected!', socket.id);
});
