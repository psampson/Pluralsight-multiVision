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
        }
    }
});