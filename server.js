const express = require('express');
const cors = require('cors');
require('dotenv').config();

const weatherHandler = require('./modules/Weather');
const movieHandle = require('./modules/Movies');

const PORT = process.env.PORT;

const app = express();
app.use(cors());

app.get('/', function (req, res){
  res.send('hellllllllooooooo');
});

app.get('/movie', movieHandle );
app.get('/weather', weatherHandler );

app.listen(PORT);