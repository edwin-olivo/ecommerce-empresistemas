import { PaginationLinkItem } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Helper to extract array params with bracket notation (e.g., categories[0]=BEBIDAS)
export function getArrayParam(paramName: string, urlSearchParams?: URLSearchParams): string[] {
    const result: string[] = [];
    const params = urlSearchParams || new URLSearchParams(window.location.search);
    params.forEach((value, key) => {
        if (key.startsWith(paramName + '[')) {
            result.push(value);
        }
    });
    return result;
}

export function filterLinks(links: PaginationLinkItem[]) {
    const activeIndex = links.findIndex((link) => link.active);
    const filtered: PaginationLinkItem[] = [];

    links.forEach((link, i) => {
        // Siempre incluir el primero y el último (anterior/siguiente)
        if (i === 0 || i === links.length - 1) {
            filtered.push(link);
        }

        // Incluir páginas cercanas al activo (por ejemplo, ±2)
        if (Math.abs(i - activeIndex) <= 2 && i !== 0 && i !== links.length - 1) {
            filtered.push(link);
        }
    });

    return filtered;
}

export function renderLabel(label: string) {
    if (label === 'pagination.previous') return '<';
    if (label === 'pagination.next') return '>';
    return label;
}

export function resolveImageSource(src: string | undefined) {
    return typeof src === 'string' && src.trim() !== '' ? src : 'https://placehold.co/600x400';
}
