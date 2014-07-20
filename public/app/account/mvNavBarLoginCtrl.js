/**
 * Created by colinyork on 20/07/2014.
 */
angular.module('app').controller('mvNavBarLoginCtrl', function($scope) {
    $scope.signin = function(username, password) {
        console.log(username + ", " + password);
        console.log("I'm not done yet");
    }
});