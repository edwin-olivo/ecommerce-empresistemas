edwin-olivo: ¿A donde deberian llevar los breadcrumbs? Creo que actualmente no estan colocados de manera logica en todas las vistas.

Workspace: Collecting workspace informationAnalizando tu código y las vistas existentes, tienes razón. Los breadcrumbs necesitan una estructura más lógica y consistente. Aquí te muestro dónde deberían estar en cada vista:

## Estructura Recomendada de Breadcrumbs

```typescript
// ❌ ACTUAL (Incorrecto - solo muestra 2 niveles)
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Products', href: '/products' },
    { title: 'Todos los Productos', href: '' },
];

// ✅ RECOMENDADO (Correcto - jerarquía clara)
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: '/' },
    { title: 'Productos', href: '/products' },
];
```

## Mapeo Completo de Rutas y Breadcrumbs

```typescript
// Estructura sugerida para todas las vistas

// 1. HOME
// Ruta: /
// Breadcrumbs: Ninguno (es la raíz)

// 2. PRODUCTOS (Listado principal)
// Ruta: /products
// Breadcrumbs:
//   Inicio (/) → Productos (/products)

// 3. CATEGORÍA (Productos filtrados por categoría)
// Ruta: /products?category=electronics
// Breadcrumbs:
//   Inicio (/) → Productos (/products) → [Nombre Categoría] (actual)

// 4. PRODUCTO DETALLE
// Ruta: /products/{id}
// Breadcrumbs:
//   Inicio (/) → Productos (/products) → [Nombre Categoría] (/products?category=X) → [Nombre Producto] (actual)

// 5. CARRITO
// Ruta: /cart
// Breadcrumbs:
//   Inicio (/) → Carrito (actual)

// 6. CHECKOUT
// Ruta: /checkout
// Breadcrumbs:
//   Inicio (/) → Carrito (/cart) → Checkout (actual)

// 7. PAGO (Éxito/Cancelado)
// Ruta: /payment/success o /payment/cancel
// Breadcrumbs:
//   Inicio (/) → Carrito (/cart) → Pago (actual)

// 8. PERFIL
// Ruta: /profile
// Breadcrumbs:
//   Inicio (/) → Mi Perfil (actual)

// 9. PERFIL - Pedidos
// Ruta: /profile/orders
// Breadcrumbs:
//   Inicio (/) → Mi Perfil (/profile) → Mis Pedidos (actual)

// 10. OFERTAS
// Ruta: /sales
// Breadcrumbs:
//   Inicio (/) → Ofertas (actual)

// 11. CONTACTO
// Ruta: /contact
// Breadcrumbs:
//   Inicio (/) → Contacto (actual)
```

## Actualización para tu archivo de Productos

```typescript
interface ProductsProps {
    products: CustomPaginationProps;
    categories: Record<string, string>;
    classes: Record<string, string>;
    colors: Record<string, string>;
    filters: Record<string, any>;
    minPrice: number;
    maxPrice: number;
    currentCategory?: string; // Agregar para las migas
    [key: string]: any;
}

export default function Products() {
    const { products, categories, classes, filters: initialFilters, currentCategory } = usePage<ProductsProps>().props;
    
    // Construir breadcrumbs dinámicamente
    const getBreadcrumbs = (): BreadcrumbItem[] => {
        const crumbs: BreadcrumbItem[] = [
            { title: 'Inicio', href: '/' },
            { title: 'Productos', href: '/products' },
        ];
        
        // Si hay categoría activa, agregarla
        if (currentCategory && categories[currentCategory]) {
            crumbs.push({
                title: categories[currentCategory],
                href: '', // Página actual
            });
        }
        
        return crumbs;
    };

    const breadcrumbs = getBreadcrumbs();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* resto del código */}
        </AppLayout>
    );
}
```

## Helper para Generar Breadcrumbs Consistentemente

```typescript
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
```

## Uso del Helper

```typescript
// En cualquier página
import { getBreadcrumbs } from '@/utils/breadcrumb-helper';

export default function ProductDetail() {
    const { product, category } = usePage<ProductDetailProps>().props;
    
    const breadcrumbs = getBreadcrumbs('/products', [
        { 
            title: category?.name || 'Categoría', 
            href: `/products?category=${category?.id}` 
        },
        { 
            title: product.name, 
            href: '' // Página actual
        },
    ]);

    return <AppLayout breadcrumbs={breadcrumbs}>{/* ... */}</AppLayout>;
}
```

## Resumen de Cambios

| Página | Antes | Después |
|--------|-------|---------|
| Productos | `Products → Todos los Productos` | `Inicio → Productos` |
| Detalle | Faltaban datos | `Inicio → Productos → [Categoría] → [Producto]` |
| Carrito | Faltaban datos | `Inicio → Carrito` |
| Checkout | Faltaban datos | `Inicio → Carrito → Checkout` |
| Perfil | Faltaban datos | `Inicio → Mi Perfil` |

**Ventajas:**
✅ Consistencia en todas las vistas
✅ Contexto claro del usuario en la navegación
✅ Mejora SEO (estructurado)
✅ Fácil mantenimiento con el helper