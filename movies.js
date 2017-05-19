const mongoose = require('mongoose'),
    schema = mongoose.Schema,
    moviesSchema = new schema({
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
    Movies = mongoose.model('Movies', moviesSchema);

module.exports={
    Movies : Movies
};