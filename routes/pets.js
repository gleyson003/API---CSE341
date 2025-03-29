const express = require('express');
const petsController = require('../controllers/pets');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const authMiddleware = require("../middlewares/authMiddleware");


/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Get a list of pets
 *     description: Retrieve all pets from the database.
 *     responses:
 *       200:
 *         description: Pets list retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The pet's unique ID.
 *                   name:
 *                     type: string
 *                     description: The name of the pet.
 *                   favoriteFood:
 *                     type: string
 *                     description: The pet's favorite food (optional).
 *                   birthday:
 *                     type: string
 *                     description: The pet's birthday.
 *                   tutor_id:
 *                     type: string
 *                     description: The ID of the pet's tutor (optional).
*/
router.get('/', asyncHandler(petsController.getAll));

/**
 * @swagger
 * /pets/{id}:
 *   get:
 *     summary: Get a single Pet by ID
 *     description: Retrieve a Pet by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Pet to retrieve.
 *     responses:
 *       200:
 *         description: Pet retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The pet's unique ID.
 *                 name:
 *                   type: string
 *                   description: The name of the pet.
 *                 favoriteFood:
 *                   type: string
 *                   description: The pet's favorite food (optional).
 *                 birthday:
 *                   type: string
 *                   description: The pet's birthday.
 *                 tutor_id:
 *                   type: string
 *                   description: The ID of the pet's tutor (optional).
 *       404:
 *         description: Pet not found.
*/
router.get('/:id', asyncHandler(petsController.getSingle));

/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Create a new pet
 *     description: Send the necessary data to create a new pet.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The pet's name.
 *               favoriteFood:
 *                 type: string
 *                 description: The pet's favorite food (optional).
 *               birthday:
 *                 type: string
 *                 description: The pet's birthday. (Required)
 *               tutor_id:
 *                 type: string
 *                 description: The ID of the pet's tutor (optional).
 *     required:
 *       - name
 *       - birthday
 *     responses:
 *       201:
 *         description: Pet created successfully!
 *       400:
 *         description: Invalid input data!
*/
router.post('/', authMiddleware, asyncHandler(petsController.createPet));

/**
 * @swagger
 * /pets/{id}:
 *   put:
 *     summary: Update a pet information
 *     description: Update the pet's information using the unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the pet to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The pet's name.
 *               favoriteFood:
 *                 type: string
 *                 description: The pet's favorite food (optional).
 *               birthday:
 *                 type: string
 *                 description: The pet's birthday. (Required)
 *               tutor_id:
 *                 type: string
 *                 description: The ID of the pet's tutor (optional).
 *     required:
 *       - birthday
 *     responses:
 *       200:
 *         description: Pet updated successfully!
 *       404:
 *         description: Pet not found.
*/
router.put('/:id', authMiddleware, asyncHandler(petsController.updatePet));

/**
 * @swagger
 * /pets/{id}:
 *   delete:
 *     summary: Delete a pet
 *     description: Delete a pet using the unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the pet to delete.
 *     responses:
 *       200:
 *         description: Pet deleted successfully.
 *       404:
 *         description: Pet not found.
*/
router.delete('/:id', authMiddleware, asyncHandler(petsController.deletePet));

module.exports = router;
