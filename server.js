/**
 * Created by colinyork on 19/07/2014.
 */

// requires
var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;  // This is how passport implements authentication
                                                         // Local implies our own database rather than oAuth

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

//---------------------------------------------------------------------------------------------------------------------
// authentication

// define User model
var User = mongoose.model('User');

// define passport LocalStrategy.
// this is called from routes as part of the passport authenticate method
// username and password are captured from the req object by body parser.
passport.use(new LocalStrategy(
    function(username, password, done) {                // done is a callback

        User.findOne( {username:username}, function(err, user) {

            if(user) {

                console.log("Found user data : ", user);
                return done(null, user);

            } else {

                console.log("No user found.");
                return done(null, false);

            }
        });
    }

));

// serialize/deserialize user for session storage.

passport.serializeUser(function (user, done) {
    if (user) {
        done(null, user._id);
    }
});

passport.deserializeUser(function(id, done) {
    User.findOne({_id:id}).exec(function(err, user) {

        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
});


//---------------------------------------------------------------------------------------------------------------------
// set up routes
require('./server/config/routes.js')(app);


app.listen(config.port);

console.log('Listening on port ' + config.port + '...');