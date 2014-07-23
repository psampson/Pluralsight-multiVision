/**
 * Created by colinyork on 19/07/2014.
 */




angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config( function( $routeProvider, $locationProvider ) {

    $locationProvider.html5Mode(true);

    var routeRoleChecks = {
       admin: {
           auth: function(mvAuth) {
               return mvAuth.authorizeCurrentUserForRoute('admin');
           }
       }
    }

    $routeProvider
        .when('/',
        {
            templateUrl: '/partials/main/main',
            controller: 'mvMainCtrl'
        })
        .when('/admin/users',
        {
            templateUrl: '/partials/admin/user-list',
            controller: 'mvUserListCtrl',
            resolve: routeRoleChecks.admin

        })
        .when('/signup',
        {
            templateUrl: '/partials/account/signup',
            controller: 'mvSignupCtrl'
        });
});

// this will run after the angular app has been fully loaded and configured.  It will run after the above code.
angular.module('app').run(function($rootScope, $location) {

    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {

        if(rejection === 'not authorized') {
            $location.path('/');
        }

    })
})
