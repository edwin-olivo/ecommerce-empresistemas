<?php
?>
<div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
            <h2 class="text-primary-900 text-2xl font-bold ">Contacto</h2>
            <p class="text-neutral-600 mt-4">
                Si tienes alguna pregunta, no dudes en ponerte en contacto con nosotros.
            </p>
            <p class="text-neutral-600 mt-4">
                Puedes llamarnos al número de teléfono o enviarnos un correo electrónico. También puedes visitar nuestra oficina en persona si lo prefieres.
            </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 col-span-3 lg:col-span-2">
            <?php foreach ($contactInfo as $info): ?>
                <div class="msn mso p-10">
                    <h3 class="msx font-semibold text-primary-900"><?= htmlspecialchars($info['name']) ?></h3>
                    <dl class="text-sm mt-3">
                        <?php if (!empty($info['emailpropietario'])): ?>
                            <div>
                                <dt class="mry">Email</dt>
                                <dd><a href="mailto:<?= htmlspecialchars($info['emailpropietario']) ?>" class="font-semibold text-primary-600"><?= htmlspecialchars($info['emailpropietario']) ?></a></dd>
                            </div>
                        <?php else: ?>
                            <div class="mt-1 text-gray-500">
                                <dt class="mry">Email</dt>
                                <dd>Sin correo electrónico</dd>
                            </div>
                        <?php endif; ?>
                        <?php if (!empty($info['telcontacto'])): ?>
                            <div class="mt-1 text-gray-500">
                                <dt class="mry">Teléfono</dt>
                                <dd><?= htmlspecialchars($info['telcontacto']) ?></dd>
                            </div>
                        <?php endif; ?>
                        <?php if (!empty($info['address'])): ?>
                            <div class="mt-1 text-gray-500">
                                <dt class="mry">Dirección</dt>
                                <dd><?= htmlspecialchars($info['address']) ?></dd>
                            </div>
                        <?php endif; ?>
                    </dl>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</div>