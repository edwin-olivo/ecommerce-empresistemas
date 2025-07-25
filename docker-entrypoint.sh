#!/bin/bash
set -e

# Script de entrada para el contenedor Docker
echo "🚀 Iniciando Ecommerce MVC..."

# Verificar que los directorios necesarios existen
if [ ! -d "/var/www/html/public" ]; then
    echo "❌ Error: Directorio public/ no encontrado"
    exit 1
fi

if [ ! -f "/var/www/html/public/index.php" ]; then
    echo "❌ Error: Archivo index.php no encontrado"
    exit 1
fi

# Configurar permisos
echo "🔧 Configurando permisos..."
chown -R www-data:www-data /var/www/html
chmod -R 755 /var/www/html

# Verificar configuración de Apache
echo "🔍 Verificando configuración de Apache..."
apache2ctl configtest

echo "✅ Configuración completada. Iniciando Apache..."

# Ejecutar el comando original
exec "$@"
