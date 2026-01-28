function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                {/* Logo */}
                <a href="#" className="font-['Pacifico'] text-2xl text-primary">
                    logo
                </a>

                {/* Main Navigation */}
                <nav className="hidden space-x-8 md:flex">
                    <a href="#" className="font-medium text-gray-900 transition-colors hover:text-primary">
                        Home
                    </a>
                    <div className="group relative">
                        <button className="flex items-center font-medium text-gray-900 transition-colors hover:text-primary">
                            Shop
                            <div className="ml-1 flex h-4 w-4 items-center justify-center">
                                <i className="ri-arrow-down-s-line"></i>
                            </div>
                        </button>
                        <div className="absolute left-0 mt-2 hidden w-48 rounded bg-white shadow-lg group-hover:block">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                Women
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                Men
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                Accessories
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                Footwear
                            </a>
                        </div>
                    </div>
                    <a href="#" className="font-medium text-gray-900 transition-colors hover:text-primary">
                        New Arrivals
                    </a>
                    <a href="#" className="font-medium text-gray-900 transition-colors hover:text-primary">
                        Sale
                    </a>
                    <a href="#" className="font-medium text-gray-900 transition-colors hover:text-primary">
                        About
                    </a>
                </nav>

                {/* Utility Icons */}
                <div className="flex items-center space-x-6">
                    {/* Search */}
                    <div className="relative">
                        <button
                            id="searchToggle"
                            className="flex h-10 w-10 items-center justify-center text-gray-700 transition-colors hover:text-primary"
                        >
                            <i className="ri-search-line text-xl"></i>
                        </button>
                        <div id="searchDropdown" className="absolute right-0 mt-2 hidden w-72 rounded-lg bg-white p-4 shadow-lg">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full rounded border border-gray-200 py-2 pr-4 pl-10 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                />
                                <div className="absolute top-1/2 left-3 flex h-4 w-4 -translate-y-1/2 transform items-center justify-center text-gray-400">
                                    <i className="ri-search-line"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account */}
                    <div className="group relative">
                        <button className="flex h-10 w-10 items-center justify-center text-gray-700 transition-colors hover:text-primary">
                            <i className="ri-user-line text-xl"></i>
                        </button>
                        <div className="absolute right-0 mt-2 hidden w-48 rounded bg-white shadow-lg group-hover:block">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                Sign In
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                Register
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                My Account
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                Orders
                            </a>
                        </div>
                    </div>

                    {/* Cart */}
                    <div className="relative">
                        <button
                            id="cartToggle"
                            className="flex h-10 w-10 items-center justify-center text-gray-700 transition-colors hover:text-primary"
                        >
                            <i className="ri-shopping-bag-line text-xl"></i>
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                                3
                            </span>
                        </button>
                        <div id="cartDropdown" className="absolute right-0 mt-2 hidden w-80 rounded-lg bg-white p-4 shadow-lg">
                            <h3 className="mb-3 font-medium text-gray-900">Your Cart (3)</h3>
                            <div className="max-h-80 space-y-3 overflow-y-auto">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src="https://readdy.ai/api/search-image?query=minimalist%20white%20t-shirt%20on%20clean%20background%2C%20professional%20product%20photography%2C%20high%20quality%2C%20detailed%20fabric%20texture&width=80&height=80&seq=prod1&orientation=squarish"
                                        alt="Product"
                                        className="h-16 w-16 rounded object-cover"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium">Essential White T-Shirt</h4>
                                        <p className="text-xs text-gray-500">Size: M | Qty: 1</p>
                                        <p className="text-sm font-medium">$24.99</p>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <i className="ri-close-line"></i>
                                    </button>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <img
                                        src="https://readdy.ai/api/search-image?query=minimalist%20black%20jeans%20on%20clean%20background%2C%20professional%20product%20photography%2C%20high%20quality%2C%20detailed%20fabric%20texture&width=80&height=80&seq=prod2&orientation=squarish"
                                        alt="Product"
                                        className="h-16 w-16 rounded object-cover"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium">Slim Fit Black Jeans</h4>
                                        <p className="text-xs text-gray-500">Size: 32 | Qty: 1</p>
                                        <p className="text-sm font-medium">$59.99</p>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <i className="ri-close-line"></i>
                                    </button>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <img
                                        src="https://readdy.ai/api/search-image?query=minimalist%20leather%20watch%20on%20clean%20background%2C%20professional%20product%20photography%2C%20high%20quality%2C%20detailed%20texture&width=80&height=80&seq=prod3&orientation=squarish"
                                        alt="Product"
                                        className="h-16 w-16 rounded object-cover"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium">Classic Leather Watch</h4>
                                        <p className="text-xs text-gray-500">Color: Brown | Qty: 1</p>
                                        <p className="text-sm font-medium">$129.99</p>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <i className="ri-close-line"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4 border-t border-gray-100 pt-3">
                                <div className="mb-3 flex justify-between">
                                    <span className="text-sm text-gray-600">Subtotal</span>
                                    <span className="text-sm font-medium">$214.97</span>
                                </div>
                                <div className="space-y-2">
                                    <a
                                        href="#"
                                        className="rounded-button block w-full bg-primary px-4 py-2 text-center font-medium whitespace-nowrap text-white transition-colors hover:bg-primary/90"
                                    >
                                        Checkout
                                    </a>
                                    <a
                                        href="#"
                                        className="rounded-button block w-full bg-gray-100 px-4 py-2 text-center font-medium whitespace-nowrap text-gray-800 transition-colors hover:bg-gray-200"
                                    >
                                        View Cart
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button id="mobileMenuToggle" className="flex h-10 w-10 items-center justify-center text-gray-700 md:hidden">
                        <i className="ri-menu-line text-2xl"></i>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div id="mobileMenu" className="hidden border-t border-gray-100 bg-white md:hidden">
                <div className="container mx-auto space-y-3 px-4 py-3">
                    <a href="#" className="block py-2 font-medium text-gray-900">
                        Home
                    </a>
                    <div>
                        <button id="mobileShopToggle" className="flex w-full items-center justify-between py-2 font-medium text-gray-900">
                            Shop
                            <i className="ri-arrow-down-s-line"></i>
                        </button>
                        <div id="mobileShopMenu" className="mt-1 hidden space-y-2 pl-4">
                            <a href="#" className="block py-1 text-gray-700">
                                Women
                            </a>
                            <a href="#" className="block py-1 text-gray-700">
                                Men
                            </a>
                            <a href="#" className="block py-1 text-gray-700">
                                Accessories
                            </a>
                            <a href="#" className="block py-1 text-gray-700">
                                Footwear
                            </a>
                        </div>
                    </div>
                    <a href="#" className="block py-2 font-medium text-gray-900">
                        New Arrivals
                    </a>
                    <a href="#" className="block py-2 font-medium text-gray-900">
                        Sale
                    </a>
                    <a href="#" className="block py-2 font-medium text-gray-900">
                        About
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;
