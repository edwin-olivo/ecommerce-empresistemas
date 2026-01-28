import { ArrivalProduct } from '@/components/sections/arrivals';
import { Category } from '@/components/sections/categories';
import { FeaturedProduct } from '@/components/sections/featured';

export const categories: Category[] = [
    {
        src: 'https://readdy.ai/api/search-image?query=elegant%20womens%20clothing%20collection%2C%20minimal%20background%2C%20professional%20fashion%20photography%2C%20soft%20lighting%2C%20high-end%20apparel%20displayed%20neatly&width=400&height=500&seq=cat1&orientation=portrait',
        alt: 'Colección de Mujeres',
        title: 'Mujeres',
        description: 'Ver Colección',
    },
    {
        src: 'https://readdy.ai/api/search-image?query=stylish%20mens%20clothing%20collection%2C%20minimal%20background%2C%20professional%20fashion%20photography%2C%20soft%20lighting%2C%20high-end%20apparel%20displayed%20neatly&width=400&height=500&seq=cat2&orientation=portrait',
        alt: 'Colección de Hombres',
        title: 'Hombres',
        description: 'Ver Colección',
    },
    {
        src: 'https://readdy.ai/api/search-image?query=premium%20accessories%20collection%20including%20bags%2C%20jewelry%2C%20watches%2C%20minimal%20background%2C%20professional%20product%20photography%2C%20soft%20lighting%2C%20high-end%20items%20displayed%20neatly&width=400&height=500&seq=cat3&orientation=portrait',
        alt: 'Colección de Accesorios',
        title: 'Accessorios',
        description: 'Ver Colección',
    },
    {
        src: 'https://readdy.ai/api/search-image?query=luxury%20footwear%20collection%20including%20shoes%2C%20boots%2C%20sneakers%2C%20minimal%20background%2C%20professional%20product%20photography%2C%20soft%20lighting%2C%20high-end%20items%20displayed%20neatly&width=400&height=500&seq=cat4&orientation=portrait',
        alt: 'Colección de Calzado',
        title: 'Calzado',
        description: 'Ver Colección',
    },
];

export const arrivals: ArrivalProduct[] = [
    {
        imageUrl:
            'https://readdy.ai/api/search-image?query=elegant%20silk%20scarf%20on%20minimal%20light%20background%2C%20professional%20fashion%20photography%2C%20high%20quality%20product%20image%2C%20detailed%20fabric%20texture&width=500&height=600&seq=prod8&orientation=portrait',
        title: 'Luxury Silk Scarf',
        rating: 4,
        ratingCount: 12,
        price: 39.99,
    },
    {
        imageUrl:
            'https://readdy.ai/api/search-image?query=premium%20leather%20handbag%20on%20minimal%20light%20background%2C%20professional%20fashion%20photography%2C%20high%20quality%20product%20image%2C%20detailed%20leather%20texture&width=500&height=600&seq=prod9&orientation=portrait',
        title: 'Designer Leather Handbag',
        rating: 4.5,
        ratingCount: 8,
        price: 149.99,
    },
    {
        imageUrl:
            'https://readdy.ai/api/search-image?query=stylish%20sunglasses%20on%20minimal%20light%20background%2C%20professional%20product%20photography%2C%20high%20quality%20image%2C%20detailed%20texture&width=500&height=600&seq=prod10&orientation=portrait',
        title: 'Premium Sunglasses',
        rating: 4,
        ratingCount: 6,
        price: 89.99,
    },
];

export const featuredProducts: FeaturedProduct[] = [
    {
        imageUrl:
            'https://readdy.ai/api/search-image?query=elegant%20white%20blouse%20on%20minimal%20light%20background%2C%20professional%20fashion%20photography%2C%20high%20quality%20product%20image%2C%20detailed%20fabric%20texture&width=500&height=600&seq=prod4&orientation=portrait',
        imageAlt: 'White Blouse',
        isNew: true,
        title: 'Elegant White Blouse',
        rating: 4.5,
        ratingCount: 42,
        price: 49.99,
    },
    {
        imageUrl:
            'https://readdy.ai/api/search-image?query=premium%20denim%20jeans%20on%20minimal%20light%20background%2C%20professional%20fashion%20photography%2C%20high%20quality%20product%20image%2C%20detailed%20fabric%20texture&width=500&height=600&seq=prod5&orientation=portrait',
        imageAlt: 'Denim Jeans',
        isBestSeller: true,
        title: 'Premium Denim Jeans',
        rating: 5,
        ratingCount: 128,
        price: 79.99,
    },
    {
        imageUrl:
            'https://readdy.ai/api/search-image?query=stylish%20leather%20jacket%20on%20minimal%20light%20background%2C%20professional%20fashion%20photography%2C%20high%20quality%20product%20image%2C%20detailed%20leather%20texture&width=500&height=600&seq=prod6&orientation=portrait',
        imageAlt: 'Leather Jacket',
        title: 'Classic Leather Jacket',
        rating: 4,
        ratingCount: 76,
        price: 199.99,
    },
    {
        imageUrl:
            'https://readdy.ai/api/search-image?query=elegant%20summer%20dress%20on%20minimal%20light%20background%2C%20professional%20fashion%20photography%2C%20high%20quality%20product%20image%2C%20detailed%20fabric%20texture&width=500&height=600&seq=prod7&orientation=portrait',
        imageAlt: 'Summer Dress',
        isOnSale: true,
        title: 'Floral Summer Dress',
        rating: 4.5,
        ratingCount: 54,
        price: 59.99,
    },
];
