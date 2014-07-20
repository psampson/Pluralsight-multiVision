/**
 * Created by colinyork on 20/07/2014.
 */

angular.module('app').factory('mvIdentity', function($window, mvUser) {

    var currentUser;

    // see if the bootstrappedUserObject variable is set or not.  If it is, set the current user equal to it.
    if(!!$window.bootstrappedUserObject) {

        currentUser = new mvUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }

    return {
        currentUser: currentUser,
        isAuthenticated: function() {
            return !!this.currentUser;       // if the currentUser exists, the !! operator forces a boolean true
        }
    }
});