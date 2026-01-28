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
                            Ofrecemos ropa y accesorios de primera calidad para hombres y mujeres. Nuestra misión es proporcionar moda sostenible que
                            dure.
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
                                    Mujeres
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Hombres
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Accesorios
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Calzado
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Novedades
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Ofertas
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
                                    Servicio al Cliente
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Mi Cuenta
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Encontrar una Tienda
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Envíos y Devoluciones
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Preguntas Frecuentes
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: About */}
                    <div>
                        <h3 className="mb-4 font-semibold text-gray-900">Acerca de</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Sobre Nosotros
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Sostenibilidad
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Vacantes
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Prensa
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 transition-colors hover:text-primary">
                                    Contáctanos
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-100 pt-8">
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        <p className="mb-4 text-sm text-gray-500 md:mb-0">
                            &copy; {new Date().getFullYear()} ShopEase. Todos los derechos reservados.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                                Política de Privacidad
                            </a>
                            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                                Términos de Servicio
                            </a>
                            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                                Configuración de Cookies
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
