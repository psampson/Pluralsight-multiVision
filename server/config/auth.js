/**
 * Created by colinyork on 20/07/2014.
 */

// This is the user authentication logic which is called from routes.js
var passport = require('passport');

exports.authenticate = function (req, res, next) {

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