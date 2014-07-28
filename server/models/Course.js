/**
 * Created by colinyork on 23/07/2014.
 */

var mongoose = require('mongoose');

// define schema
var courseSchema = mongoose.Schema({
    title: {type:String, required:'{PATH} is required!'},
    featured: {type:Boolean, required:'{PATH} is required!'},
    published: {type:Date, required:'{PATH} is required!'},
    tags: [String]
});

// define model
var Course = mongoose.model('Course', courseSchema);

function createDefaultCourses() {
// create some default data in the database if there is none.
    Course.find({}).exec(function (err, collection) {
        console.log(err);
        if (collection.length === 0) {

            Course.create({title: 'C# for sociopaths', featured: true, published: new Date('5/10/2013'), tags:['C#']});
            Course.create({title: 'C# for Non-sociopaths', featured: true, published: new Date('12/10/2013'), tags:['C#']});
            Course.create({title: 'Super Duper expert C#', featured: false, published: new Date('10/1/2013')});
            Course.create({title: 'Visual Basic for Cisual Basic Developers', featured: false, published: new Date('12/7/2013'), tags:['VB']});
            Course.create({title: 'Pedantic C++', featured: true, published: new Date('1/1/2013'), tags:['C++']});
            Course.create({title: 'JavaScript for people over 20', featured: true, published: new Date('10/13/2013'), tags:['JS']});
            Course.create({title: 'Maintainable Code for Cowards', featured: false, published: new Date('1/3/2013'), tags:['Coding']});
            Course.create({title: 'A Survival Guide to Code Reviews', featured: true, published: new Date('1/2/2013'),tags:['Coding']});
            Course.create({title: 'How to Job Hunt Without Alerting Your Boss', featured: true, published: new Date('10/7/2013'), tags:['Misc']});
            Course.create({title: 'How to Keep Your Soul and go into Management', featured: false, published: new Date('1/8/2013'),tags:['Management']});
            Course.create({title: 'Telling Recruiters to Leave You Alone', featured: false, published: new Date('1/11/2013'), tags:['Music']});
            Course.create({title: 'Writing Code that Doesnt Suck', featured: true, published: new Date('10/13/2013'),tags:['Coding']});
            Course.create({title: 'Code Reviews for Jerks', featured: false, published: new Date('10/1/2013'), tags:['Coding']});
            Course.create({title: 'How to Deal with Narcissistic Coworkers', featured: true, published: new Date('2/15/2013'), tags:['Misc']});
            Course.create({title: 'Death Match Coding for Fun and Profit', featured: true, published: new Date('1/7/2013'), tags:['Coding', 'Misc']});
        }
    });
}

exports.createDefaultCourses = createDefaultCourses;