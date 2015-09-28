'use strict';

describe('myApp module', function() {

    beforeEach(module('myApp'));

    describe('customerLocationService mock', function() {

        beforeEach(inject(function() {

        }));

        it('should be defined', inject(function(customerLocationService) {
            expect(customerLocationService).toBeDefined();
        }));

        it('should return truthy location in 90% cases', inject(function(customerLocationService) {

            var results = [];
            for (var i=0; i< 100;i++){
                results.push(customerLocationService.location('sampleCustomerId'));
            }

            results = results.filter(function(r){ return r; });
            expect(results.length).toBeGreaterThan(81);
            expect(results.length).toBeLessThan(99);
        }));

        it('truthy location can be either LONDON or LIVERPOOL', inject(function(customerLocationService) {

            var results = [];
            for (var i=0; i< 100;i++){
                results.push(customerLocationService.location('sampleCustomerId2'));
            }

            results = results.filter(function(r){ return r; });
            results = results.filter(function(r){ return (r !== 'LONDON' && r !== 'LIVERPOOL'); });

            expect(results.length).toBe(0);
        }));

    });
});