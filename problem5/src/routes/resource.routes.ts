import { Router } from 'express'
import ResourceController from '../controllers/resource.controller'

class ResourceRoutes {
  router = Router()
  resourceController = new ResourceController()

  constructor() {
    this.intializeRoutes()
  }

  intializeRoutes() {
    // Create a new Resource
    this.router.post('/create', this.resourceController.create)

    // Retrieve all Resources
    this.router.get('/all', this.resourceController.findAll)

    // Retrieve a single Resource with id
    this.router.get('/:id', this.resourceController.findOne)

    // Update a Resource with id
    this.router.put('/:id', this.resourceController.update)

    // Delete a Resource with id
    this.router.delete('/:id', this.resourceController.delete)

    // Delete all Resources
    this.router.delete('/', this.resourceController.deleteAll)
  }
}

export default new ResourceRoutes().router
