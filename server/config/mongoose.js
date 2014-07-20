/**
 * Created by colinyork on 20/07/2014.
 */

var mongoose = require('mongoose');



module.exports = function(config) {

    //--------------------------------------------------------------------------------------------------------------------
    // mongoose
    mongoose.connect(config.db);                // connect to the mongo db

    var db = mongoose.connection;                                       // capture the connection as 'db'
    db.on('error', console.error.bind(console, 'connection error...')); // if there is a connection error, report it
    db.once('open', function callback() {                               // when the connection first opens, log it.
        console.log('multiVision db opened');
    });


    //--------------------------------------------------------------------------------------------------------------------
    // User
    // define user schema
    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String
    });

    // define user model
    var User = mongoose.model('User', userSchema);

    // see if there are any users and, if not, add some.
    User.find({}).exec(function(err, collection) {

        if(collection.length === 0) {

            User.create({firstName: 'Joe', lastName:'Eames', username: 'joe'});
            User.create({firstName: 'John', lastName:'Papa', username: 'john'});
            User.create({firstName: 'Dan', lastName:'Wahlin', username: 'dan'});

        }
    });

};