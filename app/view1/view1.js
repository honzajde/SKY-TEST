'use strict';

angular.module('myApp.view1', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    });
}])
.controller('View1Ctrl', function($scope, $cookies, $location, $log, customerLocationService, catalogueService, context) {
    var customerID = $cookies.get('customerID');
    $log.debug('customerID: ' + customerID);

    var locationID =  customerLocationService.location(customerID);
    $log.debug('customer location: ' + locationID);

    $scope.products = catalogueService.products(locationID);
    $log.debug('products: ' + JSON.stringify($scope.products));

    $scope.categories = _($scope.products).pluck('category').uniq().filter(function(cat){ return cat}).value();

    $scope.checkout = function(){
        context.selectedProducts = angular.copy($scope.selectedProducts);
        $location.path('/view2/success')
    };

    $scope.selectedProducts = [];

    $scope.$watch(function(){ return $scope.products.filter(function(p){ return p.selected;}).length; }, function(){
        $scope.selectedProducts = $scope.products.filter(function(p){ return p.selected;});
    }, true);

});