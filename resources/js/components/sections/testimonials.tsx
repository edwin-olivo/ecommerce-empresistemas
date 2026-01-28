function Testimonials() {
    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <h2 className="mb-12 text-center text-3xl font-bold">What Our Customers Say</h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Testimonial 1 */}
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <div className="mb-4 flex text-amber-400">
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                        </div>
                        <p className="mb-6 text-gray-700">
                            "The quality of the clothes is exceptional. I've ordered multiple times and have never been disappointed. The customer
                            service is also top-notch!"
                        </p>
                        <div className="flex items-center">
                            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                                <i className="ri-user-3-line text-xl"></i>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">Emily Richardson</h4>
                                <p className="text-sm text-gray-500">Loyal Customer</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <div className="mb-4 flex text-amber-400">
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-half-fill"></i>
                        </div>
                        <p className="mb-6 text-gray-700">
                            "Fast shipping and the products look exactly like the pictures. The sizing guide was very helpful. Will definitely shop
                            here again!"
                        </p>
                        <div className="flex items-center">
                            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                                <i className="ri-user-3-line text-xl"></i>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">Michael Thompson</h4>
                                <p className="text-sm text-gray-500">Verified Buyer</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <div className="mb-4 flex text-amber-400">
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                        </div>
                        <p className="mb-6 text-gray-700">
                            "I love the sustainable approach this brand takes. The packaging is eco-friendly and the clothes are made from
                            high-quality, sustainable materials."
                        </p>
                        <div className="flex items-center">
                            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                                <i className="ri-user-3-line text-xl"></i>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">Sophia Martinez</h4>
                                <p className="text-sm text-gray-500">Repeat Customer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
