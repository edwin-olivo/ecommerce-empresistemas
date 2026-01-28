import { cn } from '@/lib/utils';

type CategoryItemProps = {
    src: string;
    alt: string;
    title: string;
    description: string;
    className?: string;
};

function CategoryItem({ src, alt, title, description, className }: CategoryItemProps) {
    return (
        <div className={cn('group relative h-80 overflow-hidden rounded-lg shadow-lg', className)}>
            <img src={src} alt={alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-end bg-gradient-to-b from-transparent to-black/60 p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div>
                    <h3 className="mb-1 text-xl font-semibold text-white">{title}</h3>
                    <p className="text-sm text-white/80">{description}</p>
                </div>
            </div>
        </div>
    );
}

export default CategoryItem;
