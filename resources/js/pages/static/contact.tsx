import AppLayout from '@/layouts/app-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { MessageCircle } from 'lucide-react';

const breadcrumbs = getBreadcrumbs('contact', [{ title: 'Contacto', href: route('page.contact') }]);

export default function Contact() {
    const page = usePage<SharedData>();
    const { name } = page.props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contacto" />

            <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white py-12 dark:from-neutral-950 dark:to-neutral-900">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <div className="mb-4 flex justify-center">
                            <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                                <MessageCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <h1 className="mb-2 text-4xl font-bold text-neutral-900 dark:text-white">Contacto</h1>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400">
                            Mantente en contacto con nosotros para cualquier consulta o soporte
                        </p>
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
