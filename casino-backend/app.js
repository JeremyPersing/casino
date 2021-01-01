const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const userRoute = require('./routes/users');
const loginRoute = require('./routes/login')
const userNameRoute = require('./routes/username');

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

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

app.listen(process.env.PORT || 5000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});