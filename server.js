const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
const weatherData = require ('./data/weather.json')


require('dotenv').config();
const PORT = process.env.PORT
// a server endpoint 

app.use(cors()) // after you initialize your express app instance

app.get('/', // our endpoint name
function  (req, res) { // callback function of what we should do with our request
  res.send('Hello World') // our endpoint function response
});

 app.get('/weather', function (req,res) {
   const responseData = weatherData.data.map(element => new Weather (element));
    res.json(responseData)
});

// modal : data how data look 
class Weather {
  constructor(data){
    this.description = data.weather.description;
    this.date = data.valid_date;
  }
}

// kick start the express server to work
app.listen(PORT , ()=>{
  console.log(`server started on ${PORT}`)
});