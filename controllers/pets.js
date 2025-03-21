const ObjectId = require('mongodb').ObjectId;
const Pet = require("../models/pet");
const mongoose = require('mongoose');
const db = mongoose.connection.useDb('users');

const getAll = async (req, res, next) => {
  try {
    const result = await db.collection('pets').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: `Error fetching pets: ${error.message}` });
  }
};

const getSingle = async (req, res, next) => {
  try {
    const petId = new ObjectId(req.params.id);
    const result = await db.collection('pets').find({ _id: petId }).toArray();
    
    if (result.length === 0) {
      return res.status(404).json({ message: "Pet not founded!" });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: `Error fetching pet: ${error.message}` });
  }
};

const createPet = async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.validate();
    const savedPet = await db.collection('pets').insertOne(pet);
    res.status(201).json({ message: "Pet created successfully!", pet: savedPet });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: `Error creating pet: ${error.message}` });
  }
};

const updatePet = async (req, res) => {
  try {
    const updatedPet = await db.collection('pets').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: 'after', runValidators: true }
    );

    if (!updatedPet) {
      return res.status(404).json({ message: "Pet not found!" });
    }

    res.status(200).json({ message: "Pet updated successfully!", pet: updatedPet.value });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: `Error updating pet: ${error.message}` });
  }
};

const deletePet = async (req, res) => {
  try {
    const petId = new ObjectId(req.params.id);
    const response = await db.collection("pets").deleteOne({ _id: petId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Pet not found. No deletion performed." });
    }

    res.status(200).json({ message: "Pet deleted successfully." });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the pet.",
      error: error.message
    });
  }
};

module.exports = { 
  getAll,
  getSingle,
  createPet,
  updatePet,
  deletePet
};
