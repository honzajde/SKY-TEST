'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

// by.xpath("//*[contains(text(),'You have successfully signed up!')]")

describe('my app', function() {

    it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
        browser.get('index.html');
        expect(browser.getLocationAbsUrl()).toMatch("/view1");
    });


    describe('view1', function() {

        beforeEach(function() {
            browser.get('index.html#/view1');
        });


        it('should render view1 when user navigates to /view1', function() {
            expect(element.all(by.css('[ng-view] p')).first().getText()).toMatch(/partial for view 1/);
        });

        it('when the customer selects or unselects a product, the basket is updated to show the selected products', function() {

            var groups = element(by.id('programs'));
            expect(groups).toBeDefined();

            // make sure the checkout button is disabled
            var button = element(by.buttonText('Checkout'));
            expect(button.isEnabled()).toBeFalsy();

            var checkboxes = groups.all(by.css('input[type=checkbox]'));
            checkboxes.then(function(items) {
                // make sure we are testing something - must have News programs
                expect(items.length).toBeGreaterThan(1);

                for (var i = 0; i < items.length; i++){
                    var input = items[i];
                    var label = input.element(by.xpath('..'));

                    label.getText().then((function(lbl){
                        return function(labelText){
                            console.log('click label text: ' + labelText);

                            lbl.click();
                            browser.waitForAngular();
                            //browser.sleep(1000); // to make sure visually everything runs

                            var button = element(by.buttonText('Checkout'));
                            expect(button.isEnabled()).toBeTruthy();

                            var cart = element(by.id('cart'));

                            // make sure labels have text labelText
                            var labels = cart.all(by.repeater('product in selectedProducts'));
                            expect(labels.getText()).toMatch(labelText);

                            // make sure all labels in cart are checked
                            var inputs = labels.all(by.css('input:checked'));
                            expect(labels.count()).toBe(inputs.count());

                            // make sure elements go away when clicked in the cart
                            labels.first().getText().then(function(text){
                                console.log('un-click ' + text);
                                cart.element(by.tagName('input')).click();
                                browser.waitForAngular();

                                var lbls = cart.all(by.repeater('product in selectedProducts'));
                                expect(lbls.getText()).not.toMatch(text);
                            });

                        }
                    })(label));

                }
            });

            var news = element(by.id('News'));
            expect(news).toBeDefined();

        });

        it('when the customer chooses to checkout, the customer is taken to the confirmation page', function() {
            var groups = element(by.id('programs'));
            expect(groups).toBeDefined();

            var checkboxes = groups.all(by.css('input[type=checkbox]'));
            var countProducts = checkboxes.count();

            checkboxes.click();
            browser.waitForAngular();

            // make sure that all products are checked
            var labels = element(by.id('cart')).all(by.repeater('product in selectedProducts'));
            expect(countProducts).toBe(labels.count());

            // make sure all labels in cart are checked
            var inputs = labels.all(by.css('input:checked'));
            expect(labels.count()).toBe(inputs.count());

            element(by.buttonText('Checkout')).click();
            browser.waitForAngular();

            var programs = element(by.id('result')).all(by.repeater('product in products'));
            expect(countProducts).toBe(programs.count());

            expect(browser.getCurrentUrl()).toMatch('view2');

        });

    });

    describe('view2', function() {

        beforeEach(function() {
            browser.get('index.html#/view2');
        });

        it('should render view2 when user navigates to /view2', function() {
            expect(element.all(by.css('[ng-view] p')).first().getText()).toMatch(/partial for view 2/);
        });

    });
});
