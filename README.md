# Project Documentation

## Project Overview
This project is a back-end application designed to showcase authentication functionality with Docker containerization. It includes PostgreSQL for data persistence, and a Node.js backend. The project utilizes environment variables for configuration and includes Docker setup instructions to facilitate both development and production deployments.

## Technology Stack

- **Node.js**: The runtime environment for the backend application.
- **Express.js**: Web framework for building the API.
- **PostgreSQL**: Relational database for storing user data.
- **Docker**: Containerization tool for managing the application and database in isolated environments.
- **Yarn**: Dependency manager for Node.js.

## Docker Setup Instructions

1. **Clone the repository**:
```
git clone https://github.com/cieravio/kuasar-assessment.git
cd kuasar-assessment
```

2. **Build and start containers**
```
docker-compose up -- build
```

3. **Access the application**
The application will be accessible on http://localhost:4000

4. **Stop the containers**
```
docker-compose down
```

## API Documentation

1. **GET** `/api/health`
- Description: Connection health check
- Response:
  - 200 OK
  ```json
  {
    "success": true,
    "message": "Application is healthy and DB is connected"
  }
  ```
  - 500 Internal Server Error
  ```json
  {
    "status": false,
    "message": "Database connection error"
  ```
2. **POST** `/api/register`
- Description: Register a new user
- Request Body:
```json
{
  "username": "test123",
  "email": "test@abc.com",
  "password": "test123"
}
```
- Response:
  - 201 Created:
  ```json
  {
    "success": true,
    "message": "Registration successful"
  }
  ```
  - 400 Bad Request:
  ```json
  {
    "success": false,
    "message": "All fields are required"
  }
  ```
3. **POST** `/api/login`
- Description: Logs in an existing user
- Request Body:
```json
{
  "email": "test@abc.com",
  "password": "test123"
}
```
- Response:
  - 200 OK:
  ```json
  {
    "success": true,
    "message": "Login success"
  }
  ```
  - 400 Bad Request:
  ```json
  {
    "success": false,
    "message": "Email not registered"
  }
  ```
  - 401 Unauthorized:
  ```json
  {
    "success": false,
    "message": "Wrong password"
  }
  ```
4. **PATCH** `/api/user/username`
- Description: Change users' username
- Request Body:
```json
{
  "username": "asdf123"
}
```
- Response:
  - 200 OK
  ```json
  {
    "success": true,
    "message": "Username updated successfully"
  }
  ```
  - 400 Bad Request
  ```json
  {
    "success": false,
    "message": "Username already taken"
  }
  ```
