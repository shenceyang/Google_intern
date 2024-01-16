var Shopping_cart  = require('./shopping_cart_eventEmitter.js');
var cart_1 = new Shopping_cart();
cart_1.show();

cart_1.add({
    name: 'apple',
    price: 5,
    amount: 10
});

cart_1.add({
    name: 'banana',
    price: 10,
    amount: 10
});

cart_1.destroy();

cart_1.show();