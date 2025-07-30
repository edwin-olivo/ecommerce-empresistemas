/**
 * JavaScript principal del ecommerce
 */

// Funciones globales para manejar el carrito
function addToCart(productId, quantity = 1) {
    if (typeof app !== 'undefined' && app.cart) {
        const qty = parseInt(quantity, 10) || 1;
        app.cart.addItem(productId, qty);
    }
}

function removeFromCart(productId) {
    if (typeof app !== 'undefined' && app.cart) {
        app.cart.removeItem(productId);
    }
}

function updateCartQuantity(productId, quantity) {
    if (typeof app !== 'undefined' && app.cart) {
        const qty = parseInt(quantity, 10) || 1;
        app.cart.updateQuantity(productId, qty);
    }
}

// Inicializa la aplicación cuando el DOM esté listo
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new EcommerceApp();

    // Solo si estás en la página del carrito
    if (window.location.pathname.includes('carrito')) {
        console.log('Inicializando página del carrito');
        const cartPage = new CartPage(cartDataUrl, placeHolderImage);
    }
});

// Handle form submissions with loading states
document.addEventListener('submit', (e) => {
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');

    if (submitBtn && !form.hasAttribute('data-no-loading')) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Procesando...';
        submitBtn.disabled = true;

        // Re-enable after a timeout (fallback)
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 5000);
    }
});

// Funciones utilitarias
const utils = {
    formatPrice(price) {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(price);
    },

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    async fetchAPI(url, options = {}) {
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
};
