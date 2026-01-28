import { cn } from '@/lib/utils';

interface HeroProps {
    title: string;
    description: string;
    backgroundImageUrl?: string;
    children?: React.ReactNode;
}

function Hero({ title, description, backgroundImageUrl, children }: HeroProps) {
    return (
        <section
            className={cn('hero-section relative bg-cover bg-center bg-no-repeat', !backgroundImageUrl && 'bg-gray-200')}
            {...(backgroundImageUrl && {
                style: { backgroundImage: `url(${backgroundImageUrl})` },
            })}
        >
            <div className="container mx-auto w-full px-4 py-24 md:py-32">
                <div className="max-w-lg">
                    <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">{title}</h1>
                    <p className="mb-8 text-lg text-gray-700">{description}</p>
                    <div className="flex flex-wrap gap-4">{children}</div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
