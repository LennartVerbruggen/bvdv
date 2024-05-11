const express = require('express');
const usersRouter = express.Router();
const xlsx = require('xlsx');
const path = require('path');


const read_excel_file = async () => {

    const filePath = path.join(__dirname, '..', 'Data', 'data.xlsx');

    // Load Excel file
    const workbook = xlsx.readFile(filePath);

    // Assuming the first sheet is the one you want to read from
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Parse Excel data to JSON format
    const data = xlsx.utils.sheet_to_json(sheet);

    return data
}

const update_excel = (updated_sheet) => {
    
    const filePath = path.join(__dirname, '..', 'Data', 'data.xlsx');

    // Load Excel file
    const workbook = xlsx.readFile(filePath);

    // Assuming the first sheet is the one you want to read from
    const sheetName = workbook.SheetNames[0];

    workbook.Sheets[sheetName] = updated_sheet

    xlsx.writeFile(workbook, filePath);

}

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
    const {company, firstName, lastName} = req.body

    let excel = await read_excel_file();    

    console.log(excel)

    const companyExists = excel.some(entry => entry.Groep === company);

    if (!companyExists) {
        const newEntry = {
            Groep: company,
            Aantal_deelnemers: 100, // Example value for participants
            Aantal_letterparen_naam: 1000, // Example value for letter pairs in name
            Aantal_letterparen_dummy: 0,
            Totaal_letterparen: 1000, // Example total letter pairs
            Aantal_eigen_letters_verworpen: 300, // Example value for rejected letters
            Aantal_vreemde_letters_verworpen: 500, // Example value for rejected foreign letters
            Significantie: 0.05, // Example significance value
            Actief: true // Example active status
        }

        excel.push(newEntry);

        const updated_sheet = xlsx.utils.json_to_sheet(excel);

        update_excel(updated_sheet);
    }

    res.status(200).json({ message: 'User registered successfully' });
})

// Mock data (replace with actual database queries)
module.exports = usersRouter;