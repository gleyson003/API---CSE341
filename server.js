const express = require('express');
const { connectDB, getDB } = require('./data/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const professionalRoutes = require('./routes/professional');
const contactsRoutes = require('./routes/contacts');
const petsRoutes = require('./routes/pets');
const swaggerSetup = require("./swagger");

const port = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
swaggerSetup(app);

// Routes
app.use('/professional', professionalRoutes);
app.use('/contacts', contactsRoutes);
app.use('/pets', petsRoutes);

// MongoDb Connection
connectDB().then(() => {
  app.listen(port, () => {
      console.log(`Web Server is listening at port ${port}`);
      console.log("Documentation available at http://localhost:3000/api-docs");
  });
}).catch(error => {
  console.error("Error connecting to the database:", error);
  process.exit(1);
});

