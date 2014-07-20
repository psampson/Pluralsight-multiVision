/**
 * Created by colinyork on 20/07/2014.
 */
angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http, mvIdentity, mvNotifier, mvAuth, $location) {

    $scope.identity = mvIdentity;           // for use in navbar-login.jade to hide login fields

    // sign in fields and controls
    $scope.signin = function(username, password) {

        mvAuth.autheticateUser(username, password).then(function(success) {
            if(success) {
                mvNotifier.notify('You have successfully signed in!');
            } else {
                mvNotifier.notify('Username/Password combination incorrect');
            }
        })

    };


    // sign out fields and controls.
    $scope.signout = function() {
        mvAuth.logoutUser().then(function() {
            $scope.username = "";
            $scope.password = "";
            mvNotifier.notify('You have successfully signed out!');
            $location.path('/');
        });
    }
});