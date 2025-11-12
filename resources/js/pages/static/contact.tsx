import AppLayout from '@/layouts/app-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { Head } from '@inertiajs/react';

const breadcrumbs = getBreadcrumbs('contact', [{ title: 'Contacto', href: route('page.contact') }]);

export default function Contact() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contacto" />
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col space-y-6 xl:flex-row xl:space-y-0 xl:space-x-6"></div>
            </main>
        </AppLayout>
    );
}
