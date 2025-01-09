import { Request, Response } from 'express'

export default class HomeController {
  checkStatus(req: Request, res: Response) {
    res.status(200).send({
      success: true,
      message: "This server's available!",
    })
  }
}
