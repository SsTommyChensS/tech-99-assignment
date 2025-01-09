# Problem6 - WebSocket & Express with TypeScript

This is a sample Node.js project that uses Express, WebSocket, and TypeScript to demonstrate handling WebSocket connections and JWT-based authentication. It also provides API endpoints for login and scoreboard updates with live WebSocket integration.

## Prerequisites

Before you begin, ensure you have the following installed:
Node.js (version 16 or higher)
npm (comes with Node.js)

---

## Installation

### 1. Clone the repository

git clone <repository-url>
cd problem6

### 2. Install dependencies

npm install

## Development

npm start

This command will run nodemon, which watches for file changes and restarts the server using ts-node. The application will run on port 3000.

## Routes and WebSocket Integration

POST /auth/login: Authenticates the user and generates a JWT token.
POST /scoreboard/update: Updates the user's score (requires JWT authentication).
GET /scoreboard: Retrieves the top scores.
WebSocket: WebSocket connections are handled at ws://localhost:3000, where clients can send and receive messages.

## Usage

### WebSocket Client Example 
You can test the WebSocket connection with the following example:

```
const socket = new WebSocket('ws://localhost:3000');

socket.onopen = () => {
  console.log('Connected to WebSocket server');
  socket.send(JSON.stringify({ message: 'Hello Server' }));
};

socket.onmessage = (event) => {
  console.log('Received message: ', event.data);
};

socket.onclose = () => {
  console.log('Disconnected from WebSocket server');
};
```

### Authentication Example: 
To authenticate and receive a JWT token, make a POST request to the /auth/login route with the username and password in the body:

```
{
  "username": "user1",
  "password": "password123"
}
```

You will receive a token in the response:

```
{
  "accessToken": "<JWT_TOKEN>"
}
```

Pass the token as a Bearer token in the Authorization header when calling other routes.

### Scoreboard Update Example 
To update a user's score, make a POST request to the /scoreboard/update route with the Authorization header:

``` 
Authorization: Bearer <JWT_TOKEN>
```

The request body should contain the score information:

```
{
  "username": "user1",
  "score": 30
}
```

### Retrieve Top Scores
To retrieve the top scores, make a GET request to /scoreboard:

``` 
GET /scoreboard
```