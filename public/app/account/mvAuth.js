/**
 * Created by colinyork on 20/07/2014.
 */

angular.module('app').factory('mvAuth', function($http, mvIdentity, $q) {
    return {
        autheticateUser: function(username, password) {

            var dfd = $q.defer();// promise

            $http.post('/login', {username:username, password:password}).then(function(response) {


                if(response.data.success) {

                    mvIdentity.currentUser = response.data.user;
                    dfd.resolve(true);

                } else {

                    dfd.resolve(false);
                }
            });

            return dfd.promise;
        }
    }
});