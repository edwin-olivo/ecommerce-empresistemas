class LoginPage {
    constructor(page = 'login') {
        this.page = page;
        this.init();
    }

    init() {
        console.log(`Initializing LoginPage for ${this.page}`);
        this.bindEvents();
    }

    bindEvents() {
        if (this.page === 'register') {
            document.getElementById('registerForm')?.addEventListener('submit', function (e) {
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const passwordConfirmation = document.getElementById('password_confirmation').value;
                const terms = document.getElementById('terms').checked;

                if (!name || !email || !password || !passwordConfirmation) {
                    e.preventDefault();
                    app.showToast('Por favor completa todos los campos obligatorios', 'error');
                    return;
                }

                if (!isValidEmail(email)) {
                    e.preventDefault();
                    app.showToast('Por favor ingresa un email válido', 'error');
                    return;
                }

                if (!isValidPassword(password)) {
                    e.preventDefault();
                    app.showToast('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número, opcionalmente un carácter especial (@$!%*?&)', 'error');
                    return;
                }

                if (password !== passwordConfirmation) {
                    e.preventDefault();
                    app.showToast('Las contraseñas no coinciden', 'error');
                    return;
                }

                if (!terms) {
                    e.preventDefault();
                    app.showToast('Debes aceptar los términos y condiciones', 'error');
                    return;
                }
            });

            // Validación en tiempo real de la confirmación de la contraseña
            document.getElementById('password_confirmation').addEventListener('input', this.validatePasswordConfirmation);
        }

        if (this.page === 'login') {
            document.getElementById('loginForm').addEventListener('submit', function (e) {
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                if (!email || !password) {
                    e.preventDefault();
                    app.showToast('Por favor completa todos los campos', 'error');
                    return;
                }

                if (!isValidEmail(email)) {
                    e.preventDefault();
                    app.toast('Por favor ingresa un email válido', 'error');
                    return;
                }
            });
        }

        // Validación en tiempo real de la contraseña
        document.getElementById('password').addEventListener('input', function () {
            const password = this.value;
            const isValid = isValidPassword(password);

            if (password.length > 0) {
                if (isValid) {
                    this.classList.remove('border-red-300');
                    this.classList.add('border-green-300');
                } else {
                    this.classList.remove('border-green-300');
                    this.classList.add('border-red-300');
                }
            } else {
                this.classList.remove('border-red-300', 'border-green-300');
            }
        });
    }

    validatePasswordConfirmation() {
        const password = document.getElementById('password');
        const confirmation = document.getElementById('password_confirmation');

        if (confirmation.value.length > 0) {
            if (password.value === confirmation.value) {
                confirmation.classList.remove('border-red-300');
                confirmation.classList.add('border-green-300');
            } else {
                confirmation.classList.remove('border-green-300');
                confirmation.classList.add('border-red-300');
            }
        } else {
            confirmation.classList.remove('border-red-300', 'border-green-300');
        }
    }
}