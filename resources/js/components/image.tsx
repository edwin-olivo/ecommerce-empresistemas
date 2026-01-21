import { resolveImageSource } from '@/lib/utils';

type ImageProps = {
    src: string | undefined;
    alt: string;
    className?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export function Image({ src, alt, className, ...props }: ImageProps) {
    const imageSrc = resolveImageSource(src);
    return <img src={imageSrc} alt={alt} className={className} {...props} />;
}
