import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { List, ListItem } from '@/components/ui/list';
import AppLayout from '@/layouts/app-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Book, CheckCircle2, Flame, Lock, LucideTruck, Shield } from 'lucide-react';

const breadcrumbs = getBreadcrumbs('about', [{ title: 'Acerca de', href: route('page.about') }]);

export default function About() {
    const page = usePage<SharedData>();
    const { name } = page.props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Acerca de" />

            <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white py-12 dark:from-neutral-950 dark:to-neutral-900">
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
                                <p>
                                    Fundada en 2020, <strong>{name}</strong> nació de la pasión por ofrecer productos de alta calidad a precios
                                    accesibles. Desde nuestros humildes comienzos, hemos crecido hasta convertirnos en un referente en el mercado,
                                    siempre manteniendo nuestro compromiso con la excelencia y la satisfacción del cliente.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Misión</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    Nuestra misión en <strong>{name}</strong> es proporcionar a nuestros clientes una experiencia de compra
                                    excepcional, ofreciendo productos de calidad, un servicio al cliente inigualable y un entorno seguro y confiable.
                                    Nos esforzamos por superar las expectativas y construir relaciones duraderas con nuestros clientes.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Visión</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    En <strong>{name}</strong>, aspiramos a ser líderes en el mercado, reconocidos por nuestra innovación, calidad y
                                    compromiso con la sostenibilidad. Buscamos expandir nuestra presencia global mientras mantenemos nuestros valores
                                    fundamentales y seguimos siendo un lugar donde los clientes pueden confiar para satisfacer sus necesidades.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Valores</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <List>
                                    <ListItem icon={<CheckCircle2 />}>
                                        <span><strong>Calidad:</strong> Nos comprometemos a ofrecer productos que cumplen con los más altos estándares.</span>
                                    </ListItem>
                                    <ListItem icon={<Shield />}>
                                        <span><strong>Integridad:</strong> Operamos con honestidad y transparencia en todas nuestras interacciones.</span>
                                    </ListItem>
                                    <ListItem icon={<LucideTruck />}>
                                        <span><strong>Servicio al Cliente:</strong> Nuestra prioridad es la satisfacción y el bienestar de nuestros clientes.</span>
                                    </ListItem>
                                    <ListItem icon={<Lock />}>
                                        <span><strong>Seguridad:</strong> Garantizamos un entorno de compra seguro y confiable.</span>
                                    </ListItem>
                                    <ListItem icon={<Flame />}>
                                        <span><strong>Pasión:</strong> Amamos lo que hacemos y eso se refleja en nuestro trabajo diario.</span>
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
