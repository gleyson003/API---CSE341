const express = require('express');
const { connectDB, getDB } = require('./data/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const professionalRoutes = require('./routes/professional');
const contactsRoutes = require('./routes/contacts');
const swaggerSetup = require("./swagger");

const port = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
swaggerSetup(app);

// Routes
app.use('/professional', professionalRoutes);
app.use('/contacts', contactsRoutes);

// MongoDb Connection
connectDB().then(() => {
  app.get('/', (req, res) => {
    res.send('Start API...');
  });

  app.get('/dados', async (req, res) => {
    try {
      const db = getDB();
      const collection = db.collection("minhaColecao");
      const data = await collection.find().toArray();
      res.json(data);
    } catch (error) {
      res.status(500).json({ erro: "Error to get data" });
    }
  });
});

app.listen(process.env.PORT || port, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
  console.log("Documentation available in http://localhost:3000/api-docs");
});