import { Product } from '@/types';
import { debounce } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';

export function useProductSearch() {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const debouncedSearchRef = useRef<ReturnType<typeof debounce> | null>(null);

    useEffect(() => {
        if (!debouncedSearchRef.current) {
            debouncedSearchRef.current = debounce(async (searchTerm: string) => {
                setLoading(true);
                try {
                    // Usando fetch con la URL de Inertia route helper
                    const searchUrl = new URL(route('products.search'), window.location.origin);
                    searchUrl.searchParams.append('search', searchTerm);

                    const response = await fetch(searchUrl.toString(), {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                        credentials: 'same-origin',
                    });

                    if (!response.ok) {
                        console.error('Error:', response.status);
                        setProducts([]);
                        return;
                    }

                    const data = await response.json();
                    setProducts(data.products || []);
                } catch (error) {
                    console.error('Search error:', error);
                    setProducts([]);
                } finally {
                    setLoading(false);
                }
            }, 500);
        }

        if (!search.trim()) {
            setProducts([]);
            setLoading(false);
            return;
        }

        debouncedSearchRef.current(search);
    }, [search]);

    return {
        search,
        setSearch,
        products,
        loading,
    };
}
