const express = require('express');
const usersRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints related to users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *     tags:
 *       - Users
 */

usersRouter.get('/', async (req, res) => {
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Bob Johnson' },
      ];

    res.status(200).json(users);

});


/** 
 * @swagger
 * /users/register:
 *   post:
 *    summary: Register a user for name test
 *    description: sets up test for user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              company:
 *                type: string
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *                format: password
 *              confirmPassword:
 *                type: string
 *                format: password
 *            required:
 *              - company
 *              - firstName
 *              - lastName
 *              - email
 *              - password
 *              - confirmPassword
 *    responses:
 *      '200':
 *        description: User registered successfully
 *      '400':
 *        description: Invalid input or passwords do not match
 */


usersRouter.post('/register', async (req, res) => {
    // Perform user registration logic here
    const data = req.body
    console.log(data)

    res.status(200).json({ message: 'User registered successfully' });
})

// Mock data (replace with actual database queries)
module.exports = usersRouter;