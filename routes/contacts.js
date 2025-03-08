const express = require('express');

const contactsController = require('../controllers/contacts');

const router = express.Router();

// GET /feed/posts
router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);

module.exports = router;