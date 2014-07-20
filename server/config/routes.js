/**
 * Created by colinyork on 20/07/2014.
 */

var auth = require('./auth');
var mongoose = require('mongoose');
var User = mongoose.model('User');


module.exports = function(app) {

    // get a list of all users.
    app.get('/api/users', auth.requiresRole('admin'), function(req, res) {

        User.find({}).exec(function(err, collection) {
            res.send(collection);
        })

    });

    //--------------------------------------------------------------------------------------------------------------------
    // when some requests a partial, it will pull the relevant partial from /public/app directory or relevant
    // subdirectory depending on req.params[0] passed in.
    app.get('/partials/*', function(req, res) {

        res.render('../../public/app/' + req.params[0]);

    });


    // user authentication
    app.post('/login', auth.authenticate);


    // user log out
    // note: there is no redirect as page routing is all done in Angular on the client side.
    app.post('/logout', function(req, res) {
        req.logout();                           // logout method was added by the passport module
        res.end();
    });



    // For all other routes.  Deliver the index page.  This enables client side routing to work
    app.get('*', function (req, res) {

        res.render('index', {
            bootstrappedUser: req.user       // make the current user object available to jade
        });

    });


};