# Problem5: Build a RESTful API using Express, TypeScript, and MySQL

This project is a RESTful API built using **Express.js**, **TypeScript**, and **MySQL**. It provides endpoints to interact with a MySQL database for managing resources.

## Features

- Express.js server with TypeScript for better type safety
- MySQL database integration
- Prettier for code formatting
- Environment variables managed via `dotenv`

---

## Requirements

- **Node.js**: >= 16.0.0
- **npm**: >= 8.0.0
- **MySQL**: Running locally or in a hosted environment

---

## Getting Started

### 1. Clone the repository

git clone <repository-url>
cd problem5

### 2. Install dependencies

npm install

### 3. Configure environment variables
You will find a .env.example file in the root directory. To set up your environment variables, copy the contents of this file into a new file named .env:

cp .env.example .env

Replace MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, and MYSQL_DB with your own database configuration.
Set SERVER_PORT to the port number you want the server to listen on (default is 3000)

### 4. Set up the database
Execute the following SQL script in your MySQL server to set up the database and seed initial data:
(You can change your own database name)

<!-- CREATE DATABASE tech_99;

USE tech_99;

CREATE TABLE resources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO resources (name, description) VALUES 
('Resource 1', 'Description for Resource 1'),
('Resource 2', 'Description for Resource 2'),
('Resource 3', 'Description for Resource 3'); -->

### 5. Build and run the application
Build the application: npm run start
Run the application in development mode: npm run dev
Run the application in production mode: npm start

The server will start at http://localhost:3000 by default (or the port specified in the .env file).

## Some API Endpoints

| Method | Endpoint               | Description                          |
|--------|------------------------|--------------------------------------|
| GET    | /api/resource/all      | Retrieve all resources               |
| POST   | /api/resource          | Create a new resource                |
| PUT    | /api/resource/:id      | Update a resource by ID              |
| DELETE | /api/resource/:id      | Delete a resource by ID              |

## Health Check Endpoint

| Method | Endpoint               | Description                          |
|--------|------------------------|--------------------------------------|
| GET    | /home                  | Check the server's health            |
