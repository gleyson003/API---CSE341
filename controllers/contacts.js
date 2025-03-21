const mongodb = require('../data/db.js');
const ObjectId = require('mongodb').ObjectId;
const Contact = require("../models/contact");
const mongoose = require('mongoose');
const db = mongoose.connection.useDb('users');

const getAll = async (req, res, next) => {
  try {
    const result = await db.collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: `Error fetching contacts: ${error.message}` });
  }
};

const getSingle = async (req, res, next) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await db.collection('contacts').find({ _id: contactId }).toArray();
    
    if (result.length === 0) {
      return res.status(404).json({ message: "Contact not found!" });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: `Error fetching contact: ${error.message}` });
  }
};

const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.validate();
    const savedContact = await db.collection('contacts').insertOne(contact);  // Insere o novo contato na coleção 'contacts'
    res.status(201).json({ message: "Contact created successfully!", contact: savedContact });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: `Error creating contact: ${error.message}` });
  }
};

const updateContact = async (req, res) => {
  try {
    const updatedContact = await db.collection('contacts').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: 'after', runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found!" });
    }

    res.status(200).json({ message: "Contact updated successfully!", contact: updatedContact.value });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: `Error updating contact: ${error.message}` });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const response = await db.collection("contacts").deleteOne({ _id: contactId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found. No deletion performed." });
    }

    res.status(200).json({ message: "Contact deleted successfully." });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the contact.",
      error: error.message
    });
  }
};

module.exports = { 
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
