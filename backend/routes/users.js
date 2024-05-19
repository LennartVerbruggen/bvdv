const express = require('express');
const usersRouter = express.Router();
const xlsx = require('xlsx');
const path = require('path');
const generatePairs = require('../service/get-pairs')

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

function removeDuplicates(arr) {
    var uniq = []
    arr.forEach(e => {
        if (!uniq.includes(e)) {
            uniq.push(e);
        }
    })
    return uniq;
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
 *    tags: [Users]
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
    
    if (firstName !== undefined && lastName !== undefined) {
        let name = firstName.concat(" ", lastName)
        const pairs = generatePairs(name);
        res.status(200).json(pairs)
    } else {
        res.send({
            status: 400,
            message: "Could not parse name header"
        })
    }
})


/** 
 * @swagger
 * /users/test:
 *   post:
 *    summary: User has filled in letters, now the test is done
 *    tags: [Users]
 *    description: Calculation of results
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              letters:
 *                type: array
 *                items:
 *                  type: string
 *            required:
 *              - name
 *              - letters
 *    responses:
 *      '200':
 *        description: Test was completed
 */


usersRouter.post('/test', async (req, res) => {
    const {letters, name} = req.body
    const name_array = name.replace(' ', '').split('')
    const uniq_name = removeDuplicates(name_array) 
    
    // Definieer aantal paren
    const eigen_naam_paren = uniq_name.length
    const dummy_paren = 10 - eigen_naam_paren

    let eigen_naam_gekozen = 0
    let vreemde_gekozen = 0

    letters.forEach(letter => {
        if (uniq_name.includes(letter)) {
            eigen_naam_gekozen++
        } else {
            vreemde_gekozen++
        }
    })
    let excel = await read_excel_file();    


    // Find the row where 'Actief' is TRUE
    const activeRow = excel.find(row => row.Actief === true);

    const totaalRow = excel.find(row => row.Groep === 'Totaal')

    // Update de rij als er een actieve rij is, indien niet, stuur melding voor de admin
    if (activeRow) {
        activeRow.Aantal_deelnemers++;
        activeRow.Aantal_letterparen_naam += eigen_naam_paren;
        activeRow.Aantal_letterparen_dummy += dummy_paren;
        activeRow.Totaal_letterparen += 10;
        activeRow.Aantal_eigen_letters_verworpen += eigen_naam_gekozen;
        activeRow.Aantal_vreemde_letters_verworpen += vreemde_gekozen;

        totaalRow.Aantal_deelnemers++;
        totaalRow.Aantal_letterparen_naam += eigen_naam_paren;
        totaalRow.Aantal_letterparen_dummy += dummy_paren;
        totaalRow.Totaal_letterparen += 10;
        totaalRow.Aantal_eigen_letters_verworpen += eigen_naam_gekozen;
        totaalRow.Aantal_vreemde_letters_verworpen += vreemde_gekozen;

        const updated_sheet = xlsx.utils.json_to_sheet(excel);

        update_excel(updated_sheet);

        res.status(200).json({ message: 'Test completed' });
    } else {

        res.status(400).json({ message: 'Contact admin to set a company' });
    
    }
})


// Mock data (replace with actual database queries)
module.exports = usersRouter;