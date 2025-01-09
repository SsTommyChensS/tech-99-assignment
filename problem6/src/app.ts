// app.ts
import express from 'express';
import http from 'http';
import { wss } from './websocket';
import bodyParser from 'body-parser';
import router from './routes'; 

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Create an HTTP server
const server = http.createServer(app);

// Handle WebSocket connections
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// Use the routes from the routes folder
app.use(router);

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
