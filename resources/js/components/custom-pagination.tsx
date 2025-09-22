import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Product } from "@/types"
import { Link } from "@inertiajs/react"

export interface CustomPaginationProps {
  "total": number,
  "per_page": number,
  "current_page": number,
  "last_page": number,
  "current_page_url": string,
  "first_page_url": string,
  "last_page_url": string,
  "next_page_url": string,
  "prev_page_url": string | null,
  "path": string,
  "from": number,
  "to": number,
  "data": Product[],
  "links"?: { url: string | null; label: string; active: boolean }[]
}

export default function CustomPagination(props: CustomPaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {props.prev_page_url ? (
            <Link
              href={props.prev_page_url}
              preserveScroll
              preserveState
              only={['products']}
            >
              <PaginationPrevious size="sm" />
            </Link>
          ) : (
            <span className="pointer-events-none opacity-50">
              <PaginationPrevious
                href="#"
                size="sm"
              />
            </span>
          )}
        </PaginationItem>

        {props.links?.map((link, idx) => (
          <PaginationItem key={idx}>
            {link.url ? (
              <Link
                href={link.url}
                preserveScroll
                preserveState
                only={['products']}
              >
                <PaginationLink
                  isActive={link.active}
                  size="sm"
                  href={link.url}
                >
                  {link.label}
                </PaginationLink>
              </Link>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          {props.next_page_url ? (
            <Link
              href={props.next_page_url}
              preserveScroll
              preserveState
              only={['products']}
            >
              <PaginationNext size="sm" />
            </Link>
          ) : (
            <span className="pointer-events-none opacity-50">
              <PaginationNext size="sm" />
            </span>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
