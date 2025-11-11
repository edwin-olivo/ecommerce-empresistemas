import { Image } from '@/components/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { formatCurrency } from '@/lib/utils';
import type { Product } from '@/types';
import { ShoppingCart } from 'lucide-react';

interface ProductQuickViewProps {
    product: Product;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    handleAddToCart?: (event: React.FormEvent) => void;
    processing?: boolean;
}

export function ProductDescriptionItem(title: string, description: string) {
    return (
        <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">{title}</p>
            <p className="line-clamp-3 text-sm text-gray-700 dark:text-gray-300">{description}</p>
        </div>
    );
}

export default function ProductQuickView({ product, open, onOpenChange, handleAddToCart, processing }: ProductQuickViewProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="lg:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">{product.part_number}</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Imagen del producto */}
                    <div className="flex items-center justify-center rounded-lg bg-gray-100 p-4">
                        <Image
                            src={product?.custom?.url_imagen}
                            alt={product.part_number || product.name}
                            className="h-full max-h-64 w-full object-contain"
                        />
                    </div>

                    {/* Información del producto */}
                    <div className="flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Precio</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-gray-300">{formatCurrency(product.price)}</p>
                            </div>

                            {product.description && ProductDescriptionItem('Descripción', product.description)}
                            {product.category && ProductDescriptionItem('Categoría', product.category)}
                            {product.type && ProductDescriptionItem('Tipo', product.type)}
                        </div>

                        {/* Botones de acción */}
                        <div className="mt-6 flex flex-col gap-3 lg:flex-row">
                            <Button
                                onClick={handleAddToCart}
                                disabled={processing}
                                className="h-10 cursor-pointer rounded-[40px] border-0 bg-neutral-900 font-medium text-white transition-all duration-300 group-hover:mt-0 hover:bg-lime-400 hover:text-neutral-900"
                            >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Agregar al carrito
                            </Button>
                            <Button variant="outline" onClick={() => onOpenChange(false)} className="h-10 flex-1 rounded-[40px]">
                                Cerrar
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
