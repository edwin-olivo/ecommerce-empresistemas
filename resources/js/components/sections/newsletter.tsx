function Newsletter() {
    return (
        <section className="bg-gray-900 py-16 text-white">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="mb-4 text-3xl font-bold">Suscríbete a nuestro boletín</h2>
                    <p className="mb-8 text-gray-300">
                        Mantente actualizado con nuestras últimas colecciones, ofertas exclusivas y consejos de estilo.
                    </p>
                    <form className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
                        <input
                            type="email"
                            placeholder="Tu dirección de correo electrónico"
                            className="rounded-button flex-1 border-none bg-white px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary/20 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="rounded-button inline-block bg-white px-8 py-3 font-medium whitespace-nowrap text-gray-900 transition-colors hover:bg-gray-100"
                        >
                            Suscribirse
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-gray-400">
                        Al suscribirte, aceptas nuestra Política de Privacidad y das tu consentimiento para recibir actualizaciones de nuestra
                        empresa.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Newsletter;
