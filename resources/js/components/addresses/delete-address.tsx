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
import { DireccionCompleta } from '@/types';

interface DeleteAddressProps {
    handleConfirm: () => void;
    address: DireccionCompleta;
    className?: string;
    processing?: boolean;
}

export function DeleteAddress({ handleConfirm, address, className, processing }: DeleteAddressProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="default" className={className} disabled={processing}>
                    Eliminar
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Eliminar "{address.name}"?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto <strong>eliminará permanentemente</strong> la dirección y todos los datos asociados a
                        ella.
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
