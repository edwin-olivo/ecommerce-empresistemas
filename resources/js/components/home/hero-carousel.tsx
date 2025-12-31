import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn, resolveImageSource } from '@/lib/utils';
import { ImageSlider } from '@/types';
import { faker } from '@faker-js/faker';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

interface HeroCarouselProps {
    slides: ImageSlider[];
    className?: string;
}

export default function HeroCarousel({ slides = [], className }: HeroCarouselProps) {
    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    return (
        <div className={cn('mx-auto w-full', className)}>
            <Carousel plugins={[plugin.current]} onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset} opts={{ loop: true }}>
                <CarouselContent>
                    {slides.map((slide) => (
                        <CarouselItem key={slide.id}>
                            <div
                                className={`relative h-64 w-full rounded-lg bg-cover bg-center sm:h-80 lg:h-[80vh]`}
                                style={{ backgroundImage: `url(${resolveImageSource(slide.url_imagen)})` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
                                    <h2 className="mb-2 text-3xl font-bold">{slide.title || faker.company.catchPhrase()}</h2>
                                    <p className="mb-6 max-w-md text-sm opacity-90">{slide.description || faker.lorem.sentence()}</p>
                                    <Button variant="secondary">{slide.cta || 'Ver Catálogo'}</Button>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
            </Carousel>
        </div>
    );
}
