MERN Blog Project

Overview

This is a full-stack blog application built using the MERN (MongoDB, Express, React, Node.js) stack. The application allows users to create, read, update, and delete (CRUD) blog posts, as well as upload images to accompany their posts.

Features

User authentication and authorization using JSON Web Tokens (JWT)
CRUD operations for blog posts
Image upload and storage using Multer and MongoDB GridFS
Responsive design using React and CSS
Server-side rendering using Express and Node.js
Tech Stack

Frontend: React, CSS, JavaScript
Backend: Node.js, Express, MongoDB
Database: MongoDB
Authentication: JSON Web Tokens (JWT)
Image Upload: Multer, MongoDB GridFS
Getting Started

Clone the repository: git clone https://github.com/your-username/mern-blog.git
Install dependencies: npm install
Start the server: npm start
Open the application in your browser: http://localhost:3000
API Endpoints

GET /api/posts: Retrieve a list of all blog posts
GET /api/posts/:id: Retrieve a single blog post by ID
POST /api/posts: Create a new blog post
PUT /api/posts/:id: Update a single blog post by ID
DELETE /api/posts/:id: Delete a single blog post by ID
Image Upload

Use the POST /api/upload endpoint to upload an image
Use the image field in the request body to send the image file
Authentication

Use the POST /api/login endpoint to log in
Use the POST /api/register endpoint to register a new user
Use the GET /api/logout endpoint to log out
License

This project is licensed under the MIT License.

Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

Acknowledgments

MongoDB for providing the MongoDB database
Express for providing the Express framework
React for providing the React library
Node.js for providing the Node.js runtime environment
