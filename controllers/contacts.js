const mongodb = require('../data/db.js');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDB().collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res, next) => {
  const contactId = new ObjectId(req.params.id)
  const result = await mongodb.getDB().collection('contacts').find({ _id: contactId});
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  });
};

const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb.getDB().collection('contacts').insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json({ message: "Contact created sucessfuly!", id: response.insertedId });
    } else {
      res.status(500).json({ error: "Error to create an contact!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb
      .getDB()
      .collection("contacts")
      .replaceOne({ _id: contactId }, contact);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found!" });
    }

    if (response.modifiedCount === 0) {
      return res.status(200).json({
        message: "No changes made. The provided data is identical to the existing record.",
      });
    }

    res.status(200).json({ message: "Contact updated successfully!" });

  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating the contact.", error: error.message });
  }
};


const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDB().collection("contacts").deleteOne({ _id: contactId });

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