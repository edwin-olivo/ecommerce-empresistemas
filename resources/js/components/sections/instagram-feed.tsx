function InstagramFeed() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="mb-4 text-center text-3xl font-bold">Follow Us on Instagram</h2>
                <p className="mb-12 text-center text-gray-600">@shopease_official</p>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                    <a href="#" className="group block aspect-square overflow-hidden rounded-lg">
                        <img
                            src="https://readdy.ai/api/search-image?query=fashion%20lifestyle%20image%2C%20person%20wearing%20stylish%20outfit%20in%20urban%20setting%2C%20natural%20lighting%2C%20candid%20pose%2C%20high%20quality&width=300&height=300&seq=insta1&orientation=squarish"
                            alt="Instagram Post"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </a>
                    <a href="#" className="group block aspect-square overflow-hidden rounded-lg">
                        <img
                            src="https://readdy.ai/api/search-image?query=close-up%20of%20fashion%20accessories%20arrangement%2C%20minimal%20aesthetic%2C%20soft%20lighting%2C%20high%20quality%20product%20photography&width=300&height=300&seq=insta2&orientation=squarish"
                            alt="Instagram Post"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </a>
                    <a href="#" className="group block aspect-square overflow-hidden rounded-lg">
                        <img
                            src="https://readdy.ai/api/search-image?query=person%20wearing%20elegant%20outfit%20in%20cafe%20setting%2C%20lifestyle%20fashion%20photography%2C%20soft%20natural%20lighting%2C%20candid%20moment&width=300&height=300&seq=insta3&orientation=squarish"
                            alt="Instagram Post"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </a>
                    <a href="#" className="group block aspect-square overflow-hidden rounded-lg">
                        <img
                            src="https://readdy.ai/api/search-image?query=flatlay%20of%20fashion%20items%20including%20clothing%20and%20accessories%2C%20minimal%20aesthetic%2C%20soft%20lighting%2C%20high%20quality%20product%20photography&width=300&height=300&seq=insta4&orientation=squarish"
                            alt="Instagram Post"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </a>
                    <a href="#" className="group block aspect-square overflow-hidden rounded-lg">
                        <img
                            src="https://readdy.ai/api/search-image?query=person%20wearing%20casual%20outfit%20in%20urban%20setting%2C%20lifestyle%20fashion%20photography%2C%20natural%20lighting%2C%20candid%20pose&width=300&height=300&seq=insta5&orientation=squarish"
                            alt="Instagram Post"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </a>
                    <a href="#" className="group block aspect-square overflow-hidden rounded-lg">
                        <img
                            src="https://readdy.ai/api/search-image?query=close-up%20of%20shoes%20and%20accessories%2C%20minimal%20aesthetic%2C%20soft%20lighting%2C%20high%20quality%20product%20photography&width=300&height=300&seq=insta6&orientation=squarish"
                            alt="Instagram Post"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </a>
                </div>
            </div>
        </section>
    );
}

export default InstagramFeed;
