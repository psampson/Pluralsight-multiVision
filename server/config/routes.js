/**
 * Created by colinyork on 20/07/2014.
 */

var auth = require('./auth');
var users = require('../controllers/users');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var course = require('../controllers/courses');



module.exports = function(app) {

    // get a list of all users.
    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);

    // add a new user
    app.post('/api/users', users.createUser);

    // update user
    app.put('/api/users', users.updateUser);

    // courses
    app.get('/api/courses', course.getCourses);

    //--------------------------------------------------------------------------------------------------------------------
    // when some requests a partial, it  will pull the relevant partial from /public/app directory or relevant
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

    app.all('/api/*', function(req,res) {       // all other api requests
        res.send(404);
    });

    // For all other routes.  Deliver the index page.  This enables client side routing to work
    app.get('*', function (req, res) {

        res.render('index', {
            bootstrappedUser: req.user       // make the current user object available to jade
        });


    });


};