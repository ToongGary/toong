import Koa from 'koa'
import Serve from 'koa-static'

const app = new Koa()
app.use(Serve(__dirname + '/../../client/build'))

app.listen(3000)
