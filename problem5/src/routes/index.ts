import { Application, Request, Response } from 'express'
import resourceRoutes from './resource.routes'
import homeRoutes from './home.routes'

export default class Routes {
  constructor(app: Application) {
    app.use('/home', homeRoutes)
    app.use('/api/resource', resourceRoutes)
    app.use('/hello', (req: Request, res: Response) => {
      res.send('Welcome!')
    })
  }
}
