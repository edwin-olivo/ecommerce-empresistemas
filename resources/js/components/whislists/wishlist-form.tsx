import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Wishlist } from '@/types';
import { useForm } from '@inertiajs/react';

interface WishlistFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    wishlist?: Wishlist | null;
}

export function WishlistForm({ open, onOpenChange, wishlist }: WishlistFormProps) {
    const { data, setData, post, put, processing, errors } = useForm<{ name: string; description: string }>({
        name: wishlist ? wishlist.name : '',
        description: wishlist ? wishlist.description : '',
    });

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (wishlist) {
            put(route('wishlist.update', { wishlist: wishlist.id }), {
                onSuccess: () => onOpenChange(false),
            });
        } else {
            post(route('wishlist.store'), {
                onSuccess: () => onOpenChange(false),
            });
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit} key={wishlist?.id || 'create'} className="space-y-4 inert:pointer-events-none inert:opacity-50">
                    <DialogHeader>
                        <DialogTitle>{wishlist ? `Editar ${wishlist.name}` : 'Crear Lista de Deseos'}</DialogTitle>
                        <DialogDescription className="py-2">
                            {wishlist
                                ? 'Modifica los detalles de tu lista de deseos a continuación.'
                                : 'Rellena el siguiente formulario para crear una nueva lista de deseos.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Nombre</Label>
                            <Input id="name-1" name="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description-1">Descripción</Label>
                            <Textarea
                                id="description-1"
                                name="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <div className="space-x-2 pt-4">
                            <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button type="submit" className="cursor-pointer" disabled={processing}>
                                Guardar cambios
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
