function Footer() {
    return (
        <footer className="border-t border-gray-100 bg-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
                    {/* Column 1: About */}
                    <div className="lg:col-span-2">
                        <a href="#" className="mb-4 inline-block font-['Pacifico'] text-2xl text-primary">
                            logo
                        </a>
                        <p className="mb-6 max-w-md text-gray-600">
                            We offer premium quality clothing and accessories for men and women. Our mission is to provide sustainable fashion that
                            lasts.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
                            >
                                <i className="ri-facebook-fill"></i>
                            </a>
                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
                            >
                                <i className="ri-instagram-line"></i>
                            </a>
                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
                            >
                                <i className="ri-twitter-x-line"></i>
                            </a>
                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
                            >
                                <i className="ri-pinterest-line"></i>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Shop */}
                    <div>
                        <h3 className="mb-4 font-semibold text-gray-900">Shop</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Women
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Men
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Accessories
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Footwear
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    New Arrivals
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Sale
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Help */}
                    <div>
                        <h3 className="mb-4 font-semibold text-gray-900">Help</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Customer Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    My Account
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Find a Store
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Shipping & Returns
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    FAQs
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: About */}
                    <div>
                        <h3 className="mb-4 font-semibold text-gray-900">About</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Sustainability
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Press
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-100 pt-8">
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        <p className="mb-4 text-sm text-gray-500 md:mb-0">&copy; 2025 ShopEase. All rights reserved.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                                Terms of Service
                            </a>
                            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                                Cookies Settings
                            </a>
                        </div>
                        <div className="mt-4 flex items-center space-x-3 md:mt-0">
                            <i className="ri-visa-fill text-2xl text-gray-600"></i>
                            <i className="ri-mastercard-fill text-2xl text-gray-600"></i>
                            <i className="ri-paypal-fill text-2xl text-gray-600"></i>
                            <i className="ri-apple-fill text-2xl text-gray-600"></i>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
