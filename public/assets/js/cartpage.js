class CartPage {
    constructor(cartDataUrl, placeHolderImage) {
        console.log('CartPage initialized with URL:', cartDataUrl);
        this.cartDataUrl = cartDataUrl;
        this.placeholderImage = placeHolderImage || 'https://via.placeholder.com/150'; // Imagen por defecto si no hay imagen del producto
        this.cartData = [];
        this.debouncedUpdateQuantity = utils.debounce(
            (itemElement, newQuantity) => this.updateQuantity(itemElement, newQuantity),
            500
        );
        this.init();
    }

    init() {
        this.loadCartData();
        this.bindEvents();

        // Escuchar actualizaciones del carrito
        window.addEventListener('cartUpdated', () => {
            this.loadCartData();
        });
    }

    async loadCartData() {
        // Obtener datos del carrito desde localStorage
        const cartItems = app.cart.items;

        if (cartItems.length === 0) {
            this.showEmptyCart();
            return;
        }

        // Hacer petición al servidor para obtener datos actualizados del carrito
        try {
            const response = await fetch(this.cartDataUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartData: cartItems
                })
            });

            if (!response.ok) {
                throw new Error('Error al cargar los datos del carrito');
            }

            const data = await response.json();
            if (data.success) {
                this.cartData = data.items;
                this.renderCart(data);
            } else {
                throw new Error(data.error || 'Error al cargar el carrito');
            }

        } catch (error) {
            console.error('Error:', error);
            app.showToast('Error al cargar el carrito', 'error');
            this.showEmptyCart();
        } finally {
            document.getElementById('cart-loading').classList.add('hidden');
        }
    }

    renderCart(data) {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartSummary = document.getElementById('cart-summary');
        const itemCountElement = document.getElementById('cart-item-count');

        // Mostrar contador
        itemCountElement.textContent = `(${data.count} ${data.count === 1 ? 'producto' : 'productos'})`;

        // Limpiar contenedor
        cartItemsContainer.innerHTML = '';

        // Renderizar cada item
        data.items.forEach(item => {
            const itemElement = this.createCartItemElement(item);
            cartItemsContainer.appendChild(itemElement);
        });

        // Actualizar resumen
        document.getElementById('cart-subtotal').textContent = `$${data.subtotal.toFixed(2)}`;
        document.getElementById('cart-total').textContent = `$${data.total.toFixed(2)}`;

        // Mostrar elementos
        cartItemsContainer.classList.remove('hidden');
        cartSummary.classList.remove('hidden');
    }

    createCartItemElement(item) {
        const template = document.getElementById('cart-item-template');
        const clone = template.content.cloneNode(true);

        // Rellenar datos
        clone.querySelector('.item-image').src = item.image_url || this.placeholderImage;
        clone.querySelector('.item-image').alt = item.name;
        clone.querySelector('.item-name').textContent = item.name;
        clone.querySelector('.item-price').textContent = `$${item.price.toFixed(2)}`;
        clone.querySelector('.item-stock').textContent = `Stock: ${item.stock}`;
        clone.querySelector('.item-quantity').value = item.quantity;
        clone.querySelector('.item-quantity').setAttribute('max', item.stock);
        clone.querySelector('.item-total').textContent = `$${item.subtotal.toFixed(2)}`;

        // Agregar data attributes
        const itemDiv = clone.querySelector('.cart-item');
        itemDiv.setAttribute('data-product-id', item.id);

        return clone;
    }

    bindEvents() {
        // Delegación de eventos para elementos dinámicos
        document.addEventListener('click', (e) => {
            if (e.target.closest('.qty-decrease')) {
                this.changeQuantity(e.target.closest('.cart-item'), -1);
            } else if (e.target.closest('.qty-increase')) {
                this.changeQuantity(e.target.closest('.cart-item'), 1);
            } else if (e.target.closest('.remove-item')) {
                this.removeItem(e.target.closest('.cart-item'));
            }
        });

        // Cambio directo en input de cantidad
        document.addEventListener('change', (e) => {
            const itemElement = e.target;
            if (itemElement.classList.contains('item-quantity')) {
                const maxQuantity = parseInt(itemElement.getAttribute('max'));
                if (isNaN(maxQuantity) || parseInt(itemElement.value) > maxQuantity) {
                    app.showToast('Cantidad no válida', 'warning');
                    itemElement.value = maxQuantity || 1; // Restablecer al máximo permitido
                }
                this.updateQuantity(itemElement.closest('.cart-item'), parseInt(itemElement.value));
            }
        });

        // Botón de checkout
        document.getElementById('checkout-btn')?.addEventListener('click', () => {
            // Aquí implementarías la lógica de checkout
            app.showToast('Función de checkout no implementada aún', 'info');
        });

        // Botón de limpiar carrito
        document.getElementById('clear-cart-btn')?.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres vaciar todo el carrito? Esta acción no se puede deshacer.')) {
                clearCart();
                this.showEmptyCart();
                app.showToast('Carrito vaciado', 'success');
            }
        });
    }

    changeQuantity(itemElement, change) {
        const quantityInput = itemElement.querySelector('.item-quantity');
        const currentQuantity = parseInt(quantityInput.value);
        const newQuantity = Math.max(1, currentQuantity + change);
        const maxQuantity = parseInt(quantityInput.getAttribute('max'));

        if (newQuantity <= maxQuantity) {
            quantityInput.value = newQuantity;
            this.debouncedUpdateQuantity(itemElement, newQuantity);
        } else {
            app.showToast('No hay suficiente stock disponible', 'warning');
        }
    }

    updateQuantity(itemElement, newQuantity) {
        // Mostrar loading
        this.showLoadingCart();

        const productId = itemElement.getAttribute('data-product-id');

        if (newQuantity <= 0) {
            this.removeItem(itemElement);
            return;
        }

        // Actualizar en el carrito JavaScript
        updateCartQuantity(productId, newQuantity);

        // Recargar vista del carrito
        setTimeout(() => {
            this.loadCartData();
        }, 100);
    }

    removeItem(itemElement) {
        const productId = itemElement.getAttribute('data-product-id');

        // Confirmar eliminación
        if (confirm('¿Estás seguro de que quieres eliminar este producto del carrito?')) {
            removeFromCart(productId);

            // Recargar vista del carrito
            setTimeout(() => {
                this.loadCartData();
            }, 100);
        }
    }

    showEmptyCart() {
        document.getElementById('cart-loading').classList.add('hidden');
        document.getElementById('cart-items').classList.add('hidden');
        document.getElementById('cart-summary').classList.add('hidden');
        document.getElementById('cart-empty').classList.remove('hidden');
        document.getElementById('cart-item-count').textContent = '';
    }

    showLoadingCart() {
        document.getElementById('cart-loading').classList.remove('hidden');
        document.getElementById('cart-items').classList.add('hidden');
        document.getElementById('cart-summary').classList.add('hidden');
        document.getElementById('cart-empty').classList.add('hidden');
    }
}