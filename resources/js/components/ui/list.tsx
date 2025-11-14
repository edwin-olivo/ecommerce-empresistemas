import { cn } from "@/lib/utils";

interface ListProps {
    listType?: 'ul' | 'ol';
    className?: string;
    children: React.ReactNode;
}

function List({ listType = 'ul', className, children }: ListProps) {
    const Tag = listType;
    return <Tag data-slot="list" className={cn('space-y-2 text-neutral-700 dark:text-neutral-300', className)}>{children}</Tag>;
}


interface ListItemProps {
    children: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

function ListItem({ children, className, icon, iconPosition = 'left' }: ListItemProps) {
    return (
        <li data-slot="list-item" className={cn('flex items-start gap-3', className)}>
            {iconPosition === 'left' && icon}
            {children}
            {iconPosition === 'right' && icon}
        </li>
    );
}

export { List, ListItem };