const superagent = require('superagent');
require('dotenv').config();


const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;

class Weather {
    constructor(dataCons) {
      this.date = dataCons.valid_date;
      this.description = dataCons.weather.description
    }
  }

  const weatherHandler = (req, res) => {
    try {
      console.log(req.query);
      const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
      console.log(weatherBitUrl);
      superagent.get(weatherBitUrl).then(weatherBitData  => {
        const weatherBit = weatherBitData.body.data.map(element => new Weather(element));
        res.send(weatherBit);
      });
    }
    catch(error){
      console.log(error);
    }
};

module.exports = weatherHandler;