/**
 * Created by colinyork on 20/07/2014.
 */

angular.module('app').factory('mvIdentity', function() {
    return {
        currentUser: undefined,
        isAuthenticated: function() {
            return !!this.currentUser
        }
    }
})