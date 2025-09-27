import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface FilterState {
    categories: string[];
    classes: string[];
    colors: string[];
    priceRange: [number, number];
    orderBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';
    pageSize?: '12' | '24' | '48' | 'all';
}

export interface Color {
    name: string;
    value: string;
}

export interface CheckboxOption {
    [key: string]: string;
}

export interface Product {
    id: number;
    name: string;
    part_number: string;
    category: string;
    price: number;
    color: string;
    description?: string;
    custom?: { [key: string]: any } | null;
    [key: string]: any; // This allows for additional properties...
}

export interface PaginationLinkItem {
    url: string | null;
    label: string;
    active: boolean;
}
