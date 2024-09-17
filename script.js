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
        },

        isItemInCart(dessert) {
            return this.cart.some(item => item.name === dessert.name);
        },

        getQuantity(dessert) {
            const cartItem = this.cart.find(item => item.name === dessert.name);
            return cartItem ? cartItem.quantity : 0; // Return the quantity if the item is in the cart
        },

        increaseQuantity(dessert) {
            const cartItem = this.cart.find(item => item.name === dessert.name);
            if (cartItem) {
                cartItem.quantity++;
            }
        },

        decreaseQuantity(dessert) {
            const cartItem = this.cart.find(item => item.name === dessert.name);
            if (cartItem && cartItem.quantity > 1) {
                cartItem.quantity--;
            } else {
                this.removeFromCart(dessert);
            }
        },

        removeFromCart(dessert) {
            this.cart = this.cart.filter(cartItem => cartItem.name !== dessert.name);
        },

        get orderTotal() {
            return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        }
    };
}
