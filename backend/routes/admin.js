const express = require('express');
const adminRouter = express.Router();
const xlsx = require('xlsx');
const path = require('path');
const jStat = require('jstat');
const ttest = require('@stdlib/stats-ttest');


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
 * /admin/activegroep:
 *   get:
 *     summary: Get the active group
 *     description: Retrieve the name of the active group
 *     responses:
 *       '200':
 *         description: A group name
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *     tags:
 *       - Admin
 */

adminRouter.get('/activegroep', async (req, res) => {
    try {
        let excel = await read_excel_file();

        // Assuming 'excel' is an array of rows, and each row is an object
        const activeRow = excel.find(row => row.Actief === true);

        if (activeRow) {
            res.status(200).json({ groep: activeRow.Groep });
        } else {
            res.status(404).json({ message: 'No active group found' });
        }
    } catch (error) {
        console.error('Error reading Excel file:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

});


/**
 * @swagger
 * /admin/statistics/{groep}:
 *   get:
 *     summary: Get the statistics
 *     description: Retrieve the data from the requested groep
 *     parameters:
 *       - in: path
 *         name: groep
 *         required: true
 *         description: The name from the group from which stats need to be retrieved.
 *         schema:
 *          schema:
 *            type: object
 *            properties:
 *              groep:
 *                type: string
 *            required:
 *              - groep
 *     responses:
 *       '200':
 *         description: A list of statistics objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Groep:
 *                     type: string
 *                     description: The name of the group
 *                   Aantal_deelnemers:
 *                     type: integer
 *                     description: The number of participants
 *                   Aantal_letterparen_naam:
 *                     type: integer
 *                     description: The number of letter pairs in the name
 *                   Aantal_letterparen_dummy:
 *                     type: integer
 *                     description: The number of letter pairs in the dummy
 *                   Totaal_letterparen:
 *                     type: integer
 *                     description: The total number of letter pairs
 *                   Aantal_eigen_letters_verworpen:
 *                     type: integer
 *                     description: The number of own letters rejected
 *                   Aantal_vreemde_letters_verworpen:
 *                     type: integer
 *                     description: The number of foreign letters rejected
 *                   Significantie:
 *                     type: number
 *                     format: float
 *                     description: The significance value
 *                   Actief:
 *                     type: boolean
 *                     description: Whether the group is active
 *     tags:
 *       - Admin
 */

adminRouter.get('/statistics/:groep', async (req, res) => {

    const groep = req.params.groep

    try {
        let excel = await read_excel_file();

        // Assuming 'excel' is an array of rows, and each row is an object
        const activeRow = excel.find(row => row.Groep === groep);
        const totRow = excel.find(row => row.Groep === 'Totaal')

        const population_vreemde_letters = Array(totRow.Aantal_vreemde_letters_verworpen).fill(totRow.Aantal_vreemde_letters_verworpen);
        const sample_eigen_letters = Array(10) 
        sample_eigen_letters.fill(activeRow.Aantal_eigen_letters_verworpen);

        const sample_vreemde_letters = Array(10)
        sample_vreemde_letters.fill(activeRow.Aantal_vreemde_letters_verworpen);

        console.log(sample_eigen_letters)
        console.log(sample_vreemde_letters)

        const vreemde_letters_ttest = ttest(
            sample_eigen_letters, sample_vreemde_letters
        ).pValue;

        if (vreemde_letters_ttest <= 0.01) {
            activeRow.Significantie = 0.01;
        } else if (vreemde_letters_ttest <= 0.05) {
            activeRow.Significantie = 0.05;
        } else if (vreemde_letters_ttest <= 0.1) {
            activeRow.Significantie = 0.1;
        } else {
            activeRow.Significantie = 'NS'
        }
        console.log('T-test for Aantal_vreemde_letters_verworpen:', vreemde_letters_ttest);

        if (activeRow) {
            res.status(200).json({ groep: activeRow, totaal: totRow});
        } else {
            res.status(404).json({ message: `Groep bestaat niet` });
        }
    } catch (error) {
        console.error('Error reading Excel file:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

});

/** 
 * @swagger
 * /admin/activate:
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

adminRouter.post('/activate', async (req, res) => {
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

/** 
 * @swagger
 * /admin/delete:
 *   delete:
 *    summary: Admin deletes group
 *    tags: [Admin]
 *    description: Admin deletes a group
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
 *        description: Groep is deleted
 *      '400':
 *        description: Groep doesn't exists
 */

adminRouter.delete('/delete', async (req, res) => {
    const groep = req.body.groep

    try {
        let excel = await read_excel_file();

        // Find the index of the row where Groep is equal to the provided groep
        const rowIndex = excel.findIndex(row => row.Groep === groep);

        if (rowIndex === -1) {
            return res.status(400).json(`${groep} bestaat niet`);
        }

        // Remove the row from the excel array
        excel.splice(rowIndex, 1);

        const updated_sheet = xlsx.utils.json_to_sheet(excel)

        // Write the updated data back to the Excel file
        update_excel(updated_sheet);

        res.status(200).json(`${groep} is verwijderd`);
        
    } catch (error) {
        console.error('Error deleting group:', error);
        res.status(500).send('Internal server error.');
    }
})


/**
 * @swagger
 * /download-excel:
 *   get:
 *     summary: Download an Excel file
 *     description: Endpoint to download an Excel file
 *     responses:
 *       200:
 *         description: File downloaded successfully
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Internal Server Error
 */

adminRouter.get('/download-excel', (req, res) => {
    console.log('Downloading')
    const filePath = path.join(__dirname, '../Data/data.xlsx');
    console.log(filePath)
    res.download(filePath, 'letter_data.xlsx', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
      }
    });
  });


module.exports = adminRouter;