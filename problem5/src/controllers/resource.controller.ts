import { Request, Response } from 'express'
import { BaseResponseDto } from '../dtos/base-response.dto'
import Resource from '../models/resource.model'
import resourceRepository from '../repositories/resource.repository'

export default class ResourceController {
  async create(req: Request, res: Response) {
    if (!req.body.name || !req.body.description) {
      const response: BaseResponseDto = {
        success: false,
        message: 'Name and description cannot be empty!',
      }
      res.status(400).send(response)
      return
    }

    try {
      const resource: Resource = req.body
      const savedResource = await resourceRepository.save(resource)
      const response: BaseResponseDto<Resource> = {
        success: true,
        message: 'Created a new resource successfully!',
        data: savedResource,
      }
      res.status(201).send(response)
    } catch (err) {
      const response: BaseResponseDto = {
        success: false,
        message: 'Some error occurred while creating the resource.',
      }
      res.status(500).send(response)
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      // Extract query parameters for filtering
      const searchParams: { name?: string; description?: string } = {
        name: req.query.name as string,
        description: req.query.description as string,
      }

      const resources = await resourceRepository.retrieveAll(searchParams)

      const response: BaseResponseDto<Resource[]> = {
        success: true,
        message: 'Retrieved all resources successfully!',
        data: resources,
      }

      res.status(200).send(response)
    } catch (err) {
      const response: BaseResponseDto = {
        success: false,
        message: 'Some error occurred while retrieving resources.',
      }

      res.status(500).send(response)
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id)

    try {
      const resource = await resourceRepository.retrieveById(id)
      if (resource) {
        const response: BaseResponseDto<Resource> = {
          success: true,
          message: 'Resource retrieved successfully!',
          data: resource,
        }
        res.status(200).send(response)
      } else {
        const response: BaseResponseDto = {
          success: false,
          message: `Cannot find Resource with id=${id}.`,
        }
        res.status(404).send(response)
      }
    } catch (err) {
      const response: BaseResponseDto = {
        success: false,
        message: `Error retrieving Resource with id=${id}.`,
      }
      res.status(500).send(response)
    }
  }

  async update(req: Request, res: Response) {
    let resource: Resource = req.body
    resource.id = parseInt(req.params.id)

    try {
      const num = await resourceRepository.update(resource)
      if (num === 1) {
        const response: BaseResponseDto = {
          success: true,
          message: 'Resource was updated successfully.',
        }
        res.send(response)
      } else {
        const response: BaseResponseDto = {
          success: false,
          message: `Cannot update Resource with id=${resource.id}. Maybe Resource was not found or req.body is empty!`,
        }
        res.send(response)
      }
    } catch (err) {
      const response: BaseResponseDto = {
        success: false,
        message: `Error updating Resource with id=${resource.id}.`,
      }
      res.status(500).send(response)
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id)

    try {
      const num = await resourceRepository.delete(id)
      if (num === 1) {
        const response: BaseResponseDto = {
          success: true,
          message: 'Resource was deleted successfully!',
        }
        res.send(response)
      } else {
        const response: BaseResponseDto = {
          success: false,
          message: `Cannot delete Resource with id=${id}. Maybe Resource was not found!`,
        }
        res.send(response)
      }
    } catch (err) {
      const response: BaseResponseDto = {
        success: false,
        message: `Could not delete Resource with id=${id}.`,
      }
      res.status(500).send(response)
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await resourceRepository.deleteAll()
      const response: BaseResponseDto = {
        success: true,
        message: `${num} Resources were deleted successfully!`,
      }
      res.send(response)
    } catch (err) {
      const response: BaseResponseDto = {
        success: false,
        message: 'Some error occurred while removing all resources.',
      }
      res.status(500).send(response)
    }
  }
}
