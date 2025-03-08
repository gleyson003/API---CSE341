const express = require('express');
const app = express();
const { connectDB, getDB } = require('./db');
const cors = require('cors');
const professionalRoutes = require('./routes/professional');


const port = 8080;
app.use(express.json());

app.use(cors());
app.use('/professional', professionalRoutes);

// MongoDb Connection
connectDB().then(() => {
  app.get('/', (req, res) => {
    res.send('API está rodando...');
  });

  app.get('/dados', async (req, res) => {
    try {
      const db = getDB();
      const colecao = db.collection("minhaColecao");
      const dados = await colecao.find().toArray();
      res.json(dados);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar dados" });
    }
  });
});

app.listen(process.env.PORT || port, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
});