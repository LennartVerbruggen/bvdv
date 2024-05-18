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

module.exports = adminRouter;