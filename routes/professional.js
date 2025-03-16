const express = require('express');

const professionalController = require('../controllers/professional');

const router = express.Router();

/**
 * @swagger
 * /professional:
 *   get:
 *     summary: Get a professional
 *     description: Retrieve information about the first professional.
 *     responses:
 *       200:
 *         description: Professional informations retrieved successfully.
*/
router.get('/', professionalController.getData);

module.exports = router;