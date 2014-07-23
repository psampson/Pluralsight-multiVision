/**
 * Created by colinyork on 23/07/2014.
 */

var crypto = require('crypto');
//--------------------------------------------------------------------------------------------------------------------
// each user password will be stored in hashed form and each will have its own salt

// function to create a random salt
exports.createSalt = function() {

    // use crypto to generate a random 128 bit salt and return it as a base64 string
    return crypto.randomBytes(128).toString('base64');

};


// function to generate a hashPwd for each user using their password and a use salt value
exports.hashPwd = function(salt, pwd) {

    var hmac = crypto.createHmac('sha1', salt);  // hmac = hash message authentication code

    return hmac.update(pwd).digest('hex');
};