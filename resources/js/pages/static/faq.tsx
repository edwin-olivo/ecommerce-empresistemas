import AppLayout from '@/layouts/app-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { Head } from '@inertiajs/react';

const breadcrumbs = getBreadcrumbs('faq', [{ title: 'FAQ', href: route('page.faq') }]);

export default function FAQ() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="FAQs" />
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col space-y-6 xl:flex-row xl:space-y-0 xl:space-x-6"></div>
            </main>
        </AppLayout>
    );
}
