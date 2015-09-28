'use strict';

describe('myApp.view2 module', function() {

    beforeEach(module('myApp'));

    describe('view2 controller', function() {

        var $scope, view2Ctrl;

        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();
            view2Ctrl = $controller('View2Ctrl', {$scope: $scope});
        }));

        it('should ....', inject(function() {
            //spec body
            expect(view2Ctrl).toBeDefined();
        }));

    });
});