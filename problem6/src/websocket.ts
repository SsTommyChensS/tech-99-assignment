// websocket.ts
import { WebSocketServer } from 'ws';

// Create a WebSocket server instance
export const wss = new WebSocketServer({ noServer: true });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('New WebSocket client connected');

  // When the server receives a message from a client, log it
  ws.on('message', (message: string) => {
    console.log(`Received message: ${message}`);
  });

  // Send a welcome message to the new WebSocket client
  ws.send(JSON.stringify({ message: 'Welcome to the WebSocket server!' }));
});
