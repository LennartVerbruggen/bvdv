// app.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const router = express.Router();
const swaggerSetup = require('./swagger');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');

var bodyParser = require('body-parser')

const app = express();

// Function to send an email with the Excel file
const sendEmail = async () => {

  const filePath = path.join(__dirname, 'Data/data.xlsx');

  // Read the file
  const fileContent = fs.readFileSync(filePath);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // or 'STARTTLS'
    auth: {
      user: 'bvdvapp@gmail.com',
      pass: 'iyjiqllmpqavvyxe',
    },
  });

  const mailOptions = {
    from: 'bvdvapp@gmail.com',
    to: 'lennart.verbruggen@hotmail.com, toon.van.criekinge@gmail.com',
    subject: 'Daily Status Report',
    text: 'Please find the attached status report.',
    attachments: [
      {
        filename: 'data.xlsx',
        content: fileContent,
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Schedule the task to run every day at 8:00 AM
cron.schedule('0 10 */2 * *', async () => {
  console.log('Running daily status update task');
  sendEmail();
});

console.log('Cron job scheduled');

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Express API with Swagger',
        version: '1.0.0',
        description: 'A simple Express API with Swagger documentation',
      }
    },
    apis: ['./routes/*.js'], // Path to your API routes
  };
  
const specs = swaggerJsdoc(options);

app.use(cors());
app.use(bodyParser.json())

// Initialize Swagger 
swaggerSetup(app);

// Use the users router
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// Define your routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});


module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  };

// Start the Express server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Visit http://localhost:3000/api-docs to access the swagger ui`)
});
