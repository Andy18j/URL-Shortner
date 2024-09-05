# URL-Shortner


Certainly! Here's a sample README file that provides an overview of your URL Shortener API project. 
It includes sections for project setup, usage, and a brief overview of the routes and middleware.

URL Shortener API
Overview
This project is a simple URL Shortener API built using Node.js, Express, and MongoDB. It provides endpoints for user registration, login, URL shortening, and URL redirection. The API is protected using JWT authentication.

Run the application - npm run server 


API Documentation
The API documentation is available at http://localhost:8000/api-docs and provides details on how to use the endpoints.

Endpoints
User Routes
Register a New User

Endpoint: /api/users/signup
Method: POST
Request Body:
json
Copy code
{
  "username": "johndoe",
  "password": "password123"
}
Responses:
200 OK - Successfully registered
401 Unauthorized - User already exists
Login

Endpoint: /api/users/login
Method: POST
Request Body:
json
Copy code
{
  "username": "johndoe",
  "password": "password123"
}

Responses:
200 OK - Successfully logged in, returns JWT token
401 Unauthorized - Invalid credentials
URL Shortener Routes
Shorten a URL

Endpoint: /api/urls/shorten
Method: POST
Headers:
x-auth-token: <your-jwt-token-here>
Request Body:
json
Copy code
{
  "originalUrl": "https://www.example.com/very-long-url"
}
Responses:
200 OK - Successfully shortened URL
500 Internal Server Error - Error processing request
Redirect to Original URL

Endpoint: /api/urls/{shortUrl}
Method: GET
Parameters:
shortUrl - The shortened URL code
Responses:
302 Found - Redirects to the original URL
404 Not Found - URL not found
500 Internal Server Error - Error processing request

Middleware
Authentication Middleware
File: auth/middleware.js
Function: auth
Description: Validates JWT tokens and attaches user information to the request.

Swagger Documentation
The Swagger documentation is configured to provide interactive API documentation. It allows you to view the available endpoints and test them directly from the browser.

Swagger UI: http://localhost:8000/api-docs

deployment_link = https://url-shortner-ospo.onrender.com/

Troubleshooting
"No token, authorization denied" Error: Ensure that you include a valid JWT token in the x-auth-token header for authenticated endpoints.
"URL not found" Error: Verify that the shortUrl parameter in the request is correct and corresponds to an existing shortened URL.