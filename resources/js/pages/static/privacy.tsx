import AppLayout from '@/layouts/app-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { Head } from '@inertiajs/react';

const breadcrumbs = getBreadcrumbs('privacy', [{ title: 'Privacidad', href: route('page.privacy') }]);

export default function Privacy() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Privacidad" />
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col space-y-6 xl:flex-row xl:space-y-0 xl:space-x-6"></div>
            </main>
        </AppLayout>
    );
}
