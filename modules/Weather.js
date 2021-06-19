const superagent = require('superagent');
require('dotenv').config();


const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const inCache = {};

class Weather {
  constructor(dataCons) {
    this.date = dataCons.valid_date;
    this.description = dataCons.weather.description
  }
}

const weatherHandler = (req, res) => {
  console.log(req.query);

  const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;

  const queryParams = {
    key: WEATHER_BIT_KEY,
    lat: req.query.lat,
    lon: req.query.lon
  };
  const key = `weather-${req.query.lat}${req.query.lon}`;
  if (inCache[key]) {
    console.log('cache hit Weather');
    res.send(inCache[key])
  } else {
    console.log('cache miss Weather');
    try {
      console.log(weatherBitUrl);
      superagent.get(weatherBitUrl).then(weatherBitData => {
        const weatherBit = weatherBitData.body.data.map(element => new Weather(element));
        inCache[key] = weatherBit;
        res.send(weatherBit);
      });
    }
    catch (error) {
      console.log(error);
    }
  }
};

module.exports = weatherHandler;