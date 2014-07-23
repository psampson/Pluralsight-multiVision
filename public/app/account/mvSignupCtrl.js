/**
 * Created by colinyork on 22/07/2014.
 */

angular.module('app').controller('mvSignupCtrl', function($scope, mvUser, mvNotifier, $location, mvAuth) {

    $scope.signup = function() {

        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        mvAuth.createUser(newUserData).then(function() {

            // success
            mvNotifier.notify('User account created!');
            $location.path('/');

        }, function(reason) {

            // failure

            mvNotifier.error(reason);

        })

    };
});