function SpecialOfferBanner() {
    return (
        <section className="bg-gray-900 py-16 text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="mb-8 md:mb-0 md:w-1/2">
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Summer Sale</h2>
                        <p className="mb-6 text-xl text-gray-300">Up to 50% off on selected items. Limited time offer.</p>
                        <div className="mb-8 flex gap-4">
                            <div className="rounded-lg bg-white/10 p-4 text-center">
                                <span className="block text-3xl font-bold">00</span>
                                <span className="text-sm text-gray-300">Days</span>
                            </div>
                            <div className="rounded-lg bg-white/10 p-4 text-center">
                                <span className="block text-3xl font-bold">12</span>
                                <span className="text-sm text-gray-300">Hours</span>
                            </div>
                            <div className="rounded-lg bg-white/10 p-4 text-center">
                                <span className="block text-3xl font-bold">45</span>
                                <span className="text-sm text-gray-300">Minutes</span>
                            </div>
                            <div className="rounded-lg bg-white/10 p-4 text-center">
                                <span className="block text-3xl font-bold">30</span>
                                <span className="text-sm text-gray-300">Seconds</span>
                            </div>
                        </div>
                        <a
                            href="#"
                            className="rounded-button inline-block bg-white px-8 py-3 font-medium whitespace-nowrap text-gray-900 transition-colors hover:bg-gray-100"
                        >
                            Shop the Sale
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
