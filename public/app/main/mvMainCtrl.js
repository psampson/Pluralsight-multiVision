angular.module('app').controller('mvMainCtrl', function($scope) {


    $scope.courses = [
        {name: 'C# for sociopaths', featured: true, published: new Date('1/1/2012')},
        {name: 'C# for Non-sociopaths', featured: true, published: new Date('1/1/2014')},
        {name: 'Super Duper expert C#', featured: true, published: new Date('1/1/2013')},
        {name: 'stuff', featured: true, published: new Date('1/1/2009')},
        {name: 'mroe stuff', featured: true, published: new Date('1/2/2014')},
        {name: 'water', featured: true, published: new Date('1/2/2013')},
        {name: 'fire', featured: false, published: new Date('1/4/2014')},
        {name: 'wind', featured: true, published: new Date('1/5/2014')},
        {name: 'earth', featured: true, published: new Date('1/1/2011')},
        {name: 'cars', featured: true, published: new Date('1/2/2011')},
        {name: 'bikes', featured: true, published: new Date('1/8/2012')},
        {name: 'misty', featured: true, published: new Date('1/11/2013')}
    ]

});