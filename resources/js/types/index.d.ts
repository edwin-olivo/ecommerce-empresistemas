export interface Auth {
    user: User;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
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
  colors: string[];
  maxPrice: number;
}

export interface Color {
  name: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  color: string;
  imageUrl: string;
}
