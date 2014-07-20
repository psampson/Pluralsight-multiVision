/**
 * Created by colinyork on 19/07/2014.
 */

// requires
var express = require('express');


// specify the environment, will default to 'development'
// run 'NODE_ENV=production nodemon server.js' for production
// NODE_ENV in Heroku set to 'production'
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';  // will default to development

console.log('ENV: ', env);

var app = express();


// read in config object and pass respective environment data to the 'config' variable.
var config = require('./server/config/config.js')[env];


// set up express
require('./server/config/express')(app, config);

// set up mongoose
require('./server/config/mongoose.js')(config);

// set up authentication
require('./server/config/passport.js')();


//---------------------------------------------------------------------------------------------------------------------
// set up routes
require('./server/config/routes.js')(app);


app.listen(config.port);

console.log('Listening on port ' + config.port + '...');