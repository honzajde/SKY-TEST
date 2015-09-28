'use strict';

describe('myApp.view1 module', function() {

    beforeEach(module('myApp'));

//    beforeEach(module(function($provide) {
//        $provide.service('customerLocationService', function(){...});
//    }));

    describe('view1 controller', function() {

        var view1Ctrl, $scope;

        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();
            view1Ctrl = $controller('View1Ctrl', {
                $scope: $scope
            });
        }));

        it('should ....', inject(function($controller) {
            //spec body
            expect(view1Ctrl).toBeDefined();
        }));

    });
});