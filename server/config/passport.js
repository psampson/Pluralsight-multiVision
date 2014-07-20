/**
 * Created by colinyork on 20/07/2014.
 */

var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;  // This is how passport implements authentication
                                                         // Local implies our own database rather than oAuth

// define User model
var User = mongoose.model('User');

module.exports= function() {

    // define passport LocalStrategy.
    // this is called from routes as part of the passport authenticate method
    // username and password are captured from the req object by body parser.
    passport.use(new LocalStrategy(
        function (username, password, done) {                // done is a callback

            User.findOne({username: username}, function (err, user) {

                // user is the userSchema object returned from the database (see mongoose.js)
                // We check to make sure a user is returned and then hash the password entered by the
                // user, using the salt returned from the database for that user, and see if the hashed password
                // matched the hashed password stored in the database.  (see mongoose.js for authenticate method)
                if (user && user.authenticate(password)) {

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

    passport.deserializeUser(function (id, done) {
        User.findOne({_id: id}).exec(function (err, user) {

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    });
};