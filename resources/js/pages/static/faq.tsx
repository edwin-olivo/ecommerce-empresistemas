import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import MainLayout from '@/layouts/common/main-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import type { FAQ } from '@/types';
import { Head } from '@inertiajs/react';
import { MessageCircleQuestion } from 'lucide-react';

interface FAQProps {
    faqs: FAQ[] | [];
}

const breadcrumbs = getBreadcrumbs('faq', [{ title: 'FAQ', href: route('page.faq') }]);

export default function FAQ({ faqs }: FAQProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="FAQs" />

            <MainLayout className="bg-white dark:bg-neutral-950">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <div className="mb-4 flex justify-center">
                            <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                                <MessageCircleQuestion className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <h1 className="mb-2 text-4xl font-bold text-neutral-900 dark:text-white">Preguntas Frecuentes (FAQs)</h1>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400">
                            Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Card className="shadow-none">
                            <CardContent>
                                {faqs.length > 0 ? (
                                    <Accordion type="multiple" className="w-full">
                                        {faqs.map((faq) => (
                                            <AccordionItem key={faq.id} value={faq.id} className="border-b border-slate-200 dark:border-slate-800">
                                                <AccordionTrigger className="py-4 hover:text-blue-600 dark:hover:text-blue-400">
                                                    <span className="font-semibold">{faq.name}</span>
                                                </AccordionTrigger>
                                                <AccordionContent>{faq.description}</AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                ) : (
                                    <p className="text-center text-neutral-600 dark:text-neutral-400">
                                        No hay preguntas frecuentes disponibles en este momento.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </MainLayout>
        </AppLayout>
    );
}
