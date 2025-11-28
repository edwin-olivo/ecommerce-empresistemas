import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EmailLink from '@/components/ui/email-link';
import AppLayout from '@/layouts/app-layout';
import MainLayout from '@/layouts/common/main-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { MessageCircle } from 'lucide-react';

const breadcrumbs = getBreadcrumbs('contact', [{ title: 'Contacto', href: route('page.contact') }]);

interface ContactProps {
    correo: string;
}

export default function Contact() {
    const page = usePage<SharedData & ContactProps>();
    const { name, correo } = page.props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contacto" />

            <MainLayout className="bg-white dark:bg-neutral-950">
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

                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Información de Contacto</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    Puedes contactarnos a través del correo electrónico: <EmailLink email={correo} variant="inline" />. Estamos aquí
                                    para ayudarte con cualquier consulta o soporte que necesites.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </MainLayout>
        </AppLayout>
    );
}
