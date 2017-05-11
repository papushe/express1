'use strict';

const   express = require('express'),
        bodyParser = require('body-parser'),
        app = express(),
        data = require('./resources/data.json'),
        modules = require('./app/index.js'),
        allMovies = modules.getAllMoviesData(),
        port = process.env.PORT || 3000;

let     genresAndType = modules.getGenresAndType(1, 1); // create var of getGenresAndType function with 2 parameters

app.use(bodyParser.json()); // parsing application/json
app.use(bodyParser.urlencoded({extended:true})); // parsing application/x-www-form-urlencoded
app.use('/assets', express.static(`${__dirname}/public`));


app.get('/', function (req, res) {
    console.log("Home api running");
    res.set('header-One', 'Home');
    res.sendfile(`${__dirname}/index.html`);
});

app.get('/getAllMoviesData', (req, res)=> {
    console.log("All data is showing");
    res.set('header-Two', 'All data');
    res.status(200).json({"movies Data": allMovies}); // get all data movies by getAllMoviesData() function
});

app.get('/getMoviesName/:movies_genres/:movies_type', (req, res)=> {
    console.log("Two cuts, genres and type");
    res.set('header-Three', 'Two cuts');
    genresAndType = modules.getGenresAndType(req.params.movies_genres, req.params.movies_type); // create var of getGenresAndType function with 2 parameters
    genresAndType.length == 0 ? res.status(200).json({error: "wrong input, try again"}) : res.status(200).json({"Movie Actor name and roll by genres and type": genresAndType});
});

app.post('/getDataByName/', (req, res)=> {
    console.log("In post app");
    res.set('header-Four', 'One data, post');
    let movie = req.body.date, // create bodyParser var
        byName = modules.getDataByName(movie); // insert it to the function getDataByName
    byName.length == 0 ? res.status(200).json({error: "wrong input, try again"}) : res.status(200).json({"All data by date": byName}); // return the data with json if byName[] not empty
});

app.all('*', (req, res) => { // Manage conflicts
    res.status(200).json({"error": "404 - not found"});
});

app.listen(port);
console.log(`listening on port ${port}`);