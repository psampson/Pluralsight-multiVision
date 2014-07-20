/**
 * Created by colinyork on 19/07/2014.
 */

var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';  // will default to development
// run 'NODE_ENV=production nodemon server.js' in production

console.log('ENV: ', env);

var app = express();

// stylys compilation
function compile (str, path) {
    return stylus(str).set('filename', path);
}


app.set('views', __dirname + '/server/views' );
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(bodyParser());

app.use(stylus.middleware (
    {
        src: __dirname + 'public',
        compile: compile
    }
));


// static route handling.  e.g. enable access to /public/favicon.ico
app.use(express.static(__dirname + '/public'));


//--------------------------------------------------------------------------------------------------------------------
// mongoose
// connect to Mongo.
if (env === 'development') {
    // local db if in development mode
    mongoose.connect('mongodb://localhost/multiVision');                // connect to the mongo db
} else {
    // mongo lab db if in production
    mongoose.connect('mongodb://quizzicol:multivision@ds047107.mongolab.com:47107/multivision');
}

var db = mongoose.connection;                                       // capture the connection as 'db'
db.on('error', console.error.bind(console, 'connection error...')); // if there is a connection error, report it
db.once('open', function callback() {                               // when the connection first opens, log it.
    console.log('multiVision db opened');
});



//--------------------------------------------------------------------------------------------------------------------
// when some requests a partial, it will pull the relevant partial from /public/app directory or relevant
// subdirectory depending on req.params[0] passed in.
app.get('/partials/*', function(req, res) {

    res.render('../../public/app/' + req.params[0]);

});


// For all other routes.  Deliver the index page.  This enables client side routing to work
app.get('*', function (req, res) {

    res.render('index');

});


var port = process.env.PORT || 3030;
app.listen(port);

console.log('Listening on port ' + port + '...');