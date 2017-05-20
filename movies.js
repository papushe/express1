'use strict';

const mongoose = require('mongoose'),
    schema = mongoose.Schema,
    movie = new schema({
        name: {type:String, index:1, required:true, unique:true},
        genres: String,
        type: String,
        date: String,
        year: Number,
        actors:[
            {
                name:String,
                role:String
            },
            {
                name:String,
                role:String
            }
        ]
    }, {collection: 'movies'}),
    Movies = mongoose.model('Movies', movie);

module.exports={
    Movies : Movies
};