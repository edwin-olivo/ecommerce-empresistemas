import type { BreadcrumbItem } from '@/types';

export const breadcrumbPaths = {
    home: { title: 'Inicio', href: '/' },
    products: { title: 'Productos', href: '/products' },
    cart: { title: 'Carrito', href: '/cart' },
    checkout: { title: 'Checkout', href: '/checkout' },
    profile: { title: 'Mi Perfil', href: '/profile' },
    orders: { title: 'Mis Pedidos', href: '/profile/orders' },
    sales: { title: 'Ofertas', href: '/sales' },
    contact: { title: 'Contacto', href: '/contact' },
    login: { title: 'Iniciar Sesión', href: '/login' },
    register: { title: 'Registro', href: '/register' },
};

export const getBreadcrumbs = (route: string, extras?: BreadcrumbItem[]): BreadcrumbItem[] => {
    const base: BreadcrumbItem[] = [breadcrumbPaths.home];

    const routeMap: Record<string, BreadcrumbItem[]> = {
        '/products': [breadcrumbPaths.products],
        '/cart': [breadcrumbPaths.cart],
        '/checkout': [breadcrumbPaths.cart, breadcrumbPaths.checkout],
        '/profile': [breadcrumbPaths.profile],
        '/profile/orders': [breadcrumbPaths.profile, breadcrumbPaths.orders],
        '/sales': [breadcrumbPaths.sales],
        '/contact': [breadcrumbPaths.contact],
    };

    return [...base, ...(routeMap[route] || []), ...(extras || [])];
};
