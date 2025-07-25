<?php

/**
 * Componente de Breadcrumb para navegación
 */
?>
<nav class="flex mb-6" aria-label="Breadcrumb">
    <ol class="inline-flex items-center">
        <li class="inline-flex items-center">
            <a href="<?= Router::url('/') ?>" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600">
                <i class="fas fa-home mr-2"></i>
                Inicio
            </a>
        </li>
        <?php while ($crumb = array_shift($breadcrumbs)): ?>
            <li class="inline-flex items-center">
                <div class="flex items-center">
                    <i class="fas fa-chevron-right text-gray-400 mx-2"></i>
                    <a href="<?= $crumb['url'] ?>" class="text-sm font-medium text-gray-700 hover:text-primary-600">
                        <?= $crumb['label'] ?>
                    </a>
                </div>
            </li>
        <?php endwhile; ?>
    </ol>
</nav>