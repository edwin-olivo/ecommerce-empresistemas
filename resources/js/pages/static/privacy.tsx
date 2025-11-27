import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EmailLink from '@/components/ui/email-link';
import { List, ListItem } from '@/components/ui/list';
import AppLayout from '@/layouts/app-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Candy, CandyOff, CheckCircle2, Clock, FileText, Flame, Lock, LucideTruck, Mail, Shield } from 'lucide-react';

const breadcrumbs = getBreadcrumbs('privacy', [{ title: 'Privacidad', href: route('page.privacy') }]);

interface PrivacyProps {
    correo: string;
}

export default function Privacy({ correo }: PrivacyProps) {
    const page = usePage<SharedData>();
    const { name } = page.props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Privacidad" />

            <main className="min-h-screen bg-white py-12 dark:bg-neutral-950">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <div className="mb-4 flex justify-center">
                            <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                                <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <h1 className="mb-2 text-4xl font-bold text-neutral-900 dark:text-white">Privacidad y Términos</h1>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400">{name} - Tu confianza es nuestra prioridad</p>
                    </div>

                    <Card className="mb-8 border-blue-200 bg-blue-50 dark:border-blue-900/30 dark:bg-blue-900/10">
                        <CardHeader>
                            <CardTitle className="text-blue-900 dark:text-blue-400">Nuestra Política de Privacidad</CardTitle>
                        </CardHeader>
                        <CardContent className="text-blue-800 dark:text-blue-300">
                            En <strong>{name}</strong> respetamos y protegemos la privacidad de nuestros clientes. Este aviso explica cómo
                            recopilamos, usamos y protegemos la información personal que nos proporciona.
                        </CardContent>
                    </Card>

                    {/* Section 1: Información que recopilamos */}
                    <div className="mb-8 space-y-4" id="privacy-policy">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
                                <FileText className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">1. Políticas de Privacidad</h2>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">1.1. Información que recopilamos</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <List>
                                    <ListItem icon={<CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />}>
                                        <span>
                                            <strong>Datos de identificación personal:</strong> nombre, teléfono, correo electrónico
                                        </span>
                                    </ListItem>
                                    <ListItem icon={<CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />}>
                                        <span>
                                            <strong>Datos de facturación:</strong> RFC, dirección fiscal
                                        </span>
                                    </ListItem>
                                    <ListItem icon={<CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />}>
                                        <span>
                                            <strong>Información de contacto:</strong> dirección de entrega
                                        </span>
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">1.2. Uso de la información</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4 text-neutral-700 dark:text-neutral-300">
                                    La información proporcionada será utilizada únicamente para:
                                </p>
                                <List>
                                    <ListItem icon={<CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />}>
                                        <span>Procesar pedidos y realizar entregas</span>
                                    </ListItem>
                                    <ListItem icon={<CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />}>
                                        <span>Emitir facturas y comprobantes fiscales</span>
                                    </ListItem>
                                    <ListItem icon={<CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />}>
                                        <span>Enviar información sobre promociones, novedades y descuentos (solo si el cliente lo autoriza)</span>
                                    </ListItem>
                                    <ListItem icon={<CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />}>
                                        <span>Dar seguimiento a dudas, aclaraciones o solicitudes</span>
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>

                        <Card className="border-amber-200 bg-amber-50 dark:border-amber-900/30 dark:bg-amber-900/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg text-amber-900 dark:text-amber-400">
                                    <Lock className="h-5 w-5" />
                                    1.3. Protección de datos
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-amber-900 dark:text-amber-300">
                                <p>Sus datos serán resguardados de forma segura y confidencial.</p>
                                <p>
                                    No compartiremos, venderemos ni transferiremos su información a terceros sin su consentimiento, salvo en casos
                                    exigidos por ley.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">1.4. Derechos del titular</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4 text-neutral-700 dark:text-neutral-300">El cliente puede en cualquier momento:</p>
                                <ul className="mb-4 space-y-2 text-neutral-700 dark:text-neutral-300">
                                    <List>
                                        <ListItem icon={<CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />}>
                                            <span>Acceder, rectificar o cancelar sus datos personales</span>
                                        </ListItem>
                                        <ListItem icon={<CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />}>
                                            <span>Oponerse al uso de su información para fines promocionales</span>
                                        </ListItem>
                                        <ListItem icon={<CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />}>
                                            <span>Solicitar la baja de nuestras bases de datos</span>
                                        </ListItem>
                                    </List>
                                </ul>
                                <div className="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
                                    <p className="mb-3 flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                                        <Mail className="h-4 w-4 flex-shrink-0" />
                                        <span className="text-sm">Envía tu solicitud a: </span>
                                    </p>
                                    <EmailLink email={correo} variant="card" showIcon={true} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Section 2: Términos y Condiciones */}
                    <div className="mt-12 space-y-4" id="terms-conditions">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
                                <FileText className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">2. Términos y Condiciones</h2>
                        </div>

                        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
                            Al comprar en {name}, el cliente acepta los siguientes términos:
                        </p>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">2.1. Productos y precios</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-neutral-700 dark:text-neutral-300">
                                <List>
                                    <ListItem icon={<CheckCircle2 className="h-5 w-5" />}>
                                        <span>
                                            Todos nuestros productos son <strong>100% originales y de alta calidad</strong>
                                        </span>
                                    </ListItem>
                                    <ListItem icon={<CheckCircle2 className="h-5 w-5" />}>
                                        <span>
                                            Los precios están sujetos a cambios sin previo aviso en <strong>moneda nacional (MXN)</strong>
                                        </span>
                                    </ListItem>
                                    <ListItem icon={<CheckCircle2 className="h-5 w-5" />}>
                                        <span>Las ofertas y promociones se aplican solo en las fechas y condiciones indicadas</span>
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">2.2. Formas de pago</CardTitle>
                            </CardHeader>
                            <CardContent className="text-neutral-700 dark:text-neutral-300">
                                <p>
                                    Aceptamos: efectivo, transferencia, depósitos y tarjetas bancarias
                                    <span className="text-sm text-neutral-600 dark:text-neutral-400"> (según disponibilidad en sucursal)</span>
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">2.3. Envíos y entregas</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-neutral-700 dark:text-neutral-300">
                                <List>
                                    <ListItem icon={<LucideTruck className="mt-0.5 h-5 w-5 flex-shrink-0" />}>
                                        <span>Envíos a la dirección proporcionada por el cliente</span>
                                    </ListItem>
                                    <ListItem icon={<Clock className="mt-0.5 h-5 w-5 flex-shrink-0" />}>
                                        <span>Tiempos de entrega varían según la zona y disponibilidad</span>
                                    </ListItem>
                                    <ListItem icon={<Flame className="mt-0.5 h-5 w-5 flex-shrink-0" />}>
                                        <span>No somos responsables por retrasos por paquetería o causas de fuerza mayor</span>
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>

                        <Card className="border-red-200 bg-red-50 dark:border-red-900/30 dark:bg-red-900/10">
                            <CardHeader>
                                <CardTitle className="text-lg text-red-900 dark:text-red-400">2.4. Cambios y devoluciones</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-red-900 dark:text-red-300">
                                <p>
                                    <strong>Por tratarse de productos alimenticios,</strong> no se aceptan devoluciones salvo en caso de productos
                                    dañados o defectuosos.
                                </p>
                                <p>
                                    El cliente debe reportar cualquier inconveniente dentro de las <strong>primeras 24 horas</strong> posteriores a la
                                    entrega.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">2.5. Responsabilidad</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-neutral-700 dark:text-neutral-300">
                                <List>
                                    <ListItem icon={<CandyOff className="mt-0.5 h-5 w-5 flex-shrink-0" />}>
                                        <span>No somos responsables por el uso indebido de los productos adquiridos</span>
                                    </ListItem>
                                    <ListItem icon={<Candy className="mt-0.5 h-5 w-5 flex-shrink-0" />}>
                                        <span>El consumo de dulces y productos es responsabilidad del comprador</span>
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>

                        <Card className="border-blue-200 bg-blue-50 dark:border-blue-900/30 dark:bg-blue-900/10">
                            <CardHeader>
                                <CardTitle className="text-lg text-blue-900 dark:text-blue-400">2.6. Modificaciones</CardTitle>
                            </CardHeader>
                            <CardContent className="text-blue-900 dark:text-blue-300">
                                <p>
                                    Nos reservamos el derecho de modificar estas políticas, términos y condiciones en cualquier momento. Los cambios
                                    se publicarán en nuestra página web o en nuestras sucursales.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Footer CTA */}
                    <div className="mt-12 rounded-lg border-2 border-neutral-200 bg-neutral-50 p-6 text-center dark:border-neutral-800 dark:bg-neutral-900">
                        <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-white">¿Tienes preguntas?</h3>
                        <p className="mb-4 text-neutral-600 dark:text-neutral-400">
                            Contáctanos directamente y estaremos encantados de ayudarte con cualquier duda o aclaración
                        </p>
                        <EmailLink email={correo} variant="button" showIcon={true} title="Enviar correo" />
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
