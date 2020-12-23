const express = require('express')
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const userRoute = require('./routes/users');
const loginRoute = require('./routes/login')
const userNameRoute = require('./routes/username');

// Middleware for route
app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use('/username', userNameRoute);

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewParser: true }, () => {
    console.log('You are connected to the DB');
  }

)

app.listen(port);