import AppLayout from '@/layouts/app-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { Head } from '@inertiajs/react';

const breadcrumbs = getBreadcrumbs('terms', [{ title: 'Términos y Condiciones', href: route('page.terms') }]);

export default function Terms() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Términos y Condiciones" />
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col space-y-6 xl:flex-row xl:space-y-0 xl:space-x-6"></div>
            </main>
        </AppLayout>
    );
}
