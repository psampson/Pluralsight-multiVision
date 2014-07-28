/**
 * Created by colinyork on 28/07/2014.
 */

angular.module('app').controller('mvCourseDetailCtrl', function($scope, mvCachedCourses, $routeParams) {

//    $scope.course=mvCourse.get({_id:$routeParams.id});  // _id comes from mvCourse, id comes from the route
      mvCachedCourses.query().$promise.then(function(collection) {
        collection.forEach(function(course) {
            if(course._id === $routeParams.id) {
                $scope.course = course
            }
        });
      })
});
