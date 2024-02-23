const EventEmitter = require('events');

class shoping_cart extends EventEmitter {
    constructor() {
        super();
        this.items = [];

        //set up event listeners
        this.on('create',()=>{
            if (this.items.length >= 1) {
                throw new Error('Shopping cart already created.');
            }
            
            this.items.push({
                name: '',
                price: 0,
                amount: 0
            });
            
            console.log('shopping cart created');

    
    
    });
        this.on('update',()=>{
            var quantity = 0;
            this.items.forEach((item)=>{
                quantity += item.amount;
            });
            console.log(`shopping cart updated and now contains: ${quantity} items `);
            console.log(JSON.stringify(this.items)); 
        });

        this.on('destroy',()=>{
            var total_price = 0;
            this.items.forEach((item)=>{
                total_price += item.price * item.amount;
            });
            
            console.log(`total price of shopping cart is ${total_price}`);
        
            //remove all items from cart
            this.items = [];
        
        });
            
            
        this.onCreate();

    }

    onCreate(){
        this.emit('create');
    }

    add(item){
            //check if item is valid
        if (!item || typeof item !== 'object') {
            throw new Error('Item must be a JSON object.');
        }
            //check if item has required properties
        else if (typeof item.name !== 'string' || typeof item.price !== 'number' || typeof item.amount !== 'number') {
            throw new Error('Item must have a string name, a number price, and a number amount.');
        }
        else{
            this.items.push(item);
            this.emit('update');
        }
    }

    remove(item){
        if (!item || typeof item !== 'object') {
            throw new Error('Item must be a JSON object.');
        }
        else if (typeof item.name !== 'string' || typeof item.price !== 'number' || typeof item.amount !== 'number') {
            throw new Error('Item must have a string name, a number price, and a number amount.');
        }
        else{
            index = this.items.indexOf(item);
            if (index === -1) {
                throw new Error('Item not found in cart.');
            }
            else {
                this.items.splice(index, 1);
                this.emit('update');
            }
        }
    }

    destroy(){
        this.emit('destroy');
    }

    show(){
        //convert the object in the cart to a string and print it
        console.log(JSON.stringify(this.items)); 
    }

}

module.exports = shoping_cart;




