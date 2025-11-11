import { Link } from '@inertiajs/react';

export function AppFooter() {
    return (
        <footer className="border-t border-neutral-200 bg-neutral-950 py-12 text-neutral-400 dark:border-neutral-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-4">
                    <div>
                        <h3 className="mb-4 font-semibold text-white">Sobre Nosotros</h3>
                        <p className="text-sm">Somos una tienda online dedicada a ofrecer los mejores productos con la mejor atención.</p>
                    </div>
                    <div>
                        <h3 className="mb-4 font-semibold text-white">Enlaces</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href={route('products.index')} className="hover:text-white">
                                    Productos
                                </Link>
                            </li>
                            <li>
                                <Link href={route('dashboard')} className="hover:text-white">
                                    Mi Cuenta
                                </Link>
                            </li>
                            <li>
                                <Link href={route('cart.index')} className="hover:text-white">
                                    Carrito
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 font-semibold text-white">Soporte</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-white">
                                    Contacto
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Preguntas Frecuentes
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Envíos
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 font-semibold text-white">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-white">
                                    Privacidad
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Términos
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Cookies
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-neutral-800 pt-8 text-center text-sm">
                    <p>&copy; 2024 Tienda Online. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
