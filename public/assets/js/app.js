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

function clearCart() {
    if (typeof app !== 'undefined' && app.cart) {
        app.cart.clear();
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

    if (window.location.pathname.includes('login')) {
        console.log('Inicializando página de login');
        const loginPage = new LoginPage('login');
    }

    if (window.location.pathname.includes('registro')) {
        console.log('Inicializando página de registro');
        const registerPage = new LoginPage('register');
    }
});

// Manejo de envíos de formularios (agregando estado de carga)
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

// Perfil
// Cambio de pestañas en el perfil
document.querySelectorAll('.profile-tab').forEach(tab => {
    tab.addEventListener('click', function (e) {
        e.preventDefault();

        // Remove active class from all tabs
        document.querySelectorAll('.profile-tab').forEach(t => {
            t.classList.remove('active', 'bg-blue-50', 'text-blue-700');
            t.classList.add('text-gray-600', 'hover:bg-gray-50', 'hover:text-gray-900');
        });

        // Add active class to clicked tab
        this.classList.add('active', 'bg-blue-50', 'text-blue-700');
        this.classList.remove('text-gray-600', 'hover:bg-gray-50', 'hover:text-gray-900');

        // Hide all content sections
        document.querySelectorAll('.profile-content').forEach(content => {
            content.classList.add('hidden');
        });

        // Show corresponding content
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).classList.remove('hidden');
    });
});

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
}

// Validacion del formulario de registro
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPassword(password) {
    // Al menos 8 caracteres, una mayúscula y un número
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return re.test(password);
}