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
    const pathName = window.location.pathname;

    // Solo si estás en la página del carrito
    if (pathName.includes('carrito')) {
        console.log('Inicializando página del carrito');
        const cartPage = new CartPage(cartDataUrl, placeHolderImage);
    }

    if (pathName.includes('login')) {
        console.log('Inicializando página de login');
        const loginPage = new LoginPage('login');
    }

    if (pathName.includes('registro')) {
        console.log('Inicializando página de registro');
        const registerPage = new LoginPage('register');
    }

    if (pathName.includes('/pago/exito')) {
        clearCart();
        console.log('Carrito limpiado después de pago exitoso');
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
            t.classList.remove('active', 'bg-primary-50', 'text-primary-700');
            t.classList.add('text-gray-600', 'hover:bg-gray-50', 'hover:text-gray-900');
            t.querySelector('svg').classList.remove('text-primary-500', 'group-hover:text-primary-500');
            t.querySelector('svg').classList.add('text-gray-400', 'group-hover:text-gray-500');
        });

        // Add active class to clicked tab
        this.classList.add('active', 'bg-primary-50', 'text-primary-700');
        this.classList.remove('text-gray-600', 'hover:bg-gray-50', 'hover:text-gray-900');
        this.querySelector('svg').classList.add('text-primary-500', 'group-hover:text-primary-500');
        this.querySelector('svg').classList.remove('text-gray-400', 'group-hover:text-gray-500');

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