import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Wishlist } from '@/types';

interface DeleteWishlistProps {
    handleConfirm: () => void;
    wishlist: Wishlist;
    className?: string;
    processing?: boolean;
}

export function DeleteWishlistModal({ handleConfirm, wishlist, className, processing }: DeleteWishlistProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="default" className={className} disabled={processing}>
                    Eliminar
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Eliminar "{wishlist.name}"?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto <strong>eliminará permanentemente</strong> la lista de deseos y todos los productos
                        asociados a ella.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        disabled={processing}
                        className={cn('bg-red-600 hover:bg-red-700 focus:ring-red-600', processing && 'cursor-not-allowed opacity-50')}
                    >
                        Continuar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
