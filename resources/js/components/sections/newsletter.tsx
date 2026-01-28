function Newsletter() {
    return (
        <section className="bg-gray-900 py-16 text-white">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="mb-4 text-3xl font-bold">Subscribe to Our Newsletter</h2>
                    <p className="mb-8 text-gray-300">Stay updated with our latest collections, exclusive offers, and style tips.</p>
                    <form className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="rounded-button flex-1 border-none bg-white px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary/20 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="rounded-button bg-primary px-6 py-3 font-medium whitespace-nowrap text-white transition-colors hover:bg-primary/90"
                        >
                            Subscribe
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-gray-400">
                        By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Newsletter;
