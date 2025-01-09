import express, { Application } from 'express'
import Server from './src/index'
import dotenv from 'dotenv'
dotenv.config()

const app: Application = express()
const server: Server = new Server(app)
const PORT: number = process.env.SERVER_PORT
  ? parseInt(process.env.SERVER_PORT, 10)
  : 3000

app
  .listen(PORT, 'localhost', function () {
    console.log(`Server is running on port ${PORT}.`)
  })
  .on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log('Error: address already in use')
    } else {
      console.log(err)
    }
  })
