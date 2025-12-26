import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DireccionCompleta } from '@/types';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

interface AddressFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    address?: DireccionCompleta | null;
    listas: {
        paqueterias: Record<string, string>;
        entidades_federativas: Record<string, string>;
        paises: Record<string, string>;
    };
}

interface AddressFormData {
    name: string;
    calle: string;
    noextenv: string;
    nointenvio: string;
    colenvio: string;
    ciudadenvio: string;
    estadoenvio: string;
    paisenvio: string;
    cpenvio: string;
    description: string;
    referencia_c: string;
    direccion_predeterminada_c: boolean;
}

export function AddressForm({ open, onOpenChange, address, listas }: AddressFormProps) {
    const { data, setData, post, put, processing, errors, clearErrors, reset } = useForm<AddressFormData>({
        name: '',
        calle: '',
        noextenv: '',
        nointenvio: '',
        colenvio: '',
        ciudadenvio: '',
        estadoenvio: '',
        paisenvio: '',
        cpenvio: '',
        description: '',
        referencia_c: '',
        direccion_predeterminada_c: false,
    });

    const { paqueterias, entidades_federativas, paises } = listas;

    useEffect(() => {
        if (open) {
            setData({
                name: address?.name ?? '',
                calle: address?.calle ?? '',
                noextenv: address?.noextenv ?? '',
                nointenvio: address?.nointenvio ?? '',
                colenvio: address?.colenvio ?? '',
                ciudadenvio: address?.ciudadenvio ?? '',
                estadoenvio: address?.estadoenvio ?? '',
                paisenvio: address?.paisenvio ?? '',
                cpenvio: address?.cpenvio ?? '',
                description: address?.description ?? '',
                referencia_c: address?.referencia_c ?? '',
                direccion_predeterminada_c: !!address?.direccion_predeterminada_c,
            });
            clearErrors();
        }
    }, [open, address]); // Dependencias: se ejecuta al abrir o al cambiar de dirección

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const options = {
            onSuccess: () => {
                onOpenChange(false);
                reset();
            },
            preserveScroll: true,
        };

        if (address) {
            put(route('address.update', address.id), options);
        } else {
            post(route('address.store'), options);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <form onSubmit={handleSubmit} key={address?.id || 'create'} className="space-y-4 inert:pointer-events-none inert:opacity-50">
                    <DialogHeader>
                        <DialogTitle>{address ? `Editar ${address.name}` : 'Crear Dirección'}</DialogTitle>
                        <DialogDescription className="py-2">
                            {address
                                ? 'Modifica los detalles de tu dirección a continuación.'
                                : 'Rellena el siguiente formulario para crear una nueva dirección.'}
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-[300px] pr-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="grid gap-3">
                                <Label htmlFor="name-1">Nombre</Label>
                                <Input id="name-1" name="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="calle-1">Calle</Label>
                                <Input id="calle-1" name="calle" type="text" value={data.calle} onChange={(e) => setData('calle', e.target.value)} />
                                {errors.calle && <p className="text-sm text-red-600">{errors.calle}</p>}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="noextenv-1">Número Exterior</Label>
                                <Input
                                    id="noextenv-1"
                                    name="noextenv"
                                    type="text"
                                    value={data.noextenv}
                                    onChange={(e) => setData('noextenv', e.target.value)}
                                />
                                {errors.noextenv && <p className="text-sm text-red-600">{errors.noextenv}</p>}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="nointenvio-1">Número Interior</Label>
                                <Input
                                    id="nointenvio-1"
                                    name="nointenvio"
                                    type="text"
                                    value={data.nointenvio}
                                    onChange={(e) => setData('nointenvio', e.target.value)}
                                />
                                {errors.nointenvio && <p className="text-sm text-red-600">{errors.nointenvio}</p>}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="colenvio-1">Colonia</Label>
                                <Input
                                    id="colenvio-1"
                                    name="colenvio"
                                    type="text"
                                    value={data.colenvio}
                                    onChange={(e) => setData('colenvio', e.target.value)}
                                />
                                {errors.colenvio && <p className="text-sm text-red-600">{errors.colenvio}</p>}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="ciudadenvio-1">Ciudad</Label>
                                <Input
                                    id="ciudadenvio-1"
                                    name="ciudadenvio"
                                    type="text"
                                    value={data.ciudadenvio}
                                    onChange={(e) => setData('ciudadenvio', e.target.value)}
                                />
                                {errors.ciudadenvio && <p className="text-sm text-red-600">{errors.ciudadenvio}</p>}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="estadoenvio-1">Estado</Label>
                                <Select value={data.estadoenvio} onValueChange={(value) => setData('estadoenvio', value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecciona un estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Estados</SelectLabel>
                                            {Object.entries(entidades_federativas).map(([key, value]) => (
                                                <SelectItem key={key} value={key}>
                                                    {value.charAt(0).toUpperCase() + value.toLowerCase().slice(1)}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.estadoenvio && <p className="text-sm text-red-600">{errors.estadoenvio}</p>}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="paisenvio-1">País</Label>
                                <Select value={data.paisenvio} onValueChange={(value) => setData('paisenvio', value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecciona un país" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Países</SelectLabel>
                                            {Object.entries(paises).map(([key, value]) => (
                                                <SelectItem key={key} value={key}>
                                                    {value}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.paisenvio && <p className="text-sm text-red-600">{errors.paisenvio}</p>}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="cpenvio-1">Código Postal</Label>
                                <Input
                                    id="cpenvio-1"
                                    name="cpenvio"
                                    type="text"
                                    value={data.cpenvio}
                                    onChange={(e) => setData('cpenvio', e.target.value)}
                                />
                                {errors.cpenvio && <p className="text-sm text-red-600">{errors.cpenvio}</p>}
                            </div>
                            <div className="grid gap-3 md:col-span-2">
                                <Label htmlFor="description-1">Instrucciones</Label>
                                <Textarea
                                    id="description-1"
                                    name="description"
                                    value={data.description || ''}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                            </div>
                            <div className="grid gap-3 md:col-span-2">
                                <Label htmlFor="referencia_c-1">Referencia</Label>
                                <Textarea
                                    id="referencia_c-1"
                                    name="referencia_c"
                                    value={data.referencia_c || ''}
                                    onChange={(e) => setData('referencia_c', e.target.value)}
                                />
                                {errors.referencia_c && <p className="text-sm text-red-600">{errors.referencia_c}</p>}
                            </div>
                            <div className="flex items-center gap-3">
                                <Label htmlFor="direccion_predeterminada_c-1" className="mb-0 cursor-pointer">
                                    ¿Establecer como dirección predeterminada?
                                </Label>
                                <Checkbox
                                    id="direccion_predeterminada_c-1"
                                    name="direccion_predeterminada_c"
                                    checked={data.direccion_predeterminada_c || false}
                                    onCheckedChange={(checked) => setData('direccion_predeterminada_c', checked as boolean)}
                                />
                            </div>
                        </div>
                    </ScrollArea>
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
