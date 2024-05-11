// app.js

const express = require('express');
const swaggerSetup = require('./swagger');

const app = express();

// Initialize Swagger
swaggerSetup(app);

// Define your routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the Express server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Visit http://localhost:3001/api-docs to access the swagger ui`)
});
