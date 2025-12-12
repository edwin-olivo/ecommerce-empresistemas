import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SharedData, Wishlist } from '@/types';
import { usePage } from '@inertiajs/react';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface WishlistSelectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelectWishlist: (wishlist: Wishlist) => void;
    productName: string;
    processing?: boolean;
}

export default function WishlistSelectDialog({ open, onOpenChange, onSelectWishlist, productName, processing = false }: WishlistSelectDialogProps) {
    const { props } = usePage<SharedData>();
    const wishlists = props.wishlists as Wishlist[];
    const [selectedWishlist, setSelectedWishlist] = useState<Wishlist | null>(null);

    const handleSelectWishlist = (wishlist: Wishlist) => {
        setSelectedWishlist(wishlist);
        onSelectWishlist(wishlist);
        onOpenChange(false);
        setSelectedWishlist(null);
    };

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            setSelectedWishlist(null);
        }
        onOpenChange(newOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Heart className="h-5 w-5" />
                        Seleccionar Lista de Deseos
                    </DialogTitle>
                    <DialogDescription>
                        Elige una lista de deseos para agregar <strong>"{productName}"</strong>
                    </DialogDescription>
                </DialogHeader>

                <div className="max-h-96 space-y-2 overflow-y-auto">
                    {wishlists && wishlists.length > 0 ? (
                        wishlists.map((wishlist) => (
                            <Button
                                key={wishlist.id}
                                onClick={() => handleSelectWishlist(wishlist)}
                                disabled={processing || selectedWishlist?.id === wishlist.id}
                                variant="link"
                                className="w-full cursor-pointer rounded-lg border-2 border-gray-200 p-1 text-left transition-all duration-200 hover:border-lime-400 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">{wishlist.name}</h4>
                                    </div>
                                    {selectedWishlist?.id === wishlist.id && (
                                        <div className="ml-4 flex h-5 w-5 items-center justify-center rounded-full bg-lime-400">
                                            <span className="text-xs font-bold text-black">✓</span>
                                        </div>
                                    )}
                                </div>
                            </Button>
                        ))
                    ) : (
                        <div className="py-8 text-center">
                            <p className="mb-4 text-gray-600 dark:text-gray-400">No tienes listas de deseos creadas aún.</p>
                            <Button variant="outline" onClick={() => handleOpenChange(false)}>
                                Cerrar
                            </Button>
                        </div>
                    )}
                </div>

                {wishlists && wishlists.length > 0 && (
                    <div className="mt-4 border-t border-gray-200 pt-4">
                        <Button
                            variant="ghost"
                            className="w-full text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            onClick={() => handleOpenChange(false)}
                        >
                            Cancelar
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
