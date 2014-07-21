/**
 * Created by colinyork on 20/07/2014.
 */

angular.module('app').controller('mvUserListCtrl', function($scope, mvUser) {

    $scope.users = mvUser.query();

});