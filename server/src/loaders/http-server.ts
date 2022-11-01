import Koa from 'koa'
import serve from 'koa-static'

export class HttpServer {
  private app: Koa

  constructor() {
    this.app = new Koa()
  }

  public boot() {
    this.initMiddlewares()
    return this.app.listen(3001)
  }

  private initMiddlewares() {
    this.app.use(serve(__dirname + '/../../client/build'))
  }
}
