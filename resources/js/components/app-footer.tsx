import { Link } from '@inertiajs/react';

export function AppFooter() {
    const currentYear = new Date().getFullYear();

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
                                <Link href={route('page.contact')} className="hover:text-white">
                                    Contacto
                                </Link>
                            </li>
                            <li>
                                <Link href={route('page.faq')} className="hover:text-white">
                                    Preguntas Frecuentes
                                </Link>
                            </li>
                            <li>
                                <Link href={route('page.shipping')} className="hover:text-white">
                                    Envíos
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 font-semibold text-white">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href={route('page.privacy')} className="hover:text-white">
                                    Privacidad
                                </Link>
                            </li>
                            <li>
                                <Link href={route('page.terms')} className="hover:text-white">
                                    Términos
                                </Link>
                            </li>
                            <li>
                                <Link href={route('page.cookies')} className="hover:text-white">
                                    Cookies
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-neutral-800 pt-8 text-center text-sm">
                    <p>&copy; {currentYear} Tienda Online. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
