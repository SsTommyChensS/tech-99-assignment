import { ResultSetHeader } from 'mysql2'
import connection from '../db'
import Resource from '../models/resource.model'

interface IResourceRepository {
  save(resource: Resource): Promise<Resource>
  retrieveAll(searchParams: {
    name?: string
    description?: string
  }): Promise<Resource[]>
  retrieveById(resourceId: number): Promise<Resource | undefined>
  update(resource: Resource): Promise<number>
  delete(resourceId: number): Promise<number>
  deleteAll(): Promise<number>
}

class ResourceRepository implements IResourceRepository {
  save(resource: Resource): Promise<Resource> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        'INSERT INTO resource (name, description) VALUES(?,?)',
        [resource.name, resource.description],
        (err, res) => {
          if (err) reject(err)
          else
            this.retrieveById(res.insertId)
              .then((resource) => resolve(resource!))
              .catch(reject)
        },
      )
    })
  }

  retrieveAll(searchParams: {
    name?: string
    description?: string
  }): Promise<Resource[]> {
    return new Promise((resolve, reject) => {
      // Base query
      let query = 'SELECT * FROM resource WHERE 1=1'
      const queryParams: any[] = []

      // Add filters dynamically
      if (searchParams.name) {
        query += ' AND name LIKE ?'
        queryParams.push(`%${searchParams.name}%`)
      }
      if (searchParams.description) {
        query += ' AND description LIKE ?'
        queryParams.push(`%${searchParams.description}%`)
      }

      // Execute the query
      connection.query<Resource[]>(query, queryParams, (err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    })
  }

  retrieveById(resourceId: number): Promise<Resource | undefined> {
    return new Promise((resolve, reject) => {
      connection.query<Resource[]>(
        'SELECT * FROM resource WHERE id = ?',
        [resourceId],
        (err, res) => {
          if (err) reject(err)
          else resolve(res?.[0])
        },
      )
    })
  }

  update(resource: Resource): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        'UPDATE resource SET name = ?, description = ? WHERE id = ?',
        [resource.name, resource.description, resource.id],
        (err, res) => {
          if (err) reject(err)
          else resolve(res.affectedRows)
        },
      )
    })
  }

  delete(resourceId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        'DELETE FROM resource WHERE id = ?',
        [resourceId],
        (err, res) => {
          if (err) reject(err)
          else resolve(res.affectedRows)
        },
      )
    })
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>('DELETE FROM resource', (err, res) => {
        if (err) reject(err)
        else resolve(res.affectedRows)
      })
    })
  }
}

export default new ResourceRepository()
