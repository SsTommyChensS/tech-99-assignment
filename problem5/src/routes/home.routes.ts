import { Router } from 'express'
import HomeController from '../controllers/home.controller'

// Define and export the route class
class HomeRoutes {
  router = Router()
  controller = new HomeController()

  constructor() {
    this.intializeRoutes()
  }

  intializeRoutes() {
    this.router.get('/', this.controller.checkStatus)
  }
}

export default new HomeRoutes().router // Export the router instance
