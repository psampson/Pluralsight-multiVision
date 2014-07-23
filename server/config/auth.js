/**
 * Created by colinyork on 20/07/2014.
 */

// This is the user authentication logic which is called from routes.js


var passport = require('passport');

// --------------------------------------------------------------------------------------------------------------------
// authenticate method.

exports.authenticate = function (req, res, next) {

    req.body.username = req.body.username.toLowerCase();                // convert usernames to lowercase.

    // define an authentication function.  This will effectively call the passport.use in server.js
    var auth = passport.authenticate('local', function(err, user) {

        if(err) { return next(err);}

        if(!user) { res.send({success:false}); }

        req.logIn(user, function(err) {                                 // logIn method is added by passport

            if(err) {return next(err);}
            res.send({success:true, user:user});

        });
    });

    auth(req, res, next);                                               // call the auth function
};


// --------------------------------------------------------------------------------------------------------------------
// function to ensure only authenticated users can see a list of users

exports.requiresApiLogin = function(req, res, next) {
    // check to make sure the current user is authenticated
    if(!req.isAuthenticated()) {

        res.status(403);
        res.end();

    } else {
        next();
    }
};


// --------------------------------------------------------------------------------------------------------------------
// function to ensure only admins can see a list of all users.
// this is used in the routes '/api/users' and is middle ware in app.get.  Express calls middle ware as a function so
// in order to pass a parameter we need to return a function for use by express.

exports.requiresRole = function(role) {
    return function(req, res, next) {
        if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {

            res.status(403);
            res.end();

        } else {

            next();

        }
    }
};