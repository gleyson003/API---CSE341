const routes = require('express').Router();
const lesson1Controller = require("../controllers/lesson1");

routes.get('/', lesson1Controller.myRoute)

module.exports = routes;