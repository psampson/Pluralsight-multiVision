/**
 * Created by colinyork on 20/07/2014.
 */

angular.module('app').factory('mvAuth', function($http, mvIdentity, $q, mvUser) {
    return {

        // authenticate user trying to log in.
        authenticateUser: function(username, password) {

            var dfd = $q.defer();// promise

            $http.post('/login', {username:username, password:password}).then(function(response) {


                if(response.data.success) {

                    var user = new mvUser();
                    angular.extend(user, response.data.user);

                    mvIdentity.currentUser = user;
                    dfd.resolve(true);

                } else {

                    dfd.resolve(false);
                }
            });

            return dfd.promise;
        },

        createUser: function(newUserData) {

            var newUser = new mvUser(newUserData);
            var dfd = $q.defer();

            newUser.$save().then(function() {
                mvIdentity.currentUser = newUser;
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },

        updateCurrentUser: function(newUserData) {
            var dfd = $q.defer();

            var clone = angular.copy(mvIdentity.currentUser);    // dont update the current user data yet until it is confirmed the changes are saved
            angular.extend(clone, newUserData);                 // copy the new user data into the clone.
            clone.$update().then(function() {                   // see mvUser resource for $update method
                mvIdentity.currentUser = clone;
                dfd.resolve();

            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },

        // log user out on requst.
        logoutUser: function() {
            var dfd = $q.defer();

            $http.post('/logout', {logout:true} ).then(function() {         // {logout:true} is a random body to prevent the post getting turned into a get

                mvIdentity.currentUser = undefined;                         // set the user to undefined
                dfd.resolve();

            });

            return dfd.promise;
        },
        authorizeCurrentUserForRoute: function(role) {
            if(mvIdentity.isAuthorised(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        },
        authorizeAuthenticatedUserForRoute: function() {
            if(mvIdentity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
    }
});