import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

function createCountdownTimer(finishDate: Date, onTick: (timeLeft: { days: number; hours: number; minutes: number; seconds: number }) => void) {
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = finishDate.getTime() - now;

        if (distance < 0) {
            clearInterval(interval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        onTick({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
}

function clockComponent(timeLeft: { days: number; hours: number; minutes: number; seconds: number }) {
    return (
        <div className="flex gap-4">
            <div className="rounded-lg bg-white/10 p-4 text-center">
                <span className="block text-3xl font-bold">{timeLeft.days}</span>
                <span className="text-sm text-gray-300">Días</span>
            </div>
            <div className="rounded-lg bg-white/10 p-4 text-center">
                <span className="block text-3xl font-bold">{timeLeft.hours}</span>
                <span className="text-sm text-gray-300">Horas</span>
            </div>
            <div className="rounded-lg bg-white/10 p-4 text-center">
                <span className="block text-3xl font-bold">{timeLeft.minutes}</span>
                <span className="text-sm text-gray-300">Minutos</span>
            </div>
            <div className="rounded-lg bg-white/10 p-4 text-center">
                <span className="block text-3xl font-bold">{timeLeft.seconds}</span>
                <span className="text-sm text-gray-300">Segundos</span>
            </div>
        </div>
    );
}

type SpecialOfferBannerProps = {
    title: string;
    description: string;
    finishDate?: Date;
    className?: string;
};

function SpecialOfferBanner({ title, description, finishDate, className }: SpecialOfferBannerProps) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        if (!finishDate) return;

        const stopTimer = createCountdownTimer(finishDate, setTimeLeft);
        return () => stopTimer();
    }, [finishDate]);

    return (
        <section className={cn('bg-gray-900 py-16 text-white', className)}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="mb-8 md:mb-0 md:w-1/2">
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">{title}</h2>
                        <p className="mb-6 text-xl text-gray-300">{description}</p>
                        {finishDate && <div className="mb-8">{clockComponent(timeLeft)}</div>}
                        <a
                            href="#"
                            className="rounded-button inline-block bg-white px-8 py-3 font-medium whitespace-nowrap text-gray-900 transition-colors hover:bg-gray-100"
                        >
                            Aprovecha la oferta
                        </a>
                    </div>
                    <div className="md:w-1/2">
                        <img
                            src="https://readdy.ai/api/search-image?query=stylish%20summer%20clothing%20collection%20with%20discount%20tags%2C%20professional%20fashion%20photography%2C%20multiple%20items%20arranged%20elegantly%2C%20high-end%20apparel%20on%20minimal%20background&width=600&height=400&seq=sale1&orientation=landscape"
                            alt="Summer Sale"
                            className="w-full rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SpecialOfferBanner;
