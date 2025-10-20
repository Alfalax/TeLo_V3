# TeLo V3 - Guía de Instalación

## Prerrequisitos

- Docker y Docker Compose
- Node.js 18+ (para desarrollo local)
- MySQL 8.0+ (si no usas Docker)
- Git

## Instalación con Docker (Recomendado)

### 1. Clonar el repositorio
```bash
git clone https://github.com/Alfalax/TeLo_V3.git
cd TeLo_V3
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

### 3. Ejecutar con Docker Compose
```bash
docker-compose up -d
```

### 4. Verificar servicios
- Core TeLo API: http://localhost:3002/health
- Agente IA: http://localhost:3001/health
- Asesor Web: http://localhost:80
- Nginx Proxy: http://localhost:8080

## Instalación Local (Desarrollo)

### 1. Instalar dependencias
```bash
# Core TeLo
cd services/core-telo
npm install

# Agente IA
cd ../agente-ia
npm install

# Asesor Web
cd ../asesor-web
npm install
```

### 2. Configurar base de datos
```bash
mysql -u root -p < database/init.sql
```

### 3. Ejecutar servicios
```bash
# Terminal 1 - Core TeLo
cd services/core-telo
npm run dev

# Terminal 2 - Agente IA
cd services/agente-ia
npm run dev

# Terminal 3 - Asesor Web
cd services/asesor-web
npm run dev
```

## Configuración de WhatsApp

1. Al iniciar el Agente IA, aparecerá un código QR
2. Escanear con WhatsApp Web
3. La sesión se guardará automáticamente

## Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Pruebas específicas por servicio
cd services/core-telo && npm test
cd services/agente-ia && npm test
```

## Troubleshooting

### Error de conexión a MySQL
- Verificar que MySQL esté ejecutándose
- Revisar credenciales en .env
- Esperar a que el contenedor MySQL esté listo

### WhatsApp no conecta
- Eliminar carpeta whatsapp_sessions
- Reiniciar el servicio agente-ia
- Escanear nuevo código QR

### Puerto ocupado
```bash
# Verificar puertos en uso
netstat -tulpn | grep :3002

# Cambiar puertos en docker-compose.yml si es necesario
```