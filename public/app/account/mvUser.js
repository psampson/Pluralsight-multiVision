/**
 * Created by colinyork on 20/07/2014.
 */


// used for managing user roles.

angular.module('app').factory('mvUser', function($resource) {

    var  UserResource = $resource('/api/users/:id', {_id:"@id"});

    UserResource.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

    return UserResource;
});