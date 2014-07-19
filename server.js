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

// configure mongoose schema
var messageSchema = mongoose.Schema({
        message: String
    });

// configure mongoose model
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;

// query database
Message.findOne().exec( function( err, messageDoc ) {
        mongoMessage = messageDoc.message;
    });

//--------------------------------------------------------------------------------------------------------------------
// when some requests a partial, it will pull the partial from the partials directory.
app.get('/partials/:partialPath', function(req, res) {

    res.render('partials/' + req.params.partialPath);

});


// For all other routes.  Deliver the index page.  This enables client side routing to work
app.get('*', function (req, res) {

    res.render('index', {
        mongoMessage: mongoMessage
    });

});


var port = process.env.PORT || 3030;
app.listen(port);

console.log('Listening on port ' + port + '...');