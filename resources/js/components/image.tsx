import { resolveImageSource } from '@/lib/utils';

export function Image({ src, alt, className, ...props }: { src: string | undefined; alt: string; className?: string }) {
    const imageSrc = resolveImageSource(src);
    return <img src={imageSrc} alt={alt} className={className} {...props} />;
}
