/**
 * Created by colinyork on 24/07/2014.
 */

var Courses = require('mongoose').model('Course');

exports.getCourses = function(req, res) {

    Courses.find({}).exec(function(err, collection) {

        res.send(collection);

    });
};