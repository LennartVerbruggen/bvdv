const express = require('express');
const adminRouter = express.Router();
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
 *   name: Admin
 *   description: API endpoints related to users
 */


/**
 * @swagger
 * /admin/groups:
 *   get:
 *     summary: Get all groups
 *     description: Retrieve a list of all groups
 *     responses:
 *       '200':
 *         description: A list of groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *     tags:
 *       - Admin
 */

adminRouter.get('/groups', async (req, res) => {
    
    let excel = await read_excel_file()

    // Get all the group names and store in a list
    let groups = []
    excel.forEach(row => {
        groups.push(row['Groep'])
    })

    res.status(200).json(groups);

});


/** 
 * @swagger
 * /admin/active:
 *   post:
 *    summary: Admin sets active group
 *    tags: [Admin]
 *    description: Setting active group
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              groep:
 *                type: string
 *            required:
 *              - groep
 *    responses:
 *      '200':
 *        description: Groep set as active
 *      '400':
 *        description: Groep not found
 */

adminRouter.post('/active', async (req, res) => {
    const groep = req.body.groep

    console.log(groep)

    try {
        let excel = await read_excel_file();

        // Find the currently active row
        let currentActiveIndex = excel.findIndex(row => row.Actief === true);

        // Find the row with the specified groep
        let groepIndex = excel.findIndex(row => row.Groep === groep);

        if (groepIndex !== -1) {
            // Set isActive to true for the specified groep
            excel[groepIndex].Actief = true;

            // Set isActive to false for the previously active groep, if different
            if (currentActiveIndex !== -1 && currentActiveIndex !== groepIndex) {
                excel[currentActiveIndex].Actief = false;
            }

            const updated_sheet = xlsx.utils.json_to_sheet(excel)

            // Write the updated data back to the Excel file
            update_excel(updated_sheet);

            res.status(200).json(`${groep} is nu actief`);
        } else {
            res.status(400).json(`${groep} niet gevonden`);
        }
    } catch (error) {
        console.error('Error updating group activation:', error);
        res.status(500).send('Internal server error.');
    }
})

/** 
 * @swagger
 * /admin/create:
 *   post:
 *    summary: Admin creates group
 *    tags: [Admin]
 *    description: Admin creates a group
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              groep:
 *                type: string
 *            required:
 *              - groep
 *    responses:
 *      '200':
 *        description: Groep is created
 *      '400':
 *        description: Groep already exists
 */

adminRouter.post('/create', async (req, res) => {
    const groep = req.body.groep

    try {
        let excel = await read_excel_file();

        // Find the row with the specified groep
        let groepIndex = excel.findIndex(row => row.Groep === groep);

        if (groepIndex === -1) {
            // Add a new row for the new groep
            excel.push({
                Groep: groep,
                Aantal_deelnemers: 0,
                Aantal_letterparen_naam: 0,
                Aantal_letterparen_dummy: 0,
                Totaal_letterparen: 0,
                Aantal_eigen_letters_verworpen: 0,
                Aantal_vreemde_letters_verworpen: 0,
                Significantie: 0.05,
                Actief: false
            });

            const updated_sheet = xlsx.utils.json_to_sheet(excel)

            // Write the updated data back to the Excel file
            update_excel(updated_sheet);

            res.status(200).json(`${groep} is aangemaakt`);
        } else {
            res.status(400).json(`${groep} bestaat al`);
        }
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).send('Internal server error.');
    }
})

module.exports = adminRouter;