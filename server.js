const express = require('express');
const app = express();
const { connectDB, getDB } = require('./db');
const cors = require('cors');
const professionalRoutes = require('./routes/professional');
const contactsRoutes = require('./routes/contacts');



const port = 8080;
app.use(express.json());

app.use(cors());
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
});