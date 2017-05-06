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
    res.set('header-One', 'Home');
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <link href="assets/style.css" rel=stylesheet>
        <link rel="icon" href="assets/apple.png">
        <title>New Movies</title>
    </head>
    <body>
        <h1>My VOD - New Movies</h1>
        <div>
            <h2>All movies</h2>
            <p>You will see all the data json<p/>
            <a target="_blank" href="https://express1vod.herokuapp.com/getAllMoviesData">https://express1vod.herokuapp.com/getAllMoviesData</a>
        </div>
        <div>
            <h2>Two cuts by get</h2>
            <p>You will see all the data json after 2 cuts genres(action) and date(jan)<p/>
            <a target="_blank" href="https://express1vod.herokuapp.com/getMoviesName/action/movie">https://express1vod.herokuapp.com/getMoviesName/action/movie</a>
        </div>
        <div>
            <h2>One cut by post</h2>
            <p>check it out on the REST client<p/>
            <a target="_blank" href="https://express1vod.herokuapp.com/getDataByName">https://express1vod.herokuapp.com/getDataByName</a>
        </div>
    </body>
   </html>`);
});

app.get('/getAllMoviesData', (req, res)=> {
    res.set('header-Two', 'All data');
    res.status(200).json({"movies Data": allMovies}); // get all data movies by getAllMoviesData() function
});

app.get('/getMoviesName/:movies_genres/:movies_type', (req, res)=> {
    res.set('header-Three', 'Two cuts');
    genresAndType = modules.getGenresAndType(req.params.movies_genres, req.params.movies_type); // create var of getGenresAndType function with 2 parameters
    if(genresAndType.length == 0){ // if the array is empty
        res.status(200).json({error: "wrong input, try again"}); // error
    } else {
        res.status(200).json({"Movies Name by genres and type": genresAndType}); // return the data with json
    }
});

app.post('/getDataByName/', (req, res)=> {
    res.set('header-Two', 'One data, post');
    let movie = req.body.date, // create bodyParser var
        byName = modules.getDataByName(movie); // insert it to the function getDataByName
    if(byName.length == 0){ // if the array is empty
        res.status(200).json({error: "wrong input, try again"}); // error
    }else {
        res.status(200).json({"All data by date": byName}); // return the data with json
    }
});

app.all('*', (req, res) => { // Manage conflicts
    res.status(200).json({"error": "404 - not found"});
});

app.listen(port);
console.log(`listening on port ${port}`);