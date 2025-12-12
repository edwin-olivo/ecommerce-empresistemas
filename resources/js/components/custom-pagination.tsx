import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination';
import { cn, filterLinks } from '@/lib/utils';
import { PaginationLinkItem, Product } from '@/types';
import { Link } from '@inertiajs/react';
import { buttonVariants } from './ui/button';

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
                {props.first_page_url && props.current_page > 1 && (
                    <PaginationItem>
                        <Link
                            href={props.first_page_url}
                            preserveScroll
                            preserveState
                            only={['products']}
                            className={cn(
                                buttonVariants({
                                    variant: 'outline',
                                    size: 'sm',
                                }),
                                '',
                            )}
                        >
                            Primera
                        </Link>
                    </PaginationItem>
                )}

                {filterLinks(props.links)?.map((link, idx) => (
                    <PaginationItem key={idx}>
                        {link.url ? (
                            <Link
                                href={link.url}
                                preserveScroll
                                preserveState
                                only={['products']}
                                className={cn(
                                    buttonVariants({
                                        variant: link.active ? 'default' : 'outline',
                                        size: 'sm',
                                    }),
                                    '',
                                )}
                            >
                                {link.label}
                            </Link>
                        ) : (
                            <PaginationEllipsis />
                        )}
                    </PaginationItem>
                ))}

                {props.last_page_url && props.current_page < props.last_page && (
                    <PaginationItem>
                        <Link
                            href={props.last_page_url}
                            preserveScroll
                            preserveState
                            only={['products']}
                            className={cn(
                                buttonVariants({
                                    variant: 'outline',
                                    size: 'sm',
                                }),
                                '',
                            )}
                        >
                            Última
                        </Link>
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}
