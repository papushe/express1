'use strict';

const   express = require('express'),
        bodyParser = require('body-parser'),
        app = express(),
        port = process.env.PORT || 3000,
        newMovies = require('./mongoose_connect'),
        getGenresAndType = newMovies().genresAndType,
        all = newMovies().allData,
        dataByName = newMovies().dataByName;
app.use(
    (req,res,next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
app.use(bodyParser.json()); // parsing application/json
app.use(bodyParser.urlencoded({extended:true})); // parsing application/x-www-form-urlencoded
app.use('/assets', express.static(`${__dirname}/public`)); // public as assets

app.get('/', (req, res) => {
    console.log("Home api running");
    res.set('header-One', 'Home');
    res.status(200).sendfile(`${__dirname}/index.html`);
});

app.get('/getAllMoviesData', (req, res) => {
    console.log("All data is showing");
    res.set('header-Two', 'All data');
    all()
        .then((result) => {
            result.length === 0 ? res.json({error: "wrong input, try again"}) :
                res.json(result); // return the data with json if result not empty
        })
});

app.get('/getActorData/:movies_genres/:movies_type', (req, res) => {
    console.log("Two cuts, genres and type");
    res.set('header-Three', 'Two cuts');
    getGenresAndType(req.params.movies_genres, req.params.movies_type)
        .then((result) => {
            result.length === 0 ? res.json({error: "wrong input, try again"}) :
                res.json(result); // return the data with json if result not empty
        })
});

app.post('/getDataByDate/', (req, res) => {
    console.log("In post app");
    res.set('header-Four', 'One data, post');
    let movie = req.body.date; // create bodyParser var
    dataByName(movie)
        .then((result) => {
            result.length === 0 ? res.status(200).json({error: "wrong input, try again"}) :
                res.json(result); // return the data with json if result not empty
        });
});

app.all('*', (req, res) => { // Manage conflicts
    res.status(200).json({"error": "404 - not found (Wrong input or Wrong url)"});
});
app.listen(port);
console.log(`listening on port ${port}`);