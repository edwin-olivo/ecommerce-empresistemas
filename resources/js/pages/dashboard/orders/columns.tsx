'use client';

import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/utils';
import { Venta } from '@/types';
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
        <div className="flex cursor-pointer items-center gap-2" onClick={() => handleSorting(column)}>
            {column.getIsSorted() === 'asc' ? (
                <ChevronUp className="h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
                <ChevronDown className="h-4 w-4" />
            ) : (
                <ArrowUpDown className="h-4 w-4 opacity-50" />
            )}
            <span className="text-sm font-medium text-neutral-950">{title}</span>
        </div>
    );
}

export const columns: ColumnDef<Venta>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Orden" />,
        cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
    },
    {
        accessorKey: 'total_amount',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
        cell: ({ row }) => {
            const value = parseFloat(row.getValue('total_amount') as string);
            return <div className="text-right">{formatCurrency(value)}</div>;
        },
    },
    {
        accessorKey: 'date_entered',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Fecha" />,
        cell: ({ row }) => {
            const date = new Date(row.getValue('date_entered') as string);
            return (
                <div>
                    {date.toLocaleDateString()} {date.toLocaleTimeString()}
                </div>
            );
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Estado" />,
        cell: ({ row }) => {
            const value = row.getValue('status') as string;

            const styles = {
                Liquidada:
                    'bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5',
                Cancelada:
                    'bg-destructive/10 [a&]:hover:bg-destructive/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive',
                CuentaXLiquidar:
                    'bg-amber-600/10 text-amber-600 focus-visible:ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:focus-visible:ring-amber-400/40 [a&]:hover:bg-amber-600/5 dark:[a&]:hover:bg-amber-400/5',
            }[value];

            return <Badge className={cn('border-none focus-visible:outline-none', styles)}>{value}</Badge>;
        },
    },
    {
        accessorKey: 'estatus_envio_c',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Estado de Envío" />,
        cell: ({ row }) => {
            const value = row.getValue('estatus_envio_c') as string;

            if (!value) {
                return <Badge className="border-none bg-gray-100 text-gray-800 focus-visible:outline-none">Sin información</Badge>;
            }

            const styles = {
                ENVIADO:
                    'bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5',
                PREPARANDO:
                    'bg-yellow-600/10 text-yellow-600 focus-visible:ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-400 dark:focus-visible:ring-yellow-400/40 [a&]:hover:bg-yellow-600/5 dark:[a&]:hover:bg-yellow-400/5',
                'NO ENVIADO':
                    'bg-red-600/10 text-red-600 focus-visible:ring-red-600/20 dark:bg-red-400/10 dark:text-red-400 dark:focus-visible:ring-red-400/40 [a&]:hover:bg-red-600/5 dark:[a&]:hover:bg-red-400/5',
            }[value];

            return <Badge className={cn('border-none focus-visible:outline-none', styles)}>{value}</Badge>;
        },
    },
];
