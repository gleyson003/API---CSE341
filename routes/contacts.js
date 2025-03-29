const express = require('express');
const contactsController = require('../controllers/contacts');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const authMiddleware = require("../middlewares/authMiddleware");


/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get a list of contacts
 *     description: Retrieve all contacts from the database.
 *     responses:
 *       200:
 *         description: Contacts list retrieved successfully.
 */
router.get('/', authMiddleware, asyncHandler(contactsController.getAll));

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a single contact by ID
 *     description: Retrieve a contact by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the contact to retrieve.
 *     responses:
 *       200:
 *         description: Contact retrieved successfully.
 *       404:
 *         description: Contact not found.
 */
router.get('/:id', authMiddleware, asyncHandler(contactsController.getSingle));

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     description: Send the necessary data to create a new contact.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Contact created successfully!
 *       400:
 *         description: Invalid input data!
 */
router.post('/', authMiddleware, asyncHandler(contactsController.createContact));

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     description: Update the contact using the unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the contact to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Contact updated successfully!
 *       404:
 *         description: Contact could not be updated!
 */
router.put('/:id', authMiddleware, asyncHandler(contactsController.updateContact));

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     description: Delete a contact using the unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the contact to delete.
 *     responses:
 *       200:
 *         description: Contact deleted successfully.
 *       404:
 *         description: Contact could not be found.
 */
router.delete('/:id', authMiddleware, asyncHandler(contactsController.deleteContact));

module.exports = router;
