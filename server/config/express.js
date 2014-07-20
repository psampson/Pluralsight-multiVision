/**
 * Created by colinyork on 20/07/2014.
 */

var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function(app, config) {

    // stylys compilation
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }


    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');

    app.use(logger('dev'));

    app.use(cookieParser());

    app.use(bodyParser());

    app.use( session( {secret: 'multi vision unicorns'} ) );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware(
        {
            src: config.rootPath + 'public',
            compile: compile
        }
    ));


    // static route handling.  e.g. enable access to /public/favicon.ico
    app.use(express.static(config.rootPath + '/public'));
};