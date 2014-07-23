/**
 * Created by colinyork on 23/07/2014.
 */

var mongoose = require('mongoose');
var encrypt = require('../utilities/encryption');


//--------------------------------------------------------------------------------------------------------------------
// User
// define user schema
var userSchema = mongoose.Schema({
    firstName: {type:String, required: '{PATH} is required!'},    // can set required to true or pass a message like this
    lastName: {type:String, required: '{PATH} is required!'},
    username: {                                                   // make sure usernames are unique
        type:String,
        required: '{PATH} is required!',
        unique: true
    },
    salt: {type:String, required: '{PATH} is required!'},
    hashed_pwd: {type:String, required: '{PATH} is required!'},
    roles: [String]                 // array of strings
});

userSchema.methods = {
    authenticate: function(passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
};
// define user model
var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
// create some default users in the database if there are none.
    User.find({}).exec(function (err, collection) {

        if (collection.length === 0) {

            var salt, hash;

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'joe');
            User.create({firstName: 'Joe', lastName: 'Eames', username: 'joe', salt: salt, hashed_pwd: hash, roles: ['admin']});

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'john');
            User.create({firstName: 'John', lastName: 'Papa', username: 'john', salt: salt, hashed_pwd: hash, roles: []});

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'dan');
            User.create({firstName: 'Dan', lastName: 'Wahlin', username: 'dan', salt: salt, hashed_pwd: hash});

        }
    });
}

exports.createDefaultUsers = createDefaultUsers;
