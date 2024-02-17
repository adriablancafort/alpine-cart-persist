document.addEventListener('alpine:init', () => {
    Alpine.store('cart', {
        items: [],
        count: 0,
        total: 0,

        getCart() {
            const cart = JSON.parse(localStorage.getItem('cart')) || {};
            this.items = cart.items || [];
            this.total = cart.total || 0;
            this.count = cart.count || 0;
        },
        addToCart(item) {
            const index = this.items.findIndex(cartItem => cartItem.id === item.id);
            if (index > -1) {
                // Item already in cart
                this.items[index].quantity += item.quantity;
            } else {
                // Item not in cart
                this.items.push(item);
            }
            this.count += item.quantity;
            this.total += item.price*item.quantity;
            localStorage.setItem('cart', JSON.stringify(this));
        },
        removeFromCart(item) {
            const index = this.items.findIndex(cartItem => cartItem.id === item.id);
            if (index > -1) {
                this.count -= this.items[index].quantity;
                this.total -= item.price * this.items[index].quantity;
                this.items.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(this));
            }
        },
    });
});