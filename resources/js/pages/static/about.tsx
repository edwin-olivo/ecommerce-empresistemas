import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { List, ListItem } from '@/components/ui/list';
import AppLayout from '@/layouts/app-layout';
import MainLayout from '@/layouts/common/main-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { EcommerceAdministration } from '@/types';
import { Head } from '@inertiajs/react';
import { Book, CheckCircle2, Lock, LucideTruck, Shield } from 'lucide-react';

interface AboutProps {
    adminEcommerce: EcommerceAdministration;
}

const breadcrumbs = getBreadcrumbs('about', [{ title: 'Acerca de', href: route('page.about') }]);

export default function About({ adminEcommerce }: AboutProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Acerca de" />

            <MainLayout className="bg-white dark:bg-neutral-950">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <div className="mb-4 flex justify-center">
                            <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                                <Book className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <h1 className="mb-2 text-4xl font-bold text-neutral-900 dark:text-white">Acerca de Nosotros</h1>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400">Un lugar donde la calidad y el servicio se encuentran</p>
                    </div>

                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Historia</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{adminEcommerce.historia_empresa}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Misión</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{adminEcommerce.mision_empresa}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Visión</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{adminEcommerce.vision_empresa}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Valores</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <List>
                                    <ListItem icon={<CheckCircle2 />}>
                                        <span>{adminEcommerce.valor_ecommerce1}</span>
                                    </ListItem>
                                    <ListItem icon={<Shield />}>
                                        <span>{adminEcommerce.valor_ecommerce2}</span>
                                    </ListItem>
                                    <ListItem icon={<LucideTruck />}>
                                        <span>{adminEcommerce.valor_ecommerce3}</span>
                                    </ListItem>
                                    <ListItem icon={<Lock />}>
                                        <span>{adminEcommerce.valor_ecommerce4}</span>
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </MainLayout>
        </AppLayout>
    );
}
