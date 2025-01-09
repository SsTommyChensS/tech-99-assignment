import { RowDataPacket } from 'mysql2'

export default interface Resource extends RowDataPacket {
  id?: number
  name?: string
  description?: string
  createdAt?: Date
  updatedAt?: Date
}
