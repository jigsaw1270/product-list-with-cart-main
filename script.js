function dessertCards() {
    return {
        desserts: [], 
        cart: [],
        
        async fetchDesserts() {
            try {
                const response = await fetch('./data.json');
                this.desserts = await response.json(); 
            } catch (error) {
                console.error('Error fetching the desserts:', error);
            }
        },
        
        addToCart(dessert) {
            // Convert proxy to plain object
            const plainDessert = JSON.parse(JSON.stringify(dessert));
        
            console.log('Adding to Cart:', plainDessert); 
            console.log('name:', plainDessert.name );


          
        
            let itemInCart = this.cart.find(item => item.name === plainDessert.name);
        
            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                const item = {
                    name: plainDessert.name || 'Unnamed Item',  
                    price: plainDessert.price || 0,             
                    category: plainDessert.category || 'Other', 
                    quantity: 1
                };
        
                this.cart.push(item);
            }
        
            console.log('Cart:', JSON.parse(JSON.stringify(this.cart))); 
        }
        ,
        isItemInCart(dessert) {
            return this.cart.some(item => item.name === dessert.name);
        },

        increaseQuantity(item) {
            item.quantity++;
            this.$nextTick(() => {});
        },

        decreaseQuantity(item) {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                this.removeFromCart(item);
            }
            this.$nextTick(() => {});
        },

        removeFromCart(item) {
            this.cart = this.cart.filter(cartItem => cartItem.name !== item.name);
            this.$nextTick(() => {});
        },

        get orderTotal() {
            return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
            
        }
    };
}
