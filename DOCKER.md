# Docker Setup para Ecommerce MVC

Este documento explica cómo ejecutar el proyecto Ecommerce MVC usando Docker.

## Requisitos Previos

- Docker Desktop instalado
- Docker Compose instalado

## Estructura de Archivos Docker

```
ecommerce-mvc/
├── Dockerfile                  # Imagen principal de la aplicación
├── docker-compose.yml         # Orquestación de servicios
├── docker-entrypoint.sh       # Script de inicialización
├── .dockerignore              # Archivos a ignorar en build
└── docker/
    └── apache/
        └── vhost.conf         # Configuración de Apache
```

## Comandos Básicos

### Construir y ejecutar la aplicación

```bash
# Construir la imagen y ejecutar
docker-compose up --build

# Ejecutar en background
docker-compose up -d --build

# Solo construir la imagen
docker-compose build
```

### Gestión de contenedores

```bash
# Ver logs
docker-compose logs web

# Ver logs en tiempo real
docker-compose logs -f web

# Parar contenedores
docker-compose down

# Parar y remover volúmenes
docker-compose down -v

# Reiniciar servicios
docker-compose restart
```

### Acceso a la aplicación

Una vez ejecutado, la aplicación estará disponible en:
- **URL**: http://localhost:8080
- **Puerto**: 8080

### Desarrollo con Docker

Para desarrollo, el docker-compose.yml está configurado con volúmenes que permiten:
- ✅ Hot reload automático de cambios de código
- ✅ Sincronización de archivos en tiempo real
- ✅ Logs de desarrollo visibles

### Acceso al contenedor

```bash
# Entrar al contenedor en ejecución
docker-compose exec web bash

# Ver archivos del proyecto
docker-compose exec web ls -la /var/www/html

# Verificar configuración de Apache
docker-compose exec web apache2ctl configtest
```

## Configuración

### Variables de Entorno

El archivo `docker-compose.yml` incluye estas variables:
- `APP_ENV=docker`
- `APP_DEBUG=true`
- `APP_URL=http://localhost:8080`

### Puertos

- **Aplicación**: Puerto 8080 (host) → Puerto 80 (contenedor)

### Volúmenes

- Código fuente: `.:/var/www/html`
- Configuración Apache: `./docker/apache/vhost.conf`

## Características

### Dockerfile
- ✅ Basado en PHP 8.2 con Apache
- ✅ Extensiones PDO y PDO_MySQL instaladas
- ✅ mod_rewrite habilitado
- ✅ DocumentRoot configurado a `/public`
- ✅ Permisos optimizados
- ✅ Headers de seguridad configurados

### Apache Virtual Host
- ✅ Reescritura de URLs para MVC
- ✅ Headers de seguridad
- ✅ Configuración de cache
- ✅ Logs de error y acceso

### Seguridad
- ✅ Headers X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- ✅ Archivos de configuración protegidos
- ✅ ServerTokens y ServerSignature deshabilitados

## Troubleshooting

### Problema: Puerto 8080 en uso
```bash
# Cambiar puerto en docker-compose.yml
ports:
  - "8081:80"  # Usar puerto 8081 en su lugar
```

### Problema: Permisos de archivos
```bash
# Reconstruir con permisos correctos
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### Problema: Apache no inicia
```bash
# Verificar logs
docker-compose logs web

# Verificar configuración
docker-compose exec web apache2ctl configtest
```

### Problema: 404 en todas las rutas
- Verificar que `.htaccess` existe en `/public`
- Confirmar que mod_rewrite está habilitado
- Revisar configuración del Virtual Host

## Comandos de Mantenimiento

```bash
# Limpiar contenedores parados
docker container prune

# Limpiar imágenes no usadas
docker image prune

# Limpiar todo el sistema Docker
docker system prune

# Ver uso de espacio
docker system df
```

## Producción

Para despliegue en producción, considera:
1. Cambiar `APP_DEBUG=false`
2. Usar imagen multistage para optimización
3. Configurar reverse proxy (nginx)
4. Implementar health checks
5. Configurar logs externos
6. Usar secrets para variables sensibles
