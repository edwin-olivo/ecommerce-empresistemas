'use client';

import { Product } from '@/types';
import { Column, ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';

const handleSorting = (column: any) => {
    column.toggleSorting(column.getIsSorted() === 'asc');
};

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
}

export function DataTableColumnHeader({ column, title }: DataTableColumnHeaderProps<any, any>) {
    return (
        <div className="flex cursor-pointer items-center gap-2 rounded" onClick={() => handleSorting(column)}>
            {column.getIsSorted() === 'asc' ? (
                <ChevronUp className="h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
                <ChevronDown className="h-4 w-4" />
            ) : (
                <ArrowUpDown className="h-4 w-4 text-neutral-600" />
            )}
            <span className="text-sm font-medium text-neutral-950">{title}</span>
        </div>
    );
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'product.part_number',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
    },
    {
        accessorKey: 'product.price',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Precio" />,
    },
    {
        accessorKey: 'product.availability',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Disponibilidad" />,
        cell: ({ row }) => {
            const availability = row.getValue('product.availability') as string;
            const isAvailable = availability === 'In Stock';
            return <span className={isAvailable ? 'text-green-600' : 'text-red-600'}>{isAvailable ? 'Disponible' : 'Agotado'}</span>;
        },
    },
    {
        id: 'actions',
        header: 'Acciones',
        cell: ({ row }) => {
            const product = row.original;
            return (
                <div>
                    <a href={route('products.show', product.id)} className="text-blue-600 hover:underline">
                        Ver Producto
                    </a>
                </div>
            );
        },
    },
];
