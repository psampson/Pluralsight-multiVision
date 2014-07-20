/**
 * Created by colinyork on 20/07/2014.
 */

var mongoose = require('mongoose');
var crypto = require('crypto');



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
        username: String,
        salt: String,
        hashed_pwd: String
    });

    userSchema.methods = {
        authenticate: function(passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    };
    // define user model
    var User = mongoose.model('User', userSchema);

    // see if there are any users and, if not, add some.
    User.find({}).exec(function(err, collection) {

        if(collection.length === 0) {

            var salt, hash;

            salt = createSalt();
            hash = hashPwd(salt, 'joe');
            User.create({firstName: 'Joe', lastName:'Eames', username: 'joe', salt: salt, hashed_pwd: hash});

            salt = createSalt();
            hash = hashPwd(salt, 'john');
            User.create({firstName: 'John', lastName:'Papa', username: 'john', salt: salt, hashed_pwd: hash});

            salt = createSalt();
            hash = hashPwd(salt, 'dan');
            User.create({firstName: 'Dan', lastName:'Wahlin', username: 'dan', salt: salt, hashed_pwd: hash});

        }
    });

};

//--------------------------------------------------------------------------------------------------------------------
// each user password will be stored in hashed form and each will have its own salt

// function to create a random salt
function createSalt() {

    // use crypto to generate a random 128 bit salt and return it as a base64 string
    return crypto.randomBytes(128).toString('base64');

}


// function to generate a hashPwd for each user using their password and a use salt value
function hashPwd(salt, pwd) {

    var hmac = crypto.createHmac('sha1', salt);  // hmac = hash message authentication code

    return hmac.update(pwd).digest('hex');
}