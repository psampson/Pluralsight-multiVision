/**
 * Created by colinyork on 20/07/2014.
 */

var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');  //current directory up two diretories

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/multiVision',                                          // local mongo db
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://quizzicol:multivision@ds047107.mongolab.com:47107/multivision',  // mongoLabs db
        port: process.env.PORT || 80
    }
};