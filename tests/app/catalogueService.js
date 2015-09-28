'use strict';

describe('myApp module', function() {

    beforeEach(module('myApp'));

    describe('catalogueService mock', function() {

        beforeEach(inject(function() {

        }));

        it('should be defined', inject(function(catalogueService) {
            expect(catalogueService).toBeDefined();
        }));

        it('should return something if queried with nothing', inject(function(catalogueService) {
            expect(catalogueService.products().length).toBeGreaterThan(0);
        }));

//      The CatalogueService will only return ArsenalTV and ChelseaTV if the locationID is LONDON.
//      The CatalogueService will only return LiverpoolTV if the locationID is LIVERPOOL.
//      The CatalogueService will always return Sky News and Sky Sports News.

        function hasProgram(products, name){
            expect(_.find(products, {name:name})).toBeDefined();
        }

        function hasNotProgram(products, name){
            expect(_.find(products, {name:name})).toBeUndefined();
        }

        it('should only return Arsenal TV and Chelsea TV if the locationID is LONDON', inject(function(catalogueService) {
            var products = catalogueService.products('LONDON');
            expect(products.length).toBeGreaterThan(0);

            hasProgram(products, 'Arsenal TV');
            hasProgram(products, 'Chelsea TV');

            products = catalogueService.products('LIVERPOOL'); // TODO {list of locations} - LONDON
            products = products.filter(function(p){ return (p.name === 'Arsenal TV' || p.name === 'Chelsea TV');});
            expect(products.length).toBe(0);

            products = catalogueService.products();
            products = products.filter(function(p){ return (p.name === 'Arsenal TV' || p.name === 'Chelsea TV');});
            expect(products.length).toBe(0);
        }));

        it('should only return Liverpool TV if the locationID is LIVERPOOL', inject(function(catalogueService) {
            var products = catalogueService.products('LIVERPOOL');
            expect(products.filter(function(p){ return p.name === 'Liverpool TV'}).length).toBeGreaterThan(0);
            products = catalogueService.products('LONDON'); // TODO {list of locations} - LIVERPOOL
            hasNotProgram(products, 'Liverpool TV');

            products = catalogueService.products();
            hasNotProgram(products, 'Liverpool TV');
        }));

        function hasDefaults(products){
            expect(_.find(products, {name:"Sky News"})).toBeDefined();
            expect(_.find(products, {name:"Sky Sports News"})).toBeDefined();
        }

        it('should always return Sky News and Sky Sports News', inject(function(catalogueService) {
            hasDefaults(catalogueService.products());
            hasDefaults(catalogueService.products(' nonsense dd '));
            hasDefaults(catalogueService.products(null));
            hasDefaults(catalogueService.products(0));
            //hasDefaults(catalogueService.products([]));
        }));

    });
});
