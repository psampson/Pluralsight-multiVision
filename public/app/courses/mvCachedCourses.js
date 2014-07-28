/**
 * Created by colinyork on 24/07/2014.
 */

angular.module('app').factory('mvCachedCourses', function(mvCourse) {

  var courseList;

    return {
        query: function() {
            if(!courseList) {
                courseList = mvCourse.query();
            }

            return courseList;
        }
    }

});