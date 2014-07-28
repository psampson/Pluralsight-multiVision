/**
 * Created by colinyork on 24/07/2014.
 */

var Courses = require('mongoose').model('Course');

exports.getCourses = function(req, res) {

    Courses.find({}).exec(function(err, collection) {

        res.send(collection);

    });
};

exports.getCourseById = function(req, res) {

    Courses.findOne({_id:req.params.id}).exec(function(err, course) {
        res.send(course);
    });
};