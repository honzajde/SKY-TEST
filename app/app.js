'use strict';

// Declare app level module which depends on views, and components

angular.module('myApp', [
    'ngRoute',
    'ngCookies',
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/view1' });
}])
.factory('context', function(){
    return {};
})

// Mocks - should be in separate module
.factory('customerLocationService', function() {
    var cities = ['LONDON', 'LIVERPOOL'];
    var cache = {};
    return {
        location: function(customerID) {
            var rand = Math.random();
            if (rand > 0.9) {
                return null;
            }
            var result = cache[customerID];
            if (result) {
                return result;
            }
            cache[customerID] = _.sample(cities);
            return cache[customerID];
        }
    }
})
.factory('catalogueService',function(){
    var allProducts = [
        {name:'Arsenal TV', category:'Sports', location: 'LONDON'},
        {name:'Chelsea TV', category:'Sports', location: 'LONDON'},
        {name:'Liverpool TV', category:'Sports', location: 'LIVERPOOL'},
        {name:'Sky News', category:'News'},
        {name:'Sky Sports News', category:'News'}
    ];
    return {
        products: function(locationID){
            return angular.copy(allProducts.filter(function(product){
                return product.location === locationID || !product.location
            }));
        }
    }
})
.run(function($cookies){
    $cookies.put('customerID', 'customerId1'); // assumption
});

