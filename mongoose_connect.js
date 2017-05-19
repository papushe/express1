'use strict';

const   mongoose = require('mongoose'),
        consts = require('./const').MLAB_KEY,
        Movie = require('./movies.js').Movies,
        Promise    = require('promise');

mongoose.connect(consts); //get MLAB_KEY
const conn = mongoose.connection; //get default connection

conn.on('error', (err) => { // if err
    console.log(`connection error: ${err}`);
});

class newMovies {
    allData(){
        return new Promise((resolve,reject)=>{
            Movie.find({} ,'-_id', // without _id
                (err, movie) => {
                    if (err) reject(err);
                    else resolve(movie);
                });
        })
    }
    genresAndType(movies_genres,movies_type) { //get 2 parameters
        return new Promise((resolve,reject)=>{
            let nameAndRole=[]; //new array
            Movie.find({genres:{$eq: movies_genres}, type:{$eq:movies_type}},
                (err, movie) => {
                if (err) reject(err);
                else {
                    nameAndRole.push(movie[0].actors[0].name); // push actor name
                    nameAndRole.push(movie[0].actors[0].role); // push actor role
                    resolve(nameAndRole);
                }
            });
        })
    }
    dataByName(movie_date) { //get 1 parameter
        return new Promise((resolve,reject)=>{
            Movie.find({date:{$eq: movie_date}},'-_id',// without _id
                (err, movie) => {
                    if (err) reject(err);
                    else resolve(movie);
                });
        })
    }
}
module.exports = () => { //exports the class
    return new newMovies();
};