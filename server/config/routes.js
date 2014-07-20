/**
 * Created by colinyork on 20/07/2014.
 */

var auth = require('./auth');

module.exports = function(app) {

    //--------------------------------------------------------------------------------------------------------------------
    // when some requests a partial, it will pull the relevant partial from /public/app directory or relevant
    // subdirectory depending on req.params[0] passed in.
    app.get('/partials/*', function(req, res) {

        res.render('../../public/app/' + req.params[0]);

    });


    // user authentication
    app.post('/login', auth.authenticate);


    // For all other routes.  Deliver the index page.  This enables client side routing to work
    app.get('*', function (req, res) {

        res.render('index');

    });


};