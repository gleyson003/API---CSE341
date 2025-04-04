const express = require('express');
const cors = require('cors');
const { connectDB } = require('./data/db');

const app = express();
const bodyParser = require('body-parser');
const swaggerSetup = require("./swagger");

const professionalRoutes = require('./routes/professional');
const contactsRoutes = require('./routes/contacts');
const petsRoutes = require('./routes/pets');

const session = require("express-session");
const passport = require("passport");
require("./auth");
const authRoutes = require("./routes/auth");

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

swaggerSetup(app);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoutes);

// Routes
app.use('/professional', professionalRoutes);
app.use('/contacts', contactsRoutes);
app.use('/pets', petsRoutes);

// Middleware globla error
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Internal server error',
  });
});


app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to CSE341 API</h1>
    <p>Access the API documentation through the link:</p>
    <a href="/api-docs" target="_blank">📄 API documentation</a>
  `);
});

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
