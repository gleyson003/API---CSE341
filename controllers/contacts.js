const mongodb = require('../db.js');
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


module.exports = { 
  getAll,
  getSingle
};