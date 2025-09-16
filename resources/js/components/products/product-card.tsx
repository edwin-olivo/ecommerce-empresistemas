import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/types';

interface Props {
    product: Product;
}

function ProductCard({ product }: Props) {
    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'En Stock':
                return 'default';
            case 'Pocas Unidades':
                return 'secondary';
            case 'Agotado':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const imageSrc = typeof product.imageUrl === 'string' && product.imageUrl.trim() !== '' ? product.imageUrl : 'https://placehold.co/600x400';

    return (
        <Card className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
            <CardHeader className="p-0">
                <img src={imageSrc} alt={product.name} className="h-48 w-full object-cover" />
                <Badge variant={getStatusBadgeVariant(product.status ?? 'default')} className="absolute m-2">
                    {product.status ?? ''}
                </Badge>
            </CardHeader>
            <CardContent className="flex-grow p-4">
                <p className="text-sm text-muted-foreground">{product.category}</p>
                <CardTitle className="mt-1 text-lg font-semibold">{product.name}</CardTitle>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4 pt-0">
                <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
                <Button>Ver Más</Button>
            </CardFooter>
        </Card>
    );
}

export default ProductCard;
