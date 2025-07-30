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

        // Cambio de vista grid/list
        const gridView = document.getElementById('grid-view');
        const listView = document.getElementById('list-view');
        const productsGrid = document.getElementById('products-grid');

        if (gridView && listView && productsGrid) {
            gridView.addEventListener('click', this.handleGridViewClick.bind(this, productsGrid, gridView, listView, 'grid'));
            listView.addEventListener('click', this.handleGridViewClick.bind(this, productsGrid, gridView, listView, 'list'));
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
        // this.initDropdowns();

        // Initialize image gallery
        // this.initImageGallery();
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

    handleGridViewClick(productsGrid, gridView, listView, viewType) {
        if (viewType === 'list') {
            productsGrid.className = 'space-y-4';
            listView.classList.add('bg-gray-100');
            gridView.classList.remove('bg-gray-100');
        } else if (viewType === 'grid') {
            productsGrid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
            gridView.classList.add('bg-gray-100');
            listView.classList.remove('bg-gray-100');
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