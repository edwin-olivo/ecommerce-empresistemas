import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Address } from '@/types';
import { useForm } from '@inertiajs/react';
import { Checkbox } from '../ui/checkbox';

type AddressFormData = {
    name: string;
    recipient: string;
    phone: string;
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    instructions: string;
    is_default: boolean;
};

interface AddressFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    address?: Address | null;
}

export function AddressForm({ open, onOpenChange, address }: AddressFormProps) {
    const { data, setData, post, put, processing, errors } = useForm<AddressFormData>({
        name: address ? address.name : '',
        recipient: address ? address.recipient : '',
        phone: address ? address.phone : '',
        street_address: address ? address.street_address : '',
        city: address ? address.city : '',
        state: address ? address.state : '',
        postal_code: address ? address.postal_code : '',
        country: address ? address.country : '',
        instructions: address ? address.instructions || '' : '',
        is_default: address ? address.is_default || false : false,
    });

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (address) {
            put(route('address.update', { address: address.id }), {
                onSuccess: () => onOpenChange(false),
            });
        } else {
            post(route('address.store'), {
                onSuccess: () => onOpenChange(false),
            });
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
                <form onSubmit={handleSubmit} key={address?.id || 'create'} className="space-y-4 inert:pointer-events-none inert:opacity-50">
                    <DialogHeader>
                        <DialogTitle>{address ? `Editar ${address.name}` : 'Crear Dirección'}</DialogTitle>
                        <DialogDescription className="py-2">
                            {address
                                ? 'Modifica los detalles de tu dirección a continuación.'
                                : 'Rellena el siguiente formulario para crear una nueva dirección.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Nombre</Label>
                            <Input id="name-1" name="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="recipient-1">Receptor</Label>
                            <Input
                                id="recipient-1"
                                name="recipient"
                                type="text"
                                value={data.recipient}
                                onChange={(e) => setData('recipient', e.target.value)}
                            />
                            {errors.recipient && <p className="text-sm text-red-600">{errors.recipient}</p>}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="phone-1">Teléfono</Label>
                            <Input id="phone-1" name="phone" type="text" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                            {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="street_address-1">Calle</Label>
                            <Input
                                id="street_address-1"
                                name="street_address"
                                type="text"
                                value={data.street_address}
                                onChange={(e) => setData('street_address', e.target.value)}
                            />
                            {errors.street_address && <p className="text-sm text-red-600">{errors.street_address}</p>}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="city-1">Ciudad</Label>
                            <Input id="city-1" name="city" type="text" value={data.city} onChange={(e) => setData('city', e.target.value)} />
                            {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="state-1">Estado</Label>
                            <Input id="state-1" name="state" type="text" value={data.state} onChange={(e) => setData('state', e.target.value)} />
                            {errors.state && <p className="text-sm text-red-600">{errors.state}</p>}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="postal_code-1">Código Postal</Label>
                            <Input
                                id="postal_code-1"
                                name="postal_code"
                                type="text"
                                value={data.postal_code}
                                onChange={(e) => setData('postal_code', e.target.value)}
                            />
                            {errors.postal_code && <p className="text-sm text-red-600">{errors.postal_code}</p>}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="country-1">País</Label>
                            <Input
                                id="country-1"
                                name="country"
                                type="text"
                                value={data.country}
                                onChange={(e) => setData('country', e.target.value)}
                            />
                            {errors.country && <p className="text-sm text-red-600">{errors.country}</p>}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="instructions-1">Instrucciones</Label>
                            <Textarea
                                id="instructions-1"
                                name="instructions"
                                value={data.instructions || ''}
                                onChange={(e) => setData('instructions', e.target.value)}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="is_default-1">¿Establecer como dirección predeterminada?</Label>
                            <Checkbox
                                id="is_default-1"
                                name="is_default"
                                checked={data.is_default || false}
                                onCheckedChange={(checked) => setData('is_default', checked as boolean)}
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
