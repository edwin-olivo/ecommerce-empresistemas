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