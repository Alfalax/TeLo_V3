# TeLo V3 - Sistema de Cotización de Repuestos Automotrices

## 📋 Descripción General

TeLo V3 es una plataforma de gestión de solicitudes de repuestos automotrices que actúa como intermediario entre clientes y asesores/proveedores, optimizando el proceso de cotización mediante un sistema de escalamiento inteligente por niveles.

**Objetivo**: Conectar eficientemente la demanda de repuestos automotrices con la oferta disponible, garantizando respuestas rápidas y competitivas.

## 🏗️ Arquitectura del Sistema

### Microservicios

1. **🤖 Agente IA** (Node.js/TypeScript)
   - Integración con WhatsApp Business API
   - Procesamiento de lenguaje natural multi-proveedor (OpenAI, Anthropic, Google AI)
   - Manejo de multimedia (audio, Excel, imágenes)
   - Gestión de contexto conversacional con Redis

2. **⚡ Core TeLo** (Java/Spring Boot)
   - API REST con arquitectura hexagonal
   - Sistema de evaluación de ofertas
   - Gestión de asesores y niveles
   - Base de datos PostgreSQL

3. **💻 Asesor Web** (Next.js/React)
   - Dashboard para gestión de asesores
   - Interface de administración
   - Monitoreo en tiempo real

## 🚀 Características Principales

- ✅ **WhatsApp Integration**: Comunicación directa con clientes
- ✅ **AI Multi-Provider**: OpenAI, Anthropic, Google AI, Ollama
- ✅ **Multimedia Processing**: Audio, Excel, imágenes
- ✅ **Real-time Notifications**: WebSockets y push notifications
- ✅ **Intelligent Routing**: Sistema de niveles dinámico
- ✅ **Context Management**: Historial conversacional con Redis
- ✅ **Cost Monitoring**: Optimización de costos de IA
- ✅ **Docker Support**: Contenedores para todos los servicios

## 📁 Estructura del Proyecto

```
TeLo_V3/
├── services/
│   ├── agente-ia/          # Servicio de IA y WhatsApp
│   ├── core-telo/          # API principal y lógica de negocio
│   └── asesor-web/         # Dashboard web para asesores
├── database/
│   └── migrations/         # Scripts de base de datos
├── testsprite_tests/       # Suite de pruebas automatizadas
└── .trae/documents/        # Documentación técnica
```

## 🛠️ Tecnologías

- **Backend**: Java 17, Spring Boot, PostgreSQL
- **AI Agent**: Node.js, TypeScript, Express
- **Frontend**: Next.js, React, TypeScript
- **Cache**: Redis
- **Containerization**: Docker
- **Testing**: TestSprite (17 casos de prueba)

## 📊 Flujo del Proceso

1. **Cliente** envía solicitud por WhatsApp
2. **Agente IA** procesa y estructura la información
3. **Core TeLo** distribuye a asesores según niveles
4. **Asesores** envían ofertas a través del dashboard
5. **Sistema** evalúa automáticamente las ofertas
6. **Cliente** recibe la mejor oferta por WhatsApp

## 🔧 Instalación y Despliegue

### Prerrequisitos
- Docker y Docker Compose
- Node.js 18+
- Java 17+
- PostgreSQL 13+
- Redis

### Variables de Entorno Críticas
```env
# Agente IA
WHATSAPP_VERIFY_TOKEN=your_token
OPENAI_API_KEY=your_key
CORE_TELO_URL=http://localhost:8080

# Core TeLo
DATABASE_URL=postgresql://localhost:5432/telo_v3
REDIS_URL=redis://localhost:6379
```

### Despliegue con Docker
```bash
# Clonar repositorio
git clone https://github.com/Alfalax/TeLo_V3.git
cd TeLo_V3

# Construir y ejecutar servicios
docker-compose up -d
```

## 📈 Testing

El proyecto incluye una suite completa de 17 casos de prueba con TestSprite:

- ✅ Envío de solicitudes por WhatsApp (texto, audio, Excel)
- ✅ Evaluación automática de ofertas
- ✅ Gestión de asesores y estados
- ✅ Notificaciones en tiempo real
- ✅ Rendimiento y escalabilidad
- ✅ Seguridad y autenticación

## 📚 Documentación

La documentación completa está disponible en `/docs/`:

- [Arquitectura Técnica](/.trae/documents/Arquitectura_Tecnica_TELOO_V3.md)
- [APIs y Endpoints](/.trae/documents/Documentacion_APIs_TELOO_V3.md)
- [Base de Datos](/.trae/documents/Documentacion_Base_Datos_TELOO_V3.md)
- [Guía de Desarrollo](/.trae/documents/Guia_Desarrollo_Despliegue_TELOO_V3.md)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Soporte

Para soporte técnico o consultas:
- 📧 Email: soporte@telo.com
- 💬 WhatsApp: +57 300 123 4567
- 🐛 Issues: [GitHub Issues](https://github.com/Alfalax/TeLo_V3/issues)

---

**TeLo V3** - Revolucionando la cotización de repuestos automotrices con IA 🚗⚡