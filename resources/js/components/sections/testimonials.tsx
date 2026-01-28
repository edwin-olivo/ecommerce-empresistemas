function Testimonials() {
    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <h2 className="mb-12 text-center text-3xl font-bold">Lo que dicen nuestros clientes</h2>

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
                            "La calidad de la ropa es excepcional. He hecho varios pedidos y nunca me he decepcionado. ¡El servicio al cliente también
                            es de primera!"
                        </p>
                        <div className="flex items-center">
                            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                                <i className="ri-user-3-line text-xl"></i>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">Emily Richardson</h4>
                                <p className="text-sm text-gray-500">Cliente Leal</p>
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
                            "El envío fue rápido y los productos se ven exactamente como en las imágenes. La guía de tallas fue muy útil.
                            ¡Definitivamente volveré a comprar aquí!"
                        </p>
                        <div className="flex items-center">
                            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                                <i className="ri-user-3-line text-xl"></i>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">Michael Thompson</h4>
                                <p className="text-sm text-gray-500">Comprador Verificado</p>
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
                            "Me encanta el enfoque sostenible que tiene esta marca. El embalaje es ecológico y la ropa está hecha de materiales
                            sostenibles y de alta calidad."
                        </p>
                        <div className="flex items-center">
                            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                                <i className="ri-user-3-line text-xl"></i>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">Sophia Martinez</h4>
                                <p className="text-sm text-gray-500">Cliente Recurrente</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
