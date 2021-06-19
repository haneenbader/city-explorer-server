const superagent = require('superagent');
require('dotenv').config();


const MOVIE_BIT_KEY = process.env.MOVIE_BIT_KEY;

class Movie {
    constructor(movieCons) {
      this.title = movieCons.title;
      this.overview = movieCons.overview;
      this.popularity = movieCons.popularity;
      this.vote_average=movieCons.vote_average;
      this.release_date=movieCons.release_date;
      this.poster_path=movieCons.poster_path
    }
  }

  const movieHandle =  (req, res) => {
    try {
      console.log(req.query.query);
      const movieBitUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_BIT_KEY}&query=${req.query.query}&limit=5`;
      console.log(movieBitUrl);
      superagent.get(movieBitUrl).then(movieBitData  => {
        const movieBit = movieBitData.body.results.map(element => new Movie(element));
        res.send(movieBit);
      });
    }
    catch(error){
      console.log(error);
    }
  };

  module.exports = movieHandle;