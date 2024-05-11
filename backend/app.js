// app.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const swaggerSetup = require('./swagger');
const usersRouter = require('./routes/users');

const app = express();
app.use(cors({ origin: 'http://localhost:8080' }));


const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Express API with Swagger',
        version: '1.0.0',
        description: 'A simple Express API with Swagger documentation',
      },
      servers: [
        {
          url: 'http://localhost:3001', // The base URL of your API
        },
      ],
    },
    apis: ['./routes/*.js'], // Path to your API routes
  };
  
  const specs = swaggerJsdoc(options);

// Initialize Swagger
swaggerSetup(app);

// Use the users router
app.use('/users', usersRouter);

// Define your routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});


module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  };

// Start the Express server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Visit http://localhost:3001/api-docs to access the swagger ui`)
});
