import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { filterLinks, renderLabel } from '@/lib/utils';
import { PaginationLinkItem, Product } from '@/types';
import { Link } from '@inertiajs/react';

export interface CustomPaginationProps {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    current_page_url: string;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
    path: string;
    from: number;
    to: number;
    data: Product[];
    links: PaginationLinkItem[];
}

export default function CustomPagination(props: CustomPaginationProps) {
    return (
        <Pagination>
            <PaginationContent>
                {filterLinks(props.links)?.map((link, idx) => (
                    <PaginationItem key={idx}>
                        {link.url ? (
                            <Link href={link.url} preserveScroll preserveState only={['products']}>
                                <PaginationLink isActive={link.active} size="sm" href={link.url}>
                                    {renderLabel(link.label)}
                                </PaginationLink>
                            </Link>
                        ) : (
                            <PaginationEllipsis />
                        )}
                    </PaginationItem>
                ))}
            </PaginationContent>
        </Pagination>
    );
}
