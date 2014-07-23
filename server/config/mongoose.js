/**
 * Created by colinyork on 20/07/2014.
 */

var mongoose = require('mongoose');
var userModel = require('../models/User');


module.exports = function(config) {

    //--------------------------------------------------------------------------------------------------------------------
    // mongoose
    mongoose.connect(config.db);                // connect to the mongo db

    var db = mongoose.connection;                                       // capture the connection as 'db'
    db.on('error', console.error.bind(console, 'connection error...')); // if there is a connection error, report it
    db.once('open', function callback() {                               // when the connection first opens, log it.
        console.log('multiVision db opened');
    });

    userModel.createDefaultUsers();

};

