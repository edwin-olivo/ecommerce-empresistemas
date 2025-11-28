import { cn } from '@/lib/utils';

interface MainLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export default function MainLayout({ children, className }: MainLayoutProps) {
    return (
        <main data-slot="main-layout" className={cn('container mx-auto px-4 py-8', className)}>
            {children}
        </main>
    );
}
