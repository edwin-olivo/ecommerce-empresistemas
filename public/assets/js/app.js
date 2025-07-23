/**
 * JavaScript principal del ecommerce
 * Maneja carrito, AJAX y UX sin jQuery
 */

class EcommerceApp {
    constructor() {
        this.cart = new Cart();
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeComponents();
        this.cart.updateCartUI();
    }

    bindEvents() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', this.toggleMobileMenu);
        }

        // Search form
        const searchForm = document.querySelector('form[action*="productos"]');
        if (searchForm) {
            searchForm.addEventListener('submit', this.handleSearch);
        }

        // Product filters
        const filterForm = document.getElementById('filter-form');
        if (filterForm) {
            filterForm.addEventListener('change', this.handleFilterChange);
        }

        // Quantity selectors
        document.addEventListener('click', (e) => {
            if (e.target.matches('.qty-minus')) {
                this.changeQuantity(e.target, -1);
            }
            if (e.target.matches('.qty-plus')) {
                this.changeQuantity(e.target, 1);
            }
        });
    }

    initializeComponents() {
        // Initialize dropdowns
        this.initDropdowns();

        // Initialize image gallery
        this.initImageGallery();

        // Initialize lazy loading
        this.initLazyLoading();
    }

    initDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown-trigger');
            const menu = dropdown.querySelector('.dropdown-menu');

            if (trigger && menu) {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    menu.classList.toggle('hidden');
                });

                // Close on outside click
                document.addEventListener('click', (e) => {
                    if (!dropdown.contains(e.target)) {
                        menu.classList.add('hidden');
                    }
                });
            }
        });
    }

    initImageGallery() {
        const mainImage = document.getElementById('main-product-image');
        const thumbnails = document.querySelectorAll('.product-thumbnail');

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                e.preventDefault();
                if (mainImage) {
                    mainImage.src = thumb.dataset.image;

                    // Update active thumbnail
                    thumbnails.forEach(t => t.classList.remove('ring-2', 'ring-primary-500'));
                    thumb.classList.add('ring-2', 'ring-primary-500');
                }
            });
        });
    }

    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    toggleMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        if (menu) {
            menu.classList.toggle('hidden');
        }
    }

    handleSearch(e) {
        const form = e.target;
        const searchInput = form.querySelector('input[name="search"]');

        if (searchInput && searchInput.value.trim() === '') {
            e.preventDefault();
            this.showToast('Por favor ingresa un término de búsqueda', 'warning');
        }
    }

    handleFilterChange(e) {
        const form = e.target.closest('form');
        if (form) {
            // Auto-submit form when filters change
            setTimeout(() => {
                form.submit();
            }, 100);
        }
    }

    changeQuantity(button, change) {
        const qtyInput = button.parentElement.querySelector('input[type="number"]');
        if (qtyInput) {
            const currentValue = parseInt(qtyInput.value) || 1;
            const newValue = Math.max(1, currentValue + change);
            qtyInput.value = newValue;

            // Trigger change event
            qtyInput.dispatchEvent(new Event('change'));
        }
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        const bgColor = {
            'success': 'bg-green-500',
            'error': 'bg-red-500',
            'warning': 'bg-yellow-500',
            'info': 'bg-blue-500'
        }[type] || 'bg-blue-500';

        toast.className = `${bgColor} text-white px-6 py-3 rounded-lg shadow-lg mb-4 transform transition-all duration-300 translate-x-full`;
        toast.textContent = message;

        const container = document.getElementById('toast-container');
        if (container) {
            container.appendChild(toast);

            // Animate in
            setTimeout(() => {
                toast.classList.remove('translate-x-full');
            }, 100);

            // Remove after 3 seconds
            setTimeout(() => {
                toast.classList.add('translate-x-full');
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            }, 3000);
        }
    }
}

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
