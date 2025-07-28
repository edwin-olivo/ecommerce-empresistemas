class Cart {
    constructor() {
        this.items = this.loadCart();
    }

    loadCart() {
        try {
            const cartData = localStorage.getItem('ecommerce_cart');
            return cartData ? JSON.parse(cartData) : [];
        } catch (e) {
            console.error('Error loading cart:', e);
            return [];
        }
    }

    saveCart() {
        try {
            localStorage.setItem('ecommerce_cart', JSON.stringify(this.items));
            this.updateCartUI();
        } catch (e) {
            console.error('Error saving cart:', e);
        }
    }

    addItem(productId, quantity = 1) {
        const existingItem = this.items.find(item => item.productId === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ productId, quantity });
        }

        this.saveCart();
        app.showToast('Producto agregado al carrito', 'success');
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.productId !== productId);
        this.saveCart();
        app.showToast('Producto eliminado del carrito', 'info');
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.productId === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const total = this.getTotal();
            cartCount.textContent = total;
            cartCount.style.display = total > 0 ? 'flex' : 'none';
        }
    }

    clear() {
        this.items = [];
        this.saveCart();
    }
}