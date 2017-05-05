'use strict';

const   data = require('../resources/data.json'), // json import
        allMovies = [], // array
        byMovieGenres=[], // array
        byName=[]; // array


function allData(){
    allMovies.push(data); // push all data
}

function genresAndType(movies_genres,movies_type){ //get 2 parameters
    byMovieGenres.length = 0; // each call make it "null"
    for (let i in data) { //run in the json
        let movie = data[i];
        if (movie.genres == movies_genres && movie.type == movies_type) { // checking if the movie... == parameters
            byMovieGenres.push(movie.name); // push it to the array
        }
    }
}

function dataByName(movie) { //get 1 parameter
    byName.length = 0; // each call make it "null"
    for(let i in data) { //run in the json
        if (movie == data[i].date){ // checking if the movie == parameter
            byName.push(data[i]); // push it to the array
        }
    }
}

module.exports = { //exports the array and "run" the functions
    getAllMoviesData: function () {
        allData();
        return allMovies; //exports the allMovies array
    },
    getGenresAndType: function (movies_genres,movies_type) {
        genresAndType(movies_genres,movies_type);
        return byMovieGenres;
    },
    getDataByName:function(movie){
        dataByName(movie);
        return byName;
    }
};